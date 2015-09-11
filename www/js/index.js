/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
        db.transaction(function (tx) {
          tx.executeSql('CREATE TABLE IF NOT EXISTS tbUsuario (strUsuario unique)');
          //tx.executeSql("DELETE FROM tbUsuario");
          //tx.executeSql('INSERT INTO tbUsuario (strUsuario) VALUES ("tootlesoft")');
          tx.executeSql('SELECT * FROM tbUsuario', [], function (tx, results) {
            var len = results.rows.length;
            for (var i = 0; i < len; i++) {
              alert(results.rows.item(i).strUsuario);
            }
          });
        });
        
        $("#pageone").css("display","block");
    }
};

if(isPhoneGap())
    app.initialize();
else
    app.onDeviceReady();
