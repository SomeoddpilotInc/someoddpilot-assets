(function($) {
  var aboutControllerCompleteThought = new ScrollMagic.Controller();

  var mirror = '.mirror',
      mirrorWrap = '.mirrored-image-wrapper',
      mirror1 = '.mirror--1',
      mirror2 = '.mirror--2',
      mirror3 = '.mirror--3',
      mirror4 = '.mirror--4',
      mirror5 = '.mirror--5';

  TweenLite
    .set(mirror1, {
      y: '-35%',
      x: '-50%',
      scale: 1.2
    });

  TweenLite
    .set(mirror2, {
      y: '-68%',
      x: '-50%',
      scale: 1.2
    });

  TweenLite
    .set(mirror3, {
      y: '-63%',
      x: '-50%'
    });

  TweenLite
    .set(mirror4, {
      y: '-30%',
      x: '-50%'
    });

  TweenLite
    .set(mirror5, {
      y: '-52%',
      x: '-50%'
    });

  var mirrorTimeline = new TimelineMax()
    .add([
      TweenLite.to(mirror1, 1, {
        y: '-65%',
        ease: Linear.easeNone,
        scale: 1.1
      }),
      TweenLite.to(mirror2, 1, {
        y: '-32%',
        ease: Linear.easeNone,
        scale: 0.8
      }),
      TweenLite.to(mirror3, 1, {
        y: '-37%',
        ease: Linear.easeNone,
      }),
      TweenLite.to(mirror4, 1, {
        y: '-70%',
        ease: Linear.easeNone,
      }),
      TweenLite.to(mirror5, 1, {
        y: '-48%',
        ease: Linear.easeNone
      })
    ]);

  new ScrollMagic.Scene({
        duration: '200%',
        triggerElement: mirror,
        triggerHook: 'onEnter'
      })
      .setTween(mirrorTimeline)
      .addTo(aboutControllerCompleteThought)
      .addIndicators({name: 'mirror '});

})(jQuery);
