function postsService($http, blogUrl, apiKey) {
  var url = 'http://api.tumblr.com/v2/blog/' + blogUrl + '/posts';
  return {
    get: function (options) {
      return $http.jsonp(url, {
        params: {
          api_key: apiKey,
          callback: "JSON_CALLBACK",
          limit: options.limit,
          id: options.id,
          type: options.type,
          tag: options.tag,
          offset: options.offset,
          notes_info: true
        }
      });
    }
  };
}
function config($routeProvider) {
  $routeProvider.
    when('/:page', {
      templateUrl: '/templates/contact/archive.html',
      controller: 'listingCtrl'
    }).
    when('/detail/:id', {
      templateUrl: '/templates/contact/detail.html',
      controller: 'detailCtrl'
    }).
    otherwise({
      redirectTo: '/1'
    });
}
angular.module('careerApp', ['ngResource', 'ngRoute', 'ngAnimate', 'masonry'])
  .value('blogUrl', 'someoddpilot.tumblr.com')
  .value('apiKey', 'sPaI49yeoSpM27Oy2Ir8SPufAkgyikRQ5GVBwFl9K33YDub749')
  .service('posts', postsService)
  .config(config);
