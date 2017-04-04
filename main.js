var element = document.querySelector("#greeting");
element.innerText = "Hello, world!";

function connect() {
    console.log('Requesting Bluetooth Device...');
    navigator.bluetooth.requestDevice(
        {
            filters: [{
            name: 'KDC'
          }],
          optionalServices: ['battery_service']
        })
        .then(device => {
            console.log('> Found ' + device.name);
            console.log('Connecting to GATT Server...');
            return device.gatt.connect();
        })
        .catch(error => {
            console.log('Argh! ' + error);
        });
}