var element = document.querySelector("#greeting");
element.innerText = "Hello, world!";

function connect() {
    console.log('Requesting Bluetooth Device...');
    navigator.bluetooth.requestDevice(
        {
            acceptAllDevices: true,
            optionalServices: ['battery_service']
        })
        .then(device => {
            console.log('> Found ' + device.name);
            console.log('Connecting to GATT Server...');
            return device.gatt.connect();
        })
        .then(server => {
          // Getting Battery Service...
          return server.getPrimaryService('battery_service');
        })
        .then(service => {
          // Getting Battery Level Characteristic...
          return service.getCharacteristic('battery_level');
        })
        .then(characteristic => {
          // Reading Battery Level...
          return characteristic.readValue();
        })
        .then(value => {
          console.log('Battery percentage is ' + value.getUint8(0));
        })
        .catch(error => {
            console.log('Argh! ' + error);
        });
}