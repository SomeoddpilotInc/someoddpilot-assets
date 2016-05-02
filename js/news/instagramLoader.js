(function ($, _) {
  function InstagramLoader(element) {
    this.element = element;
    this.$element = $(element);

    this.count = 0;

    this.$element.on(
      "instagram-images-load",
      $.proxy(this.load, this)
    );
  }

  InstagramLoader.prototype.getMaxPages = function getMaxPages() {
    return this.$element.data('max-pages') || 4;
  };

  InstagramLoader.prototype.getUserId = function getUserId() {
    return this.$element.data('user-id');
  };

  InstagramLoader.prototype.getCount = function getCount() {
    return this.$element.data('inst-count') || 18;
  };

  InstagramLoader.prototype.getParams = function getParams() {
    return {
      type:     'GET',
      dataType: 'jsonp',
      url:      'https://api.instagram.com/v1/users/' + this.getUserId() + '/media/recent',
      data: {
        max_id: this.nextMaxId,
        count: this.getCount(),
        client_id: this.$element.data('client-id')
      },
      success: $.proxy(this.loadSuccess, this)
    };
  };

  InstagramLoader.prototype.load = function load() {
    $.ajax(this.getParams());
  };

  InstagramLoader.prototype.loadSuccess = function loadSuccess(response) {
    this.count = this.count + 1;
    this.nextMaxId = response.pagination.next_max_id;

    this.$element.find("[instagram-items]").removeClass('instgrm-loading');
    this.$element.trigger('instagram-images-loaded', response);

  };

  InstagramLoader.prototype.loadMore = function loadMore() {
    if (this.count < this.getMaxPages()) {
      setTimeout($.proxy(this.load, this), 1000);
    }
  };

  $('[instagram-loader]').each(function (index, element) {
    $(element).data('instagram-loader', new InstagramLoader(element));
  });
})(jQuery, _);
