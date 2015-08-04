(function invoke() {
  "use strict";
  function DetailCtrl(posts, $sce, $routeParams) {
    this.postsService = posts;
    this.tag = $routeParams.tag;
    this.$sce = $sce;
    this.id = $routeParams.id;
    this.queryPosts();
  }
  DetailCtrl.prototype.queryPosts = function queryPosts() {
    this.postsService
      .get({
        notes_info: true,
        id: this.id
      })
      .success(this.onSuccess.bind(this))
      .error(function () {
        console.log("Request failed");
      });
  }
  DetailCtrl.prototype.onSuccess = function onSuccess(data) {
    this.posts = data.response.posts.map(this.mapPosts.bind(this));
    this.blog_name = data.response.blog.name;
  }
  DetailCtrl.prototype.mapPosts = function (item) {
      item.photo = (item.photos) ?
        item.photos.shift() :
        undefined;
      item.body = this.$sce.trustAsHtml(item.body);
      item.body_abstract = this.$sce.trustAsHtml(item.body_abstract);
      item.caption = this.$sce.trustAsHtml(item.caption);
      if (item.type === 'video') {
        item.player[2].embed_code = this.$sce.trustAsHtml(item.player[2].embed_code);
        }
      if (item.type === 'audio') {
        item.embed = this.$sce.trustAsHtml(item.embed);
      }
      if (item.type === 'link') {
        item.description = this.$sce.trustAsHtml(item.description);
      }
      if (item.type === 'answer') {
        item.answer = this.$sce.trustAsHtml(item.answer);
      }
      return item;
  }
  angular.module('careerApp')
  .controller('detailCtrl', DetailCtrl)
}());
