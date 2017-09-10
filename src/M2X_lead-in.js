//Post multiple values to multiple streams example

var timestamp = msg.payload.timestamp || new Date().getTime();
timestamp = new Date(timestamp).toISOString();

//msg.topic = "devices";
//msg.action = "postMultiple";
//msg.topic_id = msg.payload.deviceID || global.get("deviceID");
msg.url = "https://api-m2x.att.com/v2/devices/";
if(msg.payload.deviceID) {
    var deviceID = msg.payload.deviceID || global.get("deviceID");
    msg.url += deviceID + "/updates";
} else if(msg.payload.serial) {
    msg.url += "serial/" + msg.payload.serial + "/updates";
}

msg.headers = {
    "X-M2X-KEY": global.get("M2X-Key"),
    "content-type": "application/json"
};

msg.payload = {
    "values": {
    "temp": [
        { "timestamp": timestamp, "value": msg.payload.temp  }],
    "humidity": [
        { "timestamp": timestamp, "value": msg.payload.humidity  }],
    "accelX": [
        { "timestamp": timestamp, "value": msg.payload.accelX  }],
    "accelY": [
        { "timestamp": timestamp, "value": msg.payload.accelY  }],
    "accelZ": [
        { "timestamp": timestamp, "value": msg.payload.accelZ  }],
    "heatIndex": [
        { "timestamp": timestamp, "value": msg.payload.heatIndex  }]
    }
};
return msg;