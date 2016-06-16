var Wemo = require('wemo-client');
var wemo = new Wemo();

const onOffState = 10006;
const dimBulb = 10008;

function changeBrightness(client, light, brightness, duration, callback) {
    client.setDeviceStatus(light.deviceId, dimBulb, brightness + ":" + duration, callback);
}

function onOff(client, lamp, state) {
    client.setDeviceStatus(lamp.deviceId, onOffState, state)
}

wemo.load('http://192.168.1.73:49153/setup.xml', (deviceInfo) => {
    var client = wemo.client(deviceInfo)
    client.getEndDevices((err, endDeviceInfos) => {
        var lamp = endDeviceInfos[0];
        var turnBackUp = () => {
            changeBrightness(client, lamp, 255, 1)
        }
        changeBrightness(client, lamp, 0, 1, turnBackUp)
    });
});
