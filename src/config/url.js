/**
 * Created by songyingchun on 2017/7/20.
 */
var path = require("path");
var dataPath = path.resolve(__dirname, "src/data");
var online = false;

if(online) {
    dataPath = "http://user.backend.soushi88.com/userWx";
}

module.exports = {
    getMyProfile_fail: dataPath + "/getMyProfile_fail.json",
    getMyProfile_success: dataPath + "/getMyProfile_success.json",
    getMyProfile: dataPath + "/getMyProfile.json",
    query: dataPath + "/query.json"
};