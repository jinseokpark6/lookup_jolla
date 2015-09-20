      var accessToken = "";
      // This is called with the results from from FB.getLoginStatus().
      function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
          // Logged into your app and Facebook.
          console.log(response.authResponse);
          accessToken = response.authResponse.accessToken;
          window.location.href = "logged.html?aT=" + accessToken;
          testAPI();
        } else if (response.status === 'not_authorized') {
          // The person is logged into Facebook, but not your app.
          document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
        } else {
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
          document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';
        }
      }

      // This function is called when someone finishes with the Login
      // Button.  See the onlogin handler attached to it in the sample
      // code below.
      function checkLoginState() {
        alert("hello");
        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });
      }

      function checkFriendList() {
          FB.api(
              "/me/friends",
              function (response) {
                if (response && !response.error) {
                  console.log(response);
                }
              }
          );
      }

      function getFriendPicture(name, id) {
        FB.api(
          "/me/friends",
          function (response) {
            if (response && !response.error) {
              console.log("hiya")
            }
          }
        );
      }

      window.fbAsyncInit = function() {
        alert("async"); 
        FB.init({
          appId      : 464318847063621,
          cookie     : true,  // enable cookies to allow the server to access 
                              // the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.2' // use version 2.2
        });

        // Now that we've initialized the JavaScript SDK, we call 
        // FB.getLoginStatus().  This function gets the state of the
        // person visiting this page and can return one of three states to
        // the callback you provide.  They can be:
        //
        // 1. Logged into your app ('connected')
        // 2. Logged into Facebook, but not your app ('not_authorized')
        // 3. Not logged into Facebook and can't tell if they are logged into
        //    your app or not.
        //
        // These three cases are handled in the callback function.

        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });

      };

      // Load the SDK asynchronously
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

      // Here we run a very simple test of the Graph API after login is
      // successful.  See statusChangeCallback() for when this call is made.
      function testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
          console.log('Successful login for: ' + response.name);
          document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
        });
            /* make the API call */
        FB.api(
            "/me/friends?access_token="+accessToken+"&fields=name,id,picture.width(30)",
            function (response) {
              if (response && !response.error) {
                var loop = response.data.length
                document.getElementById('friendList').innerHTML += "<br>Friend List <br>";

                var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                var labelIndex = 0;

                for (var i=0; i<loop; i++) {

                  document.getElementById('friendList').innerHTML += '<div><button type="button" class="button"><div class = "round"><img src=' + response.data[i].picture.data.url + '></div>' + response.data[i].name + '</button>' +  ' </div> <br>';

                  console.log("map");
                  console.log(this.map);
                  var pos = {
                    lat: 38.65456038 + 0.001*i,
                    lng: -90.31568859999999 + 0.001*i
                  };

                  // convert lat,long distance into meters
                  var R = 6371000; // metres
                  dlon = this.pos.lng - pos.lng
                  dlat = this.pos.lat - pos.lat
                  a = (Math.sin(dlat/2))^2 + Math.cos(this.pos.lat) * Math.cos(pos.lat) * (Math.sin(dlon/2))^2
                  c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a) )
                  d = R * c  


                  // var image = {
                  //   url: response.data[i].picture.data.url,
                  //   size: new google.maps.Size(71, 71),
                  //   origin: new google.maps.Point(0, 0),
                  //   anchor: new google.maps.Point(17, 34),
                  //   scaledSize: new google.maps.Size(25, 25)
                  // };

                  var shape = {
                    coords: [1, 1, 1, 20, 18, 20, 18, 1],
                    type: 'poly'
                  };


                  console.log(c);
                  console.log(d);

                  if (d < Math.sqrt(100) * 100) {
                    var marker = new google.maps.Marker({
                    position: pos,
                    icon: response.data[i].picture.data.url,
                    shape: shape,
                    title: response.data[i].name
                    });
                    console.log("marker");
                    console.log(marker);

                    marker.setMap(this.map);
                  }






                  // this.friendsArray.push(pos);
                  // console.log(this.friendsArray);
                }
              }
            }
        );
      }


     


    document.addEventListener("touchstart", function() {}, false);