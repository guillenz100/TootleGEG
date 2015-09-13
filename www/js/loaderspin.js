/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var loaderspin = {
    // Application Constructor
    start:function(id){ 
        loaderspin_canvas =document.getElementById(id);
        loaderspin_canvas.style.display='';
        loaderspin_context = loaderspin_canvas.getContext('2d');
        loaderspin_start = new Date();
        loaderspin_lines = 50;
        loaderspin_cW = loaderspin_context.canvas.width;
        loaderspin_cH = loaderspin_context.canvas.height;
        loaderspin_timer= window.setInterval(loaderspin_draw, 100);
    },
    stop:function(){
        clearInterval(loaderspin_timer);
        loaderspin_canvas.style.display='none';
    }
    
};

var loaderspin_timer=null;
var loaderspin_canvas = null;
var loaderspin_context = null;
var loaderspin_start = null;
var loaderspin_lines = null;
var loaderspin_cW = null;
var loaderspin_cH = null;
 
var loaderspin_draw = function() {
    var rotation = parseInt(((new Date() - loaderspin_start) / 1800) * loaderspin_lines) / loaderspin_lines;
    loaderspin_context.save();
    loaderspin_context.clearRect(0, 0, loaderspin_cW, loaderspin_cH);
    loaderspin_context.translate(loaderspin_cW / 2, loaderspin_cH / 2);
    loaderspin_context.rotate(Math.PI * 2 * rotation);
    for (var i = 0; i < loaderspin_lines; i++) {
        loaderspin_context.beginPath();
        loaderspin_context.rotate(Math.PI * 2 / loaderspin_lines);
        loaderspin_context.moveTo(loaderspin_cW / 20, 0);
        loaderspin_context.lineTo(loaderspin_cW / 7, 0);
        loaderspin_context.lineWidth = loaderspin_cW / 30;
        loaderspin_context.strokeStyle = "rgba(0,255,0," + i / (loaderspin_lines*10) + ")";
        loaderspin_context.stroke();
    }
    loaderspin_context.restore();
};
