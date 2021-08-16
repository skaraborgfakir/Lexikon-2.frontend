// Time-stamp: <2021-08-16 17:42:08 stefan>
//

"use strict"

var spelplankontext;
var bredd;
var höjd;

var nyckelpiganÅtVänster, nyckelpiganÅtHöger, nyckelpiganUppåt, nyckelpiganNedåt;
var riktning = 'H';

function init() {
    let spelplan=document.createElement( "canvas");
    spelplan.width=800;
    spelplan.height=500;

     if (spelplan.getContext) {
	 spelplankontext = spelplan.getContext("2d");
	 spelplankontext.fileStyle = "#000000";
     }

    let vy=document.getElementById( "vy");
    vy.appendChild(spelplan);

    nyckelpigan['U']=document.createElement("img");
    nyckelpigan['U'].src="png/hraci1.png";

    nyckelpigan['H']=document.createElement("img");
    nyckelpigan['H'].src="png/hraci2.png";

    nyckelpigan['N']=document.createElement("img");
    nyckelpigan['N'].src="png/hraci3.png";

    nyckelpigan['V']=document.createElement("img");
    nyckelpigan['V'].src="png/hraci4.png";

    document.addEventListener( "keydown", tangenttryck, false);
}

document.addEventListener( "DOMContentLoaded", init, false);

function tangenttryck(event) {
    console.log("keypress");

    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.code) > -1) {
	console.log("preventDefault");
	event.preventDefault();
    }

    if(["ArrowUp"].indexOf(event.code) > -1) {
	var riktning = 'U';
	console.log("2 uppåt");
    } else if(["ArrowRight"].indexOf(event.code) > -1) {
	var riktning = 'H';
	console.log("2 höger");
    } else if(["ArrowDown"].indexOf(event.code) > -1) {
	var riktning = 'N';
	console.log("2 nedåt");
    } else if(["ArrowLeft"].indexOf(event.code) > -1) {
	var riktning = 'V';
	console.log("2 vänster");
    }

    spelplan.clearRect( x, y, 20, 20);
    spelplan.drawImage( nyckelpiga[riktning],
			0,   0, 20, 20,
			30, 30, 20, 20);
}
