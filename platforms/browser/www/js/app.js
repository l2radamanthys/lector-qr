$(document).ready(function() {
    $("#btnScan").click(function (e) {
        $('body').addClass('transparent');
        QRscanner.show();
        QRScanner.scan(displayContents);
    })

    $("#btnSendEntry").click(function (e) {
        enviarDatos();
    });

    $("#btnSaveConfig").click((e) => {
      localStorage.setItem('qr_server_url', $("#txtServerHost").val());
      localStorage.setItem('qr_server_port', $("#txtServerPort").val());
    });


    let qr_server_url = localStorage.getItem('qr_server_url');
    if (qr_server_url === undefined || qr_server_url === null) {
      localStorage.setItem('qr_server_url', "http://192.168.1.2");
      localStorage.setItem('qr_server_port', "8181");
    } else {
      $("#txtServerHost").val(localStorage.getItem('qr_server_url'));
      $("#txtServerPort").val(localStorage.getItem('qr_server_port'));
    }

});


function enviarDatos(texto) {
    texto = texto !== undefined ? texto : $("#txtDataEntry").val();
    //let texto = $("#txtDataEntry").val();
    let url = localStorage.getItem('qr_server_url');
    let port = localStorage.getItem('qr_server_port');
    $.ajax({
        url: `${url}:${port}/send-text/`,
        type: "POST",
        data: {
            data: texto,
        },
        success: function(response) {
            console.log('r', response);
        }
    });
}

function displayContents(err, text){
  if(err) {
    // an error occurred, or the scan was canceled (error code `6`)
    console.log(err)
    alert(err._message);
  } else {
    alert(text);
    $('body').removeClass('transparent');
  }
}
