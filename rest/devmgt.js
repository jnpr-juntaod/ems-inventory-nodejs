var dao = require("../dao/devmgtdao");
var rest = {
    getDevices: function(apiCtx, callback) {
        dao.getDevices(apiCtx, callback);
    },
    getDevice: function(id, apiCtx, callback) {
        dao.getDevice(id, apiCtx, callback);
    },
    rebootDevice: function() {
        callback(null, null);
    }
};

module.exports = rest;