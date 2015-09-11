/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var GURL = "http://www.tootleerp.com/TootleCFDEnterprise/TootleCFDUI/Utilerias/Post.aspx?intEmpresa=1&intConsulta=";
function parseXML(objData){
    objData = $.parseXML(objData);
     $(objData).find("Error").each(function() {
        var objNode = $(this); 
         alert(objNode.find("Descripcion").text());
         return null;
     });
     return objData;
}

function numberWithCommas(x) {
        x=parseFloat(x).toFixed(2);
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    