// baidu geolocation

var cordova = require('cordova');

var SERVICE_NAME = 'BaiduGeolocation';
var ACTION_GET_CURRENT_POSITION = 'getCurrentPosition';
var ACTION_WATCH_POSITION = 'watchPosition';
var ACTION_CLEAR_WATCH = 'clearWatch';

var geolocation = module.exports = {};

geolocation.watchId;

geolocation.getCurrentPosition = function (success, error, options) {
  cordova.exec(success, error, SERVICE_NAME, ACTION_GET_CURRENT_POSITION, [options]);
};

geolocation.watchPosition = function (success, error, options) {
	if (typeof(geolocation.watchId) != "undefined") {
		geolocation.clearWatch(geolocation.watchId);
	}
	geolocation.getCurrentPosition(success, error, options);
	geolocation.watchId = setInterval(function() {
		geolocation.getCurrentPosition(success, error, options);
	}, 10000);
	return geolocation.watchId;
//  cordova.exec(success, error, SERVICE_NAME, ACTION_WATCH_POSITION, [options]);
};

geolocation.clearWatch = function (watchId) {
	clearInterval(watchId);
	geolocation.watchId = undefined;
//  cordova.exec(function () {
//    alert(JSON.stringify(arguments));
//  }, function () {
//    alert('fail');
//  }, SERVICE_NAME, ACTION_CLEAR_WATCH, [watchId]);
};
