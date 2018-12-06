$(document).ready(function() {
    $("#btnScan").click(function (e) {
        iniciarScaner();
    })

    $("#btnSendEntry").click(function (e) {
        enviarDatosManual();
    });

    let scaner = localStorage.getItem('scaner');
    console.log('d', scaner);
    if (scaner === undefined || scaner === null) {
      localStorage.setItem('scaner', {
        url: "http://192.168.1.2/sendkeys/",
        port: '8181'
      });
    }

});


function enviarDatosManual() {
    let texto = $("#txtDataEntry").val();
    let scaner = localStorage.getItem('scaner');
    $.ajax({
        url: `${scaner.url}:${scaner.port}/sendkeys/`,
        type: "POST",
        data: {
            ScanData: texto,
        },
        success: function(response) {
            console.log(response);
        }
    });
}


function iniciarScaner() {
  /*
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            alert(result.text + " . " + result.format);
        }
        function (error) {
            alert("scaner fallo " + error);
        }
    );
  */
}
