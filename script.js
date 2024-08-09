gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

gsap.config({
  nullTargetWarn: false,
  trialWarn: false
});

// RELOAD AT THE TOP
$(window).on("beforeunload", function () {
  history.scrollRestoration = "manual";
});

// LOAD COMPLETE
function loadComplete() {
  $(".c-body").removeClass("no-scroll");
  lenis.start();
}

// MOBILE NAVIGATION
function mobileNav() {
  let navBtn = $(".c-nav-btn");
  let navBar1 = $(".c-nav-icon-bar")[0];
  let navBar2 = $(".c-nav-icon-bar")[1];
  let navBar3 = $(".c-nav-icon-bar")[2];
  let navContent = $(".c-header_center");

  gsap.set(navContent, {
    clipPath: "inset(0% 100% 0% 0%)",
    autoAlpha: 1
  });

  let tl = gsap.timeline({
    paused: true,
    defaults: { ease: "expo.inOut", duration: 1.2 }
  });

  tl.to(navContent, { clipPath: "inset(0% 0% 0% 0%)" });
  tl.to(navBar1, { y: 7, rotate: -45 }, 0);
  tl.to(navBar2, { width: 0 }, 0);
  tl.to(navBar3, { y: -7, rotate: 45 }, 0);

  navBtn.on("click", function () {
    $(this).toggleClass("is-open");
    if ($(this).hasClass("is-open")) {
      lenis.stop();
      tl.restart();
    } else {
      lenis.start();
      tl.reverse();
    }
  });
}

// FADE
function fade2() {
  gsap.set("[fade2]", { opacity: 0, y: "4em" });

  ScrollTrigger.batch("[fade2]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1
      })
  });
}

function fade() {
  gsap.set("[fade]", { opacity: 0, y: "4em" });

  let elements = $("[fade]");
  elements.each(function (index, element) {
    ScrollTrigger.create({
      trigger: element,
      start: "-50% bottom",
      onEnter: function () {
        staggerAnimation(element, index);
      },
      once: true
    });
  });

  function staggerAnimation(element, index) {
    gsap.fromTo(
      element,
      { opacity: 0, y: "4em" },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
        delay: index * 0.1
      }
    );
  }
}

function line() {
  // Draw line
  gsap.set("[line]", { opacity: 1, scaleX: 0, transformOrigin: "top left" });

  ScrollTrigger.batch("[line]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        scaleX: 1,
        delay: 0.1,
        duration: 2,
        ease: "power3.out",
        stagger: 0.1
      })
  });
}

// BUTTON SECONDARY
function btnSecondary() {
  $(".c-btn.secondary").each(function () {
    let btnIcon = $(this).find(".c-btn-icon");
    let btnBg1 = $(this).find(".c-btn-icon-bg-1");
    let btnBg2 = $(this).find(".c-btn-icon-bg-2");

    let tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power1.inOut", duration: 0.3 }
    });

    tl.to(btnIcon, { x: "0.2em", duration: 0.6, backgroundColor: "#FF530D" });
    tl.to(btnBg1, { width: "100%" }, 0);
    tl.to(btnBg2, { width: "100%" }, 0.3);

    $(this).on("mouseenter", function () {
      tl.restart();
    });

    $(this).on("mouseleave", function () {
      tl.reverse();
    });
  });
}

// HOME DRAWSVG
function homeDraw() {
  $("[draw-svg] path, [draw-svg] rect").each(function () {
    let shape = $(this);

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: shape,
        start: "top center"
      }
    });

    tl.from(shape, { duration: 3, drawSVG: "50% 50%", ease: "power3.out" });
  });
}
homeDraw();

// HEADER SCROLL
function headerScroll() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".c-body",
      start: "150 top",
      end: "+=1",
      onEnter: () => {
        tl.play();
        $(".c-header").addClass("scrolled");
      },
      onLeaveBack: () => {
        tl.reverse();
        $(".c-header").removeClass("scrolled");
      }
    }
  });
}
headerScroll();

