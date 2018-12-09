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


function displayContents(err, text) {
  if (err) {
    console.log('ScanerError', err._message);
  } else {
    console.log('Codigo', text);
  }
}


function escanearCodigo() {
  QRScanner.scan(displayContents);
  QRScanner.show();
  $(".ui-page-active").hide();
  $("#btnsScaner").show();
}


function cerrarEscaner() {
  console.log('cerrar');
  QRScanner.cancelScan(function(status){
    console.log('cancelando escaneado');
    console.log(status);
  });
  QRScanner.hide();
  $("#btnsScaner").hide();
  $(".ui-page-active").show();
}


$(document).ready(function() {
  $("#btnScan").click(() => {
    escanearCodigo();
  });

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


  setTimeout(() => {
    const btnCancel = '<button type="button"' +
        'class="f7 link dim br-pill bg-white ba ph3 pv2 mb2 dib black"' +
        'onclick="cerrarEscaner()">Cancelar</button>';
    const btns = '<div id="btnsScaner"' + 
        'class="pa3 w-100 tc absolute bottom-0 left-0">' +
        btnCancel + 
        '</div>';
    $("#cordova-plugin-qrscanner-video-preview").after(btns);
    $("#btnsScaner").hide();
  }, 1000);
});
