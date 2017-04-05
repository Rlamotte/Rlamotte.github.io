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
          console.log('Obtention du service battery');
          return server.getPrimaryService('battery_service');
        })
        .then(service => {
          console.log('Obtention de la characteristic battery');
          // Getting Battery Level Characteristic...
          return service.getCharacteristic('battery_level');
        })
        .then(characteristic => {
          console.log('lecture de la characteristic');
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