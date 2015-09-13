/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var security = {
    // Application Constructor
    functionEnd:function(func){ 
        security_functionEnd=func;
    },
    validate: function(usuario,password) {
        security_url =GSERVERURL+ "-1&action=Validar&param0="+usuario+"&param1="+password;
        security_call();
    },
    valido:function(){
        return security_usuariovalido;
    }
};


security_functionEnd=null;
security_url=null;
security_usuariovalido=null;

function security_call() {
    $.post(security_url, { intEmpresa: "1", intConsulta: "0" }, null, "text")
        .done(function(data) {
            data = parseXML(data);
            if(data==null)
                return;
            $(data).find("Table").each(function() {
                var objNode = $(this);
                if (objNode.find("Result").text()=="OK"){
                    security_usuariovalido=true;    
                }else{
                    security_usuariovalido=false;    
                }
            });
            if (security_functionEnd!=null)
                security_functionEnd();

        }
    );
}
