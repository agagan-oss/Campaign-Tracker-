import https from 'https';
import fs from 'fs';

const LOGIN = process.env.TTD_LOGIN;
const PASSWORD = process.env.TTD_PASSWORD;
const CONFIG = JSON.parse(fs.readFileSync('ttd_config.json', 'utf8'));

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function getToken() {
  const body = JSON.stringify({ Login: LOGIN, Password: PASSWORD });
  const res = await request({
    hostname: 'api.thetradedesk.com',
    path: '/v3/authentication',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
  }, body);
  if (res.status !== 200) throw new Error(`Auth failed ${res.status}: ${res.body}`);
  return JSON.parse(res.body).Token;
}

async function fetchCampaignReport(token, advertiserId, campaignId, startDate, endDate) {
  const body = JSON.stringify({
    AdvertiserId: advertiserId,
    ReportDateRange: { StartDateInclusiveUTC: startDate, EndDateExclusiveUTC: endDate },
    Dimensions: ['CampaignId'],
    Metrics: ['Impressions', 'Clicks', 'Spend'],
    TimeZone: 'America/New_York'
  });
  const res = await request({
    hostname: 'api.thetradedesk.com',
    path: '/v3/myreports/campaignperformance',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'TTD-Auth': token, 'Content-Length': Buffer.byteLength(body) }
  }, body);
  if (res.status !== 200) return null;
  return JSON.parse(res.body);
}

function getDateRange(type) {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  const fmt = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  if (type === 'mtd') {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now); end.setDate(end.getDate() + 1);
    return { start: fmt(start), end: fmt(end) };
  }
  if (type === 'yesterday') {
    const d = new Date(now); d.setDate(d.getDate() - 1);
    const e = new Date(now);
    return { start: fmt(d), end: fmt(e) };
  }
  if (type === 'last30') {
    const d = new Date(now); d.setDate(d.getDate() - 30);
    const e = new Date(now); e.setDate(e.getDate() + 1);
    return { start: fmt(d), end: fmt(e) };
  }
}

async function main() {
  console.log('Authenticating with TTD...');
  const token = await getToken();
  console.log('Token acquired');

  const windows = ['mtd', 'yesterday', 'last30'];
  const results = [];
  const errors = [];

  for (const campaign of CONFIG.campaigns) {
    console.log(`Fetching: ${campaign.tracker_name}`);
    const snapshots = {};

    for (const window of windows) {
      const range = getDateRange(window);
      let impressions = 0, clicks = 0, spend = 0;

      for (const campaignId of campaign.ttd_campaign_ids) {
        try {
          const data = await fetchCampaignReport(token, campaign.ttd_advertiser_id, campaignId, range.start, range.end);
          if (data && data.Result) {
            data.Result.forEach(row => {
              impressions += row.Impressions || 0;
              clicks += row.Clicks || 0;
              spend += row.Spend || 0;
            });
          }
        } catch(e) {
          errors.push({ tracker_id: campaign.tracker_id, window, campaign_id: campaignId, error: e.message });
        }
      }

      const ctr = impressions > 0 ? (clicks / impressions * 100) : 0;
      const cpm = impressions > 0 ? (spend / impressions * 1000) : 0;
      snapshots[window] = {
        impressions,
        clicks,
        spend: Math.round(spend * 100) / 100,
        ctr: Math.round(ctr * 10000) / 10000,
        cpm: Math.round(cpm * 100) / 100
      };
    }

    results.push({ tracker_id: campaign.tracker_id, tracker_name: campaign.tracker_name, snapshots });
  }

  const output = {
    last_updated: new Date().toISOString(),
    fetched_count: results.length,
    errors,
    campaigns: results
  };

  fs.writeFileSync('ttd_campaigns.json', JSON.stringify(output, null, 2));
  console.log(`Done. ${results.length} campaigns, ${errors.length} errors.`);
  if (errors.length > 0) console.log('Errors:', JSON.stringify(errors, null, 2));
}

main().catch(e => { console.error(e); process.exit(1); });
