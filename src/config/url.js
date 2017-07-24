/**
 * Created by songyingchun on 2017/7/20.
 */
var path = require("path");
var dataPath = path.resolve(__dirname, "src/data");
var online = false;
var local = true;

module.exports = {
    getMyProfile: "http://user.backend.soushi88.com/userWx/getMyProfile",
    query: "http://slab.backend.soushi88.com/onsale/query",
    boutique: "http://slab.backend.soushi88.com/onsale/query",
    gallery: "http://lib.backend.soushi88.com/stoneLibWx/search",
};

if(local) {
    module.exports = {
        getMyProfile_fail: dataPath + "/getMyProfile_fail.json",
        getMyProfile_success: dataPath + "/getMyProfile_success.json",
        getMyProfile: dataPath + "/getMyProfile.json",
        query: dataPath + "/query.json",
        gallery: dataPath + "/gallery.json",
        boutique: dataPath + "/boutique.json",
    };
}
