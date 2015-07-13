(function invoke() {
  "use strict";
  function ListingCtrl(posts, $sce, $routeParams, $document) {
    this.page = parseInt($routeParams.page, 10);
    this.offset = 0;
    this.limit = 9;
    this.posts = [];
    this.postsService = posts;
    this.tag = $routeParams.tag;
    this.id = $routeParams.id;
    this.type = $routeParams.type;
    this.$sce = $sce;
    this.loading = false;
    this.queryPosts();
  }
  ListingCtrl.prototype.queryPosts = function queryPosts() {
    this.postsService
      .get({
        limit: this.limit,
        offset: this.offset,
        tag: this.tag,
        id: this.id,
        type: this.type
      })
      .success(this.onSuccess.bind(this))
      .error(function () {
        this.loading = false;
        console.log("Request failed");
      });
  };
  ListingCtrl.prototype.onSuccess = function onSuccess(data) {
    this.newPosts = data.response.posts.map(this.mapPosts.bind(this));
    this.posts = _.union(this.posts, this.newPosts);
    this.loading = false;
    this.total_posts = data.response.total_posts;
    console.log(this.posts);
  };
  ListingCtrl.prototype.mapPosts = function (item) {
      item.photo = (item.photos) ?
        item.photos.shift() :
        undefined;
      item.body = this.$sce.trustAsHtml(item.body);
      item.body_abstract = this.$sce.trustAsHtml(item.body_abstract);
      if (item.type === 'video') {
        item.player[0].embed_code = this.$sce.trustAsHtml(item.player[0].embed_code);
      }
      if (item.type === 'audio') {
        item.embed = this.$sce.trustAsHtml(item.embed);
      }
      return item;
  };
  ListingCtrl.prototype.next = function next() {
    this.offset = this.offset + 9;
    this.loading = true;
    this.queryPosts();
  };
  angular.module('tumblrApp')
  .controller('listingCtrl', ListingCtrl);
}());