// EXPAND CIRCLE
function expandCircle() {
  $("[expand-trigger]").each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top bottom",
        scrub: true,
        endTrigger: "[expand-endtrigger]"
      }
    });

    tl.fromTo(
      "[expand-el]",
      { scale: 0, transformOrigin: "50% 50%" },
      { scale: 1.9 }
    );
  });
}
expandCircle();

// NAV DROPDOWN
function headerDropdownDesktop() {
  $(".c-dd-link").each(function () {
    let dropdownList = $(this).find(".c-dd-list");
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.4, ease: "power3.inOut" }
    });

    let ddLinkTxt = $(this).find(".c-dd-link_top .t-body-3");

    gsap.set(dropdownList, { display: "flex", visibility: "hidden" });

    tl.to(dropdownList, { autoAlpha: 1, scale: 1 });
    tl.to($(this).find(".c-icon.dd-arrow"), { rotation: 180 }, 0);
    tl.to(ddLinkTxt, { color: "#FF530D" }, 0);

    $(this).on("click", function () {
      $(".c-dd-link.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });

    $(document).mouseup(function (e) {
      if ($(e.target).closest(".c-dd-link").length === 0) {
        $(".c-dd-link.is-open").click();
      }
    });
  });
}

// NAV DROPDOWN MOBILE
function headerDropdownMobile() {
  $(".c-dd-link").each(function () {
    let dropdownList = $(this).find(".c-dd-list");
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.4, ease: "power3.inOut" }
    });

    let ddLinkTxt = $(this).find(".c-dd-link_top .t-body-3");

    gsap.set(dropdownList, {
      display: "flex",
      visibility: "hidden",
      height: 0,
      clipPath: "inset(0% 0% 100% 0%)"
    });

    tl.to(dropdownList, {
      autoAlpha: 1,
      scale: 1,
      height: "auto",
      clipPath: "inset(0% 0% 0% 0%)"
    });
    tl.to($(this).find(".c-icon.dd-arrow"), { rotation: 180 }, 0);
    tl.to(ddLinkTxt, { color: "#FF530D" }, 0);

    $(this).on("click", function () {
      $(".c-dd-link.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });

    $(document).mouseup(function (e) {
      if ($(e.target).closest(".c-dd-link").length === 0) {
        $(".c-dd-link.is-open").click();
      }
    });
  });
}

// HEADER CTA MOBILE
function headerCtaMobile() {
  $(".c-header_rt").appendTo(".c-header-nav");
  $(".c-header_rt").css("display", "flex");
}

// BRANDS MARQUEE
function brandsMarquee() {
  const itemDuration = 2; // Duration per item in seconds
  const items = document.querySelectorAll(".c-marquee-item");
  const totalDuration = items.length * itemDuration;

  let tl = gsap.timeline({ repeat: -1 });
  tl.fromTo(
    ".c-marquee-list",
    { xPercent: 0 },
    { xPercent: -100, duration: totalDuration, ease: "none" }
  );
  tl.fromTo(
    ".c-marquee-list.reverse",
    { xPercent: 0 },
    { xPercent: 100, duration: totalDuration, ease: "none" },
    0
  );
}

brandsMarquee();

function accordionPanel() {
  $(".c-panel").each(function (index) {
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.8, ease: "power3.inOut" }
    });

    let panelEl = $(this).closest(".c-panel");
    let panelLink = $(this).find(".c-panel-link");
    let panelContent = $(this).find(".c-panel-content-wrap");
    let panelImg = $(this).find(".c-panel-content_rt");

    gsap.set(panelContent, { autoAlpha: 0, clipPath: "inset(0% 100% 0% 0%)" });

    tl.to(panelEl, { width: "100%" });

    if ($(window).width() >= 992 && index === 2) {
      tl.to(panelLink, { borderRight: "#FFFFFF" }, 0);
    }

    tl.to(panelContent, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)" }, 0.2);

    panelLink.on("click", function () {
      $(".c-panel-link.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      $(".c-panel-nav-link").eq(index).toggleClass("is-active");
      if ($(this).hasClass("is-open")) {
        tl.timeScale(1);
        tl.restart();
      } else {
        tl.timeScale(1.5);
        tl.reverse();
      }
    });
  });

  // Previous arrow click event
  $(".swiper-prev.solutions").on("click", function () {
    let currentPanel = $(".c-panel-link.is-open").closest(".c-panel");
    let prevPanel = currentPanel.prev(".c-panel");
    if (prevPanel.length) {
      prevPanel.find(".c-panel-link").click();
    }
  });

  // Next arrow click event
  $(".swiper-next.solutions").on("click", function () {
    let currentPanel = $(".c-panel-link.is-open").closest(".c-panel");
    let nextPanel = currentPanel.next(".c-panel");
    if (nextPanel.length) {
      nextPanel.find(".c-panel-link").click();
    }
  });
}

