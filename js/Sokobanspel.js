// Time-stamp: <2021-08-16 20:11:03 stefan>
//

var spelplankontext;
var bredd;
var höjd;
var X;
var Y;

// png
var nyckelpiganÅtVänster, nyckelpiganÅtHöger, nyckelpiganUppåt, nyckelpiganNedåt;
var lådor;
var bakgrund;
var vägg;

//
var riktning;

function init() {
    let spelplan=document.createElement( "canvas");
    spelplan.width=tileMap01.width*20;    // spelytans storlek i pixel
    spelplan.height=tileMap01.height*20;  // spelytans storlek i pixel

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

    lådor=document.createElement("img");
    lådor.src="png/box_dark1.png";

    bakgrund=document.createElement("img");
    bakgrund="png/background2.png";

    vägg=document.createElement("img");
    vägg="png/wall_wood1.png";

    document.addEventListener( "keydown", tangenttryck, false);

    //
    // sök reda på startpunkten i labyrinten
    //
    for (var x=0; x < tileMap01.width ; x++) {
	for (var y=0; y < tileMap01.height ; y++) {
	    if ( tileMap01.mapGrid[y][x][0] === 'P') {
		X=x;
		Y=y;
		console.log( "tileMap01.mapGrid["+y+"]["+x+"][0]: "+ tileMap01.mapGrid[y][x][0]);
	    }
	}
    }

    console.log("X="+ X + ",Y="+ Y);
}

document.addEventListener( "DOMContentLoaded", init, false);

function tangenttryck(event) {
    var  flytta=false;
    console.log("keypress");

    if(["ArrowUp"].indexOf(event.code) > -1) {
	event.preventDefault();
	riktning = 'U';
	flytta=true;
    } else if(["ArrowRight"].indexOf(event.code) > -1) {
	event.preventDefault();
	riktning = 'H';
	flytta=true;
    } else if(["ArrowDown"].indexOf(event.code) > -1) {
	event.preventDefault();
	riktning = 'N';
	flytta=true;
    } else if(["ArrowLeft"].indexOf(event.code) > -1) {
	event.preventDefault();
	riktning = 'V';
	flytta=true;
    }

    if(flytta) {
	switch(riktning) {
	case 'U':
	    if (Y > 0) {
		spelplankontext.clearRect( 20*X, 20*Y, 20, 20);
		Y=Y-1;
		spelplankontext.drawImage( nyckelpiganUppåt,
					   0,   0, 20, 20,
					   20*X, 20*Y, 20, 20);
	    }
	    break;
	case 'H':
	    if (X < tileMap01.width - 1) {
		spelplankontext.clearRect( 20*X, 20*Y, 20, 20);
		X=X+1;
		spelplankontext.drawImage( nyckelpiganÅtHöger,
					   0,   0, 20, 20,
					   20*X, 20*Y, 20, 20);
	    }
	    break;
	case 'N':
	    if ( Y < tileMap01.height-1) {
		spelplankontext.clearRect( 20*X, 20*Y, 20, 20);
		Y=Y+1;
		spelplankontext.drawImage( nyckelpiganNedåt,
					   0,   0, 20, 20,
					   20*X, 20*Y, 20, 20);
	    }
	    break;
	case 'V':
	    if (X > 0) {
		spelplankontext.clearRect( 20*X, 20*Y, 20, 20);
		X=X-1;
		spelplankontext.drawImage( nyckelpiganÅtVänster,
					   0,   0, 20, 20,
					   20*X, 20*Y, 20, 20);
	    }
	    break;
	}
    }
}
