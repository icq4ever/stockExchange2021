
let font;
let mm, dd, yy;
let dateString;
let padding;

let stockRaw = [0, 0, 0, 0, 0, 0];
let stockPercentageString = ['0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%'];

let stockSymbols = ['^KQ11', '^DJI', 'SX5E.SW', 'H78.SI', 'GPCST001.FGI', 'SNSX50.BO'];
let stockNames = [
	'KOSDAQ', 
	'Dow Jones', 
	'EURO STOXX 50', 
	'CHINA', 
	'KUWAIT', 
	'S&P BSE SENSEX'
];

// preload like image, json fonts.
function preload(){
	font = loadFont('fonts/PretendardVariable.ttf');
}

function setup(){
	var canvasDiv = document.getElementById('container');
	
	var canvas = createCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
	canvas.parent('p5Container');

	// updateStock();
}

function draw(){
	padding = windowHeight * 0.06;
	mm = month();
	dd = day();
	yy = year();

	if(mm < 10)	mm = "0" + mm;
	if(dd < 10)	dd = "0" + dd;
	dateString = dd + "/" + mm + "/" + yy;
	// document.getElementById('dateContainer').textContent = dateString;

	clear();

	fill('#FFFFFF');
	textFont(font);
	textSize(windowHeight * 0.06);

	push();
	textAlign(RIGHT, TOP);
	text(dateString, windowWidth-padding, padding);
	pop();

	push();
	translate(0, windowHeight*0.2);
	textAlign(LEFT, TOP);
	for(let i=0; i<6; i++){
		textAlign(LEFT);
		text(stockNames[i] + '[' + stockSymbols[i] + ']', padding, i*(windowHeight*0.13));
		textAlign(RIGHT);
		text(stockPercentageString[i], windowWidth - padding, i*(windowHeight*0.13));
	}
	pop();
}

function drawDate(){
	
}

async function updateStock() {
	const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));
	for(let i=0; i<stockSymbols.length; i++){
		await delay();
		getStock(stockSymbols[i], i);
	}
}

function dummyUpdateStock(){
	console.log("stock info updated");
}

function getStock(_stockCode, _index){
	const options = {
		method: 'GET',
		url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary',
		params: {symbol: _stockCode, region: 'US'},
		headers: {
			'x-rapidapi-key': '226b19078amshed7edc96b914993p18a90cjsnf1169819cb9f',
			'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
		}
	};

	axios.request(options).then(function (response){
		let responseObject = response.data;
			var stockPercentage = responseObject.price.regularMarketChangePercent;
			
			stockRaw[_index] = stockPercentage.raw;
			if(stockPercentage.raw > 0 )		stockPercentageString[_index] = "+" + stockPercentage.fmt;
			else 								stockPercentageString[_index] = stockPercentage.fmt;

			console.log(_stockCode + " : " + stockPercentageString[_index] + " / " + stockRaw[_index]);
		
	}).catch (function (err){
		console.error(_stockCode + " : " + err);
	});
}

function keyTyped(){
	if(key === 'u' ){
		updateStock();
	}
}

function windowResized(){
	padding = windowHeight * 0.1;
	console.log(width + ' ' + height);
	resizeCanvas(document.getElementById('p5Container').offsetWidth, document.getElementById('container').offsetHeight);
}