// ACCORDION MOBILE PANEL
function accordionPanelMobile() {
  $(".c-panel").each(function (index) {
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.4, ease: "power3.inOut" }
    });

    let panelEl = $(this).closest(".c-panel");
    let panelLink = $(this).find(".c-panel-link");
    let panelContent = $(this).find(".c-panel-content-wrap");

    gsap.set(panelContent, { opacity: 0 });

    tl.to(panelContent, {
      height: "auto"
    });
    tl.to(panelLink, { borderRight: "#FFFFFF" }, 0);

    tl.to(panelContent, { opacity: 1 }, 0);

    panelLink.on("click", function () {
      $(".c-panel-link.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      $(".c-panel-nav-link").eq(index).toggleClass("is-active");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });
  });
}

// ACCORDION PANEL TABS
function accordionTabs() {
  $(".c-panel-nav-link").each(function (index) {
    $(this).on("click", function () {
      $(".c-panel-link").eq(index).click();
    });
  });
}
accordionTabs();

// FAQ accordion
function accordionFaq() {
  $(".c-accordion").each(function () {
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.6, ease: "power2.inOut" }
    });

    let accordion = $(this);
    let accordionTxt = $(this).find(".t-display-6");
    let accordionIcon = $(this).find(".c-accordion-icon .accordion-line1");
    let accordionTop = $(this).find(".c-accordion_bt");

    gsap.set(accordionTxt, { opacity: 0.6 });

    tl.to(accordionTop, { height: "auto", marginTop: "40px" });
    tl.to(accordionIcon, { rotate: 90, transformOrigin: "center center" }, 0);
    tl.to(accordionTxt, { opacity: 1 }, 0);
    tl.to(accordion, { borderBottomColor: "#011624" }, 0);

    $(this).on("click", function () {
      $(".c-accordion.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });
  });
}
accordionFaq();

