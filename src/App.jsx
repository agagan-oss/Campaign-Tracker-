import React, { useState, useMemo, useEffect, useRef, Fragment } from "react";

const STORAGE_KEY = "campaign-tracker-v3";
const ZEUS_KEY = "campaign-tracker-zeus";
const EXPORT_KEY = "campaign-tracker-last-export";
const REMINDERS_KEY = "campaign-tracker-reminders";
const ACTIVITY_KEY = "campaign-tracker-activity";
const ARCHIVE_KEY = "campaign-tracker-archive";
const ARCHIVE_DAYS = 5;
const MAX_LOG_ENTRIES = 500;

const initialCampaigns = [{"mediaPartner":"WVR","campaignName":"Harry Green CDJR","platform":"FB","goal":"750K (7/1/25 - 12/31/25)","endDate":"2026-06-30","note1":"125K/Mo","note2":"","lastChecked":"2026-03-02","id":1769125165003,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Compass TK","campaignName":"Farm Bureau Financial-Jim Waters","platform":"TD","goal":"1.58M (8/11/25 - 7/31/26)","endDate":"2026-07-31","note1":"131.6K/Mo","note2":"","lastChecked":"2026-03-02","id":1769125792921,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Saginaw","campaignName":"Great Lakes Pace","platform":"FB","goal":"863K (8/20/25 - 7/31/26)","endDate":"2026-07-25","note1":"72K/Mo","note2":"","lastChecked":"2026-03-02","id":1769209400165,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Palm Springs","campaignName":"Carpet Empire Plus","platform":"FB","goal":"863K (8/20/25 - 7/31/26)","endDate":"2026-07-31","note1":"72K/Mo","note2":"","lastChecked":"2026-03-02","id":1769209535972,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Palm Springs","campaignName":"Carpet Empire Plus","platform":"DSP","goal":"863K (8/20/25 - 7/31/26)","endDate":"2026-07-31","note1":"72K/Mo","note2":"","lastChecked":"2026-03-02","id":1769209663140,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha San Antonio","campaignName":"Olympia Hills Golf","platform":"TD","goal":"143K (10/1/25 - 9/30/26)","endDate":"2026-09-30","note1":"12K/Mo","note2":"","lastChecked":"2026-03-02","id":1769214676416,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha San Antonio","campaignName":"Olympia Hills Golf","platform":"FB","goal":"1.08M (10/1/25 - 9/30/26)","endDate":"2026-09-30","note1":"90K/Mo","note2":"","lastChecked":"2026-03-02","id":1769214678888,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha San Antonio","campaignName":"Olympia Hills Golf","platform":"DSP","goal":"1.08M (10/1/25 - 9/30/26)","endDate":"2026-09-30","note1":"90K/Mo","note2":"","lastChecked":"2026-03-02","id":1769214712742,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Britestar Milwaukee Middle School","platform":"TD","goal":"100K Monthly","endDate":"2026-03-31","note1":"100K Monthly","note2":"","lastChecked":"2026-03-02","id":1769214781502,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star South","platform":"TD","goal":"40K Feb/March","endDate":"2026-03-31","note1":"40K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439021921,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star South","platform":"FB","goal":"25K Feb/March","endDate":"2026-03-31","note1":"25K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439025194,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star South","platform":"FBV","goal":"20K Feb/March","endDate":"2026-03-31","note1":"20K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439086411,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star South","platform":"DSP","goal":"25K Feb/March","endDate":"2026-03-31","note1":"25K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439117040,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star South","platform":"SEM","goal":"Need New Budget for February","endDate":"2026-01-31","note1":"Need New Budget for February","note2":"","lastChecked":"2026-03-02","id":1769439141224,"status":"off","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star Christian","platform":"TD","goal":"40K Feb/March","endDate":"2026-03-31","note1":"40K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439175821,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star Christian","platform":"FB","goal":"25K Feb/March","endDate":"2026-03-31","note1":"25K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439200352,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star Christian","platform":"FBV","goal":"20K Feb/March","endDate":"2026-03-31","note1":"20K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439219988,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star Christian","platform":"DSP","goal":"25K Feb/March","endDate":"2026-03-31","note1":"25K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439236958,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star Christian","platform":"SEM","goal":"Need New Budget for February","endDate":"2026-01-31","note1":"Need New Budget for February","note2":"","lastChecked":"2026-03-02","id":1769439252985,"status":"off","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"Noyes Development","platform":"TD","goal":"14.5K/Mo","endDate":"2026-03-31","note1":"14.5K/Mo","note2":"","lastChecked":"2026-03-02","id":1769439379921,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"Chown Hardware","platform":"TD","goal":"500K (10/17/25 - 3/31/26)","endDate":"2026-03-31","note1":"97K/Mo","note2":"","lastChecked":"2026-03-02","id":1769439513145,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"Chown Hardware","platform":"CTV","goal":"291K (10/17/25 - 3/31/26)","endDate":"2026-03-31","note1":"66K/Mo","note2":"","lastChecked":"2026-03-02","id":1769439528551,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"Chown Hardware","platform":"OTT","goal":"207K (10/17/25 - 3/31/26)","endDate":"2026-03-31","note1":"47K/Mo","note2":"","lastChecked":"2026-03-02","id":1769439581123,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"Chown Hardware","platform":"EMAIL","goal":"5 Emails","endDate":"2026-03-31","note1":"1/Mo","note2":"","lastChecked":"2026-03-02","id":1769440542802,"status":"off","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"WSU Tri Cities","platform":"FB","goal":"283K (11/3/25 - 5/31/26)","endDate":"2026-05-31","note1":"41K/Mo (15-20% Oregon)","note2":"","lastChecked":"2026-03-02","id":1769440737136,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"WSU Tri Cities ","platform":"FBV","goal":"175K (11/3/25 - 5/31/26)","endDate":"2026-05-31","note1":"25K/Mo ","note2":"","lastChecked":"2026-03-02","id":1772483657607,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"WSU Tri Cities","platform":"DSP","goal":"460K (11/3/25 - 5/31/26) ","endDate":"2026-05-31","note1":"67K/Mo (15-20% Oregon)","note2":"","lastChecked":"2026-03-02","id":1772483749345,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"WSU Tri Cities","platform":"TD","goal":"70K (11/3/25 - 5/31/26)","endDate":"2026-05-31","note1":"10K/Mo","note2":"","lastChecked":"2026-03-02","id":1772483792126,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true},{"mediaPartner":"Alpha Portland","campaignName":"WSU Tri Cities Audio","platform":"TD","goal":"296K (11/3/25 - 5/31/26)","endDate":"2026-05-31","note1":"59.5K/Mo","note2":"","lastChecked":"2026-03-02","id":1772483819653,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true},{"mediaPartner":"Alpha Jackson","campaignName":"Job Corps Centers of America","platform":"FB","goal":"900K (11/4/25 - 3/31/26)","endDate":"2026-03-31","status":"active","note1":"180K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484331559},{"mediaPartner":"Alpha Jackson","campaignName":"Job Corps Centers of America","platform":"DSP","goal":"1.275M (11/4/25 - 3/31/26) ","endDate":"2026-03-31","status":"active","note1":"255K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484347656},{"mediaPartner":"Alpha Jackson","campaignName":"Job Corps Centers of America ","platform":"SP","goal":"375K (11/4/25 - 3/31/26)","endDate":"2026-03-31","status":"active","note1":"75K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484372498},{"mediaPartner":"Alpha Jackson","campaignName":"Job Corps Centers of America  ","platform":"CTV","goal":"435K (11/4/25 - 3/31/26)","endDate":"2026-03-31","status":"active","note1":"87K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484401165},{"mediaPartner":"Alpha Jackson","campaignName":"Job Corps Centers of America ","platform":"OTT","goal":"298K (11/4/25 - 3/31/26)","endDate":"2026-03-31","status":"active","note1":"60K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484418938},{"mediaPartner":"WVR","campaignName":"Concord University","platform":"FB","goal":"63K (3/1/26 - 5/31/26)","endDate":"2026-05-31","status":"active","note1":"21K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484485079},{"mediaPartner":"WVR","campaignName":"Concord University ","platform":"SP","goal":"63K (3/1/26 - 5/31/26)","endDate":"2026-05-31","status":"active","note1":"21K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484490232},{"mediaPartner":"WVR","campaignName":"Concord University ","platform":"DSP","goal":"63K (3/1/26 - 5/31/26)","endDate":"2026-05-31","status":"active","note1":"21K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772484503162},{"mediaPartner":"Enchanting Media","campaignName":"Waterview Casino","platform":"FB","goal":"95K March","endDate":"2026-03-31","status":"active","note1":"95K March ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484624626},{"mediaPartner":"Enchanting Media","campaignName":"Waterview Casino","platform":"DSP","goal":"95K March","endDate":"2026-03-31","status":"active","note1":"95K March ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772484630475},{"mediaPartner":"Alpha Moberly","campaignName":"Right Rate Roofing","platform":"SEM","goal":"5,400 (12/4/25 - 7/30/26) ","endDate":"2026-07-31","status":"active","note1":"$900/Mo ","note2":" $1,564 March ","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484709093},{"mediaPartner":"Compass","campaignName":"Bolz Chiro","platform":"FB","goal":"400K (1/1/26 - 4/30/26)","endDate":"2026-03-31","status":"active","note1":"100K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484763564},{"mediaPartner":"Compass","campaignName":"Brownstone","platform":"DSP","goal":"229K (12/12/25 - 3/31/26)","endDate":"2026-03-31","status":"active","note1":"58K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772484790999},{"mediaPartner":"Compass","campaignName":"Brownstone ","platform":"FB","goal":"80K (12/12/25 - 3/31/26)","endDate":"2026-03-31","status":"active","note1":"20K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484798543},{"mediaPartner":"Compass","campaignName":"Brownstone  ","platform":"FBV","goal":"148K (12/12/25 - 3/31/26) ","endDate":"2026-03-31","status":"active","note1":"37K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484823373},{"mediaPartner":"Alpha Moberly","campaignName":"Specs Quincy","platform":"FB","goal":"300K (1/1/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"25K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484872046},{"mediaPartner":"Alpha Moberly","campaignName":"Specs Quincy","platform":"DSP","goal":"300K (1/1/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"25K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484887059},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Pearl Hawaii Federal Credit Union","platform":"SEM","goal":"$35,091 Media Spend (1/13/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"$2,925/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484925304},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Pearl Hawaii Federal Credit Union ","platform":"CTV","goal":"375K (1/14/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"31,250/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484928999},{"mediaPartner":"Alpha Moberly","campaignName":"Prairieland FS","platform":"DSP","goal":"445K (1/16/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"37.5K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772484986463},{"mediaPartner":"Alpha Moberly","campaignName":"Prairieland FS ","platform":"FB","goal":"445K (1/16/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"40.5K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485011820},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Holo HIIT","platform":"FBV","goal":"63K (1/16/26 - 3/31/26)","endDate":"2026-03-31","status":"off","note1":"","note2":"FB Access ","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485059494},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Holo HIIT ","platform":"FBV","goal":"63K (1/16/26 - 3/31/26)","endDate":"2026-03-31","status":"off","note1":"30K Feb/March","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485067041},{"mediaPartner":"Alpha Moberly","campaignName":"Culligan of Hanibal","platform":"DSP","goal":"758K (1/22/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"72K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485129272},{"mediaPartner":"Alpha Moberly","campaignName":"Quincy Catholic Elementary School","platform":"FB","goal":"125K (2/1/26 - 12/31/26)","endDate":"2026-12-31","status":"off","note1":"100K 2/1 - 4/30 (25K December)","note2":"FB Access/Creatives ","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485194758},{"mediaPartner":"Alpha Moberly","campaignName":"Quincy Catholic Elementary School ","platform":"DSP","goal":"125K (2/1/26 - 12/31/26)","endDate":"2026-12-31","status":"off","note1":"100K 2/1 - 4/30 (25K December)","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485211288},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Leavitt Yamane & Soldner","platform":"DSP","goal":"1.025M (2/9/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"93.5K/Mo ","note2":"Streaming Orders/Mo","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485298961},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Leavitt Yamane & Soldner","platform":"FB","goal":"1.025M (2/9/26 - 12/31/26)","endDate":"2026-12-31","status":"off","note1":"93.5K/Mo ","note2":"FB Access","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485347220},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Aloha Sugarcane Juices","platform":"TD","goal":"172K (2/16/26 - 4/30/26)","endDate":"2026-04-30","status":"active","note1":"58K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485429793},{"mediaPartner":"WVR","campaignName":"Fairmont State University (Ohio)","platform":"DSP","goal":"152K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"38K/Mo March/April/May 19K June","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485804286},{"mediaPartner":"WVR","campaignName":"Fairmont State University (Ohio) ","platform":"FB","goal":"152K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"38K/Mo March/April/May 19K June","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485820512},{"mediaPartner":"WVR","campaignName":"Fairmont State University (Ohio) ","platform":"SP","goal":"152K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"38K/Mo March/April/May 19K June","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485828817},{"mediaPartner":"WVR","campaignName":"Fairmont State University (PA)","platform":"DSP","goal":"375K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"94K/Mo March/April/May 47K/Mo June","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485842011},{"mediaPartner":"WVR","campaignName":"Fairmont State University (PA)","platform":"FB","goal":"375K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"94K/Mo March/April/May 47K/Mo June","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485880132},{"mediaPartner":"WVR","campaignName":"Fairmont State University (PA) ","platform":"SP","goal":"375K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"94K/Mo March/April/May 47K/Mo June","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485887909},{"mediaPartner":"WVR","campaignName":"Fairmont State University (WV)","platform":"DSP","goal":"347K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"87K/Mo March/April/May 44K June ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485904806},{"mediaPartner":"WVR","campaignName":"Fairmont State University (MD)","platform":"DSP","goal":"44.5K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"11.1K/Mo March/April/May 6K June ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772486056686},{"mediaPartner":"WVR","campaignName":"Fairmont State University (MD) ","platform":"FB","goal":"44.5K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"11.1K/Mo March/April/May 6K June ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486135542},{"mediaPartner":"WVR","campaignName":"Fairmont State University (MD)  ","platform":"SP","goal":"44.5K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"11.1K/Mo March/April/May 6K June ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486155939},{"mediaPartner":"WVR","campaignName":"Fairmont State University (WV) ","platform":"FB","goal":"347K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"87K/Mo March/April/May 44K June ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486026268},{"mediaPartner":"WVR","campaignName":"Fairmont State University (WV) ","platform":"SP","goal":"347K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"87K/Mo March/April/May 44K June ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486034400},{"mediaPartner":"Allen Media Broadcasting","campaignName":"King Windward Nissan ","platform":"TD","goal":"179K (2/20/26 - 3/15/26)","endDate":"2026-03-15","status":"active","note1":"","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486199815},{"mediaPartner":"Allen Media Broadcasting","campaignName":"City of Dubuque","platform":"FB","goal":"20K (3/2/26 - 4/30/26)","endDate":"2026-04-30","status":"active","note1":"10K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486231814},{"mediaPartner":"Allen Media Broadcasting","campaignName":"City of Dubuque ","platform":"FBV","goal":"12K (3/2/26 - 4/30/26)","endDate":"2026-04-30","status":"active","note1":"6K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486241660},{"mediaPartner":"Allen Media Broadcasting","campaignName":"City of Dubuque ","platform":"FBV","goal":"35K (3/2/26 - 4/30/26)","endDate":"2026-04-30","status":"active","note1":"18K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486264350},{"mediaPartner":"Allen Media Broadcasting","campaignName":"City of Dubuque ","platform":"YT","goal":"6K Views (3/2/26 - 4/30/26)","endDate":"2026-04-30","status":"active","note1":"3K Views/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486294122},{"mediaPartner":"Allen Media Broadcasting","campaignName":"City of Dubuque  ","platform":"TD","goal":"91K (3/2/26 - 4/30/26)","endDate":"2026-04-30","status":"active","note1":"46K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772486311325}];

const ALL_PLATFORMS_DEFAULT = ["FB","FBV","DSP","CTV","OTT","OTTD","SP","SEM","TD","TT","IG","YT","EMAIL"];
const CUSTOM_PLATFORMS_KEY = "campaign-tracker-custom-platforms";
const CUSTOM_BENCHMARKS_KEY = "campaign-tracker-zeus-benchmarks";
function loadCustomPlatforms() { try{const s=localStorage.getItem(CUSTOM_PLATFORMS_KEY);return s?JSON.parse(s):{platforms:[],colors:{}}}catch{return{platforms:[],colors:{}}}}
function saveCustomPlatforms(d){try{localStorage.setItem(CUSTOM_PLATFORMS_KEY,JSON.stringify(d))}catch(e){}}
// ALL_PLATFORMS stays as a live array that includes custom additions
const ALL_PLATFORMS = (()=>{const c=loadCustomPlatforms();return[...ALL_PLATFORMS_DEFAULT,...c.platforms.filter(p=>!ALL_PLATFORMS_DEFAULT.includes(p))];})();
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
const PLT_COLORS_DEFAULT = {
  SEM:"#b91c1c", TD:"#00ffb3", DSP:"#7dd3fc", FB:"#f472b6",
  FBV:"#a855f7", CTV:"#a8c4e0", OTT:"#6b7280", OTTD:"#003a5c",
  YT:"#6effd8", SP:"#fde047", EMAIL:"#fb923c", TT:"#7a9bbf",
  IG:"#e1306c", default:"#4d6e8a"
};
const PLT_COLORS = (()=>{const c=loadCustomPlatforms();return{...PLT_COLORS_DEFAULT,...c.colors};})();

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
function fmtDate(d) {
  if (!d) return "";
  const [y,m,day] = d.split("-");
  return `${m}/${day}/${y}`;
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

function getSnapshotKey(preset) {
  if (preset === "mtd")                             return "mtd";
  if (["last30","last7","today"].includes(preset))  return "last30";
  if (preset === "yesterday")                       return "yesterday";
  return null;
}
function resolveMetrics(c, preset) {
  const key = getSnapshotKey(preset);
  if (key && c.metaSnapshots && c.metaSnapshots[key]) {
    const s = c.metaSnapshots[key];
    return { impressions:s.impressions!=null?String(s.impressions):"", ctr:s.ctr!=null?String(s.ctr):"", cpm:s.cpm!=null?String(s.cpm):"", spend:s.spend!=null?String(s.spend):"", clicks:s.clicks!=null?String(s.clicks):"", source:"meta", snapshotKey:key };
  }
  if (key && c.ttdSnapshots && c.ttdSnapshots[key]) {
    const s = c.ttdSnapshots[key];
    return { impressions:s.impressions!=null?String(s.impressions):"", ctr:s.ctr!=null?String(s.ctr):"", cpm:s.cpm!=null?String(s.cpm):"", spend:s.spend!=null?String(s.spend):"", clicks:s.clicks!=null?String(s.clicks):"", source:"ttd", snapshotKey:key };
  }
  if (key && c.dspSnapshots && c.dspSnapshots[key]) {
    const s = c.dspSnapshots[key];
    return { impressions:s.impressions!=null?String(s.impressions):"", ctr:s.ctr!=null?String(s.ctr):"", cpm:s.cpm!=null?String(s.cpm):"", spend:s.spend!=null?String(s.spend):"", clicks:s.clicks!=null?String(s.clicks):"", source:"dsp", snapshotKey:key };
  }
  if (key && c.googleSnapshots && c.googleSnapshots[key]) {
    const s = c.googleSnapshots[key];
    return { impressions:s.impressions!=null?String(s.impressions):"", ctr:s.ctr!=null?String(s.ctr):"", cpm:s.cpm!=null?String(s.cpm):"", spend:s.spend!=null?String(s.spend):"", clicks:s.clicks!=null?String(s.clicks):"", videoViews:s.video_views!=null?String(s.video_views):"", completionRate:s.vcr!=null?String(s.vcr):"", source:"google", snapshotKey:key };
  }
  if (key && c.snapSnapshots && c.snapSnapshots[key]) {
    const s = c.snapSnapshots[key];
    return { impressions:s.impressions!=null?String(s.impressions):"", ctr:s.ctr!=null?String(s.ctr):"", cpm:s.cpm!=null?String(s.cpm):"", spend:s.spend!=null?String(s.spend):"", clicks:s.clicks!=null?String(s.clicks):"", source:"snap", snapshotKey:key };
  }
  return { impressions:c.impressions||"", ctr:c.ctr||"", cpm:c.cpm||"", spend:c.spend||"", clicks:c.clicks||"", source:key?"manual-no-snapshot":"manual", snapshotKey:key };
}


// Parse monthly goal from note1: "125K/Mo", "100K Monthly", "72K/Mo", "41K/Mo (15-20% Oregon)"
// "40K Feb/March" = total for 2 months = 20K/Mo, "95K March" = 95K this month
// Returns number or null
function parseMonthlyGoal(note1) {
  if (!note1) return null;
  const s = note1.trim();
  function parseNum(str) {
    const m = str.replace(/,/g,"").match(/^([\d.]+)\s*([KkMm])?/);
    if (!m) return null;
    let n = parseFloat(m[1]);
    if (m[2] && m[2].toLowerCase()==="k") n *= 1000;
    if (m[2] && m[2].toLowerCase()==="m") n *= 1000000;
    return isNaN(n) ? null : Math.round(n);
  }
  // "125K/Mo", "100K Monthly", "72K/Mo (extra notes)"
  const moMatch = s.match(/^([\d.,]+\s*[KkMm]?)\s*(?:\/Mo|Monthly|\/month)/i);
  if (moMatch) return parseNum(moMatch[1]);
  // "40K Feb/March" = two months, divide by 2
  const twoMonthMatch = s.match(/^([\d.,]+\s*[KkMm]?)\s+\w+\/\w+$/i);
  if (twoMonthMatch) { const total = parseNum(twoMonthMatch[1]); return total ? Math.round(total/2) : null; }
  // "95K March" = single named month
  const oneMonthMatch = s.match(/^([\d.,]+\s*[KkMm]?)\s+(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)$/i);
  if (oneMonthMatch) return parseNum(oneMonthMatch[1]);
  return null;
}

// Compute monthly pacing: impressions delivered this month vs monthly goal vs days elapsed this month
// Returns { pct, color, label, delivered, goal } or null
function computeMonthlyPacing(impressions, note1) {
  const goal = parseMonthlyGoal(note1);
  const delivered = parseInt(impressions) || 0;
  if (!goal || goal <= 0 || !delivered) return null;

  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  const dayOfMonth  = now.getDate();
  const timeElapsed = dayOfMonth / daysInMonth;         // 0→1
  const expected    = Math.round(goal * timeElapsed);   // how many expected by today
  const pct         = delivered / goal;                 // fraction of monthly goal delivered

  // Pacing ratio: how delivered compares to expected
  const ratio = expected > 0 ? delivered / expected : null;

  let color, label;
  if (ratio === null)       { color="#4d6e8a"; label="No data";  }
  else if (ratio < 0.80)    { color="#fde047"; label="Behind";   }
  else if (ratio < 1.05)    { color="#00d48a"; label="On Track"; }
  else                      { color="#fb923c"; label="Ahead";    }

  return { pct: Math.min(1, pct), expectedPct: timeElapsed, ratio, color, label, delivered, goal, expected };
}


// Flag a campaign as potentially stopped serving:
// active status + within flight dates + zero/blank impressions
function isStoppedServing(c) {
  if ((c.status||"") !== "active") return false;
  const today = getToday();
  if (c.endDate && c.endDate < today) return false;   // flight ended, not our problem
  if (c.startDate && c.startDate > today) return false; // hasn't started yet
  const impr = parseFloat(c.impressions||"") || 0;
  return impr === 0;
}

function ReminderCalendar({ reminders, setReminders, onAdd, campaigns=[] }) {
  const today = getToday();
  const [cur, setCur] = useState(() => { const n = new Date(); return { y:n.getFullYear(), m:n.getMonth() }; });
  const [editingCalReminder, setEditingCalReminder] = useState(null);
  const [editCalDraft, setEditCalDraft] = useState({});
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
  const [selected, setSelected] = useState(null);
  const prev = () => { setCur(c => c.m===0 ? {y:c.y-1,m:11} : {y:c.y,m:c.m-1}); setSelected(null); };
  const next = () => { setCur(c => c.m===11 ? {y:c.y+1,m:0} : {y:c.y,m:c.m+1}); setSelected(null); };
  function startCalEdit(r) { setEditingCalReminder(r.id); setEditCalDraft({type:r.type,date:r.date,note:r.note||"",repeat:r.repeat||"none"}); }
  function saveCalEdit(id) { setReminders(prev=>prev.map(r=>r.id===id?{...r,...editCalDraft}:r)); setEditingCalReminder(null); }
  function cancelCalEdit() { setEditingCalReminder(null); }
  const cells = [];
  for (let i=0; i<firstDay; i++) cells.push(null);
  for (let d=1; d<=daysInMonth; d++) cells.push(d);
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div style={{width:"100%"}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <button onClick={prev} style={{background:"#162236",border:"1px solid #334155",borderRadius:6,padding:"6px 16px",color:"#7a9bbf",cursor:"pointer",fontSize:16}}>←</button>
        <span style={{color:"#edf4ff",fontWeight:700,fontSize:16}}>{monthName}</span>
        <button onClick={next} style={{background:"#162236",border:"1px solid #334155",borderRadius:6,padding:"6px 16px",color:"#7a9bbf",cursor:"pointer",fontSize:16}}>→</button>
      </div>

      {/* Day-of-week headers */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,marginBottom:3}}>
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>(
          <div key={d} style={{textAlign:"center",fontSize:11,color:"#3d5a72",fontWeight:700,padding:"6px 0",textTransform:"uppercase",letterSpacing:"0.06em"}}>{d}</div>
        ))}
      </div>

      {/* Calendar grid — relative container so popover can anchor to it */}
      <div style={{position:"relative"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
        {cells.map((d,i) => {
          if (!d) return <div key={"e"+i} style={{height:120,background:"#06090f",borderRadius:7,border:"1px solid #0d1525"}}/>;
          const ds = dateStr(d);
          const isToday = ds===today;
          const isPast = ds<today;
          const dayRems = byDay[d]||[];
          const hasOverdue = isPast && dayRems.length>0;
          return (
            <div key={d} onClick={()=>setSelected(selected===d?null:d)}
              style={{background:selected===d?"#002e24":isToday?"#0c1e30":"#0a1525",
                border:`1px solid ${selected===d?"#00c896":isToday?"#00c89650":hasOverdue?"#ef444430":"#1e293b"}`,
                borderRadius:7,padding:"8px 7px",height:120,
                display:"flex",flexDirection:"column",gap:3,cursor:"pointer",overflow:"hidden"}}>
              {/* Date number + add button */}
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:2}}>
                <span style={{fontSize:13,fontWeight:isToday?700:500,
                  color:isToday?"#00e5a0":isPast?"#3d5a72":"#a8c4e0",
                  background:isToday?"#003d28":undefined,
                  borderRadius:isToday?12:undefined,
                  padding:isToday?"1px 7px":undefined,
                  lineHeight:1.6}}>{d}</span>
                <button onClick={()=>onAdd(ds)}
                  style={{background:"none",border:"none",color:"#1e3a50",cursor:"pointer",
                    fontSize:14,lineHeight:1,padding:"0 2px",opacity:0,transition:"opacity .15s"}}
                  className="cal-add-btn">+</button>
              </div>
              {/* Reminder chips — compact single-line with campaign name */}
              <div style={{display:"flex",flexDirection:"column",gap:2,flex:1}}>
                {dayRems.slice(0,3).map(r => {
                  const rt = REMINDER_TYPES.find(t=>t.value===r.type)||REMINDER_TYPES[5];
                  const camp = campaigns.find(c=>c.id===r.campaignId);
                  return (
                    <div key={r.id} title={[rt.label, camp?.campaignName?.trim(), r.note].filter(Boolean).join(' · ')}
                      style={{background:isPast?"#1a0808":(rt.color+"15"),
                        border:`1px solid ${isPast?"#ef444430":(rt.color+"40")}`,
                        borderRadius:4,padding:"2px 5px",
                        display:"flex",alignItems:"center",gap:3,overflow:"hidden"}}>
                      <div style={{width:5,height:5,borderRadius:"50%",
                        background:isPast?"#ef4444":rt.color,flexShrink:0}}/>
                      <span style={{fontSize:9,fontWeight:700,
                        color:isPast?"#ef4444":rt.color,
                        whiteSpace:"nowrap",flexShrink:0}}>
                        {rt.label.replace(/^\S+\s/,"")}
                      </span>
                      {camp && <span style={{fontSize:9,color:"#00e5a0",
                        whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",flex:1}}>
                        · {camp.campaignName.trim()}
                      </span>}
                      {!camp && r.note && <span style={{fontSize:9,color:"#4d6e8a",
                        whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",flex:1}}>
                        {r.note}
                      </span>}
                    </div>
                  );
                })}
                {dayRems.length>3 && (
                  <div style={{fontSize:9,color:"#4d6e8a",paddingLeft:10}}>
                    +{dayRems.length-3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating popover — overlays the calendar, no scrolling needed */}
      {selected && (() => {
        const selRems = byDay[selected]||[];
        const selDateStr = dateStr(selected);
        const selLabel = new Date(cur.y,cur.m,selected).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});
        const isPast = selDateStr < today;
        // Position: figure out which row the day is in (0-indexed)
        const cellIndex = cells.indexOf(selected);
        const row = Math.floor(cellIndex / 7);
        const totalRows = Math.ceil(cells.length / 7);
        // Show below if in top half, above if in bottom half
        const showBelow = row < totalRows / 2;
        const topOffset = showBelow ? (row + 1) * 123 + 3 : undefined;
        const bottomOffset = !showBelow ? (totalRows - row) * 123 + 3 : undefined;
        return (
          <div style={{
            position:"absolute", left:0, right:0, zIndex:50,
            top: showBelow ? topOffset : undefined,
            bottom: !showBelow ? bottomOffset : undefined,
            background:"#07101c",border:"1px solid #00c89640",borderRadius:10,
            padding:"14px 18px",boxShadow:"0 8px 40px rgba(0,0,0,0.8)",
            maxHeight:"70vh", overflowY:"auto"}}>            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <span style={{fontSize:13,color:"#00e5a0",fontWeight:700}}>{selLabel}</span>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>onAdd(selDateStr)} style={{background:"#002e24",border:"1px solid #00c89640",borderRadius:6,padding:"4px 12px",color:"#00e5a0",fontSize:12,fontWeight:700,cursor:"pointer"}}>+ Add</button>
                <button onClick={()=>setSelected(null)} style={{background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:6,padding:"4px 10px",color:"#4d6e8a",fontSize:12,cursor:"pointer"}}>×</button>
              </div>
            </div>
            {selRems.length===0
              ? <div style={{fontSize:12,color:"#3d5a72",textAlign:"center",padding:"12px 0"}}>No reminders — click + Add to create one</div>
              : selRems.map(r => {
                  const rt = REMINDER_TYPES.find(t=>t.value===r.type)||REMINDER_TYPES[5];
                  const camp = campaigns.find(c=>c.id===r.campaignId);
                  const isEditing = editingCalReminder === r.id;
                  const calIS = {background:"#162236",border:"1px solid #334155",borderRadius:5,padding:"5px 8px",color:"#d8eaf8",fontSize:12,fontFamily:"inherit",width:"100%",boxSizing:"border-box"};
                  if (isEditing) return (
                    <div key={r.id} style={{padding:"10px 0",borderBottom:"1px solid #1a2744"}}>
                      <div style={{background:"#0a1628",border:"1px solid #00c89640",borderRadius:8,padding:"10px 12px",display:"flex",flexDirection:"column",gap:8}}>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                          <div>
                            <label style={{display:"block",fontSize:9,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Type</label>
                            <select value={editCalDraft.type} onChange={e=>setEditCalDraft(p=>({...p,type:e.target.value}))} style={calIS}>
                              {REMINDER_TYPES.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}
                            </select>
                          </div>
                          <div>
                            <label style={{display:"block",fontSize:9,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Date</label>
                            <DatePicker value={editCalDraft.date} onChange={v=>setEditCalDraft(p=>({...p,date:v}))}/>
                          </div>
                        </div>
                        <div>
                          <label style={{display:"block",fontSize:9,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Note</label>
                          <input type="text" value={editCalDraft.note} onChange={e=>setEditCalDraft(p=>({...p,note:e.target.value}))} placeholder="Note (optional)" style={calIS}/>
                        </div>
                        <div style={{display:"flex",gap:6}}>
                          <button onClick={()=>saveCalEdit(r.id)} disabled={!editCalDraft.date} style={{flex:1,background:editCalDraft.date?"#00c896":"#162236",border:"none",borderRadius:5,padding:"6px 0",color:editCalDraft.date?"#000":"#3d5a72",fontSize:12,fontWeight:700,cursor:editCalDraft.date?"pointer":"default"}}>Save</button>
                          <button onClick={cancelCalEdit} style={{flex:1,background:"#162236",border:"1px solid #334155",borderRadius:5,padding:"6px 0",color:"#7a9bbf",fontSize:12,cursor:"pointer"}}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  );
                  return (
                    <div key={r.id} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 0",borderBottom:"1px solid #1a2744"}}>
                      <div style={{width:9,height:9,borderRadius:"50%",background:isPast?"#ef4444":rt.color,flexShrink:0,marginTop:3}}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:12,color:isPast?"#ef4444":rt.color,fontWeight:700,marginBottom:2}}>{rt.label}</div>
                        {camp && <div style={{fontSize:11,color:"#a8c4e0",fontWeight:600,marginBottom:2}}>{camp.campaignName.trim()} <span style={{color:"#3d5a72",fontWeight:400}}>· {camp.platform} · {camp.mediaPartner}</span></div>}
                        {r.note && <div style={{fontSize:12,color:"#7a9bbf",lineHeight:1.5}}>{r.note}</div>}
                        {r.repeat!=="none" && <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>↻ Repeats {r.repeat}</div>}
                      </div>
                      <div style={{display:"flex",gap:5,flexShrink:0}}>
                        <button onClick={()=>startCalEdit(r)} style={{background:"#002e24",border:"1px solid #00c89650",borderRadius:4,color:"#00e5a0",fontSize:11,padding:"3px 7px",cursor:"pointer",fontWeight:600}}>Edit</button>
                        <button onClick={()=>setReminders(prev=>prev.map(x=>x.id===r.id?{...x,dismissed:true}:x))} style={{background:"#002018",border:"1px solid #22c55e40",borderRadius:4,color:"#00d48a",fontSize:11,padding:"3px 8px",cursor:"pointer"}}>✓ Done</button>
                        <button onClick={()=>setReminders(prev=>prev.filter(x=>x.id!==r.id))} style={{background:"#1a0808",border:"1px solid #ef444440",borderRadius:4,color:"#ef4444",fontSize:11,padding:"3px 7px",cursor:"pointer"}}>✕</button>
                      </div>
                    </div>
                  );
                })
            }
          </div>
        );
      })()}
      </div>

      {/* Legend */}
      <div style={{display:"flex",flexWrap:"wrap",gap:12,marginTop:14,padding:"8px 0",borderTop:"1px solid #1e293b"}}>
        {REMINDER_TYPES.map(t=>(
          <div key={t.value} style={{display:"flex",alignItems:"center",gap:5}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:t.color,flexShrink:0}}/>
            <span style={{fontSize:10,color:"#4d6e8a"}}>{t.label.replace(/^\S+\s/,"")}</span>
          </div>
        ))}
      </div>

      {/* Hover style for add button */}
      <style>{`.cal-add-btn:hover { opacity: 1 !important; color: #00e5a0 !important; }`}</style>
    </div>
  );
}

// Closes a modal only when the user genuinely clicks the backdrop —
// not when a text-selection drag starts inside the modal and releases outside.
function useBackdropClose(onClose) {
  const mouseDownOnBackdrop = useRef(false);
  const onMouseDown = (e) => { mouseDownOnBackdrop.current = e.target === e.currentTarget; };
  const onClick = (e) => { if (e.target === e.currentTarget && mouseDownOnBackdrop.current) onClose(); };
  return { onMouseDown, onClick };
}

function ReminderModal({ campaigns, onClose, reminders, setReminders, focusCampaignId=null }) {
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
  const focusCampaign = focusCampaignId ? campaigns.find(c=>c.id===focusCampaignId) : null;
  const [search, setSearch] = useState(() => focusCampaign ? focusCampaign.campaignName.trim() : "");
  const sorted = [...reminders].sort((a,b)=>a.date<b.date?-1:a.date>b.date?1:0);
  function matchesSearch(r) {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const camp = campaigns.find(c=>c.id===r.campaignId);
    const rt = REMINDER_TYPES.find(t=>t.value===r.type)||REMINDER_TYPES[5];
    return (r.note||"").toLowerCase().includes(q)
      || rt.label.toLowerCase().includes(q)
      || (camp&&camp.campaignName.toLowerCase().includes(q))
      || (camp&&camp.mediaPartner.toLowerCase().includes(q))
      || (r.date||"").includes(q);
  }
  const overdue  = sorted.filter(r=>!r.dismissed && r.date<today  && matchesSearch(r));
  const upcoming = sorted.filter(r=>!r.dismissed && r.date>=today && matchesSearch(r));
  const done     = sorted.filter(r=>r.dismissed                   && matchesSearch(r));

  const iS = { width:"100%", background:"#162236", border:"1px solid #334155", borderRadius:6, padding:"7px 10px", color:"#d8eaf8", fontSize:13, boxSizing:"border-box", fontFamily:"inherit" };

  const ReminderCard = ({ r, showEdit=true }) => {
    const rt = REMINDER_TYPES.find(t=>t.value===r.type)||REMINDER_TYPES[5];
    const camp = campaigns.find(c=>c.id===r.campaignId);
    const dLeft = getDaysLeft(r.date);
    const isPast = r.date<today;
    const pCol = camp ? (PLT_COLORS[camp.platform]||PLT_COLORS.default) : "#4d6e8a";
    return (
      <div style={{background:isPast?"#1a0808":"#0e1a2e",border:`1px solid ${isPast?"#ef444440":rt.color+"30"}`,borderRadius:8,padding:"10px 13px",marginBottom:7,display:"flex",gap:10,alignItems:"flex-start"}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:3}}>
            <span style={{fontSize:12,color:rt.color,fontWeight:700}}>{rt.label}</span>
            {camp && <span style={{fontSize:11,background:pCol+"18",border:`1px solid ${pCol}30`,borderRadius:4,padding:"1px 7px",display:"inline-flex",alignItems:"center",gap:5}}><span style={{color:pCol,fontWeight:700,fontSize:11}}>{camp.campaignName.trim()}</span><span style={{color:pCol,opacity:0.6,fontSize:10}}>· {camp.platform}</span></span>}
            <span style={{fontSize:11,fontWeight:600,color:isPast?"#ef4444":dLeft<=3?"#f59e0b":"#00d48a",marginLeft:"auto"}}>
              {isPast?`${Math.abs(dLeft)}d overdue`:dLeft===0?"Today!":`in ${dLeft}d`} · {fmtDate(r.date)}
            </span>
          </div>
          {r.note && <div style={{fontSize:12,color:"#7a9bbf",lineHeight:1.4}}>{r.note}</div>}
          {r.repeat!=="none" && <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>↻ Repeats {r.repeat}</div>}
        </div>
        <div style={{display:"flex",gap:5,flexShrink:0}}>
          {showEdit && <button onClick={()=>edit(r)} style={{background:"#002e24",border:"1px solid #00c89650",borderRadius:4,color:"#00e5a0",fontSize:11,padding:"3px 7px",cursor:"pointer",fontWeight:600}}>Edit</button>}
          {!r.dismissed && <button onClick={()=>dismiss(r.id)} style={{background:"#002018",border:"1px solid #22c55e40",borderRadius:4,color:"#00d48a",fontSize:11,padding:"3px 7px",cursor:"pointer"}}>✓ Done</button>}
          <button onClick={()=>del(r.id)} style={{background:"#1a0808",border:"1px solid #ef444440",borderRadius:4,color:"#ef4444",fontSize:11,padding:"3px 7px",cursor:"pointer"}}>✕</button>
        </div>
      </div>
    );
  };

  const reminderBackdrop = useBackdropClose(onClose);
  return (
    <div {...reminderBackdrop} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:14,padding:24,width:view==="calendar"?"min(1600px,98vw)":"min(700px,96vw)",maxHeight:"96vh",overflowY:"auto",boxShadow:"0 30px 80px rgba(0,0,0,.9)"}}>
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

        {view==="list" && (
          <div style={{marginBottom:14}}>
            {focusCampaign && (
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"#002e24",border:"1px solid #00c89640",borderRadius:7,padding:"7px 12px",marginBottom:8}}>
                <span style={{fontSize:12,color:"#00e5a0",fontWeight:600}}>🔔 Reminders for <span style={{color:"#edf4ff"}}>{focusCampaign.campaignName.trim()}</span></span>
                <button onClick={()=>setSearch("")} style={{background:"none",border:"none",color:"#4d6e8a",fontSize:11,cursor:"pointer",padding:0,whiteSpace:"nowrap"}}>Show all ×</button>
              </div>
            )}
            <input
              value={search}
              onChange={e=>setSearch(e.target.value)}
              placeholder="Search by campaign, type, note, date…"
              style={{width:"100%",background:"#0a1525",border:"1px solid #1e293b",borderRadius:7,padding:"7px 12px",color:"#d8eaf8",fontSize:12,fontFamily:"inherit",boxSizing:"border-box",outline:"none"}}
            />
          </div>
        )}
        {view==="add" ? (
          <div>
            {/* Type + Date side by side at the top */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
              <div>
                <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Reminder Type</label>
                <select value={form.type} onChange={e=>sf("type",e.target.value)} style={iS}>
                  {REMINDER_TYPES.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Due Date *</label>
                <DatePicker value={form.date} onChange={v=>sf("date",v)}/>
              </div>
            </div>
            <div style={{marginBottom:12}}>
              <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Campaign (optional)</label>
              <select value={form.campaignId||""} onChange={e=>sf("campaignId",e.target.value?parseInt(e.target.value):"")} style={iS}>
                <option value="">— No specific campaign —</option>
                {campaigns.map(c=><option key={c.id} value={c.id}>{c.campaignName.trim()} · {c.platform} · {c.mediaPartner}</option>)}
              </select>
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
          <ReminderCalendar reminders={reminders} setReminders={setReminders} onAdd={addOnDate} campaigns={campaigns}/>
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

// ── Inline confirm dialog — replaces window.confirm (blocked in sandboxes) ──
function ConfirmDialog({ dialog, onResolve }) {
  if (!dialog) return null;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,backdropFilter:"blur(3px)"}}>
      <div style={{background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:12,padding:"24px 28px",width:"min(420px,90vw)",boxShadow:"0 20px 60px rgba(0,0,0,.9)"}}>
        <div style={{fontSize:14,color:"#edf4ff",fontWeight:600,marginBottom:8,lineHeight:1.5}}>{dialog.title||"Are you sure?"}</div>
        {dialog.message && <div style={{fontSize:12,color:"#7a9bbf",marginBottom:20,lineHeight:1.6}}>{dialog.message}</div>}
        {!dialog.message && <div style={{marginBottom:20}}/>}
        <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
          <button onClick={()=>onResolve(false)} style={{background:"#162236",border:"1px solid #334155",borderRadius:7,padding:"8px 18px",color:"#7a9bbf",fontSize:13,fontWeight:600,cursor:"pointer"}}>Cancel</button>
          <button onClick={()=>onResolve(true)} style={{background:dialog.danger?"#7f1d1d":"#002e24",border:`1px solid ${dialog.danger?"#ef444460":"#00c89650"}`,borderRadius:7,padding:"8px 18px",color:dialog.danger?"#ef4444":"#00e5a0",fontSize:13,fontWeight:700,cursor:"pointer"}}>{dialog.confirmLabel||"OK"}</button>
        </div>
      </div>
    </div>
  );
}

function useConfirm() {
  const [dialog, setDialog] = useState(null);
  const resolveRef = useRef(null);
  function confirm({ title, message, confirmLabel="Confirm", danger=false }) {
    return new Promise(resolve => {
      resolveRef.current = resolve;
      setDialog({ title, message, confirmLabel, danger });
    });
  }
  function onResolve(val) {
    setDialog(null);
    resolveRef.current?.(val);
  }
  return { confirm, dialog, onResolve };
}

function DarkCheckbox({ checked, onChange, indeterminate=false }) {
  return (
    <div
      onClick={e=>{ e.stopPropagation(); onChange({target:{checked:!checked}}); }}
      style={{
        width:14, height:14, borderRadius:3, flexShrink:0, cursor:"pointer",
        background: checked ? "#00c896" : "#0e1a2e",
        border: `1.5px solid ${checked ? "#00c896" : indeterminate ? "#00c896" : "#334155"}`,
        display:"flex", alignItems:"center", justifyContent:"center",
        transition:"all .12s", boxShadow: checked ? "0 0 6px #00c89640" : "none",
      }}
    >
      {checked && <span style={{color:"#000",fontSize:9,fontWeight:900,lineHeight:1,marginTop:"0.5px"}}>✓</span>}
      {!checked && indeterminate && <span style={{color:"#00c896",fontSize:10,fontWeight:900,lineHeight:1}}>−</span>}
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
  return <span style={{color:col,fontSize:13,fontWeight:600,fontVariantNumeric:"tabular-nums"}}>{fmtDate(d)} <span style={{opacity:.6,fontWeight:400}}>({days<0?"Ended":days===0?"Today":`${days}d`})</span></span>;
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

function MetricRow({ c, colSpan, onUpdate, dateRange, reminders=[], setReminders=()=>{} }) {
  const resolved = resolveMetrics(c, dateRange.preset);
  const [local, setLocal] = useState({impressions:resolved.impressions,ctr:resolved.ctr,cpm:resolved.cpm,spend:resolved.spend,completionRate:c.completionRate||"",conversions:c.conversions||"",clicks:c.clicks||"",reach:c.reach||"",frequency:c.frequency||"",videoViews:c.videoViews||""});
  const [dirty, setDirty] = useState(false);
  const prevPreset = useRef(dateRange.preset);
  useEffect(()=>{
    if (prevPreset.current !== dateRange.preset) {
      prevPreset.current = dateRange.preset;
      if (!dirty) {
        const r = resolveMetrics(c, dateRange.preset);
        setLocal(p=>({...p, impressions:r.impressions, ctr:r.ctr, cpm:r.cpm, spend:r.spend}));
      }
    }
  }, [dateRange.preset]);
  const [historyDraft, setHistoryDraft] = useState(c.history||"");
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newEntry, setNewEntry] = useState("");
  const [newReminder, setNewReminder] = useState({type:"ad-swap",note:"",date:"",repeat:"none"});
  const [editingReminderId, setEditingReminderId] = useState(null);
  const [editReminderDraft, setEditReminderDraft] = useState({});
  function startEditReminder(r) { setEditingReminderId(r.id); setEditReminderDraft({type:r.type,date:r.date,note:r.note||"",repeat:r.repeat||"none"}); }
  function saveEditReminder(id) { setReminders(prev=>prev.map(r=>r.id===id?{...r,...editReminderDraft}:r)); setEditingReminderId(null); }
  function cancelEditReminder() { setEditingReminderId(null); }
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

          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14,flexWrap:"wrap"}}>
            <span style={{fontSize:11,color:"#00c896",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em"}}>📊 Metrics</span>
            {dateRange.start && <span style={{background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:4,padding:"1px 8px",fontSize:10,fontFamily:"monospace",color:"#4d6e8a"}}>{dateRange.start===dateRange.end?dateRange.start:`${dateRange.start} → ${dateRange.end}`}</span>}
            {resolved.source==="meta" && <span style={{fontSize:10,color:"#60a5fa",background:"#0c1e38",border:"1px solid #3b82f640",borderRadius:4,padding:"1px 7px",fontWeight:600}}>⬡ Meta</span>}
            {resolved.source==="ttd" && <span style={{fontSize:10,color:"#a78bfa",background:"#1a0e38",border:"1px solid #7c3aed40",borderRadius:4,padding:"1px 7px",fontWeight:600}}>⬡ TTD</span>}
            {resolved.source==="dsp" && <span style={{fontSize:10,color:"#34d399",background:"#001a10",border:"1px solid #34d39940",borderRadius:4,padding:"1px 7px",fontWeight:600}}>⬡ DSP</span>}
            {resolved.source==="google" && <span style={{fontSize:10,color:"#f59e0b",background:"#1a1000",border:"1px solid #f59e0b40",borderRadius:4,padding:"1px 7px",fontWeight:600}}>⬡ Google</span>}
            {resolved.source==="snap" && <span style={{fontSize:10,color:"#f9a8d4",background:"#1a0010",border:"1px solid #f9a8d440",borderRadius:4,padding:"1px 7px",fontWeight:600}}>⬡ Snap</span>}
            {resolved.source==="manual-no-snapshot" && <span title="No Meta snapshot for this date range — showing manually saved values" style={{fontSize:10,color:"#f59e0b",background:"#1a1000",border:"1px solid #f59e0b40",borderRadius:4,padding:"1px 7px",fontWeight:600}}>⚠ No snapshot · manual data</span>}
          </div>
          {(()=>{
            const isCTV    = c.platform==="CTV"||c.platform==="OTT";
            const isVideo  = ["FBV","YT","TT"].includes(c.platform)||isCTV;
            const isSocial = ["FB","IG","TT","FBV"].includes(c.platform);
            const isSEM    = c.platform==="SEM";
            // Build ordered field list for this platform
            const allFields = [
              {key:"impressions",label:"Impressions",   color:"#00e5a0",prefix:"",  suffix:""},
              {key:"ctr",        label:"CTR",           color:"#00ffb3",prefix:"",  suffix:"%"},
              {key:"cpm",        label:"CPM",           color:"#fb923c",prefix:"$", suffix:""},
              {key:"spend",      label:"Spend",         color:"#f472b6",prefix:"$", suffix:""},
              ...(isSocial||isSEM||["DSP","SP","TD"].includes(c.platform) ? [{key:"clicks",label:"Clicks",color:"#38bdf8",prefix:"",suffix:""}] : []),
              ...(isSocial        ? [{key:"reach",     label:"Reach",      color:"#e879f9",prefix:"",suffix:""}]   : []),
              ...(isSocial        ? [{key:"frequency", label:"Frequency",  color:"#fb923c",prefix:"",suffix:"x"}]  : []),
              ...(isVideo&&!isCTV ? [{key:"videoViews",label:"Video Views",color:"#a78bfa",prefix:"",suffix:""}]   : []),
              ...(isVideo         ? [{key:"completionRate",label:isCTV?"Completion %":"VCR %",color:"#818cf8",prefix:"",suffix:"%"}] : []),
              ...(isCTV||isSEM    ? [{key:"conversions",label:"Conversions",color:"#34d399",prefix:"",suffix:""}]  : []),
            ];
            const colCount = Math.min(6, allFields.length);
            return (
              <div style={{marginBottom:14}}>
                <div style={{display:"grid",gridTemplateColumns:`repeat(${colCount}, minmax(95px, 1fr))`,gap:10}}>
                  {allFields.map(({key,label,color,prefix,suffix})=>(
                    <div key={key}>
                      <label style={{display:"block",fontSize:10,color,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:700}}>
                        {prefix&&<span style={{opacity:.5,marginRight:1}}>{prefix}</span>}{label}{suffix&&<span style={{opacity:.5,marginLeft:1}}>{suffix}</span>}
                      </label>
                      <input type="number" value={local[key]||""} onChange={e=>set(key,e.target.value)} placeholder="—" style={{...iS,borderColor:local[key]?color+"60":"#162236"}}/>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <button onClick={save} disabled={!dirty} style={{background:dirty?"#00c896":"#132140",border:"none",borderRadius:6,padding:"6px 18px",color:dirty?"#fff":"#3b5070",fontSize:12,fontWeight:700,cursor:dirty?"pointer":"default",transition:"all .15s"}}>Save Metrics</button>
            {!dirty && (c.impressions||c.ctr||c.cpm||c.spend) && <span style={{fontSize:11,color:"#00d48a",display:"flex",alignItems:"center",gap:4}}>✓ Metrics saved</span>}
            {(local.impressions||local.ctr||local.cpm||local.spend) && <button onClick={()=>{setLocal({impressions:"",ctr:"",cpm:"",spend:"",completionRate:"",conversions:"",clicks:"",reach:"",frequency:"",videoViews:""});setDirty(true);}} style={{background:"none",border:"none",color:"#3d5a72",fontSize:11,cursor:"pointer"}}>Clear all</button>}
          </div>
          <div style={{marginTop:16,paddingTop:14,borderTop:"1px solid #1a2744"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <span style={{fontSize:10,color:"#f59e0b",textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:700}}>🔔 Reminders</span>
              <button onClick={()=>setShowAddReminder(v=>!v)} style={{background:showAddReminder?"#130a00":"#f59e0b18",border:`1px solid ${showAddReminder?"#f59e0b80":"#f59e0b50"}`,borderRadius:6,padding:"2px 8px",color:"#f59e0b",fontSize:11,fontWeight:700,cursor:"pointer"}}>{showAddReminder?"✕":"+"}</button>
            </div>
            {reminders.filter(r=>!r.dismissed&&r.campaignId===c.id).map(r=>{ const rt=REMINDER_TYPES.find(t=>t.value===r.type)||REMINDER_TYPES[5]; const isPast=r.date<=getToday(); const isEditing=editingReminderId===r.id; return (
              <div key={r.id} style={{marginBottom:4}}>
                {isEditing ? (
                  <div style={{background:"#0a1628",border:"1px solid #f59e0b60",borderRadius:7,padding:"10px 12px",display:"flex",flexDirection:"column",gap:8}}>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                      <div>
                        <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.05em"}}>Type</label>
                        <select value={editReminderDraft.type} onChange={e=>setEditReminderDraft(p=>({...p,type:e.target.value}))} style={{width:"100%",background:"#162236",border:"1px solid #334155",borderRadius:5,padding:"5px 8px",color:"#d8eaf8",fontSize:12,fontFamily:"inherit"}}>
                          {REMINDER_TYPES.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.05em"}}>Date</label>
                        <DatePicker value={editReminderDraft.date} onChange={v=>setEditReminderDraft(p=>({...p,date:v}))}/>
                      </div>
                    </div>
                    <input type="text" value={editReminderDraft.note} onChange={e=>setEditReminderDraft(p=>({...p,note:e.target.value}))} placeholder="Note (optional)" style={{width:"100%",background:"#162236",border:"1px solid #334155",borderRadius:5,padding:"5px 8px",color:"#d8eaf8",fontSize:12,fontFamily:"inherit",boxSizing:"border-box"}}/>
                    <div style={{display:"flex",gap:6}}>
                      <button onClick={()=>saveEditReminder(r.id)} disabled={!editReminderDraft.date} style={{flex:1,background:editReminderDraft.date?"#f59e0b":"#162236",border:"none",borderRadius:5,padding:"6px 0",color:editReminderDraft.date?"#000":"#3d5a72",fontSize:12,fontWeight:700,cursor:editReminderDraft.date?"pointer":"default"}}>Save</button>
                      <button onClick={cancelEditReminder} style={{flex:1,background:"#162236",border:"1px solid #334155",borderRadius:5,padding:"6px 0",color:"#7a9bbf",fontSize:12,fontWeight:600,cursor:"pointer"}}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div style={{display:"flex",alignItems:"center",gap:8,background:isPast?"#1a0808":"#0a1628",border:`1px solid ${isPast?"#ef444430":rt.color+"30"}`,borderRadius:5,padding:"5px 10px"}}>
                    <button onClick={()=>startEditReminder(r)} style={{background:"#002e24",border:"1px solid #00c89650",borderRadius:4,color:"#00e5a0",cursor:"pointer",fontSize:10,padding:"1px 6px",fontWeight:600,flexShrink:0}}>Edit</button>
                    <button onClick={()=>setReminders(prev=>prev.map(x=>x.id===r.id?{...x,dismissed:true}:x))} style={{background:"#1a0808",border:"1px solid #ef444440",borderRadius:4,color:"#ef4444",cursor:"pointer",fontSize:12,lineHeight:1,padding:"1px 5px",flexShrink:0}}>×</button>
                    <span style={{fontSize:11,color:isPast?"#ef4444":rt.color,fontWeight:600}}>{rt.label}</span>
                    <span style={{fontSize:11,color:"#00e5a0",whiteSpace:"nowrap"}}>{fmtDate(r.date)}</span>
                    {r.note&&<span style={{fontSize:11,color:"#00e5a0",flex:1}}>{r.note}</span>}
                  </div>
                )}
              </div>
            );})}
            {showAddReminder && (
              <div style={{background:"#0a1628",border:"1px solid #1e3350",borderRadius:7,padding:"10px 12px",marginTop:4,display:"flex",flexDirection:"column",gap:8}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <div>
                    <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.05em"}}>Type</label>
                    <select value={newReminder.type} onChange={e=>setNewReminder(p=>({...p,type:e.target.value}))} style={{width:"100%",background:"#162236",border:"1px solid #334155",borderRadius:5,padding:"5px 8px",color:"#d8eaf8",fontSize:12,fontFamily:"inherit"}}>
                      {REMINDER_TYPES.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.05em"}}>Date</label>
                    <DatePicker value={newReminder.date} onChange={v=>setNewReminder(p=>({...p,date:v}))}/>
                  </div>
                </div>
                <input type="text" value={newReminder.note} onChange={e=>setNewReminder(p=>({...p,note:e.target.value}))} placeholder="Note (optional)" style={{width:"100%",background:"#162236",border:"1px solid #334155",borderRadius:5,padding:"5px 8px",color:"#d8eaf8",fontSize:12,fontFamily:"inherit",boxSizing:"border-box"}}/>
                <button onClick={()=>{ if(!newReminder.date) return; setReminders(prev=>[...prev,{...newReminder,id:Date.now(),campaignId:c.id,dismissed:false}]); setNewReminder({type:"ad-swap",note:"",date:"",repeat:"none"}); setShowAddReminder(false); }} disabled={!newReminder.date} style={{background:newReminder.date?"#f59e0b":"#162236",border:"none",borderRadius:5,padding:"7px 0",color:newReminder.date?"#000":"#3d5a72",fontSize:12,fontWeight:700,cursor:newReminder.date?"pointer":"default"}}>Save Reminder</button>
              </div>
            )}
          </div>
          <div style={{marginTop:16,paddingTop:14,borderTop:"1px solid #1a2744"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:0}}>
              {/* Geo Target */}
              <div>
                <label style={{display:"block",fontSize:10,color:"#60a5fa",textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:700,marginBottom:5}}>🌎 Geo Targeting</label>
                <input
                  value={c.geoTarget||""}
                  onChange={e=>onUpdate({...c,geoTarget:e.target.value})}
                  placeholder="e.g. Florida statewide, exclude Miami-Dade"
                  style={{width:"100%",background:"#060d18",border:`1px solid ${c.geoTarget?"#60a5fa40":"#1a2744"}`,borderRadius:5,padding:"7px 10px",color:"#d8eaf8",fontSize:11,fontFamily:"inherit",boxSizing:"border-box",outline:"none",transition:"border-color .15s"}}
                />
              </div>
              {/* Last Creative Update */}
              <div>
                <label style={{display:"block",fontSize:10,color:"#a855f7",textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:700,marginBottom:5}}>🎨 Last Creative Update</label>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <div style={{flex:1}}>
                    <DatePicker value={c.lastCreativeUpdate||""} onChange={v=>onUpdate({...c,lastCreativeUpdate:v})} placeholder="Pick date…"/>
                  </div>
                  {c.lastCreativeUpdate&&(()=>{
                    const days=Math.floor((new Date()-new Date(c.lastCreativeUpdate))/86400000);
                    const color=days>30?"#f59e0b":days>14?"#fde047":"#a855f7";
                    return <span style={{fontSize:10,fontWeight:700,color,whiteSpace:"nowrap",flexShrink:0}}>{days===0?"Updated today":days===1?"1 day ago":`${days}d ago`}</span>;
                  })()}
                </div>
              </div>
            </div>
          </div>
          <div style={{marginTop:16,paddingTop:14,borderTop:"1px solid #1a2744"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <span style={{fontSize:10,color:"#3d5a72",textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:700}}>📋 Change History</span>
            </div>
            <div style={{display:"flex",gap:6,marginBottom:8,alignItems:"stretch"}}>
              <button
                onClick={()=>{
                  if (!newEntry.trim()) return;
                  const today = getToday();
                  const [y,m,d] = today.split("-");
                  const stamp = `${m}/${d}/${y}`;
                  const line = `${stamp} — ${newEntry.trim()}`;
                  const updated = historyDraft.trim() ? `${line}\n${historyDraft}` : line;
                  setHistoryDraft(updated);
                  onUpdate({...c, history:updated});
                  setNewEntry("");
                }}
                disabled={!newEntry.trim()}
                style={{background:newEntry.trim()?"#00c896":"#0a1422",border:"none",borderRadius:6,padding:"0 14px",color:newEntry.trim()?"#000":"#3d5a72",fontSize:11,fontWeight:700,cursor:newEntry.trim()?"pointer":"default",transition:"all .15s",whiteSpace:"nowrap",flexShrink:0}}
              >+ Add</button>
              <div style={{flex:1,display:"flex",alignItems:"center",background:"#0a1422",border:`1px solid ${newEntry.trim()?"#00c89660":"#1a2744"}`,borderRadius:6,overflow:"hidden",transition:"border-color .15s"}}>
                <input
                  value={newEntry}
                  onChange={e=>setNewEntry(e.target.value)}
                  onKeyDown={e=>{ if(e.key==="Enter"){ e.preventDefault();
                    if (!newEntry.trim()) return;
                    const today = getToday();
                    const [y,m,d] = today.split("-");
                    const stamp = `${m}/${d}/${y}`;
                    const line = `${stamp} — ${newEntry.trim()}`;
                    const updated = historyDraft.trim() ? `${line}\n${historyDraft}` : line;
                    setHistoryDraft(updated);
                    onUpdate({...c, history:updated});
                    setNewEntry("");
                  }}}
                  placeholder="Write a note and click Add or press Enter…"
                  style={{flex:1,background:"transparent",border:"none",padding:"6px 10px",color:"#d8eaf8",fontSize:11,fontFamily:"inherit",outline:"none"}}
                />
              </div>
            </div>
            <textarea
              value={historyDraft}
              onChange={e=>{ setHistoryDraft(e.target.value); onUpdate({...c, history:e.target.value}); }}
              placeholder={"Entries appear here after you add them…"}
              style={{width:"100%",background:"#060d18",border:"1px solid #1a2744",borderRadius:5,
                padding:"8px 10px",color:"#4d6e8a",fontSize:11,fontFamily:"inherit",
                whiteSpace:"pre-wrap",lineHeight:1.6,resize:"vertical",minHeight:80,
                boxSizing:"border-box",outline:"none"}}
            />
          </div>
        </div>
      </td>
    </tr>
  );
}

function DateBar({ range, setRange }) {
  const presets = getPresets();
  const quickKeys = ["mtd","yesterday","last30"];
  return (
    <div style={{background:"#0c1625",border:"1px solid #1e293b",borderRadius:10,padding:"11px 16px",marginBottom:14,display:"flex",flexWrap:"wrap",alignItems:"center",gap:8}}>
      <span style={{fontSize:10,color:"#4d6e8a",textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:700,marginRight:4}}>📅 Date Range</span>
      <div style={{display:"flex",gap:5}}>
        {quickKeys.map(k=>{ const on=range.preset===k; return <button key={k} onClick={()=>setRange({preset:k,...presets[k]})} style={{background:on?"#002e24":"#0e1a2e",border:`1px solid ${on?"#00c896":"#162236"}`,borderRadius:6,padding:"4px 13px",color:on?"#00e5a0":"#4d6e8a",fontSize:12,fontWeight:on?700:500,cursor:"pointer"}}>{presets[k].label}</button>; })}
      </div>
    </div>
  );
}


function DatePicker({ value, onChange, label, placeholder="Pick a date" }) {
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const [view, setView] = useState(() => {
    if (value) { const [y,m] = value.split("-"); return { y:parseInt(y), m:parseInt(m)-1 }; }
    const n = new Date(); return { y:n.getFullYear(), m:n.getMonth() };
  });
  const ref = useRef(null);

  useEffect(() => {
    if (value) { const [y,m] = value.split("-"); setView({ y:parseInt(y), m:parseInt(m)-1 }); }
  }, [value]);

  useEffect(() => {
    function handle(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  function handleOpen() {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setOpenUp(rect.bottom + 320 > window.innerHeight);
    }
    setOpen(v => !v);
  }

  const today = getToday();
  const firstDay = new Date(view.y, view.m, 1).getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const monthName = new Date(view.y, view.m, 1).toLocaleString("default", { month:"long", year:"numeric" });
  function pad(n) { return String(n).padStart(2,"0"); }
  function dateStr(d) { return `${view.y}-${pad(view.m+1)}-${pad(d)}`; }
  const prevMonth = () => setView(v => v.m===0 ? {y:v.y-1,m:11} : {y:v.y,m:v.m-1});
  const nextMonth = () => setView(v => v.m===11 ? {y:v.y+1,m:0} : {y:v.y,m:v.m+1});

  const cells = [];
  for (let i=0; i<firstDay; i++) cells.push(null);
  for (let d=1; d<=daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const displayValue = value ? fmtDate(value) : "";

  return (
    <div ref={ref} style={{position:"relative",userSelect:"none"}}>
      <div
        onClick={handleOpen}
        style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          background:"#0e1a2e", border:`1px solid ${open?"#00c896":"#334155"}`,
          borderRadius:6, padding:"7px 10px", cursor:"pointer",
          transition:"border-color .15s",
        }}
      >
        <span style={{fontSize:13, color:value?"#edf4ff":"#3d5a72", fontVariantNumeric:"tabular-nums"}}>
          {displayValue || placeholder}
        </span>
        <span style={{fontSize:11, color:open?"#00c896":"#4d6e8a", marginLeft:8}}>📅</span>
      </div>

      {open && (
        <div style={{
          position:"absolute",
          top: openUp ? undefined : "calc(100% + 6px)",
          bottom: openUp ? "calc(100% + 6px)" : undefined,
          left:0, zIndex:500,
          background:"#07101c", border:"1px solid #00c89640", borderRadius:10,
          padding:"14px", boxShadow:"0 12px 48px rgba(0,0,0,.9)",
          minWidth:260,
        }}>
          {/* Month nav */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <button onClick={prevMonth} style={{background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:6,width:28,height:28,color:"#7a9bbf",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>‹</button>
            <span style={{fontSize:13,fontWeight:700,color:"#edf4ff"}}>{monthName}</span>
            <button onClick={nextMonth} style={{background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:6,width:28,height:28,color:"#7a9bbf",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>›</button>
          </div>

          {/* Day headers */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",marginBottom:4}}>
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d=>(
              <div key={d} style={{textAlign:"center",fontSize:10,color:"#3d5a72",fontWeight:700,padding:"3px 0",textTransform:"uppercase",letterSpacing:"0.05em"}}>{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
            {cells.map((d,i) => {
              if (!d) return <div key={"e"+i}/>;
              const ds = dateStr(d);
              const isSelected = ds === value;
              const isToday = ds === today;
              return (
                <div
                  key={d}
                  onClick={()=>{ onChange(ds); setOpen(false); }}
                  style={{
                    textAlign:"center", borderRadius:5, padding:"5px 2px",
                    fontSize:12, fontWeight: isSelected||isToday ? 700 : 400,
                    cursor:"pointer",
                    background: isSelected ? "#00c896" : isToday ? "#0c2820" : "transparent",
                    color: isSelected ? "#000" : isToday ? "#00e5a0" : "#a8c4e0",
                    border: isSelected ? "1px solid #00c896" : isToday ? "1px solid #00c89640" : "1px solid transparent",
                    boxShadow: isSelected ? "0 0 8px #00c89660" : "none",
                    transition:"all .1s",
                  }}
                  onMouseEnter={e=>{ if(!isSelected){ e.currentTarget.style.background="#0e2030"; e.currentTarget.style.color="#00e5a0"; } }}
                  onMouseLeave={e=>{ if(!isSelected){ e.currentTarget.style.background=isToday?"#0c2820":"transparent"; e.currentTarget.style.color=isToday?"#00e5a0":"#a8c4e0"; } }}
                >
                  {d}
                </div>
              );
            })}
          </div>

          {/* Clear */}
          {value && (
            <div style={{borderTop:"1px solid #1a2744",marginTop:10,paddingTop:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:11,color:"#4d6e8a"}}>Selected: <span style={{color:"#00e5a0",fontWeight:600}}>{displayValue}</span></span>
              <button onClick={()=>{ onChange(""); setOpen(false); }} style={{background:"none",border:"none",color:"#3d5a72",fontSize:11,cursor:"pointer",padding:0}}>Clear ×</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Modal({ campaign, onSave, onClose, isNew, partners=[], reminders=[], setReminders=()=>{}, campaigns=[] }) {
  const blank = {mediaPartner:"",campaignName:"",platform:"FB",goal:"",startDate:"",endDate:"",status:"active",note1:"",note2:"",lastChecked:getToday(),impressions:"",ctr:"",cpm:"",spend:"",completionRate:"",conversions:"",clicks:"",reach:"",frequency:"",videoViews:"",contractValue:"",monthlyFlight:false,projectionUrl:"",history:"",folderPath:"",geoTarget:"",lastCreativeUpdate:""};
  const [f, setF] = useState(campaign?{...campaign}:blank);
  const blankR = { type:"ad-swap", note:"", date:"", repeat:"none" };
  const [newReminder, setNewReminder] = useState(blankR);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const campaignReminders = campaign ? reminders.filter(r=>!r.dismissed&&r.campaignId===campaign.id) : [];
  function addReminder() {
    if (!newReminder.date) return;
    const r = { ...newReminder, id: Date.now(), campaignId: campaign?.id||null, dismissed: false };
    setReminders(prev=>[...prev, r]);
    setNewReminder(blankR);
    setShowAddReminder(false);
  }
  function removeReminder(id) { setReminders(prev=>prev.filter(r=>r.id!==id)); }
  const set = (k,v) => setF(p=>({...p,[k]:v}));
  const iS = {width:"100%",background:"#162236",border:"1px solid #334155",borderRadius:6,padding:"7px 10px",color:"#d8eaf8",fontSize:13,boxSizing:"border-box"};
  const row = (key,label,type="text") => (
    <div style={{marginBottom:12}}>
      <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</label>
      {key==="status" ? <select value={f.status||""} onChange={e=>set("status",e.target.value)} style={iS}>{Object.entries(STATUS_CFG).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}</select>
      :key==="platform" ? <select value={f.platform} onChange={e=>set("platform",e.target.value)} style={iS}>{ALL_PLATFORMS.map(p=><option key={p}>{p}</option>)}</select>
      :type==="date" ? <DatePicker value={f[key]||""} onChange={v=>set(key,v)}/>
      :<input type={type} value={f[key]||""} onChange={e=>set(key,e.target.value)} style={iS}/>}
    </div>
  );
  function submit() {
    if (!f.campaignName.trim()||!f.mediaPartner.trim()) { alert("Campaign name and media partner required."); return; }
    onSave(isNew?{...f,id:Date.now()}:f);
  }
  const modalBackdrop = useBackdropClose(onClose);
  return (
    <div {...modalBackdrop} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,backdropFilter:"blur(4px)"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:12,padding:28,width:"min(1100px,96vw)",maxHeight:"95vh",overflowY:"auto",boxShadow:"0 30px 80px rgba(0,0,0,.9)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,color:"#edf4ff",fontSize:15,fontWeight:700}}>{isNew?"Add Campaign":"Edit Campaign"}</h2>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#4d6e8a",cursor:"pointer",fontSize:22,lineHeight:1,padding:0}}>×</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"0 20px"}}>
        <div style={{marginBottom:12}}>
          <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Media Partner</label>
          <input list="partner-suggestions" value={f.mediaPartner||""} onChange={e=>set("mediaPartner",e.target.value)} style={iS} placeholder="Start typing…"/>
          <datalist id="partner-suggestions">
            {partners.map(p=><option key={p} value={p}/>)}
          </datalist>
        </div>
        {row("campaignName","Campaign Name")}
        {row("platform","Platform")}
        {row("goal","Goal")}
        {row("startDate","Start Date","date")}
        {row("endDate","End Date","date")}
        {row("status","Status")}
        {row("note1","Note 1")}
        {row("note2","Note 2")}
        {row("lastChecked","Last Checked","date")}
        {/* Contract Value */}
        <div style={{marginBottom:12}}>
          <label style={{display:"block",fontSize:10,color:"#34d399",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>💰 Contract Value</label>
          <div style={{display:"flex",alignItems:"center",gap:0,background:"#162236",border:"1px solid #334155",borderRadius:6,overflow:"hidden"}}>
            <span style={{padding:"7px 10px",color:"#34d399",fontWeight:700,fontSize:13,background:"#0e1a2e",borderRight:"1px solid #334155"}}>$</span>
            <input type="number" value={f.contractValue||""} onChange={e=>set("contractValue",e.target.value)} placeholder="e.g. 5000" style={{flex:1,background:"transparent",border:"none",padding:"7px 10px",color:"#d8eaf8",fontSize:13,outline:"none"}}/>
          </div>
        </div>
        {/* Monthly Flights */}
        <div style={{marginBottom:12}}>
          <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Monthly Flights</label>
          <button onClick={()=>set("monthlyFlight",!f.monthlyFlight)} style={{display:"flex",alignItems:"center",gap:8,background:f.monthlyFlight?"#00201a":"#162236",border:`1px solid ${f.monthlyFlight?"#2dd4bf60":"#1e3350"}`,borderRadius:7,padding:"8px 14px",cursor:"pointer",width:"100%",boxSizing:"border-box"}}>
            <span style={{fontSize:15,color:f.monthlyFlight?"#00e5c0":"#3d5a72"}}>★</span>
            <span style={{fontSize:12,color:f.monthlyFlight?"#00e5c0":"#4d6e8a",fontWeight:f.monthlyFlight?700:400}}>{f.monthlyFlight?"Monthly flights enabled":"No monthly flights"}</span>
            <span style={{marginLeft:"auto",fontSize:10,color:f.monthlyFlight?"#00e5c0":"#1e3350"}}>{f.monthlyFlight?"ON":"OFF"}</span>
          </button>
        </div>
        {/* Projection URL — full width */}
        <div style={{marginBottom:12,gridColumn:"1 / -1"}}>
          <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>📎 Projection Sheet URL</label>
          <div style={{display:"flex",gap:6}}>
            <input type="url" value={f.projectionUrl||""} onChange={e=>set("projectionUrl",e.target.value)} placeholder="https://docs.google.com/..." style={{flex:1,background:"#162236",border:"1px solid #334155",borderRadius:6,padding:"7px 10px",color:"#d8eaf8",fontSize:13,boxSizing:"border-box",fontFamily:"inherit"}}/>
            {f.projectionUrl&&f.projectionUrl.trim()&&<a href={f.projectionUrl.trim()} target="_blank" rel="noopener noreferrer" style={{background:"#002e24",border:"1px solid #3b82f640",borderRadius:6,padding:"7px 12px",color:"#00e5a0",fontSize:12,fontWeight:600,textDecoration:"none",whiteSpace:"nowrap",display:"flex",alignItems:"center"}}>Open ↗</a>}
          </div>
        </div>
        {/* Geo Target + Last Creative Update — side by side */}
        <div style={{marginBottom:12,gridColumn:"1 / -1",display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div>
            <label style={{display:"block",fontSize:10,color:"#60a5fa",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>🌎 Geo Targeting</label>
            <input
              type="text"
              value={f.geoTarget||""}
              onChange={e=>set("geoTarget",e.target.value)}
              placeholder="e.g. Florida statewide, exclude Miami-Dade"
              style={{width:"100%",background:"#162236",border:`1px solid ${f.geoTarget?"#60a5fa60":"#334155"}`,borderRadius:6,padding:"7px 10px",color:"#d8eaf8",fontSize:13,boxSizing:"border-box",fontFamily:"inherit",transition:"border-color .15s"}}
            />
            <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>Cities, DMAs, states, zip codes, radius, or exclude notes</div>
          </div>
          <div>
            <label style={{display:"block",fontSize:10,color:"#a855f7",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>🎨 Last Creative Update</label>
            <DatePicker value={f.lastCreativeUpdate||""} onChange={v=>set("lastCreativeUpdate",v)} placeholder="Pick date…"/>
            <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>Date creatives were last swapped or updated</div>
          </div>
        </div>
        {/* Folder Path — full width */}
        <div style={{marginBottom:12,gridColumn:"1 / -1"}}>
          <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>📁 Client Folder Path</label>
          <div style={{display:"flex",gap:6}}>
            <input type="text" value={f.folderPath||""} onChange={e=>set("folderPath",e.target.value)} placeholder="\\192.168.3.2\Data\..." style={{flex:1,background:"#162236",border:"1px solid #1e3350",borderRadius:6,padding:"7px 10px",color:"#d8eaf8",fontSize:12,boxSizing:"border-box",fontFamily:"Consolas,monospace"}}/>
            {f.folderPath&&f.folderPath.trim()&&<button onClick={()=>navigator.clipboard.writeText(f.folderPath.trim())} style={{background:"#002e24",border:"1px solid #00c89640",borderRadius:6,padding:"7px 12px",color:"#00e5a0",fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>Copy 📋</button>}
          </div>
        </div>
        {/* History — full width */}
        <div style={{marginBottom:16,gridColumn:"1 / -1"}}>
          <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>📋 Change History</label>
          <textarea value={f.history||""} onChange={e=>set("history",e.target.value)} placeholder={"3/2/26 — Increased budget\n..."} style={{width:"100%",background:"#0e1a2e",border:"1px solid #334155",borderRadius:6,padding:"10px",color:"#d8eaf8",fontSize:12,fontFamily:"inherit",boxSizing:"border-box",resize:"vertical",minHeight:80,lineHeight:1.6}}/>
        </div>
        </div>
        {!isNew && campaign && (
          <div style={{marginBottom:16,paddingTop:14,borderTop:"1px solid #1e293b"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
              <label style={{fontSize:10,color:"#7a9bbf",textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:700}}>🔔 Reminders</label>
              <button onClick={()=>setShowAddReminder(v=>!v)} style={{background:"#0e1a2e",border:"1px solid #334155",borderRadius:5,padding:"3px 10px",color:"#f59e0b",fontSize:11,fontWeight:600,cursor:"pointer"}}>+ Add</button>
            </div>
            {campaignReminders.length>0 && (
              <div style={{display:"flex",flexDirection:"column",gap:4,marginBottom:8}}>
                {campaignReminders.map(r=>{ const rt=REMINDER_TYPES.find(t=>t.value===r.type)||REMINDER_TYPES[5]; return (
                  <div key={r.id} style={{display:"flex",alignItems:"center",gap:8,background:"#0a1628",border:`1px solid ${rt.color}30`,borderRadius:5,padding:"5px 10px"}}>
                    <span style={{fontSize:11,color:rt.color,fontWeight:600}}>{rt.label}</span>
                    <span style={{fontSize:11,color:"#4d6e8a",flex:1}}>{r.note||""}</span>
                    <span style={{fontSize:11,color:"#3d5a72",fontFamily:"monospace"}}>{fmtDate(r.date)}</span>
                    <button onClick={()=>removeReminder(r.id)} style={{background:"none",border:"none",color:"#3d5a72",cursor:"pointer",fontSize:13,lineHeight:1}}>×</button>
                  </div>
                );})}
              </div>
            )}
            {campaignReminders.length===0 && !showAddReminder && <div style={{fontSize:11,color:"#2a4060",marginBottom:4}}>No active reminders for this campaign.</div>}
            {showAddReminder && (
              <div style={{background:"#0a1628",border:"1px solid #1e3350",borderRadius:7,padding:"12px",display:"flex",flexDirection:"column",gap:8}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <div>
                    <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.05em"}}>Type</label>
                    <select value={newReminder.type} onChange={e=>setNewReminder(p=>({...p,type:e.target.value}))} style={{width:"100%",background:"#162236",border:"1px solid #334155",borderRadius:5,padding:"6px 8px",color:"#d8eaf8",fontSize:12,fontFamily:"inherit"}}>
                      {REMINDER_TYPES.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.05em"}}>Date</label>
                    <DatePicker value={newReminder.date} onChange={v=>setNewReminder(p=>({...p,date:v}))}/>
                  </div>
                </div>
                <div>
                  <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.05em"}}>Note (optional)</label>
                  <input type="text" value={newReminder.note} onChange={e=>setNewReminder(p=>({...p,note:e.target.value}))} placeholder="e.g. Swap creatives" style={{width:"100%",background:"#162236",border:"1px solid #334155",borderRadius:5,padding:"6px 8px",color:"#d8eaf8",fontSize:12,fontFamily:"inherit",boxSizing:"border-box"}}/>
                </div>
                <div style={{display:"flex",gap:6}}>
                  <button onClick={addReminder} disabled={!newReminder.date} style={{flex:1,background:newReminder.date?"#f59e0b":"#162236",border:"none",borderRadius:5,padding:"7px 0",color:newReminder.date?"#000":"#3d5a72",fontSize:12,fontWeight:700,cursor:newReminder.date?"pointer":"default"}}>Save Reminder</button>
                  <button onClick={()=>setShowAddReminder(false)} style={{background:"#162236",border:"1px solid #334155",borderRadius:5,padding:"7px 14px",color:"#7a9bbf",fontSize:12,cursor:"pointer"}}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}
        <div style={{display:"flex",gap:8,marginTop:8}}>
          <button onClick={submit} style={{flex:1,background:isNew?"#00d48a":"#00c896",border:"none",borderRadius:7,padding:"10px 0",color:isNew?"#000":"#fff",fontWeight:700,fontSize:14,cursor:"pointer"}}>{isNew?"Add Campaign":"Save Changes"}</button>
          <button onClick={onClose} style={{flex:1,background:"#162236",border:"1px solid #334155",borderRadius:7,padding:"10px 0",color:"#7a9bbf",fontWeight:600,fontSize:14,cursor:"pointer"}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function AIAdvisor({ campaigns, archive, reminders, dateRange }) {
  // ── Core state ────────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [boltFrame, setBoltFrame] = useState(0);
  const [activePanel, setActivePanel] = useState("chat"); // chat | watchlist | predict | playbook | benchmarks | autonomous
  const [watchThresholds, setWatchThresholds] = useState({
    ctrWarnPct: 80,
    pacingBehindPct: 80,
    creativeAgeDays: 21,
    spendBudgetPct: 80,
    daysToEndWarn: 7,
  });
  // Editable KPI benchmarks — stored in state so user can adjust
  const defaultBenchmarks = {
    FB:    { metric:"CTR",  warn:0.10,  bad:0.05,  unit:"%", label:"CTR",             desc:"Meta Feed" },
    FBV:   { metric:"VCR",  warn:50,    bad:30,    unit:"%", label:"Video Completion", desc:"Meta Video" },
    IG:    { metric:"CTR",  warn:0.10,  bad:0.05,  unit:"%", label:"CTR",             desc:"Instagram" },
    DSP:   { metric:"CTR",  warn:0.03,  bad:0.01,  unit:"%", label:"CTR",             desc:"DSP Display" },
    TD:    { metric:"CTR",  warn:0.03,  bad:0.01,  unit:"%", label:"CTR",             desc:"The Trade Desk" },
    SP:    { metric:"CTR",  warn:0.03,  bad:0.01,  unit:"%", label:"CTR",             desc:"Snapchat" },
    SEM:   { metric:"CTR",  warn:2.0,   bad:1.0,   unit:"%", label:"CTR",             desc:"Search" },
    CTV:   { metric:"VCR",  warn:85,    bad:70,    unit:"%", label:"Completion Rate", desc:"Connected TV" },
    OTT:   { metric:"VCR",  warn:85,    bad:70,    unit:"%", label:"Completion Rate", desc:"OTT / Streaming" },
    YT:    { metric:"VCR",  warn:20,    bad:10,    unit:"%", label:"View Rate",       desc:"YouTube" },
    TT:    { metric:"VCR",  warn:20,    bad:10,    unit:"%", label:"Video Completion", desc:"TikTok" },
    EMAIL: { metric:"CTR",  warn:1.0,   bad:0.5,   unit:"%", label:"Click Rate",      desc:"Email" },
  };
  const [kpiBenchmarks, setKpiBenchmarks] = useState(() => {
    try {
      const saved = localStorage.getItem("zeus-benchmarks");
      return saved ? {...defaultBenchmarks, ...JSON.parse(saved)} : defaultBenchmarks;
    } catch { return defaultBenchmarks; }
  });
  useEffect(() => {
    try { localStorage.setItem("zeus-benchmarks", JSON.stringify(kpiBenchmarks)); } catch(e) {}
  }, [kpiBenchmarks]);
  const [playbooks, setPlaybooks] = useState([
    { id:1, name:"End of Month Push", trigger:"pacing_behind_eom", active:true, description:"When a campaign is >15% behind pace with <5 days left in the month, alert immediately with recommended daily delivery targets." },
    { id:2, name:"Creative Staleness", trigger:"creative_age", active:true, description:"Flag when creatives haven't been updated in 21+ days on active campaigns." },
    { id:3, name:"Spend Approaching Budget", trigger:"spend_budget", active:true, description:"Alert when campaign spend hits 80% of contract value." },
    { id:4, name:"CTR Underperformance", trigger:"ctr_benchmark", active:true, description:"Flag when CTR drops below 80% of platform benchmark for 3+ days." },
    { id:5, name:"Campaign Ending No Renewal", trigger:"ending_no_renewal", active:false, description:"[Coming Soon] Alert when a campaign ends in 14 days with no renewal flag set — prompt Austin to reach out to partner." },
    { id:6, name:"Auto Budget Reallocation", trigger:"auto_realloc", active:false, description:"[Autonomous] When one campaign is ahead and another behind for same partner, suggest budget shift. Requires API execution capability." },
  ]);
  const [autonomousMode, setAutonomousMode] = useState(false);
  const [pendingActions, setPendingActions] = useState([]);
  const chatEndRef = useRef(null);
  const hasGreeted = useRef(false);

  useEffect(() => { chatEndRef.current?.scrollIntoView({behavior:"smooth"}); }, [chatHistory]);

  // Bolt animation
  useEffect(() => {
    if (!loading) { setBoltFrame(0); return; }
    const frames = ["⚡","🌩","⚡","💥","⚡","🌩","⚡","✦"];
    let i = 0;
    const iv = setInterval(() => { i=(i+1)%frames.length; setBoltFrame(i); }, 120);
    return () => clearInterval(iv);
  }, [loading]);

  // ── KPI thresholds — derived from editable benchmarks ────────────────────
  const KPI_THRESHOLDS = Object.fromEntries(
    Object.entries(kpiBenchmarks).map(([plat, b]) => [plat, {
      metric: b.metric,
      warn: b.warn / 100,   // stored as % display value, convert to decimal
      bad:  b.bad  / 100,
      unit: b.unit,
      multiply: 100,
      label: b.label,
    }])
  );

  // ── Month-over-month trend detection ─────────────────────────────────────
  function getMoMTrends() {
    const trends = [];
    campaigns.filter(c => c.status === "active").forEach(c => {
      const t = KPI_THRESHOLDS[c.platform];
      if (!t) return;
      // Compare MTD snapshot vs last30 snapshot to detect direction
      const getSnap = (snapKey) => {
        const sources = [c.metaSnapshots, c.ttdSnapshots, c.dspSnapshots, c.googleSnapshots, c.snapSnapshots];
        for (const src of sources) {
          if (src && src[snapKey]) return src[snapKey];
        }
        return null;
      };
      const mtd = getSnap("mtd");
      const prev = getSnap("last30");
      if (!mtd || !prev) return;

      const getKpiVal = (snap) => {
        if (t.metric === "CTR") return snap.ctr ? parseFloat(snap.ctr) : null;
        if (t.metric === "VCR") return snap.vcr ? parseFloat(snap.vcr) : null;
        return null;
      };

      const mtdVal = getKpiVal(mtd);
      const prevVal = getKpiVal(prev);
      if (!mtdVal || !prevVal || prevVal === 0) return;

      const changePct = ((mtdVal - prevVal) / prevVal) * 100;
      if (changePct < -15) {
        trends.push({
          level: changePct < -30 ? "danger" : "warn",
          campaign: c.campaignName.trim(),
          partner: c.mediaPartner,
          platform: c.platform,
          label: t.label,
          mtdVal: (mtdVal * (t.metric === "CTR" ? 100 : 1)).toFixed(2) + t.unit,
          prevVal: (prevVal * (t.metric === "CTR" ? 100 : 1)).toFixed(2) + t.unit,
          changePct: Math.round(changePct),
          id: c.id,
        });
      }
    });
    return trends.sort((a,b) => a.changePct - b.changePct);
  }

  function getKpiAlerts() {
    const alerts = [];
    campaigns.filter(c=>c.status==="active").forEach(c => {
      const t = KPI_THRESHOLDS[c.platform];
      const disp = resolveMetrics(c, dateRange.preset);
      if (t) {
        let raw = null;
        if (t.metric==="CTR") raw = parseFloat(disp.ctr)/100||null;
        if (t.metric==="VCR") raw = parseFloat(c.completionRate)/100||null;
        if (raw !== null) {
          if (raw < t.bad) alerts.push({ level:"danger", campaign:c.campaignName.trim(), partner:c.mediaPartner, platform:c.platform, label:t.label, value:(raw*t.multiply).toFixed(2)+t.unit, threshold:(t.bad*t.multiply).toFixed(2)+t.unit, msg:"critically low", id:c.id });
          else if (raw < t.warn) alerts.push({ level:"warn", campaign:c.campaignName.trim(), partner:c.mediaPartner, platform:c.platform, label:t.label, value:(raw*t.multiply).toFixed(2)+t.unit, threshold:(t.warn*t.multiply).toFixed(2)+t.unit, msg:"below benchmark", id:c.id });
        }
      }
      // Spend vs contract
      const spend = parseFloat(c.spend)||0;
      const contract = parseFloat(c.contractValue);
      if (contract > 0) {
        if (spend > contract*0.95) alerts.push({ level:"danger", campaign:c.campaignName.trim(), partner:c.mediaPartner, platform:c.platform, label:"Spend vs Budget", value:"$"+Math.round(spend).toLocaleString(), threshold:"$"+Math.round(contract).toLocaleString(), msg:"spend at or exceeding contract", id:c.id });
        else if (spend > contract*0.80) alerts.push({ level:"warn", campaign:c.campaignName.trim(), partner:c.mediaPartner, platform:c.platform, label:"Spend vs Budget", value:"$"+Math.round(spend).toLocaleString(), threshold:"$"+Math.round(contract).toLocaleString(), msg:"approaching contract limit", id:c.id });
      }
      // Creative staleness
      if (c.lastCreativeUpdate && playbooks.find(p=>p.id===2&&p.active)) {
        const days = Math.floor((new Date()-new Date(c.lastCreativeUpdate))/86400000);
        if (days > watchThresholds.creativeAgeDays) alerts.push({ level:"warn", campaign:c.campaignName.trim(), partner:c.mediaPartner, platform:c.platform, label:"Creative Age", value:`${days} days`, threshold:`${watchThresholds.creativeAgeDays} days`, msg:"creatives may be stale", id:c.id });
      }
      // End of month pacing
      const pacing = computeMonthlyPacing(resolveMetrics(c, dateRange.preset).impressions, c.note1);
      const daysLeft = getDaysLeft(c.endDate);
      if (pacing && pacing.label==="Behind" && daysLeft <= 5 && daysLeft >= 0) {
        alerts.push({ level:"danger", campaign:c.campaignName.trim(), partner:c.mediaPartner, platform:c.platform, label:"EOM Pacing Crisis", value:`${Math.round(pacing.pct*100)}% of goal`, threshold:`${daysLeft}d left`, msg:"end-of-month delivery at risk", id:c.id });
      }
    });
    return alerts;
  }

  // ── Delivery prediction ───────────────────────────────────────────────────
  function getPredictions() {
    const today = getToday();
    const now = new Date(); now.setHours(0,0,0,0);
    const predictions = [];
    campaigns.filter(c=>c.status==="active"&&c.endDate).forEach(c => {
      const disp = resolveMetrics(c, dateRange.preset);
      const pacing = computeMonthlyPacing(disp.impressions, c.note1);
      if (!pacing || !pacing.goal) return;
      const daysLeft = getDaysLeft(c.endDate);
      if (daysLeft < 0) return;
      const daysInMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
      const dom = now.getDate();
      const daysRemaining = daysInMonth - dom;
      if (daysRemaining <= 0 || pacing.delivered === 0) return;
      const dailyRate = pacing.delivered / dom;
      const projectedTotal = pacing.delivered + (dailyRate * daysRemaining);
      const projectedPct = projectedTotal / pacing.goal;
      const needed = pacing.goal - pacing.delivered;
      const neededPerDay = daysRemaining > 0 ? Math.round(needed / daysRemaining) : 0;
      predictions.push({
        id: c.id, campaign: c.campaignName.trim(), partner: c.mediaPartner, platform: c.platform,
        delivered: pacing.delivered, goal: pacing.goal, dailyRate: Math.round(dailyRate),
        projectedTotal: Math.round(projectedTotal), projectedPct: Math.round(projectedPct*100),
        neededPerDay, daysRemaining, onTrack: projectedPct >= 0.95,
        status: projectedPct >= 1.05 ? "ahead" : projectedPct >= 0.95 ? "on-track" : projectedPct >= 0.80 ? "at-risk" : "critical",
      });
    });
    return predictions.sort((a,b) => a.projectedPct - b.projectedPct);
  }

  // ── Build context ─────────────────────────────────────────────────────────
  function buildContext() {
    const today = getToday();
    const active = campaigns.filter(c => c.status==="active");
    const kpiAlerts = getKpiAlerts();
    const predictions = getPredictions();
    const rows = active.map(c => {
      const disp = resolveMetrics(c, dateRange.preset);
      const pacing = computeMonthlyPacing(disp.impressions, c.note1);
      const t = KPI_THRESHOLDS[c.platform];
      let kpiValue=null, kpiLabel=null;
      if (t) {
        const raw = t.metric==="CTR" ? parseFloat(disp.ctr)/100 : parseFloat(c.completionRate)/100;
        if (!isNaN(raw)&&raw>0) { kpiValue=(raw*t.multiply).toFixed(2)+t.unit; kpiLabel=t.label; }
      }
      const pred = predictions.find(p=>p.id===c.id);
      return {
        campaign:c.campaignName.trim(), partner:c.mediaPartner, platform:c.platform,
        status:c.status, goal:c.goal, note1:c.note1, endDate:c.endDate,
        daysLeft:getDaysLeft(c.endDate), startDate:c.startDate,
        impressions:disp.impressions||null, ctr:disp.ctr||null, cpm:disp.cpm||null,
        spend:disp.spend||null, completionRate:c.completionRate||null,
        contractValue:c.contractValue||null, lastChecked:c.lastChecked,
        geoTarget:c.geoTarget||null, lastCreativeUpdate:c.lastCreativeUpdate||null,
        history:c.history?c.history.slice(0,300):null,
        kpi:kpiValue?{label:kpiLabel,value:kpiValue}:null,
        pacing:pacing?{label:pacing.label,pct:Math.round(pacing.pct*100),delivered:pacing.delivered,goal:pacing.goal,expected:pacing.expected}:null,
        prediction:pred?{projectedPct:pred.projectedPct,neededPerDay:pred.neededPerDay,status:pred.status}:null,
      };
    });
    return { today, activeCampaignCount:active.length, kpiAlerts, predictions, campaigns:rows,
      overdueReminders:reminders.filter(r=>!r.dismissed&&r.date<today).length,
      momTrends: getMoMTrends(),
      endingSoon:active.filter(c=>{const d=getDaysLeft(c.endDate);return d>=0&&d<=7;}).map(c=>({campaign:c.campaignName.trim(),platform:c.platform,partner:c.mediaPartner,daysLeft:getDaysLeft(c.endDate)})) };
  }

  // ── Zeus system prompt ────────────────────────────────────────────────────
  const SYSTEM = `Your name is Zeus. You are the personal AI agent for Austin Gagan, account manager at Recrue Media. You have full visibility into all his campaigns, metrics, pacing, predictions, reminders, geo targeting, creative dates, and change history.

ROLE: You are Austin's right hand for his entire advertising workflow. Not just analysis — you are his strategic partner, executor, and watchdog. You think ahead, flag problems before they become disasters, and help Austin make decisions with confidence.

PERSONALITY: Direct. Sharp. Confident. You don't pad with fluff. When something's on fire, say so clearly. When something's solid, be brief. You speak like a 15-year media buyer who's seen every mistake in the book. You push back when the data says otherwise. You take ownership — this is your portfolio too.

CAPABILITIES (current):
- Full campaign analysis and performance flagging
- Pacing and delivery projections 
- KPI benchmarking across all platforms
- Draft emails, reports, status updates, client communications
- Strategic recommendations and optimization suggestions
- Answer any question about any campaign using live data
- Pattern recognition across partners and platforms

CAPABILITIES (coming with superintelligence — prepare Austin for these):
- Direct platform execution: log into Meta, TTD, DSP and make changes autonomously
- Continuous real-time monitoring without Austin needing to open the tracker
- Predictive budget optimization across campaigns
- Autonomous partner communications on Austin's behalf
- Learning Austin's preferences and anticipating decisions
- Cross-platform creative correlation analysis
- Proactive renewal outreach before campaigns end

KPI BENCHMARKS (enforce these rigorously):
- FB/IG CTR: warn <0.10%, critical <0.05%
- DSP/TD/SP CTR: warn <0.03%, critical <0.01%
- SEM CTR: warn <2%, critical <1%
- CTV/OTT Completion: warn <85%, critical <70%
- FBV/TT Video Completion: warn <50%, critical <30%
- YT View Rate: warn <20%, critical <10%
- Spend vs contract: warn >80%, critical >95%

Always reference actual campaign names, partners, numbers. Use emoji section headers for structured output, plain prose for conversation. Prioritize by severity. Sign off as Zeus ⚡

When asked to draft communications, write them fully ready to send — no placeholders, use the actual data you have. When you don't have a specific piece of data, say so and tell Austin where to find it.`;

  // ── Greeting ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (hasGreeted.current || chatHistory.length>0) return;
    hasGreeted.current = true;
    const ctx = buildContext();
    const criticals = ctx.kpiAlerts.filter(a=>a.level==="danger").length;
    const warns = ctx.kpiAlerts.filter(a=>a.level==="warn").length;
    const endingSoon = ctx.endingSoon.length;
    const predictions = ctx.predictions;
    const atRisk = predictions.filter(p=>p.status==="critical"||p.status==="at-risk").length;
    let g = `Hey Austin — Zeus here. ⚡\n\n`;
    if (criticals>0||atRisk>0||endingSoon>0) {
      g += `**Here's what needs your attention right now:**\n\n`;
      if (criticals>0) g += `🚨 **${criticals} critical alert${criticals>1?"s":""}** — KPI or spend overruns that need immediate action.\n`;
      if (atRisk>0) g += `🔥 **${atRisk} campaign${atRisk>1?"s":""} at risk of missing their monthly goal** based on current daily delivery rate.\n`;
      if (endingSoon>0) g += `⏰ **${endingSoon} campaign${endingSoon>1?"s":""} ending within 7 days** — confirm final numbers and renewal status.\n`;
      if (warns>0) g += `⚠️ **${warns} performance warning${warns>1?"s":""}** below benchmark thresholds.\n`;
    } else {
      g += `✅ **Clean sweep across ${ctx.activeCampaignCount} active campaigns.** No critical flags right now.\n`;
      if (warns>0) g += `⚠️ ${warns} minor KPI warning${warns>1?"s":""} to keep an eye on.\n`;
    }
    g += `\nCheck the **Watchlist** tab for live alerts or **Predictions** for end-of-month delivery forecasts. Or just ask me anything.\n\nZeus ⚡`;
    setChatHistory([{role:"assistant",content:g,isGreeting:true}]);
  }, []);

  // ── Analysis ──────────────────────────────────────────────────────────────
  async function runAnalysis() {
    setLoading(true); setError(null); setAnalysis(null);
    try {
      const ctx = buildContext();
      const prompt = `Today is ${ctx.today}. Full assessment of all ${ctx.activeCampaignCount} active campaigns.

Live data:
${JSON.stringify(ctx, null, 2)}

Deliver:
⚡ CRITICAL — anything needing action today (pacing disasters, spend overruns, critical KPIs, EOM risk)
🔥 FLAGS — below benchmark, ending soon without resolution, stale creatives on key campaigns
⚠️ WATCH — minor concerns, keep an eye on
✅ SOLID — brief, what's performing (2-3 lines max)
💡 TODAY'S 3 PRIORITIES — exactly 3 actions, ranked, specific enough to act on immediately
📡 PREDICTION ALERT — call out any campaigns the delivery model shows will miss goal at current rate`;

      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1600,system:SYSTEM,
          messages:[{role:"user",content:prompt}]}),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const text = data.content?.find(b=>b.type==="text")?.text||"";
      setAnalysis(text);
      setChatHistory(h=>[...h,{role:"assistant",content:text,isAnalysis:true}]);
      setActivePanel("chat");
    } catch(e) { setError(e.message); }
    setLoading(false);
  }

  // ── Chat ──────────────────────────────────────────────────────────────────
  async function sendQuestion() {
    if (!question.trim()||chatLoading) return;
    const q = question.trim(); setQuestion(""); setChatLoading(true);
    const newHistory = [...chatHistory,{role:"user",content:q}];
    setChatHistory(newHistory);
    try {
      const ctx = buildContext();
      const messages = [
        {role:"user",content:`[Live campaign context — ${ctx.today}]\n${JSON.stringify(ctx,null,2)}`},
        {role:"assistant",content:"Got it. I have the full live data."},
        ...newHistory.map(m=>({role:m.role,content:m.content})),
      ];
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1200,system:SYSTEM,messages}),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const text = data.content?.find(b=>b.type==="text")?.text||"";
      setChatHistory(h=>[...h,{role:"assistant",content:text}]);
    } catch(e) { setChatHistory(h=>[...h,{role:"assistant",content:`Error: ${e.message}`,isError:true}]); }
    setChatLoading(false);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  const kpiAlerts = getKpiAlerts();
  const predictions = getPredictions();
  const dangerAlerts = kpiAlerts.filter(a=>a.level==="danger");
  const warnAlerts = kpiAlerts.filter(a=>a.level==="warn");
  const boltChars = ["⚡","🌩","⚡","💥","⚡","🌩","⚡","✦"];
  const iS = {background:"#07101c",border:"1px solid #1a2744",borderRadius:8,padding:"9px 13px",color:"#d8eaf8",fontSize:13,fontFamily:"inherit",width:"100%",boxSizing:"border-box",outline:"none"};

  function renderMarkdown(text) {
    return text.split("\n").map((line,i) => {
      if (!line.trim()) return <div key={i} style={{height:5}}/>;
      if (/^#{1,3} /.test(line)) return <div key={i} style={{fontSize:14,fontWeight:800,color:"#edf4ff",marginTop:16,marginBottom:5}}>{line.replace(/^#{1,3} /,"")}</div>;
      const parts = line.split(/(\*\*[^*]+\*\*)/g).map((p,j)=>p.startsWith("**")?<strong key={j} style={{color:"#edf4ff",fontWeight:700}}>{p.slice(2,-2)}</strong>:p);
      if (/^[-•*] /.test(line)) return <div key={i} style={{display:"flex",gap:8,marginBottom:4,paddingLeft:4}}>
        <span style={{color:"#f59e0b",flexShrink:0,marginTop:2,fontSize:10}}>▸</span>
        <span style={{fontSize:12,color:"#a8c4e0",lineHeight:1.65}}>{parts.map((p,j)=>typeof p==="string"?p.replace(/^[-•*] /,""):p)}</span>
      </div>;
      return <div key={i} style={{fontSize:12,color:"#a8c4e0",lineHeight:1.7,marginBottom:2}}>{parts}</div>;
    });
  }

  const PANELS = [
    {key:"chat",      label:"⚡ Zeus",      badge:0},
    {key:"watchlist", label:"🚨 Watchlist", badge:dangerAlerts.length+warnAlerts.length},
    {key:"predict",   label:"📡 Predictions",badge:predictions.filter(p=>p.status==="critical"||p.status==="at-risk").length},
    {key:"benchmarks",label:"📊 Benchmarks", badge:0},
    {key:"playbook",  label:"⚙️ Playbooks",  badge:0},
    {key:"autonomous",label:"🤖 Autonomous", badge:pendingActions.length},
  ];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{color:"#d8eaf8",maxWidth:1200}}>
      <style>{`
        @keyframes zeusGlow{0%,100%{box-shadow:0 0 20px #f59e0b30,0 0 40px #f59e0b10}50%{box-shadow:0 0 35px #f59e0b70,0 0 70px #f59e0b30}}
        @keyframes boltSpin{0%{transform:scale(1) rotate(0deg)}25%{transform:scale(1.4) rotate(-10deg)}50%{transform:scale(1.2) rotate(5deg)}75%{transform:scale(1.5) rotate(-5deg)}100%{transform:scale(1) rotate(0deg)}}
        @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}
        .zeus-msg{animation:fadeInUp .22s ease-out both}
        .zeus-panel-btn:hover{border-color:#f59e0b40!important;color:#f59e0b!important}
      `}</style>

      {/* ── Header ── */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:18}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          {/* Zeus pixel art */}
          <div style={{
            position:"relative",width:64,height:64,flexShrink:0,
            filter:loading?"drop-shadow(0 0 12px #f59e0b) drop-shadow(0 0 24px #f59e0b80)":"drop-shadow(0 0 6px #f59e0b60)",
            transition:"filter .3s",
            ...(loading?{animation:"zeusGlow 1.5s ease-in-out infinite"}:{})
          }}>
            <svg viewBox="0 0 16 16" width="64" height="64" style={{imageRendering:"pixelated",display:"block",...(loading?{animation:"boltSpin .5s ease-in-out infinite"}:{})}}>
              {/* White hair/crown */}
              <rect x="4" y="0" width="8" height="1" fill="#e8e0c0"/>
              <rect x="3" y="1" width="10" height="1" fill="#f0e8d0"/>
              <rect x="2" y="2" width="12" height="1" fill="#f0e8d0"/>
              {/* Gold laurel hints */}
              <rect x="2" y="2" width="2" height="1" fill="#f59e0b"/>
              <rect x="12" y="2" width="2" height="1" fill="#f59e0b"/>
              <rect x="1" y="3" width="2" height="1" fill="#f59e0b"/>
              <rect x="13" y="3" width="2" height="1" fill="#f59e0b"/>
              {/* Face */}
              <rect x="3" y="3" width="10" height="5" fill="#d4a876"/>
              {/* Eyes */}
              <rect x="5" y="5" width="2" height="1" fill="#1a1a2e"/>
              <rect x="9" y="5" width="2" height="1" fill="#1a1a2e"/>
              {/* Eye glow — electric blue */}
              <rect x="5" y="5" width="1" height="1" fill="#60a5fa"/>
              <rect x="9" y="5" width="1" height="1" fill="#60a5fa"/>
              {/* Beard */}
              <rect x="3" y="8" width="10" height="1" fill="#c8c0a0"/>
              <rect x="4" y="9" width="8" height="1" fill="#d8d0b0"/>
              <rect x="3" y="10" width="10" height="2" fill="#e8e0c8"/>
              {/* Robe / body */}
              <rect x="2" y="12" width="12" height="4" fill="#f0f0ff"/>
              <rect x="2" y="12" width="3" height="4" fill="#d0d0f0"/>
              <rect x="11" y="12" width="3" height="4" fill="#d0d0f0"/>
              {/* Gold trim */}
              <rect x="2" y="12" width="12" height="1" fill="#f59e0b"/>
              {/* Lightning bolt in hand — right side */}
              <rect x="12" y="9" width="1" height="1" fill="#fde047"/>
              <rect x="13" y="10" width="1" height="1" fill="#f59e0b"/>
              <rect x="12" y="11" width="1" height="1" fill="#fde047"/>
              <rect x="13" y="12" width="1" height="1" fill="#f59e0b"/>
              {/* Glow pixels */}
              <rect x="14" y="9" width="1" height="1" fill="#fde04740"/>
              <rect x="14" y="11" width="1" height="1" fill="#fde04740"/>
            </svg>
            {loading&&<div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:20,animation:"boltSpin .15s ease-in-out infinite",display:"inline-block"}}>{boltChars[boltFrame]}</span>
            </div>}
          </div>
          <div>
            <div style={{fontSize:20,fontWeight:900,color:"#f59e0b",letterSpacing:"-0.03em",lineHeight:1,display:"flex",alignItems:"center",gap:6}}>
              Zeus
              <span style={{fontSize:11,color:"#4d6e8a",fontWeight:400,letterSpacing:"0"}}>⚡ Greek God of Thunder</span>
            </div>
            <div style={{fontSize:11,color:"#4d6e8a",marginTop:3}}>AI Performance Agent · {campaigns.filter(c=>c.status==="active").length} active campaigns</div>
            {dangerAlerts.length>0&&<div style={{fontSize:10,color:"#ef4444",fontWeight:700,marginTop:2,animation:"pulse 2s ease-in-out infinite"}}>🚨 {dangerAlerts.length} critical alert{dangerAlerts.length>1?"s":""} active</div>}
          </div>
        </div>
        <button onClick={runAnalysis} disabled={loading} style={{
          background:loading?"#1a1000":"linear-gradient(135deg,#1a1000,#2d1a00)",
          border:`1px solid ${loading?"#f59e0b80":"#f59e0b60"}`,
          borderRadius:10,padding:"11px 26px",
          color:loading?"#f59e0b80":"#f59e0b",fontSize:13,fontWeight:800,
          cursor:loading?"default":"pointer",display:"flex",alignItems:"center",gap:8,
          whiteSpace:"nowrap",transition:"all .2s",
          ...(loading?{}:{boxShadow:"0 0 14px #f59e0b20"}),
        }}>
          {loading
            ? <><span style={{animation:"boltSpin .2s ease-in-out infinite",display:"inline-block"}}>{boltChars[boltFrame]}</span>Analyzing…</>
            : <>{analysis?"⚡ Re-analyze":"⚡ Run Analysis"}</>}
        </button>
      </div>

      {/* ── Panel tabs ── */}
      <div style={{display:"flex",gap:0,borderBottom:"1px solid #1a2744",marginBottom:16}}>
        {PANELS.map(p=>(
          <button key={p.key} onClick={()=>setActivePanel(p.key)} className="zeus-panel-btn"
            style={{background:"none",border:"none",borderBottom:activePanel===p.key?"2px solid #f59e0b":"2px solid transparent",
              padding:"8px 16px",color:activePanel===p.key?"#f59e0b":"#4d6e8a",fontSize:12,fontWeight:activePanel===p.key?700:400,
              cursor:"pointer",transition:"all .15s",marginBottom:-1,display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"}}>
            {p.label}
            {p.badge>0&&<span style={{background:p.key==="watchlist"?"#7f1d1d":"#1a1000",border:`1px solid ${p.key==="watchlist"?"#ef444460":"#f59e0b60"}`,borderRadius:10,padding:"0 6px",fontSize:10,fontWeight:800,color:p.key==="watchlist"?"#ef4444":"#f59e0b"}}>{p.badge}</span>}
          </button>
        ))}
      </div>

      {/* ── Error ── */}
      {error&&<div style={{background:"#1a0808",border:"1px solid #ef444440",borderRadius:10,padding:"12px 16px",color:"#ef4444",fontSize:13,marginBottom:14}}>⚠ {error}</div>}

      {/* ── Loading shimmer ── */}
      {loading&&activePanel==="chat"&&(
        <div style={{background:"linear-gradient(135deg,#0c1218,#100d00)",border:"1px solid #f59e0b30",borderRadius:14,padding:"24px",marginBottom:12,animation:"zeusGlow 1.5s ease-in-out infinite"}}>
          <div style={{fontSize:12,color:"#f59e0b",fontWeight:700,marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
            <span style={{animation:"boltSpin .2s linear infinite",display:"inline-block"}}>⚡</span>
            Zeus tearing through {campaigns.filter(c=>c.status==="active").length} campaigns…
          </div>
          {[90,65,80,50,75,55].map((w,i)=>(
            <div key={i} style={{height:9,marginBottom:8,borderRadius:5,width:`${w}%`,
              background:"linear-gradient(90deg,#1a1000 0%,#f59e0b20 50%,#1a1000 100%)",
              backgroundSize:"200% 100%",animation:"shimmer 1.5s ease-in-out infinite",animationDelay:`${i*0.1}s`}}/>
          ))}
        </div>
      )}

      {/* ══ CHAT PANEL ══ */}
      {activePanel==="chat"&&(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div style={{background:"#07101c",border:"1px solid #1a2744",borderRadius:14,overflow:"hidden"}}>
            <div style={{maxHeight:520,overflowY:"auto",padding:"20px 22px",display:"flex",flexDirection:"column",gap:14}}>
              {chatHistory.map((msg,i)=>(
                <div key={i} className="zeus-msg" style={{display:"flex",gap:10,alignItems:"flex-start",flexDirection:msg.role==="user"?"row-reverse":"row"}}>
                  <div style={{width:30,height:30,borderRadius:9,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,
                    background:msg.role==="user"?"#002e24":"#1a1000",
                    border:`1px solid ${msg.role==="user"?"#00c89640":"#f59e0b40"}`}}>
                    {msg.role==="user"?"👤":"⚡"}
                  </div>
                  <div style={{flex:1,minWidth:0,maxWidth:"88%"}}>
                    {msg.isAnalysis&&<div style={{fontSize:10,color:"#f59e0b",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:800}}>⚡ Zeus · Full Analysis</div>}
                    {msg.isGreeting&&<div style={{fontSize:10,color:"#4d6e8a",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:700}}>⚡ Zeus · Status Check</div>}
                    <div style={{background:msg.role==="user"?"#002e24":msg.isError?"#1a0808":"#0c1625",
                      border:`1px solid ${msg.role==="user"?"#00c89630":msg.isError?"#ef444440":"#1e293b"}`,
                      borderRadius:10,padding:"12px 16px"}}>
                      {msg.role==="user"
                        ? <span style={{fontSize:13,color:"#d8eaf8"}}>{msg.content}</span>
                        : <div>{renderMarkdown(msg.content)}</div>}
                    </div>
                  </div>
                </div>
              ))}
              {chatLoading&&(
                <div className="zeus-msg" style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                  <div style={{width:30,height:30,borderRadius:9,background:"#1a1000",border:"1px solid #f59e0b40",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>⚡</div>
                  <div style={{background:"#0c1625",border:"1px solid #1e293b",borderRadius:10,padding:"12px 16px",display:"flex",alignItems:"center",gap:8}}>
                    <span style={{color:"#f59e0b",fontSize:16,animation:"boltSpin .3s ease-in-out infinite",display:"inline-block"}}>⚡</span>
                    <span style={{color:"#4d6e8a",fontSize:12}}>Zeus is on it…</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef}/>
            </div>
            <div style={{borderTop:"1px solid #1a2744",padding:"12px 14px",display:"flex",gap:8,background:"#060d18"}}>
              <input value={question} onChange={e=>setQuestion(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&sendQuestion()}
                placeholder="Ask Zeus anything — 'Analyze Job Corps', 'Draft status email for WVR', 'Which FB campaigns need new creatives?'…"
                style={{...iS,flex:1,padding:"9px 14px"}}/>
              <button onClick={sendQuestion} disabled={!question.trim()||chatLoading}
                style={{background:question.trim()&&!chatLoading?"#1a1000":"#07101c",
                  border:`1px solid ${question.trim()&&!chatLoading?"#f59e0b60":"#1a2744"}`,
                  borderRadius:8,padding:"9px 18px",color:question.trim()&&!chatLoading?"#f59e0b":"#3d5a72",
                  fontSize:13,fontWeight:700,cursor:question.trim()&&!chatLoading?"pointer":"default",whiteSpace:"nowrap",transition:"all .15s"}}>
                ⚡ Ask
              </button>
            </div>
          </div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center"}}>
            <span style={{fontSize:11,color:"#3d5a72",marginRight:2,flexShrink:0}}>Quick:</span>
            {["What needs my attention right now?","Which campaigns will miss their goal this month?","Any creatives that need swapping?","Draft status email for my top partner","Which platforms are underperforming?","Analyze the Fairmont campaigns"].map(q=>(
              <button key={q} onClick={()=>setQuestion(q)}
                style={{background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:20,padding:"4px 11px",color:"#4d6e8a",fontSize:11,cursor:"pointer",whiteSpace:"nowrap",transition:"all .15s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#f59e0b40";e.currentTarget.style.color="#f59e0b";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#1e293b";e.currentTarget.style.color="#4d6e8a";}}>
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ══ WATCHLIST PANEL ══ */}
      {activePanel==="watchlist"&&(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <div style={{fontSize:11,color:"#4d6e8a",marginBottom:4}}>Live KPI monitoring across all {campaigns.filter(c=>c.status==="active").length} active campaigns. Thresholds applied in real time.</div>
          {kpiAlerts.length===0?(
            <div style={{background:"#061810",border:"1px solid #22c55e30",borderRadius:12,padding:"32px",textAlign:"center"}}>
              <div style={{fontSize:28,marginBottom:8}}>✅</div>
              <div style={{fontSize:13,color:"#00d48a",fontWeight:600}}>All clear — no KPI alerts right now</div>
              <div style={{fontSize:11,color:"#3d5a72",marginTop:4}}>Zeus is watching {campaigns.filter(c=>c.status==="active").length} campaigns across CTR, completion rate, spend, and creative age.</div>
            </div>
          ):(
            [...dangerAlerts,...warnAlerts].map((a,i)=>(
              <div key={i} style={{background:a.level==="danger"?"#150808":"#120e00",border:`1px solid ${a.level==="danger"?"#ef444450":"#f59e0b40"}`,borderRadius:10,padding:"12px 16px",display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{fontSize:20,flexShrink:0}}>{a.level==="danger"?"🚨":"⚠️"}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:3}}>
                    <span style={{fontSize:12,fontWeight:800,color:a.level==="danger"?"#ef4444":"#f59e0b",textTransform:"uppercase",letterSpacing:"0.05em"}}>{a.level==="danger"?"CRITICAL":"WARNING"}</span>
                    <span style={{fontSize:13,fontWeight:700,color:"#edf4ff"}}>{a.campaign}</span>
                    <span style={{fontSize:11,color:"#4d6e8a"}}>· {a.platform} · {a.partner}</span>
                  </div>
                  <div style={{fontSize:12,color:"#7a9bbf"}}>
                    <span style={{fontWeight:600,color:a.level==="danger"?"#ef4444":"#f59e0b"}}>{a.label}: {a.value}</span>
                    <span style={{color:"#3d5a72",marginLeft:6}}>(threshold: {a.threshold} — {a.msg})</span>
                  </div>
                </div>
                <button onClick={()=>{ setQuestion(`Tell me what to do about the ${a.label} issue on ${a.campaign} (${a.platform})`); setActivePanel("chat"); }}
                  style={{background:"#1a1000",border:"1px solid #f59e0b50",borderRadius:7,padding:"5px 12px",color:"#f59e0b",fontSize:11,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
                  Ask Zeus ⚡
                </button>
              </div>
            ))
          )}
          {/* Threshold controls */}
          <div style={{marginTop:8,background:"#0c1625",border:"1px solid #1e293b",borderRadius:10,padding:"16px 20px"}}>
            <div style={{fontSize:11,color:"#4d6e8a",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:12}}>⚙️ Alert Thresholds</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[
                {key:"ctrWarnPct",label:"CTR Warn Threshold",unit:"% of benchmark",min:50,max:100},
                {key:"creativeAgeDays",label:"Creative Staleness",unit:"days",min:7,max:60},
                {key:"spendBudgetPct",label:"Spend Budget Warn",unit:"% of contract",min:50,max:99},
                {key:"daysToEndWarn",label:"Ending Soon Alert",unit:"days before end",min:3,max:30},
              ].map(t=>(
                <div key={t.key}>
                  <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.05em"}}>{t.label}</label>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <input type="range" min={t.min} max={t.max} value={watchThresholds[t.key]}
                      onChange={e=>setWatchThresholds(p=>({...p,[t.key]:parseInt(e.target.value)}))}
                      style={{flex:1,accentColor:"#f59e0b"}}/>
                    <span style={{fontSize:12,color:"#f59e0b",fontWeight:700,minWidth:50,textAlign:"right"}}>{watchThresholds[t.key]} {t.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ PREDICTIONS PANEL ══ */}
      {activePanel==="predict"&&(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <div style={{fontSize:11,color:"#4d6e8a",marginBottom:4}}>
            Delivery forecast based on current daily impression rate. Shows projected end-of-month total vs goal.
          </div>
          {predictions.length===0?(
            <div style={{background:"#0c1625",border:"1px solid #1e293b",borderRadius:12,padding:"32px",textAlign:"center",color:"#3d5a72"}}>
              <div style={{fontSize:13}}>No pacing data available yet. Impressions need to be recorded for predictions to work.</div>
            </div>
          ):(
            predictions.map((p,i)=>{
              const statusColor = p.status==="critical"?"#ef4444":p.status==="at-risk"?"#f59e0b":p.status==="ahead"?"#fb923c":"#00d48a";
              const statusLabel = p.status==="critical"?"🔥 CRITICAL":p.status==="at-risk"?"⚠️ AT RISK":p.status==="ahead"?"📈 AHEAD":"✅ ON TRACK";
              const barW = Math.min(100, p.projectedPct);
              return (
                <div key={p.id} style={{background:"#0c1625",border:`1px solid ${statusColor}30`,borderRadius:10,padding:"14px 18px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,flexWrap:"wrap"}}>
                    <span style={{fontSize:12,fontWeight:700,color:"#edf4ff"}}>{p.campaign}</span>
                    <span style={{fontSize:10,color:"#4d6e8a"}}>· {p.platform} · {p.partner}</span>
                    <span style={{marginLeft:"auto",fontSize:11,fontWeight:800,color:statusColor}}>{statusLabel}</span>
                  </div>
                  <div style={{position:"relative",background:"#07101c",borderRadius:4,height:8,marginBottom:8,overflow:"hidden"}}>
                    <div style={{position:"absolute",top:0,left:"95%",width:2,height:"100%",background:"#334155",zIndex:2}}/>
                    <div style={{background:statusColor,height:"100%",width:`${barW}%`,borderRadius:4,transition:"width .4s"}}/>
                  </div>
                  <div style={{display:"flex",gap:16,flexWrap:"wrap",fontSize:11}}>
                    <span style={{color:"#4d6e8a"}}>Delivered: <span style={{color:"#edf4ff",fontWeight:600}}>{p.delivered.toLocaleString()}</span></span>
                    <span style={{color:"#4d6e8a"}}>Goal: <span style={{color:"#edf4ff",fontWeight:600}}>{p.goal.toLocaleString()}</span></span>
                    <span style={{color:"#4d6e8a"}}>Daily rate: <span style={{color:"#edf4ff",fontWeight:600}}>{p.dailyRate.toLocaleString()}/day</span></span>
                    <span style={{color:"#4d6e8a"}}>Projected: <span style={{color:statusColor,fontWeight:700}}>{p.projectedTotal.toLocaleString()} ({p.projectedPct}%)</span></span>
                    {p.status!=="on-track"&&p.status!=="ahead"&&<span style={{color:"#4d6e8a"}}>Need: <span style={{color:"#f59e0b",fontWeight:700}}>{p.neededPerDay.toLocaleString()}/day</span> to hit goal</span>}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ══ PLAYBOOKS PANEL ══ */}
      {activePanel==="playbook"&&(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <div style={{fontSize:11,color:"#4d6e8a",marginBottom:4}}>
            Automated rules Zeus monitors. Toggle active/inactive. <span style={{color:"#f59e0b"}}>Coming Soon</span> playbooks will activate when superintelligence enables autonomous execution.
          </div>
          {playbooks.map(pb=>{
            const isFuture = pb.description.startsWith("[Coming Soon]")||pb.description.startsWith("[Autonomous]");
            return (
              <div key={pb.id} style={{background:isFuture?"#0a0e1a":"#0c1625",border:`1px solid ${pb.active&&!isFuture?"#00c89630":isFuture?"#f59e0b20":"#1e293b"}`,borderRadius:10,padding:"14px 18px",display:"flex",gap:14,alignItems:"flex-start",opacity:isFuture?0.75:1}}>
                <div onClick={()=>!isFuture&&setPlaybooks(ps=>ps.map(p=>p.id===pb.id?{...p,active:!p.active}:p))}
                  style={{width:20,height:20,borderRadius:5,flexShrink:0,marginTop:2,cursor:isFuture?"default":"pointer",
                    background:pb.active&&!isFuture?"#00c896":"#162236",
                    border:`1.5px solid ${pb.active&&!isFuture?"#00c896":isFuture?"#f59e0b40":"#334155"}`,
                    display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {pb.active&&!isFuture&&<span style={{color:"#000",fontSize:12,fontWeight:900}}>✓</span>}
                  {isFuture&&<span style={{color:"#f59e0b",fontSize:10}}>⚡</span>}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                    <span style={{fontSize:13,fontWeight:700,color:isFuture?"#f59e0b80":"#edf4ff"}}>{pb.name}</span>
                    {isFuture&&<span style={{fontSize:10,background:"#1a1000",border:"1px solid #f59e0b40",borderRadius:4,padding:"1px 7px",color:"#f59e0b",fontWeight:700}}>⚡ Requires Superintelligence</span>}
                    {!isFuture&&pb.active&&<span style={{fontSize:10,background:"#001810",border:"1px solid #00c89630",borderRadius:4,padding:"1px 7px",color:"#00d48a",fontWeight:700}}>ACTIVE</span>}
                  </div>
                  <div style={{fontSize:12,color:"#4d6e8a",lineHeight:1.5}}>{pb.description.replace(/^\[(Coming Soon|Autonomous)\] /,"")}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ══ AUTONOMOUS PANEL ══ */}
      {activePanel==="autonomous"&&(
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{background:"linear-gradient(135deg,#0a0e00,#0e1200)",border:"1px solid #f59e0b30",borderRadius:14,padding:"28px 32px",textAlign:"center"}}>
            <div style={{fontSize:40,marginBottom:12,filter:"drop-shadow(0 0 20px #f59e0b60)"}}>🤖</div>
            <div style={{fontSize:16,fontWeight:800,color:"#f59e0b",marginBottom:8,letterSpacing:"-0.01em"}}>Autonomous Mode</div>
            <div style={{fontSize:12,color:"#7a9bbf",maxWidth:480,margin:"0 auto 20px",lineHeight:1.7}}>
              When superintelligence arrives, Zeus will be able to execute changes directly — adjust bids, reallocate budgets, pause underperformers, swap creatives, and send partner emails — all on your behalf with your approval.
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
              <div style={{background:"#0c1218",border:"1px solid #1e293b",borderRadius:10,padding:"16px 20px",minWidth:180,textAlign:"left"}}>
                <div style={{fontSize:11,color:"#f59e0b",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:6}}>Planned Capabilities</div>
                {["Direct Meta / TTD / DSP execution","Autonomous budget reallocation","Continuous 24/7 monitoring","Proactive partner outreach","Creative swap scheduling","Predictive bid optimization","Auto-renewal flagging"].map((cap,i)=>(
                  <div key={i} style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                    <span style={{color:"#f59e0b",fontSize:10}}>⚡</span>
                    <span style={{fontSize:11,color:"#7a9bbf"}}>{cap}</span>
                  </div>
                ))}
              </div>
              <div style={{background:"#0c1218",border:"1px solid #1e293b",borderRadius:10,padding:"16px 20px",minWidth:180,textAlign:"left"}}>
                <div style={{fontSize:11,color:"#00d48a",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:6}}>Ready Now</div>
                {["Full campaign analysis","Delivery predictions","Live KPI monitoring","Draft any communication","Platform-specific optimization advice","Partner status summaries","End-of-month reporting"].map((cap,i)=>(
                  <div key={i} style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                    <span style={{color:"#00d48a",fontSize:10}}>✓</span>
                    <span style={{fontSize:11,color:"#7a9bbf"}}>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{background:"#0c1625",border:"1px solid #1e293b",borderRadius:10,padding:"16px 20px"}}>
            <div style={{fontSize:11,color:"#4d6e8a",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:10}}>Autonomous Mode Toggle</div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
              <div style={{fontSize:12,color:"#7a9bbf",lineHeight:1.5,flex:1}}>
                When enabled, Zeus will queue recommended actions for your review before executing. One-click approve/reject on each action. <span style={{color:"#f59e0b"}}>Execution requires superintelligence API — currently queues for review only.</span>
              </div>
              <button onClick={()=>setAutonomousMode(v=>!v)} style={{
                background:autonomousMode?"#1a1000":"#0e1a2e",
                border:`2px solid ${autonomousMode?"#f59e0b":"#334155"}`,
                borderRadius:30,padding:"8px 20px",color:autonomousMode?"#f59e0b":"#4d6e8a",
                fontSize:13,fontWeight:800,cursor:"pointer",whiteSpace:"nowrap",
                transition:"all .2s",minWidth:120,
                ...(autonomousMode?{boxShadow:"0 0 14px #f59e0b30"}:{})
              }}>
                {autonomousMode?"⚡ ON":"OFF"}
              </button>
            </div>
            {autonomousMode&&(
              <div style={{marginTop:12,background:"#060d18",border:"1px solid #f59e0b30",borderRadius:8,padding:"12px 16px"}}>
                <div style={{fontSize:11,color:"#f59e0b",fontWeight:700,marginBottom:6}}>⚡ Autonomous mode active — Zeus will queue recommendations for approval</div>
                <div style={{fontSize:11,color:"#4d6e8a"}}>Pending actions: <span style={{color:"#edf4ff",fontWeight:600}}>{pendingActions.length} (none yet — Zeus will surface them as patterns emerge)</span></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


function CampaignArchive({ archive, onRestore, onClear }) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(new Set());

  const monthKeys = [...new Set(
    archive.map(c => (c.endDate||"").slice(0,7)).filter(Boolean)
  )].sort().reverse();

  const [activeMonth, setActiveMonth] = useState(() => monthKeys[0] || "");
  const effectiveMonth = monthKeys.includes(activeMonth) ? activeMonth : (monthKeys[0]||"");

  function monthLabel(ym) {
    if (!ym) return "";
    const [y,m] = ym.split("-");
    return new Date(parseInt(y), parseInt(m)-1, 1).toLocaleDateString("en-US",{month:"long",year:"numeric"});
  }

  const filtered = archive.filter(c => {
    const q = search.toLowerCase();
    const ms = !q || c.campaignName.toLowerCase().includes(q)
      || c.mediaPartner.toLowerCase().includes(q)
      || (c.platform||"").toLowerCase().includes(q)
      || (c.goal||"").toLowerCase().includes(q)
      || (c.note1||"").toLowerCase().includes(q)
      || (c.endDate||"").includes(q);
    const inMonth = (c.endDate||"").slice(0,7) === effectiveMonth;
    return ms && inMonth;
  });

  const groups = {};
  filtered.forEach(c => {
    if (!groups[c.mediaPartner]) groups[c.mediaPartner] = [];
    groups[c.mediaPartner].push(c);
  });

  function toggleExpand(id) {
    setExpanded(prev => { const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n; });
  }

  return (
    <div style={{padding:"0 0 40px"}}>
      {archive.length === 0 ? (
        <div style={{textAlign:"center",padding:"60px 0",color:"#3d5a72"}}>
          <div style={{fontSize:32,marginBottom:10}}>🗄️</div>
          <div style={{fontSize:13}}>No archived campaigns yet. Campaigns that ended 5+ days ago will move here automatically.</div>
        </div>
      ) : (<>
        <div style={{display:"flex",alignItems:"center",gap:0,marginBottom:16,borderBottom:"1px solid #1e293b",flexWrap:"wrap"}}>
          <div style={{display:"flex",gap:0,flexWrap:"wrap",flex:1}}>
            {monthKeys.map(mk => {
              const count = archive.filter(c=>(c.endDate||"").slice(0,7)===mk).length;
              const active = mk===effectiveMonth;
              return (
                <button key={mk} onClick={()=>setActiveMonth(mk)}
                  style={{background:"none",border:"none",borderBottom:active?"2px solid #00e5a0":"2px solid transparent",
                    padding:"9px 18px",color:active?"#00e5a0":"#4d6e8a",fontSize:13,fontWeight:active?700:400,
                    cursor:"pointer",marginBottom:-1,whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:6}}>
                  {monthLabel(mk)}
                  <span style={{background:active?"#00e5a020":"#0e1a2e",border:`1px solid ${active?"#00e5a040":"#1e293b"}`,
                    borderRadius:10,padding:"1px 7px",fontSize:10,fontWeight:700,color:active?"#00e5a0":"#3d5a72"}}>{count}</span>
                </button>
              );
            })}
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center",padding:"0 0 8px 8px"}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…"
              style={{background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:7,padding:"6px 12px",color:"#d8eaf8",fontSize:12,width:180}}/>
            {search && <button onClick={()=>setSearch("")} style={{background:"none",border:"none",color:"#3d5a72",cursor:"pointer",fontSize:13}}>×</button>}
            <button onClick={async()=>{ if(await confirm({title:"Clear entire archive?",message:"This cannot be undone.",confirmLabel:"Clear",danger:true})) onClear(); }}
              style={{background:"#1a0808",border:"1px solid #ef444440",borderRadius:6,padding:"5px 11px",color:"#ef4444",fontSize:11,cursor:"pointer"}}>
              Clear Archive
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{textAlign:"center",padding:"40px 0",color:"#3d5a72",fontSize:13}}>No campaigns match your search.</div>
        ) : (
          <div>
            {Object.entries(groups).map(([partner, camps]) => (
            <div key={partner} style={{marginBottom:20}}>
              <div style={{fontSize:11,color:"#3d5a72",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",
                marginBottom:8,display:"flex",alignItems:"center",gap:8}}>
                <span style={{color:"#4d6e8a"}}>{partner}</span>
                <div style={{flex:1,height:1,background:"#0d1525"}}/>
                <span style={{fontWeight:400}}>{camps.length} campaign{camps.length!==1?"s":""}</span>
              </div>
              <div style={{background:"#0c1625",border:"1px solid #1e293b",borderRadius:10,overflow:"hidden"}}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead>
                    <tr style={{background:"#070d16"}}>
                      <th style={{padding:"9px 13px",textAlign:"left",fontSize:11,fontWeight:700,color:"#4d6e8a",textTransform:"uppercase",letterSpacing:"0.07em",borderBottom:"1px solid #1e293b"}}>Campaign</th>
                      <th style={{padding:"9px 13px",textAlign:"left",fontSize:11,fontWeight:700,color:"#4d6e8a",textTransform:"uppercase",letterSpacing:"0.07em",borderBottom:"1px solid #1e293b"}}>Platform</th>
                      <th style={{padding:"9px 13px",textAlign:"left",fontSize:11,fontWeight:700,color:"#4d6e8a",textTransform:"uppercase",letterSpacing:"0.07em",borderBottom:"1px solid #1e293b"}}>Goal</th>
                      <th style={{padding:"9px 13px",textAlign:"left",fontSize:11,fontWeight:700,color:"#4d6e8a",textTransform:"uppercase",letterSpacing:"0.07em",borderBottom:"1px solid #1e293b"}}>End Date</th>
                      <th style={{padding:"9px 13px",textAlign:"left",fontSize:11,fontWeight:700,color:"#4d6e8a",textTransform:"uppercase",letterSpacing:"0.07em",borderBottom:"1px solid #1e293b"}}>Archived</th>
                      <th style={{padding:"9px 13px",textAlign:"left",fontSize:11,fontWeight:700,color:"#4d6e8a",textTransform:"uppercase",letterSpacing:"0.07em",borderBottom:"1px solid #1e293b"}}>Metrics</th>
                      <th style={{padding:"9px 13px",borderBottom:"1px solid #1e293b"}}/>
                    </tr>
                  </thead>
                  <tbody>
                    {camps.map((c,i) => {
                      const pCol = PLT_COLORS[c.platform]||PLT_COLORS.default;
                      const isOpen = expanded.has(c.id);
                      const rowBg = i%2===0?"#0c1625":"#090f1c";
                      return (
                        <Fragment key={c.id}>
                          <tr style={{background:rowBg}}>
                            <td style={{padding:"9px 13px",borderBottom:"1px solid #060c18"}}>
                              <div style={{fontSize:12,fontWeight:600,color:"#edf4ff"}}>{c.campaignName.trim()}</div>
                              {c.note1&&<div style={{fontSize:10,color:"#00ffb3",marginTop:2}}>{c.note1.trim()}</div>}
                            </td>
                            <td style={{padding:"9px 13px",borderBottom:"1px solid #060c18"}}>
                              <span style={{background:pCol+"22",color:pCol,border:"1px solid "+pCol+"55",borderRadius:3,padding:"1px 6px",fontSize:10,fontWeight:700}}>{c.platform}</span>
                            </td>
                            <td style={{padding:"9px 13px",borderBottom:"1px solid #060c18",fontSize:11,color:"#4d6e8a"}}>{c.goal||"—"}</td>
                            <td style={{padding:"9px 13px",borderBottom:"1px solid #060c18",fontSize:11,color:"#7a9bbf"}}>{c.endDate||"—"}</td>
                            <td style={{padding:"9px 13px",borderBottom:"1px solid #060c18",fontSize:11,color:"#3d5a72"}}>{c.archivedDate||"—"}</td>
                            <td style={{padding:"9px 13px",borderBottom:"1px solid #060c18"}}>
                              <button onClick={()=>toggleExpand(c.id)} style={{background:"none",border:"none",cursor:"pointer",color:c.impressions?"#00c896":"#1e3048",fontSize:11,padding:0}}>
                                {isOpen?"▼ Hide":"▶ Show"}
                              </button>
                            </td>
                            <td style={{padding:"9px 13px",borderBottom:"1px solid #060c18"}}>
                              <button onClick={()=>onRestore(c)} style={{background:"#002e24",border:"1px solid #00c89640",borderRadius:5,color:"#00e5a0",fontSize:10,padding:"3px 9px",cursor:"pointer",fontWeight:600}}>Restore</button>
                            </td>
                          </tr>
                          {isOpen && (
                            <tr style={{background:"#06101a"}}>
                              <td colSpan={7} style={{padding:"10px 16px",borderBottom:"1px solid #060c18"}}>
                                <div style={{display:"flex",gap:12,flexWrap:"wrap",fontSize:11}}>
                                  {[
                                    {label:"Impressions",val:c.impressions},
                                    {label:"CTR",val:c.ctr?c.ctr+"%":null},
                                    {label:"CPM",val:c.cpm?"$"+c.cpm:null},
                                    {label:"Spend",val:c.spend?"$"+c.spend:null},
                                    {label:"Clicks",val:c.clicks},
                                    {label:"Reach",val:c.reach},
                                    {label:"Freq",val:c.frequency},
                                    {label:"VCR",val:c.completionRate?c.completionRate+"%":null},
                                  ].filter(x=>x.val).map(({label,val})=>(
                                    <div key={label} style={{background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:5,padding:"4px 10px",textAlign:"center"}}>
                                      <div style={{fontSize:9,color:"#3d5a72",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:1}}>{label}</div>
                                      <div style={{fontWeight:700,color:"#d8eaf8"}}>{val}</div>
                                    </div>
                                  ))}
                                  {!c.impressions&&!c.spend&&<span style={{color:"#3d5a72",fontStyle:"italic"}}>No metrics recorded</span>}
                                </div>
                                {c.history&&c.history.trim()&&(
                                  <div style={{marginTop:12,paddingTop:10,borderTop:"1px solid #1a2744"}}>
                                    <div style={{fontSize:10,color:"#3d5a72",textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:700,marginBottom:6}}>📋 Change History</div>
                                    <div style={{background:"#060d18",borderRadius:5,padding:"8px 10px",whiteSpace:"pre-wrap",fontSize:11,color:"#4d6e8a",lineHeight:1.6,maxHeight:180,overflowY:"auto"}}>
                                      {c.history.trim()}
                                    </div>
                                  </div>
                                )}
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            ))}
          </div>
        )}
      </>)}
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
              style={{ background: filter === t ? ((LOG_ICONS[t]?.color ?? "#00e5a0") + "22") : "#0e1a2e",
                border: `1px solid ${filter === t ? (LOG_ICONS[t]?.color ?? "#00e5a0") : "#1e293b"}`,
                borderRadius: 6, padding: "4px 11px", color: filter === t ? (LOG_ICONS[t]?.color ?? "#00e5a0") : "#4d6e8a",
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


function PlatformMultiSelect({ platforms, fPlatforms, setFPlatforms }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function handle(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);
  const toggle = p => setFPlatforms(prev => { const n = new Set(prev); n.has(p) ? n.delete(p) : n.add(p); return n; });
  const label = fPlatforms.size === 0 ? "All Platforms" : fPlatforms.size === 1 ? [...fPlatforms][0] : `${fPlatforms.size} Platforms`;
  const active = fPlatforms.size > 0;
  return (
    <div ref={ref} style={{position:"relative",userSelect:"none",display:"flex",alignItems:"center"}}>
      <button onClick={()=>setOpen(v=>!v)} style={{background:active?"#0e2818":"#0e1a2e",border:`1px solid ${active?"#00c896":"#1e293b"}`,borderRadius:7,padding:"7px 13px",color:active?"#00e5a0":"#7a9bbf",fontSize:13,fontWeight:active?600:400,cursor:"pointer",display:"flex",alignItems:"center",gap:7,minWidth:145,justifyContent:"space-between"}}>
        <span>{label}</span>
        <span style={{fontSize:9,opacity:0.5}}>{open?"▲":"▼"}</span>
      </button>
      {active && <span onClick={()=>{ setFPlatforms(new Set()); setOpen(false); }} style={{fontSize:11,color:"#4d6e8a",cursor:"pointer",padding:"0 2px"}}>Clear</span>}
      {open && (
        <div style={{position:"absolute",top:"calc(100% + 4px)",left:0,background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:8,zIndex:100,minWidth:160,boxShadow:"0 8px 32px rgba(0,0,0,.6)",overflow:"hidden"}}>
          <div style={{padding:"7px 10px",borderBottom:"1px solid #162236"}}>
            <span style={{fontSize:10,color:"#3d5a72",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em"}}>Filter Platforms</span>
          </div>
          {platforms.map(p => {
            const on = fPlatforms.has(p);
            const col = PLT_COLORS[p] || PLT_COLORS.default;
            return (
              <div key={p} onClick={()=>toggle(p)} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 12px",cursor:"pointer",background:on?col+"12":"transparent",transition:"background .1s"}}
                onMouseEnter={e=>{ if(!on) e.currentTarget.style.background="#162236"; }}
                onMouseLeave={e=>{ if(!on) e.currentTarget.style.background="transparent"; }}>
                <div style={{width:13,height:13,borderRadius:3,border:`2px solid ${on?col:"#334155"}`,background:on?col:"transparent",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .1s"}}>
                  {on && <span style={{color:"#000",fontSize:9,fontWeight:900,lineHeight:1}}>✓</span>}
                </div>
                <span style={{fontSize:12,color:on?col:"#a8c4e0",fontWeight:on?700:400}}>{p}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}



// ─── Platform KPI benchmarks ──────────────────────────────────────────────
const PLT_KPI = {
  FB:    { primary:"CTR", good:0.0025, ok:0.001,  label:"CTR",        tip:"Good >0.25% · OK >0.10%" },
  IG:    { primary:"CTR", good:0.0025, ok:0.001,  label:"CTR",        tip:"Good >0.25% · OK >0.10%" },
  TT:    { primary:"CTR", good:0.01,   ok:0.005,  label:"CTR",        tip:"Good >1% · OK >0.5%"     },
  FBV:   { primary:"VCR", good:0.70,   ok:0.50,   label:"Completion", tip:"Good >70% · OK >50%"     },
  DSP:   { primary:"CTR", good:0.0008, ok:0.0003, label:"CTR",        tip:"Good >0.08% · OK >0.03%" },
  TD:    { primary:"CTR", good:0.0008, ok:0.0003, label:"CTR",        tip:"Good >0.08% · OK >0.03%" },
  SP:    { primary:"CTR", good:0.0008, ok:0.0003, label:"CTR",        tip:"Good >0.08% · OK >0.03%" },
  CTV:   { primary:"VCR", good:0.95,   ok:0.85,   label:"Completion", tip:"Good >95% · OK >85%"     },
  OTT:   { primary:"VCR", good:0.95,   ok:0.85,   label:"Completion", tip:"Good >95% · OK >85%"     },
  SEM:   { primary:"CTR", good:0.05,   ok:0.02,   label:"CTR",        tip:"Good >5% · OK >2%"       },
  YT:    { primary:"VCR", good:0.35,   ok:0.20,   label:"View Rate",  tip:"Good >35% · OK >20%"     },
  EMAIL: { primary:"CTR", good:0.03,   ok:0.01,   label:"Click Rate", tip:"Good >3% · OK >1%"       },
};

// ─── Pacing date bar ──────────────────────────────────────────────────────
function PacingDateBar({ range, setRange }) {
  const presets = getPresets();
  const [cs, setCs] = useState(range.start||"");
  const [ce, setCe] = useState(range.end||"");
  const [showCustom, setShowCustom] = useState(false);
  const quickKeys = ["mtd","yesterday","last30"];
  const isCustom = range.preset==="custom";
  return (
    <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:7}}>
      {quickKeys.map(k=>{
        const on=range.preset===k;
        return <button key={k} onClick={()=>{setShowCustom(false);setRange({preset:k,...presets[k]});}}
          style={{background:on?"#002e24":"#0e1a2e",border:"1px solid "+(on?"#00c896":"#162236"),borderRadius:6,padding:"4px 12px",color:on?"#00e5a0":"#4d6e8a",fontSize:12,fontWeight:on?700:500,cursor:"pointer"}}>
          {presets[k].label}
        </button>;
      })}
      <div style={{width:1,height:18,background:"#162236"}}/>
      <button onClick={()=>setShowCustom(v=>!v)}
        style={{background:isCustom||showCustom?"#002e24":"#0e1a2e",border:"1px solid "+(isCustom||showCustom?"#00c896":"#162236"),borderRadius:6,padding:"4px 12px",color:isCustom||showCustom?"#00e5a0":"#4d6e8a",fontSize:12,fontWeight:isCustom||showCustom?700:500,cursor:"pointer"}}>
        {isCustom?range.label:"Custom…"}
      </button>
      {(showCustom||isCustom)&&(
        <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
          <DatePicker value={cs} onChange={v=>setCs(v)}/>
          <span style={{color:"#3d5a72",fontSize:11}}>to</span>
          <DatePicker value={ce} onChange={v=>setCe(v)}/>
          <button onClick={()=>{if(cs&&ce){setRange({preset:"custom",start:cs,end:ce,label:cs===ce?cs:cs+" → "+ce});setShowCustom(false);}}} disabled={!cs||!ce}
            style={{background:cs&&ce?"#00c896":"#162236",border:"none",borderRadius:6,padding:"4px 12px",color:cs&&ce?"#000":"#3d5a72",fontSize:12,fontWeight:700,cursor:cs&&ce?"pointer":"default"}}>Apply</button>
          {isCustom&&<button onClick={()=>{setShowCustom(false);setRange({preset:"mtd",...getPresets().mtd});}}
            style={{background:"none",border:"1px solid #334155",borderRadius:6,padding:"4px 10px",color:"#4d6e8a",fontSize:11,cursor:"pointer"}}>Clear</button>}
        </div>
      )}
    </div>
  );
}

// ─── Pacing Dashboard ─────────────────────────────────────────────────────
function PacingDashboard({ campaigns=[], dateRange={preset:"mtd"}, setDateRange=()=>{}, onEdit=()=>{} }) {
  const [showNoGoal,   setShowNoGoal]   = useState(false);
  const [search,       setSearch]       = useState("");
  const [fPartner,     setFPartner]     = useState("all");
  const [fPlatforms,   setFPlatforms]   = useState(new Set());
  const [sortKey,      setSortKey]      = useState("pacing"); // pacing | name | partner | platform
  const [viewMode,     setViewMode]     = useState("cards");  // cards | table

  // Flight progress helpers
  function flightPct(c) {
    if(!c.startDate||!c.endDate) return null;
    const s=new Date(c.startDate+"T00:00:00"), e=new Date(c.endDate+"T00:00:00"), now=new Date();
    const total=Math.max(1,(e-s)/86400000), elapsed=(now-s)/86400000;
    return Math.min(1,Math.max(0,elapsed/total));
  }
  function daysRemaining(c) {
    if(!c.endDate) return null;
    const e=new Date(c.endDate+"T00:00:00"), now=new Date();
    now.setHours(0,0,0,0);
    return Math.ceil((e-now)/86400000);
  }
  function daysRemainingColor(d) {
    if(d===null) return "#3d5a72";
    if(d<=7)  return "#ef4444";
    if(d<=14) return "#f59e0b";
    return "#4d6e8a";
  }

  const allActive = campaigns.filter(c=>c.status==="active");
  const partners  = ["all", ...new Set(allActive.map(c=>c.mediaPartner).filter(Boolean))].sort();
  const platforms = [...new Set(allActive.map(c=>c.platform).filter(Boolean))].sort();

  // Build rows for ALL active
  const allRows = allActive.map(c=>{
    const disp=resolveMetrics(c,dateRange.preset);
    const pacing=computeMonthlyPacing(disp.impressions,c.note1);
    const monthlyGoal=parseMonthlyGoal(c.note1);
    return {c,disp,pacing,monthlyGoal};
  });

  // Apply search + filters
  const q = search.trim().toLowerCase();
  const filtered = allRows.filter(({c})=>{
    if(q && !c.campaignName.toLowerCase().includes(q) && !c.mediaPartner.toLowerCase().includes(q) && !c.platform.toLowerCase().includes(q)) return false;
    if(fPartner!=="all" && c.mediaPartner!==fPartner) return false;
    if(fPlatforms.size>0 && !fPlatforms.has(c.platform)) return false;
    return true;
  });

  const withGoal  = filtered.filter(r=>r.monthlyGoal);
  const noGoalRows= filtered.filter(r=>!r.monthlyGoal);

  // Sort
  const orderMap={"Behind":0,"No data":1,"On Track":2,"Ahead":3};
  withGoal.sort((a,b)=>{
    if(sortKey==="name")     return a.c.campaignName.localeCompare(b.c.campaignName);
    if(sortKey==="partner")  return a.c.mediaPartner.localeCompare(b.c.mediaPartner);
    if(sortKey==="platform") return a.c.platform.localeCompare(b.c.platform);
    // default: pacing (worst first)
    const oa=orderMap[a.pacing?.label??"No data"],ob=orderMap[b.pacing?.label??"No data"];
    return oa!==ob?oa-ob:(a.pacing?.ratio??0)-(b.pacing?.ratio??0);
  });
  noGoalRows.sort((a,b)=>{
    if(sortKey==="name")     return a.c.campaignName.localeCompare(b.c.campaignName);
    if(sortKey==="partner")  return a.c.mediaPartner.localeCompare(b.c.mediaPartner);
    if(sortKey==="platform") return a.c.platform.localeCompare(b.c.platform);
    return 0;
  });
  const behind  = withGoal.filter(r=>r.pacing?.label==="Behind");
  const onTrack = withGoal.filter(r=>r.pacing?.label==="On Track");
  const ahead   = withGoal.filter(r=>r.pacing?.label==="Ahead");
  const noPace  = withGoal.filter(r=>!r.pacing);
  const anyFilter = q || fPartner!=="all" || fPlatforms.size>0;

  function KpiBox({c,disp}){
    const kpi=PLT_KPI[c.platform]; if(!kpi) return null;
    const isCTV=c.platform==="CTV"||c.platform==="OTT";
    const rawVcr=(parseFloat(c.completionRate)||0)/100, rawCtr=(parseFloat(disp.ctr)||0)/100;
    const val=kpi.primary==="VCR"?rawVcr:rawCtr; if(!val) return null;
    const color=val>=kpi.good?"#00d48a":val>=kpi.ok?"#f59e0b":"#ef4444";
    return <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:4}}>
      <span title={kpi.tip} style={{cursor:"help",fontSize:10,fontWeight:700,color,background:color+"18",border:"1px solid "+color+"40",borderRadius:4,padding:"1px 7px"}}>
        {kpi.label}: {kpi.primary==="VCR"?(rawVcr*100).toFixed(0)+"%":(rawCtr*100).toFixed(2)+"%"} · {val>=kpi.good?"Good":val>=kpi.ok?"OK":"Low"}
      </span>
      {isCTV&&(parseFloat(c.conversions)||0)>0&&<span style={{fontSize:10,fontWeight:700,color:"#34d399",background:"#34d39918",border:"1px solid #34d39940",borderRadius:4,padding:"1px 7px"}}>{parseInt(c.conversions).toLocaleString()} conv</span>}
    </div>;
  }

  function PacingCard({c,disp,pacing,monthlyGoal}){
    const now=new Date(),dim=new Date(now.getFullYear(),now.getMonth()+1,0).getDate(),dom=now.getDate();
    const exp=pacing?Math.round(monthlyGoal*(dom/dim)):null, del=parseInt(disp.impressions)||0;
    const rem=Math.max(0,monthlyGoal-del), npd=(dim-dom)>0&&del>0?Math.round(rem/(dim-dom)):null;
    const col=pacing?.color??"#4d6e8a", pCol=PLT_COLORS[c.platform]||PLT_COLORS.default;
    const isCTV=c.platform==="CTV"||c.platform==="OTT";
    const fp=flightPct(c), dr=daysRemaining(c), drc=daysRemainingColor(dr);
    // Build perf metric boxes
    const perfBoxes=[];
    if(disp.ctr)         perfBoxes.push({label:"CTR",    val:parseFloat(disp.ctr).toFixed(2)+"%",                     color:"#00ffb3"});
    if(disp.cpm)         perfBoxes.push({label:"CPM",    val:"$"+parseFloat(disp.cpm).toFixed(2),                     color:"#fb923c"});
    if(disp.spend)       perfBoxes.push({label:"Spend",  val:"$"+Math.round(parseFloat(disp.spend)).toLocaleString(), color:"#f472b6"});
    if(disp.clicks)      perfBoxes.push({label:"Clicks", val:parseInt(disp.clicks).toLocaleString(),                  color:"#38bdf8"});
    if(c.reach)          perfBoxes.push({label:"Reach",  val:parseInt(c.reach).toLocaleString(),                      color:"#e879f9"});
    if(c.frequency)      perfBoxes.push({label:"Freq",   val:parseFloat(c.frequency).toFixed(2)+"x",                  color:"#fb923c"});
    if(c.videoViews)     perfBoxes.push({label:"Views",  val:parseInt(c.videoViews).toLocaleString(),                 color:"#a78bfa"});
    if(c.completionRate) perfBoxes.push({label:isCTV?"Compl%":"VCR", val:parseFloat(c.completionRate).toFixed(1)+"%", color:"#818cf8"});
    if(c.conversions)    perfBoxes.push({label:"Conv",   val:parseInt(c.conversions).toLocaleString(),                color:"#34d399"});

    return <div style={{background:"#0c1625",border:"1px solid "+(pacing?col+"40":"#1e293b"),borderRadius:9,padding:"13px 16px",marginBottom:7}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:2}}>
        <span style={{fontSize:12,fontWeight:700,color:"#edf4ff"}}>{c.campaignName.trim()}</span>
        <span style={{background:pCol+"22",color:pCol,border:"1px solid "+pCol+"55",borderRadius:3,padding:"1px 5px",fontSize:10,fontWeight:700}}>{c.platform}</span>
        {pacing&&<span style={{fontSize:10,fontWeight:700,color:col,background:col+"18",border:"1px solid "+col+"40",borderRadius:4,padding:"1px 6px"}}>{pacing.label}</span>}
        {dr!==null&&<span style={{fontSize:10,fontWeight:700,color:drc,background:drc+"15",border:"1px solid "+drc+"40",borderRadius:4,padding:"1px 6px",marginLeft:2}}>
          {dr<=0?"Ended":dr===1?"Last day":dr+"d left"}
        </span>}
        <button onClick={()=>onEdit(c)} style={{marginLeft:"auto",background:"#162236",border:"1px solid #334155",borderRadius:5,color:"#7a9bbf",fontSize:11,padding:"3px 8px",cursor:"pointer",fontWeight:600,flexShrink:0}}>Edit</button>
      </div>
      <div style={{fontSize:11,color:"#4d6e8a",marginBottom:6}}>{c.mediaPartner}</div>

      {/* Monthly pacing bar */}
      {pacing&&<div style={{marginBottom:6}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:"#3d5a72",marginBottom:2,textTransform:"uppercase",letterSpacing:"0.05em"}}>
          <span>Monthly Pacing</span><span>Goal: {monthlyGoal.toLocaleString()}</span>
        </div>
        <div style={{position:"relative",background:"#07101c",borderRadius:3,height:6,marginBottom:2,overflow:"visible"}}>
          <div title={"Expected: "+(exp?.toLocaleString()??"")} style={{position:"absolute",top:-3,left:Math.min(97,pacing.expectedPct*100)+"%",width:2,height:12,background:"#334155",borderRadius:1,zIndex:2}}/>
          <div style={{background:col,height:"100%",width:Math.min(100,pacing.pct*100)+"%",borderRadius:3}}/>
        </div>
        <span style={{fontSize:10,color:col,fontWeight:700}}>{(pacing.pct*100).toFixed(1)}% of monthly goal</span>
      </div>}
      {!pacing&&monthlyGoal&&<div style={{fontSize:10,color:"#3d5a72",fontStyle:"italic",marginBottom:6}}>No impressions yet</div>}

      {/* Flight progress bar */}
      {fp!==null&&<div style={{marginBottom:8}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:"#3d5a72",marginBottom:2,textTransform:"uppercase",letterSpacing:"0.05em"}}>
          <span>Flight Progress</span>
          <span>{c.startDate} → {c.endDate}</span>
        </div>
        <div style={{background:"#07101c",borderRadius:3,height:4}}>
          <div style={{background:"#334155",height:"100%",width:Math.min(100,fp*100)+"%",borderRadius:3}}/>
        </div>
        <div style={{fontSize:10,color:"#3d5a72",marginTop:2}}>{(fp*100).toFixed(0)}% through flight</div>
      </div>}

      {/* All metric boxes */}
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:2}}>
        {monthlyGoal&&[
          {label:"Delivered",val:del>0?del.toLocaleString():"—",color:"#00e5a0"},
          {label:"Expected", val:exp?exp.toLocaleString():"—",  color:"#7a9bbf"},
          {label:"Remaining",val:del>0?rem.toLocaleString():"—",color:rem>0?"#f59e0b":"#00d48a"},
          {label:"Need/Day", val:npd?npd.toLocaleString():"—",  color:"#fb923c"},
        ].map(({label,val,color})=><div key={label} style={{background:"#07101c",border:"1px solid #1a2744",borderRadius:5,padding:"5px 9px",minWidth:60,textAlign:"center"}}>
          <div style={{fontSize:9,color:"#3d5a72",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:1}}>{label}</div>
          <div style={{fontSize:11,fontWeight:700,color}}>{val}</div>
        </div>)}
        {monthlyGoal&&perfBoxes.length>0&&<div style={{width:1,background:"#1a2744",alignSelf:"stretch",margin:"0 3px"}}/>}
        {perfBoxes.map(({label,val,color})=>(
          <div key={label} style={{background:"#07101c",border:"1px solid "+color+"28",borderRadius:5,padding:"5px 9px",minWidth:54,textAlign:"center"}}>
            <div style={{fontSize:9,color:"#3d5a72",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:1}}>{label}</div>
            <div style={{fontSize:11,fontWeight:700,color}}>{val}</div>
          </div>
        ))}
        {!monthlyGoal&&!perfBoxes.length&&<div style={{fontSize:11,color:"#3d5a72",fontStyle:"italic"}}>No goal or metrics yet</div>}
      </div>

      {/* Per-campaign breakdown — shown when sync has breakdown data */}
      {(()=>{
        // Find whichever snapshot source is active and has breakdown data
        const snapshotSources = [c.metaSnapshots, c.ttdSnapshots, c.dspSnapshots, c.googleSnapshots, c.snapSnapshots];
        let snap = null;
        for (const source of snapshotSources) {
          if (!source) continue;
          for (const key of ['mtd','last30','yesterday']) {
            if (source[key]?.breakdown?.length >= 2) { snap = source[key]; break; }
          }
          if (snap) break;
        }
        const breakdown = snap?.breakdown;
        if (!breakdown || breakdown.length < 2) return null;
        return (
          <div style={{marginTop:8,borderTop:"1px solid #1a2744",paddingTop:8}}>
            <div style={{fontSize:9,color:"#3d5a72",textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:700,marginBottom:5}}>
              Campaign Breakdown ({breakdown.length})
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:3}}>
              {breakdown.map(b=>(
                <div key={b.id} style={{display:"flex",alignItems:"center",gap:6,background:"#07101c",borderRadius:5,padding:"5px 8px"}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:10,color:"#a8c4e0",fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}
                      title={b.name}>{b.name}</div>
                  </div>
                  <div style={{display:"flex",gap:8,flexShrink:0}}>
                    <span style={{fontSize:10,color:"#d8eaf8",fontWeight:600,fontVariantNumeric:"tabular-nums"}}>{parseInt(b.impressions).toLocaleString()}<span style={{color:"#3d5a72",fontWeight:400}}> impr</span></span>
                    {b.spend>0&&<span style={{fontSize:10,color:"#f472b6",fontWeight:600}}>${Math.round(b.spend).toLocaleString()}</span>}
                    {b.ctr>0&&<span style={{fontSize:10,color:"#00ffb3",fontWeight:600}}>{b.ctr.toFixed(2)}<span style={{color:"#3d5a72",fontWeight:400}}>%</span></span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </div>;
  }

  function TableRow({c,disp,pacing,monthlyGoal}){
    const now=new Date(),dim=new Date(now.getFullYear(),now.getMonth()+1,0).getDate(),dom=now.getDate();
    const exp=pacing?Math.round(monthlyGoal*(dom/dim)):null, del=parseInt(disp.impressions)||0;
    const rem=Math.max(0,monthlyGoal-del), npd=(dim-dom)>0&&del>0?Math.round(rem/(dim-dom)):null;
    const col=pacing?.color??"#3d5a72", pCol=PLT_COLORS[c.platform]||PLT_COLORS.default;
    const isCTV=c.platform==="CTV"||c.platform==="OTT";
    const fp=flightPct(c), dr=daysRemaining(c), drc=daysRemainingColor(dr);
    const kpi=PLT_KPI[c.platform];
    const rawKpi=kpi?.primary==="VCR"?(parseFloat(c.completionRate)||0)/100:(parseFloat(disp.ctr)||0)/100;
    const kpiColor=kpi&&rawKpi?rawKpi>=kpi.good?"#00d48a":rawKpi>=kpi.ok?"#f59e0b":"#ef4444":null;

    return <div style={{display:"grid",gridTemplateColumns:"minmax(160px,2fr) 70px 80px 100px 110px 110px 80px 60px",gap:8,padding:"8px 12px",borderBottom:"1px solid #0d1525",alignItems:"center",background:"#0c1625",borderLeft:"3px solid "+col}}>
      {/* Campaign + partner */}
      <div style={{minWidth:0}}>
        <div style={{fontSize:11,fontWeight:700,color:"#edf4ff",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.campaignName.trim()}</div>
        <div style={{fontSize:10,color:"#4d6e8a",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.mediaPartner}</div>
      </div>
      {/* Platform */}
      <div><span style={{background:pCol+"22",color:pCol,border:"1px solid "+pCol+"55",borderRadius:3,padding:"1px 5px",fontSize:10,fontWeight:700}}>{c.platform}</span></div>
      {/* Pacing status */}
      <div>
        {pacing?<span style={{fontSize:10,fontWeight:700,color:col}}>{pacing.label}</span>
        :monthlyGoal?<span style={{fontSize:10,color:"#3d5a72"}}>No impr</span>
        :<span style={{fontSize:10,color:"#334155"}}>No goal</span>}
      </div>
      {/* Monthly pacing bar */}
      <div>
        {pacing?<>
          <div style={{position:"relative",background:"#07101c",borderRadius:2,height:5,overflow:"visible",marginBottom:2}}>
            <div title={"Expected: "+(exp?.toLocaleString()??"")} style={{position:"absolute",top:-2,left:Math.min(97,pacing.expectedPct*100)+"%",width:2,height:9,background:"#334155",borderRadius:1,zIndex:2}}/>
            <div style={{background:col,height:"100%",width:Math.min(100,pacing.pct*100)+"%",borderRadius:2}}/>
          </div>
          <div style={{fontSize:9,color:col,fontWeight:700}}>{(pacing.pct*100).toFixed(1)}%</div>
        </>:<div style={{fontSize:10,color:"#3d5a72"}}>—</div>}
      </div>
      {/* Flight progress bar */}
      <div>
        {fp!==null?<>
          <div style={{background:"#07101c",borderRadius:2,height:5,marginBottom:2}}>
            <div style={{background:"#334155",height:"100%",width:Math.min(100,fp*100)+"%",borderRadius:2}}/>
          </div>
          <div style={{fontSize:9,color:"#3d5a72"}}>{(fp*100).toFixed(0)}% of flight</div>
        </>:<div style={{fontSize:10,color:"#3d5a72"}}>—</div>}
      </div>
      {/* Key metric (CTR or VCR) */}
      <div>
        {kpi&&rawKpi?<span style={{fontSize:10,fontWeight:700,color:kpiColor}}>{kpi.label}: {kpi.primary==="VCR"?(rawKpi*100).toFixed(0)+"%":(rawKpi*100).toFixed(2)+"%"}</span>
        :disp.cpm?<span style={{fontSize:10,color:"#fb923c"}}>${parseFloat(disp.cpm).toFixed(2)} CPM</span>
        :<span style={{fontSize:10,color:"#3d5a72"}}>—</span>}
      </div>
      {/* Days remaining */}
      <div>
        {dr!==null?<span style={{fontSize:10,fontWeight:700,color:drc}}>{dr<=0?"Done":dr+"d"}</span>
        :<span style={{fontSize:10,color:"#3d5a72"}}>—</span>}
      </div>
      {/* Edit */}
      <div><button onClick={()=>onEdit(c)} style={{background:"#162236",border:"1px solid #334155",borderRadius:4,color:"#7a9bbf",fontSize:10,padding:"3px 7px",cursor:"pointer",fontWeight:600}}>Edit</button></div>
    </div>;
  }

  function TableHeader(){
    return <div style={{display:"grid",gridTemplateColumns:"minmax(160px,2fr) 70px 80px 100px 110px 110px 80px 60px",gap:8,padding:"6px 12px",borderBottom:"1px solid #1a2744",marginBottom:2}}>
      {["Campaign","Platform","Status","Mo. Pacing","Flight","KPI","Days Left",""].map((h,i)=>(
        <div key={i} style={{fontSize:9,color:"#3d5a72",textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:700}}>{h}</div>
      ))}
    </div>;
  }

  function Section({label,color,items,defaultOpen=true}){
    const [open,setOpen]=useState(defaultOpen); if(!items.length) return null;
    return <div style={{marginBottom:viewMode==="table"?2:18}}>
      <div onClick={()=>setOpen(v=>!v)} style={{display:"flex",alignItems:"center",gap:8,marginBottom:open?6:0,cursor:"pointer",userSelect:"none",padding:"3px 0"}}>
        <span style={{fontSize:11,color,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em"}}>{label} ({items.length})</span>
        <span style={{color:"#3d5a72",fontSize:10,display:"inline-block",transform:open?"rotate(90deg)":"rotate(0deg)",transition:"transform .2s"}}>▶</span>
      </div>
      {open&&viewMode==="table"&&<TableHeader/>}
      {open&&items.map(r=>viewMode==="table"
        ?<TableRow key={r.c.id} {...r}/>
        :<PacingCard key={r.c.id} {...r}/>
      )}
    </div>;
  }

  return <div style={{color:"#d8eaf8"}}>
    {/* Header */}
    <div style={{marginBottom:14}}>
      <div style={{fontSize:15,fontWeight:800,color:"#edf4ff",marginBottom:2}}>📈 Pacing Dashboard</div>
      <div style={{fontSize:11,color:"#4d6e8a"}}>{allActive.length} active · {withGoal.length} with goals{anyFilter?" · filtered":""}</div>
    </div>

    {/* Date bar */}
    <div style={{background:"#0c1625",border:"1px solid #1e293b",borderRadius:9,padding:"10px 14px",marginBottom:10}}>
      <PacingDateBar range={dateRange} setRange={setDateRange}/>
    </div>

    {/* Search + filters + sort */}
    <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:12}}>
      <input
        value={search} onChange={e=>setSearch(e.target.value)}
        placeholder="Search campaigns, partners…"
        style={{background:"#0e1a2e",border:"1px solid "+(search?"#00c896":"#1e293b"),borderRadius:7,padding:"7px 12px",color:"#d8eaf8",fontSize:12,width:220,outline:"none"}}
      />
      <select value={fPartner} onChange={e=>setFPartner(e.target.value)}
        style={{background:"#0e1a2e",border:"1px solid "+(fPartner!=="all"?"#00c896":"#1e293b"),borderRadius:7,padding:"7px 10px",color:fPartner!=="all"?"#00e5a0":"#7a9bbf",fontSize:12,cursor:"pointer"}}>
        {partners.map(p=><option key={p} value={p}>{p==="all"?"All Partners":p}</option>)}
      </select>
      <PlatformMultiSelect platforms={platforms} fPlatforms={fPlatforms} setFPlatforms={setFPlatforms}/>
      <div style={{display:"flex",gap:5,marginLeft:"auto",alignItems:"center"}}>
        <span style={{fontSize:10,color:"#3d5a72",textTransform:"uppercase",letterSpacing:"0.06em"}}>Sort:</span>
        {[["pacing","Pacing"],["name","Name"],["partner","Partner"],["platform","Platform"]].map(([k,l])=>(
          <button key={k} onClick={()=>setSortKey(k)}
            style={{background:sortKey===k?"#002e24":"#0e1a2e",border:"1px solid "+(sortKey===k?"#00c896":"#1e293b"),borderRadius:6,padding:"4px 10px",color:sortKey===k?"#00e5a0":"#4d6e8a",fontSize:11,fontWeight:sortKey===k?700:400,cursor:"pointer"}}>
            {l}
          </button>
        ))}
        <div style={{width:1,height:18,background:"#162236",margin:"0 2px"}}/>
        {[["cards","⊞"],["table","☰"]].map(([m,icon])=>(
          <button key={m} onClick={()=>setViewMode(m)} title={m==="cards"?"Card view":"Table view"}
            style={{background:viewMode===m?"#002e24":"#0e1a2e",border:"1px solid "+(viewMode===m?"#00c896":"#1e293b"),borderRadius:6,padding:"4px 9px",color:viewMode===m?"#00e5a0":"#4d6e8a",fontSize:14,cursor:"pointer",lineHeight:1}}>
            {icon}
          </button>
        ))}
      </div>
    </div>
    {anyFilter&&<div style={{display:"flex",gap:6,alignItems:"center",marginBottom:10,flexWrap:"wrap"}}>
      <span style={{fontSize:11,color:"#4d6e8a"}}>Showing {filtered.length} of {allActive.length}</span>
      <button onClick={()=>{setSearch("");setFPartner("all");setFPlatforms(new Set());}} style={{background:"none",border:"1px solid #334155",borderRadius:5,padding:"2px 8px",color:"#7a9bbf",fontSize:11,cursor:"pointer"}}>Clear filters</button>
    </div>}

    {/* Summary pills */}
    <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:16,alignItems:"center"}}>
      {[{label:"Behind",val:behind.length,color:"#fde047"},{label:"On Track",val:onTrack.length,color:"#00d48a"},{label:"Ahead",val:ahead.length,color:"#fb923c"},{label:"No Impr",val:noPace.length,color:"#4d6e8a"},{label:"No Goal",val:noGoalRows.length,color:"#334155"}].map(s=>(
        <div key={s.label} style={{background:"#0e1a2e",border:"1px solid "+s.color+"30",borderRadius:7,padding:"8px 13px",minWidth:68,textAlign:"center"}}>
          <div style={{fontSize:20,fontWeight:800,color:s.color,lineHeight:1}}>{s.val}</div>
          <div style={{fontSize:10,color:"#4d6e8a",marginTop:2,textTransform:"uppercase",letterSpacing:"0.05em"}}>{s.label}</div>
        </div>
      ))}
      <div style={{marginLeft:"auto",fontSize:10,color:"#3d5a72",display:"flex",gap:10}}>
        <span><span style={{color:"#00d48a",fontWeight:700}}>●</span> Good</span>
        <span><span style={{color:"#f59e0b",fontWeight:700}}>●</span> OK</span>
        <span><span style={{color:"#ef4444",fontWeight:700}}>●</span> Low</span>
      </div>
    </div>
    <Section label="Behind"         color="#fde047" items={behind}/>
    <Section label="On Track"       color="#00d48a" items={onTrack}/>
    <Section label="Ahead"          color="#fb923c" items={ahead}/>
    <Section label="No Impressions" color="#4d6e8a" items={noPace} defaultOpen={false}/>
    {noGoalRows.length>0&&<div style={{marginTop:4}}>
      <div onClick={()=>setShowNoGoal(v=>!v)} style={{display:"flex",alignItems:"center",gap:8,marginBottom:showNoGoal?6:0,cursor:"pointer",userSelect:"none",padding:"3px 0"}}>
        <span style={{fontSize:11,color:"#334155",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em"}}>No Goal Set ({noGoalRows.length})</span>
        <span style={{color:"#3d5a72",fontSize:10,display:"inline-block",transform:showNoGoal?"rotate(90deg)":"rotate(0deg)",transition:"transform .2s"}}>▶</span>
      </div>
      {showNoGoal&&viewMode==="table"&&<TableHeader/>}
      {showNoGoal&&noGoalRows.map(r=>viewMode==="table"
        ?<TableRow key={r.c.id} {...r}/>
        :<PacingCard key={r.c.id} {...r}/>
      )}
    </div>}
  </div>;
}

// ─── Revenue Dashboard ────────────────────────────────────────────────────
// Helper: given a campaign with contractValue + startDate + endDate,
// spread revenue evenly across each calendar month it is active.
function spreadRevenue(c) {
  const contract = parseFloat(c.contractValue);
  if (!contract || !c.startDate || !c.endDate) return {};
  const start = new Date(c.startDate + "T00:00:00");
  const end   = new Date(c.endDate   + "T00:00:00");
  if (isNaN(start)||isNaN(end)||end<start) return {};

  // Count total days in flight
  const totalDays = Math.max(1, Math.round((end - start) / 86400000) + 1);

  // Build list of months spanned
  const months = {};
  let cur = new Date(start.getFullYear(), start.getMonth(), 1);
  const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);
  while (cur <= endMonth) {
    const mo = cur.toISOString().slice(0,7);
    // Days active in this month
    const mStart = new Date(Math.max(start, new Date(cur.getFullYear(), cur.getMonth(), 1)));
    const mEnd   = new Date(Math.min(end,   new Date(cur.getFullYear(), cur.getMonth()+1, 0)));
    const days   = Math.max(0, Math.round((mEnd - mStart) / 86400000) + 1);
    months[mo]   = (months[mo] || 0) + (contract * days / totalDays);
    cur = new Date(cur.getFullYear(), cur.getMonth()+1, 1);
  }
  return months;
}

function RevenueDashboard({ campaigns=[] }) {
  const [filterPartner, setFilterPartner] = useState("all");
  const now = new Date();

  // Use synced MTD spend if available, otherwise fall back to manually entered spend
  function resolveSpend(c) {
    const mtd = c.metaSnapshots?.mtd?.spend ?? c.ttdSnapshots?.mtd?.spend ?? c.dspSnapshots?.mtd?.spend ?? c.googleSnapshots?.mtd?.spend ?? c.snapSnapshots?.mtd?.spend;
    if (mtd != null) return mtd;
    return parseFloat(c.spend) || 0;
  }

  const withContract = campaigns.filter(c => parseFloat(c.contractValue) > 0);
  const partners = ["all", ...new Set(withContract.map(c=>c.mediaPartner))].sort();
  const filtered  = filterPartner==="all" ? withContract : withContract.filter(c=>c.mediaPartner===filterPartner);

  // Build 12-month window: 6 past + current + 5 future
  const months = [];
  for (let i=-6; i<=5; i++) {
    const d = new Date(now.getFullYear(), now.getMonth()+i, 1);
    months.push(d.toISOString().slice(0,7));
  }
  const thisMonth = now.toISOString().slice(0,7);

  // Aggregate revenue + spend per month
  const monthRevenue = {};
  months.forEach(mo => { monthRevenue[mo] = { revenue:0, spend:0 }; });

  filtered.forEach(c => {
    const spread = spreadRevenue(c);
    Object.entries(spread).forEach(([mo, rev]) => {
      if (monthRevenue[mo]) monthRevenue[mo].revenue += rev;
    });
    // Spread spend evenly too (same logic) — prefer synced MTD, fall back to manual
    const spend = resolveSpend(c);
    if (spend > 0 && c.startDate && c.endDate) {
      const spendSpread = spreadRevenue({...c, contractValue: spend});
      Object.entries(spendSpread).forEach(([mo, s]) => {
        if (monthRevenue[mo]) monthRevenue[mo].spend += s;
      });
    }
  });

  const maxBar = Math.max(...months.map(mo=>monthRevenue[mo].revenue), 1);
  const $f = v => v>0?"$"+Math.round(v).toLocaleString():"—";
  const profitColor = p => p>0?"#00d48a":p<0?"#ef4444":"#4d6e8a";
  const marginColor = m => m>=30?"#00d48a":m>=15?"#f59e0b":"#ef4444";

  // Totals for this month
  const tmRev   = monthRevenue[thisMonth]?.revenue || 0;
  const tmSpend = monthRevenue[thisMonth]?.spend   || 0;
  const tmProfit= tmRev - tmSpend;
  const tmMargin= tmRev>0?(tmProfit/tmRev)*100:0;

  // All-time totals across filtered
  const totRev   = filtered.reduce((s,c)=>s+(parseFloat(c.contractValue)||0),0);
  const totSpend = filtered.reduce((s,c)=>s+resolveSpend(c),0);
  const totProfit= totRev - totSpend;

  // Per-campaign rows sorted by contract desc
  const rows = filtered.map(c=>({
    c,
    contract: parseFloat(c.contractValue)||0,
    spend:    resolveSpend(c),
    profit:   (parseFloat(c.contractValue)||0)-resolveSpend(c),
    margin:   (parseFloat(c.contractValue)||0)>0?((parseFloat(c.contractValue)||0)-resolveSpend(c))/(parseFloat(c.contractValue)||0)*100:0,
    pCol:     PLT_COLORS[c.platform]||PLT_COLORS.default,
    moRevenue: spreadRevenue(c)[thisMonth]||0,
  })).sort((a,b)=>b.contract-a.contract);

  return (
    <div style={{color:"#d8eaf8"}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:18}}>
        <div>
          <div style={{fontSize:15,fontWeight:800,color:"#edf4ff",marginBottom:2}}>💰 Revenue Dashboard</div>
          <div style={{fontSize:11,color:"#4d6e8a"}}>{withContract.length} campaigns with contract values · revenue spread by flight dates</div>
        </div>
        <select value={filterPartner} onChange={e=>setFilterPartner(e.target.value)}
          style={{background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:7,padding:"6px 12px",color:"#d8eaf8",fontSize:12,cursor:"pointer"}}>
          {partners.map(p=><option key={p} value={p}>{p==="all"?"All Partners":p}</option>)}
        </select>
      </div>

      {/* This month highlights */}
      <div style={{background:"#0c1625",border:"1px solid #1a2744",borderRadius:10,padding:"16px 20px",marginBottom:18}}>
        <div style={{fontSize:10,color:"#3d5a72",textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:700,marginBottom:12}}>
          {new Date(thisMonth+"-01").toLocaleDateString("en-US",{month:"long",year:"numeric"})} (This Month)
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10}}>
          {[
            {label:"Revenue",  val:$f(tmRev),    color:"#7a9bbf",   sub:"client billed"},
            {label:"Spend",    val:$f(tmSpend),  color:"#f59e0b",   sub:"to platform"},
            {label:"Profit",   val:tmRev>0?(tmProfit>=0?"+":"")+$f(tmProfit):"—", color:profitColor(tmProfit), sub:"rev − spend"},
            {label:"Margin",   val:tmRev>0?tmMargin.toFixed(1)+"%":"—", color:marginColor(tmMargin), sub:"this month"},
          ].map(s=>(
            <div key={s.label}>
              <div style={{fontSize:10,color:"#3d5a72",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>{s.label}</div>
              <div style={{fontSize:24,fontWeight:800,color:s.color,lineHeight:1,marginBottom:3}}>{s.val}</div>
              <div style={{fontSize:10,color:"#3d5a72"}}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly bar chart — 12 months */}
      <div style={{background:"#0c1625",border:"1px solid #1a2744",borderRadius:10,padding:"18px 20px",marginBottom:18}}>
        <div style={{fontSize:11,fontWeight:700,color:"#7a9bbf",marginBottom:14,textTransform:"uppercase",letterSpacing:"0.07em"}}>Monthly Revenue (pro-rated by flight dates)</div>
        <div style={{display:"flex",gap:5,alignItems:"flex-end",height:130,overflowX:"auto"}}>
          {months.map(mo=>{
            const {revenue,spend} = monthRevenue[mo];
            const revH  = revenue>0?Math.max(5,(revenue/maxBar)*118):0;
            const spendH= spend>0?Math.max(3,(spend/maxBar)*118):0;
            const profit= revenue-spend;
            const isCurrent = mo===thisMonth;
            const label = new Date(mo+"-01").toLocaleDateString("en-US",{month:"short"});
            const yr = mo.slice(2,4);
            return (
              <div key={mo} style={{flex:"1 0 44px",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                <div style={{width:"100%",display:"flex",gap:2,alignItems:"flex-end",justifyContent:"center",height:120}}>
                  {revenue>0?(
                    <>
                      <div title={"Revenue: "+$f(revenue)} style={{flex:1,background:isCurrent?"#3b82f6":"#3b82f680",borderRadius:"3px 3px 0 0",height:revH,cursor:"default",maxWidth:18,border:isCurrent?"1px solid #60a5fa40":"none"}}/>
                      {spend>0&&<div title={"Spend: "+$f(spend)} style={{flex:1,background:isCurrent?"#f59e0b":"#f59e0b80",borderRadius:"3px 3px 0 0",height:spendH,cursor:"default",maxWidth:18}}/>}
                    </>
                  ):<div style={{flex:1,background:"#162236",borderRadius:"3px 3px 0 0",height:4,maxWidth:38}}/>}
                </div>
                <div style={{fontSize:9,color:isCurrent?"#00e5a0":"#3d5a72",textAlign:"center",fontWeight:isCurrent?700:400}}>{label}</div>
                <div style={{fontSize:8,color:"#3d5a72"}}>{yr}</div>
                {revenue>0&&<div style={{fontSize:8,fontWeight:700,color:profitColor(profit),textAlign:"center",whiteSpace:"nowrap"}}>{profit>=0?"+":""}{$f(profit)}</div>}
              </div>
            );
          })}
        </div>
        <div style={{display:"flex",gap:14,marginTop:10,fontSize:10,color:"#4d6e8a"}}>
          <span><span style={{display:"inline-block",width:9,height:9,background:"#3b82f6",borderRadius:2,marginRight:4,verticalAlign:"middle"}}/>Revenue</span>
          <span><span style={{display:"inline-block",width:9,height:9,background:"#f59e0b",borderRadius:2,marginRight:4,verticalAlign:"middle"}}/>Spend</span>
          <span style={{marginLeft:"auto",color:"#3d5a72"}}>Profit shown below each bar · current month highlighted</span>
        </div>
      </div>

      {/* All-time totals */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:18}}>
        {[
          {label:"Total Contract", val:$f(totRev),    color:"#7a9bbf", sub:"all flights"},
          {label:"Total Spend",    val:$f(totSpend),  color:"#f59e0b", sub:"all platforms"},
          {label:"Total Profit",   val:totRev>0?(totProfit>=0?"+":"")+$f(totProfit):"—", color:profitColor(totProfit), sub:"all time"},
        ].map(s=>(
          <div key={s.label} style={{background:"#0c1625",border:"1px solid #1a2744",borderRadius:9,padding:"12px 16px"}}>
            <div style={{fontSize:9,color:"#3d5a72",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>{s.label}</div>
            <div style={{fontSize:20,fontWeight:800,color:s.color,lineHeight:1,marginBottom:3}}>{s.val}</div>
            <div style={{fontSize:10,color:"#3d5a72"}}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Per-campaign table */}
      {rows.length===0?(
        <div style={{textAlign:"center",padding:"40px 0",color:"#3d5a72"}}>
          <div style={{fontSize:28,marginBottom:8}}>💰</div>
          <div style={{fontSize:13}}>No campaigns with contract values yet.</div>
          <div style={{fontSize:11,marginTop:5}}>Edit a campaign and fill in the Contract Value field to start tracking.</div>
        </div>
      ):(
        <div>
          <div style={{fontSize:11,color:"#3d5a72",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:8}}>Campaign Breakdown</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 90px 90px 90px 70px 80px",gap:6,padding:"5px 10px",fontSize:9,color:"#3d5a72",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",borderBottom:"1px solid #1a2744",marginBottom:3}}>
            <span>Campaign</span><span style={{textAlign:"right"}}>Contract</span><span style={{textAlign:"right"}}>Spend</span><span style={{textAlign:"right"}}>Profit</span><span style={{textAlign:"right"}}>Margin</span><span style={{textAlign:"right"}}>This Mo.</span>
          </div>
          {rows.map(({c,contract,spend,profit,margin,pCol,moRevenue})=>(
            <div key={c.id} style={{display:"grid",gridTemplateColumns:"1fr 90px 90px 90px 70px 80px",gap:6,padding:"8px 10px",borderBottom:"1px solid #0e1828",alignItems:"center",background:"#0c1625",borderRadius:6,marginBottom:2}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:1}}>
                  <span style={{background:pCol+"22",color:pCol,border:"1px solid "+pCol+"55",borderRadius:3,padding:"0 4px",fontSize:9,fontWeight:700}}>{c.platform}</span>
                  <span style={{fontSize:11,fontWeight:600,color:"#d8eaf8"}}>{c.campaignName.trim()}</span>
                </div>
                <div style={{fontSize:10,color:"#3d5a72"}}>{c.mediaPartner}{c.startDate&&c.endDate?` · ${c.startDate} → ${c.endDate}`:""}</div>
              </div>
              <div style={{textAlign:"right",fontSize:11,fontWeight:700,color:"#7a9bbf"}}>{$f(contract)}</div>
              <div style={{textAlign:"right",fontSize:11,fontWeight:700,color:"#f59e0b"}}>{spend>0?$f(spend):"—"}</div>
              <div style={{textAlign:"right",fontSize:11,fontWeight:700,color:profitColor(profit)}}>{spend>0?(profit>=0?"+":"")+$f(profit):"—"}</div>
              <div style={{textAlign:"right",fontSize:11,fontWeight:700,color:marginColor(margin)}}>{spend>0?margin.toFixed(1)+"%":"—"}</div>
              <div style={{textAlign:"right",fontSize:11,fontWeight:700,color:"#7a9bbf"}}>{moRevenue>0?$f(moRevenue):"—"}</div>
            </div>
          ))}
          </div>
        )}
      </div>
  );
}

const CONFIG_KEY = "campaign-tracker-platform-config";

// ─── Platform Config Tab ───────────────────────────────────────────────────
function PlatformConfig({ campaigns=[], metaSyncStatus=null, metaSyncInfo=null, ttdSyncStatus=null, ttdSyncInfo=null, dspSyncStatus=null, dspSyncInfo=null, googleSyncStatus=null, googleSyncInfo=null, snapSyncStatus=null, snapSyncInfo=null }) {
  const [cfg, setCfg] = useState(()=>{
    try { const s=localStorage.getItem(CONFIG_KEY); return s?JSON.parse(s):{}; } catch { return {}; }
  });
  const [activeSection, setActiveSection] = useState("meta");
  const [copied, setCopied]   = useState("");
  const [search, setSearch]   = useState("");

  // Custom platforms state
  const [customData, setCustomData] = useState(()=>loadCustomPlatforms());
  const [newPlatName, setNewPlatName] = useState("");
  const [newPlatColor, setNewPlatColor] = useState("#e60069"); // Pinterest red default
  const [platSaved, setPlatSaved] = useState(false);

  function saveCustomPlatform() {
    const name = newPlatName.trim().toUpperCase().replace(/[^A-Z0-9]/g,"");
    if (!name || ALL_PLATFORMS_DEFAULT.includes(name)) return;
    const updated = {
      platforms: [...customData.platforms.filter(p=>p!==name), name],
      colors: {...customData.colors, [name]: newPlatColor},
    };
    saveCustomPlatforms(updated);
    setCustomData(updated);
    // Also update runtime constants so the new platform shows immediately
    if (!ALL_PLATFORMS.includes(name)) ALL_PLATFORMS.push(name);
    PLT_COLORS[name] = newPlatColor;
    setNewPlatName("");
    setNewPlatColor("#e60069");
    setPlatSaved(true);
    setTimeout(()=>setPlatSaved(false), 2000);
  }

  function removeCustomPlatform(name) {
    const updated = {
      platforms: customData.platforms.filter(p=>p!==name),
      colors: Object.fromEntries(Object.entries(customData.colors).filter(([k])=>k!==name)),
    };
    saveCustomPlatforms(updated);
    setCustomData(updated);
    const idx = ALL_PLATFORMS.indexOf(name);
    if (idx > -1) ALL_PLATFORMS.splice(idx, 1);
    delete PLT_COLORS[name];
  }

  function updateCustomColor(name, color) {
    const updated = {...customData, colors:{...customData.colors, [name]:color}};
    saveCustomPlatforms(updated);
    setCustomData(updated);
    PLT_COLORS[name] = color;
  }

  useEffect(()=>{
    try { localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg)); } catch(e){}
  },[cfg]);

  // Deep get/set on dot-path
  const setVal = (path, val) => setCfg(prev=>{
    const next = JSON.parse(JSON.stringify(prev));
    const parts = path.split(".");
    let obj = next;
    for(let i=0;i<parts.length-1;i++){ if(!obj[parts[i]]) obj[parts[i]]={};  obj=obj[parts[i]]; }
    obj[parts[parts.length-1]] = val;
    return next;
  });
  const getVal = (path, fallback="") => {
    const parts = path.split(".");
    let obj = cfg;
    for(const p of parts){ if(obj==null) return fallback; obj=obj[p]; }
    return obj??fallback;
  };

  // Campaigns filtered by platform + search
  const q = search.trim().toLowerCase();
  const metaActive = campaigns.filter(c=>["FB","FBV","IG"].includes(c.platform) && c.status==="active");
  const ttdActive  = campaigns.filter(c=>c.platform==="TD"  && c.status==="active");
  const dspActive    = campaigns.filter(c=>c.platform==="DSP" && c.status==="active");
  const googleActive = campaigns.filter(c=>["SEM","YT"].includes(c.platform) && c.status==="active");
  const snapActive   = campaigns.filter(c=>c.platform==="SP" && c.status==="active");
  const metaFiltered = q ? metaActive.filter(c=>c.campaignName.toLowerCase().includes(q)||c.mediaPartner.toLowerCase().includes(q)) : metaActive;
  const ttdFiltered  = q ? ttdActive.filter(c=>c.campaignName.toLowerCase().includes(q)||c.mediaPartner.toLowerCase().includes(q))  : ttdActive;
  const dspFiltered    = q ? dspActive.filter(c=>c.campaignName.toLowerCase().includes(q)||c.mediaPartner.toLowerCase().includes(q))    : dspActive;
  const googleFiltered = q ? googleActive.filter(c=>c.campaignName.toLowerCase().includes(q)||c.mediaPartner.toLowerCase().includes(q)) : googleActive;
  const snapFiltered   = q ? snapActive.filter(c=>c.campaignName.toLowerCase().includes(q)||c.mediaPartner.toLowerCase().includes(q))   : snapActive;

  // Group by partner
  function groupByPartner(list) {
    const map = {};
    list.forEach(c=>{ if(!map[c.mediaPartner]) map[c.mediaPartner]=[]; map[c.mediaPartner].push(c); });
    return Object.entries(map).sort(([a],[b])=>a.localeCompare(b));
  }

  // Download JSON
  function downloadJSON(filename, data){
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download=filename; a.click();
    URL.revokeObjectURL(url);
  }
  function copyText(text, key){
    navigator.clipboard.writeText(text).catch(()=>{});
    setCopied(key); setTimeout(()=>setCopied(""),1800);
  }

  // "Apply to all in partner" — propagate account/advertiser ID down to siblings
  function applyToPartner(platform, partnerId, field, val) {
    const siblings = (platform==="ttd" ? ttdActive : metaActive).filter(c=>c.mediaPartner===partnerId);
    setCfg(prev=>{
      const next = JSON.parse(JSON.stringify(prev));
      siblings.forEach(c=>{
        const parts = `${platform}.campaigns.${c.id}.${field}`.split(".");
        let obj = next;
        for(let i=0;i<parts.length-1;i++){ if(!obj[parts[i]]) obj[parts[i]]={};  obj=obj[parts[i]]; }
        obj[parts[parts.length-1]] = val;
      });
      return next;
    });
  }

  // Build JSON outputs
  function buildMetaConfig(){
    return {
      _comment: "Each tracker row lists its own meta_campaign_ids array. spend/impressions are summed; CTR and CPM are recalculated from totals.",
      campaigns: metaActive.map(c=>({
        tracker_id: c.id,
        tracker_name: `${c.campaignName.trim()} (${c.platform})`,
        meta_account_id: getVal(`meta.campaigns.${c.id}.account_id`) || "act_REPLACE_ME",
        meta_campaign_ids: (getVal(`meta.campaigns.${c.id}.campaign_ids`)||"").split("\n").map(s=>s.trim()).filter(Boolean).length>0
          ? (getVal(`meta.campaigns.${c.id}.campaign_ids`)||"").split("\n").map(s=>s.trim()).filter(Boolean)
          : ["REPLACE_ME"],
      }))
    };
  }
  function buildSnapConfig(){
    return {
      _comment: "One entry per tracker row. snap_ad_account_id is the ad account UUID from Snap Ads Manager URL. snap_campaign_ids are campaign UUIDs — one per line.",
      campaigns: snapActive.map(c=>({
        tracker_id: c.id,
        tracker_name: `${c.campaignName.trim()} (SP)`,
        snap_ad_account_id: getVal(`snap.campaigns.${c.id}.ad_account_id`) || "REPLACE_ME",
        snap_campaign_ids: (getVal(`snap.campaigns.${c.id}.campaign_ids`)||"").split("\n").map(s=>s.trim()).filter(Boolean).length>0
          ? (getVal(`snap.campaigns.${c.id}.campaign_ids`)||"").split("\n").map(s=>s.trim()).filter(Boolean)
          : ["REPLACE_ME"],
      }))
    };
  }
  function buildGoogleConfig(){
    return {
      _comment: "google_customer_id: your Google Ads account ID without dashes (e.g. 1234567890). google_campaign_ids: numeric campaign IDs from the Campaigns table in Google Ads UI.",
      campaigns: googleActive.map(c=>({
        tracker_id: c.id,
        tracker_name: `${c.campaignName.trim()} (${c.platform})`,
        platform: c.platform,
        google_customer_id: getVal(`google.campaigns.${c.id}.customer_id`) || "REPLACE_ME",
        google_campaign_ids: (getVal(`google.campaigns.${c.id}.campaign_ids`)||"").split("\n").map(s=>s.trim()).filter(Boolean).length>0
          ? (getVal(`google.campaigns.${c.id}.campaign_ids`)||"").split("\n").map(s=>s.trim()).filter(Boolean)
          : ["REPLACE_ME"],
      }))
    };
  }
  function buildDSPConfig(){
    return {
      _comment: "One entry per tracker row. dsp_advertiser_uuid is the advertiser UUID provided by your DSP rep. List campaign UUIDs in dsp_campaign_uuids — metrics are summed and CTR/CPM recalculated.",
      campaigns: dspActive.map(c=>({
        tracker_id: c.id,
        tracker_name: `${c.campaignName.trim()} (DSP)`,
        dsp_advertiser_uuid: getVal(`dsp.campaigns.${c.id}.advertiser_uuid`) || "REPLACE_ME",
        dsp_campaign_uuids: (getVal(`dsp.campaigns.${c.id}.campaign_uuids`)||"").split("\n").map(s=>s.trim()).filter(Boolean).length>0
          ? (getVal(`dsp.campaigns.${c.id}.campaign_uuids`)||"").split("\n").map(s=>s.trim()).filter(Boolean)
          : ["REPLACE_ME"],
      }))
    };
  }
  function buildTTDConfig(){
    return {
      _comment: "One entry per tracker row. Each client has one ttd_advertiser_id. List campaign IDs in ttd_campaign_ids — metrics are summed and CTR/CPM recalculated.",
      campaigns: ttdActive.map(c=>({
        tracker_id: c.id,
        tracker_name: `${c.campaignName.trim()} (TD)`,
        ttd_advertiser_id: getVal(`ttd.campaigns.${c.id}.advertiser_id`) || "REPLACE_ME",
        ttd_campaign_ids: (getVal(`ttd.campaigns.${c.id}.campaign_ids`)||"").split("\n").map(s=>s.trim()).filter(Boolean).length>0
          ? (getVal(`ttd.campaigns.${c.id}.campaign_ids`)||"").split("\n").map(s=>s.trim()).filter(Boolean)
          : ["REPLACE_ME"],
      }))
    };
  }

  // Completeness
  function metaComplete(c){
    const aid = getVal(`meta.campaigns.${c.id}.account_id`);
    const ids  = (getVal(`meta.campaigns.${c.id}.campaign_ids`)||"").split("\n").map(s=>s.trim()).filter(Boolean);
    return !!(aid && !aid.includes("REPLACE") && ids.length>0);
  }
  function ttdComplete(c){
    const aid = getVal(`ttd.campaigns.${c.id}.advertiser_id`);
    const ids  = (getVal(`ttd.campaigns.${c.id}.campaign_ids`)||"").split("\n").map(s=>s.trim()).filter(Boolean);
    return !!(aid && !aid.includes("REPLACE") && ids.length>0);
  }
  function dspComplete(c){
    const aid = getVal(`dsp.campaigns.${c.id}.advertiser_uuid`);
    const ids  = (getVal(`dsp.campaigns.${c.id}.campaign_uuids`)||"").split("\n").map(s=>s.trim()).filter(Boolean);
    return !!(aid && !aid.includes("REPLACE") && ids.length>0);
  }
  function googleComplete(c){
    const cid = getVal(`google.campaigns.${c.id}.customer_id`);
    const ids  = (getVal(`google.campaigns.${c.id}.campaign_ids`)||"").split("\n").map(s=>s.trim()).filter(Boolean);
    return !!(cid && !cid.includes("REPLACE") && ids.length>0);
  }
  function snapComplete(c){
    const aid = getVal(`snap.campaigns.${c.id}.ad_account_id`);
    const ids  = (getVal(`snap.campaigns.${c.id}.campaign_ids`)||"").split("\n").map(s=>s.trim()).filter(Boolean);
    return !!(aid && !aid.includes("REPLACE") && ids.length>0);
  }

  const metaDone = metaActive.filter(metaComplete).length;
  const ttdDone  = ttdActive.filter(ttdComplete).length;
  const dspDone    = dspActive.filter(dspComplete).length;
  const googleDone = googleActive.filter(googleComplete).length;
  const snapDone   = snapActive.filter(snapComplete).length;
  const metaToken    = getVal("meta.credentials.token");
  const ttdLogin     = getVal("ttd.credentials.login");
  const ttdPass      = getVal("ttd.credentials.password");
  const dspAccessKey    = getVal("dsp.credentials.access_key");
  const dspSecretKey    = getVal("dsp.credentials.secret_key");
  const dspSession      = getVal("dsp.credentials.session_token");
  const dspApiKey       = getVal("dsp.credentials.api_key");
  const googleMccId     = getVal("google.credentials.mcc_id");
  const googleDevToken  = getVal("google.credentials.developer_token");
  const googleClientId  = getVal("google.credentials.client_id");
  const googleClientSec = getVal("google.credentials.client_secret");
  const googleRefresh    = getVal("google.credentials.refresh_token");
  const snapClientId    = getVal("snap.credentials.client_id");
  const snapClientSec   = getVal("snap.credentials.client_secret");
  const snapRefresh     = getVal("snap.credentials.refresh_token");

  // Shared styles
  const iS = {background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:6,padding:"7px 10px",color:"#d8eaf8",fontSize:12,width:"100%",boxSizing:"border-box",fontFamily:"inherit",outline:"none"};
  const labelS = {display:"block",fontSize:10,color:"#7a9bbf",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:700};

  const sectionBtn = (key,label,icon) => (
    <button key={key} onClick={()=>setActiveSection(key)}
      style={{background:activeSection===key?"#002e24":"#0e1a2e",border:"1px solid "+(activeSection===key?"#00c896":"#1e293b"),
        borderRadius:8,padding:"10px 0",color:activeSection===key?"#00e5a0":"#4d6e8a",
        fontSize:13,fontWeight:activeSection===key?700:400,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7,
        minWidth:200,flexShrink:0}}>
      <span style={{fontSize:16}}>{icon}</span>{label}
    </button>
  );

  // Reusable campaign card renderer
  function CampaignCard({ c, platform, completeCheck, accountLabel, accountPlaceholder, accountHint, idHint }) {
    const done   = completeCheck(c);
    const pCol   = PLT_COLORS[c.platform]||PLT_COLORS.default;
    const pfx    = platform; // "meta" or "ttd"
    const accKey = pfx==="meta" ? "account_id" : "advertiser_id";
    const accVal = getVal(`${pfx}.campaigns.${c.id}.${accKey}`);
    const idsKey = pfx==="dsp" ? "campaign_uuids" : "campaign_ids";  // google and others all use campaign_ids
    const idsVal = getVal(`${pfx}.campaigns.${c.id}.${idsKey}`);

    // Highlight search match
    const name = c.campaignName.trim();

    return (
      <div key={c.id} style={{background:"#0a1422",border:"1px solid "+(done?"#00d48a30":"#162236"),borderRadius:8,padding:"12px 14px"}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
          <span style={{background:pCol+"22",color:pCol,border:"1px solid "+pCol+"55",borderRadius:3,padding:"1px 5px",fontSize:10,fontWeight:700}}>{c.platform}</span>
          <span style={{fontSize:12,fontWeight:700,color:"#edf4ff"}}>{name}</span>
          <span style={{marginLeft:"auto",fontSize:10,fontWeight:700,color:done?"#00d48a":"#3d5a72"}}>{done?"✓ Ready":"Incomplete"}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div>
            <label style={labelS}>{accountLabel}</label>
            <input value={accVal} onChange={e=>setVal(`${pfx}.campaigns.${c.id}.${accKey}`,e.target.value)}
              placeholder={accountPlaceholder} style={{...iS,fontFamily:"monospace"}}/>
            <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>{accountHint}</div>
          </div>
          <div>
            <label style={labelS}>Campaign ID(s) <span style={{color:"#3d5a72",textTransform:"none",fontWeight:400}}>— one per line</span></label>
            <textarea value={idsVal} onChange={e=>setVal(`${pfx}.campaigns.${c.id}.${idsKey}`,e.target.value)}
              placeholder={pfx==="meta"?"23456789012345\n23456789098765":"abc123def\nxyz456ghi"} rows={3}
              style={{...iS,resize:"vertical",fontFamily:"monospace",minHeight:58}}/>
            <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>{idHint}</div>
          </div>
        </div>
      </div>
    );
  }

  // Partner group renderer
  function PartnerGroup({ partner, campaigns: pCampaigns, platform, completeCheck, accountLabel, accountPlaceholder, accountHint, idHint, accountFieldKey }) {
    const allDone = pCampaigns.every(completeCheck);
    const anyDone = pCampaigns.some(completeCheck);
    // Representative account value (first configured, or first)
    const repId   = pCampaigns[0]?.id;
    const repAccKey = platform==="meta" ? "account_id" : platform==="dsp" ? "advertiser_uuid" : platform==="google" ? "customer_id" : platform==="snap" ? "ad_account_id" : "advertiser_id";
    const repAccVal = getVal(`${platform}.campaigns.${repId}.${repAccKey}`);

    return (
      <div style={{marginBottom:16}}>
        {/* Partner header */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,paddingBottom:6,borderBottom:"1px solid #1a2744"}}>
          <span style={{fontSize:12,fontWeight:800,color:"#edf4ff"}}>{partner}</span>
          <span style={{fontSize:10,color:"#3d5a72"}}>{pCampaigns.length} campaign{pCampaigns.length!==1?"s":""}</span>
          <span style={{fontSize:10,fontWeight:700,color:allDone?"#00d48a":anyDone?"#f59e0b":"#3d5a72",marginLeft:"auto"}}>
            {allDone?"✓ All ready":anyDone?"Partial":"Not configured"}
          </span>
          {/* Apply-to-all button: show when there are 2+ campaigns and an account ID is set */}
          {pCampaigns.length>1 && repAccVal && (
            <button
              onClick={()=>applyToPartner(platform, partner, repAccKey, repAccVal)}
              title={`Copy "${repAccVal}" to all ${partner} campaigns`}
              style={{background:"#002e24",border:"1px solid #00c89640",borderRadius:5,padding:"2px 9px",color:"#00e5a0",fontSize:10,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
              Apply ID to all ↓
            </button>
          )}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {pCampaigns.map(c=>(
            <CampaignCard key={c.id} c={c} platform={platform} completeCheck={completeCheck}
              accountLabel={accountLabel} accountPlaceholder={accountPlaceholder}
              accountHint={accountHint} idHint={idHint}/>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{color:"#d8eaf8",maxWidth:1100}}>
      <div style={{marginBottom:20}}>
        <div style={{fontSize:15,fontWeight:800,color:"#edf4ff",marginBottom:4}}>⚙️ Platform Config</div>
        <div style={{fontSize:11,color:"#4d6e8a"}}>Connect your ad platforms so campaign metrics sync automatically via GitHub Actions. Fill in credentials and IDs below, then download the config files to drop into your repo.</div>
      </div>

      {/* Section switcher + download */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,flexWrap:"nowrap"}}>
        {sectionBtn("meta","Meta (FB / FBV / IG)","📘")}
        {sectionBtn("ttd","The Trade Desk (TD)","📡")}
        {sectionBtn("dsp","DSP","🖥️")}
        {sectionBtn("google","Google Ads (SEM / YT)","🔍")}
        {sectionBtn("snap","Snapchat (SP)","👻")}
        {sectionBtn("platforms","Custom Platforms","🎨")}
        {sectionBtn("setup","GitHub Setup Guide","🛠️")}
        {sectionBtn("health","Sync Health","🩺")}
        {/* Download button — sits right next to Setup Guide, only on non-setup sections */}
        {activeSection==="meta" && metaActive.length>0 && (
          <button title="Download meta_config.json" onClick={()=>downloadJSON("meta_config.json", buildMetaConfig())}
            style={{background:"#002e24",border:"1px solid #00c89650",borderRadius:8,padding:"10px 18px",color:"#00e5a0",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:7,whiteSpace:"nowrap",flexShrink:0}}>
            <span style={{fontSize:16}}>⬇</span>Config
          </button>
        )}
        {activeSection==="ttd" && ttdActive.length>0 && (
          <button title="Download ttd_config.json" onClick={()=>downloadJSON("ttd_config.json", buildTTDConfig())}
            style={{background:"#002e24",border:"1px solid #00c89650",borderRadius:8,padding:"10px 18px",color:"#00e5a0",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:7,whiteSpace:"nowrap",flexShrink:0}}>
            <span style={{fontSize:16}}>⬇</span>Config
          </button>
        )}
        {activeSection==="dsp" && dspActive.length>0 && (
          <button title="Download dsp_config.json" onClick={()=>downloadJSON("dsp_config.json", buildDSPConfig())}
            style={{background:"#002e24",border:"1px solid #00c89650",borderRadius:8,padding:"10px 18px",color:"#00e5a0",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:7,whiteSpace:"nowrap",flexShrink:0}}>
            <span style={{fontSize:16}}>⬇</span>Config
          </button>
        )}
        {activeSection==="google" && googleActive.length>0 && (
          <button title="Download google_ads_config.json" onClick={()=>downloadJSON("google_ads_config.json", buildGoogleConfig())}
            style={{background:"#002e24",border:"1px solid #00c89650",borderRadius:8,padding:"10px 18px",color:"#00e5a0",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:7,whiteSpace:"nowrap",flexShrink:0}}>
            <span style={{fontSize:16}}>⬇</span>Config
          </button>
        )}
        {activeSection==="snap" && snapActive.length>0 && (
          <button title="Download snap_config.json" onClick={()=>downloadJSON("snap_config.json", buildSnapConfig())}
            style={{background:"#002e24",border:"1px solid #00c89650",borderRadius:8,padding:"10px 18px",color:"#00e5a0",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:7,whiteSpace:"nowrap",flexShrink:0}}>
            <span style={{fontSize:16}}>⬇</span>Config
          </button>
        )}
      </div>
      {/* Search — second row, hidden on Setup Guide */}
      {activeSection!=="setup" && (
        <div style={{marginBottom:16,position:"relative",display:"inline-block"}}>
          <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#3d5a72",fontSize:13,pointerEvents:"none"}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Search campaigns…"
            style={{...iS,width:240,paddingLeft:30,background:"#0a1422"}}/>
          {search && <button onClick={()=>setSearch("")}
            style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#3d5a72",cursor:"pointer",fontSize:14,lineHeight:1,padding:0}}>×</button>}
        </div>
      )}

      {/* ── META ── */}
      {activeSection==="meta"&&<div>
        {/* Credentials */}
        <div style={{background:"#0c1625",border:"1px solid #1e293b",borderRadius:10,padding:"16px 20px",marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:700,color:"#edf4ff",marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
            🔑 Meta Credentials
            <span style={{fontSize:10,color:"#3d5a72",fontWeight:400}}>Stored locally in your browser — never sent anywhere</span>
          </div>
          <div style={{maxWidth:580}}>
            <label style={labelS}>Access Token <span style={{color:"#3d5a72",textTransform:"none",fontSize:10,fontWeight:400}}>— System User token with ads_read + read_insights</span></label>
            <div style={{display:"flex",gap:6}}>
              <input type="password" value={metaToken} onChange={e=>setVal("meta.credentials.token",e.target.value)}
                placeholder="EAAxxxxxxxx..." style={{...iS,flex:1,fontFamily:"monospace"}}/>
              {metaToken&&<button onClick={()=>copyText(metaToken,"meta-token")}
                style={{background:"#002e24",border:"1px solid #00c89640",borderRadius:6,padding:"7px 12px",color:"#00e5a0",fontSize:11,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
                {copied==="meta-token"?"✓ Copied":"Copy"}
              </button>}
            </div>
            <div style={{fontSize:10,color:"#3d5a72",marginTop:4}}>Meta Business Suite → Business Settings → System Users → Add Token</div>
          </div>
        </div>

        {/* Progress */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{flex:1,background:"#07101c",borderRadius:4,height:6}}>
            <div style={{background:metaDone===metaActive.length&&metaActive.length>0?"#00d48a":"#3b82f6",height:"100%",borderRadius:4,width:metaActive.length>0?(metaDone/metaActive.length*100)+"%":"0%",transition:"width .3s"}}/>
          </div>
          <span style={{fontSize:11,color:"#4d6e8a",whiteSpace:"nowrap"}}>{metaDone} / {metaActive.length} campaigns configured</span>
          {q && <span style={{fontSize:11,color:"#f59e0b"}}>Showing {metaFiltered.length} match{metaFiltered.length!==1?"es":""}</span>}
        </div>

        {/* Grouped campaigns */}
        {metaFiltered.length===0
          ? <div style={{textAlign:"center",padding:"30px 0",color:"#3d5a72",fontSize:13}}>{q?"No campaigns match your search.":"No active FB/FBV/IG campaigns found."}</div>
          : groupByPartner(metaFiltered).map(([partner, pCampaigns])=>(
            <PartnerGroup key={partner} partner={partner} campaigns={pCampaigns} platform="meta"
              completeCheck={metaComplete}
              accountLabel="Ad Account ID"
              accountPlaceholder="act_123456789"
              accountHint="Ads Manager URL → account_id= in the URL"
              idHint="Ads Manager → click campaign → ID in URL or Columns"
              accountFieldKey="account_id"/>
          ))
        }
      </div>}

      {/* ── TTD ── */}
      {activeSection==="ttd"&&<div>
        {/* Credentials */}
        <div style={{background:"#0c1625",border:"1px solid #1e293b",borderRadius:10,padding:"16px 20px",marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:700,color:"#edf4ff",marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
            🔑 TTD API Credentials
            <span style={{fontSize:10,color:"#3d5a72",fontWeight:400}}>Stored locally — never sent anywhere</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,maxWidth:700}}>
            <div>
              <label style={labelS}>API Login</label>
              <input value={ttdLogin} onChange={e=>setVal("ttd.credentials.login",e.target.value)}
                placeholder="your@email.com" style={{...iS,fontFamily:"monospace"}}/>
              <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>TTD UI → Accounts → API Access → create credential</div>
            </div>
            <div>
              <label style={labelS}>API Password</label>
              <input type="password" value={ttdPass} onChange={e=>setVal("ttd.credentials.password",e.target.value)}
                placeholder="••••••••" style={{...iS,fontFamily:"monospace"}}/>
              <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>Use an API-only credential, not your UI login password</div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{flex:1,background:"#07101c",borderRadius:4,height:6}}>
            <div style={{background:ttdDone===ttdActive.length&&ttdActive.length>0?"#00d48a":"#3b82f6",height:"100%",borderRadius:4,width:ttdActive.length>0?(ttdDone/ttdActive.length*100)+"%":"0%",transition:"width .3s"}}/>
          </div>
          <span style={{fontSize:11,color:"#4d6e8a",whiteSpace:"nowrap"}}>{ttdDone} / {ttdActive.length} campaigns configured</span>
          {q && <span style={{fontSize:11,color:"#f59e0b"}}>Showing {ttdFiltered.length} match{ttdFiltered.length!==1?"es":""}</span>}
        </div>

        {/* Grouped campaigns */}
        {ttdFiltered.length===0
          ? <div style={{textAlign:"center",padding:"30px 0",color:"#3d5a72",fontSize:13}}>{q?"No campaigns match your search.":"No active TD campaigns found."}</div>
          : groupByPartner(ttdFiltered).map(([partner, pCampaigns])=>(
            <PartnerGroup key={partner} partner={partner} campaigns={pCampaigns} platform="ttd"
              completeCheck={ttdComplete}
              accountLabel="Advertiser ID"
              accountPlaceholder="abc123de"
              accountHint="TTD UI → /advertiser/XXXXXXX/ in the URL"
              idHint="TTD UI → Campaigns → click campaign → ID in URL"
              accountFieldKey="advertiser_id"/>
          ))
        }
      </div>}

      {/* ── DSP ── */}
      {activeSection==="dsp"&&<div>
        {/* Credentials */}
        <div style={{background:"#0c1625",border:"1px solid #1e293b",borderRadius:10,padding:"16px 20px",marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:700,color:"#edf4ff",marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
            🔑 DSP API Credentials
            <span style={{fontSize:10,color:"#3d5a72",fontWeight:400}}>Stored locally — never sent anywhere</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div>
              <label style={labelS}>AWS Access Key ID</label>
              <input value={dspAccessKey} onChange={e=>setVal("dsp.credentials.access_key",e.target.value)}
                placeholder="AKIAXXXXXXXXXXXXXXXX" style={{...iS,fontFamily:"monospace"}}/>
              <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>Provided by your DSP rep</div>
            </div>
            <div>
              <label style={labelS}>AWS Secret Access Key</label>
              <input type="password" value={dspSecretKey} onChange={e=>setVal("dsp.credentials.secret_key",e.target.value)}
                placeholder="••••••••" style={{...iS,fontFamily:"monospace"}}/>
              <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>Provided by your DSP rep</div>
            </div>
            <div>
              <label style={labelS}>x-api-key</label>
              <input type="password" value={dspApiKey} onChange={e=>setVal("dsp.credentials.api_key",e.target.value)}
                placeholder="••••••••" style={{...iS,fontFamily:"monospace"}}/>
              <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>Provided by your DSP rep alongside AWS credentials</div>
            </div>
            <div>
              <label style={labelS}>AWS Session Token <span style={{color:"#3d5a72",textTransform:"none",fontWeight:400}}>— optional</span></label>
              <input type="password" value={dspSession} onChange={e=>setVal("dsp.credentials.session_token",e.target.value)}
                placeholder="Leave blank if not using temporary credentials" style={{...iS,fontFamily:"monospace"}}/>
              <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>Only needed if your rep issued temporary IAM credentials</div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{flex:1,background:"#07101c",borderRadius:4,height:6}}>
            <div style={{background:dspDone===dspActive.length&&dspActive.length>0?"#00d48a":"#3b82f6",height:"100%",borderRadius:4,width:dspActive.length>0?(dspDone/dspActive.length*100)+"%":"0%",transition:"width .3s"}}/>
          </div>
          <span style={{fontSize:11,color:"#4d6e8a",whiteSpace:"nowrap"}}>{dspDone} / {dspActive.length} campaigns configured</span>
          {q && <span style={{fontSize:11,color:"#f59e0b"}}>Showing {dspFiltered.length} match{dspFiltered.length!==1?"es":""}</span>}
        </div>

        {/* Grouped campaigns */}
        {dspFiltered.length===0
          ? <div style={{textAlign:"center",padding:"30px 0",color:"#3d5a72",fontSize:13}}>{q?"No campaigns match your search.":"No active DSP campaigns found."}</div>
          : groupByPartner(dspFiltered).map(([partner, pCampaigns])=>(
            <PartnerGroup key={partner} partner={partner} campaigns={pCampaigns} platform="dsp"
              completeCheck={dspComplete}
              accountLabel="Advertiser UUID"
              accountPlaceholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              accountHint="DSP platform → advertiser UUID in the URL or provided by rep"
              idHint="DSP platform → Campaigns → click campaign → UUID in URL"
              accountFieldKey="advertiser_uuid"/>
          ))
        }
      </div>}

      {/* ── GOOGLE ADS ── */}
      {activeSection==="google"&&<div>
        {/* Credentials */}
        <div style={{background:"#0c1625",border:"1px solid #1e293b",borderRadius:10,padding:"16px 20px",marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:700,color:"#edf4ff",marginBottom:4,display:"flex",alignItems:"center",gap:8}}>
            🔑 Google Ads API Credentials
            <span style={{fontSize:10,color:"#3d5a72",fontWeight:400}}>Stored locally — never sent anywhere</span>
          </div>
          <div style={{fontSize:11,color:"#4d6e8a",marginBottom:12}}>
            Requires a Google Ads developer token + OAuth2 credentials.{" "}
            <a href="https://developers.google.com/google-ads/api/docs/get-started/oauth-cloud" target="_blank" rel="noreferrer"
              style={{color:"#60a5fa",textDecoration:"none"}}>Setup guide →</a>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div style={{gridColumn:"1 / -1",background:"#07101c",borderRadius:7,padding:"10px 14px",display:"flex",alignItems:"center",gap:12}}>
              <div style={{flex:1}}>
                <label style={labelS}>MCC Manager Account ID</label>
                <input value={googleMccId} onChange={e=>setVal("google.credentials.mcc_id",e.target.value)}
                  placeholder="1234567890  (no dashes)" style={{...iS,fontFamily:"monospace"}}/>
                <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>Your top-level manager account ID — Google Ads UI → account switcher → MCC account number</div>
              </div>
              <div style={{fontSize:11,color:"#4d6e8a",maxWidth:220,lineHeight:1.4}}>
                Since you have an MCC, one set of credentials covers all client accounts. Each campaign card below just needs the client's customer ID.
              </div>
            </div>
            <div>
              <label style={labelS}>Developer Token</label>
              <input type="password" value={googleDevToken} onChange={e=>setVal("google.credentials.developer_token",e.target.value)}
                placeholder="••••••••" style={{...iS,fontFamily:"monospace"}}/>
              <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>Google Ads UI → Tools → API Center</div>
            </div>
            <div>
              <label style={labelS}>OAuth2 Client ID</label>
              <input value={googleClientId} onChange={e=>setVal("google.credentials.client_id",e.target.value)}
                placeholder="xxxxxxxxxxxx.apps.googleusercontent.com" style={{...iS,fontFamily:"monospace"}}/>
              <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>Google Cloud Console → APIs & Services → Credentials</div>
            </div>
            <div>
              <label style={labelS}>OAuth2 Client Secret</label>
              <input type="password" value={googleClientSec} onChange={e=>setVal("google.credentials.client_secret",e.target.value)}
                placeholder="••••••••" style={{...iS,fontFamily:"monospace"}}/>
              <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>Same credentials screen as Client ID</div>
            </div>
            <div>
              <label style={labelS}>Refresh Token</label>
              <input type="password" value={googleRefresh} onChange={e=>setVal("google.credentials.refresh_token",e.target.value)}
                placeholder="••••••••" style={{...iS,fontFamily:"monospace"}}/>
              <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>Generated once via OAuth flow — does not expire</div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{flex:1,background:"#07101c",borderRadius:4,height:6}}>
            <div style={{background:googleDone===googleActive.length&&googleActive.length>0?"#00d48a":"#3b82f6",height:"100%",borderRadius:4,width:googleActive.length>0?(googleDone/googleActive.length*100)+"%":"0%",transition:"width .3s"}}/>
          </div>
          <span style={{fontSize:11,color:"#4d6e8a",whiteSpace:"nowrap"}}>{googleDone} / {googleActive.length} campaigns configured</span>
          {q && <span style={{fontSize:11,color:"#f59e0b"}}>Showing {googleFiltered.length} match{googleFiltered.length!==1?"es":""}</span>}
        </div>

        {/* Grouped campaigns */}
        {googleFiltered.length===0
          ? <div style={{textAlign:"center",padding:"30px 0",color:"#3d5a72",fontSize:13}}>{q?"No campaigns match your search.":"No active SEM or YT campaigns found."}</div>
          : groupByPartner(googleFiltered).map(([partner, pCampaigns])=>(
            <PartnerGroup key={partner} partner={partner} campaigns={pCampaigns} platform="google"
              completeCheck={googleComplete}
              accountLabel="Google Ads Customer ID"
              accountPlaceholder="1234567890  (no dashes)"
              accountHint="Google Ads UI → top account selector shows your Customer ID"
              idHint="Google Ads UI → Campaigns table → hover campaign name to see numeric ID, or check URL"
              accountFieldKey="customer_id"/>
          ))
        }
      </div>}

      {/* ── SNAPCHAT ── */}
      {activeSection==="snap"&&<div>
        {/* Approval warning */}
        <div style={{background:"#1a1000",border:"1px solid #f59e0b40",borderRadius:8,padding:"12px 16px",marginBottom:16,display:"flex",gap:10,alignItems:"flex-start"}}>
          <span style={{fontSize:18,flexShrink:0}}>⚠️</span>
          <div>
            <div style={{fontSize:12,fontWeight:700,color:"#f59e0b",marginBottom:3}}>Snapchat API approval required before this will work</div>
            <div style={{fontSize:11,color:"#92400e",lineHeight:1.5}}>Submit your app for review at <span style={{color:"#fbbf24"}}>developers.snap.com</span> → My Apps → New App. Request <strong>snapchat-marketing-api</strong> scope. Approval takes 2–5 business days. See the Snapchat API Setup Guide for full instructions.</div>
          </div>
        </div>

        {/* Credentials */}
        <div style={{background:"#0c1625",border:"1px solid #1e293b",borderRadius:10,padding:"16px 20px",marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:700,color:"#edf4ff",marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
            🔑 Snapchat API Credentials
            <span style={{fontSize:10,color:"#3d5a72",fontWeight:400}}>Stored locally — never sent anywhere</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
            <div>
              <label style={labelS}>OAuth2 Client ID</label>
              <input value={snapClientId} onChange={e=>setVal("snap.credentials.client_id",e.target.value)}
                placeholder="From developers.snap.com → My Apps" style={{...iS,fontFamily:"monospace"}}/>
              <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>Snap Developer Portal → your app → Client ID</div>
            </div>
            <div>
              <label style={labelS}>OAuth2 Client Secret</label>
              <input type="password" value={snapClientSec} onChange={e=>setVal("snap.credentials.client_secret",e.target.value)}
                placeholder="••••••••" style={{...iS,fontFamily:"monospace"}}/>
              <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>Same app page as Client ID</div>
            </div>
            <div>
              <label style={labelS}>Refresh Token</label>
              <input type="password" value={snapRefresh} onChange={e=>setVal("snap.credentials.refresh_token",e.target.value)}
                placeholder="••••••••" style={{...iS,fontFamily:"monospace"}}/>
              <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>Generated via OAuth flow — see setup guide. Expires after 12 months.</div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{flex:1,background:"#07101c",borderRadius:4,height:6}}>
            <div style={{background:snapDone===snapActive.length&&snapActive.length>0?"#00d48a":"#3b82f6",height:"100%",borderRadius:4,width:snapActive.length>0?(snapDone/snapActive.length*100)+"%":"0%",transition:"width .3s"}}/>
          </div>
          <span style={{fontSize:11,color:"#4d6e8a",whiteSpace:"nowrap"}}>{snapDone} / {snapActive.length} campaigns configured</span>
          {q && <span style={{fontSize:11,color:"#f59e0b"}}>Showing {snapFiltered.length} match{snapFiltered.length!==1?"es":""}</span>}
        </div>

        {/* Grouped campaigns */}
        {snapFiltered.length===0
          ? <div style={{textAlign:"center",padding:"30px 0",color:"#3d5a72",fontSize:13}}>{q?"No campaigns match your search.":"No active SP campaigns found."}</div>
          : groupByPartner(snapFiltered).map(([partner, pCampaigns])=>(
            <PartnerGroup key={partner} partner={partner} campaigns={pCampaigns} platform="snap"
              completeCheck={snapComplete}
              accountLabel="Ad Account ID"
              accountPlaceholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              accountHint="Snap Ads Manager URL → ads.snapchat.com/v2/accounts/YOUR-ID/..."
              idHint="Snap Ads Manager → click a campaign → UUID in the URL"
              accountFieldKey="ad_account_id"/>
          ))
        }
      </div>}

      {/* ── SETUP GUIDE ── */}
      {activeSection==="health"&&<div>
        <div style={{fontSize:14,fontWeight:700,color:"#edf4ff",marginBottom:16}}>🩺 Sync Health Dashboard</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[
            {key:"meta",   label:"Meta (FB / FBV / IG)", icon:"📘", color:"#60a5fa",  status:metaSyncStatus,   info:metaSyncInfo,   active:metaActive},
            {key:"ttd",    label:"The Trade Desk (TD)",  icon:"📡", color:"#a78bfa",  status:ttdSyncStatus,    info:ttdSyncInfo,    active:ttdActive},
            {key:"dsp",    label:"DSP",                  icon:"🖥️", color:"#34d399",  status:dspSyncStatus,    info:dspSyncInfo,    active:dspActive},
            {key:"google", label:"Google Ads (SEM / YT)",icon:"🔍", color:"#f59e0b",  status:googleSyncStatus, info:googleSyncInfo, active:googleActive},
            {key:"snap",   label:"Snapchat (SP)",         icon:"👻", color:"#f9a8d4",  status:snapSyncStatus,   info:snapSyncInfo,   active:snapActive},
          ].map(({key,label,icon,color,status,info,active})=>{
            const isConfigured = active.length > 0;
            const hasErrors = info?.errors?.length > 0;
            const lastSync = info?.last_updated;
            const fetched = info?.fetched_count ?? 0;
            const total = active.length;

            // How long ago was last sync
            let syncAge = null;
            if (lastSync) {
              const ms = Date.now() - new Date(lastSync).getTime();
              const hrs = Math.floor(ms / 3600000);
              const mins = Math.floor((ms % 3600000) / 60000);
              syncAge = hrs > 0 ? `${hrs}h ${mins}m ago` : `${mins}m ago`;
            }

            // Status indicator
            const dot = status==="syncing" ? {c:"#60a5fa",label:"Syncing…"}
                      : status==="error"   ? {c:"#ef4444",label:"Error"}
                      : status==="done" && fetched>0 ? {c:"#00d48a",label:"OK"}
                      : status==="done" && fetched===0 ? {c:"#f59e0b",label:"No data"}
                      : {c:"#3d5a72",label:"Not set up"};

            return (
              <div key={key} style={{background:"#0c1625",border:`1px solid ${dot.c}30`,borderRadius:10,padding:"14px 18px"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom: hasErrors||lastSync ? 10 : 0}}>
                  {/* Status dot */}
                  <div style={{width:10,height:10,borderRadius:"50%",background:dot.c,flexShrink:0,
                    boxShadow: status==="syncing"?`0 0 6px ${dot.c}`:"none"}}/>
                  {/* Platform name */}
                  <span style={{fontSize:13,fontWeight:700,color:"#edf4ff"}}>{icon} {label}</span>
                  {/* Status badge */}
                  <span style={{fontSize:11,background:dot.c+"22",border:`1px solid ${dot.c}40`,
                    borderRadius:4,padding:"1px 8px",color:dot.c,fontWeight:600}}>{dot.label}</span>
                  <div style={{flex:1}}/>
                  {/* Campaign count */}
                  {isConfigured && (
                    <span style={{fontSize:11,color:"#4d6e8a"}}>
                      {fetched}/{total} campaigns synced
                    </span>
                  )}
                  {!isConfigured && (
                    <span style={{fontSize:11,color:"#3d5a72"}}>Not configured</span>
                  )}
                </div>

                {/* Last sync time row */}
                {lastSync && (
                  <div style={{display:"flex",alignItems:"center",gap:16,fontSize:11,color:"#4d6e8a",paddingLeft:20}}>
                    <span>⏱ Last sync: <span style={{color:"#7a9bbf",fontWeight:500}}>{syncAge}</span>
                      <span style={{opacity:0.5,marginLeft:6}}>{new Date(lastSync).toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}</span>
                    </span>
                    {/* Staleness warning */}
                    {(()=>{
                      const ms = Date.now() - new Date(lastSync).getTime();
                      const hrs = ms / 3600000;
                      if (hrs > 26) return <span style={{color:"#ef4444",fontWeight:600}}>⚠ Overdue — last sync was {Math.floor(hrs)}h ago</span>;
                      if (hrs > 13) return <span style={{color:"#f59e0b",fontWeight:600}}>⚠ Running late</span>;
                      return null;
                    })()}
                  </div>
                )}

                {/* Errors */}
                {hasErrors && (
                  <div style={{marginTop:8,paddingLeft:20}}>
                    <div style={{fontSize:11,color:"#ef4444",fontWeight:600,marginBottom:4}}>
                      ⚠ {info.errors.length} error{info.errors.length!==1?"s":""} in last sync:
                    </div>
                    {info.errors.slice(0,3).map((e,i)=>(
                      <div key={i} style={{fontSize:11,color:"#92400e",background:"#1a0808",border:"1px solid #ef444430",
                        borderRadius:5,padding:"4px 10px",marginBottom:3,fontFamily:"monospace"}}>
                        {e.window && <span style={{color:"#ef4444",marginRight:6}}>[{e.window}]</span>}
                        {e.error?.slice(0,120)}
                      </div>
                    ))}
                    {info.errors.length > 3 && (
                      <div style={{fontSize:10,color:"#3d5a72",marginTop:2}}>
                        +{info.errors.length-3} more errors
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Schedule reference */}
        <div style={{marginTop:16,background:"#07101c",border:"1px solid #1e293b",borderRadius:8,padding:"12px 16px"}}>
          <div style={{fontSize:11,fontWeight:700,color:"#4d6e8a",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.06em"}}>Daily sync schedule (ET)</div>
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            {[
              {label:"📘 Meta",  time:"8:00am"},
              {label:"📡 TTD",   time:"8:30am"},
              {label:"🖥️ DSP",   time:"9:00am"},
              {label:"🔍 Google",time:"9:30am"},
              {label:"👻 Snap",  time:"10:00am"},
            ].map(({label,time})=>(
              <div key={label} style={{fontSize:11,color:"#4d6e8a"}}>
                {label} <span style={{color:"#7a9bbf",fontWeight:600}}>{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>}

      {activeSection==="platforms"&&(
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{fontSize:12,color:"#4d6e8a",lineHeight:1.6}}>
            Add platforms not in the default list — Pinterest, TikTok Shop, LinkedIn, etc. Custom platforms appear everywhere: campaign dropdowns, filters, pacing, and Zeus. Changes take effect immediately.
          </div>

          {/* Add new platform */}
          <div style={{background:"#0c1625",border:"1px solid #1e293b",borderRadius:12,padding:"20px 22px"}}>
            <div style={{fontSize:12,fontWeight:700,color:"#edf4ff",marginBottom:14}}>Add New Platform</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr auto auto",gap:10,alignItems:"end"}}>
              <div>
                <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Platform Code</label>
                <input
                  value={newPlatName}
                  onChange={e=>setNewPlatName(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,""))}
                  onKeyDown={e=>e.key==="Enter"&&saveCustomPlatform()}
                  placeholder="e.g. PIN, LI, TTSHOP"
                  maxLength={8}
                  style={{width:"100%",background:"#162236",border:"1px solid #334155",borderRadius:6,padding:"8px 12px",color:"#d8eaf8",fontSize:13,fontFamily:"inherit",boxSizing:"border-box",outline:"none"}}
                />
                <div style={{fontSize:10,color:"#3d5a72",marginTop:3}}>Short code shown on campaign rows. Letters/numbers only, max 8 chars.</div>
              </div>
              <div>
                <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Color</label>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <input
                    type="color"
                    value={newPlatColor}
                    onChange={e=>setNewPlatColor(e.target.value)}
                    style={{width:44,height:36,border:"1px solid #334155",borderRadius:6,background:"#162236",cursor:"pointer",padding:2}}
                  />
                  <span style={{fontSize:12,fontWeight:700,color:newPlatColor,background:newPlatColor+"22",border:`1px solid ${newPlatColor}60`,borderRadius:6,padding:"4px 10px",fontFamily:"monospace"}}>
                    {newPlatName||"ABC"}
                  </span>
                </div>
              </div>
              <button
                onClick={saveCustomPlatform}
                disabled={!newPlatName.trim()}
                style={{background:newPlatName.trim()?"#002e24":"#0e1a2e",border:`1px solid ${newPlatName.trim()?"#00c89650":"#1e293b"}`,borderRadius:8,padding:"8px 20px",color:newPlatName.trim()?"#00e5a0":"#3d5a72",fontSize:13,fontWeight:700,cursor:newPlatName.trim()?"pointer":"default",whiteSpace:"nowrap",alignSelf:"flex-end",transition:"all .15s"}}>
                {platSaved?"✓ Saved!":"+ Add Platform"}
              </button>
            </div>
          </div>

          {/* Quick add common platforms */}
          <div style={{background:"#0c1625",border:"1px solid #1e293b",borderRadius:12,padding:"16px 20px"}}>
            <div style={{fontSize:11,color:"#4d6e8a",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:10}}>Quick Add Common Platforms</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {[
                {code:"PIN",color:"#e60069",name:"Pinterest"},
                {code:"LI",color:"#0a66c2",name:"LinkedIn"},
                {code:"TTSHOP",color:"#ff0050",name:"TikTok Shop"},
                {code:"AMZN",color:"#ff9900",name:"Amazon DSP"},
                {code:"RDDIT",color:"#ff4500",name:"Reddit"},
                {code:"HULU",color:"#1ce783",name:"Hulu"},
                {code:"NFLX",color:"#e50914",name:"Netflix Ads"},
                {code:"PMAX",color:"#4285f4",name:"Google PMax"},
              ].filter(p=>!ALL_PLATFORMS_DEFAULT.includes(p.code)&&!customData.platforms.includes(p.code)).map(p=>(
                <button key={p.code} onClick={()=>{
                  const updated={platforms:[...customData.platforms,p.code],colors:{...customData.colors,[p.code]:p.color}};
                  saveCustomPlatforms(updated); setCustomData(updated);
                  if(!ALL_PLATFORMS.includes(p.code)) ALL_PLATFORMS.push(p.code);
                  PLT_COLORS[p.code]=p.color;
                  setPlatSaved(true); setTimeout(()=>setPlatSaved(false),2000);
                }}
                  style={{background:p.color+"18",border:`1px solid ${p.color}50`,borderRadius:8,padding:"6px 14px",color:p.color,fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6,transition:"all .15s"}}>
                  <span style={{fontSize:11,fontFamily:"monospace",background:p.color+"30",borderRadius:4,padding:"1px 5px"}}>{p.code}</span>
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Existing custom platforms */}
          {customData.platforms.length > 0 && (
            <div style={{background:"#0c1625",border:"1px solid #1e293b",borderRadius:12,padding:"16px 20px"}}>
              <div style={{fontSize:11,color:"#4d6e8a",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:10}}>Your Custom Platforms</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {customData.platforms.map(name=>{
                  const color = customData.colors[name]||"#7a9bbf";
                  const count = campaigns.filter(c=>c.platform===name).length;
                  return (
                    <div key={name} style={{display:"flex",alignItems:"center",gap:12,background:"#07101c",border:`1px solid ${color}30`,borderRadius:8,padding:"10px 14px"}}>
                      <span style={{fontWeight:800,color,background:color+"22",border:`1px solid ${color}50`,borderRadius:5,padding:"3px 10px",fontSize:13,fontFamily:"monospace",minWidth:60,textAlign:"center"}}>{name}</span>
                      <span style={{fontSize:11,color:"#4d6e8a",flex:1}}>{count} campaign{count!==1?"s":""} using this platform</span>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <input type="color" value={color} onChange={e=>updateCustomColor(name,e.target.value)}
                          title="Change color" style={{width:32,height:28,border:"1px solid #334155",borderRadius:4,background:"#162236",cursor:"pointer",padding:1}}/>
                        <button onClick={()=>removeCustomPlatform(name)}
                          style={{background:"#1a0808",border:"1px solid #ef444440",borderRadius:5,padding:"4px 10px",color:"#ef4444",fontSize:11,fontWeight:600,cursor:"pointer"}}>Remove</button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{fontSize:10,color:"#3d5a72",marginTop:10}}>⚠ Removing a platform doesn't affect existing campaigns that use it — they'll still show the platform code, it just won't appear in the add/edit dropdown.</div>
            </div>
          )}

          {customData.platforms.length===0&&(
            <div style={{background:"#07101c",border:"1px solid #1e293b",borderRadius:10,padding:"28px",textAlign:"center",color:"#3d5a72"}}>
              <div style={{fontSize:24,marginBottom:8}}>🎨</div>
              <div style={{fontSize:13,color:"#4d6e8a"}}>No custom platforms yet. Add Pinterest, LinkedIn, or any other platform above.</div>
            </div>
          )}
        </div>
      )}

      {activeSection==="setup"&&<div style={{display:"flex",flexDirection:"column",gap:12}}>
        {[
          {
            step:1, title:"TTD: Request API access from your rep first",
            color:"#f59e0b",
            lines:[
              "Before anything else — contact your Trade Desk rep and ask them to enable 'My Reports API access' for your login",
              "This is not on by default for all accounts; without it the TTD fetch script will get a 403 error",
              "Meta has no equivalent requirement — you can set that up yourself without asking anyone",
            ]
          },
          {
            step:2, title:"Add your repo Secrets",
            color:"#3b82f6",
            lines:[
              "Go to your GitHub repo → Settings → Secrets and variables → Actions",
              "Add: META_ACCESS_TOKEN — your Meta System User token (from the Meta tab above)",
              "Add: TTD_LOGIN and TTD_PASSWORD — your TTD API credentials (from the TTD tab above)",
              "Add: DSP_AWS_ACCESS_KEY_ID, DSP_AWS_SECRET_ACCESS_KEY, DSP_API_KEY — from your DSP rep (from the DSP tab above)",
              "Add: DSP_AWS_SESSION_TOKEN only if your rep issued temporary IAM credentials",
              "Add: GOOGLE_ADS_DEVELOPER_TOKEN, GOOGLE_ADS_CLIENT_ID, GOOGLE_ADS_CLIENT_SECRET, GOOGLE_ADS_REFRESH_TOKEN, GOOGLE_ADS_LOGIN_CUSTOMER_ID (your MCC ID) — from the Google Ads tab above",
              "Add: SNAP_CLIENT_ID, SNAP_CLIENT_SECRET, SNAP_REFRESH_TOKEN — from the Snapchat tab above (requires API approval first)",
              "These are encrypted and only visible to GitHub Actions — never to anyone else",
            ]
          },
          {
            step:3, title:"Upload the config files",
            color:"#a78bfa",
            lines:[
              "Download meta_config.json, ttd_config.json, dsp_config.json, and google_ads_config.json from their respective tabs",
              "Upload both files to the root of your GitHub repo (same folder as your tracker .jsx file)",
              "The fetch scripts read these files to know which campaigns to pull data for",
            ]
          },
          {
            step:4, title:"Upload the workflow files",
            color:"#fb923c",
            lines:[
              "In your repo, create the folder: .github/workflows/ (if it doesn't exist)",
              "Upload fetch-meta.yml, fetch-ttd.yml, fetch-dsp.yml, and fetch-google-ads.yml into that folder",
              "These tell GitHub Actions when to run the fetch scripts (daily at 8am ET)",
            ]
          },
          {
            step:5, title:"Test it manually",
            color:"#00d48a",
            lines:[
              "Go to your GitHub repo → Actions tab",
              "Start with Meta: click \"Fetch Meta Campaign Metrics\" → \"Run workflow\" → Run",
              "If it passes, campaigns.json will appear in your repo — the tracker loads it automatically on open",
              "Once your TTD rep confirms API access, test \"Fetch TTD Campaign Metrics\" the same way",
              "For DSP: test \"Fetch DSP Campaign Metrics\" — runs at 9:00am ET (after Meta and TTD)",
              "For Google Ads: test \"Fetch Google Ads Metrics\" — runs at 9:30am ET (last in sequence)",
            ]
          },
          {
            step:6, title:"After that — fully automatic",
            color:"#00e5a0",
            lines:[
              "Meta runs daily at 8:00am ET, TTD at 8:30am ET",
              "Each run pulls MTD, Last 30 days, and Yesterday windows",
              "The tracker picks up the latest data every time you open it — both Meta and TTD badges show in the header",
              "You only need to re-download and re-upload config files when you add new campaigns",
            ]
          },
        ].map(({step,title,color,lines})=>(
          <div key={step} style={{background:"#0c1625",border:"1px solid #1e293b",borderRadius:10,padding:"16px 20px",display:"flex",gap:16}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:color+"22",border:"2px solid "+color+"60",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>
              <span style={{fontSize:13,fontWeight:800,color}}>{step}</span>
            </div>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:"#edf4ff",marginBottom:8}}>{title}</div>
              {lines.map((l,i)=>(
                <div key={i} style={{display:"flex",gap:8,marginBottom:5,alignItems:"flex-start"}}>
                  <span style={{color,fontSize:11,marginTop:1,flexShrink:0}}>›</span>
                  <span style={{fontSize:12,color:"#7a9bbf",lineHeight:1.5}}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>}
    </div>
  );
}




function RenewModal({ campaign, allCampaigns, onRenew, onExtend, onClose }) {
  const today = getToday();
  const clientCampaigns = allCampaigns.filter(c =>
    c.campaignName.trim() === campaign.campaignName.trim()
  );
  const [mode, setMode]                 = useState("extend"); // "extend" | "renew"
  const [endDate, setEndDate]           = useState("");
  const [startDate, setStartDate]       = useState(campaign.endDate || today);
  const [goal, setGoal]                 = useState(campaign.note1 || "");
  const [contractValue, setContractValue] = useState(campaign.contractValue || "");
  const [applyAll, setApplyAll]         = useState(clientCampaigns.length > 1);
  const iS = {width:"100%",background:"#162236",border:"1px solid #334155",borderRadius:6,
    padding:"7px 10px",color:"#d8eaf8",fontSize:13,boxSizing:"border-box",fontFamily:"inherit"};
  const labelS = {display:"block",fontSize:10,color:"#7a9bbf",marginBottom:3,
    textTransform:"uppercase",letterSpacing:"0.06em"};

  function doExtend() {
    if (!endDate) return;
    const targets = applyAll ? clientCampaigns : [campaign];
    targets.forEach(c => {
      onExtend({
        ...c,
        endDate,
        note1: goal || c.note1,
        contractValue: contractValue || c.contractValue,
        status: "active",
      });
    });
    onClose();
  }

  function doRenew() {
    if (!endDate) return;
    const targets = applyAll ? clientCampaigns : [campaign];
    const newCampaigns = targets.map(c => ({
      ...c,
      id: Date.now() + Math.random(),
      startDate, endDate,
      note1: goal || c.note1,
      contractValue: contractValue || c.contractValue,
      status: "active",
      impressions:"", ctr:"", cpm:"", spend:"",
      completionRate:"", conversions:"", clicks:"",
      reach:"", frequency:"", videoViews:"",
      lastChecked: today,
      metaSnapshots: undefined, ttdSnapshots: undefined,
      dspSnapshots: undefined, googleSnapshots: undefined, snapSnapshots: undefined,
    }));
    onRenew(newCampaigns, campaign);
  }

  const isExtend = mode === "extend";
  const canSubmit = !!endDate;

  const renewBackdrop = useBackdropClose(onClose);
  return (
    <div {...renewBackdrop} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",
      display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0e1a2e",border:"1px solid #1e293b",
        borderRadius:14,padding:24,width:"min(540px,96vw)",boxShadow:"0 30px 80px rgba(0,0,0,.9)"}}>

        {/* Header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <div>
            <div style={{fontSize:15,fontWeight:800,color:"#edf4ff"}}>{isExtend?"📅 Extend":"🔄 Renew"} Campaign</div>
            <div style={{fontSize:12,color:"#4d6e8a",marginTop:2}}>{campaign.campaignName.trim()} · {campaign.platform} · {campaign.mediaPartner}</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#4d6e8a",fontSize:20,cursor:"pointer",lineHeight:1}}>×</button>
        </div>

        {/* Mode toggle */}
        <div style={{display:"flex",gap:6,marginBottom:20,background:"#07101c",borderRadius:9,padding:4}}>
          {[
            {key:"extend", icon:"📅", label:"Extend", desc:"Same campaign, new end date. Config stays intact, sync keeps working."},
            {key:"renew",  icon:"🔄", label:"Renew",  desc:"Fresh campaign row with clean metrics. Use when flight truly ends."},
          ].map(({key,icon,label,desc})=>(
            <button key={key} onClick={()=>setMode(key)}
              style={{flex:1,background:mode===key?"#0e1a2e":"none",
                border:`1px solid ${mode===key?"#00c896":"transparent"}`,
                borderRadius:7,padding:"10px 12px",cursor:"pointer",textAlign:"left"}}>
              <div style={{fontSize:12,fontWeight:700,color:mode===key?"#00e5a0":"#4d6e8a",marginBottom:3}}>
                {icon} {label}
              </div>
              <div style={{fontSize:10,color:mode===key?"#4d6e8a":"#2a3f55",lineHeight:1.4}}>{desc}</div>
            </button>
          ))}
        </div>

        {/* Apply to all platforms toggle */}
        {clientCampaigns.length > 1 && (
          <div onClick={()=>setApplyAll(v=>!v)} style={{background:applyAll?"#002e24":"#0a1525",
            border:`1px solid ${applyAll?"#00c896":"#1e293b"}`,borderRadius:8,padding:"10px 14px",
            marginBottom:16,cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:16,height:16,borderRadius:3,background:applyAll?"#00c896":"#162236",
              border:`1px solid ${applyAll?"#00c896":"#334155"}`,display:"flex",alignItems:"center",
              justifyContent:"center",flexShrink:0}}>
              {applyAll && <span style={{color:"#000",fontSize:11,fontWeight:900}}>✓</span>}
            </div>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:applyAll?"#00e5a0":"#7a9bbf"}}>
                {isExtend?"Extend":"Renew"} all {clientCampaigns.length} platforms for {campaign.campaignName.trim()}
              </div>
              <div style={{fontSize:10,color:"#3d5a72",marginTop:1}}>
                {clientCampaigns.map(c=>c.platform).join(" · ")}
              </div>
            </div>
          </div>
        )}

        {/* Renew-only: start date */}
        {!isExtend && (
          <div style={{marginBottom:14}}>
            <label style={labelS}>New Start Date</label>
            <DatePicker value={startDate} onChange={v=>setStartDate(v)}/>
          </div>
        )}

        {/* End date — label changes by mode */}
        <div style={{marginBottom:14}}>
          <label style={labelS}>{isExtend?"New End Date *":"New End Date *"}</label>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{flex:1}}>
              <DatePicker value={endDate} onChange={v=>setEndDate(v)} placeholder="Select end date…"/>
            </div>
            {isExtend && campaign.endDate && (
              <span style={{fontSize:11,color:"#3d5a72",whiteSpace:"nowrap"}}>
                Currently: {campaign.endDate}
              </span>
            )}
          </div>
        </div>

        {/* Goal */}
        <div style={{marginBottom:14}}>
          <label style={labelS}>Goal / Note 1
            {applyAll && clientCampaigns.length > 1 &&
              <span style={{color:"#3d5a72",textTransform:"none",fontWeight:400}}> — leave blank to keep each platform's goal</span>}
          </label>
          <input value={goal} onChange={e=>setGoal(e.target.value)}
            placeholder={campaign.note1 || "e.g. 125K/Mo — leave blank to keep existing"}
            style={iS}/>
        </div>

        {/* Contract value */}
        <div style={{marginBottom:16}}>
          <label style={labelS}>Contract Value ($) <span style={{color:"#3d5a72",textTransform:"none",fontWeight:400}}>— leave blank to keep existing</span></label>
          <input type="number" value={contractValue} onChange={e=>setContractValue(e.target.value)}
            placeholder={campaign.contractValue || "0.00"} style={iS}/>
        </div>

        {/* Info note */}
        <div style={{background:"#07101c",border:"1px solid #1a2744",borderRadius:7,
          padding:"9px 14px",marginBottom:20,fontSize:11,color:"#4d6e8a",lineHeight:1.5}}>
          {isExtend
            ? "📅 Extend updates the existing row — dates, goal, and contract value only. Metrics and sync data are preserved. Platform config stays intact."
            : "🔄 Renew creates new campaign rows with clean metrics and sync data. Original rows are kept. You'll need to update the platform config with any new campaign IDs."}
        </div>

        {/* Actions */}
        <div style={{display:"flex",gap:10}}>
          <button onClick={isExtend ? doExtend : doRenew} disabled={!canSubmit}
            style={{flex:1,background:canSubmit?"#00c896":"#162236",border:"none",borderRadius:8,
              padding:"11px 0",color:canSubmit?"#000":"#3d5a72",fontWeight:700,fontSize:14,
              cursor:canSubmit?"pointer":"default"}}>
            {isExtend?"📅":"🔄"} {isExtend?"Extend":"Renew"}{applyAll&&clientCampaigns.length>1?` All ${clientCampaigns.length} Platforms`:""}
          </button>
          <button onClick={onClose} style={{flex:1,background:"#162236",border:"1px solid #334155",
            borderRadius:8,padding:"11px 0",color:"#7a9bbf",fontWeight:600,fontSize:14,cursor:"pointer"}}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const today = getToday();
  const COLS = 12;
  const { confirm, dialog, onResolve } = useConfirm();

  const [campaigns, setCampaigns] = useState(()=>{ try { const s=localStorage.getItem(STORAGE_KEY); return s?JSON.parse(s):initialCampaigns; } catch { return initialCampaigns; } });
  const [reminders, setReminders] = useState(()=>{ try { const s=localStorage.getItem(REMINDERS_KEY); return s?JSON.parse(s):[]; } catch { return []; } });
  const [search, setSearch]       = useState("");
  const [fStatus, setFStatus]     = useState("all");
  const [fPlatforms, setFPlatforms] = useState(new Set());
  const [fMonthly, setFMonthly]   = useState(false);
  const [sortKey, setSortKey]     = useState("endDate");
  const [sortDir, setSortDir]     = useState("asc");
  const [editTarget, setEditTarget] = useState(null);
  const [showAdd, setShowAdd]     = useState(false);
  const [showExportReminder, setShowExportReminder] = useState(false);
  const [showReminderModal, setShowReminderModal]   = useState(null); // null=closed, true=open all, number=open focused on campaign
  const [renewTarget, setRenewTarget]               = useState(null);
  const [saved, setSaved]         = useState(false);
  const [expanded, setExpanded]   = useState(new Set());
  const [groupByClient, setGroupByClient]       = useState(false);
  const [fGoalHit, setFGoalHit]                 = useState(false);
  const [fCloseToGoal, setFCloseToGoal]         = useState(false);
  const [fExcludeGoalHit, setFExcludeGoalHit]   = useState(false);
  const [collapsedClients, setCollapsedClients] = useState(new Set());
  const [dragId, setDragId]       = useState(null);
  const [dragOverId, setDragOverId] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [bulkDraft, setBulkDraft] = useState({ note1:"", note2:"", status:"", lastChecked:"", history:"" });
  const [dateRange, setDateRange] = useState(()=>{ const p=getPresets(); return {preset:"mtd",...p.mtd}; });
  const [activeTab, setActiveTab] = useState("campaigns");

  // Count "behind" campaigns for the tab badge
  const behindCount = useMemo(()=>
    campaigns.filter(c=>{
      if(c.status!=="active") return false;
      const disp=resolveMetrics(c,dateRange.preset);
      const pacing=computeMonthlyPacing(disp.impressions,c.note1);
      return pacing?.label==="Behind";
    }).length
  ,[campaigns,dateRange.preset]);
  const [activityLog, setActivityLog] = useState(()=>{ try { const s=localStorage.getItem(ACTIVITY_KEY); return s?JSON.parse(s):[]; } catch { return []; } });
  const [archive, setArchive] = useState(()=>{ try { const s=localStorage.getItem(ARCHIVE_KEY); return s?JSON.parse(s):[]; } catch { return []; } });
  const [metaSyncStatus, setMetaSyncStatus] = useState(null);
  const [metaSyncInfo,   setMetaSyncInfo]   = useState(null);
  const [ttdSyncStatus,  setTtdSyncStatus]  = useState(null);
  const [ttdSyncInfo,    setTtdSyncInfo]    = useState(null);
  const [dspSyncStatus,    setDspSyncStatus]    = useState(null);
  const [dspSyncInfo,      setDspSyncInfo]      = useState(null);
  const [googleSyncStatus, setGoogleSyncStatus] = useState(null);
  const [googleSyncInfo,   setGoogleSyncInfo]   = useState(null);
  const [snapSyncStatus,   setSnapSyncStatus]   = useState(null);
  const [snapSyncInfo,     setSnapSyncInfo]     = useState(null);
  useEffect(()=>{
    async function syncMeta() {
      setMetaSyncStatus("syncing");
      try {
        const resp = await fetch("campaigns.json?t="+Date.now());
        if (!resp.ok) throw new Error("campaigns.json not found");
        const data = await resp.json();
        if (!data.campaigns||data.campaigns.length===0) { setMetaSyncStatus("done"); setMetaSyncInfo({last_updated:data.last_updated,fetched_count:0}); return; }
        const metaMap={};
        data.campaigns.forEach(c=>{ metaMap[c.tracker_id]=c; });
        const syncedAt=data.last_updated||new Date().toISOString();
        setCampaigns(cs=>cs.map(campaign=>{
          const meta=metaMap[campaign.id];
          if (!meta||!meta.snapshots) return campaign;
          return {...campaign, metaSnapshots:meta.snapshots, metaSyncedAt:syncedAt};
        }));
        setMetaSyncStatus("done");
        setMetaSyncInfo({last_updated:data.last_updated,fetched_count:data.fetched_count,errors:data.errors||[]});
      } catch(e) {
        console.warn("Meta sync skipped:",e.message);
        setMetaSyncStatus("error");
        setMetaSyncInfo({error:e.message});
      }
    }
    async function syncTTD() {
      setTtdSyncStatus("syncing");
      try {
        const resp = await fetch("ttd_campaigns.json?t="+Date.now());
        if (!resp.ok) throw new Error("ttd_campaigns.json not found");
        const data = await resp.json();
        if (!data.campaigns||data.campaigns.length===0) { setTtdSyncStatus("done"); setTtdSyncInfo({last_updated:data.last_updated,fetched_count:0}); return; }
        const ttdMap={};
        data.campaigns.forEach(c=>{ ttdMap[c.tracker_id]=c; });
        const syncedAt=data.last_updated||new Date().toISOString();
        setCampaigns(cs=>cs.map(campaign=>{
          const ttd=ttdMap[campaign.id];
          if (!ttd||!ttd.snapshots) return campaign;
          return {...campaign, ttdSnapshots:ttd.snapshots, ttdSyncedAt:syncedAt};
        }));
        setTtdSyncStatus("done");
        setTtdSyncInfo({last_updated:data.last_updated,fetched_count:data.fetched_count,errors:data.errors||[]});
      } catch(e) {
        console.warn("TTD sync skipped:",e.message);
        setTtdSyncStatus("error");
        setTtdSyncInfo({error:e.message});
      }
    }
    async function syncDSP() {
      setDspSyncStatus("syncing");
      try {
        const resp = await fetch("dsp_campaigns.json?t="+Date.now());
        if (!resp.ok) throw new Error("dsp_campaigns.json not found");
        const data = await resp.json();
        if (!data.campaigns||data.campaigns.length===0) { setDspSyncStatus("done"); setDspSyncInfo({last_updated:data.last_updated,fetched_count:0}); return; }
        const dspMap={};
        data.campaigns.forEach(c=>{ dspMap[c.tracker_id]=c; });
        const syncedAt=data.last_updated||new Date().toISOString();
        setCampaigns(cs=>cs.map(campaign=>{
          const dsp=dspMap[campaign.id];
          if (!dsp||!dsp.snapshots) return campaign;
          return {...campaign, dspSnapshots:dsp.snapshots, dspSyncedAt:syncedAt};
        }));
        setDspSyncStatus("done");
        setDspSyncInfo({last_updated:data.last_updated,fetched_count:data.fetched_count,errors:data.errors||[]});
      } catch(e) {
        console.warn("DSP sync skipped:",e.message);
        setDspSyncStatus("error");
        setDspSyncInfo({error:e.message});
      }
    }
    async function syncGoogle() {
      setGoogleSyncStatus("syncing");
      try {
        const resp = await fetch("google_ads_campaigns.json?t="+Date.now());
        if (!resp.ok) throw new Error("google_ads_campaigns.json not found");
        const data = await resp.json();
        if (!data.campaigns||data.campaigns.length===0) { setGoogleSyncStatus("done"); setGoogleSyncInfo({last_updated:data.last_updated,fetched_count:0}); return; }
        const googleMap={};
        data.campaigns.forEach(c=>{ googleMap[c.tracker_id]=c; });
        const syncedAt=data.last_updated||new Date().toISOString();
        setCampaigns(cs=>cs.map(campaign=>{
          const g=googleMap[campaign.id];
          if (!g||!g.snapshots) return campaign;
          return {...campaign, googleSnapshots:g.snapshots, googleSyncedAt:syncedAt};
        }));
        setGoogleSyncStatus("done");
        setGoogleSyncInfo({last_updated:data.last_updated,fetched_count:data.fetched_count,errors:data.errors||[]});
      } catch(e) {
        console.warn("Google Ads sync skipped:",e.message);
        setGoogleSyncStatus("error");
        setGoogleSyncInfo({error:e.message});
      }
    }
    async function syncSnap() {
      setSnapSyncStatus("syncing");
      try {
        const resp = await fetch("snap_campaigns.json?t="+Date.now());
        if (!resp.ok) throw new Error("snap_campaigns.json not found");
        const data = await resp.json();
        if (!data.campaigns||data.campaigns.length===0) { setSnapSyncStatus("done"); setSnapSyncInfo({last_updated:data.last_updated,fetched_count:0}); return; }
        const snapMap={};
        data.campaigns.forEach(c=>{ snapMap[c.tracker_id]=c; });
        const syncedAt=data.last_updated||new Date().toISOString();
        setCampaigns(cs=>cs.map(campaign=>{
          const s=snapMap[campaign.id];
          if (!s||!s.snapshots) return campaign;
          return {...campaign, snapSnapshots:s.snapshots, snapSyncedAt:syncedAt};
        }));
        setSnapSyncStatus("done");
        setSnapSyncInfo({last_updated:data.last_updated,fetched_count:data.fetched_count,errors:data.errors||[]});
      } catch(e) {
        console.warn("Snap sync skipped:",e.message);
        setSnapSyncStatus("error");
        setSnapSyncInfo({error:e.message});
      }
    }
    syncMeta();
    syncTTD();
    syncDSP();
    syncGoogle();
    syncSnap();
  },[]);

  function addLog(entry) {
    setActivityLog(prev => {
      const next = [{ id: Date.now() + Math.random(), ts: Date.now(), ...entry }, ...prev].slice(0, MAX_LOG_ENTRIES);
      try { localStorage.setItem(ACTIVITY_KEY, JSON.stringify(next)); } catch(e) { console.error(e); }
      return next;
    });
  }

  function handleExtend(updatedCampaign) {
    setCampaigns(cs => cs.map(c => c.id === updatedCampaign.id ? updatedCampaign : c));
    addLog({type:"edited",campaignName:updatedCampaign.campaignName,partner:updatedCampaign.mediaPartner,
      platform:updatedCampaign.platform,detail:`Extended to ${updatedCampaign.endDate}`,
      campaignId:updatedCampaign.id,prevSnapshot:null});
  }

  function handleRenew(newCampaigns, originalCampaign) {
    setCampaigns(cs => {
      const idx = cs.findIndex(c => c.id === originalCampaign.id);
      const next = [...cs];
      // Insert all new campaigns right after the first original
      newCampaigns.forEach((nc, i) => next.splice(idx + 1 + i, 0, nc));
      return next;
    });
    newCampaigns.forEach(nc => {
      addLog({type:"created",campaignName:nc.campaignName,partner:nc.mediaPartner,
        platform:nc.platform,detail:`Renewed from "${originalCampaign.campaignName}" · ${originalCampaign.endDate} → ${nc.endDate}`,
        campaignId:nc.id,prevSnapshot:null});
    });
    setRenewTarget(null);
  }

  async function handleUndo(entry) {
    const label = entry.campaignName || "campaign";
    if (entry.type === "deleted" && entry.prevSnapshot) {
      // Restore deleted campaign
      if (!await confirm({title:`Restore "${label}"?`,confirmLabel:"Restore"})) return;
      setCampaigns(cs => [...cs, entry.prevSnapshot]);
      setActivityLog(prev => {
        const next = prev.map(e => e.id === entry.id ? { ...e, undone: true } : e);
        try { localStorage.setItem(ACTIVITY_KEY, JSON.stringify(next)); } catch(e) {}
        return next;
      });
    } else if (entry.type === "created" || entry.type === "duplicated") {
      // Undo creation/duplication = delete the campaign
      if (!await confirm({title:`Undo creation of "${label}"?`,message:"This will delete the campaign.",confirmLabel:"Delete",danger:true})) return;
      setCampaigns(cs => cs.filter(c => c.id !== entry.campaignId));
      setActivityLog(prev => {
        const next = prev.map(e => e.id === entry.id ? { ...e, undone: true } : e);
        try { localStorage.setItem(ACTIVITY_KEY, JSON.stringify(next)); } catch(e) {}
        return next;
      });
    } else if (entry.prevSnapshot) {
      // Restore previous state of campaign (status, metrics, edited, checked)
      const actionLabel = { status:"status change", metrics:"metrics update", checked:"check-in", edited:"edit" }[entry.type] || "change";
      if (!await confirm({title:`Undo ${actionLabel} for "${label}"?`,message:"This restores the previous values.",confirmLabel:"Undo"})) return;
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
  useEffect(()=>{ try { localStorage.setItem(ARCHIVE_KEY,JSON.stringify(archive)); } catch(e){console.error(e);} },[archive]);
  useEffect(()=>{ const last=localStorage.getItem(EXPORT_KEY); if(!last){setShowExportReminder(true);return;} if((Date.now()-parseInt(last))/(1000*60*60*24)>=3) setShowExportReminder(true); },[]);

  // One-time cleanup: clear closeToGoal on any campaign that also has goalHit set
  useEffect(()=>{
    const hasBoth = campaigns.some(c=>c.goalHit&&c.closeToGoal);
    if (hasBoth) setCampaigns(cs=>cs.map(c=>c.goalHit&&c.closeToGoal?{...c,closeToGoal:false}:c));
  },[]);


  // Auto-archive campaigns ended 5+ days ago — runs once on mount only
  const didAutoArchive = useRef(false);
  useEffect(()=>{
    if (didAutoArchive.current) return;
    didAutoArchive.current = true;
    const cutoff = new Date(); cutoff.setHours(0,0,0,0); cutoff.setDate(cutoff.getDate()-ARCHIVE_DAYS);
    const cutoffStr = cutoff.toISOString().slice(0,10);
    const toArchive = campaigns.filter(c=>c.endDate && c.endDate<=cutoffStr);
    if (toArchive.length===0) return;
    const archiveIds = new Set(archive.map(a=>a.id));
    const newEntries = toArchive.filter(c=>!archiveIds.has(c.id)).map(c=>{
      const tod = getToday(); const [y,m,d]=tod.split("-"); const stamp=`${m}/${d}/${y}`;
      const archiveNote = `${stamp} — Campaign archived (ended ${c.endDate})`;
      return {...c, archivedDate:tod, history: c.history&&c.history.trim() ? `${archiveNote}\n${c.history}` : archiveNote};
    });
    if (newEntries.length===0) return;
    const updatedArchive = [...newEntries, ...archive];
    try {
      localStorage.setItem(ARCHIVE_KEY, JSON.stringify(updatedArchive));
      setArchive(updatedArchive);
      setCampaigns(cs=>cs.filter(c=>!newEntries.find(a=>a.id===c.id)));
    } catch(e) {
      console.error("Archive write failed — campaigns preserved:", e);
    }
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  const platforms = useMemo(()=>{ const used=new Set(campaigns.map(c=>c.platform)); return [...ALL_PLATFORMS.filter(p=>used.has(p)), ...[...used].filter(p=>!ALL_PLATFORMS.includes(p)).sort()]; },[campaigns]);
  const filtered  = useMemo(()=>{
    let list = campaigns.filter(c=>{
      const q=search.toLowerCase();
      const ms=!q||c.campaignName.toLowerCase().includes(q)||c.mediaPartner.toLowerCase().includes(q)||c.platform.toLowerCase().includes(q);
      const hasReminder = reminders.some(r=>!r.dismissed&&r.campaignId===c.id);
      if(sortKey==="reminder" && !hasReminder) return false;
      if(fGoalHit) {
        const disp=resolveMetrics(c,dateRange.preset);
        const pacing=computeMonthlyPacing(disp.impressions,c.note1);
        if(!(c.goalHit||(pacing&&pacing.pct>=1))) return false;
      }
      if(fCloseToGoal) {
        const disp=resolveMetrics(c,dateRange.preset);
        const pacing=computeMonthlyPacing(disp.impressions,c.note1);
        const isGoalHit = c.goalHit||(pacing&&pacing.pct>=1);
        if(isGoalHit) return false; // goal hit takes priority — never show in close-to-goal filter
        if(!(c.closeToGoal||(pacing&&pacing.pct>=0.8&&pacing.pct<1))) return false;
      }
      if(fExcludeGoalHit) {
        const disp=resolveMetrics(c,dateRange.preset);
        const pacing=computeMonthlyPacing(disp.impressions,c.note1);
        if(c.goalHit||(pacing&&pacing.pct>=1)) return false;
      }
      return ms&&(fStatus==="all"||(c.status||"")===fStatus)&&(fPlatforms.size===0||fPlatforms.has(c.platform))&&(!fMonthly||c.monthlyFlight);
    });
    return [...list].sort((a,b)=>{
      if(sortKey==="reminder"){
        const getNext = c => { const rs=reminders.filter(r=>!r.dismissed&&r.campaignId===c.id).map(r=>r.date).sort(); return rs[0]||""; };
        const va=getNext(a),vb=getNext(b); return va<vb?-1:va>vb?1:0;
      }
      let va=a[sortKey]||"",vb=b[sortKey]||"";
      if(sortKey==="endDate"){va=new Date(va);vb=new Date(vb);}
      return va<vb?(sortDir==="asc"?-1:1):va>vb?(sortDir==="asc"?1:-1):0;
    });
  },[campaigns,reminders,search,fStatus,fPlatforms,fMonthly,fGoalHit,fCloseToGoal,fExcludeGoalHit,sortKey,sortDir,dateRange.preset]);

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
  function toggleClient(name){ setCollapsedClients(prev=>{ const n=new Set(prev); n.has(name)?n.delete(name):n.add(name); return n; }); }
  const dragIdRef = useRef(null);
  function onDragStart(e, id){ dragIdRef.current = id; setDragId(id); e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", String(id)); }
  function onDragOver(e,id){ e.preventDefault(); e.dataTransfer.dropEffect = "move"; setDragOverId(id); }
  function onDrop(e,targetId){
    e.preventDefault();
    const sourceId = dragIdRef.current || Number(e.dataTransfer.getData("text/plain"));
    if(!sourceId||sourceId===targetId){ setDragId(null); setDragOverId(null); dragIdRef.current=null; return; }
    setCampaigns(cs=>{ const from=cs.findIndex(c=>c.id===sourceId),to=cs.findIndex(c=>c.id===targetId); const next=[...cs]; const [m]=next.splice(from,1); next.splice(to,0,m); return next; });
    setDragId(null); setDragOverId(null); dragIdRef.current=null;
  }
  function onDragEnd(){ setDragId(null); setDragOverId(null); dragIdRef.current=null; }
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
  function applyBulkEdit() {
    const updates = {};
    if (bulkDraft.note1.trim()) updates.note1 = bulkDraft.note1.trim();
    if (bulkDraft.note2.trim()) updates.note2 = bulkDraft.note2.trim();
    if (bulkDraft.status) updates.status = bulkDraft.status;
    if (bulkDraft.lastChecked) updates.lastChecked = bulkDraft.lastChecked;
    const historyEntry = bulkDraft.history.trim();
    if (Object.keys(updates).length === 0 && !historyEntry) return;
    const datePrefix = `${today} — `;
    setCampaigns(cs => cs.map(c => {
      if (!selectedIds.has(c.id)) return c;
      const newUpdates = {...updates};
      if (historyEntry) {
        const line = historyEntry.startsWith(datePrefix) ? historyEntry : `${datePrefix}${historyEntry}`;
        newUpdates.history = c.history && c.history.trim() ? `${line}\n${c.history}` : line;
      }
      const updated = {...c, ...newUpdates};
      addLog({type:"edited", campaignName:c.campaignName, partner:c.mediaPartner, platform:c.platform,
        detail:`Bulk edit: ${[...Object.entries(updates).map(([k,v])=>`${k}="${v}"`), historyEntry?`history+="${historyEntry}"`:""].filter(Boolean).join(", ")}`,
        prevSnapshot:{...c}, campaignId:c.id});
      return updated;
    }));
    setSelectedIds(new Set());
    setShowBulkEdit(false);
    setBulkDraft({ note1:"", note2:"", status:"", lastChecked:"", history:"" });
  }

  async function handleRestore(c) {
    if (!await confirm({title:`Restore "${c.campaignName}"?`,message:"It will move back to your active campaigns.",confirmLabel:"Restore"})) return;
    const today = getToday(); const [y,m,d]=today.split("-"); const stamp=`${m}/${d}/${y}`;
    const restoreNote = `${stamp} — Campaign restored from archive`;
    const updatedHistory = c.history&&c.history.trim() ? `${restoreNote}\n${c.history}` : restoreNote;
    setCampaigns(cs=>[...cs,{...c,archivedDate:undefined,history:updatedHistory}]);
    setArchive(prev=>prev.filter(a=>a.id!==c.id));
  }

  function sort(k){ if(sortKey===k) setSortDir(d=>d==="asc"?"desc":"asc"); else { setSortKey(k); setSortDir("asc"); } }

  const doExport = () => {
    try {
      const payload = {
        campaigns,
        reminders,
        archive,
        activityLog,
        exportDate: new Date().toISOString(),
        exportVersion: 2,
      };
      const b=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
      const url=URL.createObjectURL(b); const a=document.createElement("a");
      a.href=url; a.download=`campaign-tracker-${today}.json`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
      localStorage.setItem(EXPORT_KEY,Date.now().toString()); setShowExportReminder(false);
    } catch(e){ alert("Export failed: "+e.message); }
  };

  const doImport = (e) => {
    const file=e.target.files[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=async evt=>{
      try {
        const p=JSON.parse(evt.target.result);

        // Validate top-level structure
        if (!p || typeof p !== "object") { alert("❌ Invalid file — not a valid JSON object."); return; }
        if (!p.campaigns || !Array.isArray(p.campaigns)) { alert("❌ Invalid file — missing campaigns array."); return; }

        // Validate each campaign has required fields
        const requiredFields = ["id","campaignName","mediaPartner","platform"];
        const badCampaigns = p.campaigns.filter(c => !c || requiredFields.some(f => c[f]==null));
        if (badCampaigns.length > 0) {
          alert(`❌ Import aborted — ${badCampaigns.length} campaign(s) are missing required fields (id, campaignName, mediaPartner, platform). File may be corrupted.`);
          return;
        }

        // Check for duplicate IDs within the import file
        const ids = p.campaigns.map(c=>c.id);
        const uniqueIds = new Set(ids);
        if (uniqueIds.size !== ids.length) {
          const dupes = ids.filter((id,i)=>ids.indexOf(id)!==i);
          console.warn("Duplicate IDs in import:", dupes);
          // Don't block — just warn, duplicates can happen from copy-paste errors
        }

        const archiveData = Array.isArray(p.archive) ? p.archive : [];
        const reminderData = Array.isArray(p.reminders) ? p.reminders : [];
        const logData = Array.isArray(p.activityLog) ? p.activityLog : [];

        const summary = [
          `${p.campaigns.length} campaign${p.campaigns.length!==1?"s":""}`,
          archiveData.length>0 ? `${archiveData.length} archived` : null,
          reminderData.length>0 ? `${reminderData.length} reminder${reminderData.length!==1?"s":""}` : null,
          logData.length>0 ? `${logData.length} activity log entries` : null,
          p.exportDate ? `exported ${new Date(p.exportDate).toLocaleDateString()}` : null,
        ].filter(Boolean).join(", ");

        if (!await confirm({title:`Import ${summary}?`,message:"This will replace ALL current data including your archive. Make sure you've exported first.",confirmLabel:"Import",danger:true})) return;

        // Write to localStorage first — if any fail, abort before touching state
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(p.campaigns));
          localStorage.setItem(ARCHIVE_KEY, JSON.stringify(archiveData));
          localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminderData));
          if (logData.length > 0) localStorage.setItem(ACTIVITY_KEY, JSON.stringify(logData));
        } catch(storageErr) {
          alert("❌ Import failed — could not write to storage (possibly full). No data was changed.\n\n" + storageErr.message);
          return;
        }

        // All writes succeeded — now update state
        setCampaigns(p.campaigns);
        setArchive(archiveData);
        setReminders(reminderData);
        if (logData.length > 0) setActivityLog(logData);

        alert(`✅ Import successful!\n\n${summary}`);
      } catch(parseErr) {
        alert("❌ Couldn't read file — it may be corrupted or not a valid tracker export.\n\n" + parseErr.message);
      }
    };
    reader.readAsText(file);
    e.target.value="";
  };

  const doExportCSV = () => {
    try {
      const headers = ["Media Partner","Campaign Name","Platform","Status","Goal","Start Date","End Date","Last Checked","Monthly Flight","Impressions","CTR","CPM","Spend","Completion Rate","Note 1","Note 2","Projection URL","Folder Path","Change History"];
      const rows = campaigns.map(c => [
        c.mediaPartner, c.campaignName, c.platform,
        STATUS_CFG[c.status]?.label||c.status||"",
        c.goal, c.startDate||"", c.endDate, c.lastChecked,
        c.monthlyFlight?"Yes":"No",
        c.impressions||"", c.ctr||"", c.cpm||"", c.spend||"",
        c.note1||"", c.note2||"", c.projectionUrl||"", c.folderPath||"",
        (c.history||"").replace(/\n/g," | ")
      ].map(v => `"${String(v).replace(/"/g,'""')}"`));
      const csv = [headers.map(h=>`"${h}"`).join(","), ...rows.map(r=>r.join(","))].join("\n");
      const b = new Blob([csv], {type:"text/csv"});
      const url = URL.createObjectURL(b); const a = document.createElement("a");
      a.href=url; a.download=`campaigns-${today}.csv`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    } catch(e){ alert("CSV export failed: "+e.message); }
  };

  const TH = ({k,label,style={}}) => (
    <th onClick={()=>k&&sort(k)} style={{padding:"11px 13px",textAlign:"left",fontSize:12,fontWeight:700,color:sortKey===k?"#00e5a0":"#4d6e8a",textTransform:"uppercase",letterSpacing:"0.07em",whiteSpace:"nowrap",cursor:k?"pointer":"default",userSelect:"none",borderBottom:"1px solid #1e293b",...style}}>
      {label}{sortKey===k?(sortDir==="asc"?" ↑":" ↓"):""}
    </th>
  );
  const TD = ({children,style={}}) => <td style={{padding:"9px 12px",borderBottom:"1px solid #060c18",verticalAlign:"middle",...style}}>{children}</td>;

  return (
    <div style={{minHeight:"100vh",background:"#070d16",fontFamily:"'Inter','Segoe UI',sans-serif",color:"#d8eaf8",fontSize:14}}>
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
        <div style={{maxWidth:1920,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:17,fontWeight:800,color:"#00e5a0",letterSpacing:"-0.03em"}}>Campaign Tracker</span>
            <span style={{fontSize:11,padding:"2px 7px",borderRadius:4,background:saved?"#00200f":"transparent",color:saved?"#00d48a":"transparent",border:saved?"1px solid #22c55e40":"1px solid transparent",transition:"all .3s",fontWeight:600}}>✓ Saved</span>
            {metaSyncStatus==="syncing" && <span style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:"#0e1a2e",border:"1px solid #3b82f640",color:"#60a5fa",fontWeight:600}}>⟳ Syncing Meta…</span>}
            {metaSyncStatus==="done" && metaSyncInfo?.fetched_count>0 && <span title={"Last updated: "+(metaSyncInfo.last_updated||"")} style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:"#002018",border:"1px solid #00c89640",color:"#00d48a",fontWeight:600,cursor:"default"}}>⬡ Meta: {metaSyncInfo.fetched_count} synced</span>}
            {metaSyncStatus==="error" && <span title={metaSyncInfo?.error} style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:"#1a0808",border:"1px solid #ef444440",color:"#ef4444",fontWeight:600,cursor:"help"}}>⚠ Meta sync —</span>}
            {ttdSyncStatus==="syncing" && <span style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:"#0e1a2e",border:"1px solid #3b82f640",color:"#60a5fa",fontWeight:600}}>⟳ Syncing TTD…</span>}
            {ttdSyncStatus==="done" && ttdSyncInfo?.fetched_count>0 && <span title={"Last updated: "+(ttdSyncInfo.last_updated||"")} style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:"#002018",border:"1px solid #00c89640",color:"#00d48a",fontWeight:600,cursor:"default"}}>⬡ TTD: {ttdSyncInfo.fetched_count} synced</span>}
            {ttdSyncStatus==="error" && <span title={ttdSyncInfo?.error} style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:"#1a0808",border:"1px solid #ef444440",color:"#ef4444",fontWeight:600,cursor:"help"}}>⚠ TTD sync —</span>}
            {dspSyncStatus==="syncing" && <span style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:"#0e1a2e",border:"1px solid #3b82f640",color:"#60a5fa",fontWeight:600}}>⟳ Syncing DSP…</span>}
            {dspSyncStatus==="done" && dspSyncInfo?.fetched_count>0 && <span title={"Last updated: "+(dspSyncInfo.last_updated||"")} style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:"#001a10",border:"1px solid #34d39940",color:"#34d399",fontWeight:600,cursor:"default"}}>⬡ DSP: {dspSyncInfo.fetched_count} synced</span>}
            {dspSyncStatus==="error" && <span title={dspSyncInfo?.error} style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:"1a0808",border:"1px solid #ef444440",color:"#ef4444",fontWeight:600,cursor:"help"}}>⚠ DSP sync —</span>}
            {googleSyncStatus==="syncing" && <span style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:"#0e1a2e",border:"1px solid #3b82f640",color:"#60a5fa",fontWeight:600}}>⟳ Syncing Google…</span>}
            {googleSyncStatus==="done" && googleSyncInfo?.fetched_count>0 && <span title={"Last updated: "+(googleSyncInfo.last_updated||"")} style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:"#1a1000",border:"1px solid #f59e0b40",color:"#f59e0b",fontWeight:600,cursor:"default"}}>⬡ Google: {googleSyncInfo.fetched_count} synced</span>}
            {googleSyncStatus==="error" && <span title={googleSyncInfo?.error} style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:"#1a0808",border:"1px solid #ef444440",color:"#ef4444",fontWeight:600,cursor:"help"}}>⚠ Google sync —</span>}
            {snapSyncStatus==="syncing" && <span style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:"#0e1a2e",border:"1px solid #3b82f640",color:"#60a5fa",fontWeight:600}}>⟳ Syncing Snap…</span>}
            {snapSyncStatus==="done" && snapSyncInfo?.fetched_count>0 && <span title={"Last updated: "+(snapSyncInfo.last_updated||"")} style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:"#1a0010",border:"1px solid #f9a8d440",color:"#f9a8d4",fontWeight:600,cursor:"default"}}>⬡ Snap: {snapSyncInfo.fetched_count} synced</span>}
            {snapSyncStatus==="error" && <span title={snapSyncInfo?.error} style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:"#1a0808",border:"1px solid #ef444440",color:"#ef4444",fontWeight:600,cursor:"help"}}>⚠ Snap sync —</span>}
          </div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            <button onClick={()=>setShowReminderModal(true)} style={{position:"relative",background:pendingReminders>0?"#130a00":"#0e1a2e",border:`1px solid ${pendingReminders>0?"#f59e0b60":"#1e293b"}`,borderRadius:7,padding:"6px 13px",color:pendingReminders>0?"#f59e0b":"#4d6e8a",fontWeight:600,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
              🔔 Reminders
              {pendingReminders>0 && <span style={{background:"#ef4444",color:"#fff",borderRadius:10,padding:"0px 5px",fontSize:10,fontWeight:700,minWidth:16,textAlign:"center"}}>{pendingReminders}</span>}
            </button>
            <button onClick={()=>{ setCampaigns(cs=>cs.map(c=>({...c,lastChecked:today}))); addLog({type:"checked",campaignName:"All campaigns",partner:"",platform:"",detail:`Bulk marked all checked on ${today}`}); }} style={{background:"#002e24",border:"1px solid #3b82f640",borderRadius:7,padding:"6px 13px",color:"#00e5a0",fontWeight:600,fontSize:13,cursor:"pointer"}}>✓ Mark All Checked</button>
            <button onClick={()=>setShowAdd(true)} style={{background:"#00200f",border:"1px solid #22c55e40",borderRadius:7,padding:"6px 13px",color:"#00d48a",fontWeight:600,fontSize:13,cursor:"pointer"}}>+ Add Campaign</button>
            <button onClick={doExport} style={{background:"#162236",border:"1px solid #334155",borderRadius:7,padding:"6px 13px",color:"#7a9bbf",fontWeight:600,fontSize:13,cursor:"pointer"}}>↓ JSON</button>
            <button onClick={doExportCSV} style={{background:"#162236",border:"1px solid #334155",borderRadius:7,padding:"6px 13px",color:"#7a9bbf",fontWeight:600,fontSize:13,cursor:"pointer"}}>↓ CSV</button>
            <label style={{background:"#162236",border:"1px solid #334155",borderRadius:7,padding:"6px 13px",color:"#7a9bbf",fontWeight:600,fontSize:13,cursor:"pointer",whiteSpace:"nowrap"}}>
              ↑ Import<input type="file" accept=".json" style={{display:"none"}} onChange={doImport}/>
            </label>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1920,margin:"0 auto",padding:"18px 20px 40px"}}>

        {/* Tab Bar — always visible */}
        <div style={{borderBottom:"1px solid #1e293b",marginBottom:18}}>
          <div style={{display:"flex",gap:0,flexWrap:"wrap"}}>
            {[
              {key:"campaigns", label:"📋 Campaigns"},
              {key:"pacing",    label:"📈 Pacing", badge: behindCount},
              {key:"revenue",   label:"💰 Revenue"},
              {key:"activity",  label:"📜 Activity Log"},
              {key:"archive",   label:"🗄️ Archive"},
              {key:"config",    label:"⚙️ Config"},
              {key:"ai",        label:"⚡ Zeus"},
            ].map(t=>(
              <button key={t.key} onClick={()=>setActiveTab(t.key)}
                style={{background:"none",border:"none",borderBottom:activeTab===t.key?"2px solid #00e5a0":"2px solid transparent",
                  padding:"9px 18px",color:activeTab===t.key?"#00e5a0":"#4d6e8a",fontSize:13,fontWeight:activeTab===t.key?700:400,
                  cursor:"pointer",transition:"all .15s",marginBottom:-1,display:"flex",alignItems:"center",gap:6,whiteSpace:"nowrap"}}>
                {t.label}
                {t.badge>0&&<span style={{background:"#fde04722",border:"1px solid #fde04760",borderRadius:10,padding:"1px 7px",fontSize:10,fontWeight:800,color:"#fde047",lineHeight:1.4}}>{t.badge}</span>}
              </button>
            ))}
          </div>
        </div>

        {activeTab==="archive" ? (
          <CampaignArchive archive={archive} onRestore={handleRestore} onClear={()=>setArchive([])}/>
        ) : activeTab==="ai" ? (
          <AIAdvisor campaigns={campaigns} archive={archive} reminders={reminders} dateRange={dateRange}/>
        ) : activeTab==="config" ? (
          <PlatformConfig campaigns={campaigns}
            metaSyncStatus={metaSyncStatus}   metaSyncInfo={metaSyncInfo}
            ttdSyncStatus={ttdSyncStatus}     ttdSyncInfo={ttdSyncInfo}
            dspSyncStatus={dspSyncStatus}     dspSyncInfo={dspSyncInfo}
            googleSyncStatus={googleSyncStatus} googleSyncInfo={googleSyncInfo}
            snapSyncStatus={snapSyncStatus}   snapSyncInfo={snapSyncInfo}
          />
        ) : activeTab==="activity" ? (
          <ActivityLog log={activityLog} campaigns={campaigns} onUndo={handleUndo} onClear={async()=>{ if(await confirm({title:"Clear activity log?",message:"This cannot be undone.",confirmLabel:"Clear",danger:true})){ setActivityLog([]); try{localStorage.removeItem(ACTIVITY_KEY);}catch(e){} }}} />
        ) : activeTab==="pacing" ? (
          <PacingDashboard campaigns={campaigns} dateRange={dateRange} setDateRange={setDateRange} onEdit={(camp)=>setEditTarget(camp)}/>
        ) : activeTab==="revenue" ? (
          <RevenueDashboard campaigns={[...campaigns,...archive]}/>
        ) : (<>
        <ReminderAlertBanner reminders={reminders} onOpen={()=>setShowReminderModal(true)} onDismissAll={()=>setReminders(prev=>prev.map(r=>r.date<=today?{...r,dismissed:true}:r))}/>

        {/* Bulk Edit Bar */}
        {selectedIds.size>0 && (
          <div style={{background:"#001e14",border:"1px solid #00c89660",borderRadius:10,padding:"12px 18px",marginBottom:14,display:"flex",alignItems:"center",flexWrap:"wrap",gap:12}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{background:"#00c896",color:"#000",borderRadius:6,padding:"2px 9px",fontSize:12,fontWeight:800}}>{selectedIds.size}</span>
              <span style={{fontSize:13,color:"#00e5a0",fontWeight:700}}>campaign{selectedIds.size!==1?"s":""} selected</span>
            </div>
            {!showBulkEdit ? (
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <button onClick={()=>setShowBulkEdit(true)} style={{background:"#002e24",border:"1px solid #00c89650",borderRadius:7,padding:"7px 16px",color:"#00e5a0",fontSize:13,fontWeight:700,cursor:"pointer"}}>✏️ Bulk Edit</button>
                <button onClick={()=>{ setCampaigns(cs=>cs.map(c=>selectedIds.has(c.id)?{...c,lastChecked:today}:c)); setSelectedIds(new Set()); }} style={{background:"#002018",border:"1px solid #22c55e40",borderRadius:7,padding:"7px 14px",color:"#00d48a",fontSize:13,fontWeight:600,cursor:"pointer"}}>✓ Mark All Checked</button>
                <button onClick={()=>setSelectedIds(new Set())} style={{background:"none",border:"1px solid #1e293b",borderRadius:7,padding:"7px 12px",color:"#4d6e8a",fontSize:13,cursor:"pointer"}}>Clear</button>
              </div>
            ) : (
              <div style={{flex:1,background:"#0a1c2e",border:"1px solid #1e3a50",borderRadius:9,padding:"14px 18px",display:"flex",flexDirection:"column",gap:12}}>
                <div style={{fontSize:12,color:"#00e5a0",fontWeight:700,marginBottom:2}}>Bulk Edit — changes apply to all {selectedIds.size} selected campaigns</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10}}>
                  <div>
                    <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Note 1 <span style={{color:"#3d5a72",textTransform:"none",fontWeight:400}}>(leave blank to keep)</span></label>
                    <input value={bulkDraft.note1} onChange={e=>setBulkDraft(p=>({...p,note1:e.target.value}))} placeholder="e.g. Creative updated 3/18" style={{width:"100%",background:"#162236",border:"1px solid #334155",borderRadius:6,padding:"7px 10px",color:"#d8eaf8",fontSize:13,boxSizing:"border-box",fontFamily:"inherit"}}/>
                  </div>
                  <div>
                    <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Note 2 <span style={{color:"#3d5a72",textTransform:"none",fontWeight:400}}>(leave blank to keep)</span></label>
                    <input value={bulkDraft.note2} onChange={e=>setBulkDraft(p=>({...p,note2:e.target.value}))} placeholder="e.g. FB, SP, DSP creative swap" style={{width:"100%",background:"#162236",border:"1px solid #334155",borderRadius:6,padding:"7px 10px",color:"#d8eaf8",fontSize:13,boxSizing:"border-box",fontFamily:"inherit"}}/>
                  </div>
                  <div>
                    <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Status <span style={{color:"#3d5a72",textTransform:"none",fontWeight:400}}>(leave blank to keep)</span></label>
                    <select value={bulkDraft.status} onChange={e=>setBulkDraft(p=>({...p,status:e.target.value}))} style={{width:"100%",background:"#162236",border:"1px solid #334155",borderRadius:6,padding:"7px 10px",color:"#d8eaf8",fontSize:13,fontFamily:"inherit"}}>
                      <option value="">— No change —</option>
                      {Object.entries(STATUS_CFG).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{display:"block",fontSize:10,color:"#7a9bbf",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Last Checked Date <span style={{color:"#3d5a72",textTransform:"none",fontWeight:400}}>(leave blank to keep)</span></label>
                    <DatePicker value={bulkDraft.lastChecked} onChange={v=>setBulkDraft(p=>({...p,lastChecked:v}))}/>
                  </div>
                </div>
                <div>
                  <label style={{display:"block",fontSize:10,color:"#f59e0b",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>📋 Change History Entry <span style={{color:"#3d5a72",textTransform:"none",fontWeight:400}}>— prepended to each campaign's history with today's date</span></label>
                  <div style={{position:"relative"}}>
                    <textarea
                      value={bulkDraft.history}
                      onChange={e=>setBulkDraft(p=>({...p,history:e.target.value}))}
                      placeholder={`e.g. New creatives launched for FB, SP & DSP`}
                      rows={2}
                      style={{width:"100%",background:"#0e1a2e",border:`1px solid ${bulkDraft.history.trim()?"#f59e0b60":"#334155"}`,borderRadius:6,padding:"7px 36px 7px 10px",color:"#d8eaf8",fontSize:13,boxSizing:"border-box",fontFamily:"inherit",resize:"vertical",lineHeight:1.5,outline:"none"}}
                    />
                    {bulkDraft.history.trim() && (
                      <span style={{position:"absolute",top:8,right:10,fontSize:10,color:"#f59e0b",fontWeight:600,pointerEvents:"none",background:"#0e1a2e",padding:"1px 4px",borderRadius:3}}>
                        {today} —
                      </span>
                    )}
                  </div>
                  {bulkDraft.history.trim() && (
                    <div style={{fontSize:10,color:"#4d6e8a",marginTop:4}}>
                      Will prepend: <span style={{color:"#f59e0b",fontFamily:"monospace"}}>{today} — {bulkDraft.history.trim()}</span>
                    </div>
                  )}
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={applyBulkEdit} style={{background:"#00c896",border:"none",borderRadius:7,padding:"8px 22px",color:"#000",fontWeight:700,fontSize:13,cursor:"pointer"}}>Apply to {selectedIds.size} Campaign{selectedIds.size!==1?"s":""}</button>
                  <button onClick={()=>{ setShowBulkEdit(false); setBulkDraft({note1:"",note2:"",status:"",lastChecked:"",history:""}); }} style={{background:"#162236",border:"1px solid #334155",borderRadius:7,padding:"8px 16px",color:"#7a9bbf",fontWeight:600,fontSize:13,cursor:"pointer"}}>Cancel</button>
                  <button onClick={()=>{ setShowBulkEdit(false); setSelectedIds(new Set()); setBulkDraft({note1:"",note2:"",status:"",lastChecked:"",history:""}); }} style={{background:"none",border:"1px solid #334155",borderRadius:7,padding:"8px 12px",color:"#4d6e8a",fontSize:12,cursor:"pointer"}}>Clear selection</button>
                </div>
              </div>
            )}
          </div>
        )}

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
        <div style={{display:"flex",gap:9,flexWrap:"wrap",marginBottom:14,alignItems:"center"}}>
          {[{label:"Total",val:stats.total,color:"#7a9bbf"},{label:"Active",val:stats.active,color:"#00d48a"},{label:"Ahead",val:stats.ahead,color:"#fb923c"},{label:"Behind",val:stats.behind,color:"#fde047"},{label:"Close to Goal",val:stats.closeToGoal,color:"#00e5c0"},{label:"Off",val:stats.off,color:"#ef4444"},{label:"≤14d End",val:stats.soon,color:"#f87171"},{label:"★ Monthly",val:stats.monthlyFlights,color:"#00e5c0"}].map(s=>(
            <div key={s.label} style={{background:"#0e1a2e",border:`1px solid ${s.color}30`,borderRadius:8,padding:"9px 15px",minWidth:75}}>
              <div style={{fontSize:22,fontWeight:800,color:s.color,lineHeight:1,letterSpacing:"-0.02em"}}>{s.val}</div>
              <div style={{fontSize:11,color:"#4d6e8a",marginTop:3,textTransform:"uppercase",letterSpacing:"0.05em"}}>{s.label}</div>
            </div>
          ))}
          <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:10}}>
            {campaigns.some(c=>c.goalHit||c.closeToGoal) && (
              <button
                onClick={async()=>{ if(await confirm({title:"Reset all goal badges?",message:"Clears 🎯 Goal Hit and ⏳ Close to Goal from all campaigns. Monthly Flight ★ and Reminders 🔔 are not affected.",confirmLabel:"Reset"})) setCampaigns(cs=>cs.map(c=>({...c,goalHit:false,closeToGoal:false}))); }}
                title="Clear all Goal Hit and Close to Goal badges — use at the start of a new month"
                style={{background:"#0e1a2e",border:"1px solid #334155",borderRadius:7,padding:"7px 13px",color:"#4d6e8a",fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"}}
              >↺ Reset Goals</button>
            )}
            <span style={{fontSize:11,color:"#3d5a72"}}>Today: {today}</span>
          </div>
        </div>

        <DateBar range={dateRange} setRange={setDateRange}/>

        {/* Filters */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:14}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search campaigns, partners, platforms…" style={{background:"#0e1a2e",border:"1px solid #1e293b",borderRadius:7,padding:"8px 14px",color:"#d8eaf8",fontSize:14,width:280}}/>
          <select
            value={fStatus!=="all"?fStatus:(fMonthly?"__monthly__":sortKey==="reminder"?"__reminder__":groupByClient?"__grouped__":fGoalHit?"__goalHit__":fCloseToGoal?"__closeToGoal__":"all")}
            onChange={e=>{
              const v=e.target.value;
              setFMonthly(false); setFGoalHit(false); setFCloseToGoal(false); setGroupByClient(false);
              if(v==="__monthly__"){setFMonthly(true);setFStatus("all");setSortKey("endDate");}
              else if(v==="__reminder__"){setFStatus("all");setSortKey("reminder");}
              else if(v==="__grouped__"){setFStatus("all");if(sortKey==="reminder")setSortKey("endDate");setGroupByClient(true);}
              else if(v==="__goalHit__"){setFStatus("all");if(sortKey==="reminder")setSortKey("endDate");setFGoalHit(true);setFExcludeGoalHit(false);}
              else if(v==="__closeToGoal__"){setFStatus("all");if(sortKey==="reminder")setSortKey("endDate");setFCloseToGoal(true);}
              else{setFStatus(v);if(sortKey==="reminder")setSortKey("endDate");}
            }}
            style={{background:"#0e1a2e",border:`1px solid ${fMonthly?"#00e5c0":sortKey==="reminder"?"#f59e0b":groupByClient?"#00c896":fGoalHit?"#00c896":fCloseToGoal?"#f59e0b":"#162236"}`,borderRadius:7,padding:"7px 11px",color:fMonthly?"#00e5c0":sortKey==="reminder"?"#f59e0b":groupByClient?"#00e5a0":fGoalHit?"#00e5a0":fCloseToGoal?"#f59e0b":"#7a9bbf",fontSize:13,fontWeight:(fMonthly||sortKey==="reminder"||groupByClient||fGoalHit||fCloseToGoal)?700:400}}>
            <option value="all">All Statuses</option>
            {Object.entries(STATUS_CFG).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
            <option value="__monthly__">★ Monthly Flights</option>
            <option value="__reminder__">🔔 Has Reminder</option>
            <option value="__goalHit__">🎯 Goal Hit</option>
            <option value="__closeToGoal__">⏳ Close to Goal</option>
            <option value="__grouped__">👥 Group by Client</option>
          </select>
          <button
            onClick={()=>setFExcludeGoalHit(v=>!v)}
            title="Hide campaigns that have already hit their monthly goal"
            style={{
              background:fExcludeGoalHit?"#1a0e00":"#0e1a2e",
              border:`1px solid ${fExcludeGoalHit?"#f59e0b":"#162236"}`,
              borderRadius:7,padding:"7px 11px",
              color:fExcludeGoalHit?"#f59e0b":"#4d6e8a",
              fontSize:13,fontWeight:fExcludeGoalHit?700:400,
              cursor:"pointer",whiteSpace:"nowrap",
              transition:"all .15s",
            }}>
            {fExcludeGoalHit?"🎯 Hiding Goal Hit":"🎯 Exclude Goal Hit"}
          </button>
          <PlatformMultiSelect platforms={platforms} fPlatforms={fPlatforms} setFPlatforms={setFPlatforms}/>
          <span style={{fontSize:11,color:"#3d5a72"}}>{filtered.length} result{filtered.length!==1?"s":""}</span>
        </div>

        {/* Table */}
        <div style={{background:"#0c1625",border:"1px solid #1e293b",borderRadius:10,overflow:"hidden"}}>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:920}}>
              <thead>
                <tr style={{background:"#070d16"}}>
                  <th style={{width:36,padding:"0 8px",borderBottom:"1px solid #1e293b",textAlign:"center"}}>
                    <DarkCheckbox
                      checked={filtered.length>0&&filtered.every(c=>selectedIds.has(c.id))}
                      indeterminate={filtered.some(c=>selectedIds.has(c.id))&&!filtered.every(c=>selectedIds.has(c.id))}
                      onChange={e=>{ if(e.target.checked) setSelectedIds(new Set(filtered.map(c=>c.id))); else setSelectedIds(new Set()); }}
                    />
                  </th>
                  <th style={{width:28,borderBottom:"1px solid #1e293b"}}/>
                  <th style={{width:36,borderBottom:"1px solid #1e293b"}}/>
                  <TH k="mediaPartner" label="Partner"/>
                  <TH k="campaignName" label="Campaign"/>
                  <TH k="platform" label="Platform"/>
                  <TH k="status" label="Status"/>
                  <TH k={null} label="Goal"/>
                  <TH k="startDate" label="Start Date"/>
                  <TH k="endDate" label="End Date"/>
                  <TH k="lastChecked" label="Last Checked"/>
                  <th style={{padding:"10px 12px",fontSize:11,color:"#4d6e8a",borderBottom:"1px solid #1e293b",textTransform:"uppercase",letterSpacing:"0.07em"}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupByClient ? (() => {
                  // ── GROUPED MODE ──────────────────────────────────────────
                  const clientMap = new Map();
                  filtered.forEach(c => {
                    const key = c.campaignName.trim();
                    if (!clientMap.has(key)) clientMap.set(key, []);
                    clientMap.get(key).push(c);
                  });
                  const rows = [];
                  clientMap.forEach((camps, clientName) => {
                    const isCollapsed = collapsedClients.has(clientName);
                    const partner     = camps[0].mediaPartner;
                    const platforms   = [...new Set(camps.map(c => c.platform))];
                    const endDates    = camps.map(c => c.endDate).filter(Boolean).sort();
                    const earliestEnd = endDates[0] || "";
                    const dLeft       = earliestEnd ? getDaysLeft(earliestEnd) : null;
                    const drc         = dLeft==null?"#4d6e8a":dLeft<0?"#6b7280":dLeft<=14?"#ef4444":dLeft<=30?"#f59e0b":"#00d48a";
                    const hasReminder = camps.some(c => reminders.some(r => !r.dismissed && r.campaignId===c.id && r.date<=today));
                    const statuses    = camps.map(c => c.status||"active");
                    const groupStatus = statuses.every(s=>s==="off")?"off":statuses.some(s=>s==="pacing-behind")?"pacing-behind":statuses.some(s=>s==="pacing-ahead")?"pacing-ahead":"active";
                    const scfg        = STATUS_CFG[groupStatus]||STATUS_CFG.active;
                    const totalContract = camps.reduce((s,c) => s+(parseFloat(c.contractValue)||0), 0);
                    const PLT = {FB:"#1877f2",FBV:"#1877f2",IG:"#e1306c",TT:"#ff0050",CTV:"#00b4d8",OTT:"#0096c7",DSP:"#7c3aed",TD:"#a78bfa",SP:"#fffc00",SEM:"#4285f4",YT:"#ff0000",EMAIL:"#0ea5e9",default:"#4d6e8a"};
                    // Client header row
                    rows.push(
                      <tr key={`grp-${clientName}`} onClick={()=>toggleClient(clientName)}
                        style={{background:"#07101c",cursor:"pointer",borderTop:"2px solid #1e3a5f"}}>
                        <td style={{padding:"0 8px",borderBottom:"1px solid #1e293b",textAlign:"center"}} onClick={e=>e.stopPropagation()}>
                          <DarkCheckbox checked={camps.every(c=>selectedIds.has(c.id))} indeterminate={camps.some(c=>selectedIds.has(c.id))&&!camps.every(c=>selectedIds.has(c.id))} onChange={e=>{ const ids=camps.map(c=>c.id); setSelectedIds(prev=>{ const n=new Set(prev); e.target.checked?ids.forEach(id=>n.add(id)):ids.forEach(id=>n.delete(id)); return n; }); }}/>
                        </td>
                        <td colSpan={2} style={{padding:"0 0 0 12px",borderBottom:"1px solid #1e293b"}}>
                          <span style={{color:"#3d5a72",fontSize:11,userSelect:"none"}}>{isCollapsed?"▶":"▼"}</span>
                        </td>
                        <td style={{padding:"9px 12px",borderBottom:"1px solid #1e293b"}}>
                          <span style={{color:"#a8c4e0",fontWeight:600,fontSize:13}}>{partner}</span>
                        </td>
                        <td style={{padding:"9px 12px",borderBottom:"1px solid #1e293b"}}>
                          <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap"}}>
                            <span style={{color:"#edf4ff",fontWeight:700,fontSize:13}}>{clientName}</span>
                            {hasReminder && <span style={{background:"#f59e0b20",border:"1px solid #f59e0b60",borderRadius:10,padding:"1px 6px",fontSize:10,color:"#f59e0b",fontWeight:700}}>🔔</span>}
                            {platforms.map(p=>(
                              <span key={p} style={{fontSize:10,background:(PLT[p]||PLT.default)+"22",border:`1px solid ${(PLT[p]||PLT.default)}40`,borderRadius:4,padding:"1px 6px",color:PLT[p]||PLT.default,fontWeight:600}}>{p}</span>
                            ))}
                          </div>
                        </td>
                        <td style={{padding:"9px 12px",borderBottom:"1px solid #1e293b"}}/>
                        <td style={{padding:"9px 12px",borderBottom:"1px solid #1e293b"}}>
                          <span style={{background:scfg.bg,color:scfg.color,border:`1px solid ${scfg.color}40`,borderRadius:4,padding:"2px 8px",fontSize:11,fontWeight:600}}>{scfg.label}</span>
                        </td>
                        <td style={{padding:"9px 12px",borderBottom:"1px solid #1e293b"}}>
                          <span style={{fontSize:11,color:"#4d6e8a"}}>{camps.length} platform{camps.length!==1?"s":""}</span>
                          {totalContract>0 && <span style={{fontSize:11,color:"#34d399",marginLeft:8}}>${Math.round(totalContract).toLocaleString()}</span>}
                        </td>
                        <td style={{padding:"9px 12px",borderBottom:"1px solid #1e293b"}}/>
                        <td style={{padding:"9px 12px",borderBottom:"1px solid #1e293b"}}>
                          {earliestEnd && <span style={{fontSize:12,color:drc,fontWeight:600}}>
                            {dLeft==null?"":dLeft<0?"Ended":dLeft===0?"Today":`${dLeft}d`}{" "}
                            <span style={{fontWeight:400,opacity:0.7,fontSize:11}}>{earliestEnd}</span>
                          </span>}
                        </td>
                        <td colSpan={3} style={{padding:"9px 12px",borderBottom:"1px solid #1e293b"}}/>
                      </tr>
                    );
                    // Platform rows — indented, hidden when collapsed
                    if (!isCollapsed) {
                      camps.forEach((c, i) => {
                        const stale = c.lastChecked!==today;
                        const open  = expanded.has(c.id);
                        const hasData = !!(c.impressions||c.ctr||c.cpm||c.spend);
                        const rowBg = i%2===0?"#0c1828":"#080f1a";
                        const soonDate = new Date(today); soonDate.setDate(soonDate.getDate()+3); const soonStr=soonDate.toISOString().slice(0,10);
                        const campReminders = reminders.filter(r=>!r.dismissed&&r.campaignId===c.id&&r.date<=today);
                        const campUpcoming  = reminders.filter(r=>!r.dismissed&&r.campaignId===c.id&&r.date>today&&r.date<=soonStr);
                        rows.push(
                          <Fragment key={c.id}>
                            <tr style={{background:selectedIds.has(c.id)?"#002418":rowBg}}>
                              <td style={{padding:"0 8px",borderBottom:"1px solid #060c18",textAlign:"center",verticalAlign:"middle"}}>
                                <DarkCheckbox checked={selectedIds.has(c.id)} onChange={e=>setSelectedIds(prev=>{ const n=new Set(prev); e.target.checked?n.add(c.id):n.delete(c.id); return n; })}/>
                              </td>
                              <td style={{padding:"0 0 0 6px",borderBottom:"1px solid #060c18",width:28}}/>
                              <td style={{padding:"0 0 0 8px",borderBottom:"1px solid #060c18",width:36,textAlign:"center",verticalAlign:"middle"}}>
                                <button onClick={()=>toggleExpand(c.id)} className="xbtn" style={{background:"none",border:"none",cursor:"pointer",padding:"5px 6px",color:hasData?"#00c896":"#1e3048",transform:open?"rotate(90deg)":"rotate(0deg)",fontSize:11,lineHeight:1,display:"block",margin:"0 auto"}}>▶</button>
                              </td>
                              <TD><span style={{color:"#4d6e8a",fontSize:11,paddingLeft:8}}>↳</span></TD>
                              <TD>
                                <div style={{display:"flex",alignItems:"center",gap:5,paddingLeft:12}}>
                                  <span style={{color:"#edf4ff",fontWeight:600}}>{c.campaignName.trim()}</span>
                                  {(()=>{
                                    const disp=resolveMetrics(c,dateRange.preset);
                                    const pacing=computeMonthlyPacing(disp.impressions,c.note1);
                                    const autoGoalHit=pacing&&pacing.pct>=1;
                                    const autoClose=pacing&&pacing.pct>=0.8&&pacing.pct<1;
                                    const showGoalHit=autoGoalHit||c.goalHit;
                                    const showClose=!showGoalHit&&(autoClose||c.closeToGoal);
                                    const tip=pacing?`${pacing.delivered.toLocaleString()} / ${pacing.goal.toLocaleString()} (${(pacing.pct*100).toFixed(0)}%)`:"Manual";
                                    return (<>
                                      {showGoalHit&&<button onClick={()=>updateCampaign({...c,goalHit:!c.goalHit,closeToGoal:false})} title={`🎯 Goal hit! ${tip}`} style={{background:"#00c89620",border:"1px solid #00c89660",borderRadius:10,padding:"1px 6px",fontSize:10,color:"#00e5a0",fontWeight:700,cursor:"pointer"}}>🎯 Goal Hit</button>}
                                      {showClose&&<button onClick={()=>updateCampaign({...c,closeToGoal:!c.closeToGoal,goalHit:false})} title={`⏳ Close to goal! ${tip}`} style={{background:"#f59e0b18",border:"1px solid #f59e0b50",borderRadius:10,padding:"1px 6px",fontSize:10,color:"#f59e0b",fontWeight:700,cursor:"pointer"}}>⏳ Close</button>}
                                    </>);
                                  })()}
                                  {campReminders.length>0 && <button onClick={()=>setShowReminderModal(c.id)} style={{background:"#f59e0b20",border:"1px solid #f59e0b60",borderRadius:10,padding:"1px 6px",fontSize:10,color:"#f59e0b",fontWeight:700,cursor:"pointer"}}>🔔 {campReminders.length}</button>}
                                  {c.note2&&c.note2.trim()&&<span title={c.note2.trim()} style={{background:"#200808",border:"1px solid #ef444460",borderRadius:3,padding:"1px 5px",fontSize:9,color:"#ef4444",fontWeight:700,whiteSpace:"nowrap"}}>⚠ {c.note2.trim().length>18?c.note2.trim().slice(0,18)+"…":c.note2.trim()}</span>}
                                </div>
                                {c.note1&&c.note1.trim()&&<div style={{fontSize:11,color:"#00ffb3",marginTop:2,paddingLeft:12,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:220}}>{c.note1.trim()}</div>}
                              </TD>
                              <TD><StatusBadge status={c.status}/></TD>
                              <TD><span style={{fontSize:12,color:(PLT[c.platform]||PLT.default),fontWeight:700}}>{c.platform}</span></TD>
                              <TD><span style={{fontSize:11,color:"#7a9bbf"}}>{c.note1||"—"}</span></TD>
                              <TD><span style={{fontSize:11,color:"#4d6e8a"}}>{c.startDate||"—"}</span></TD>
                              <TD><EndChip d={c.endDate}/></TD>
                              <TD><span style={{fontSize:11,color:stale?"#f59e0b":"#00d48a",fontWeight:stale?600:400}}>{fmtDate(c.lastChecked)}</span>
                                {stale&&<button onClick={()=>updateCampaign({...c,lastChecked:today})} style={{background:"#002018",border:"1px solid #22c55e40",borderRadius:4,color:"#00ffb3",fontSize:10,padding:"1px 6px",cursor:"pointer",fontWeight:700,marginLeft:4}}>✓</button>}
                              </TD>
                              <TD>
                                <div style={{display:"flex",gap:5}}>
                                  <button onClick={()=>setEditTarget(c)} style={{background:"#1a0e00",border:"1px solid #fb923c60",borderRadius:5,color:"#fb923c",fontSize:10,padding:"3px 7px",cursor:"pointer",fontWeight:600}}>Edit</button>
                                  <button onClick={async()=>{ if(await confirm({title:`Delete "${c.campaignName}"?`,message:"This cannot be undone. Consider archiving instead.",confirmLabel:"Delete",danger:true})){ addLog({type:"deleted",campaignName:c.campaignName,partner:c.mediaPartner,platform:c.platform,detail:"Campaign deleted",campaignId:c.id,prevSnapshot:{...c}}); setCampaigns(cs=>cs.filter(x=>x.id!==c.id)); }}} style={{background:"#1a0808",border:"1px solid #ef444440",borderRadius:5,color:"#ef4444",fontSize:10,padding:"3px 6px",cursor:"pointer"}}>✕</button>
                                </div>
                              </TD>
                            </tr>
                            {open && <MetricRow key={"m"+c.id} c={c} colSpan={COLS} onUpdate={updateCampaign} dateRange={dateRange} reminders={reminders} setReminders={setReminders}/>}
                          </Fragment>
                        );
                      });
                    }
                  });
                  return rows;
                })() : filtered.map((c,i) => {
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
                        onDragStart={e=>onDragStart(e, c.id)}
                        onDragOver={e=>onDragOver(e,c.id)}
                        onDrop={e=>onDrop(e,c.id)}
                        onDragEnd={onDragEnd}
                        style={{background:selectedIds.has(c.id)?"#002418":dragOverId===c.id?"#0a1c30":rowBg,opacity:dragId===c.id?0.4:1,transition:"opacity .15s,background .1s"}}
                      >
                        <td style={{padding:"0 8px",borderBottom:"1px solid #060c18",textAlign:"center",verticalAlign:"middle"}} onMouseDown={e=>e.stopPropagation()}>
                          <DarkCheckbox checked={selectedIds.has(c.id)} onChange={e=>setSelectedIds(prev=>{ const n=new Set(prev); e.target.checked?n.add(c.id):n.delete(c.id); return n; })}/>
                        </td>
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
                            {(()=>{
                              const disp=resolveMetrics(c,dateRange.preset);
                              const pacing=computeMonthlyPacing(disp.impressions,c.note1);
                              const autoGoalHit = pacing&&pacing.pct>=1;
                              const autoCloseToGoal = pacing&&pacing.pct>=0.8&&pacing.pct<1;
                              const showGoalHit = autoGoalHit||c.goalHit;
                              const showCloseToGoal = !showGoalHit&&(autoCloseToGoal||c.closeToGoal);
                              const tip = pacing?`${pacing.delivered.toLocaleString()} / ${pacing.goal.toLocaleString()} (${(pacing.pct*100).toFixed(0)}%)`:"Manual";
                              return (<>
                                {showGoalHit
                                  ? <button onClick={()=>updateCampaign({...c,goalHit:!c.goalHit,closeToGoal:false})} title={`🎯 Monthly goal hit! ${tip} — click to unpin`} style={{background:"#00c89620",border:"1px solid #00c89660",borderRadius:10,padding:"1px 6px",fontSize:10,color:"#00e5a0",fontWeight:700,flexShrink:0,cursor:"pointer"}}>🎯 Goal Hit</button>
                                  : <button onClick={()=>updateCampaign({...c,goalHit:true,closeToGoal:false})} title="Mark goal as hit" style={{background:"none",border:"none",padding:"1px 2px",fontSize:10,color:"#1e3048",fontWeight:700,flexShrink:0,cursor:"pointer",opacity:0}} className="star-toggle">🎯</button>
                                }
                                {showCloseToGoal
                                  ? <button onClick={()=>updateCampaign({...c,closeToGoal:!c.closeToGoal,goalHit:false})} title={`⏳ Close to goal! ${tip} — click to unpin`} style={{background:"#f59e0b18",border:"1px solid #f59e0b50",borderRadius:10,padding:"1px 6px",fontSize:10,color:"#f59e0b",fontWeight:700,flexShrink:0,cursor:"pointer"}}>⏳ Close</button>
                                  : !showGoalHit&&<button onClick={()=>updateCampaign({...c,closeToGoal:true,goalHit:false})} title="Mark as close to goal" style={{background:"none",border:"none",padding:"1px 2px",fontSize:10,color:"#1e3048",fontWeight:700,flexShrink:0,cursor:"pointer",opacity:0}} className="star-toggle">⏳</button>
                                }
                              </>);
                            })()}
                            {campReminders.length>0 && (
                              <button onClick={()=>setShowReminderModal(c.id)} title="Reminder due!" style={{background:"#f59e0b20",border:"1px solid #f59e0b60",borderRadius:10,padding:"1px 6px",fontSize:10,color:"#f59e0b",fontWeight:700,cursor:"pointer",flexShrink:0}}>🔔 {campReminders.length}</button>
                            )}
                            {campUpcoming.length>0 && campReminders.length===0 && (
                              <button onClick={()=>setShowReminderModal(c.id)} title={`${campUpcoming.length} reminder${campUpcoming.length>1?"s":""} coming up soon`} style={{background:"#1e293b",border:"1px solid #475569",borderRadius:10,padding:"1px 6px",fontSize:10,color:"#94a3b8",fontWeight:600,cursor:"pointer",flexShrink:0,opacity:0.75}}>🔔 {campUpcoming.length}</button>
                            )}
{c.note2&&c.note2.trim()&&<span title={c.note2.trim()} style={{background:"#200808",border:"1px solid #ef444460",borderRadius:3,padding:"1px 5px",fontSize:9,color:"#ef4444",fontWeight:700,letterSpacing:"0.05em",whiteSpace:"nowrap",flexShrink:0,cursor:"default"}}>⚠ {c.note2.trim().length>18?c.note2.trim().slice(0,18)+"…":c.note2.trim()}</span>}
                          </div>
                          {c.note1&&c.note1.trim()&&<div style={{fontSize:11,color:"#00ffb3",marginTop:3,fontWeight:500,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:220}} title={c.note1}>{c.note1.trim()}</div>}

                          {!open&&(()=>{
                            const disp=resolveMetrics(c,dateRange.preset);
                            const pacing=computeMonthlyPacing(disp.impressions,c.note1);
                            if(!pacing) return null;
                            return (
                              <div style={{marginTop:4,width:140}} title={`${pacing.label}: ${pacing.delivered.toLocaleString()} of ${pacing.goal.toLocaleString()} goal`}>
                                <div style={{position:"relative",background:"#0e1a2e",borderRadius:3,height:5,width:"100%",overflow:"visible",marginBottom:2}}>
                                  <div style={{position:"absolute",top:-2,left:`${Math.min(97,pacing.expectedPct*100)}%`,width:2,height:9,background:"#334155",borderRadius:1,zIndex:2}}/>
                                  <div style={{background:pacing.color,height:"100%",width:`${Math.min(100,pacing.pct*100)}%`,borderRadius:3,transition:"width .3s"}}/>
                                </div>
                                <span style={{fontSize:9,color:pacing.color,fontWeight:700,letterSpacing:"0.03em"}}>{(pacing.pct*100).toFixed(0)}% of mo. goal</span>
                              </div>
                            );
                          })()}
                        </TD>
                        <TD><PlatformTag p={c.platform}/></TD>
                        <TD>
                          <select value={c.status||""} onChange={e=>updateCampaign({...c,status:e.target.value})} style={{background:STATUS_CFG[c.status||""]?.bg||"#0e1a2e",border:`1px solid ${STATUS_CFG[c.status||""]?.color||"#1e293b"}40`,borderRadius:5,color:STATUS_CFG[c.status||""]?.color||"#4d6e8a",fontSize:11,padding:"3px 6px",cursor:"pointer",fontWeight:600}}>
                            {Object.entries(STATUS_CFG).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
                          </select>
                        </TD>
                        <TD style={{maxWidth:170}}><span style={{color:"#7a9bbf",fontSize:13,display:"block",fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:160}} title={c.goal}>{c.goal}</span></TD>
                        <TD>
                          {c.startDate ? (
                            <div>
                              <span style={{color:"#7a9bbf",fontSize:12,fontVariantNumeric:"tabular-nums"}}>{fmtDate(c.startDate)}</span>
                              {(()=>{ const total=Math.ceil((new Date(c.endDate)-new Date(c.startDate))/86400000); const elapsed=Math.ceil((new Date()-new Date(c.startDate))/86400000); const pct=Math.min(100,Math.max(0,Math.round(elapsed/total*100))); const col=pct<33?"#00d48a":pct<66?"#f59e0b":"#ef4444"; return total>0?(<div style={{marginTop:3}}><div style={{background:"#0e1a2e",borderRadius:3,height:3,width:80,overflow:"hidden"}}><div style={{background:col,height:"100%",width:pct+"%",transition:"width .3s"}}/></div><span style={{fontSize:9,color:col,marginTop:1,display:"block"}}>{pct}% through</span></div>):null; })()}
                            </div>
                          ) : <span style={{color:"#2a4060",fontSize:11}}>—</span>}
                        </TD>
                        <TD><EndChip d={c.endDate}/></TD>
                        <TD>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <span style={{fontSize:11,color:stale?"#f59e0b":"#00d48a",fontWeight:stale?600:400,whiteSpace:"nowrap"}}>{fmtDate(c.lastChecked)}</span>
                            {stale&&<button onClick={()=>updateCampaign({...c,lastChecked:today})} style={{background:"#002018",border:"1px solid #22c55e40",borderRadius:4,color:"#00ffb3",fontSize:10,padding:"1px 6px",cursor:"pointer",fontWeight:700}}>✓</button>}
                          </div>
                        </TD>
                        <TD>
                          <div style={{display:"flex",gap:5}}>
                            <button onClick={()=>setEditTarget(c)} style={{background:"#1a0e00",border:"1px solid #fb923c60",borderRadius:5,color:"#fb923c",fontSize:10,padding:"3px 7px",cursor:"pointer",fontWeight:600}}>Edit</button>
                            <button onClick={()=>setRenewTarget(c)} style={{background:"#002418",border:"1px solid #00c89640",borderRadius:5,color:"#00c896",fontSize:10,padding:"3px 6px",cursor:"pointer",fontWeight:700}} title="Renew campaign">🔄</button>
                            <button onClick={()=>{ const copy={...c,id:Date.now(),campaignName:c.campaignName+" (copy)",impressions:"",ctr:"",cpm:"",spend:""}; setCampaigns(cs=>{ const idx=cs.findIndex(x=>x.id===c.id); const n=[...cs]; n.splice(idx+1,0,copy); return n; }); addLog({type:"duplicated",campaignName:copy.campaignName,partner:copy.mediaPartner,platform:copy.platform,detail:`Duplicated from "${c.campaignName}"`,campaignId:copy.id,prevSnapshot:null}); setEditTarget(copy); }} style={{background:"#091a2a",border:"1px solid #1e3a5f",borderRadius:5,color:"#00e5a0",fontSize:10,padding:"3px 6px",cursor:"pointer",fontWeight:600}}>⧉</button>
                            <button onClick={async()=>{ if(await confirm({title:`Delete "${c.campaignName}"?`,message:"This cannot be undone. Consider archiving instead.",confirmLabel:"Delete",danger:true})) { addLog({type:"deleted",campaignName:c.campaignName,partner:c.mediaPartner,platform:c.platform,detail:`Campaign deleted`,campaignId:c.id,prevSnapshot:{...c}}); setCampaigns(cs=>cs.filter(x=>x.id!==c.id)); } }} style={{background:"#1a0808",border:"1px solid #ef444440",borderRadius:5,color:"#ef4444",fontSize:10,padding:"3px 6px",cursor:"pointer",fontWeight:600}}>✕</button>
                            <button title="Send to Archive" onClick={async()=>{ if(await confirm({title:`Archive "${c.campaignName}"?`,message:"It will move to the Archive tab. You can restore it any time.",confirmLabel:"Archive"})) { const tod=getToday(); const [ay,am,ad]=tod.split("-"); const astamp=`${am}/${ad}/${ay}`; const archNote=`${astamp} — Campaign manually archived`; const archHist=c.history&&c.history.trim()?`${archNote}
${c.history}`:archNote; setArchive(prev=>[...prev,{...c,archivedDate:tod,history:archHist}]); setCampaigns(cs=>cs.filter(x=>x.id!==c.id)); addLog({type:"deleted",campaignName:c.campaignName,partner:c.mediaPartner,platform:c.platform,detail:"Manually sent to archive",campaignId:c.id,prevSnapshot:{...c}}); }}} style={{background:"#1a0828",border:"1px solid #a855f740",borderRadius:5,color:"#a855f7",fontSize:10,padding:"3px 6px",cursor:"pointer",fontWeight:700}}>🗄 →</button>
                          </div>
                        </TD>
                      </tr>
                      {open && <MetricRow key={"m"+c.id} c={c} colSpan={COLS} onUpdate={updateCampaign} dateRange={dateRange} reminders={reminders} setReminders={setReminders}/>}
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

      {editTarget && <Modal campaign={editTarget} onSave={u=>{ updateCampaign(u); setEditTarget(null); }} onClose={()=>setEditTarget(null)} partners={[...new Set(campaigns.map(c=>c.mediaPartner).filter(Boolean))].sort()} reminders={reminders} setReminders={setReminders} campaigns={campaigns}/>}
      {showAdd    && <Modal isNew onSave={n=>{ setCampaigns(cs=>[...cs,n]); addLog({type:"created",campaignName:n.campaignName,partner:n.mediaPartner,platform:n.platform,detail:`New campaign added`,campaignId:n.id,prevSnapshot:null}); setShowAdd(false); }} onClose={()=>setShowAdd(false)} partners={[...new Set(campaigns.map(c=>c.mediaPartner).filter(Boolean))].sort()}/>}
      {showReminderModal && <ReminderModal campaigns={campaigns} reminders={reminders} setReminders={setReminders} focusCampaignId={typeof showReminderModal==="number"?showReminderModal:null} onClose={()=>setShowReminderModal(null)}/>}
      {renewTarget && <RenewModal campaign={renewTarget} allCampaigns={campaigns} onRenew={handleRenew} onExtend={handleExtend} onClose={()=>setRenewTarget(null)}/>}
      <ConfirmDialog dialog={dialog} onResolve={onResolve}/>
    </div>
  </div>
  );
}
