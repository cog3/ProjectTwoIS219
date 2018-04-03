// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();


/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function GalleryImage (location, description, date, img) {
	this.location = location;
	this.description = description;
	this.date = date;
	this.img = img;
}

var mURL = "images.json";
var mRequest = new XMLHttpRequest();
mRequest.onreadystatechange = function() {
	if (mRequest.readyState == 4 && mRequest.status == 200) {
		try {
			var mJson = JSON.parse(mRequest.responseText);
			console.log(mJson.images);
			var mImages = [];
			for (var i = 0; i <  mJson.images.length; i++) {
				var newImage = new GalleryImage(mJson.images[i].imgLocation, mJson.images[i].description
					, mJson.images[i].date, mJson.images[i].imgPath);
				mImages.push(newImage);
			}


			var mCurrentIndex = 0;
			if(mCurrentIndex == mImages.length - 1){
				mCurrentIndex = 0;
			}

			function swapPhoto() {
				document.getElementByClass("thumbnail").src = mImages[mCurrentIndex].img;
				
				//update div.details information
				document.getElementByClass("location").innerHTML = "Location: " + mImages[mCurrentIndex].location;
				document.getElementByClass("description").innerHTML = "Description: " + mImages[mCurrentIndex].description;
				document.getElementByClass("date").innerHTML = "Date: " + mImages[mCurrentIndex].date;

				//Add code here to access the #slideShow element.
				//Access the img element and replace its source
				//with a new image from your images array which is loaded 
				//from the JSON string
				mCurrentIndex++;
				console.log('swap photo');
			}
 			$(document).ready(function() {
				$( ".moreIndicator" ).click(function() {
  					if ( $( ".moreIndicator" ).hasClass("rot90") ) {
						$( ".moreIndicator" ).addClass("rot270").removeClass("rot90");
						$(".details").fadeToggle(800);
					}
  		 			else {
  						$( ".moreIndicator" ).addClass("rot90");
  						$( ".moreIndicator" ).removeClass("rot270");
  						$(".details").fadeToggle(800);
  					}
					});
			});





		
		}catch(err) {
			console.log(err.message)
		}
	}
};

mRequest.open("GET",mURL, true);
mRequest.send();

// Array holding GalleryImage objects (see below).

// Counter for the mImages array


//Do not let counter exceed the size of mImages array









// Holds the retrived JSON information




// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);






var indicator = document.getElementByClass("moreIndicator rot90");

indicator.onclick = function(){
	if(indicator.className == "rot270"){
		indicator.className
	}
}




var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime(); 
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();

		mLastFrameTime = currentTime;
	}
}
