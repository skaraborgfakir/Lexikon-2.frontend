// Time-stamp: <2021-08-16 17:45:03 stefan>
//

"use strict"

var spelplankontext;
var bredd;
var höjd;

var nyckelpiganÅtVänster, nyckelpiganÅtHöger, nyckelpiganUppåt, nyckelpiganNedåt;
var nyckelpigan[4];
var riktning = 0;

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

    nyckelpigan[0]=document.createElement("img");
    nyckelpigan[0].src="png/hraci1.png";

    nyckelpigan[1]=document.createElement("img");
    nyckelpigan[1].src="png/hraci2.png";

    nyckelpigan[2]=document.createElement("img");
    nyckelpigan[2].src="png/hraci3.png";

    nyckelpigan[3]=document.createElement("img");
    nyckelpigan[3].src="png/hraci4.png";

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
	riktning = '0';
	console.log("2 uppåt");
    } else if(["ArrowRight"].indexOf(event.code) > -1) {
	riktning = '1';
	console.log("2 höger");
    } else if(["ArrowDown"].indexOf(event.code) > -1) {
	riktning = '2';
	console.log("2 nedåt");
    } else if(["ArrowLeft"].indexOf(event.code) > -1) {
	riktning = '3';
	console.log("2 vänster");
    }

    spelplan.clearRect( x, y, 20, 20);
    spelplan.drawImage( nyckelpiga[riktning],
			0,   0, 20, 20,
			30, 30, 20, 20);
}
