var deviceDao = {
    getDevices: function(apiCtx, callback) {
        var pm = apiCtx.persistenceApi();
        pm.namedQuery("devices/queryAllDevices", apiCtx, callback);
    },
    getDevice: function(id, apiCtx, callback) {
        var pm = apiCtx.persistenceApi();
        pm.namedQuery("devices/queryDeviceById", {id: id}, apiCtx, callback);
    }
};

module.exports = deviceDao;