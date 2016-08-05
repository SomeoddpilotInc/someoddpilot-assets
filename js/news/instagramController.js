(function ($, _) {
  function InstagramGallery(element) {
    this.$element = $(element);

    this.itemsPerGroup = this.$element.data('items-per-group') || 3;

    this.template = this.getTemplate('template');
    this.groupTemplate = this.getTemplate('group-template');

    this.$element
      .on(
        'instagram-images-loaded',
        $.proxy(this.onLoaded, this)
      )
      .find("[data-load-more]")
        .click($.proxy(this.loadMore, this));

    this.loadMore();
  }

  InstagramGallery.prototype.getTemplate = function (attribute) {
    return _.template(
      $(
        '#' + this.$element.data(attribute)
      ).text()
    );
  };

  InstagramGallery.prototype.loadMore = function(){
    this.$element.trigger("instagram-images-load");
  };

  InstagramGallery.prototype.reduceGroups = function (memo, group) {
    var itemsHtml = _.reduce(
      group,
      $.proxy(this.reduceGroup, this),
      '',
      this
    );

    return memo +
      this.groupTemplate({
        items: itemsHtml
      });
  };

  InstagramGallery.prototype.reduceGroup = function (memo, imageData) {
    return memo + this.template(imageData);
  };

  InstagramGallery.prototype.groupImages = function (imageData, index) {
    return Math.floor(index / this.itemsPerGroup);
  };

  InstagramGallery.prototype.onLoaded = function (event, response) {
    var html = _(response.data)
      .groupBy(this.groupImages, this)
      .reduce($.proxy(this.reduceGroups, this), '', this);

      this.$element.find("[instagram-items]").append(html);
  };

  $('[instagram-gallery]').each(function (index, element) {
    $(element).data('instagram-gallery', new InstagramGallery(element));
  });

})(jQuery, _);
