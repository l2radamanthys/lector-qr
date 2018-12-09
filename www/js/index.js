// var QRScanner = require('QRScanner');
var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
      console.log('cordova running');
      QRScanner.prepare(onDone);
    }
};

app.initialize();

/**
 * Finaliza la carga del componente para escanear codigo QR
 */
function onDone(err, status){
  if (err) {
    console.log('QR ERR', err._message);
  } else {
    console.log('QRScanner is initialized. Status:');
    console.log(status);
  }
}
