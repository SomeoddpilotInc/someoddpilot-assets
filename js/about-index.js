(function($) {
  var aboutControllerIndex = new ScrollMagic.Controller();

  var illustration = '.space-illustration .illustration',
      illustContainer = '.space-illustration';

  TweenLite.set(illustContainer, { backgroundPosition: '-50px -50%' });
  TweenLite.set(illustration, { top: '40%' });

  new ScrollMagic.Scene({
        triggerHook: 'onEnter',
        duration: '200%',
        triggerElement: illustContainer
      })
      .setTween(illustContainer, {
        backgroundPosition: '50px 50%'
      })
      .addTo(aboutControllerIndex);

  new ScrollMagic.Scene({
        triggerHook: 'onEnter',
        duration: '200%',
        triggerElement: illustContainer
      })
      .setTween(illustration, {
        top: '60%'
      })
      .addTo(aboutControllerIndex);

  var header = 'header',
      logo = '.header-logo',
      leader = '.about-leader',
      leaderContainer = '.about-leader .black-container',
      leaderText = '.about-leader p:first-child',
      toc = '.toc',
      baseDuration = $(window).height();

  TweenLite.set(logo, { className: '+=header-logo--hide' });
  TweenLite.set(leaderText, { opacity: 1 });
  TweenLite.set(toc, { opacity: 0, scale: 0 });

  TweenLite.to($(leaderContainer), 1, {
        marginTop: 0,
        marginBottom: 0
      });

  new ScrollMagic.Scene({
        duration: baseDuration * 2.5
      })
      .setPin(header, {pushFollowers: false})
      .addTo(aboutControllerIndex);

  new ScrollMagic.Scene({
        duration: baseDuration * 2.5,
      })
      .setPin(leader)
      .addTo(aboutControllerIndex);

  var leaderTimeline = new TimelineLite()
    .add(TweenLite.to( leaderText, 0.25, { opacity: 0, delay: 0.25 } ))
    .add(TweenLite.to( toc, 0.5, { opacity: 1, scale: 1}))
    .add(TweenLite.to( leaderContainer, 1, { y: '-150%', delay: 0.75 } ));

  new ScrollMagic.Scene({
        duration: baseDuration * 2,
        offset: baseDuration * 0.5,
      })
      .setTween(leaderTimeline)
      .addTo(aboutControllerIndex);

  new ScrollMagic.Scene({
        duration: 0,
        offset: baseDuration * 2,
        triggerElement: leader,
        triggerHook: 'onLeave'
      })
      .setClassToggle(logo, 'header-logo--show')
      .addTo(aboutControllerIndex)
      .addIndicators({name: 'leaderContainer2 '});

  // Slides

  var truthVisionSlides = '.truth-vision-slides',
      truthVision = '.truth-vision',
      truth = '.truth',
      vision = '.vision';

  TweenLite
    .set([truth, vision], {
      position: 'absolute',
      top: 0,
      left: 0
    });

  var slideTimeline = new TimelineLite()
    .add(TweenLite.to(truthVision, 0.5, {opacity: 1}))
    .add(TweenLite.to(truthVision, 0.5, {opacity: 0}))
    .add(TweenLite.to(truth, 1, {opacity: 1}))
    .add([TweenLite.to(truth, 0.5, {opacity: 0}),
          TweenLite.to(vision, 0.5, {opacity: 1})])
    .add(TweenLite.to(vision, 1, {opacity: 1}));

  new ScrollMagic.Scene({
        duration: '300%',
        triggerElement: truthVisionSlides,
        triggerHook: 'onLeave'
      })
      .setPin(truthVisionSlides)
      .setTween(slideTimeline)
      .addTo(aboutControllerIndex);

})(jQuery);
