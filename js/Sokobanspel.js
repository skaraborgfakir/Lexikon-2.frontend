/* Time-stamp: <2021-08-17 12:08:03 stefan>
 */

var bredd;
var höjd;
var spelplankontext;
var avatarX; var avatarY;               // nyckelpigans positioner
var antalLådor;
var antalLådorIBo = 0;
var lådor = new Array();
var lådorX = new Array(); var lådorY=new Array();           // tom matris för lådornas pos
var antalMålpunkter;
var målpunkterX=new Array(); var målpunkterY=new Array(); //

// PNG
var nyckelpiganÅtVänster, nyckelpiganÅtHöger, nyckelpiganUppåt, nyckelpiganNedåt;
var lådorSprite;
var bakgrund;
var vägg; var väggInläst;
var golv; var golvInläst;

//
var riktning;

function init() {
    let spelplan=document.createElement( "canvas");
    spelplan.width=tileMap01.width*40;    // spelytans storlek i pixel
    spelplan.height=tileMap01.height*40;  // spelytans storlek i pixel

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

    lådorSprite=document.createElement("img");
    lådorSprite.src="png/box_dark1.png";

    bakgrund=document.createElement("img");
    bakgrund.src="png/background2.png";

    golv=document.createElement("img");
    golv.addEventListener('load', (event) => {
	golvInläst=true;
    });
    golv.src="png/floor_gray1.png";

    vägg=document.createElement("img");
    vägg.addEventListener('load', (event) => {
	väggInläst=true;
    });
    vägg.src="png/wall_wood1.png";

    document.addEventListener( "keydown", tangenttryck, false);

    //
    // sök reda på olika punkter i labyrinten
    //
    for (var x=0; x < tileMap01.width ; x++) {
	for (var y=0; y < tileMap01.height ; y++) {
	    switch (tileMap01.mapGrid[y][x][0]) {
	    case 'W':
		break;
	    case 'B':
		antalLådor=antalLådor+1;
		lådor.push( { X: x, Y: y});
		console.log( "{ X: x, Y: y}" + lådor[0].X);
		lådorX.push(x);
		lådorY.push(y);
		console.log( "lådorY.length:"+lådorY.length);
		break;
	    case 'P':
		avatarX=x;
		avatarY=y;
		console.log( "tileMap01.mapGrid["+y+"]["+x+"][0]: "+ tileMap01.mapGrid[y][x][0]);
		break;
	    case 'G':
		antalMålpunkter=antalMålpunkter+1;
		målpunkterX.push(x);
		målpunkterY.push(y);
		console.log( "målpunkterY.length:"+målpunkterY.length);
		break;
	    }
	}
    }

    setInterval(paint,20);
    riktning='U';

    // console.log("avatarX="+ avatarX + ",avatarY="+ avatarY);
}

document.addEventListener( "DOMContentLoaded", init, false);

