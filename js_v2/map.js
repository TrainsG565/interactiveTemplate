mapboxgl.accessToken = 'pk.eyJ1IjoiYm9yZG5lcndsZWkiLCJhIjoiY2lyZjd1a2tyMDA3dmc2bmtkcjUzaG5meCJ9.eswxCZSAnob59HR0wEaTpA';
	
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/bordnerwlei/cirf7wsrr0003g8nlogxrqxyr',
	center: [-89.5, 44.5],
	zoom: 6,
	preserveDrawingBuffer: false,
	hash: false,
	pitch: 0.1
});

	
map.on('load', function () {
	
	
	
		
	var popup = new mapboxgl.Popup({
		closeButton: false,
		closeOnClick: false
	});
	
	map.on('mousemove', function(e) {
		
		
		var features = map.queryRenderedFeatures(e.point, { layers: hoverLayers });
			
		if (features.length && features[0].layer.id == "county-fills") {
			console.log(features[0].layer.id);
		} else if (features.length && features[0].layer.id != "county-fills") {
			var holdID = features[0].layer.id; // ???
		} else {

		}
			
		map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
			
		if (!features.length) {
			popup.remove();
			return;
		}
		
		var feature = features[0];
			
		if (feature.layer.id == "county-fills") {
			popup.setLngLat(e.lngLat)
				.setHTML(feature.properties.COUNTY_NAM)
				.addTo(map);
		} else {
			popup.setLngLat(e.lngLat)
				.setHTML(feature.properties.Cov1)
				.addTo(map);
		}
	});
		
	map.on ('mouseout', function() {
			
	});
		
	map.on ('click', function(e) {
		var features = map.queryRenderedFeatures(e.point, { layers: hoverLayers });
		
		var feature = features[0];
		
		if (features.length && feature.layer.id == "county-fills") {
			map.flyTo({
				center: e.lngLat,
				zoom: 8
			});
			
			document.getElementById("currentCountyBox").innerHTML = feature.properties.COUNTY_NAM + " Hello!";
					
			determineClick(feature);
		} else if (features.length && feature.layer.id != "county-fills") {
			var randomPitch = Math.floor((Math.random() * 40) + 30);
			if (threeDControl == true) {
				map.flyTo({
					center: e.lngLat,
					zoom: 13,
					pitch: randomPitch,
					around: e.lngLat,
					animate: true
				});
				/*document.getElementById("pitch").value = 35;*/
			} else if (threeDControl == false) {
				map.flyTo({
					center: e.lngLat,
					zoom: 13,
					around: e.lngLat,
					animate: true
				});
			}
		} else {
			
		}
					
	});
	/*
	map.on ('render', function() {
		if (getCanvasControl == true) {
			data = map.getCanvas().toDataURL("image/png");
			return data;
		} else {
			return;
		}
	});
	*/
});