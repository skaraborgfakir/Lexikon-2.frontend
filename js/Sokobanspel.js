// Time-stamp: <2021-08-16 17:25:22 stefan>
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

document.addEventListener( "DOMContentLoaded", init(e), false);

function tangenttryck(e) {
    console.log("keypress");

    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
	console.log("preventDefault");
	e.preventDefault();
    }
}
