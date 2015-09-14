function MainController($window, $rootScope, $scope, $route, $routeParams, $location) {
  var that = this;

  this.rootScope = $rootScope;
  this.params = $routeParams;
  this.route = $route;
  this.videos = $window.videos;

  this.active = this.params.video || 'reel';
  this.rootScope.activeIndex = this.rootScope.activeIndex || 1;

  this.newActiveIndex = this.videos.map(
                          function(video) {
                            return video.slug;
                          }).indexOf(this.active);

  this.rootScope.activeIndex = this.rootScope.activeIndex > this.newActiveIndex ? this.rootScope.activeIndex : this.newActiveIndex;

  this.perpage = 6;
  this.page = Math.ceil(this.rootScope.activeIndex / this.perpage);

  this.rootScope.autoplay = false;

  this.addPage = function() {
    that.page = that.page + 1;
    this.rootScope.activeIndex = this.rootScope.activeIndex + that.perpage;
  };

  this.rootScope.$on("$routeChangeSuccess", function (event) {
    that.rootScope.autoplay = true;
  });
}

function sopVideoLink(scope, element, attrs) {
  scope.$on("$routeChangeStart", function (event, next, current) {

    var mainVidArea = angular.element(
        document.getElementById('video-page__main')
      );

    angular.element(document).scrollToElementAnimated( mainVidArea, 50, 500 );

  });
}

function config($routeProvider) {
  $routeProvider.
    when('/:video', {
      templateUrl: '/templates/video/landing.html',
      controller: MainController,
      controllerAs: 'videoPage'
    }).
    otherwise({
      redirectTo: '/reel',
      templateUrl: '/templates/video/landing.html',
      controller: MainController,
      controllerAs: 'videoPage'
    });
}

angular.module('videoApp', ['ngRoute', 'video'])
  .config(config)
  .directive('sopVideo', function () {
    return {
      restrict: 'EA',
      scope: {
        videoId: '@',
        playerId: '@',
        controlBoolean: '='
      },
      templateUrl: '/js/video-player/templates/vimeo-template.html',
      controller: 'vimeoController',
      controllerAs: 'vimeo',
      link: sopVideoLink
    };
  });
