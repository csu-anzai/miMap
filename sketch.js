let mymap;
let localesData;
let data = [];

function preload(){
	localesData = loadTable("localesData.csv","header");
	// console.log(localesData);

	// loadImage("Floreria.png");
	// loadImage("Jugueteria.png");
	// loadImage("Regaleria.png");


}

function setup() {
	mymap = L.map('mapid').setView([-32.31809, -58.084685], 19);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>, Esteban Rosano & Felipe Caillabet',
		maxZoom: 19,
		minZoom: 15,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1Ijoia2l0b3Jvc2FubyIsImEiOiJjang0dXN0Z3gwZHBxNDRrajl0eWJnbWV1In0._JKXocT10c_LMSNjiRUEZw'
	}).addTo(mymap);


	/*Get the information though the csv*/
	for(let row of localesData.rows){
		let latlon = [row.get('lat'), row.get('lon')];
		if(latlon){
			let lat = latlon[0];
			let lon = latlon[1];
			let name = row.get('nombre');
			let tipe = row.get('tipo');
			let hour = row.get('horario');
			let contact = row.get('contacto');
			// console.log(lat,lon);

			/*create an array of every local*/
			data.push({
				name,
				tipe,
				hour,
				contact,
				lat,
				lon				
			});
			// console.log(data);
		}
	}
	drawIt();
}


function drawIt(){
	clear();
	for(let local of data){
		const zoom = map(mymap.getZoom(),15,19,1,20);
		const scl = 30 + zoom;
		console.log(zoom);

/* 		icon generation
 */		
		let localIcon = L.icon({
			iconUrl: local.tipe +'.png',
			iconSize: [30, 30],
			popupAnchor: [-3, -76],
		});
		/*set in on the map */

		let localMark = L.marker([local.lat, local.lon],).addTo(mymap);
		/*what it says*/
		localMark.bindPopup("<b>"+local.name+" | "+"</b>"+local.tipe+"<br>"+local.hour+"<br>"+local.contact+"</br>");
	}



	//GET COORDENATES
	let coordenates = L.popup();
	function onMapClick(e){
		coordenates
		.setLatLng(e.latlng)
		.setContent("Here " + e.latlng.toString())
		.openOn(mymap);	
	}
	mymap.on("click",onMapClick);	
}




	// let latlng = L.latLng(-32.31796, -58.075774);
	// let marker = L.circleMarker(latlng,10).addTo(mymap);

	// function onMapClick(e) {
	// 	circleMarker
	// 	.setLatLng(e.latlng)
	// 	.setRadius(10)
	// 	.openOn(mymap);
	// }

	// let marker = L.marker([-32.31996, -58.070274]).addTo(mymap);



	//TO KNOW LAT & LON OF A LOCAL JUST MAKE A FUNCTION FOR THE MOUSE TO CLICK ON THE MAP AND SAYS ITS LATLON