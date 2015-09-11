var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        /*Accediendo a la BD*/
        var db = window.openDatabase('tootlebancrea', '1.0', 'Aplicacion de Negocios Bancrea', 1 * 1024 * 1024);
        db.transaction(populateDB, errorCB, successCB);
        
        $("#pageone").css("display","block");
    }
};

function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS tbUsuario (strUsuario unique)');
    tx.executeSql("SELECT * FROM tbUsuario", [], function (tran, table) {
        if (table.rows.length==0){
            tx.executeSql('INSERT INTO tbUsuario (strUsuario) VALUES ("tootlesoft")');
        }else{
            for (var i = 0; i < table.rows.length; i++) {
              alert(table.rows.item(i).strUsuario);
            }
        }
    });
}

function errorCB(err) {
    alert("Error procesando la consulta SQL: "+err.message);
}

function successCB() {
}


if(isPhoneGap())
    app.initialize();
else
    app.onDeviceReady();
