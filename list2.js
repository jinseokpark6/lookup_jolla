$(document).ready(function() {
	/*$.ajax({url: "http://api.tripadvisor.com/api/partner/2.0/map/42.33141,-71.099396?key=0DC3A3AB8DE94E6399BB1818B6BBF005", success: function(result){
	    //$("#div1").html(result);
	
	}});*/
	
	var hrefIs = window.location.href;
	var varStart = hrefIs.indexOf("?");
	var vars = hrefIs.substring(varStart + 1, hrefIs.length);

	// splicing the substring into latitude and longitude
	var spliceIndex = vars.indexOf("&");
	var latWhole = vars.substring(0, spliceIndex);
	var lngWhole = vars.substring(spliceIndex + 1, vars.length);

	// parsing equals for latitude
	var latEquals = latWhole.indexOf("=");
	var latProc = latWhole.substring(latEquals + 1, latWhole.length);

	// parsing equals for longitude
	var lngEquals = lngWhole.indexOf("=");
	var lngProc = lngWhole.substring(lngEquals + 1, lngWhole.length);

	var jsonUrl = "http://api.tripadvisor.com/api/partner/2.0/map/" + latProc + "," + lngProc + "?key=0DC3A3AB8DE94E6399BB1818B6BBF005";

	$.getJSON( jsonUrl, function( locdata ) {
	  var items = [];

	  var color_init = "yellow";
	  var this_color = color_init;
	  for(var i = 0; i < locdata.data.length; i++){
	  	//console.log(locdata.data[i].web_url);
	  	this_color = colorswap(this_color);
	  	console.log(this_color);
	  	var rating;
	  	var ratespan;
	  	var priceLv;
	  	var ratingImgSpan;
	  	var priceDiv;

	  	// setting ratingImgSpan

	  	if (locdata.data[i].rating_image_url == null) {
	  		ratingImgSpan = '';
	  	}
	  	else {
	  		ratingImgSpan = '<img class="ratingImg" src="' + locdata.data[i].rating_image_url + '"></img>';
	  	}

	  	// setting ratespan element according to the retrieved price

	  	if (locdata.data[i].rating == null) {
	  		rating = "0.0";
	  		ratespan = '<span class="rating" id="nullr">';
	  	}
	  	else if (locdata.data[i].rating < 3){
	  		console.log(locdata.data[i].rating + " is bad");
	  		rating = locdata.data[i].rating;
	  		ratespan = '<span class="rating" id="bad">';
	  	}
	  	else if (locdata.data[i].rating < 4){
	  		console.log(locdata.data[i].rating + " is okay");
	  		rating = locdata.data[i].rating;
	  		ratespan = '<span class="rating" id="okay">';
	  	}
	  	else {
	  		console.log(locdata.data[i].rating + " is good");
	  		rating = locdata.data[i].rating;
	  		ratespan = '<span class="rating" id="good">';
	  	}

	  	// setting pricelv span according to the retrieved price

	  	if (locdata.data[i].price_level ==  null) {
	  		//<div class="dolladiv"><span class="dolla grid-only">' + locdata.data[i].price_level + '</span></div>
	  		priceLv = "-";
	  		priceDiv = '<div class="dolladiv"><span class="dolla grid-only">' + priceLv + '</span></div>';
	  	}
	  	else {
	  		priceLv = locdata.data[i].price_level;
	  		if (priceLv == "$") {
	  			priceDiv = '<div class="dolladiv"><span class="dolla grid-only" id="cheapest">' + priceLv + '</span></div>';
	  		}
	  		else if (priceLv == "$$"){
	  			priceDiv = '<div class="dolladiv"><span class="dolla grid-only" id="cheaper">' + priceLv + '</span></div>';
	  		}
	  		else if (priceLv == "$$$"){
	  			priceDiv = '<div class="dolladiv"><span class="dolla grid-only" id="expensiver">' + priceLv + '</span></div>';
	  		}
	  		else {
	  			priceDiv = '<div class="dolladiv"><span class="dolla grid-only" id="expensivest">' + priceLv + '</span></div>';
	  		}
	  	}
	  	items.push(
	  		'<li class="survey-item"><div class="item"><a class="ahr" href="' + locdata.data[i].web_url + '"></a><div class="namediv"><span class="name">' + locdata.data[i].name + '</span></div><div class="categorydiv"><span class="category grid-only">' + locdata.data[i].category.name + '</span></div>' + priceDiv + '<div class="distdiv"><span class="dist">' + locdata.data[i].distance + 'm away</span></div><div class="pull-right"><span class="survey-progress"></span></div><div class="ratediv">' + ratespan + rating + '</span></div><div class="imgdiv">' + ratingImgSpan + '</div></div>'
	  	);
	  }

	  $('.ahr').css("display", "none");
	  $('.surveys.grid').append( items.join('') );

	  $('.item').click(function() {
		window.location = $(this).find("a").attr("href");
		return false;
	  });
	});

	function colorswap(color) {
		switch(color) {
			case "yellow":
				return "red";
			case "red":
				return "lime";
			case "lime":
				return "emerald";
			case "emerald":
				return "orange";
			case "orange":
				return "yellow";
		}
	}
});