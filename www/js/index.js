var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        database.queryEnd(app.start);
        database.initialize();
    },
    start:function(){
        if(!database.existeUsuario()){
            $("#txtUsuario").val("");
        }
        else{
            $("#txtUsuario").val(database.usuario());
        }
        
    }
};



if(utils_isPhoneGap())
    app.initialize();
else
    app.onDeviceReady();
