
//Tracking route with google maps
var map;
var directionsService;
var directionsDisplay;
var arrayOfTrackingPoints = [];
	;
	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 17.0669, lng: -96.7203},
			zoom: 14
		});
		directionsService = new google.maps.DirectionsService;
		directionsDisplay = new google.maps.DirectionsRenderer;
		loadRoute();
	}
	function loadRoute() {
        directionsDisplay.setMap(null);
        directionsDisplay.setMap(map);
        directionsService.route({
          origin: document.getElementById("origin").value,
          destination: document.getElementById("destiny").value,
          unitSystem: google.maps.UnitSystem.METRIC,
          travelMode: 'DRIVING',
          transitOptions: {
            departureTime: new Date(1337675679473)
          }
        }, function(response, status) {
          if (status === 'OK') {
          	 for (var i = 0; i < response.routes[0].overview_path.length; ++i) {
                        arrayOfTrackingPoints.push(new google.maps.LatLng
                        (response.routes[0].overview_path[i].lat(), 
                        response.routes[0].overview_path[i].lng()));
                    }
            directionsDisplay.setDirections(response);
            showTracking();
  } else {
    window.alert('Check the Address');
  }
});
        var infowindow = new google.maps.InfoWindow();
        function showTracking() {
            var marker = new google.maps.Marker({
                map: map,
                position: arrayOfTrackingPoints[0]
            });
            var c = 0;
             marker.setPosition((arrayOfTrackingPoints[c]));
             infowindow.setContent('Picked Package');
            		infowindow.open(map, marker);
            var interval = self.setInterval(function () {
                marker.setPosition((arrayOfTrackingPoints[c]));
                c++;
              if(c == arrayOfTrackingPoints.length){
               infowindow.setContent('Delivered Package');
             infowindow.open(map, marker);
        		 }
        		 else
        		 {
        		 	infowindow.setContent('Package on Route');
           			infowindow.open(map, marker);
        		 }
                if (c > arrayOfTrackingPoints.length-1) clearInterval(interval);
            }, 1000);
            console.log("acabado");
             
        }
      }
