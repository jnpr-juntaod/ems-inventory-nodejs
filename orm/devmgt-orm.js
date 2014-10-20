var orm = {
    "devices" : {
        "queryAllDevices": {
            "mapping": "devices/device",
            "select": {
                "distinct d.id" : 			{"mapping": "id", "sortable":"false", "filter":"false", "select": "default"},
                "d.domainId" : 				{"mapping": "domainId", "select": "default"},
                "d.type" : 					{"mapping": "deviceType", "select": "default"},
                "d.hostname" : 				{"mapping": "system/hostname", "select": "default"},
                "d.SerialNumber" : 			{"mapping": "system/serial", "select": "default"},
                "d.deviceFamily" : 			{"mapping": "system/family", "select": "default"},
                "d.SoftwareRelease" : 		{"mapping": "system/osVersion","select": "default"},
                "d.platform" : 				{"mapping": "system/platform","select": "default"},
                "d.vendor" : 				{"mapping": "system/vendor", "select": "default"},
                "d.lastRebootedTimestamp" : {"mapping": "system/lastRebootTime", "select": "default"},
                "cm.ip" : 					{"mapping": "system/ip", from: ["3"], "select": "default"},
                "cm.connectionType" : 		{"mapping": "mgtConnection/type", from: ["3"], "select": "default"},
                "dc.connStatus" : 			{"mapping": "mgtConnection/status", "select": "default", from: [1]},
                "dc.authenticationStatus" : {"mapping": "mgtConnection/auth", "select": "default", from: [1]},
                "d.webMgt" : 				{"mapping": "mgtConnection/webMgt"},
                "d.redundancyGroupStatus" : {"mapping": "redundancy/configStatus"},
                "d.dualREStatus" : 			{"mapping": "redundancy/masterRE"},
                "d.hostingDevice_id" : 		{"mapping": "lsysInfo/lsysRoot/id"},
                "d.lsysCount" : 			{"mapping": "lsysInfo/lsysMembers/count"},
                "cs.deviceState" : 			{"mapping": "configInfo/configStatus", from: ["2"], "select": "default"},
                "cs.ccState" : 				{"mapping": "configInfo/candidateConfigState"},
                "d.virtualChassisStatus" : 	{"mapping": ""},
                "d.trapTarget" : 			{"mapping": function(record, value, yangData, apiCtx, callback) {
                    callback();
                }, "select": "optional"},
                "do.name" : {"mapping": "system/domainname", from: ["4"], "select": "default"}
            },
            "from": [
                {table: "LogicalDevice d", clause: ""},
                {table: "LEFT JOIN DeviceConnectionStatus dc on dc.device_id_id=d.id", clause: null},
                {table: "LEFT JOIN DeviceConfigStatus cs on cs.device_id_id=d.id", clause: null},
                {table: "LEFT JOIN DeviceConnectionManagement cm on cm.device_id_id=d.id", clause: null},
                {table: "LEFT JOIN DomainEntity do on do.id=d.domainId", clause: null}
            ],
            "where": "$FILTER$DOMAINFILTER",
            "order by" : "d.hostname",
            "preConvert": function(apiCtx, result, callback) {
                callback(null, result);
            },
            "postProcess": function(apiCtx, result, callback) {
                callback(null, result);
            }
        },
        "queryDeviceById": {
            "mapping": null,
            "validator": "device-management.devices.device",
            "extend": "devices.queryAllDevices",
            "where": "d.id=?",
            "order by" : null
        }
    }
};

module.exports = orm;