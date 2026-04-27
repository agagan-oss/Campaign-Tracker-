const fs = require("fs");

const config = require("../ttd_config.json");

let output = [];

config.campaigns.forEach(c => {

  output.push({
    tracker_id: c.tracker_id,
    impressions: 0,
    clicks: 0,
    spend: 0,
    ctr: 0,
    cpm: 0
  });

});

fs.writeFileSync("data/ttd_metrics.json", JSON.stringify(output, null, 2));

console.log("Metrics file created");
