import { useState, useMemo, useEffect } from "react";

const STORAGE_KEY = "campaign-tracker-v3";
const EXPORT_KEY = "campaign-tracker-last-export";

const initialCampaigns = [{"mediaPartner":"WVR","campaignName":"Harry Green CDJR","platform":"FB","goal":"750K (7/1/25 - 12/31/25)","endDate":"2026-06-30","note1":"125K/Mo","note2":"","lastChecked":"2026-03-02","id":1769125165003,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Compass TK","campaignName":"Farm Bureau Financial-Jim Waters","platform":"TD","goal":"1.58M (8/11/25 - 7/31/26)","endDate":"2026-07-31","note1":"131.6K/Mo","note2":"","lastChecked":"2026-03-02","id":1769125792921,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Saginaw","campaignName":"Great Lakes Pace","platform":"FB","goal":"863K (8/20/25 - 7/31/26)","endDate":"2026-07-25","note1":"72K/Mo","note2":"","lastChecked":"2026-03-02","id":1769209400165,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Palm Springs","campaignName":"Carpet Empire Plus","platform":"FB","goal":"863K (8/20/25 - 7/31/26)","endDate":"2026-07-31","note1":"72K/Mo","note2":"","lastChecked":"2026-03-02","id":1769209535972,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Palm Springs","campaignName":"Carpet Empire Plus","platform":"DSP","goal":"863K (8/20/25 - 7/31/26)","endDate":"2026-07-31","note1":"72K/Mo","note2":"","lastChecked":"2026-03-02","id":1769209663140,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha San Antonio","campaignName":"Olympia Hills Golf","platform":"TD","goal":"143K (10/1/25 - 9/30/26)","endDate":"2026-09-30","note1":"12K/Mo","note2":"","lastChecked":"2026-03-02","id":1769214676416,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha San Antonio","campaignName":"Olympia Hills Golf","platform":"FB","goal":"1.08M (10/1/25 - 9/30/26)","endDate":"2026-09-30","note1":"90K/Mo","note2":"","lastChecked":"2026-03-02","id":1769214678888,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha San Antonio","campaignName":"Olympia Hills Golf","platform":"DSP","goal":"1.08M (10/1/25 - 9/30/26)","endDate":"2026-09-30","note1":"90K/Mo","note2":"","lastChecked":"2026-03-02","id":1769214712742,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Britestar Milwaukee Middle School","platform":"TD","goal":"100K Monthly","endDate":"2026-03-31","note1":"100K Monthly","note2":"","lastChecked":"2026-03-02","id":1769214781502,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star South","platform":"TD","goal":"40K Feb/March","endDate":"2026-03-31","note1":"40K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439021921,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star South","platform":"FB","goal":"25K Feb/March","endDate":"2026-03-31","note1":"25K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439025194,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star South","platform":"FBV","goal":"20K Feb/March","endDate":"2026-03-31","note1":"20K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439086411,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star South","platform":"DSP","goal":"25K Feb/March","endDate":"2026-03-31","note1":"25K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439117040,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star South","platform":"SEM","goal":"Need New Budget for February","endDate":"2026-01-31","note1":"Need New Budget for February","note2":"","lastChecked":"2026-03-02","id":1769439141224,"status":"off","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star Christian","platform":"TD","goal":"40K Feb/March","endDate":"2026-03-31","note1":"40K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439175821,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star Christian","platform":"FB","goal":"25K Feb/March","endDate":"2026-03-31","note1":"25K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439200352,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star Christian","platform":"FBV","goal":"20K Feb/March","endDate":"2026-03-31","note1":"20K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439219988,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star Christian","platform":"DSP","goal":"25K Feb/March","endDate":"2026-03-31","note1":"25K Feb/March","note2":"","lastChecked":"2026-03-02","id":1769439236958,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true},{"mediaPartner":"Spinnaker Media","campaignName":"Shining Star Christian","platform":"SEM","goal":"Need New Budget for February","endDate":"2026-01-31","note1":"Need New Budget for February","note2":"","lastChecked":"2026-03-02","id":1769439252985,"status":"off","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"Noyes Development","platform":"TD","goal":"14.5K/Mo","endDate":"2026-03-31","note1":"14.5K/Mo","note2":"","lastChecked":"2026-03-02","id":1769439379921,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"Chown Hardware","platform":"TD","goal":"500K (10/17/25 - 3/31/26)","endDate":"2026-03-31","note1":"97K/Mo","note2":"","lastChecked":"2026-03-02","id":1769439513145,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"Chown Hardware","platform":"CTV","goal":"291K (10/17/25 - 3/31/26)","endDate":"2026-03-31","note1":"66K/Mo","note2":"","lastChecked":"2026-03-02","id":1769439528551,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"Chown Hardware","platform":"OTT","goal":"207K (10/17/25 - 3/31/26)","endDate":"2026-03-31","note1":"47K/Mo","note2":"","lastChecked":"2026-03-02","id":1769439581123,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"Chown Hardware","platform":"EMAIL","goal":"5 Emails","endDate":"2026-03-31","note1":"1/Mo","note2":"","lastChecked":"2026-03-02","id":1769440542802,"status":"off","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"WSU Tri Cities","platform":"FB","goal":"283K (11/3/25 - 5/31/26)","endDate":"2026-05-31","note1":"41K/Mo (15-20% Oregon)","note2":"","lastChecked":"2026-03-02","id":1769440737136,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"WSU Tri Cities ","platform":"FBV","goal":"175K (11/3/25 - 5/31/26)","endDate":"2026-05-31","note1":"25K/Mo ","note2":"","lastChecked":"2026-03-02","id":1772483657607,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"WSU Tri Cities","platform":"DSP","goal":"460K (11/3/25 - 5/31/26) ","endDate":"2026-05-31","note1":"67K/Mo (15-20% Oregon)","note2":"","lastChecked":"2026-03-02","id":1772483749345,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false},{"mediaPartner":"Alpha Portland","campaignName":"WSU Tri Cities","platform":"TD","goal":"70K (11/3/25 - 5/31/26)","endDate":"2026-05-31","note1":"10K/Mo","note2":"","lastChecked":"2026-03-02","id":1772483792126,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true},{"mediaPartner":"Alpha Portland","campaignName":"WSU Tri Cities Audio","platform":"TD","goal":"296K (11/3/25 - 5/31/26)","endDate":"2026-05-31","note1":"59.5K/Mo","note2":"","lastChecked":"2026-03-02","id":1772483819653,"status":"active","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true},{"mediaPartner":"Alpha Jackson","campaignName":"Job Corps Centers of America","platform":"FB","goal":"900K (11/4/25 - 3/31/26)","endDate":"2026-03-31","status":"active","note1":"180K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484331559},{"mediaPartner":"Alpha Jackson","campaignName":"Job Corps Centers of America","platform":"DSP","goal":"1.275M (11/4/25 - 3/31/26) ","endDate":"2026-03-31","status":"active","note1":"255K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484347656},{"mediaPartner":"Alpha Jackson","campaignName":"Job Corps Centers of America ","platform":"SP","goal":"375K (11/4/25 - 3/31/26)","endDate":"2026-03-31","status":"active","note1":"75K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484372498},{"mediaPartner":"Alpha Jackson","campaignName":"Job Corps Centers of America  ","platform":"CTV","goal":"435K (11/4/25 - 3/31/26)","endDate":"2026-03-31","status":"active","note1":"87K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484401165},{"mediaPartner":"Alpha Jackson","campaignName":"Job Corps Centers of America ","platform":"OTT","goal":"298K (11/4/25 - 3/31/26)","endDate":"2026-03-31","status":"active","note1":"60K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484418938},{"mediaPartner":"WVR","campaignName":"Concord University","platform":"FB","goal":"63K (3/1/26 - 5/31/26)","endDate":"2026-05-31","status":"active","note1":"21K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484485079},{"mediaPartner":"WVR","campaignName":"Concord University ","platform":"SP","goal":"63K (3/1/26 - 5/31/26)","endDate":"2026-05-31","status":"active","note1":"21K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484490232},{"mediaPartner":"WVR","campaignName":"Concord University ","platform":"DSP","goal":"63K (3/1/26 - 5/31/26)","endDate":"2026-05-31","status":"active","note1":"21K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772484503162},{"mediaPartner":"Enchanting Media","campaignName":"Waterview Casino","platform":"FB","goal":"95K March","endDate":"2026-03-31","status":"active","note1":"95K March ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484624626},{"mediaPartner":"Enchanting Media","campaignName":"Waterview Casino","platform":"DSP","goal":"95K March","endDate":"2026-03-31","status":"active","note1":"95K March ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772484630475},{"mediaPartner":"Alpha Moberly","campaignName":"Right Rate Roofing","platform":"SEM","goal":"5,400 (12/4/25 - 7/30/26) ","endDate":"2026-07-31","status":"active","note1":"$900/Mo ","note2":" $1,564 March ","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484709093},{"mediaPartner":"Compass","campaignName":"Bolz Chiro","platform":"FB","goal":"400K (1/1/26 - 4/30/26)","endDate":"2026-03-31","status":"active","note1":"100K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484763564},{"mediaPartner":"Compass","campaignName":"Brownstone","platform":"DSP","goal":"229K (12/12/25 - 3/31/26)","endDate":"2026-03-31","status":"active","note1":"58K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772484790999},{"mediaPartner":"Compass","campaignName":"Brownstone ","platform":"FB","goal":"80K (12/12/25 - 3/31/26)","endDate":"2026-03-31","status":"active","note1":"20K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484798543},{"mediaPartner":"Compass","campaignName":"Brownstone  ","platform":"FBV","goal":"148K (12/12/25 - 3/31/26) ","endDate":"2026-03-31","status":"active","note1":"37K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484823373},{"mediaPartner":"Alpha Moberly","campaignName":"Specs Quincy","platform":"FB","goal":"300K (1/1/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"25K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484872046},{"mediaPartner":"Alpha Moberly","campaignName":"Specs Quincy","platform":"DSP","goal":"300K (1/1/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"25K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484887059},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Pearl Hawaii Federal Credit Union","platform":"SEM","goal":"$35,091 Media Spend (1/13/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"$2,925/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484925304},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Pearl Hawaii Federal Credit Union ","platform":"CTV","goal":"375K (1/14/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"31,250/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772484928999},{"mediaPartner":"Alpha Moberly","campaignName":"Prairieland FS","platform":"DSP","goal":"445K (1/16/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"37.5K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772484986463},{"mediaPartner":"Alpha Moberly","campaignName":"Prairieland FS ","platform":"FB","goal":"445K (1/16/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"40.5K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485011820},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Holo HIIT","platform":"FBV","goal":"63K (1/16/26 - 3/31/26)","endDate":"2026-03-31","status":"off","note1":"","note2":"FB Access ","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485059494},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Holo HIIT ","platform":"FBV","goal":"63K (1/16/26 - 3/31/26)","endDate":"2026-03-31","status":"off","note1":"30K Feb/March","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485067041},{"mediaPartner":"Alpha Moberly","campaignName":"Culligan of Hanibal","platform":"DSP","goal":"758K (1/22/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"72K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485129272},{"mediaPartner":"Alpha Moberly","campaignName":"Quincy Catholic Elementary School","platform":"FB","goal":"125K (2/1/26 - 12/31/26)","endDate":"2026-12-31","status":"off","note1":"100K 2/1 - 4/30 (25K December)","note2":"FB Access/Creatives ","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485194758},{"mediaPartner":"Alpha Moberly","campaignName":"Quincy Catholic Elementary School ","platform":"DSP","goal":"125K (2/1/26 - 12/31/26)","endDate":"2026-12-31","status":"off","note1":"100K 2/1 - 4/30 (25K December)","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485211288},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Leavitt Yamane & Soldner","platform":"DSP","goal":"1.025M (2/9/26 - 12/31/26)","endDate":"2026-12-31","status":"active","note1":"93.5K/Mo ","note2":"Streaming Orders/Mo","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485298961},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Leavitt Yamane & Soldner","platform":"FB","goal":"1.025M (2/9/26 - 12/31/26)","endDate":"2026-12-31","status":"off","note1":"93.5K/Mo ","note2":"FB Access","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485347220},{"mediaPartner":"Allen Media Broadcasting","campaignName":"Aloha Sugarcane Juices","platform":"TD","goal":"172K (2/16/26 - 4/30/26)","endDate":"2026-04-30","status":"active","note1":"58K/Mo ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485429793},{"mediaPartner":"WVR","campaignName":"Fairmont State University (Ohio)","platform":"DSP","goal":"152K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"38K/Mo March/April/May 19K June","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485804286},{"mediaPartner":"WVR","campaignName":"Fairmont State University (Ohio) ","platform":"FB","goal":"152K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"38K/Mo March/April/May 19K June","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485820512},{"mediaPartner":"WVR","campaignName":"Fairmont State University (Ohio) ","platform":"SP","goal":"152K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"38K/Mo March/April/May 19K June","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485828817},{"mediaPartner":"WVR","campaignName":"Fairmont State University (PA)","platform":"DSP","goal":"375K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"94K/Mo March/April/May 47K/Mo June","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485842011},{"mediaPartner":"WVR","campaignName":"Fairmont State University (PA)","platform":"FB","goal":"375K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"94K/Mo March/April/May 47K/Mo June","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485880132},{"mediaPartner":"WVR","campaignName":"Fairmont State University (PA) ","platform":"SP","goal":"375K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"94K/Mo March/April/May 47K/Mo June","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772485887909},{"mediaPartner":"WVR","campaignName":"Fairmont State University (WV)","platform":"DSP","goal":"347K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"87K/Mo March/April/May 44K June ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772485904806},{"mediaPartner":"WVR","campaignName":"Fairmont State University (MD)","platform":"DSP","goal":"44.5K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"11.1K/Mo March/April/May 6K June ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772486056686},{"mediaPartner":"WVR","campaignName":"Fairmont State University (MD) ","platform":"FB","goal":"44.5K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"11.1K/Mo March/April/May 6K June ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486135542},{"mediaPartner":"WVR","campaignName":"Fairmont State University (MD)  ","platform":"SP","goal":"44.5K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"11.1K/Mo March/April/May 6K June ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486155939},{"mediaPartner":"WVR","campaignName":"Fairmont State University (WV) ","platform":"FB","goal":"347K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"87K/Mo March/April/May 44K June ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486026268},{"mediaPartner":"WVR","campaignName":"Fairmont State University (WV) ","platform":"SP","goal":"347K (2/15/26 - 6/19/26)","endDate":"2026-06-19","status":"active","note1":"87K/Mo March/April/May 44K June ","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486034400},{"mediaPartner":"Allen Media Broadcasting","campaignName":"King Windward Nissan ","platform":"TD","goal":"179K (2/20/26 - 3/15/26)","endDate":"2026-03-15","status":"active","note1":"","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486199815},{"mediaPartner":"Allen Media Broadcasting","campaignName":"City of Dubuque","platform":"FB","goal":"20K (3/2/26 - 4/30/26)","endDate":"2026-04-30","status":"active","note1":"10K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486231814},{"mediaPartner":"Allen Media Broadcasting","campaignName":"City of Dubuque ","platform":"FBV","goal":"12K (3/2/26 - 4/30/26)","endDate":"2026-04-30","status":"active","note1":"6K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486241660},{"mediaPartner":"Allen Media Broadcasting","campaignName":"City of Dubuque ","platform":"FBV","goal":"35K (3/2/26 - 4/30/26)","endDate":"2026-04-30","status":"active","note1":"18K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486264350},{"mediaPartner":"Allen Media Broadcasting","campaignName":"City of Dubuque ","platform":"YT","goal":"6K Views (3/2/26 - 4/30/26)","endDate":"2026-04-30","status":"active","note1":"3K Views/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":false,"id":1772486294122},{"mediaPartner":"Allen Media Broadcasting","campaignName":"City of Dubuque  ","platform":"TD","goal":"91K (3/2/26 - 4/30/26)","endDate":"2026-04-30","status":"active","note1":"46K/Mo","note2":"","lastChecked":"2026-03-02","impressions":"","ctr":"","cpm":"","spend":"","monthlyFlight":true,"id":1772486311325}];

const ALL_PLATFORMS = ["FB","DSP","CTV","OTT","SP","SEM","TD","OTTD","FBV","TT","IG","YT","EMAIL"];

const STATUS_CFG = {
  "active":        { label:"Active",        color:"#22c55e", bg:"#052e16" },
  "pacing-ahead":  { label:"Pacing Ahead",  color:"#fb923c", bg:"#1c0f00" },
  "pacing-behind": { label:"Pacing Behind", color:"#fde047", bg:"#1c1800" },
  "off":           { label:"Off",           color:"#ef4444", bg:"#1c0505" },
  "close-to-goal": { label:"Close to Goal",  color:"#2dd4bf", bg:"#042220" },
  "":              { label:"Unknown",       color:"#a855f7", bg:"#1a0a2e" },
};

const PLT_COLORS = {
  SEM:"#b91c1c", TD:"#4ade80", DSP:"#7dd3fc", FB:"#f472b6",
  FBV:"#a855f7", CTV:"#cbd5e1", OTT:"#6b7280", OTTD:"#1e3a8a",
  YT:"#93c5fd", SP:"#fde047", EMAIL:"#fb923c", TT:"#94a3b8",
  IG:"#e1306c", default:"#64748b"
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

function StatusBadge({ status }) {
  const c = STATUS_CFG[status||""] || STATUS_CFG[""];
  return <span style={{ background:c.bg, color:c.color, border:`1px solid ${c.color}40`, borderRadius:4, padding:"2px 8px", fontSize:11, fontWeight:600, letterSpacing:"0.05em", textTransform:"uppercase", whiteSpace:"nowrap" }}>{c.label}</span>;
}
function PlatformTag({ p }) {
  const col = PLT_COLORS[p] || PLT_COLORS.default;
  return <span style={{ background:col+"22", color:col, border:`1px solid ${col}55`, borderRadius:3, padding:"1px 7px", fontSize:11, fontWeight:700, letterSpacing:"0.08em" }}>{p}</span>;
}
function EndChip({ d }) {
  const days = getDaysLeft(d);
  const col = days<0?"#6b7280":days<=14?"#ef4444":days<=30?"#f59e0b":"#22c55e";
  return <span style={{ color:col, fontSize:12, fontFamily:"Inter,sans-serif", fontWeight:600, fontVariantNumeric:"tabular-nums" }}>{d} <span style={{opacity:.6,fontWeight:400}}>({days<0?"Ended":days===0?"Today":`${days}d`})</span></span>;
}

function MetricPill({ label, value, color, prefix="", suffix="" }) {
  const disp = fmtNum(value);
  if (!disp) return null;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:3, background:color+"18", border:`1px solid ${color}35`, borderRadius:4, padding:"1px 7px", fontSize:10, color, whiteSpace:"nowrap" }}>
      <span style={{ opacity:.55, fontSize:9 }}>{label}</span>
      <span style={{ fontFamily:"Inter,sans-serif", fontWeight:700, fontVariantNumeric:"tabular-nums" }}>{prefix}{disp}{suffix}</span>
    </span>
  );
}

function MetricRow({ c, colSpan, onUpdate, dateRange }) {
  const [local, setLocal] = useState({ impressions:c.impressions||"", ctr:c.ctr||"", cpm:c.cpm||"", spend:c.spend||"" });
  const [dirty, setDirty] = useState(false);
  const set = (k,v) => { setLocal(p=>({...p,[k]:v})); setDirty(true); };
  const save = () => { onUpdate({...c,...local}); setDirty(false); };

  const iS = { background:"#070e1c", border:"1px solid #1e293b", borderRadius:6, padding:"7px 10px", color:"#e2e8f0", fontSize:13, width:"100%", fontFamily:"Inter,sans-serif", boxSizing:"border-box" };
  const metrics = [
    { key:"impressions", label:"Impressions", color:"#60a5fa", prefix:"",  suffix:"" },
    { key:"ctr",         label:"CTR",         color:"#4ade80", prefix:"",  suffix:"%" },
    { key:"cpm",         label:"CPM",         color:"#fb923c", prefix:"$", suffix:"" },
    { key:"spend",       label:"Spend",       color:"#f472b6", prefix:"$", suffix:"" },
  ];

  return (
    <tr>
      <td colSpan={colSpan} style={{ padding:0, borderBottom:"1px solid #0d1525" }}>
        <div style={{ background:"#060d1a", borderTop:"1px solid #1a2744", padding:"16px 16px 16px 52px" }}>

          {/* Header */}
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
            <span style={{ fontSize:11, color:"#3b82f6", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em" }}>📊 Metrics</span>
            {dateRange.start && (
              <span style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:4, padding:"1px 8px", fontSize:10, fontFamily:"monospace", color:"#64748b" }}>
                {dateRange.start === dateRange.end ? dateRange.start : `${dateRange.start} → ${dateRange.end}`}
              </span>
            )}
          </div>

          {/* Inputs grid */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4, minmax(130px, 200px))", gap:12, marginBottom:14 }}>
            {metrics.map(({key, label, color, prefix, suffix}) => (
              <div key={key}>
                <label style={{ display:"block", fontSize:10, color, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.07em", fontWeight:700 }}>
                  {prefix && <span style={{ opacity:.5, marginRight:1 }}>{prefix}</span>}{label}{suffix && <span style={{ opacity:.5, marginLeft:1 }}>{suffix}</span>}
                </label>
                <input
                  type="number"
                  value={local[key]}
                  onChange={e=>set(key,e.target.value)}
                  placeholder="—"
                  style={{ ...iS, borderColor: local[key] ? color+"60" : "#1e293b" }}
                />
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <button onClick={save} disabled={!dirty} style={{
              background: dirty?"#3b82f6":"#1a2744", border:"none", borderRadius:6,
              padding:"6px 18px", color: dirty?"#fff":"#3b5070",
              fontSize:12, fontWeight:700, cursor: dirty?"pointer":"default", transition:"all .15s"
            }}>Save Metrics</button>
            {!dirty && (c.impressions||c.ctr||c.cpm||c.spend) && (
              <span style={{ fontSize:11, color:"#22c55e", display:"flex", alignItems:"center", gap:4 }}>
                <span>✓</span><span>Metrics saved</span>
              </span>
            )}
            {(local.impressions||local.ctr||local.cpm||local.spend) && (
              <button onClick={()=>{ setLocal({impressions:"",ctr:"",cpm:"",spend:""}); setDirty(true); }}
                style={{ background:"none", border:"none", color:"#475569", fontSize:11, cursor:"pointer" }}>Clear all</button>
            )}
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

  const quickKeys = ["mtd", "yesterday"];
  const dropdownKeys = ["today", "last7", "last30", "lastMonth", "custom"];
  const isDropdownActive = dropdownKeys.includes(range.preset);

  function handleDropdown(val) {
    if (val === "custom") {
      setShowCustom(true);
      setRange({preset:"custom", start:cs, end:ce, label:"Custom"});
    } else if (val !== "__none__") {
      setShowCustom(false);
      const p = presets[val];
      setRange({preset:val, ...p});
    }
  }

  return (
    <div style={{ background:"#0a1628", border:"1px solid #1e293b", borderRadius:10, padding:"11px 16px", marginBottom:14, display:"flex", flexWrap:"wrap", alignItems:"center", gap:8 }}>
      <span style={{ fontSize:10, color:"#64748b", textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:700, marginRight:4 }}>📅 Date Range</span>

      {/* Quick buttons: MTD + Yesterday */}
      <div style={{ display:"flex", gap:5 }}>
        {quickKeys.map(k => {
          const on = range.preset === k;
          return (
            <button key={k} onClick={()=>{ setShowCustom(false); setRange({preset:k,...presets[k]}); }}
              style={{ background:on?"#1e3a5f":"#0f172a", border:`1px solid ${on?"#3b82f6":"#1e293b"}`, borderRadius:6, padding:"4px 13px", color:on?"#60a5fa":"#64748b", fontSize:12, fontWeight:on?700:500, cursor:"pointer" }}>
              {presets[k].label}
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div style={{ width:1, height:20, background:"#1e293b" }}/>

      {/* More dropdown */}
      <select
        value={isDropdownActive ? range.preset : "__none__"}
        onChange={e => handleDropdown(e.target.value)}
        style={{
          background: isDropdownActive?"#1e3a5f":"#0f172a",
          border:`1px solid ${isDropdownActive?"#3b82f6":"#1e293b"}`,
          borderRadius:6, padding:"4px 11px",
          color: isDropdownActive?"#60a5fa":"#64748b",
          fontSize:12, fontWeight: isDropdownActive?700:500, cursor:"pointer"
        }}
      >
        <option value="__none__" disabled>More…</option>
        <option value="today">Today</option>
        <option value="last7">Last 7 Days</option>
        <option value="last30">Last 30 Days</option>
        <option value="lastMonth">Last Month</option>
        <option value="custom">Custom Range…</option>
      </select>

      {/* Custom date inputs */}
      {(showCustom || range.preset==="custom") && (
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
          <input type="date" value={cs} onChange={e=>setCs(e.target.value)}
            style={{ background:"#0f172a", border:"1px solid #334155", borderRadius:6, padding:"4px 8px", color:"#e2e8f0", fontSize:12 }}/>
          <span style={{color:"#475569",fontSize:11}}>to</span>
          <input type="date" value={ce} onChange={e=>setCe(e.target.value)}
            style={{ background:"#0f172a", border:"1px solid #334155", borderRadius:6, padding:"4px 8px", color:"#e2e8f0", fontSize:12 }}/>
          <button onClick={()=>{ if(cs&&ce){ setRange({preset:"custom",start:cs,end:ce,label:`${cs} → ${ce}`}); setShowCustom(false); }}} disabled={!cs||!ce}
            style={{ background:cs&&ce?"#3b82f6":"#1e293b", border:"none", borderRadius:6, padding:"4px 12px", color:cs&&ce?"#fff":"#475569", fontSize:12, fontWeight:700, cursor:cs&&ce?"pointer":"default" }}>Apply</button>
        </div>
      )}

      {/* Active range display */}
      {range.start && range.end && (
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ fontSize:11, color:"#475569" }}>Showing:</span>
          <span style={{ fontSize:11, color:"#60a5fa", fontFamily:"Inter,sans-serif", fontWeight:500, background:"#0f172a", border:"1px solid #1e293b", borderRadius:4, padding:"2px 8px" }}>
            {range.start===range.end ? range.start : `${range.start} → ${range.end}`}
          </span>
        </div>
      )}
    </div>
  );
}

function Modal({ campaign, onSave, onClose, isNew }) {
  const blank = { mediaPartner:"", campaignName:"", platform:"FB", goal:"", endDate:"", status:"active", note1:"", note2:"", lastChecked:getToday(), impressions:"", ctr:"", cpm:"", spend:"", monthlyFlight:false };
  const [f, setF] = useState(campaign ? {...campaign} : blank);
  const set = (k,v) => setF(p=>({...p,[k]:v}));
  const iS = { width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:6, padding:"7px 10px", color:"#e2e8f0", fontSize:13, boxSizing:"border-box" };
  const row = (key,label,type="text") => (
    <div style={{ marginBottom:12 }}>
      <label style={{ display:"block", fontSize:10, color:"#94a3b8", marginBottom:3, textTransform:"uppercase", letterSpacing:"0.06em" }}>{label}</label>
      {key==="status"   ? <select value={f.status||""} onChange={e=>set("status",e.target.value)} style={iS}>{Object.entries(STATUS_CFG).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}</select>
      :key==="platform" ? <select value={f.platform} onChange={e=>set("platform",e.target.value)} style={iS}>{ALL_PLATFORMS.map(p=><option key={p}>{p}</option>)}</select>
      :<input type={type} value={f[key]||""} onChange={e=>set(key,e.target.value)} style={iS}/>}
    </div>
  );
  function submit() {
    if (!f.campaignName.trim()||!f.mediaPartner.trim()) { alert("Campaign name and media partner required."); return; }
    onSave(isNew ? {...f,id:Date.now()} : f);
  }
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.8)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, backdropFilter:"blur(4px)" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:12, padding:24, width:"min(500px,95vw)", maxHeight:"90vh", overflowY:"auto", boxShadow:"0 30px 80px rgba(0,0,0,.9)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <h2 style={{ margin:0, color:"#f1f5f9", fontSize:15, fontWeight:700 }}>{isNew?"Add Campaign":"Edit Campaign"}</h2>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#64748b", cursor:"pointer", fontSize:22, lineHeight:1, padding:0 }}>×</button>
        </div>
        {row("mediaPartner","Media Partner")}
        {row("campaignName","Campaign Name")}
        {row("platform","Platform")}
        {row("goal","Goal")}
        {row("endDate","End Date","date")}
        {row("status","Status")}
        {row("note1","Note 1")}
        {row("note2","Note 2")}
        {row("lastChecked","Last Checked","date")}
        {/* Monthly Flight Toggle */}
        <div style={{ marginBottom:12 }}>
          <label style={{ display:"block", fontSize:10, color:"#94a3b8", marginBottom:3, textTransform:"uppercase", letterSpacing:"0.06em" }}>Monthly Flights</label>
          <button onClick={()=>set("monthlyFlight", !f.monthlyFlight)} style={{
            display:"flex", alignItems:"center", gap:8,
            background: f.monthlyFlight ? "#042220" : "#1e293b",
            border: `1px solid ${f.monthlyFlight ? "#2dd4bf60" : "#334155"}`,
            borderRadius:7, padding:"8px 14px", cursor:"pointer", width:"100%"
          }}>
            <span style={{ fontSize:15, color: f.monthlyFlight ? "#2dd4bf" : "#475569", transition:"color .15s" }}>★</span>
            <span style={{ fontSize:12, color: f.monthlyFlight ? "#2dd4bf" : "#64748b", fontWeight: f.monthlyFlight ? 700 : 400 }}>
              {f.monthlyFlight ? "Monthly flights enabled" : "No monthly flights"}
            </span>
            <span style={{ marginLeft:"auto", fontSize:10, color: f.monthlyFlight ? "#2dd4bf" : "#334155" }}>
              {f.monthlyFlight ? "ON" : "OFF"}
            </span>
          </button>
        </div>
        <div style={{ display:"flex", gap:8, marginTop:8 }}>
          <button onClick={submit} style={{ flex:1, background:isNew?"#22c55e":"#3b82f6", border:"none", borderRadius:7, padding:"10px 0", color:isNew?"#000":"#fff", fontWeight:700, fontSize:14, cursor:"pointer" }}>{isNew?"Add Campaign":"Save Changes"}</button>
          <button onClick={onClose} style={{ flex:1, background:"#1e293b", border:"1px solid #334155", borderRadius:7, padding:"10px 0", color:"#94a3b8", fontWeight:600, fontSize:14, cursor:"pointer" }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const today = getToday();
  const COLS = 10;

  const [campaigns, setCampaigns] = useState(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : initialCampaigns; }
    catch { return initialCampaigns; }
  });
  const [search,     setSearch]     = useState("");
  const [fStatus,    setFStatus]    = useState("all");
  const [fPlatform,  setFPlatform]  = useState("all");
  const [fPartner,   setFPartner]   = useState("all");
  const [endAlertOpen, setEndAlertOpen] = useState(true);
  const [fMonthly,   setFMonthly]   = useState(false);
  const [sortKey,    setSortKey]    = useState("endDate");
  const [sortDir,    setSortDir]    = useState("asc");
  const [editTarget, setEditTarget] = useState(null);
  const [showAdd,    setShowAdd]    = useState(false);
  const [showExportReminder, setShowExportReminder] = useState(false);
  const [saved,      setSaved]      = useState(false);
  const [expanded,   setExpanded]   = useState(new Set());
  const [dragId,     setDragId]     = useState(null);
  const [dragOverId, setDragOverId] = useState(null);
  const [dateRange,  setDateRange]  = useState(()=>{ const p=getPresets(); return {preset:"mtd",...p.mtd}; });

  useEffect(()=>{
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns)); setSaved(true); setTimeout(()=>setSaved(false),1400); }
    catch(e){ console.error(e); }
  },[campaigns]);

  // Check if export reminder should show (every 3 days)
  useEffect(()=>{
    const last = localStorage.getItem(EXPORT_KEY);
    if (!last) { setShowExportReminder(true); return; }
    const daysSince = (Date.now() - parseInt(last)) / (1000*60*60*24);
    if (daysSince >= 3) setShowExportReminder(true);
  }, []);

  const platforms = useMemo(()=>[...new Set(campaigns.map(c=>c.platform))].sort(),[campaigns]);
  const partners  = useMemo(()=>[...new Set(campaigns.map(c=>c.mediaPartner.trim()))].sort(),[campaigns]);
  const endingSoon = useMemo(()=>campaigns.filter(c=>{ const d=getDaysLeft(c.endDate); return d>=0&&d<=14; }).sort((a,b)=>new Date(a.endDate)-new Date(b.endDate)),[campaigns]);

  const filtered = useMemo(()=>{
    let list = campaigns.filter(c=>{
      const q = search.toLowerCase();
      const ms = !q||c.campaignName.toLowerCase().includes(q)||c.mediaPartner.toLowerCase().includes(q)||c.platform.toLowerCase().includes(q);
      return ms && (fStatus==="all"||(c.status||"")===fStatus) && (fPlatform==="all"||c.platform===fPlatform) && (fPartner==="all"||c.mediaPartner===fPartner) && (!fMonthly || c.monthlyFlight);
    });
    return [...list].sort((a,b)=>{
      let va=a[sortKey]||"", vb=b[sortKey]||"";
      if(sortKey==="endDate"){va=new Date(va);vb=new Date(vb);}
      return va<vb?(sortDir==="asc"?-1:1):va>vb?(sortDir==="asc"?1:-1):0;
    });
  },[campaigns,search,fStatus,fPlatform,fPartner,fMonthly,sortKey,sortDir]);

  const stats = useMemo(()=>({
    total:  campaigns.length,
    active: campaigns.filter(c=>c.status==="active").length,
    ahead:  campaigns.filter(c=>c.status==="pacing-ahead").length,
    behind: campaigns.filter(c=>c.status==="pacing-behind").length,
    off:    campaigns.filter(c=>c.status==="off").length,
    soon:   campaigns.filter(c=>{ const d=getDaysLeft(c.endDate); return d>=0&&d<=14; }).length,
    closeToGoal: campaigns.filter(c=>c.status==="close-to-goal").length,
    monthlyFlights: campaigns.filter(c=>c.monthlyFlight).length,
  }),[campaigns]);

  function toggleExpand(id) { setExpanded(prev=>{ const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n; }); }
  function onDragStart(id) { setDragId(id); }
  function onDragOver(e, id) { e.preventDefault(); setDragOverId(id); }
  function onDrop(e, targetId) {
    e.preventDefault();
    if (!dragId || dragId === targetId) { setDragId(null); setDragOverId(null); return; }
    setCampaigns(cs => {
      const from = cs.findIndex(c => c.id === dragId);
      const to   = cs.findIndex(c => c.id === targetId);
      const next = [...cs];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    setDragId(null); setDragOverId(null);
  }
  function onDragEnd() { setDragId(null); setDragOverId(null); }
  function updateCampaign(u) { setCampaigns(cs=>cs.map(c=>c.id===u.id?u:c)); }
  const sort = k=>{ if(sortKey===k)setSortDir(d=>d==="asc"?"desc":"asc"); else{setSortKey(k);setSortDir("asc");} };

  const TH = ({k,label,style={}}) => (
    <th onClick={()=>k&&sort(k)} style={{ padding:"10px 12px", textAlign:"left", fontSize:11, fontWeight:700, color:sortKey===k?"#60a5fa":"#64748b", textTransform:"uppercase", letterSpacing:"0.07em", whiteSpace:"nowrap", cursor:k?"pointer":"default", userSelect:"none", borderBottom:"1px solid #1e293b", ...style }}>
      {label}{sortKey===k?(sortDir==="asc"?" ↑":" ↓"):""}
    </th>
  );
  const TD = ({children,style={}}) => <td style={{ padding:"14px 12px", borderBottom:"1px solid #060c18", verticalAlign:"middle", ...style }}>{children}</td>;

  return (
    <div style={{ minHeight:"100vh", background:"#060c18", fontFamily:"'Inter','Segoe UI',system-ui,sans-serif", color:"#e2e8f0", fontSize:13 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@600;700&display=swap');
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-track{background:#0f172a;}
        ::-webkit-scrollbar-thumb{background:#334155;border-radius:3px;}
        input,select{outline:none;font-family:inherit;}
        input[type=number]::-webkit-inner-spin-button{opacity:.3;}
        input::placeholder{color:#2d3f55;}
        .crow:hover td{background:#0d1b2e!important;}
        .crow:hover .star-toggle{opacity:1!important;}
        button{font-family:inherit;}
        .xbtn{transition:transform .18s ease;}
        tr[draggable]{cursor:default;}
        tr[draggable]:active td{background:#0d1f38!important;}
        td, th { font-variant-numeric: tabular-nums; }
      `}</style>

      {/* Header */}
      <div style={{ background:"#0a1628", borderBottom:"1px solid #1e293b", padding:"13px 20px", position:"sticky", top:0, zIndex:50 }}>
        <div style={{ maxWidth:1600, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:17, fontWeight:700, color:"#f1f5f9", letterSpacing:"-0.02em" }}>Campaign Tracker</span>
            <span style={{ fontSize:11, padding:"2px 7px", borderRadius:4, background:saved?"#052e16":"transparent", color:saved?"#22c55e":"transparent", border:saved?"1px solid #22c55e40":"1px solid transparent", transition:"all .3s", fontWeight:600 }}>✓ Saved</span>
          </div>
          <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
            <button onClick={()=>setCampaigns(cs=>cs.map(c=>({...c,lastChecked:today})))} style={{ background:"#1e3a5f", border:"1px solid #3b82f640", borderRadius:7, padding:"6px 13px", color:"#60a5fa", fontWeight:600, fontSize:12, cursor:"pointer" }}>✓ Mark All Checked</button>
            <button onClick={()=>setShowAdd(true)} style={{ background:"#052e16", border:"1px solid #22c55e40", borderRadius:7, padding:"6px 13px", color:"#22c55e", fontWeight:600, fontSize:12, cursor:"pointer" }}>+ Add Campaign</button>
            <button onClick={()=>{ const b=new Blob([JSON.stringify({campaigns,exportDate:new Date().toISOString()},null,2)],{type:"application/json"}); const a=document.createElement("a"); a.href=URL.createObjectURL(b); a.download=`campaign-tracker-${today}.json`; a.click(); localStorage.setItem(EXPORT_KEY, Date.now().toString()); setShowExportReminder(false); }} style={{ background:"#1e293b", border:"1px solid #334155", borderRadius:7, padding:"6px 13px", color:"#94a3b8", fontWeight:600, fontSize:12, cursor:"pointer" }}>↓ Export</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1600, margin:"0 auto", padding:"18px 20px 40px" }}>

        {/* Export Reminder Banner */}
        {showExportReminder && (
          <div style={{ background:"#1c1200", border:"1px solid #f59e0b60", borderRadius:10, padding:"12px 18px", marginBottom:14, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:18 }}>💾</span>
              <div>
                <div style={{ color:"#f59e0b", fontWeight:700, fontSize:13 }}>Time to back up your data!</div>
                <div style={{ color:"#92400e", fontSize:11, marginTop:1 }}>It has been 3+ days since your last export. Export your JSON to avoid losing any changes if you clear your browser.</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={()=>{ const b=new Blob([JSON.stringify({campaigns,exportDate:new Date().toISOString()},null,2)],{type:"application/json"}); const a=document.createElement("a"); a.href=URL.createObjectURL(b); a.download=`campaign-tracker-${today}.json`; a.click(); localStorage.setItem(EXPORT_KEY, Date.now().toString()); setShowExportReminder(false); }}
                style={{ background:"#f59e0b", border:"none", borderRadius:7, padding:"7px 16px", color:"#000", fontWeight:700, fontSize:12, cursor:"pointer" }}>↓ Export Now</button>
              <button onClick={()=>{ localStorage.setItem(EXPORT_KEY, Date.now().toString()); setShowExportReminder(false); }}
                style={{ background:"none", border:"1px solid #92400e", borderRadius:7, padding:"7px 12px", color:"#92400e", fontWeight:600, fontSize:12, cursor:"pointer" }}>Remind me later</button>
            </div>
          </div>
        )}

        {/* End Date Alert Banner */}
        {endingSoon.length > 0 && (
          <div style={{ background:"#1a0a0a", border:"1px solid #ef444450", borderRadius:10, marginBottom:14, overflow:"hidden" }}>
            <button onClick={()=>setEndAlertOpen(o=>!o)} style={{ width:"100%", background:"none", border:"none", padding:"11px 16px", display:"flex", alignItems:"center", gap:10, cursor:"pointer", textAlign:"left" }}>
              <span style={{ fontSize:15 }}>🚨</span>
              <span style={{ color:"#ef4444", fontWeight:700, fontSize:13 }}>
                {endingSoon.length} campaign{endingSoon.length!==1?"s":""} ending within 14 days
              </span>
              <span style={{ marginLeft:"auto", color:"#ef4444", fontSize:11, opacity:.7 }}>{endAlertOpen?"▲ hide":"▼ show"}</span>
            </button>
            {endAlertOpen && (
              <div style={{ borderTop:"1px solid #ef444430", padding:"4px 0 8px" }}>
                {endingSoon.map(c=>{
                  const days = getDaysLeft(c.endDate);
                  return (
                    <div key={c.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"6px 16px", borderBottom:"1px solid #1a0a0a" }}>
                      <span style={{ fontWeight:700, color: days<=7?"#ef4444":"#f87171", fontSize:12, minWidth:55, fontVariantNumeric:"tabular-nums" }}>
                        {days===0?"Today":days===1?"1 day":`${days} days`}
                      </span>
                      <PlatformTag p={c.platform}/>
                      <span style={{ color:"#f1f5f9", fontWeight:600, fontSize:12 }}>{c.campaignName.trim()}</span>
                      <span style={{ color:"#64748b", fontSize:11 }}>{c.mediaPartner.trim()}</span>
                      <span style={{ marginLeft:"auto", color:"#475569", fontSize:11, fontVariantNumeric:"tabular-nums" }}>{c.endDate}</span>
                      <button onClick={()=>setEditTarget(c)} style={{ background:"#1e293b", border:"1px solid #334155", borderRadius:5, color:"#94a3b8", fontSize:11, padding:"3px 9px", cursor:"pointer", fontWeight:600 }}>Edit</button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        <div style={{ display:"flex", gap:9, flexWrap:"wrap", marginBottom:14 }}>
          {[{label:"Total",val:stats.total,color:"#94a3b8"},{label:"Active",val:stats.active,color:"#22c55e"},{label:"Ahead",val:stats.ahead,color:"#fb923c"},{label:"Behind",val:stats.behind,color:"#fde047"},{label:"Close to Goal",val:stats.closeToGoal,color:"#2dd4bf"},{label:"Off",val:stats.off,color:"#ef4444"},{label:"≤14d End",val:stats.soon,color:"#f87171"},{label:"★ Monthly",val:stats.monthlyFlights,color:"#2dd4bf"}].map(s=>(
            <div key={s.label} style={{ background:"#0f172a", border:`1px solid ${s.color}30`, borderRadius:8, padding:"9px 15px", minWidth:75 }}>
              <div style={{ fontSize:19, fontWeight:700, color:s.color, lineHeight:1 }}>{s.val}</div>
              <div style={{ fontSize:10, color:"#64748b", marginTop:3, textTransform:"uppercase", letterSpacing:"0.05em" }}>{s.label}</div>
            </div>
          ))}
          <div style={{ marginLeft:"auto", alignSelf:"center", fontSize:11, color:"#475569" }}>Today: {today}</div>
        </div>

        {/* Date Range */}
        <DateBar range={dateRange} setRange={setDateRange}/>

        {/* Filters */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", marginBottom:14 }}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search campaigns, partners, platforms…"
            style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:7, padding:"7px 13px", color:"#e2e8f0", fontSize:13, width:270 }}/>
          <select value={fStatus !== "all" ? fStatus : (fMonthly ? "__monthly__" : "all")} onChange={e=>{ if(e.target.value==="__monthly__"){ setFMonthly(true); setFStatus("all"); } else { setFMonthly(false); setFStatus(e.target.value); } }} style={{ background:"#0f172a", border:`1px solid ${fMonthly?"#2dd4bf":"#1e293b"}`, borderRadius:7, padding:"7px 11px", color: fMonthly?"#2dd4bf":"#94a3b8", fontSize:13, fontWeight: fMonthly?700:400 }}>
            <option value="all">All Statuses</option>
            {Object.entries(STATUS_CFG).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
            <option value="__monthly__">★ Monthly Flights</option>
          </select>
          <select value={fPlatform} onChange={e=>setFPlatform(e.target.value)} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:7, padding:"7px 11px", color:"#94a3b8", fontSize:13 }}>
            <option value="all">All Platforms</option>
            {platforms.map(p=><option key={p}>{p}</option>)}
          </select>
          <select value={fPartner} onChange={e=>setFPartner(e.target.value)} style={{ background:"#0f172a", border:`1px solid ${fPartner!=="all"?"#a78bfa":"#1e293b"}`, borderRadius:7, padding:"7px 11px", color:fPartner!=="all"?"#a78bfa":"#94a3b8", fontSize:13, fontWeight:fPartner!=="all"?700:400 }}>
            <option value="all">All Partners</option>
            {partners.map(p=><option key={p} value={p}>{p}</option>)}
          </select>
          <span style={{ fontSize:11, color:"#475569" }}>{filtered.length} result{filtered.length!==1?"s":""}</span>
        </div>

        {/* Table */}
        <div style={{ background:"#0a1628", border:"1px solid #1e293b", borderRadius:10, overflow:"hidden" }}>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", minWidth:920 }}>
              <thead>
                <tr style={{ background:"#060c18" }}>
                  <th style={{ width:28, borderBottom:"1px solid #1e293b" }}/>
                  <th style={{ width:36, borderBottom:"1px solid #1e293b" }}/>
                  <TH k="mediaPartner" label="Partner"/>
                  <TH k="campaignName" label="Campaign"/>
                  <TH k="platform"     label="Platform"/>
                  <TH k="status"       label="Status"/>
                  <TH k={null}         label="Goal"/>
                  <TH k="endDate"      label="End Date"/>
                  <TH k="lastChecked"  label="Last Checked"/>
                  <th style={{ padding:"10px 12px", fontSize:11, color:"#64748b", borderBottom:"1px solid #1e293b", textTransform:"uppercase", letterSpacing:"0.07em" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c,i)=>{
                  const stale   = c.lastChecked !== today;
                  const open    = expanded.has(c.id);
                  const hasData = !!(c.impressions||c.ctr||c.cpm||c.spend);
                  const rowBg   = i%2===0 ? "#0a1628" : "#080e1e";
                  return (
                    <>
                      <tr key={c.id} className="crow"
                        draggable
                        onDragStart={()=>onDragStart(c.id)}
                        onDragOver={e=>onDragOver(e,c.id)}
                        onDrop={e=>onDrop(e,c.id)}
                        onDragEnd={onDragEnd}
                        style={{ background: dragOverId===c.id?"#0d1f38":rowBg, opacity: dragId===c.id?0.4:1, transition:"opacity .15s,background .1s", cursor:"default" }}>
                        {/* drag handle */}
                        <td style={{ padding:"0 0 0 6px", borderBottom:"1px solid #060c18", textAlign:"center", verticalAlign:"middle", width:28, cursor:"grab" }}>
                          <span style={{ color:"#253650", fontSize:12, userSelect:"none", display:"block", lineHeight:1 }}>⠿</span>
                        </td>

                        {/* ▶ expand button */}
                        <td style={{ padding:"0 0 0 8px", borderBottom:"1px solid #060c18", textAlign:"center", verticalAlign:"middle", width:36 }}>
                          <button onClick={()=>toggleExpand(c.id)} className="xbtn" title={open?"Collapse metrics":"Expand metrics"} style={{
                            background:"none", border:"none", cursor:"pointer", padding:"5px 6px",
                            color: hasData?"#3b82f6":"#253650",
                            transform: open?"rotate(90deg)":"rotate(0deg)",
                            fontSize:11, lineHeight:1, display:"block", margin:"0 auto"
                          }}>▶</button>
                        </td>

                        <TD><span style={{ color:"#cbd5e1", fontWeight:500 }}>{c.mediaPartner.trim()}</span></TD>

                        <TD>
                          <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                            <span style={{ color:"#f1f5f9", fontWeight:600 }}>{c.campaignName.trim()}</span>
                            {c.monthlyFlight && (
                              <button onClick={()=>updateCampaign({...c,monthlyFlight:false})} title="Monthly flights — click to remove" style={{
                                background:"none", border:"none", padding:0, cursor:"pointer",
                                color:"#2dd4bf", fontSize:13, lineHeight:1, flexShrink:0
                              }}>★</button>
                            )}
                            {!c.monthlyFlight && (
                              <button onClick={()=>updateCampaign({...c,monthlyFlight:true})} title="Click to mark as monthly flights" style={{
                                background:"none", border:"none", padding:0, cursor:"pointer",
                                color:"#253650", fontSize:13, lineHeight:1, flexShrink:0, opacity:0
                              }} className="star-toggle">★</button>
                            )}
                            {c.note2 && c.note2.trim() && (
                              <span title={c.note2.trim()} style={{
                                background:"#2d0a0a", border:"1px solid #ef444460",
                                borderRadius:3, padding:"1px 5px", fontSize:9,
                                color:"#ef4444", fontWeight:700, letterSpacing:"0.05em",
                                whiteSpace:"nowrap", flexShrink:0, cursor:"default"
                              }}>⚠ {c.note2.trim().length > 18 ? c.note2.trim().slice(0,18)+"…" : c.note2.trim()}</span>
                            )}
                          </div>
                          {/* Note 1 subtitle */}
                          {c.note1 && c.note1.trim() && (
                            <div style={{ fontSize:10, color:"#4ade80", marginTop:2, fontFamily:"Inter,sans-serif", fontWeight:500, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:220 }} title={c.note1}>
                              {c.note1.trim()}
                            </div>
                          )}
                          {/* Inline metric pills when collapsed & has data */}
                          {!open && hasData && (
                            <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginTop:4 }}>
                              <MetricPill label="IMP"   value={c.impressions} color="#60a5fa"/>
                              <MetricPill label="CTR"   value={c.ctr}         color="#4ade80" suffix="%"/>
                              <MetricPill label="CPM"   value={c.cpm}         color="#fb923c" prefix="$"/>
                              <MetricPill label="SPEND" value={c.spend}       color="#f472b6" prefix="$"/>
                            </div>
                          )}
                        </TD>

                        <TD><PlatformTag p={c.platform}/></TD>

                        <TD>
                          <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                            <StatusBadge status={c.status}/>
                            <select value={c.status||""} onChange={e=>updateCampaign({...c,status:e.target.value})}
                              style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:4, color:"#64748b", fontSize:10, padding:"1px 4px", cursor:"pointer" }}>
                              {Object.entries(STATUS_CFG).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
                            </select>
                          </div>
                        </TD>

                        <TD style={{maxWidth:170}}>
                          <span style={{ color:"#94a3b8", fontFamily:"Inter,sans-serif", fontSize:11, display:"block", fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:160 }} title={c.goal}>{c.goal}</span>
                        </TD>

                        <TD><EndChip d={c.endDate}/></TD>

                        <TD>
                          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                            <span style={{ fontFamily:"Inter,sans-serif", fontSize:11, color:stale?"#f59e0b":"#22c55e", fontWeight:stale?600:400 }}>{c.lastChecked}</span>
                            {stale && (
                              <button onClick={()=>updateCampaign({...c,lastChecked:today})} style={{ background:"#1c2d1c", border:"1px solid #22c55e40", borderRadius:4, color:"#4ade80", fontSize:10, padding:"1px 6px", cursor:"pointer", fontWeight:700 }}>✓</button>
                            )}
                          </div>
                        </TD>

                        <TD>
                          <div style={{ display:"flex", gap:5 }}>
                            <button onClick={()=>setEditTarget(c)} style={{ background:"#1e293b", border:"1px solid #334155", borderRadius:5, color:"#94a3b8", fontSize:11, padding:"4px 9px", cursor:"pointer", fontWeight:600 }}>Edit</button>
                            <button onClick={()=>{ const copy={...c, id:Date.now(), campaignName:c.campaignName+" (copy)", impressions:"", ctr:"", cpm:"", spend:""}; setCampaigns(cs=>{const idx=cs.findIndex(x=>x.id===c.id); const n=[...cs]; n.splice(idx+1,0,copy); return n;}); setEditTarget(copy); }} title="Duplicate row" style={{ background:"#0f1f33", border:"1px solid #1e3a5f", borderRadius:5, color:"#60a5fa", fontSize:11, padding:"4px 8px", cursor:"pointer", fontWeight:600 }}>⧉</button>
                            <button onClick={()=>{ if(window.confirm("Delete this campaign?")) setCampaigns(cs=>cs.filter(x=>x.id!==c.id)); }} style={{ background:"#1c0505", border:"1px solid #ef444440", borderRadius:5, color:"#ef4444", fontSize:11, padding:"4px 8px", cursor:"pointer", fontWeight:600 }}>✕</button>
                          </div>
                        </TD>
                      </tr>

                      {open && (
                        <MetricRow key={`m-${c.id}`} c={c} colSpan={COLS} onUpdate={updateCampaign} dateRange={dateRange}/>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
            {filtered.length===0 && <div style={{ textAlign:"center", padding:"50px 0", color:"#475569" }}>No campaigns match your filters.</div>}
          </div>
        </div>

        <div style={{ marginTop:8, fontSize:11, color:"#253650", textAlign:"right" }}>
          ▶ click to expand metrics · blue arrow = data entered
        </div>
      </div>

      {editTarget && <Modal campaign={editTarget} onSave={u=>{ updateCampaign(u); setEditTarget(null); }} onClose={()=>setEditTarget(null)}/>}
      {showAdd    && <Modal isNew onSave={n=>{ setCampaigns(cs=>[...cs,n]); setShowAdd(false); }} onClose={()=>setShowAdd(false)}/>}
    </div>
  );
}
