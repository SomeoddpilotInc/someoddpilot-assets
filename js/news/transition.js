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
  function showInsta(next, current) {
    if (current.controller === 'detailCtrl') {
      return 'hide';
    } else {
      return 'show';
    }
  }
  angular.module('tumblrApp')
    .directive('insta',
      function() {
        return {
          restrict: 'A',
          link: function (scope, element, attributes) {
            scope.$on("$routeChangeStart", function (event, next, current) {
              element.removeClass('insta--hide insta--show');
              if (!current) {
                return;
              }
              element.addClass('insta--' + showInsta(next, current))
            })
          }
        }
      })
    .directive('direction',
      function () {
        return {
          restrict: 'A',
          link: function (scope, element, attributes) {
            scope.$on("$routeChangeStart", function (event, next, current) {
              element.removeClass('tumblr__animate--fwd tumblr__animate--bkwd tumblr__animate--fade tumblr__animate--top');
              if (!current) {
                return;
              }
              element.addClass('tumblr__animate--' + testDirection(next, current))
            })
          }
        };
      }
    );
}());
