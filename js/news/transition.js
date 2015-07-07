(function invoke() {
  "use strict";
  function testDirection(next, current) {
    if (next.templateUrl === current.templateUrl) {
      if (next.pathParams.page > current.pathParams.page) {
        return 'fwd';
      }
      if (next.pathParams.page < current.pathParams.page) {
        return 'bkwd';
      }
    }
    if ((next.controller === 'detailCtrl' && current.controller === 'listingCtrl') || (current.controller === 'detailCtrl' && next.controller === 'listingCtrl')) {
      return 'fade';
    }
    return 'top';
  }
  angular.module('tumblrApp')
    .directive('direction',
      function () {
        return {
          restrict: 'A',
          link: function (scope, element, attributes) {
            scope.$on("$routeChangeStart", function (event, next, current) {
              element.removeClass('pw-tumblr__animate--fwd pw-tumblr__animate--bkwd pw-tumblr__animate--fade pw-tumblr__animate--top');
              if (!current) {
                return;
              }
              element.addClass('pw-tumblr__animate--' + testDirection(next, current))
            })
          }
        };
      }
    );
}());