// HOME PAGE LOAD
function homePageLoad() {
  let hmHeroTxt = $(".c-hm-hero_lt");
  let hmHeroGridHoz = $(".hm-grid-hoz");
  let hmHeroGridVer = $(".hm-grid-ver");
  let imgEl1 = $(".c-img-contain.hm_rt").find(".c-img")[0];
  let imgEl2 = $(".c-img-contain.hm_rt").find(".c-img")[1];
  let imgEl3 = $(".c-img-contain.hm_rt").find(".c-img")[2];
  let imgEl4 = $(".c-img-contain.hm_rt").find(".c-img")[3];
  let imgEl5 = $(".c-img-contain.hm_rt").find(".c-img")[4];
  let imgEl6 = $(".c-img-contain.hm_rt").find(".c-img")[5];
  let financeEl = $(".c-hm-finance");
  let financeLines = $(".finance-line");
  let circleEl = $(".c-hm-circle");
  let circleLine = $(".hm-hero-circle");

  let tl = gsap.timeline({
    defaults: { ease: "power4.out", duration: 1.4 }
  });

  gsap.set(hmHeroTxt, { y: "5em" });
  gsap.set(".c-img-contain.hm_rt .c-img", { y: "5em" });
  gsap.set(financeLines, { clipPath: "inset(100% 0% 0% 0%)", autoAlpha: 1 });
  gsap.set(hmHeroGridHoz, { width: 0 });
  gsap.set(hmHeroGridVer, { height: 0 });

  tl.to(hmHeroGridHoz, {
    width: "100%",
    ease: "power3.out",
    autoAlpha: 1,
    stagger: { amount: 0.5, from: "start" }
  });
  tl.to(
    hmHeroGridVer,
    {
      height: "100%",
      ease: "power3.out",
      autoAlpha: 1,
      stagger: { amount: 0.5, from: "end" }
    },
    0.1
  );
  tl.to(circleEl, { autoAlpha: 1 }, 0.1);
  tl.from(
    circleLine,
    { duration: 3, drawSVG: "0%", ease: "power2.out", delay: 1.2 },
    0.1
  );
  tl.to(hmHeroTxt, { y: 0, autoAlpha: 1 }, 0.1);
  tl.to(imgEl1, { y: 0, autoAlpha: 1 }, 0.2);
  tl.to(imgEl2, { y: 0, autoAlpha: 1 }, 0.3);
  tl.to(imgEl3, { y: 0, autoAlpha: 1 }, 0.4);
  tl.to(imgEl4, { y: 0, autoAlpha: 1 }, 0.5);
  tl.to(imgEl5, { y: 0, autoAlpha: 1 }, 0.6);
  tl.to(imgEl6, { y: 0, autoAlpha: 1 }, 0.7);
  tl.to(financeEl, { y: 0, autoAlpha: 1 }, 0.8);
  tl.to(
    financeLines,
    {
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "expo.out",
      duration: 1,
      stagger: 0.1
    },
    0.6
  );
}

function whatPageLoad() {
  let whatHeroTxt = $(".c-what-hero_lt");
  let imgEl1 = $(".c-img-contain.what_rt").find(".c-img")[0];
  let imgEl2 = $(".c-img-contain.what_rt").find(".c-img")[1];
  let imgEl3 = $(".c-img-contain.what_rt").find(".c-img")[2];
  let imgEl4 = $(".c-img-contain.what_rt").find(".c-img")[3];
  let imgEl5 = $(".c-img-contain.what_rt").find(".c-img")[4];
  let imgEl6 = $(".c-img-contain.what_rt").find(".c-img")[5];
  let imgEl7 = $(".c-img-contain.what_rt").find(".c-img")[6];
  let imgEl8 = $(".c-img-contain.what_rt").find(".c-img")[7];

  let tl = gsap.timeline({
    defaults: { ease: "power4.out", duration: 1.4 }
  });

  gsap.set(whatHeroTxt, { y: "5em" });
  gsap.set(".c-img-contain.what_rt .c-img", { y: "5em" });
  gsap.set(imgEl4, { scale: 0 });
  gsap.set(imgEl5, { y: 0, xPercent: -100 });
  gsap.set(imgEl6, { y: 0, xPercent: -100 });
  gsap.set(imgEl7, { y: 0, xPercent: -100 });

  tl.fromTo(
    ".c-what-lines rect",
    { width: "0%" },
    { width: "100%", autoAlpha: 1, stagger: 0.2, duration: 2 }
  );

  tl.to(whatHeroTxt, { y: 0, autoAlpha: 1 }, 0.1);
  tl.to(imgEl1, { y: 0, autoAlpha: 1 }, 0.2);
  tl.to(imgEl8, { y: 0, autoAlpha: 1 }, 0.3);
  tl.to(imgEl2, { y: 0, autoAlpha: 1 }, 0.4);
  tl.to(imgEl3, { y: 0, autoAlpha: 1 }, 0.5);
  tl.to(
    imgEl4,
    {
      y: 0,
      autoAlpha: 1,
      scale: 1,
      transformOrigin: "center",
      ease: "expo.out"
    },
    0.5
  );
  tl.to(imgEl5, { y: 0, autoAlpha: 1, xPercent: 0 }, 0.6);
  tl.to(imgEl6, { y: 0, autoAlpha: 1, xPercent: 0 }, 0.7);
  tl.to(imgEl7, { y: 0, autoAlpha: 1, xPercent: 0 }, 0.8);
}

