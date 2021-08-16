// Time-stamp: <2021-08-16 17:52:43 stefan>
//

"use strict"

var spelplankontext;
var bredd;
var höjd;

var nyckelpiganÅtVänster, nyckelpiganÅtHöger, nyckelpiganUppåt, nyckelpiganNedåt;
var riktning = 'U';

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

    nyckelpiganUppåt=document.createElement("img");
    nyckelpiganUppåt.src="png/hraci1.png";
    nyckelpiganÅtHöger=document.createElement("img");
    nyckelpiganÅtHöger.src="png/hraci2.png";
    nyckelpiganNedåt=document.createElement("img");
    nyckelpiganNedåt.src="png/hraci3.png";
    nyckelpiganÅtVänster=document.createElement("img");
    nyckelpiganÅtVänster.src="png/hraci4.png";

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
	riktning = 'U';
	console.log("2 uppåt");
    } else if(["ArrowRight"].indexOf(event.code) > -1) {
	riktning = 'H';
	console.log("2 höger");
    } else if(["ArrowDown"].indexOf(event.code) > -1) {
	riktning = 'N';
	console.log("2 nedåt");
    } else if(["ArrowLeft"].indexOf(event.code) > -1) {
	riktning = 'V';
	console.log("2 vänster");
    }

    spelplan.clearRect( x, y, 20, 20);
    switch(riktning) {
    case 'U':
	spelplan.drawImage( nyckelpiganUppåt,
			    0,   0, 20, 20,
			    30, 30, 20, 20);
	break;
    case 'H':
	spelplan.drawImage( nyckelpiganÅtHöger,
			    0,   0, 20, 20,
			    30, 30, 20, 20);
	break;
    case 'N':
	spelplan.drawImage( nyckelpiganNedåt,
			    0,   0, 20, 20,
			    30, 30, 20, 20);
	break;
    case 'V':
	spelplan.drawImage( nyckelpiganÅtVänster,
			    0,   0, 20, 20,
			    30, 30, 20, 20);
	break;
    }
}
