
const markers = [];

//SET MAP
const miMap = L.map('miMapid').setView([-32.317875, -58.085205], 17);
const attributions =
	'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>, Esteban Rosano & Felipe Caillabet';
const tileUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
const tiles = L.tileLayer(tileUrl, { attributions, maxZoom: 19, minZoom: 15, id: 'mapbox.streets', accessToken: 'pk.eyJ1Ijoia2l0b3Jvc2FubyIsImEiOiJjang0dXN0Z3gwZHBxNDRrajl0eWJnbWV1In0._JKXocT10c_LMSNjiRUEZw' });

tiles.addTo(miMap);

async function showIt() {
	const localesData = await getData();
	//console.log(localesData);

	//ICON
	for (local of localesData) {

		const localIcon = L.icon({
			iconUrl: 'Icons/' + local.type + '.png',
			iconSize: [30, 30],
			popupAnchor: [-3, -76]
		});

		let marker = L.marker([local.lat, local.lon], { icon: localIcon })
		marker.bindPopup("<b>" + local.name + " | " + "</b>" + local.type + "<br>" + local.hour + "<br>" + local.contact + "</br>");
		marker.addTo(miMap);

		//

	}

	miMap.on('zoomend', function () {
		for (icon of IconMarker.icon) {
			const zoom = miMap.getZoom() - 15;
			const w = 8 * zoom;
			const h = 8 * zoom;

			icon.options.iconSize = [w, h];
			icon.options.iconAnchor = [w / 2, h / 2];
			miMap.removeLayer(marker);
			marker = L.marker([0, 0], { icon: icon }).addTo(miMap);
		}
	});




	// const IconLayer = L.layerGroup(allIcons);
	// const overlays = {
	// 	"Everything": IconLayer
	// };
	// L.control.layers(null, overlays).addTo(miMap);

}

async function getData() {
	const response = await fetch('locales');
	console.log(response);
	const data = await response.text();

	const locales = [];

	const table = data.split('\n').slice(1);
	table.forEach(row => {
		const columns = row.split(',');

		const name = columns[0];
		const type = columns[1];
		const hour = columns[2];
		const contact = columns[3];
		const lat = columns[4];
		const lon = columns[5];

		locales.push({
			name,
			type,
			hour,
			contact,
			lat,
			lon
		});

	});
	return locales;
	console.log(locales);
}

showIt();



	// function onMapClick(e) {
	// 	const herePopup = L.popup();
	// 	herePopup
	// 		.setLatLng(e.latlng)
	// 		.setContent("You clicked the map at " + e.latlng.toString())
	// 		.openOn(miMap);
	// }
	// miMap.on('click', onMapClick);
