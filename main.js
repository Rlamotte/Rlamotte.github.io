var element = document.querySelector("#greeting");
element.innerText = "Hello, world!";

function connect() {
    console.log('Requesting Bluetooth Device...');
    navigator.bluetooth.requestDevice(
        {
            acceptAllDevices: true,
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