/* 
 * 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var database = {
    // Application Constructor
    queryEnd:function(func){ 
        database_queryEnd=func;
    },
    initialize: function() {
        database_object = window.openDatabase('tootlebancrea', '1.0', 'Aplicacion de Negocios Bancrea', 1 * 1024 * 1024);
        database_object.transaction(database_initialize, database_Error, database_Success);
    },
    existeUsuario: function() {
         return database_existeUsuario;
    },
    usuario: function() {
         return database_usuario;
    },
    delete: function() {
        database_object.transaction(database_Delete, database_Error, database_Success);
    },
    save: function(strUsuario) {
        database_usuario=strUsuario;
        database_object.transaction(database_Save, database_Error, database_Success);
    }
};


var database_object;
var database_existeUsuario=null;
var database_usuario=null;
var database_queryEnd=null;


function database_initialize(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS tbUsuario (strUsuario unique)');
}

function database_refresh(strError){
     database_object = window.openDatabase('tootlebancrea', '1.0', 'Aplicacion de Negocios Bancrea', 1 * 1024 * 1024);
        database_object.transaction(function (tx) {
            tx.executeSql("SELECT * FROM tbUsuario", [], function (tran, table) {
           if (table.rows.length===0){
               database_existeUsuario=false;
               database_usuario=null;
           }else{
               for (var i = 0; i < table.rows.length; i++) {
                   database_existeUsuario=true;
                   database_usuario=table.rows.item(i).strUsuario;
               }
           }
            if (database_queryEnd!==null){
                database_queryEnd(strError);
            }
            else{
                alert(strError);
            }
       });
     });   
}

function database_Delete(tx) {
    tx.executeSql('DELETE FROM tbUsuario');
}

function database_Save(tx) {
    tx.executeSql('DELETE FROM tbUsuario');
    tx.executeSql('INSERT INTO tbUsuario (strUsuario) VALUES (\"'+database_usuario+'\")');
}

function database_Error(err) {
    database_refresh("Error procesando la consulta SQL: "+err.message);
}

function database_Success() {
    database_refresh();
}
