

  
    // Note: This example requires that you consent to location sharing when
    // prompted by your browser. If you see the error "The Geolocation service
    // failed.", it means you probably did not give permission for the browser to
    // locate you.

      this.friendsArray = [];

      console.log("asdf");
      console.log(this.friendsArray);

      function initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 15,
          draggable: false,
          zoomControl: false,
          scrollwheel: false,
          panControl: false,
          disableDoubleClickZoom: true
        });

        // var pos = {
        //       lat: position.coords.latitude,
        //       lng: position.coords.longitude
        //     };

        var infoWindow = new google.maps.InfoWindow({map: map});



        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            this.pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };



            console.log(pos);

            var input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("name", "lat");
            input.setAttribute("value", position.coords.latitude);

            var input2 = document.createElement("input");
            input2.setAttribute("type", "hidden");
            input2.setAttribute("name", "lng");
            input2.setAttribute("value", position.coords.longitude);
            //append to form element that you want .
            document.getElementById("listlist").appendChild(input);
            document.getElementById("listlist").appendChild(input2);

            infoWindow.setPosition(pos);
            infoWindow.setContent('ME');
            map.setCenter(pos);

          var marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'Hello World!'
          });

          
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });

        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }



       
      }

        




      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }
