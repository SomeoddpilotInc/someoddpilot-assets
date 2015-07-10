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
function config($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/templates/careers.html',
      controller: 'listingCtrl'
    }).
    when('/career/:id', {
      templateUrl: '/templates/careers-detail.html',
      controller: 'detailCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
}
angular.module('tumblrApp', ['ngResource', 'ngRoute', 'ngAnimate'])
  .value('blogUrl', 'someoddpilot.tumblr.com')
  .value('apiKey', 'sPaI49yeoSpM27Oy2Ir8SPufAkgyikRQ5GVBwFl9K33YDub749')
  .service('posts', postsService)
  .config(config);
