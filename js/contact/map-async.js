function loadScript(src, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  if (callback)script.onload = callback;
  document.getElementsByTagName("head")[0].appendChild(script);
  script.src = src;
}

loadScript('http://maps.googleapis.com/maps/api/js?v=3&sensor=false&callback=initialize',
  function () {
    console.log('google-loader has been loaded, but not the maps-API ');
  });

function initialize() {
  console.log('maps-API has been loaded, ready to use');
  var myLatlng = new google.maps.LatLng(41.908553, -87.672523);
  var mapOptions = {
    zoom:   17,
    center: myLatlng,
    disableDefaultUI: true,
    scrollwheel: false,
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
  var image = '/assets/images/custom_map_pin_black.png';
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(41.909424, -87.677227),
    icon: image,
    clickable: false,
    map: map
  });
}

function log(str){
  document.getElementsByTagName('pre')[0].appendChild(document.createTextNode('['+new Date().getTime()+']\n'+str+'\n\n'));
}
