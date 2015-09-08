/*1 TABLA 2 GRAFICA*/
var GTIPO = 0;
var GNUMEROCOLUMNAS = 3;
var GURL = "http://www.tootleerp.com/TootleCFDEnterprise/TootleCFDUI/Utilerias/Post.aspx?intConsulta=12&intEmpresa=1";
var GSTRFIELD1 = "MES";
var GSTRFIELD2 = "ANTERIOR";
var GSTRFIELD3 = "ACTUAL";
var GWIDTH="85%";

var GMAXVALUE = 0;
var GARR = [];
var GARR_empty = [];
var colors = ["#57EF25", "#F5102A", "#050505", "#E4DB23", "#1320B4"];
var GBLROTAR;
var GBLFIRSTLOAD = true;
var GDATA;
var GGOOGLECHART;
var GOPTIONS = {
    animation: {duration: 1000,easing: 'out'},
    legend: { position: 'none' },
    width: "75%",
    theme: 'material',
    chartArea: { width: "75%", height: '75%' },
    vAxis: { minValue: 0, maxValue: GMAXVALUE },
    hAxis: { minValue: 0, maxValue: GMAXVALUE }
};



function initGraph(){

    if (GNUMEROCOLUMNAS == 2) {
        if (GTIPO == 2) {
            GARR.push(['Tipo', 'Importe', { role: 'style' }, { type: 'string', role: 'annotation'}]);
            GARR_empty.push(['Tipo', 'Importe', { role: 'style' }, { type: 'string', role: 'annotation'}]);
        }

        if (GTIPO == 1) {
            GARR.push(['Tipo', 'Importe']);
            GARR_empty.push(['Tipo', 'Importe']);
        }
    }

    if (GNUMEROCOLUMNAS == 3) {
        if (GTIPO == 2) {
            GARR.push      (['Tipo 1', 'Importe 1', 'Importe 2', { type: 'string', role: 'annotation'}]);
            GARR_empty.push(['Tipo 1', 'Importe 1', 'Importe 2', { type: 'string', role: 'annotation'}]);
        }

        if (GTIPO == 1) {
            GARR.push(['Tipo 1', 'Importe 1', 'Importe 2']);
            GARR_empty.push(['Tipo 1', 'Importe 1', 'Importe 2']);
        }
    }
    google.setOnLoadCallback(callAjax);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function callAjax() {
    var intCount = 0;
    $.post(GURL, { intEmpresa: "1", intConsulta: "37" }, null, "text")
        .done(function(data) {
            data = $.parseXML(data)
            intCount = 0;
            $(data).find("Table").each(function() {
                var objOT = $(this);
                if (GNUMEROCOLUMNAS == 2) {
                    if (GTIPO == 2) {
                        GARR.push([objOT.find(GSTRFIELD1).text(), parseFloat(objOT.find(GSTRFIELD2).text()), colors[intCount], numberWithCommas(parseFloat(objOT.find(GSTRFIELD2).text()).toFixed(2))]);
                        GARR_empty.push([objOT.find(GSTRFIELD1).text(), 0, colors[intCount], ""]);
                        intCount++;
                    }
                    if (GTIPO == 1) {
                        GARR.push([objOT.find(GSTRFIELD1).text(), parseFloat(objOT.find(GSTRFIELD2).text()).toFixed(2)]);
                        GARR_empty.push([objOT.find(GSTRFIELD1).text(), 0]);
                    }

                    if (parseFloat(objOT.find(GSTRFIELD2).text()) > GMAXVALUE)
                        GMAXVALUE = parseFloat(objOT.find(GSTRFIELD2).text());
                }
                if (GNUMEROCOLUMNAS == 3) {
                    if (GTIPO == 2) {
                        GARR.push([objOT.find(GSTRFIELD1).text(), parseFloat(objOT.find(GSTRFIELD2).text()), parseFloat(objOT.find(GSTRFIELD3).text()), numberWithCommas(parseFloat(objOT.find(GSTRFIELD3).text()).toFixed(2))]);
                        GARR_empty.push([objOT.find(GSTRFIELD1).text(), 0, 0, ""]);
                        intCount++;
                    }
                    if (GTIPO == 1) {
                        GARR.push([objOT.find(GSTRFIELD1).text(), parseFloat(objOT.find(GSTRFIELD2).text()), parseFloat(objOT.find(GSTRFIELD3).text())]);
                        GARR_empty.push([objOT.find(GSTRFIELD1).text(), 0, 0]);
                    }

                    if (parseFloat(objOT.find(GSTRFIELD3).text()) > GMAXVALUE)
                        GMAXVALUE = parseFloat(objOT.find(GSTRFIELD3).text());
                }
                //Se actualiza max value
                GOPTIONS = {
                    animation: {duration: 1000,easing: 'out'},
                    legend: { position: 'none' },
                    width: "75%",
                    theme: 'material',
                    chartArea: { width: "75%", height: '75%' },
                    vAxis: { minValue: 0, maxValue: GMAXVALUE },
                    hAxis: { minValue: 0, maxValue: GMAXVALUE }
                };
                init(true);
            })
        }
    );
}


function init(blRotar) {
    if (blRotar == null){
        blRotar = false;
    }

    if (GTIPO == 1) {
        GGOOGLECHART = new google.visualization.Table(document.getElementById('divObject'));
    }
    if (GTIPO == 2) {
        if (!blRotar){
            GGOOGLECHART = new google.visualization.ColumnChart(document.getElementById('divObject'));
        }
        else{
            GGOOGLECHART = new google.visualization.BarChart(document.getElementById('divObject'));
        }
    }
    GBLFIRSTLOAD=true;
    drawObject();
    GBLFIRSTLOAD = false;
    setTimeout(drawObject, 1000);

}


function drawObject() {
    if (GBLFIRSTLOAD){
        GDATA = new google.visualization.arrayToDataTable(GARR_empty);
    }
    else{
        GDATA = new google.visualization.arrayToDataTable(GARR);
    }
    GGOOGLECHART.draw(GDATA, GOPTIONS);
    
}        

google.load("visualization", "1", { packages: ["corechart"] });
google.load("visualization", "1", { packages: ["table"] });


function doOnOrientationChange(){
    switch (window.orientation){
    case - 90:
        case 90:
            init(false);
            break;
        default:
            init(true);
            break;
    }
}
window.addEventListener('orientationchange', doOnOrientationChange);
        