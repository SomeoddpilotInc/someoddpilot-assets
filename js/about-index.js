(function($) {
  var aboutControllerIndex = new ScrollMagic.Controller();

  var illustration = '.space-illustration .illustration',
      container = '.space-illustration';

  TweenLite.set(container, { backgroundPosition: '-50px -50%' });
  TweenLite.set(illustration, { top: '40%' });

  new ScrollMagic.Scene({
        triggerHook: 'onEnter',
        duration: '200%',
        triggerElement: container
      })
      .setTween(container, {
        backgroundPosition: '50px 50%'
      })
      .addTo(aboutControllerIndex);

  new ScrollMagic.Scene({
        triggerHook: 'onEnter',
        duration: '200%',
        triggerElement: container
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
      leaderText2 = '.about-leader p:nth-child(2)',
      toc = '.toc',
      baseDuration = $(window).height();

  TweenLite.set(logo, { className: '+=header-logo--hide' });
  TweenLite.set(leaderText, { opacity: 1 });
  TweenLite.set(leaderText2, { opacity: 0 });
  TweenLite.set(toc, { opacity: 0, scale: 0 });

  new ScrollMagic.Scene({
        duration: 0,
        triggerElement: 'body',
        triggerHook: "onEnter"
      })
      .setTween(leaderContainer, {
        marginTop: 0,
        marginBottom: 0
      })
      .addTo(aboutControllerIndex);

  new ScrollMagic.Scene({
        duration: baseDuration * 2.2,
        triggerHook: "onEnter"
      })
      .setPin(leader)
      .addTo(aboutControllerIndex);

  new ScrollMagic.Scene({
        duration: baseDuration * 2.2,
        triggerHook: "onEnter"
      })
      .setPin(header)
      .addTo(aboutControllerIndex);

  new ScrollMagic.Scene({
        duration: baseDuration * 0.1,
        offset: baseDuration * 0.5,
        triggerElement: leader,
        triggerHook: 'onLeave'
      })
      .setTween(leaderText, {
        opacity: 0
      })
      .addTo(aboutControllerIndex)
      .addIndicators({name: 'p '});

  new ScrollMagic.Scene({
        duration: baseDuration * 0.1,
        offset: baseDuration * 0.5,
        triggerElement: leader,
        triggerHook: 'onLeave'
      })
      .setTween(leaderText2, {
        opacity: 1
      })
      .addTo(aboutControllerIndex)
      .addIndicators({name: 'p2 '});

  new ScrollMagic.Scene({
        duration: baseDuration * 0.1,
        offset: baseDuration * 1.1,
        triggerElement: leader,
        triggerHook: 'onLeave'
      })
      .setTween(leaderText2, {
        opacity: 0
      })
      .addTo(aboutControllerIndex)
      .addIndicators({name: 'p3 '});

  new ScrollMagic.Scene({
        duration: baseDuration * 0.2,
        offset: baseDuration * 1.2,
        triggerElement: leader,
        triggerHook: 'onLeave'
      })
      .setTween(toc, {
        opacity: 1,
        scale: 1
      })
      .addTo(aboutControllerIndex)
      .addIndicators({name: 'toc '});

  new ScrollMagic.Scene({
        duration: baseDuration * 0.5,
        offset: baseDuration * 1.7,
        triggerElement: leader,
        triggerHook: 'onLeave'
      })
      .setTween(leaderContainer, {
        y: '-150%'
      })
      .addTo(aboutControllerIndex)
      .addIndicators({name: 'leaderContainer '});

  new ScrollMagic.Scene({
        duration: 0,
        offset: baseDuration * 1.8,
        triggerElement: leader,
        triggerHook: 'onLeave'
      })
      .setClassToggle(logo, 'header-logo--show')
      .addTo(aboutControllerIndex)
      .addIndicators({name: 'leaderContainer '});


  // Slides

  var truthVisionSlides = '.truth-vision-slides',
      truthVision = '.truth-vision',
      truthVisionMobile = '.truth-vision--one-col',
      truth = '.truth',
      truthText = truth + ' .absolute-center',
      vision = '.vision',
      visionText = vision + ' .absolute-center';

  TweenLite
    .set([truth, vision], {
      position: 'absolute',
      top: 0,
      left: 0
    });

  TweenLite
    .set(truthVision + ' .display-serif', {
      rotationX: 90,
      opacity: 0
    });

  TweenLite
    .set([truthText, visionText], {
      opacity: 0, marginTop: 10
    });

  TweenLite
    .set(truthVisionMobile + ' .sans', {
      opacity: 0, y: 30
    });

  var slideTimeline = new TimelineMax()
    .add([TweenLite.to(truthVision + ' .left', 0.5, {left: '33%'}),
          TweenLite.to(truthVision + ' .right', 0.5, {
            left: '66%',
            opacity:1
          }),
          TweenLite.to(truthVisionMobile + ' .sans', 0.5, {
            y: 0,
            opacity: 1
          })])
    .add(TweenLite.to(truthVision, 0.5, {opacity: 1}))
    .add(TweenLite.to(truthVision, 0.5, {opacity: 0}))
    .add(TweenLite.to(truthText, 0.25, {
            opacity: 1,
            marginTop: 0
          }))
    .add(TweenLite.to(truth, 1, {opacity: 1}))
    .add([TweenLite.to(truth, 0.5, {opacity: 0}),
          TweenLite.to(vision, 0.5, {opacity: 1})])
    .add(TweenLite.to(visionText, 0.25, {
            opacity: 1,
            marginTop: 0
          }))
    .add(TweenLite.to(vision, 1, {opacity: 1}));

  new ScrollMagic.Scene({
        duration: baseDuration * 0.5,
        triggerElement: truthVisionSlides,
        triggerHook: 0.5
      })
      .setTween(truthVision + ' .display-serif', {
        rotationX: 0,
        opacity: 1
      })
      .addTo(aboutControllerIndex);

  new ScrollMagic.Scene({
        duration: '300%',
        triggerElement: truthVisionSlides,
        triggerHook: 'onLeave'
      })
      .setPin(truthVisionSlides)
      .setTween(slideTimeline)
      .addTo(aboutControllerIndex);

})(jQuery);
