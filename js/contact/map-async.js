function loadScript(src, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  if (callback)script.onload = callback;
  document.getElementsByTagName("head")[0].appendChild(script);
  script.src = src;
}

loadScript('http://maps.googleapis.com/maps/api/js?v=3&sensor=false&callback=initialize');

function initialize() {
  var windowWidth = $(window).innerWidth();
  var offcenterLatlng = new google.maps.LatLng(41.908553, -87.672523);
  var sopLatLag = new google.maps.LatLng(41.909424, -87.677227);
  var mapLatLng = sopLatLag;
  var mapOptions = {
    zoom:   17,
    center: mapLatLng,
    disableDefaultUI: true,
    scrollwheel: false,
    draggable: false,
    styles: [
      {
        stylers: [
          { saturation: -100 }
        ]
      }
    ]
  };
  map = new google.maps.Map(document.getElementById('map_canvas'),
   mapOptions);
  var image = 'http://assets.someoddpilot.com/assets/images/custom_map_pin_black.png';
  var marker = new google.maps.Marker({
    position: sopLatLag,
    icon: image,
    map: map
  });

  marker.addListener('click', function() {
    jQuery('html, body').animate({
      scrollTop: jQuery('#map_canvas').offset().top + jQuery('#map_canvas').height() - 50
    }, 1000);
  });
}

function log(str){
  document.getElementsByTagName('pre')[0].appendChild(document.createTextNode('['+new Date().getTime()+']\n'+str+'\n\n'));
}