// HERO PAGE LOAD
function heroPageLoad() {
  let ShapeLeft = $(".c-img-contain.shape_hero_lt");
  let ShapeRight = $(".c-img-contain.shape_hero_rt");
  let heroContent = $("[hero-content]");

  let tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.6 } });

  gsap.set(ShapeLeft, { clipPath: "inset(0% 100% 0% 0%)", autoAlpha: 1 });
  gsap.set(ShapeRight, { clipPath: "inset(0% 0% 0% 100%)", autoAlpha: 1 });
  gsap.set(heroContent, { y: "4em" });

  tl.to(ShapeLeft, { clipPath: "inset(0% 0% 0% 0%)" });
  tl.to(ShapeRight, { clipPath: "inset(0% 0% 0% 0%)" }, 0.3);
  tl.to(heroContent, { y: 0, autoAlpha: 1 }, 0.2);
}
let heroSection = $("[hero-load]");
if (heroSection) {
  heroPageLoad();
}

// FADE PAGE LOAD
function fadePageLoad() {
  let pageWrapper = $(".o-page-wrapper");

  let tl = gsap.timeline();

  tl.to(pageWrapper, { autoAlpha: 1, duration: 1.4, ease: "power3.out" });
}
let fadeLoad = $("[fade-load]");
if (fadeLoad) {
  fadePageLoad();
}

// TOOLTIP
function tooltip() {
  $(".c-breadcrumb").each(function () {
    let tooltipEl = $(this).find(".c-tooltip");

    let tl = gsap.timeline({ paused: true });

    tl.to(tooltipEl, { autoAlpha: 1, duration: 0.4, ease: "power3.inOut" });

    $(this).on("mouseenter", function () {
      tl.restart();
    });

    $(this).on("mouseleave", function () {
      tl.reverse();
    });
  });
}

// COUNTERUP
function counterUp() {
  $(".counterup").each(function (index) {
    let thisId = "countup" + index;
    $(this).attr("id", thisId);
    let startNumber = +$(this).text();
    let endNumber = +$(this).attr("final-number");
    let decimals = $(this).attr("data-decimals") ? parseInt($(this).attr("data-decimals")) : 0;
    let duration = $(this).attr("count-duration");

    let myCounter = new CountUp(
      thisId,
      startNumber,
      endNumber,
      decimals,
      duration
    );

    ScrollTrigger.create({
      trigger: $(this),
      start: "top 80%",
      end: "bottom top",
      onEnter: () => {
        myCounter.start();
      }
    });
  });
}

$(".c-team-bar-link").on("click", function () {
  $(".c-team-bar-link").removeClass("is-active");
  $(this).toggleClass("is-active");
});

// TEAM - OPERATIONS ACCORDION/PHOTOS CONNECTION
function operationsTeam() {
  function closeAllAccordions() {
    $(".c-accordion.operations").removeClass("is-active");
    $(".c-team-item.operations").removeClass("is-active");
  }

  $(".c-accordion.operations").on("click", function () {
    let isActive = $(this).hasClass("is-active");

    closeAllAccordions();

    if (!isActive) {
      $(this).addClass("is-active");
      let activeIndex = $(".c-accordion.operations").index($(this));
      $(".c-team-item.operations").eq(activeIndex).addClass("is-active");
    }
  });
}

operationsTeam();

// MATCHMEDIA DESKTOP
let mm = gsap.matchMedia();

mm.add("(min-width: 992px)", () => {
  headerDropdownDesktop();
  btnSecondary();
  accordionPanel();
  fade();
  fade2();
  line();
  tooltip();
  return () => {
    //
  };
});

// MATCHMEDIA TABLET AND MOBILE
mm.add("(max-width: 991px)", () => {
  headerDropdownMobile();
  accordionPanelMobile();
  mobileNav();
  headerCtaMobile();
  return () => {
    //
  };
});
