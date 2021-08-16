// Time-stamp: <2021-08-16 18:10:00 stefan>
//

"use strict"

var spelplankontext;
var bredd;
var höjd;
var X; var startX=30;
var Y; var startY=30;

var nyckelpiganÅtVänster, nyckelpiganÅtHöger, nyckelpiganUppåt, nyckelpiganNedåt;
var riktning;

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

    riktning = 'U';
    X = 30;
    Y = 30;
    spelplankontext.drawImage( nyckelpiganUppåt,
			       0,       0, 20, 20,
			       20*x, 20*y, 20, 20);
}

document.addEventListener( "DOMContentLoaded", init, false);

function tangenttryck(event) {
    console.log("keypress");

    if(["ArrowUp"].indexOf(event.code) > -1) {
	event.preventDefault();
	riktning = 'U';
	console.log("2 uppåt");
    } else if(["ArrowRight"].indexOf(event.code) > -1) {
	event.preventDefault();
	riktning = 'H';
	console.log("2 höger");
    } else if(["ArrowDown"].indexOf(event.code) > -1) {
	event.preventDefault();
	riktning = 'N';
	console.log("2 nedåt");
    } else if(["ArrowLeft"].indexOf(event.code) > -1) {
	event.preventDefault();
	riktning = 'V';
	console.log("2 vänster");
    }

    spelplankontext.clearRect( 30, 30, 20, 20);
    switch(riktning) {
    case 'U':
	spelplankontext.drawImage( nyckelpiganUppåt,
				   0,   0, 20, 20,
				   30, 30, 20, 20);
	break;
    case 'H':
	spelplankontext.drawImage( nyckelpiganÅtHöger,
				   0,   0, 20, 20,
				   30, 30, 20, 20);
	break;
    case 'N':
	spelplankontext.drawImage( nyckelpiganNedåt,
				   0,   0, 20, 20,
				   30, 30, 20, 20);
	break;
    case 'V':
	spelplankontext.drawImage( nyckelpiganÅtVänster,
				   0,   0, 20, 20,
				   30, 30, 20, 20);
	break;
    }
}
