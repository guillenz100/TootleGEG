/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var GSERVERURL = "http://www.tootleerp.com/TootleCFDBancrea/TootleCFDUI/Utilerias/Post.aspx?intEmpresa=1&intConsulta=";


function parseXML(objData) {
    try {
        objData = $.parseXML(objData);
        $(objData).find("Error").each(function () {
            var objNode = $(this);
            utils_alert(objNode.find("Descripcion").text());
            return null;
        });
        return objData;
    } catch (e) {
       utils_alert(e);
    }
}

function utils_alert(str){
       $("#alert div").html(str);
       $( "#alert" ).popup( "open" );
}

function utils_numberWithCommas(x) {
    x = parseFloat(x).toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
    
/**
* Determine whether the file loaded from PhoneGap or not
*/
function utils_isPhoneGap() {
    return (window.cordova || window.PhoneGap || window.phonegap)
    && /^file:\/{3}[^\/]/i.test(window.location.href)
    && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
}
