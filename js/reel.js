function MainController($scope, $route, $routeParams, $location) {
  this.params = $routeParams;
  this.active = this.params.video || 'reel';
}
function config($routeProvider) {
  $routeProvider.
    when('/:video', {
      templateUrl: '/templates/reel/archive.html',
      controller: MainController,
      controllerAs: 'videoPage'
    }).
    otherwise({
      redirectTo: '/reel',
      templateUrl: '/templates/reel/archive.html',
      controller: MainController,
      controllerAs: 'videoPage'
    });
}
