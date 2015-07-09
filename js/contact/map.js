angular.module('map', [])
  .directive('mapCanvas', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
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

        var map = new google.maps.Map(element[0], mapOptions);

        var image = '/assets/images/custom_map_pin_black.png';
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(41.909424, -87.677227),
          icon: image,
          map:          map
        });
      }
    };
  });
