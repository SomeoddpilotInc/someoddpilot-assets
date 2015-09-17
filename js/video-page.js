function MainController($window, $rootScope, $scope, $route, $routeParams, $location, $timeout) {
  var that = this;

  this.rootScope = $rootScope;
  this.scope = $scope;
  this.params = $routeParams;
  this.route = $route;
  this.videos = $window.videos;

  this.mainVidArea = angular.element( document.getElementById('video-page__main') );
  this.listing = angular.element( document.getElementById('video-page__listing') );
  this.transitionTime = 500;
  this.scrollOffset = 50;

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

  this.scrollToListing = function() {
    angular.element(document).scrollToElementAnimated(
      that.listing, 0, that.transitionTime
    );
  };

  this.playReel = function() {

    angular.element(document).scrollToElementAnimated(
      that.mainVidArea, that.scrollOffset, that.transitionTime
    );

    $timeout(function() {
      this.reelControls = that.mainVidArea.find('.vimeo__controls');
      this.reelControls.trigger('click');
    }, that.transitionTime);

  };

  this.scope.$on("$routeChangeStart", function (event, next, current) {
    angular.element(document).scrollToElementAnimated(
      that.mainVidArea, that.scrollOffset, that.transitionTime
    );
  });

  this.rootScope.$on("$routeChangeSuccess", function (event) {
    that.rootScope.autoplay = true;
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
      controllerAs: 'vimeo'
    };
  });
