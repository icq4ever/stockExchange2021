let stockRaw = [0, 0, 0, 0, 0, 0];
let stockPercentageString = ['0.00%', '0.00%', '0.00%', '0.00%', '0.00%', '0.00%'];

let stockSymbols = ['^KQ11', '^DJI', 'SX5E.SW', 'H78.SI', 'GPCST001.FGI', 'SNSX50.BO'];
let stockName = ['Kosdaq Composite Index', 'Dow Jones Industrial Average', 'Invesco Markets plc - Invesco EURO STOXX 50 UCITS ETF', 'Hongkong Land Holdings Limited', 'FTSE Coast Kuwait 40 Index', 'S&P BSE SENSEX 50 Index']
// preload like image, json fonts.
function preload(){
	
}

function setup(){
	var canvasDiv = document.getElementById('container');
	
	var canvas = createCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
	canvas.parent('p5Container');
	updateStock();
}

function draw(){
	clear();
	
	textAlign(CENTER);
	fill(0);
	text("HELLO WORLD", document.getElementById('p5Container').offsetWidth/2, 20);
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


function windowResized(){
	console.log(width + ' ' + height);
	resizeCanvas(document.getElementById('p5Container').offsetWidth, document.getElementById('container').offsetHeight);
}