function paint() {
    if (väggInläst && golvInläst) {
	spelplankontext.drawImage( bakgrund,
				   0, 0, tileMap01.width*40, tileMap01.height*40);

	for (var x=0; x < tileMap01.width ; x++) {
	    for (var y=0; y < tileMap01.height ; y++) {
		switch( tileMap01.mapGrid[y][x][0]) {
		case 'W':
		    spelplankontext.drawImage( vägg,
					       23*40, 0,   40, 40,
					       40*x, 40*y, 40, 40);
		    break;
		case 'B':
		    spelplankontext.drawImage( lådorSprite,
					       0,           0, 40, 40,
					       40*x+5, 40*y+5, 30, 30);
		    break;
		case 'G':
		    spelplankontext.beginPath();
		    spelplankontext.arc(40*x+20, 40*y+20, 8, 0, 2 * Math.PI);
		    spelplankontext.fillStyle="#991010";
		    spelplankontext.fill();
		    spelplankontext.stroke();
		    break;
		case ' ':
		    break;
		}
	    }
	}

	switch(riktning) {
	case 'U':
	    spelplankontext.drawImage( nyckelpiganUppåt,
				       0,   0, 20, 20,
				       40*avatarX+5, 40*avatarY+5, 30, 30);
	    break;
	case 'H':
	    spelplankontext.drawImage( nyckelpiganÅtHöger,
				       0,   0, 20, 20,
				       40*avatarX+5, 40*avatarY+5, 30, 30);
	    break;
	case 'N':
	    spelplankontext.drawImage( nyckelpiganNedåt,
				       0,   0, 20, 20,
				       40*avatarX+5, 40*avatarY+5, 30, 30);
	    break;
	case 'V':
	    spelplankontext.drawImage( nyckelpiganÅtVänster,
				       0,   0, 20, 20,
				       40*avatarX+5, 40*avatarY+5, 30, 30);
	    break;
	}
    }
}

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
	    if ( ( tileMap01.mapGrid[avatarY-2][avatarX][0]==' ' ||
		   tileMap01.mapGrid[avatarY-2][avatarX][0]=='G') &&
		 tileMap01.mapGrid[avatarY-1][avatarX][0]=='B') {
		tileMap01.mapGrid[avatarY-2][avatarX][0]=tileMap01.mapGrid[avatarY-1][avatarX][0]; // flytta på en låda
		tileMap01.mapGrid[avatarY-1][avatarX][0]=' ';

		spelplankontext.clearRect( 40*avatarX, 40*(avatarY-1), 40, 40);  // rensa plats där lådan stod
		spelplankontext.clearRect( 40*avatarX, 40*avatarY,     40, 40);
		avatarY=avatarY-1;
	    } else if ( tileMap01.mapGrid[avatarY-1][avatarX][0]==' ') {
		spelplankontext.clearRect( 40*avatarX, 40*avatarY, 40, 40);
		avatarY=avatarY-1;
	    };
	    break;
	case 'H':
	    if ( ( tileMap01.mapGrid[avatarY][avatarX+2][0]=='G' ||
		   tileMap01.mapGrid[avatarY][avatarX+2][0]==' ') &&
		 tileMap01.mapGrid[avatarY][avatarX+1][0]=='B') {
		tileMap01.mapGrid[avatarY][avatarX+2][0]=tileMap01.mapGrid[avatarY][avatarX+1][0]; // flytta på en låda
		tileMap01.mapGrid[avatarY][avatarX+1][0]=' ';

		spelplankontext.clearRect( 40*(avatarX+1), 40*avatarY, 40, 40);  // rensa plats där lådan stod
		spelplankontext.clearRect( 40*avatarX, 40*avatarY,     40, 40);
		avatarX=avatarX+1;
	    } else if (tileMap01.mapGrid[avatarY][avatarX+1][0]==' ') {
		spelplankontext.clearRect( 40*avatarX, 40*avatarY, 40, 40);
		avatarX=avatarX+1;
	    }
	    break;
	case 'N':
	    if ( ( tileMap01.mapGrid[avatarY+2][avatarX][0]=='G' ||
		   tileMap01.mapGrid[avatarY+2][avatarX][0]==' ') &&
		 tileMap01.mapGrid[avatarY+1][avatarX][0]=='B') {
		tileMap01.mapGrid[avatarY+2][avatarX][0]=tileMap01.mapGrid[avatarY+1][avatarX][0]; // flytta på en låda
		tileMap01.mapGrid[avatarY+1][avatarX][0]=' ';

		spelplankontext.clearRect( 40*avatarX, 40*(avatarY+1), 40, 40);  // rensa plats där lådan stod
		spelplankontext.clearRect( 40*avatarX, 40*avatarY,     40, 40);
		avatarY=avatarY+1;
	    } else if ( tileMap01.mapGrid[avatarY+1][avatarX][0]==' ') {
		spelplankontext.clearRect( 40*avatarX, 40*avatarY, 40, 40);
		avatarY=avatarY+1;
	    }
	    break;
	case 'V':
	    if ( ( tileMap01.mapGrid[avatarY][avatarX-2][0]=='G'||
		   tileMap01.mapGrid[avatarY][avatarX-2][0]==' ') &&
		 tileMap01.mapGrid[avatarY][avatarX-1][0]=='B') {
		tileMap01.mapGrid[avatarY][avatarX-2][0]=tileMap01.mapGrid[avatarY][avatarX-1][0]; // flytta på en låda
		tileMap01.mapGrid[avatarY][avatarX-1][0]=' ';

		spelplankontext.clearRect( 40*(avatarX-1), 40*avatarY, 40, 40);  // rensa plats där lådan stod
		spelplankontext.clearRect( 40*avatarX, 40*avatarY,     40, 40);
		avatarX=avatarX-1;
	    } else if (tileMap01.mapGrid[avatarY][avatarX-1][0]==' ') {
		spelplankontext.clearRect( 40*avatarX, 40*avatarY, 40, 40);
		avatarX=avatarX-1;
	    };
	    break;
	}
    }
}
