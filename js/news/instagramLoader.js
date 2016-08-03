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
      dataType: 'json',
      url:      'https://nip6jn47u7.execute-api.us-west-2.amazonaws.com/prod/feed/' + this.getUserId(),
      data: {
        count: this.getCount()
      },
      success: $.proxy(this.loadSuccess, this)
    };
  };

  InstagramLoader.prototype.load = function load() {
    $.ajax(this.getParams());
  };

  InstagramLoader.prototype.loadSuccess = function loadSuccess(response) {
    this.count = this.count + 1;

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
