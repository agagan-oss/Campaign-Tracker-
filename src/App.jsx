import { useState, useMemo, useEffect, Fragment } from "react";

const STORAGE_KEY = "campaign-tracker-v3";
const EXPORT_KEY = "campaign-tracker-last-export";
const REMINDERS_KEY = "campaign-tracker-reminders";
const ACTIVITY_KEY = "campaign-tracker-activity";
const MAX_LOG_ENTRIES = 500;

const initialCampaigns = [{"mediaPartner":"WVR","campaignName":"Harry Green CDJR","platform":"FB","goal":"750K (7/1/25 - 12/31/25)","endDate":"2026-06-30","note1":"125K/Mo","note2":"","lastChecked":"2026-03-02","id":1769125165003,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Compass TK","campaignName":"Farm Bureau Financial-Jim Waters","platform":"TD","goal":"1.58M (8/11/25 - 7/31/26)","endDate":"2026-07-31","note1":"131.6K/Mo","note2":"","lastChecked":"2026-03-02","id":1769125792921,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Saginaw","campaignName":"Great Lakes Pace","platform":"FB","goal":"863K (8/20/25 - 7/31/26)","endDate":"2026-07-25","note1":"72K/Mo","note2":"","lastChecked":"2026-03-02","id":1769209400165,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Palm Springs","campaignName":"Carpet Empire Plus","platform":"FB","goal":"863K (8/20/25 - 7/31/26)","endDate":"2026-07-31","note1":"72K/Mo","note2":"","lastChecked":"2026-03-02","id":1769209535972,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Palm Springs","campaignName":"Carpet Empire Plus","platform":"DSP","goal":"863K (8/20/25 - 7/31/26)","endDate":"2026-07-31","note1":"72K/Mo","note2":"","lastChecked":"2026-03-02","id":1769209663140,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha San Antonio","campaignName":"Olympia Hills Golf","platform":"TD","goal":"143K (10/1/25 - 9/30/26)","endDate":"2026-09-30","note1":"12K/Mo","note2":"","lastChecked":"2026-03-02","id":1769214676416,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha San Antonio","campaignName":"Olympia Hills Golf","platform":"FB","goal":"1.08M (10/1/25 - 9/30/26)","endDate":"2026-09-30","note1":"90K/Mo","note2":"","lastChecked":"2026-03-02","id":1769214678888,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha San Antonio","campaignName":"Olympia Hills Golf","platform":"DSP","goal":"1.08M (10/1/25 - 9/30/26)","endDate":"2026-09-30","note1":"90K/Mo","note2":"","lastChecked":"2026-03-02","id":1769214712742,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Britestar Milwaukee Middle School","platform":"TD","goal":"100K Monthly","endDate":"2026-03-31","note1":"100K Monthly","note2":"","lastChecked":"2026-03-02","id":1769214781502,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star South","platform":"TD","goal":"40K Feb/March","endDate":"2026-03-31","note1":"40K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439021921,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star South","platform":"FB","goal":"25K Feb/March","endDate":"2026-03-31","note1":"25K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439025194,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star South","platform":"FBV","goal":"20K Feb/March","endDate":"2026-03-31","note1":"20K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439086411,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star South","platform":"DSP","goal":"25K Feb/March","endDate":"2026-03-31","note1":"25K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439117040,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star South","platform":"SEM","goal":"Need New Budget for February","endDate":"2026-01-31","note1":"Need New Budget for February","note2":"","lastChecked":"2026-03-02","id":1769439141224,"status":"off","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star Christian","platform":"TD","goal":"40K Feb/March","endDate":"2026-03-31","note1":"40K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439175821,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star Christian","platform":"FB","goal":"25K Feb/March","endDate":"2026-03-31","note1":"25K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439200352,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star Christian","platform":"FBV","goal":"20K Feb/March","endDate":"2026-03-31","note1":"20K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439219988,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star Christian","platform":"DSP","goal":"25K Feb/March","endDate":"2026-03-31","note1":"25K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439236958,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star Christian","platform":"SEM","goal":"Need New Budget for February","endDate":"2026-01-31","note1":"Need New Budget for February","note2":"","lastChecked":"2026-03-02","id":1769439252985,"status":"off","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"Noyes Development","platform":"TD","goal":"14.5K/Mo","endDate":"2026-03-31","note1":"14.5K/Mo","note2":"","lastChecked":"2026-03-02","id":1769439379921,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"Chown Hardware","platform":"TD","goal":"500K (10/17/25 - 3/31/26)","endDate":"2026-03-31","note1":"97K/Mo","note2":"","lastChecked":"2026-03-02","id":1769439513145,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"Chown Hardware","platform":"CTV","goal":"291K (10/17/25 - 3/31/26)","endDate":"2026-03-31","note1":"66K/Mo","note2":"","lastChecked":"2026-03-02","id":1769439528551,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"Chown Hardware","platform":"OTT","goal":"207K (10/17/25 - 3/31/26)","endDate":"2026-03-31","note1":"47K/Mo","note2":"","lastChecked":"2026-03-02","id":1769439581123,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"Chown Hardware","platform":"EMAIL","goal":"5 Emails","endDate":"2026-03-31","note1":"1/Mo","note2":"","lastChecked":"2026-03-02","id":1769440542802,"status":"off","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"WSU Tri Cities","platform":"FB","goal":"283K (11/3/25 - 5/31/26)","endDate":"2026-05-31","note1":"41K/Mo (15-20% Oregon)","note2":"","lastChecked":"2026-03-02","id":1769440737136,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"WSU Tri Cities ","platform":"FBV","goal":"175K (11/3/25 - 5/31/26)","endDate":"2026-05-31","note1":"25K/Mo ","note2":"","lastChecked":"2026-03-02","id":1772483657607,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"WSU Tri Cities","platform":"DSP","goal":"460K (11/3/25 - 5/31/26) ","endDate":"2026-05-31","note1":"67K/Mo (15-20% Oregon)","note2":"","lastChecked":"2026-03-02","id":1772483749345,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"WSU Tri Cities","platform":"TD","goal":"70K (11/3/25 - 5/31/26)","endDate":"2026-05-31","note1":"10K/Mo","note2":"","lastChecked":"2026-03-02","id":1772483792126,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true},{"mediaPartner":"Alpha Portland","campaignName":"WSU Tri Cities Audio","platform":"TD","goal":"296K (11/3/25 - 5/31/26)","endDate":"2026-05-31","note1":"59.5K/Mo","note2":"","lastChecked":"2026-03-02","id":1772483819653,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true},{"mediaPartner":"Alpha Jackson","campaignName":"Job Corps Centers of America","platform":"FB","goal":"900K (11/4/25 - 3/31/26)","endDate":"2026-03-31","status":"active","note1":"180K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484331559},{"mediaPartner":"Alpha Jackson","campaignName":"Job Corps Centers of America","platform":"DSP","goal":"1.275M (11/4/25 - 3/31/26) ","endDate":"2026-03-31","status":"active","note1":"255K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484347656},{"mediaPartner":"Alpha Jackson","campaignName":"Job Corps Centers of America ","platform":"SP","goal":"375K (11/4/25 - 3/31/26)","endDate":"2026-03-31","status":"active","note1":"75K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484372498},{"mediaPartner":"Alpha Jackson","campaignName":"Job Corps Centers of America  ","platform":"CTV","goal":"435K (11/4/25 - 3/31/26)","endDate":"2026-03-31","status":"active","note1":"87K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484401165},{"mediaPartner":"Alpha Jackson","campaignName":"Job Corps Centers of America ","platform":"OTT","goal":"298K (11/4/25 - 3/31/26)","endDate":"2026-03-31","status":"active","note1":"60K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484418938},{"mediaPartner":"WVR","campaignName":"Concord University","platform":"FB","goal":"63K (3/1/26 - 5/31/26)","endDate":"2026-05-31","status":"active","note1":"21K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484485079},{"mediaPartner":"WVR","campaignName":"Concord University ","platform":"SP","goal":"63K (3/1/26 - 5/31/26)","endDate":"2026-05-31","status":"active","note1":"21K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484490232},{"mediaPartner":"WVR","campaignName":"Concord University ","platform":"DSP","goal":"63K (3/1/26 - 5/31/26)","endDate":"2026-05-31","status":"active","note1":"21K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772484503162},{"mediaPartner":"Enchanting Media","campaignName":"Waterview Casino","platform":"FB","goal":"95K March","endDate":"2026-03-31","status":"active","note1":"95K March ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484624626},{"mediaPartner":"Enchanting Media","campaignName":"Waterview Casino","platform":"DSP","goal":"95K March","endDate":"2026-03-31","status":"active","note1":"95K March ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772484630475},{"mediaPartner":"Alpha Moberly","campaignName":"Right Rate Roofing","platform":"SEM","goal":"5,400 (12/4/25 - 7/30/26) ","endDate":"2026-07-31","status":"active","note1":"$900/Mo ","note2":" $1,564 March ","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484709093},{"mediaPartner":"Compass","campaignName":"Bolz Chiro","platform":"FB","goal":"400K (1/1/26 - 4/30/26)","endDate":"2026-03-31","status":"active","note1":"100K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484763564},{"mediaPartner":"Compass","campaignName":"Brownstone","platform":"DSP","goal":"229K (12/12/25 - 3/31/26)","endDate":"2026-03-31","status":"active","note1":"58K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772484790999},{"mediaPartner":"Compass","campaignName":"Brownstone ","platform":"FB","goal":"80K (12/12/25 - 3/31/26)","endDate":"2026-03-31","status":"active","note1":"20K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484798543},{"mediaPartner":"Compass","campaignName":"Brownstone  ","platform":"FBV","goal":"148K (12/12/25 - 3/31/26) ","endDate":"2026-03-31","status":"active","note1":"37K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484823373},{"mediaPartner":"Alpha Moberly","campaignName":"Specs Quincy","platform":"FB","goal":"300K (1/1/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"25K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484872046},{"mediaPartner":"Alpha Moberly","campaignName":"Specs Quincy","platform":"DSP","goal":"300K (1/1/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"25K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484887059},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Pearl Hawaii Federal Credit Union","platform":"SEM","goal":"$35,091 Media Spend (1/13/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"$2,925/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484925304},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Pearl Hawaii Federal Credit Union ","platform":"CTV","goal":"375K (1/14/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"31,250/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484928999},{"mediaPartner":"Alpha Moberly","campaignName":"Prairieland FS","platform":"DSP","goal":"445K (1/16/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"37.5K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772484986463},{"mediaPartner":"Alpha Moberly","campaignName":"Prairieland FS ","platform":"FB","goal":"445K (1/16/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"40.5K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485011820},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Holo HIIT","platform":"FBV","goal":"63K (1/16/26 - 3/31/26)","endDate":"2026-03-31","status":"off","note1":"","note2":"FB Access ","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485059494},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Holo HIIT ","platform":"FBV","goal":"63K (1/16/26 - 3/31/26)","endDate":"2026-03-31","status":"off","note1":"30K Feb/March","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485067041},{"mediaPartner":"Alpha Moberly","campaignName":"Culligan of Hanibal","platform":"DSP","goal":"758K (1/22/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"72K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485129272},{"mediaPartner":"Alpha Moberly","campaignName":"Quincy Catholic Elementary School","platform":"FB","goal":"125K (2/1/26 - 12/31/26)","endDate":"2026-12-31","status":"off","note1":"100K 2/1 - 4/30 (25K December)","note2":"FB Access/Creatives ","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485194758},{"mediaPartner":"Alpha Moberly","campaignName":"Quincy Catholic Elementary School ","platform":"DSP","goal":"125K (2/1/26 - 12/31/26)","endDate":"2026-12-31","status":"off","note1":"100K 2/1 - 4/30 (25K December)","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485211288},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Leavitt Yamane & Soldner","platform":"DSP","goal":"1.025M (2/9/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"93.5K/Mo ","note2":"Streaming Orders/Mo","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485298961},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Leavitt Yamane & Soldner","platform":"FB","goal":"1.025M (2/9/26 - 12/31/26)","endDate":"2026-12-31","status":"off","note1":"93.5K/Mo ","note2":"FB Access","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485347220},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Aloha Sugarcane Juices","platform":"TD","goal":"172K (2/16/26 - 4/30/26)","endDate":"2026-04-30","status":"active","note1":"58K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485429793},{"mediaPartner":"WVR","campaignName":"Fairmont State University (Ohio)","platform":"DSP","goal":"152K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"38K/Mo March/April/May 19K June","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485804286},{"mediaPartner":"WVR","campaignName":"Fairmont State University (Ohio) ","platform":"FB","goal":"152K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"38K/Mo March/April/May 19K June","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485820512},{"mediaPartner":"WVR","campaignName":"Fairmont State University (Ohio) ","platform":"SP","goal":"152K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"38K/Mo March/April/May 19K June","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485828817},{"mediaPartner":"WVR","campaignName":"Fairmont State University (PA)","platform":"DSP","goal":"375K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"94K/Mo March/April/May 47K/Mo June","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485842011},{"mediaPartner":"WVR","campaignName":"Fairmont State University (PA)","platform":"FB","goal":"375K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"94K/Mo March/April/May 47K/Mo June","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485880132},{"mediaPartner":"WVR","campaignName":"Fairmont State University (PA) ","platform":"SP","goal":"375K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"94K/Mo March/April/May 47K/Mo June","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485887909},{"mediaPartner":"WVR","campaignName":"Fairmont State University (WV)","platform":"DSP","goal":"347K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"87K/Mo March/April/May 44K June ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485904806},{"mediaPartner":"WVR","campaignName":"Fairmont State University (MD)","platform":"DSP","goal":"44.5K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"11.1K/Mo March/April/May 6K June ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772486056686},{"mediaPartner":"WVR","campaignName":"Fairmont State University (MD) ","platform":"FB","goal":"44.5K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"11.1K/Mo March/April/May 6K June ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486135542},{"mediaPartner":"WVR","campaignName":"Fairmont State University (MD)  ","platform":"SP","goal":"44.5K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"11.1K/Mo March/April/May 6K June ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486155939},{"mediaPartner":"WVR","campaignName":"Fairmont State University (WV) ","platform":"FB","goal":"347K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"87K/Mo March/April/May 44K June ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486026268},{"mediaPartner":"WVR","campaignName":"Fairmont State University (WV) ","platform":"SP","goal":"347K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"87K/Mo March/April/May 44K June ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486034400},{"mediaPartner":"Allen Media Broadcasting","campaignName":"King Windward Nissan ","platform":"TD","goal":"179K (2/20/26 - 3/15/26)","endDate":"2026-03-15","status":"active","note1":"","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486199815},{"mediaPartner":"Allen Media Broadcasting","campaignName":"City of Dubuque","platform":"FB","goal":"20K (3/2/26 - 4/30/26)","endDate":"2026-04-30","status":"active","note1":"10K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486231814},{"mediaPartner":"Allen Media Broadcasting","campaignName":"City of Dubuque ","platform":"FBV","goal":"12K (3/2/26 - 4/30/26)","endDate":"2026-04-30","status":"active","note1":"6K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486241660},{"mediaPartner":"Allen Media Broadcasting","campaignName":"City of Dubuque ","platform":"FBV","goal":"35K (3/2/26 - 4/30/26)","endDate":"2026-04-30","status":"active","note1":"18K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486264350},{"mediaPartner":"Allen Media Broadcasting","campaignName":"City of Dubuque ","platform":"YT","goal":"6K Views (3/2/26 - 4/30/26)","endDate":"2026-04-30","status":"active","note1":"3K Views/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486294122},{"mediaPartner":"Allen Media Broadcasting","campaignName":"City of Dubuque  ","platform":"TD","goal":"91K (3/2/26 - 4/30/26)","endDate":"2026-04-30","status":"active","note1":"46K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772486311325}];

const ALL_PLATFORMS = ["FB","DSP","CTV","OTT","SP","SEM","TD","OTTD","FBV","TT","IG","YT","EMAIL"];
const REMINDER_TYPES = [
  { value:"ad-swap",      label:"🔄 Ad Swap",         color:"#f472b6" },
  { value:"budget-check", label:"💰 Budget Check",    color:"#fb923c" },
  { value:"creative",     label:"🎨 Creative Update", color:"#a855f7" },
  { value:"report",       label:"📊 Report Due",      color:"#7dd3fc" },
  { value:"end-soon",     label:"⏱ Campaign Ending", color:"#fde047" },
  { value:"other",        label:"📌 Other",           color:"#00d48a" },
];
const STATUS_CFG = {
  "active":        { label:"Active",        color:"#00d48a", bg:"#00200f" },
  "pacing-ahead":  { label:"Pacing Ahead",  color:"#fb923c", bg:"#151000" },
  "pacing-behind": { label:"Pacing Behind", color:"#fde047", bg:"#151a00" },
  "off":           { label:"Off",           color:"#ef4444", bg:"#1a0808" },
  "close-to-goal": { label:"Close to Goal", color:"#00e5c0", bg:"#00201a" },
  "":              { label:"Unknown",       color:"#a855f7", bg:"#071420" },
};
const PLT_COLORS = {
  SEM:"#b91c1c", TD:"#00ffb3", DSP:"#7dd3fc", FB:"#f472b6",
  FBV:"#a855f7", CTV:"#a8c4e0", OTT:"#6b7280", OTTD:"#003a5c",
  YT:"#6effd8", SP:"#fde047", EMAIL:"#fb923c", TT:"#7a9bbf",
  IG:"#e1306c", default:"#4d6e8a"
};

function getToday() { return new Date().toISOString().split("T")[0]; }
function fmt(d) { return d.toISOString().split("T")[0]; }
function getDaysLeft(endDate) {
  const t = new Date(); t.setHours(0,0,0,0);
  return Math.ceil((new Date(endDate) - t) / 86400000);
}
function fmtNum(v) {
  const n = parseFloat(v);
  if (isNaN(n) || v === "") return null;
  if (n >= 1000000) return (n/1000000).toFixed(2).replace(/\.?0+$/,"")+"M";
  if (n >= 1000) return (n/1000).toFixed(1).replace(/\.?0+$/,"")+"K";
  return n.toString();
}
function getPresets() {
  const now = new Date(); now.setHours(0,0,0,0);
  const yest = new Date(now); yest.setDate(now.getDate()-1);
  const mtd  = new Date(now.getFullYear(), now.getMonth(), 1);
  const l7   = new Date(now); l7.setDate(now.getDate()-6);
  const l30  = new Date(now); l30.setDate(now.getDate()-29);
  const lmS  = new Date(now.getFullYear(), now.getMonth()-1, 1);
  const lmE  = new Date(now.getFullYear(), now.getMonth(), 0);
  return {
    today:     { label:"Today",         start:fmt(now),  end:fmt(now) },
    yesterday: { label:"Yesterday",     start:fmt(yest), end:fmt(yest) },
    mtd:       { label:"Month to Date", start:fmt(mtd),  end:fmt(now) },
    last7:     { label:"Last 7 Days",   start:fmt(l7),   end:fmt(now) },
    last30:    { label:"Last 30 Days",  start:fmt(l30),  end:fmt(now) },
    lastMonth: { label:"Last Month",    start:fmt(lmS),  end:fmt(lmE) },
    custom:    { label:"Custom",        start:null,      end:null },
  };
}

function ReminderCalendar({ reminders, setReminders, onAdd }) {
  const today = getToday();
  const [cur, setCur] = useState(() => { const n = new Date(); return { y:n.getFullYear(), m:n.getMonth() }; });
  const [selected, setSelected] = useState(null);
  const firstDay = new Date(cur.y, cur.m, 1).getDay();
  const daysInMonth = new Date(cur.y, cur.m+1, 0).getDate();
  const monthName = new Date(cur.y, cur.m, 1).toLocaleString("default", {month:"long",year:"numeric"});
  function pad(n) { return String(n).padStart(2,"0"); }
  function dateStr(d) { return `${cur.y}-${pad(cur.m+1)}-${pad(d)}`; }
  const byDay = {};
  reminders.forEach(r => {
    if (!r.dismissed) {
      const parts = r.date.split("-").map(Number);
      if (parts[0]===cur.y && parts[1]===cur.m+1) {
        const d = parts[2];
        if (!byDay[d]) byDay[d] = [];
        byDay[d].push(r);
      }
    }
  });
  const selReminders = selected ? (byDay[selected]||[]) : [];
  const prev = () => setCur(c => c.m===0 ? {y:c.y-1,m:11} : {y:c.y,m:c.m-1});
  const next = () => setCur(c => c.m===11 ? {y:c.y+1,m:0} : {y:c.y,m:c.m+1});
  const cells = [];
  for (let i=0; i<firstDay; i++) cells.push(null);
  for (let d=1; d<=daysInMonth; d++) cells.push(d);
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <button onClick={prev} style={{background:"#162236",border:"1px solid #334155",borderRadius:6,padding:"5px 12px",color:"#7a9bbf",cursor:"pointer",fontSize:14}}>←</button>
        <span style={{color:"#edf4ff",fontWeight:700,fontSize:14}}>{monthName}</span>
        <button onClick={next} style={{background:"#162236",border:"1px solid #334155",borderRadius:6,padding:"5px 12px",color:"#7a9bbf",cursor:"pointer",fontSize:14}}>→</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,marginBottom:3}}>
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d=>(
          <div key={d} style={{textAlign:"center",fontSize:10,color:"#3d5a72",fontWeight:700,padding:"4px 0",textTransform:"uppercase",letterSpacing:"0.05em"}}>{d}</div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
        {cells.map((d,i) => {
          if (!d) return <div key={"e"+i}/>;
          const ds = dateStr(d);
          const isToday = ds===today;
          const isPast = ds<today;
          const dayRems = byDay[d]||[];
          const hasOverdue = isPast && dayRems.length>0;
          const isSel = selected===d;
          return (
            <div key={d} onClick={()=>setSelected(isSel?null:d)}
              style={{background:isSel?"#002e24":isToday?"#0e2038":"#0a1525",border:`1px solid ${isSel?"#00c896":isToday?"#00c89660":hasOverdue?"#ef444440":"#1e293b"}`,borderRadius:7,padding:"6px 4px",minHeight:56,cursor:"pointer"}}>
              <div style={{textAlign:"center",fontSize:12,fontWeight:isToday?700:400,color:isToday?"#00e5a0":isPast?"#3d5a72":"#7a9bbf",marginBottom:3}}>{d}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:2,justifyContent:"center"}}>
                {dayRems.slice(0,4).map(r => {
                  const rt = REMINDER_TYPES.find(t=>t.value===r.type)||REMINDER_TYPES[5];
                  return <div key={r.id} style={{width:7,height:7,borderRadius:"50%",background:isPast?"#ef4444":rt.color}}/>;
                })}
                {dayRems.length>4 && <div style={{fontSize:8,color:"#4d6e8a"}}>+{dayRems.length-4}</div>}
              </div>
            </div>
          );
        })}
      </div>
      {selected && (
        <div style={{marginTop:14,background:"#07101c",border:"1px solid #1a2744",borderRadius:8,padding:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <span style={{fontSize:12,color:"#00e5a0",fontWeight:700}}>
              {new Date(cur.y,cur.m,selected).toLocaleDateString("default",{weekday:"long",month:"long",day:"numeric"})}
            </span>
            <button onClick={()=>onAdd(dateStr(selected))} style={{background:"#002e24",border:"1px solid #00c89640",borderRadius:6,padding:"3px 10px",color:"#00e5a0",fontSize:11,fontWeight:700,cursor:"pointer"}}>+ Add</button>
          </div>
          {selReminders.length===0
            ? <div style={{fontSize:12,color:"#3d5a72",textAlign:"center",padding:"10px 0"}}>No reminders this day</div>
            : selReminders.map(r => {
                const rt = REMINDER_TYPES.find(t=>t.value===r.type)||REMINDER_TYPES[5];
                return (
                  <div key={r.id} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:"1px solid #1a2744"}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:rt.color,flexShrink:0}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:12,color:rt.color,fontWeight:700}}>{rt.label}</div>
                      {r.note && <div style={{fontSize:11,color:"#4d6e8a",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.note}</div>}
                    </div>
                    <button onClick={()=>setReminders(prev=>prev.map(x=>x.id===r.id?{...x,dismissed:true}:x))} style={{background:"#002018",border:"1px solid #22c55e40",borderRadius:4,color:"#00d48a",fontSize:10,padding:"2px 6px",cursor:"pointer",flexShrink:0}}>✓</button>
                    <button onClick={()=>setReminders(prev=>prev.filter(x=>x.id!==r.id))} style={{background:"#1a0808",border:"1px solid #ef444440",borderRadius:4,color:"#ef4444",fontSize:10,padding:"2px 6px",cursor:"pointer",flexShrink:0}}>✕</button>
                  </div>
                );
              })
          }
        </div>
      )}
      <div style={{display:"flex",flexWrap:"wrap",gap:10,marginTop:12}}>
        {REMINDER_TYPES.map(t=>(
          <div key={t.value} style={{display:"flex",alignItems:"center",gap:4}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:t.color}}/>
            <span style={{fontSize:10,color:"#3d5a72"}}>{t.label.replace(/^\S+\s/,"")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReminderModal({ campaigns, onClose, reminders, setReminders }) {
  const blank = { id:null, type:"ad-swap", campaignId:"", note:"", date:"", repeat:"none", dismissed:false };
  const [form, setForm] = useState(blank);
  const [view, setView] = useState("list");
  const sf = (k,v) => setForm(p=>({...p,[k]:v}));

  function save() {
    if (!form.date) return;
    const r = { ...form, id:form.id||Date.now(), dismissed:false };
    setReminders(prev => form.id ? prev.map(x=>x.id===r.id?r:x) : [...prev,r]);
    setForm(blank); setView("list");
  }
  function dismiss(id) { setReminders(prev=>prev.map(r=>r.id===id?{...r,dismissed:true}:r)); }
  function del(id)     { setReminders(prev=>prev.filter(r=>r.id!==id)); }
  function edit(r)     { setForm({...r}); setView("add"); }
  function addOnDate(date) { setForm({...blank,date}); setView("add"); }

  const today = getToday();
  const sorted = [...reminders].sort((a,b)=>a.date<b.date?-1:a.date>b.date?1:0);
  const overdue  = sorted.filter(r=>!r.dismissed && r.date<today);
  const upcoming = sorted.filter(r=>!r.dismissed && r.date>=today);
  const done     = sorted.filter(r=>r.dismissed);

  const iS = { width:"100%", background:"#162236", border:"1px solid #334155", borderRadius:6, padding:"7px 10px", color:"#d8eaf8", fontSize:13, boxSizing:"border-box", fontFamily:"inherit" };

  const ReminderCard = ({ r, showEdit=true }) => {
    const rt = REMINDER_TYPES.find(t=>t.value===r.type)||REMINDER_TYPES[5];
    const camp = campaigns.find(c=>c.id===r.campaignId);
    const dLeft = getDaysLeft(r.date);
    const isPast = r.date<today;
    return (
      <div style={{background:isPast?"#1a0808":"#0e1a2e",border:`1px solid ${isPast?"#ef444440":rt.color+"30"}`,borderRadius:8,padding:"10px 13px",marginBottom:7,display:"flex",gap:10,alignItems:"flex-start"}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:3}}>
            <span style={{fontSize:12,color:rt.color,fontWeight:700}}>{rt.label}</span>
            {camp && <span style={{fontSize:11,color:"#4d6e8a",background:"#0c1625",borderRadius:3,padding:"1px 6px"}}>{camp.campaignName.trim()} · {camp.platform}</span>}
            <span style={{fontSize:11,fontWeight:600,color:isPast?"#ef4444":dLeft<=3?"#f59e0b":"#00d48a",marginLeft:"auto"}}>
              {isPast?`${Math.abs(dLeft)}d overdue`:dLeft===0?"Today!":`in ${dLeft}d`} · {r.date}
            </span>
          </div>
          {r.note && <div style={{fontSize:12,color:"#7a9bbf",lineHeight:1.4}}>{r.note}</div>}
          {r.repeat!=="none" && <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>↻ Repeats {r.repeat}</div>}
        </div>
        <div style={{display:"flex",gap:5,flexShrink:0}}>
          {showEdit && <button onClick={()=>edit(r)} style={{background:"#162236",border:"1px solid #334155",borderRadius:4,color:"#7a9bbf",fontSize:11,padding:"3px 7px",cursor:"pointer"}}>Edit</button>}
          {!r.dismissed && <button onClick={()=>dismiss(r.id)} style={{background:"#002018",border:"1px solid #22c55e40",borderRadius:4,color:"#00d48a",fontSize:11,padding:"3px 7px",cursor:"pointer"}}>✓ Done</button>}
          <button onClick={()=>del(r.id)} style={{background:"#1a0808",border:"1px solid #ef444440",borderRadius:4,color:"#ef4444",fontSize:11,padding:"3px 7px",cursor:"pointer"}}>✕</button>
        </div>
      </div>
    );
  };

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:14,padding:24,width:"min(580px,96vw)",maxHeight:"88vh",overflowY:"auto",boxShadow:"0 30px 80px rgba(0,0,0,.9)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:16,fontWeight:800,color:"#edf4ff"}}>🔔 Reminders</span>
            {reminders.filter(r=>!r.dismissed).length>0 && (
              <span style={{background:"#ef4444",color:"#fff",borderRadius:10,padding:"1px 7px",fontSize:11,fontWeight:700}}>{reminders.filter(r=>!r.dismissed).length}</span>
            )}
          </div>
          <div style={{display:"flex",gap:7}}>
            {view!=="add" && (
              <div style={{display:"flex",background:"#0a1525",border:"1px solid #1e293b",borderRadius:7,overflow:"hidden"}}>
                {["list","calendar"].map(v=>(
                  <button key={v} onClick={()=>setView(v)} style={{background:view===v?"#162236":"transparent",border:"none",padding:"5px 12px",color:view===v?"#00e5a0":"#3d5a72",fontSize:12,fontWeight:view===v?700:400,cursor:"pointer"}}>
                    {v==="list"?"📋 List":"📅 Calendar"}
                  </button>
                ))}
              </div>
            )}
            <button onClick={()=>{ setForm(blank); setView(view==="add"?"list":"add"); }} style={{background:view==="add"?"#002e24":"#162236",border:`1px solid ${view==="add"?"#00c89640":"#334155"}`,borderRadius:7,padding:"5px 13px",color:view==="add"?"#00e5a0":"#7a9bbf",fontSize:12,fontWeight:700,cursor:"pointer"}}>
              {view==="add"?"← Back":"+ Add"}
            </button>
            <button onClick={onClose} style={{background:"none",border:"none",color:"#4d6e8a",cursor:"pointer",fontSize:22,lineHeight:1,padding:0}}>×</button>
          </div>
        </div>

        {view==="add" ? (
          <div>
            <div style={{marginBottom:12}}>
              <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Reminder Type</label>
              <select value={form.type} onChange={e=>sf("type",e.target.value)} style={iS}>
                {REMINDER_TYPES.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div style={{marginBottom:12}}>
              <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Campaign (optional)</label>
              <select value={form.campaignId||""} onChange={e=>sf("campaignId",e.target.value?parseInt(e.target.value):"")} style={iS}>
                <option value="">— No specific campaign —</option>
                {campaigns.map(c=><option key={c.id} value={c.id}>{c.campaignName.trim()} · {c.platform} · {c.mediaPartner}</option>)}
              </select>
            </div>
            <div style={{marginBottom:12}}>
              <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Due Date *</label>
              <input type="date" value={form.date} onChange={e=>sf("date",e.target.value)} style={iS}/>
            </div>
            <div style={{marginBottom:12}}>
              <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Note</label>
              <textarea value={form.note} onChange={e=>sf("note",e.target.value)} placeholder="e.g. Swap March creatives for April" style={{...iS,resize:"vertical",minHeight:70,lineHeight:1.5}}/>
            </div>
            <div style={{marginBottom:18}}>
              <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Repeat</label>
              <select value={form.repeat} onChange={e=>sf("repeat",e.target.value)} style={iS}>
                <option value="none">No repeat</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={save} disabled={!form.date} style={{flex:1,background:form.date?"#00c896":"#162236",border:"none",borderRadius:7,padding:"10px 0",color:form.date?"#fff":"#3d5a72",fontWeight:700,fontSize:14,cursor:form.date?"pointer":"default"}}>
                {form.id?"Update Reminder":"Save Reminder"}
              </button>
              <button onClick={()=>{ setForm(blank); setView("list"); }} style={{flex:1,background:"#162236",border:"1px solid #334155",borderRadius:7,padding:"10px 0",color:"#7a9bbf",fontWeight:600,fontSize:14,cursor:"pointer"}}>Cancel</button>
            </div>
          </div>
        ) : view==="calendar" ? (
          <ReminderCalendar reminders={reminders} setReminders={setReminders} onAdd={addOnDate}/>
        ) : (
          <div>
            {overdue.length>0 && (
              <div style={{marginBottom:16}}>
                <div style={{fontSize:11,color:"#ef4444",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:7}}>⚠ Overdue ({overdue.length})</div>
                {overdue.map(r=><ReminderCard key={r.id} r={r}/>)}
              </div>
            )}
            {upcoming.length>0 && (
              <div style={{marginBottom:16}}>
                <div style={{fontSize:11,color:"#00d48a",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:7}}>Upcoming ({upcoming.length})</div>
                {upcoming.map(r=><ReminderCard key={r.id} r={r}/>)}
              </div>
            )}
            {overdue.length===0 && upcoming.length===0 && (
              <div style={{textAlign:"center",padding:"30px 0",color:"#3d5a72"}}>
                <div style={{fontSize:28,marginBottom:8}}>✅</div>
                <div style={{fontSize:13}}>No active reminders. Add one above!</div>
              </div>
            )}
            {done.length>0 && (
              <details style={{marginTop:8}}>
                <summary style={{fontSize:11,color:"#3d5a72",cursor:"pointer",marginBottom:7,userSelect:"none"}}>Completed ({done.length})</summary>
                <div style={{opacity:.55}}>{done.map(r=><ReminderCard key={r.id} r={r} showEdit={false}/>)}</div>
              </details>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ReminderAlertBanner({ reminders, onOpen, onDismissAll }) {
  const today = getToday();
  const due = reminders.filter(r=>!r.dismissed && r.date<=today);
  if (due.length===0) return null;
  const overdue  = due.filter(r=>r.date<today);
  const todayDue = due.filter(r=>r.date===today);
  return (
    <div style={{background:"#130a00",border:"1px solid #f59e0b60",borderRadius:10,padding:"12px 18px",marginBottom:14,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:20}}>🔔</span>
        <div>
          <div style={{color:"#f59e0b",fontWeight:700,fontSize:13}}>
            {overdue.length>0 && `${overdue.length} overdue reminder${overdue.length>1?"s":""}`}
            {overdue.length>0 && todayDue.length>0 && " · "}
            {todayDue.length>0 && `${todayDue.length} due today`}
          </div>
          <div style={{color:"#92400e",fontSize:11,marginTop:1}}>
            {due.slice(0,2).map(r=>{ const rt=REMINDER_TYPES.find(t=>t.value===r.type)||REMINDER_TYPES[5]; return <span key={r.id} style={{marginRight:10}}>{rt.label}{r.note?` — ${r.note.slice(0,40)}${r.note.length>40?"…":""}`:""}</span>; })}
            {due.length>2 && <span style={{color:"#78350f"}}>+{due.length-2} more…</span>}
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={onOpen} style={{background:"#f59e0b",border:"none",borderRadius:7,padding:"7px 16px",color:"#000",fontWeight:700,fontSize:12,cursor:"pointer"}}>View All</button>
        <button onClick={onDismissAll} style={{background:"none",border:"1px solid #92400e",borderRadius:7,padding:"7px 12px",color:"#92400e",fontWeight:600,fontSize:12,cursor:"pointer"}}>Dismiss All</button>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const c = STATUS_CFG[status||""]||STATUS_CFG[""];
  return <span style={{background:c.bg,color:c.color,border:`1px solid ${c.color}40`,borderRadius:4,padding:"2px 8px",fontSize:11,fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase",whiteSpace:"nowrap"}}>{c.label}</span>;
}
function PlatformTag({ p }) {
  const col = PLT_COLORS[p]||PLT_COLORS.default;
  return <span style={{background:col+"22",color:col,border:`1px solid ${col}55`,borderRadius:3,padding:"1px 7px",fontSize:11,fontWeight:700,letterSpacing:"0.08em"}}>{p}</span>;
}
function EndChip({ d }) {
  const days = getDaysLeft(d);
  const col = days<0?"#6b7280":days<=14?"#ef4444":days<=30?"#f59e0b":"#00d48a";
  return <span style={{color:col,fontSize:13,fontWeight:600,fontVariantNumeric:"tabular-nums"}}>{d} <span style={{opacity:.6,fontWeight:400}}>({days<0?"Ended":days===0?"Today":`${days}d`})</span></span>;
}
function MetricPill({ label, value, color, prefix="", suffix="" }) {
  const disp = fmtNum(value);
  if (!disp) return null;
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:3,background:color+"18",border:`1px solid ${color}35`,borderRadius:4,padding:"1px 7px",fontSize:10,color,whiteSpace:"nowrap"}}>
      <span style={{opacity:.55,fontSize:9}}>{label}</span>
      <span style={{fontWeight:700,fontVariantNumeric:"tabular-nums"}}>{prefix}{disp}{suffix}</span>
    </span>
  );
}

function MetricRow({ c, colSpan, onUpdate, dateRange }) {
  const [local, setLocal] = useState({impressions:c.impressions||"",ctr:c.ctr||"",cpm:c.cpm||"",spend:c.spend||""});
  const [dirty, setDirty] = useState(false);
  const set = (k,v) => { setLocal(p=>({...p,[k]:v})); setDirty(true); };
  const save = () => { onUpdate({...c,...local}); setDirty(false); };
  const iS = {background:"#08111f",border:"1px solid #1e293b",borderRadius:6,padding:"7px 10px",color:"#d8eaf8",fontSize:13,width:"100%",fontFamily:"Inter,sans-serif",boxSizing:"border-box"};
  const metrics = [
    {key:"impressions",label:"Impressions",color:"#00e5a0",prefix:"",suffix:""},
    {key:"ctr",label:"CTR",color:"#00ffb3",prefix:"",suffix:"%"},
    {key:"cpm",label:"CPM",color:"#fb923c",prefix:"$",suffix:""},
    {key:"spend",label:"Spend",color:"#f472b6",prefix:"$",suffix:""},
  ];
  return (
    <tr>
      <td colSpan={colSpan} style={{padding:0,borderBottom:"1px solid #0d1525"}}>
        <div style={{background:"#07101c",borderTop:"1px solid #1a2744",padding:"16px 16px 16px 52px"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
            <span style={{fontSize:11,color:"#00c896",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em"}}>📊 Metrics</span>
            {dateRange.start && <span style={{background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:4,padding:"1px 8px",fontSize:10,fontFamily:"monospace",color:"#4d6e8a"}}>{dateRange.start===dateRange.end?dateRange.start:`${dateRange.start} → ${dateRange.end}`}</span>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4, minmax(130px, 200px))",gap:12,marginBottom:14}}>
            {metrics.map(({key,label,color,prefix,suffix})=>(
              <div key={key}>
                <label style={{display:"block",fontSize:10,color,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:700}}>
                  {prefix && <span style={{opacity:.5,marginRight:1}}>{prefix}</span>}{label}{suffix && <span style={{opacity:.5,marginLeft:1}}>{suffix}</span>}
                </label>
                <input type="number" value={local[key]} onChange={e=>set(key,e.target.value)} placeholder="—" style={{...iS,borderColor:local[key]?color+"60":"#162236"}}/>
              </div>
            ))}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <button onClick={save} disabled={!dirty} style={{background:dirty?"#00c896":"#132140",border:"none",borderRadius:6,padding:"6px 18px",color:dirty?"#fff":"#3b5070",fontSize:12,fontWeight:700,cursor:dirty?"pointer":"default",transition:"all .15s"}}>Save Metrics</button>
            {!dirty && (c.impressions||c.ctr||c.cpm||c.spend) && <span style={{fontSize:11,color:"#00d48a",display:"flex",alignItems:"center",gap:4}}>✓ Metrics saved</span>}
            {(local.impressions||local.ctr||local.cpm||local.spend) && <button onClick={()=>{setLocal({impressions:"",ctr:"",cpm:"",spend:""});setDirty(true);}} style={{background:"none",border:"none",color:"#3d5a72",fontSize:11,cursor:"pointer"}}>Clear all</button>}
          </div>
        </div>
      </td>
    </tr>
  );
}

function DateBar({ range, setRange }) {
  const presets = getPresets();
  const [cs, setCs] = useState(range.start||"");
  const [ce, setCe] = useState(range.end||"");
  const [showCustom, setShowCustom] = useState(false);
  const quickKeys = ["mtd","yesterday"];
  const dropdownKeys = ["today","last7","last30","lastMonth","custom"];
  const isDropdownActive = dropdownKeys.includes(range.preset);
  function handleDropdown(val) {
    if (val==="custom") { setShowCustom(true); setRange({preset:"custom",start:cs,end:ce,label:"Custom"}); }
    else if (val!=="__none__") { setShowCustom(false); setRange({preset:val,...presets[val]}); }
  }
  return (
    <div style={{background:"#0c1625",border:"1px solid #1e293b",borderRadius:10,padding:"11px 16px",marginBottom:14,display:"flex",flexWrap:"wrap",alignItems:"center",gap:8}}>
      <span style={{fontSize:10,color:"#4d6e8a",textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:700,marginRight:4}}>📅 Date Range</span>
      <div style={{display:"flex",gap:5}}>
        {quickKeys.map(k=>{ const on=range.preset===k; return <button key={k} onClick={()=>{setShowCustom(false);setRange({preset:k,...presets[k]});}} style={{background:on?"#002e24":"#0e1a2e",border:`1px solid ${on?"#00c896":"#162236"}`,borderRadius:6,padding:"4px 13px",color:on?"#00e5a0":"#4d6e8a",fontSize:12,fontWeight:on?700:500,cursor:"pointer"}}>{presets[k].label}</button>; })}
      </div>
      <div style={{width:1,height:20,background:"#162236"}}/>
      <select value={isDropdownActive?range.preset:"__none__"} onChange={e=>handleDropdown(e.target.value)} style={{background:isDropdownActive?"#002e24":"#0e1a2e",border:`1px solid ${isDropdownActive?"#00c896":"#162236"}`,borderRadius:6,padding:"4px 11px",color:isDropdownActive?"#00e5a0":"#4d6e8a",fontSize:12,fontWeight:isDropdownActive?700:500,cursor:"pointer"}}>
        <option value="__none__" disabled>More…</option>
        <option value="today">Today</option>
        <option value="last7">Last 7 Days</option>
        <option value="last30">Last 30 Days</option>
        <option value="lastMonth">Last Month</option>
        <option value="custom">Custom Range…</option>
      </select>
      {(showCustom||range.preset==="custom") && (
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <input type="date" value={cs} onChange={e=>setCs(e.target.value)} style={{background:"#0e1a2e",border:"1px solid #334155",borderRadius:6,padding:"4px 8px",color:"#d8eaf8",fontSize:12}}/>
          <span style={{color:"#3d5a72",fontSize:11}}>to</span>
          <input type="date" value={ce} onChange={e=>setCe(e.target.value)} style={{background:"#0e1a2e",border:"1px solid #334155",borderRadius:6,padding:"4px 8px",color:"#d8eaf8",fontSize:12}}/>
          <button onClick={()=>{if(cs&&ce){setRange({preset:"custom",start:cs,end:ce,label:`${cs} → ${ce}`});setShowCustom(false);}}} disabled={!cs||!ce} style={{background:cs&&ce?"#00c896":"#162236",border:"none",borderRadius:6,padding:"4px 12px",color:cs&&ce?"#fff":"#3d5a72",fontSize:12,fontWeight:700,cursor:cs&&ce?"pointer":"default"}}>Apply</button>
        </div>
      )}
      {range.start && range.end && (
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:11,color:"#3d5a72"}}>Showing:</span>
          <span style={{fontSize:11,color:"#00e5a0",fontWeight:500,background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:4,padding:"2px 8px"}}>{range.start===range.end?range.start:`${range.start} → ${range.end}`}</span>
        </div>
      )}
    </div>
  );
}

function Modal({ campaign, onSave, onClose, isNew }) {
  const blank = {mediaPartner:"",campaignName:"",platform:"FB",goal:"",endDate:"",status:"active",note1:"",note2:"",lastChecked:getToday(),impressions:"",ctr:"",cpm:"",spend:"",monthlyFlight:false,projectionUrl:"",history:"",folderPath:""};
  const [f, setF] = useState(campaign?{...campaign}:blank);
  const set = (k,v) => setF(p=>({...p,[k]:v}));
  const iS = {width:"100%",background:"#162236",border:"1px solid #334155",borderRadius:6,padding:"7px 10px",color:"#d8eaf8",fontSize:13,boxSizing:"border-box"};
  const row = (key,label,type="text") => (
    <div style={{marginBottom:12}}>
      <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</label>
      {key==="status" ? <select value={f.status||""} onChange={e=>set("status",e.target.value)} style={iS}>{Object.entries(STATUS_CFG).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}</select>
      :key==="platform" ? <select value={f.platform} onChange={e=>set("platform",e.target.value)} style={iS}>{ALL_PLATFORMS.map(p=><option key={p}>{p}</option>)}</select>
      :<input type={type} value={f[key]||""} onChange={e=>set(key,e.target.value)} style={iS}/>}
    </div>
  );
  function submit() {
    if (!f.campaignName.trim()||!f.mediaPartner.trim()) { alert("Campaign name and media partner required."); return; }
    onSave(isNew?{...f,id:Date.now()}:f);
  }
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,backdropFilter:"blur(4px)"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:12,padding:28,width:"min(860px,95vw)",maxHeight:"92vh",overflowY:"auto",boxShadow:"0 30px 80px rgba(0,0,0,.9)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,color:"#edf4ff",fontSize:15,fontWeight:700}}>{isNew?"Add Campaign":"Edit Campaign"}</h2>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#4d6e8a",cursor:"pointer",fontSize:22,lineHeight:1,padding:0}}>×</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
        {row("mediaPartner","Media Partner")}
        {row("campaignName","Campaign Name")}
        {row("platform","Platform")}
        {row("goal","Goal")}
        {row("endDate","End Date","date")}
        {row("status","Status")}
        {row("note1","Note 1")}
        {row("note2","Note 2")}
        {row("lastChecked","Last Checked","date")}
        </div>
        <div style={{marginBottom:12}}>
          <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Monthly Flights</label>
          <button onClick={()=>set("monthlyFlight",!f.monthlyFlight)} style={{display:"flex",alignItems:"center",gap:8,background:f.monthlyFlight?"#00201a":"#162236",border:`1px solid ${f.monthlyFlight?"#2dd4bf60":"#1e3350"}`,borderRadius:7,padding:"8px 14px",cursor:"pointer",width:"100%"}}>
            <span style={{fontSize:15,color:f.monthlyFlight?"#00e5c0":"#3d5a72"}}>★</span>
            <span style={{fontSize:12,color:f.monthlyFlight?"#00e5c0":"#4d6e8a",fontWeight:f.monthlyFlight?700:400}}>{f.monthlyFlight?"Monthly flights enabled":"No monthly flights"}</span>
            <span style={{marginLeft:"auto",fontSize:10,color:f.monthlyFlight?"#00e5c0":"#1e3350"}}>{f.monthlyFlight?"ON":"OFF"}</span>
          </button>
        </div>
        <div style={{marginBottom:12}}>
          <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>📎 Projection Sheet URL</label>
          <div style={{display:"flex",gap:6}}>
            <input type="url" value={f.projectionUrl||""} onChange={e=>set("projectionUrl",e.target.value)} placeholder="https://docs.google.com/..." style={{flex:1,background:"#162236",border:"1px solid #334155",borderRadius:6,padding:"7px 10px",color:"#d8eaf8",fontSize:13,boxSizing:"border-box",fontFamily:"inherit"}}/>
            {f.projectionUrl&&f.projectionUrl.trim()&&<a href={f.projectionUrl.trim()} target="_blank" rel="noopener noreferrer" style={{background:"#002e24",border:"1px solid #3b82f640",borderRadius:6,padding:"7px 12px",color:"#00e5a0",fontSize:12,fontWeight:600,textDecoration:"none",whiteSpace:"nowrap",display:"flex",alignItems:"center"}}>Open ↗</a>}
          </div>
        </div>
        <div style={{marginBottom:12}}>
          <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>📁 Client Folder Path</label>
          <div style={{display:"flex",gap:6}}>
            <input type="text" value={f.folderPath||""} onChange={e=>set("folderPath",e.target.value)} placeholder="\\192.168.3.2\Data\..." style={{flex:1,background:"#162236",border:"1px solid #1e3350",borderRadius:6,padding:"7px 10px",color:"#d8eaf8",fontSize:12,boxSizing:"border-box",fontFamily:"Consolas,monospace"}}/>
            {f.folderPath&&f.folderPath.trim()&&<button onClick={()=>navigator.clipboard.writeText(f.folderPath.trim())} style={{background:"#002e24",border:"1px solid #00c89640",borderRadius:6,padding:"7px 12px",color:"#00e5a0",fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>Copy 📋</button>}
          </div>
        </div>
        <div style={{marginBottom:16}}>
          <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>📋 Change History</label>
          <textarea value={f.history||""} onChange={e=>set("history",e.target.value)} placeholder={"3/2/26 — Increased budget\n..."} style={{width:"100%",background:"#0e1a2e",border:"1px solid #334155",borderRadius:6,padding:"10px",color:"#d8eaf8",fontSize:12,fontFamily:"inherit",boxSizing:"border-box",resize:"vertical",minHeight:110,lineHeight:1.6}}/>
        </div>
        <div style={{display:"flex",gap:8,marginTop:8}}>
          <button onClick={submit} style={{flex:1,background:isNew?"#00d48a":"#00c896",border:"none",borderRadius:7,padding:"10px 0",color:isNew?"#000":"#fff",fontWeight:700,fontSize:14,cursor:"pointer"}}>{isNew?"Add Campaign":"Save Changes"}</button>
          <button onClick={onClose} style={{flex:1,background:"#162236",border:"1px solid #334155",borderRadius:7,padding:"10px 0",color:"#7a9bbf",fontWeight:600,fontSize:14,cursor:"pointer"}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

const LOG_ICONS = {
  created:    { icon: "✨", color: "#00d48a", label: "Created" },
  deleted:    { icon: "🗑", color: "#ef4444", label: "Deleted" },
  duplicated: { icon: "⧉",  color: "#7dd3fc", label: "Duplicated" },
  status:     { icon: "🔄", color: "#f472b6", label: "Status" },
  metrics:    { icon: "📊", color: "#fb923c", label: "Metrics" },
  checked:    { icon: "✓",  color: "#00e5a0", label: "Checked" },
  edited:     { icon: "✏️", color: "#a855f7", label: "Edited" },
};

function formatLogTime(ts) {
  const d = new Date(ts);
  const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return { date, time };
}

function ActivityLog({ log, campaigns, onClear, onUndo }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const types = ["all", "created", "edited", "status", "metrics", "checked", "duplicated", "deleted"];

  const filtered = log.filter(e => {
    const matchType = filter === "all" || e.type === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || e.campaignName?.toLowerCase().includes(q) || e.partner?.toLowerCase().includes(q) || e.detail?.toLowerCase().includes(q);
    return matchType && matchSearch;
  });

  // Group by date
  const groups = [];
  let curDate = null;
  filtered.forEach(e => {
    const { date } = formatLogTime(e.ts);
    if (date !== curDate) { groups.push({ date, entries: [] }); curDate = date; }
    groups[groups.length - 1].entries.push(e);
  });

  return (
    <div style={{ padding: "0 0 40px" }}>
      {/* Toolbar */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 16 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search activity…"
          style={{ background: "#0e1a2e", border: "1px solid #1e293b", borderRadius: 7, padding: "7px 13px", color: "#d8eaf8", fontSize: 13, width: 220 }} />
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              style={{ background: filter === t ? (LOG_ICONS[t]?.color + "22" || "#162236") : "#0e1a2e",
                border: `1px solid ${filter === t ? (LOG_ICONS[t]?.color || "#00e5a0") : "#1e293b"}`,
                borderRadius: 6, padding: "4px 11px", color: filter === t ? (LOG_ICONS[t]?.color || "#00e5a0") : "#4d6e8a",
                fontSize: 11, fontWeight: filter === t ? 700 : 400, cursor: "pointer", textTransform: "capitalize" }}>
              {t === "all" ? "All" : (LOG_ICONS[t]?.icon + " " + LOG_ICONS[t]?.label)}
            </button>
          ))}
        </div>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#3d5a72" }}>{filtered.length} event{filtered.length !== 1 ? "s" : ""}</span>
        {log.length > 0 && <button onClick={onClear}
          style={{ background: "#1a0808", border: "1px solid #ef444440", borderRadius: 6, padding: "4px 11px", color: "#ef4444", fontSize: 11, cursor: "pointer" }}>
          Clear Log
        </button>}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#3d5a72" }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>📋</div>
          <div style={{ fontSize: 13 }}>{log.length === 0 ? "No activity yet. Changes you make will appear here." : "No events match your filters."}</div>
        </div>
      ) : (
        <div>
          {groups.map(g => (
            <div key={g.date} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: "#3d5a72", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                <span>{g.date}</span>
                <div style={{ flex: 1, height: 1, background: "#0d1525" }} />
                <span style={{ fontWeight: 400 }}>{g.entries.length} event{g.entries.length !== 1 ? "s" : ""}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {g.entries.map(e => {
                  const cfg = LOG_ICONS[e.type] || LOG_ICONS.edited;
                  const { time } = formatLogTime(e.ts);
                  return (
                    <div key={e.id} style={{ background: "#0c1625", border: `1px solid ${e.undone ? "#334155" : cfg.color+"18"}`,
                      borderLeft: `3px solid ${e.undone ? "#334155" : cfg.color+"60"}`, borderRadius: 7, padding: "9px 14px",
                      display: "flex", alignItems: "flex-start", gap: 12, opacity: e.undone ? 0.45 : 1 }}>
                      <span style={{ fontSize: 14, lineHeight: 1, marginTop: 1, flexShrink: 0 }}>{e.undone ? "↩" : cfg.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 11, color: e.undone ? "#334155" : cfg.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{e.undone ? "Undone" : cfg.label}</span>
                          {e.partner && <span style={{ fontSize: 12, color: "#a8c4e0", fontWeight: 500 }}>{e.partner}</span>}
                          {e.partner && e.campaignName && <span style={{ color: "#1e3048", fontSize: 11 }}>›</span>}
                          {e.campaignName && <span style={{ fontSize: 12, color: e.undone ? "#3d5a72" : "#edf4ff", fontWeight: 600, textDecoration: e.undone ? "line-through" : "none" }}>{e.campaignName}</span>}
                          {e.platform && !e.undone && <span style={{ fontSize: 10, color: PLT_COLORS[e.platform] || PLT_COLORS.default,
                            background: (PLT_COLORS[e.platform] || PLT_COLORS.default) + "18", border: `1px solid ${(PLT_COLORS[e.platform] || PLT_COLORS.default)}40`,
                            borderRadius: 3, padding: "1px 5px", fontWeight: 700 }}>{e.platform}</span>}
                        </div>
                        {e.detail && <div style={{ fontSize: 11, color: e.undone ? "#2a4060" : "#4d6e8a", marginTop: 3 }}>{e.undone ? `Undone — ${e.detail}` : e.detail}</div>}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                        <span style={{ fontSize: 11, color: "#2a4060", whiteSpace: "nowrap" }}>{time}</span>
                        {!e.undone && (e.type === "deleted" || e.type === "created" || e.type === "duplicated" || e.prevSnapshot) && (
                          <button onClick={() => onUndo(e)}
                            title="Undo this action"
                            style={{ background: "#0e1a2e", border: "1px solid #334155", borderRadius: 5,
                              padding: "2px 9px", color: "#7a9bbf", fontSize: 11, cursor: "pointer", fontWeight: 600,
                              whiteSpace: "nowrap" }}>
                            ↩ Undo
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default function App() {
  const today = getToday();
  const COLS = 10;

  const [campaigns, setCampaigns] = useState(()=>{ try { const s=localStorage.getItem(STORAGE_KEY); return s?JSON.parse(s):initialCampaigns; } catch { return initialCampaigns; } });
  const [reminders, setReminders] = useState(()=>{ try { const s=localStorage.getItem(REMINDERS_KEY); return s?JSON.parse(s):[]; } catch { return []; } });
  const [search, setSearch]       = useState("");
  const [fStatus, setFStatus]     = useState("all");
  const [fPlatform, setFPlatform] = useState("all");
  const [fMonthly, setFMonthly]   = useState(false);
  const [sortKey, setSortKey]     = useState("endDate");
  const [sortDir, setSortDir]     = useState("asc");
  const [editTarget, setEditTarget] = useState(null);
  const [showAdd, setShowAdd]     = useState(false);
  const [showExportReminder, setShowExportReminder] = useState(false);
  const [showReminderModal, setShowReminderModal]   = useState(false);
  const [saved, setSaved]         = useState(false);
  const [expanded, setExpanded]   = useState(new Set());
  const [dragId, setDragId]       = useState(null);
  const [dragOverId, setDragOverId] = useState(null);
  const [dateRange, setDateRange] = useState(()=>{ const p=getPresets(); return {preset:"mtd",...p.mtd}; });
  const [activeTab, setActiveTab] = useState("campaigns");
  const [activityLog, setActivityLog] = useState(()=>{ try { const s=localStorage.getItem(ACTIVITY_KEY); return s?JSON.parse(s):[]; } catch { return []; } });

  function addLog(entry) {
    setActivityLog(prev => {
      const next = [{ id: Date.now() + Math.random(), ts: Date.now(), ...entry }, ...prev].slice(0, MAX_LOG_ENTRIES);
      try { localStorage.setItem(ACTIVITY_KEY, JSON.stringify(next)); } catch(e) { console.error(e); }
      return next;
    });
  }

  function handleUndo(entry) {
    const label = entry.campaignName || "campaign";
    if (entry.type === "deleted" && entry.prevSnapshot) {
      // Restore deleted campaign
      if (!window.confirm(`Restore "${label}"?`)) return;
      setCampaigns(cs => [...cs, entry.prevSnapshot]);
      setActivityLog(prev => {
        const next = prev.map(e => e.id === entry.id ? { ...e, undone: true } : e);
        try { localStorage.setItem(ACTIVITY_KEY, JSON.stringify(next)); } catch(e) {}
        return next;
      });
    } else if (entry.type === "created" || entry.type === "duplicated") {
      // Undo creation/duplication = delete the campaign
      if (!window.confirm(`Undo creation of "${label}"? This will delete it.`)) return;
      setCampaigns(cs => cs.filter(c => c.id !== entry.campaignId));
      setActivityLog(prev => {
        const next = prev.map(e => e.id === entry.id ? { ...e, undone: true } : e);
        try { localStorage.setItem(ACTIVITY_KEY, JSON.stringify(next)); } catch(e) {}
        return next;
      });
    } else if (entry.prevSnapshot) {
      // Restore previous state of campaign (status, metrics, edited, checked)
      const actionLabel = { status:"status change", metrics:"metrics update", checked:"check-in", edited:"edit" }[entry.type] || "change";
      if (!window.confirm(`Undo ${actionLabel} for "${label}"? This restores the previous values.`)) return;
      setCampaigns(cs => cs.map(c => c.id === entry.campaignId ? { ...entry.prevSnapshot } : c));
      setActivityLog(prev => {
        const next = prev.map(e => e.id === entry.id ? { ...e, undone: true } : e);
        try { localStorage.setItem(ACTIVITY_KEY, JSON.stringify(next)); } catch(e) {}
        return next;
      });
    }
  }

  useEffect(()=>{ try { localStorage.setItem(STORAGE_KEY,JSON.stringify(campaigns)); setSaved(true); setTimeout(()=>setSaved(false),1400); } catch(e){console.error(e);} },[campaigns]);
  useEffect(()=>{ try { localStorage.setItem(REMINDERS_KEY,JSON.stringify(reminders)); } catch(e){console.error(e);} },[reminders]);
  useEffect(()=>{ const last=localStorage.getItem(EXPORT_KEY); if(!last){setShowExportReminder(true);return;} if((Date.now()-parseInt(last))/(1000*60*60*24)>=3) setShowExportReminder(true); },[]);

  const platforms = useMemo(()=>[...new Set(campaigns.map(c=>c.platform))].sort(),[campaigns]);
  const filtered  = useMemo(()=>{
    let list = campaigns.filter(c=>{
      const q=search.toLowerCase();
      const ms=!q||c.campaignName.toLowerCase().includes(q)||c.mediaPartner.toLowerCase().includes(q)||c.platform.toLowerCase().includes(q);
      return ms&&(fStatus==="all"||(c.status||"")===fStatus)&&(fPlatform==="all"||c.platform===fPlatform)&&(!fMonthly||c.monthlyFlight);
    });
    return [...list].sort((a,b)=>{
      let va=a[sortKey]||"",vb=b[sortKey]||"";
      if(sortKey==="endDate"){va=new Date(va);vb=new Date(vb);}
      return va<vb?(sortDir==="asc"?-1:1):va>vb?(sortDir==="asc"?1:-1):0;
    });
  },[campaigns,search,fStatus,fPlatform,fMonthly,sortKey,sortDir]);

  const stats = useMemo(()=>({
    total: campaigns.length,
    active: campaigns.filter(c=>c.status==="active").length,
    ahead: campaigns.filter(c=>c.status==="pacing-ahead").length,
    behind: campaigns.filter(c=>c.status==="pacing-behind").length,
    off: campaigns.filter(c=>c.status==="off").length,
    soon: campaigns.filter(c=>{ const d=getDaysLeft(c.endDate); return d>=0&&d<=14; }).length,
    closeToGoal: campaigns.filter(c=>c.status==="close-to-goal").length,
    monthlyFlights: campaigns.filter(c=>c.monthlyFlight).length,
  }),[campaigns]);

  const pendingReminders = reminders.filter(r=>!r.dismissed&&r.date<=today).length;

  function toggleExpand(id){ setExpanded(prev=>{ const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n; }); }
  function onDragStart(id){ setDragId(id); }
  function onDragOver(e,id){ e.preventDefault(); setDragOverId(id); }
  function onDrop(e,targetId){
    e.preventDefault();
    if(!dragId||dragId===targetId){ setDragId(null); setDragOverId(null); return; }
    setCampaigns(cs=>{ const from=cs.findIndex(c=>c.id===dragId),to=cs.findIndex(c=>c.id===targetId); const next=[...cs]; const [m]=next.splice(from,1); next.splice(to,0,m); return next; });
    setDragId(null); setDragOverId(null);
  }
  function onDragEnd(){ setDragId(null); setDragOverId(null); }
  function updateCampaign(u, logEntry) {
    setCampaigns(cs => {
      const old = cs.find(c=>c.id===u.id);
      const snap = old ? { ...old } : null;
      if (old && logEntry) {
        addLog({ ...logEntry, campaignName: u.campaignName, partner: u.mediaPartner, platform: u.platform, prevSnapshot: snap, campaignId: u.id });
      } else if (old && !logEntry) {
        if (old.status !== u.status) {
          addLog({ type:"status", campaignName:u.campaignName, partner:u.mediaPartner, platform:u.platform,
            detail:`Status: ${STATUS_CFG[old.status]?.label||old.status||"Unknown"} → ${STATUS_CFG[u.status]?.label||u.status||"Unknown"}`,
            prevSnapshot: snap, campaignId: u.id });
        } else if (old.lastChecked !== u.lastChecked) {
          addLog({ type:"checked", campaignName:u.campaignName, partner:u.mediaPartner, platform:u.platform,
            detail:`Marked checked on ${u.lastChecked}`, prevSnapshot: snap, campaignId: u.id });
        } else if ((old.impressions!==u.impressions||old.ctr!==u.ctr||old.cpm!==u.cpm||old.spend!==u.spend)) {
          const parts = [];
          if(old.impressions!==u.impressions) parts.push(`Impr: ${u.impressions||"—"}`);
          if(old.ctr!==u.ctr) parts.push(`CTR: ${u.ctr||"—"}%`);
          if(old.cpm!==u.cpm) parts.push(`CPM: $${u.cpm||"—"}`);
          if(old.spend!==u.spend) parts.push(`Spend: $${u.spend||"—"}`);
          addLog({ type:"metrics", campaignName:u.campaignName, partner:u.mediaPartner, platform:u.platform,
            detail: parts.join(" · "), prevSnapshot: snap, campaignId: u.id });
        } else {
          addLog({ type:"edited", campaignName:u.campaignName, partner:u.mediaPartner, platform:u.platform,
            detail:"Campaign details updated", prevSnapshot: snap, campaignId: u.id });
        }
      }
      return cs.map(c=>c.id===u.id?u:c);
    });
  }
  function sort(k){ if(sortKey===k) setSortDir(d=>d==="asc"?"desc":"asc"); else { setSortKey(k); setSortDir("asc"); } }

  const doExport = () => {
    try {
      const b=new Blob([JSON.stringify({campaigns,reminders,exportDate:new Date().toISOString()},null,2)],{type:"application/json"});
      const url=URL.createObjectURL(b); const a=document.createElement("a");
      a.href=url; a.download=`campaign-tracker-${today}.json`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
      localStorage.setItem(EXPORT_KEY,Date.now().toString()); setShowExportReminder(false);
    } catch(e){ alert("Export failed: "+e.message); }
  };
  const doImport = (e) => {
    const file=e.target.files[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=evt=>{ try { const p=JSON.parse(evt.target.result); if(p.campaigns&&Array.isArray(p.campaigns)){ if(window.confirm(`Import ${p.campaigns.length} campaigns${p.reminders?` and ${p.reminders.length} reminders`:""}? This replaces current data.`)){ setCampaigns(p.campaigns); if(p.reminders) setReminders(p.reminders); alert("✅ Import successful!"); } } else { alert("❌ Invalid file."); } } catch { alert("❌ Couldn't read file."); } };
    reader.readAsText(file); e.target.value="";
  };

  const TH = ({k,label,style={}}) => (
    <th onClick={()=>k&&sort(k)} style={{padding:"11px 13px",textAlign:"left",fontSize:12,fontWeight:700,color:sortKey===k?"#00e5a0":"#4d6e8a",textTransform:"uppercase",letterSpacing:"0.07em",whiteSpace:"nowrap",cursor:k?"pointer":"default",userSelect:"none",borderBottom:"1px solid #1e293b",...style}}>
      {label}{sortKey===k?(sortDir==="asc"?" ↑":" ↓"):""}
    </th>
  );
  const TD = ({children,style={}}) => <td style={{padding:"14px 12px",borderBottom:"1px solid #060c18",verticalAlign:"middle",...style}}>{children}</td>;

  return (
    <div style={{minHeight:"100vh",background:"#070d16",fontFamily:"'Inter','Segoe UI',system-ui,sans-serif",color:"#d8eaf8",fontSize:15}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-track{background:#0b1624;}
        ::-webkit-scrollbar-thumb{background:#1e3350;border-radius:3px;}
        input,select{outline:none;font-family:inherit;}
        input[type=number]::-webkit-inner-spin-button{opacity:.3;}
        input::placeholder{color:#1e3a50;}
        .crow:hover td{background:#0a1c32!important;}
        .crow:hover .star-toggle{opacity:1!important;}
        button{font-family:inherit;}
        .xbtn{transition:transform .18s ease;}
        td,th{font-variant-numeric:tabular-nums;}
      `}</style>

      {/* Header */}
      <div style={{background:"linear-gradient(180deg,#0e2038 0%,#0c1625 100%)",borderBottom:"1px solid #00c89628",borderTop:"2px solid #00c896",padding:"13px 20px",position:"sticky",top:0,zIndex:50}}>
        <div style={{maxWidth:1600,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:17,fontWeight:800,color:"#00e5a0",letterSpacing:"-0.03em"}}>Campaign Tracker</span>
            <span style={{fontSize:11,padding:"2px 7px",borderRadius:4,background:saved?"#00200f":"transparent",color:saved?"#00d48a":"transparent",border:saved?"1px solid #22c55e40":"1px solid transparent",transition:"all .3s",fontWeight:600}}>✓ Saved</span>
          </div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            <button onClick={()=>setShowReminderModal(true)} style={{position:"relative",background:pendingReminders>0?"#130a00":"#0e1a2e",border:`1px solid ${pendingReminders>0?"#f59e0b60":"#1e293b"}`,borderRadius:7,padding:"6px 13px",color:pendingReminders>0?"#f59e0b":"#4d6e8a",fontWeight:600,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
              🔔 Reminders
              {pendingReminders>0 && <span style={{background:"#ef4444",color:"#fff",borderRadius:10,padding:"0px 5px",fontSize:10,fontWeight:700,minWidth:16,textAlign:"center"}}>{pendingReminders}</span>}
            </button>
            <button onClick={()=>{ setCampaigns(cs=>cs.map(c=>({...c,lastChecked:today}))); addLog({type:"checked",campaignName:"All campaigns",partner:"",platform:"",detail:`Bulk marked all checked on ${today}`}); }} style={{background:"#002e24",border:"1px solid #3b82f640",borderRadius:7,padding:"6px 13px",color:"#00e5a0",fontWeight:600,fontSize:13,cursor:"pointer"}}>✓ Mark All Checked</button>
            <button onClick={()=>setShowAdd(true)} style={{background:"#00200f",border:"1px solid #22c55e40",borderRadius:7,padding:"6px 13px",color:"#00d48a",fontWeight:600,fontSize:13,cursor:"pointer"}}>+ Add Campaign</button>
            <button onClick={doExport} style={{background:"#162236",border:"1px solid #334155",borderRadius:7,padding:"6px 13px",color:"#7a9bbf",fontWeight:600,fontSize:13,cursor:"pointer"}}>↓ Export</button>
            <label style={{background:"#162236",border:"1px solid #334155",borderRadius:7,padding:"6px 13px",color:"#7a9bbf",fontWeight:600,fontSize:13,cursor:"pointer",whiteSpace:"nowrap"}}>
              ↑ Import<input type="file" accept=".json" style={{display:"none"}} onChange={doImport}/>
            </label>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{background:"#0a1220",borderBottom:"1px solid #1e293b"}}>
        <div style={{maxWidth:1600,margin:"0 auto",padding:"0 20px",display:"flex",gap:0}}>
          {[
            {key:"campaigns", label:"📋 Campaigns"},
            {key:"activity",  label:`📜 Activity Log${activityLog.length>0?" ("+activityLog.length+")":""}`},
          ].map(t=>(
            <button key={t.key} onClick={()=>setActiveTab(t.key)}
              style={{background:"none",border:"none",borderBottom:activeTab===t.key?"2px solid #00e5a0":"2px solid transparent",
                padding:"11px 20px",color:activeTab===t.key?"#00e5a0":"#4d6e8a",fontSize:13,fontWeight:activeTab===t.key?700:400,
                cursor:"pointer",transition:"all .15s",marginBottom:-1}}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:1600,margin:"0 auto",padding:"18px 20px 40px"}}>
        {activeTab==="activity" ? (
          <ActivityLog log={activityLog} campaigns={campaigns} onUndo={handleUndo} onClear={()=>{ if(window.confirm("Clear the entire activity log?")){ setActivityLog([]); try{localStorage.removeItem(ACTIVITY_KEY);}catch(e){} }}} />
        ) : (<>
        <ReminderAlertBanner reminders={reminders} onOpen={()=>setShowReminderModal(true)} onDismissAll={()=>setReminders(prev=>prev.map(r=>r.date<=today?{...r,dismissed:true}:r))}/>

        {showExportReminder && (
          <div style={{background:"#0d1a0a",border:"1px solid #f59e0b60",borderRadius:10,padding:"12px 18px",marginBottom:14,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:18}}>💾</span>
              <div>
                <div style={{color:"#f59e0b",fontWeight:700,fontSize:13}}>Time to back up your data!</div>
                <div style={{color:"#92400e",fontSize:11,marginTop:1}}>It's been 3+ days since your last export.</div>
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={doExport} style={{background:"#f59e0b",border:"none",borderRadius:7,padding:"7px 16px",color:"#000",fontWeight:700,fontSize:12,cursor:"pointer"}}>↓ Export Now</button>
              <button onClick={()=>{localStorage.setItem(EXPORT_KEY,Date.now().toString());setShowExportReminder(false);}} style={{background:"none",border:"1px solid #92400e",borderRadius:7,padding:"7px 12px",color:"#92400e",fontWeight:600,fontSize:12,cursor:"pointer"}}>Remind me later</button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div style={{display:"flex",gap:9,flexWrap:"wrap",marginBottom:14}}>
          {[{label:"Total",val:stats.total,color:"#7a9bbf"},{label:"Active",val:stats.active,color:"#00d48a"},{label:"Ahead",val:stats.ahead,color:"#fb923c"},{label:"Behind",val:stats.behind,color:"#fde047"},{label:"Close to Goal",val:stats.closeToGoal,color:"#00e5c0"},{label:"Off",val:stats.off,color:"#ef4444"},{label:"≤14d End",val:stats.soon,color:"#f87171"},{label:"★ Monthly",val:stats.monthlyFlights,color:"#00e5c0"}].map(s=>(
            <div key={s.label} style={{background:"#0e1a2e",border:`1px solid ${s.color}30`,borderRadius:8,padding:"9px 15px",minWidth:75}}>
              <div style={{fontSize:22,fontWeight:800,color:s.color,lineHeight:1,letterSpacing:"-0.02em"}}>{s.val}</div>
              <div style={{fontSize:11,color:"#4d6e8a",marginTop:3,textTransform:"uppercase",letterSpacing:"0.05em"}}>{s.label}</div>
            </div>
          ))}
          <div style={{marginLeft:"auto",alignSelf:"center",fontSize:11,color:"#3d5a72"}}>Today: {today}</div>
        </div>

        <DateBar range={dateRange} setRange={setDateRange}/>

        {/* Filters */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:14}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search campaigns, partners, platforms…" style={{background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:7,padding:"8px 14px",color:"#d8eaf8",fontSize:14,width:280}}/>
          <select value={fStatus!=="all"?fStatus:(fMonthly?"__monthly__":"all")} onChange={e=>{ if(e.target.value==="__monthly__"){setFMonthly(true);setFStatus("all");}else{setFMonthly(false);setFStatus(e.target.value);} }} style={{background:"#0e1a2e",border:`1px solid ${fMonthly?"#00e5c0":"#162236"}`,borderRadius:7,padding:"7px 11px",color:fMonthly?"#00e5c0":"#7a9bbf",fontSize:13,fontWeight:fMonthly?700:400}}>
            <option value="all">All Statuses</option>
            {Object.entries(STATUS_CFG).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
            <option value="__monthly__">★ Monthly Flights</option>
          </select>
          <select value={fPlatform} onChange={e=>setFPlatform(e.target.value)} style={{background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:7,padding:"7px 11px",color:"#7a9bbf",fontSize:13}}>
            <option value="all">All Platforms</option>
            {platforms.map(p=><option key={p}>{p}</option>)}
          </select>
          <span style={{fontSize:11,color:"#3d5a72"}}>{filtered.length} result{filtered.length!==1?"s":""}</span>
        </div>

        {/* Table */}
        <div style={{background:"#0c1625",border:"1px solid #1e293b",borderRadius:10,overflow:"hidden"}}>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:920}}>
              <thead>
                <tr style={{background:"#070d16"}}>
                  <th style={{width:28,borderBottom:"1px solid #1e293b"}}/>
                  <th style={{width:36,borderBottom:"1px solid #1e293b"}}/>
                  <TH k="mediaPartner" label="Partner"/>
                  <TH k="campaignName" label="Campaign"/>
                  <TH k="platform" label="Platform"/>
                  <TH k="status" label="Status"/>
                  <TH k={null} label="Goal"/>
                  <TH k="endDate" label="End Date"/>
                  <TH k="lastChecked" label="Last Checked"/>
                  <th style={{padding:"10px 12px",fontSize:11,color:"#4d6e8a",borderBottom:"1px solid #1e293b",textTransform:"uppercase",letterSpacing:"0.07em"}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c,i) => {
                  const stale = c.lastChecked!==today;
                  const open  = expanded.has(c.id);
                  const hasData = !!(c.impressions||c.ctr||c.cpm||c.spend);
                  const rowBg = i%2===0?"#0c1625":"#090f1c";
                  const soonDate = new Date(today); soonDate.setDate(soonDate.getDate()+3); const soonStr=soonDate.toISOString().slice(0,10);
                  const campReminders = reminders.filter(r=>!r.dismissed&&r.campaignId===c.id&&r.date<=today);
                  const campUpcoming  = reminders.filter(r=>!r.dismissed&&r.campaignId===c.id&&r.date>today&&r.date<=soonStr);
                  return (
                    <Fragment key={c.id}>
                      <tr
                        className="crow"
                        draggable="true"
                        onDragStart={()=>onDragStart(c.id)}
                        onDragOver={e=>onDragOver(e,c.id)}
                        onDrop={e=>onDrop(e,c.id)}
                        onDragEnd={onDragEnd}
                        style={{background:dragOverId===c.id?"#0a1c30":rowBg,opacity:dragId===c.id?0.4:1,transition:"opacity .15s,background .1s"}}
                      >
                        <td style={{padding:"0 0 0 6px",borderBottom:"1px solid #060c18",textAlign:"center",verticalAlign:"middle",width:28,cursor:"grab"}}>
                          <span style={{color:"#1e3048",fontSize:12,userSelect:"none",display:"block",lineHeight:1}}>⠿</span>
                        </td>
                        <td style={{padding:"0 0 0 8px",borderBottom:"1px solid #060c18",textAlign:"center",verticalAlign:"middle",width:36}}>
                          <button onClick={()=>toggleExpand(c.id)} className="xbtn" style={{background:"none",border:"none",cursor:"pointer",padding:"5px 6px",color:hasData?"#00c896":"#1e3048",transform:open?"rotate(90deg)":"rotate(0deg)",fontSize:11,lineHeight:1,display:"block",margin:"0 auto"}}>▶</button>
                        </td>
                        <TD><span style={{color:"#a8c4e0",fontWeight:500}}>{c.mediaPartner.trim()}</span></TD>
                        <TD>
                          <div style={{display:"flex",alignItems:"center",gap:5}}>
                            <span style={{color:"#edf4ff",fontWeight:600}}>{c.campaignName.trim()}</span>
                            {c.monthlyFlight && <button onClick={()=>updateCampaign({...c,monthlyFlight:false})} style={{background:"none",border:"none",padding:0,cursor:"pointer",color:"#00e5c0",fontSize:13,lineHeight:1,flexShrink:0}}>★</button>}
                            {!c.monthlyFlight && <button onClick={()=>updateCampaign({...c,monthlyFlight:true})} style={{background:"none",border:"none",padding:0,cursor:"pointer",color:"#1e3048",fontSize:13,lineHeight:1,flexShrink:0,opacity:0}} className="star-toggle">★</button>}
                            {campReminders.length>0 && (
                              <button onClick={()=>setShowReminderModal(true)} title="Reminder due!" style={{background:"#f59e0b20",border:"1px solid #f59e0b60",borderRadius:10,padding:"1px 6px",fontSize:10,color:"#f59e0b",fontWeight:700,cursor:"pointer",flexShrink:0}}>🔔 {campReminders.length}</button>
                            )}
                            {campUpcoming.length>0 && campReminders.length===0 && (
                              <button onClick={()=>setShowReminderModal(true)} title={`${campUpcoming.length} reminder${campUpcoming.length>1?"s":""} coming up soon`} style={{background:"#1e293b",border:"1px solid #475569",borderRadius:10,padding:"1px 6px",fontSize:10,color:"#94a3b8",fontWeight:600,cursor:"pointer",flexShrink:0,opacity:0.75}}>🔔 {campUpcoming.length}</button>
                            )}
                            {c.note2&&c.note2.trim()&&<span title={c.note2.trim()} style={{background:"#200808",border:"1px solid #ef444460",borderRadius:3,padding:"1px 5px",fontSize:9,color:"#ef4444",fontWeight:700,letterSpacing:"0.05em",whiteSpace:"nowrap",flexShrink:0,cursor:"default"}}>⚠ {c.note2.trim().length>18?c.note2.trim().slice(0,18)+"…":c.note2.trim()}</span>}
                          </div>
                          {c.note1&&c.note1.trim()&&<div style={{fontSize:11,color:"#00ffb3",marginTop:3,fontWeight:500,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:220}} title={c.note1}>{c.note1.trim()}</div>}
                          {!open&&hasData&&(
                            <div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:4}}>
                              <MetricPill label="IMP" value={c.impressions} color="#00e5a0"/>
                              <MetricPill label="CTR" value={c.ctr} color="#00ffb3" suffix="%"/>
                              <MetricPill label="CPM" value={c.cpm} color="#fb923c" prefix="$"/>
                              <MetricPill label="SPEND" value={c.spend} color="#f472b6" prefix="$"/>
                            </div>
                          )}
                        </TD>
                        <TD><PlatformTag p={c.platform}/></TD>
                        <TD>
                          <div style={{display:"flex",alignItems:"center",gap:5}}>
                            <StatusBadge status={c.status}/>
                            <select value={c.status||""} onChange={e=>updateCampaign({...c,status:e.target.value})} style={{background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:4,color:"#4d6e8a",fontSize:10,padding:"1px 4px",cursor:"pointer"}}>
                              {Object.entries(STATUS_CFG).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
                            </select>
                          </div>
                        </TD>
                        <TD style={{maxWidth:170}}><span style={{color:"#7a9bbf",fontSize:13,display:"block",fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:160}} title={c.goal}>{c.goal}</span></TD>
                        <TD><EndChip d={c.endDate}/></TD>
                        <TD>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <span style={{fontSize:13,color:stale?"#f59e0b":"#00d48a",fontWeight:stale?600:400}}>{c.lastChecked}</span>
                            {stale&&<button onClick={()=>updateCampaign({...c,lastChecked:today})} style={{background:"#002018",border:"1px solid #22c55e40",borderRadius:4,color:"#00ffb3",fontSize:10,padding:"1px 6px",cursor:"pointer",fontWeight:700}}>✓</button>}
                          </div>
                        </TD>
                        <TD>
                          <div style={{display:"flex",gap:5}}>
                            <button onClick={()=>setEditTarget(c)} style={{background:"#162236",border:"1px solid #334155",borderRadius:5,color:"#7a9bbf",fontSize:11,padding:"4px 9px",cursor:"pointer",fontWeight:600}}>Edit</button>
                            <button onClick={()=>{ const copy={...c,id:Date.now(),campaignName:c.campaignName+" (copy)",impressions:"",ctr:"",cpm:"",spend:""}; setCampaigns(cs=>{ const idx=cs.findIndex(x=>x.id===c.id); const n=[...cs]; n.splice(idx+1,0,copy); return n; }); addLog({type:"duplicated",campaignName:copy.campaignName,partner:copy.mediaPartner,platform:copy.platform,detail:`Duplicated from "${c.campaignName}"`,campaignId:copy.id,prevSnapshot:null}); setEditTarget(copy); }} style={{background:"#091a2a",border:"1px solid #1e3a5f",borderRadius:5,color:"#00e5a0",fontSize:11,padding:"4px 8px",cursor:"pointer",fontWeight:600}}>⧉</button>
                            <button onClick={()=>{ if(window.confirm("Delete this campaign?")) { addLog({type:"deleted",campaignName:c.campaignName,partner:c.mediaPartner,platform:c.platform,detail:`Campaign deleted`,campaignId:c.id,prevSnapshot:{...c}}); setCampaigns(cs=>cs.filter(x=>x.id!==c.id)); } }} style={{background:"#1a0808",border:"1px solid #ef444440",borderRadius:5,color:"#ef4444",fontSize:11,padding:"4px 8px",cursor:"pointer",fontWeight:600}}>✕</button>
                          </div>
                        </TD>
                      </tr>
                      {open && <MetricRow key={"m"+c.id} c={c} colSpan={COLS} onUpdate={updateCampaign} dateRange={dateRange}/>}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
            {filtered.length===0 && <div style={{textAlign:"center",padding:"50px 0",color:"#3d5a72"}}>No campaigns match your filters.</div>}
          </div>
        </div>
        <div style={{marginTop:8,fontSize:11,color:"#1e3048",textAlign:"right"}}>▶ click to expand metrics · blue arrow = data entered</div>
      </>
      )}
      </div>

      {editTarget && <Modal campaign={editTarget} onSave={u=>{ updateCampaign(u); setEditTarget(null); }} onClose={()=>setEditTarget(null)}/>}
      {showAdd    && <Modal isNew onSave={n=>{ setCampaigns(cs=>[...cs,n]); addLog({type:"created",campaignName:n.campaignName,partner:n.mediaPartner,platform:n.platform,detail:`New campaign added`,campaignId:n.id,prevSnapshot:null}); setShowAdd(false); }} onClose={()=>setShowAdd(false)}/>}
      {showReminderModal && <ReminderModal campaigns={campaigns} reminders={reminders} setReminders={setReminders} onClose={()=>setShowReminderModal(false)}/>}
    </div>
  );
}
