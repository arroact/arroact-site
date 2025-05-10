// Header Sticky

let lastScroll = 0;
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    header.classList.add('sticky-header');
  } else {
    header.classList.remove('sticky-header');
  }
});


// SVG Vector line Animation 

document.addEventListener("DOMContentLoaded", () => {
    const svgPath = document.querySelector(".svg-elem-1");
    const section = document.getElementById("animated-svg");
    let animationPlayed = false;

    function startAnimation() {
        svgPath.style.opacity = "1";
        svgPath.style.animation = "animate-svg-stroke-1 8s cubic-bezier(0.47, 0, 0.745, 0.715) 0s both";
        animationPlayed = true;
    }

    function checkIfInView() {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            startAnimation();
        }
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !animationPlayed) {
                    startAnimation();
                }
            });
        },
        { threshold: 0.5 } 
    );

    observer.observe(section);

    checkIfInView();
});


// Hero banner Chat animation 

const typingContainer = document.querySelector(".typing-container");
const animationLink = document.querySelector(".animation-link"); 
let firstHover = true; 

if (typingContainer) {
  typingContainer.addEventListener("mouseenter", function () {
    if (firstHover) {
      this.classList.add("first-hover");
      firstHover = false;
    } else {
      this.classList.add("instant-show");
    }
  });

  typingContainer.addEventListener("mouseleave", function () {
    this.classList.remove("first-hover", "instant-show");
  });
}

if (animationLink && typingContainer) {
  animationLink.addEventListener("mouseenter", function () {
    typingContainer.classList.add("instant-show");
  });

  animationLink.addEventListener("mouseleave", function () {
    typingContainer.classList.remove("instant-show");
  });
}





// Add Bg 

document.querySelectorAll("[data-bg]").forEach(element => {
  const isMobile = window.innerWidth < 767;
  const bgPath = isMobile 
    ? element.getAttribute("data-bg-mobile") || element.getAttribute("data-bg") 
    : element.getAttribute("data-bg");

  if (bgPath) {
    element.style.backgroundImage = `url('${bgPath}')`;
    element.style.backgroundSize = "cover";
    element.style.backgroundPosition = "center";
    element.style.backgroundRepeat = "no-repeat";
    element.removeAttribute("data-bg");
    element.removeAttribute("data-bg-mobile");
  }
});

// Owl slider 

$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    loop: false,
    margin: 20,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1, center: true },
      576: { items: 2 },
      1200: { items: 3 },
      1300: { items: 3, stagePadding: 180 }
    }
  });
});


// Header menu 

document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth >= 992) { 
    var dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(function (dropdown) {
      let toggle = dropdown.querySelector(".dropdown-toggle");
      let menu = dropdown.querySelector(".dropdown-menu");

      
      function showMenu() {
        menu.classList.add("show");
        toggle.classList.add("active");
      }

     
      function hideMenu() {
        menu.classList.remove("show");
        toggle.classList.remove("active");
      }

     
      toggle.addEventListener("click", function (event) {
        event.preventDefault();
        let isOpen = menu.classList.contains("show");

        
        document.querySelectorAll(".dropdown-menu.show").forEach(function (openMenu) {
          openMenu.classList.remove("show");
        });
        document.querySelectorAll(".dropdown-toggle.active").forEach(function (activeToggle) {
          activeToggle.classList.remove("active");
        });

        
        if (!isOpen) {
          showMenu();
        }
      });

     
      document.addEventListener("click", function (e) {
        if (!dropdown.contains(e.target)) {
          hideMenu();
        }
      });

      
      dropdown.addEventListener("mouseenter", function () {
        showMenu();
      });

      dropdown.addEventListener("mouseleave", function () {
        hideMenu();
      });
    });
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector("nav.navbar");
  const toggler = document.querySelector(".navbar-toggler");
  const collapse = document.getElementById("navbarNavDropdown");
  const header = document.querySelector("header");


  if (navbar && toggler && collapse && header) {
    collapse.addEventListener("show.bs.collapse", function () {
      if (window.innerWidth < 992) {
        navbar.classList.add("open");
        header.classList.add("header-show");
      }
    });

    collapse.addEventListener("hide.bs.collapse", function () {
      if (window.innerWidth < 992) {
        navbar.classList.remove("open");
        header.classList.remove("header-show");
      }
    });
  }
});


// Testimonial slider 
const sync1 = $(".left-slider");
const sync2 = $(".right-slider");
const duration = 400;
let sectionInView = false;
let currentIndex = 0;
const chatTimers = {};
let isAnimating = false;

function isMobile() {
  return window.innerWidth <= 991;
}

function isSmallMobile() {
  return window.innerWidth <= 767;
}

sync1.owlCarousel({
  items: 1,
  loop: false,
  margin: 10,
  nav: true,
  dots: false,
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  smartSpeed: 100,
  mouseDrag: false,
  touchDrag: false
});

sync2.owlCarousel({
  items: 1,
  loop: false,
  margin: 10,
  nav: false,
  dots: false,
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  smartSpeed: 100,
  mouseDrag: false,
  touchDrag: false
});

function updateSwipeBasedOnScreen() {
  const isMobileScreen = isMobile();
  const isSmallScreen = isSmallMobile();

 
  sync1.trigger('destroy.owl.carousel');
  sync2.trigger('destroy.owl.carousel');


  sync1.owlCarousel({
    items: 1,
    loop: false,
    margin: 10,
    nav: true,
    dots: false,
    animateOut: isSmallScreen ? false : 'fadeOut',
    animateIn: isSmallScreen ? false : 'fadeIn',
    smartSpeed: 100,
    mouseDrag: isMobileScreen,
    touchDrag: isMobileScreen
  });

  sync2.owlCarousel({
    items: 1,
    loop: false,
    margin: 10,
    nav: false,
    dots: false,
    animateOut: isSmallScreen ? false : 'fadeOut',
    animateIn: isSmallScreen ? false : 'fadeIn',
    smartSpeed: 100,
    mouseDrag: isMobileScreen,
    touchDrag: isMobileScreen
  });

 
  sync1.on('changed.owl.carousel', (e) => syncSlides(e, sync1, sync2));
  sync2.on('changed.owl.carousel', (e) => syncSlides(e, sync2, sync1));
}



$(window).on('resize', updateSwipeBasedOnScreen);
updateSwipeBasedOnScreen();

function lockSlider() {
  if (isSmallMobile()) return;
  isAnimating = true;
  toggleNav(true);
  disableSwipe();
  blockManualNavigation();
}

function unlockSlider() {
  if (isSmallMobile()) return;
  isAnimating = false;
  toggleNav(false);
  enableSwipe();
  unblockManualNavigation();
}

function toggleNav(disable) {
  const navButtons = sync1.find('.owl-prev, .owl-next');
  navButtons.prop('disabled', disable);
  navButtons.css({
    opacity: disable ? 0.4 : 1,
    pointerEvents: disable ? 'none' : 'auto'
  });
}

function disableSwipe() {
  if (isSmallMobile()) return;
  sync1.data('owl.carousel').options.mouseDrag = false;
  sync1.data('owl.carousel').options.touchDrag = false;
  sync2.data('owl.carousel').options.mouseDrag = false;
  sync2.data('owl.carousel').options.touchDrag = false;

  sync1.trigger('refresh.owl.carousel');
  sync2.trigger('refresh.owl.carousel');
}

function enableSwipe() {
  if (isMobile()) {
    sync1.data('owl.carousel').options.mouseDrag = true;
    sync1.data('owl.carousel').options.touchDrag = true;
    sync2.data('owl.carousel').options.mouseDrag = true;
    sync2.data('owl.carousel').options.touchDrag = true;

    sync1.trigger('refresh.owl.carousel');
    sync2.trigger('refresh.owl.carousel');
  }
}

function blockManualNavigation() {
  if (isSmallMobile()) return;
  sync1.on('drag.owl.carousel', preventSlide);
}

function unblockManualNavigation() {
  sync1.off('drag.owl.carousel', preventSlide);
}

function preventSlide(e) {
  if (isAnimating) {
    e.preventDefault();
    e.stopPropagation();
  }
}

function syncSlides(event, source, target) {
  const newIndex = event.item.index;

  if (isAnimating && !isSmallMobile()) {
    source.trigger('to.owl.carousel', [currentIndex, 0, true]);
    return;
  }

  if (chatTimers[currentIndex]) {
    chatTimers[currentIndex].forEach(timer => clearTimeout(timer));
    const prevContent = sync2.find('.owl-item').eq(currentIndex).find('.carousel-content');
    prevContent.find('.testimonial-chat').css('display', 'flex');
    chatTimers[currentIndex] = [];
  }

  currentIndex = newIndex;
  target.trigger('to.owl.carousel', [newIndex, duration, true]);

  if (sectionInView) {
    setTimeout(() => {
      triggerChatAnimation(newIndex);
    }, duration + 50);
  }
}

sync1.on('changed.owl.carousel', (e) => syncSlides(e, sync1, sync2));
sync2.on('changed.owl.carousel', (e) => syncSlides(e, sync2, sync1));

function triggerChatAnimation(index) {
  const current = sync2.find('.owl-item').eq(index).find('.carousel-content');

  if (isSmallMobile()) {
    current.find('.testimonial-chat').css('display', 'flex');
    current.attr('data-animated', "true").attr('data-animation-done', "true");
    return;
  }

  const isAnimated = current.attr('data-animated');
  const animationDone = current.attr('data-animation-done');

  if (isAnimated === "false") {
    current.attr('data-animated', "true");
    lockSlider();

    showChatOneByOne(current, index, () => {
      unlockSlider();
      current.attr('data-animation-done', "true");
    });
  } else if (animationDone === "true") {
    current.find('.testimonial-chat').css('display', 'flex');
  }
}

function showChatOneByOne(container, index, onComplete) {
  const chats = container.find('.testimonial-chat');
  chats.hide();
  chatTimers[index] = [];

  chats.each(function (i) {
    const timer = setTimeout(() => {
      $(this).css('display', 'flex');
      if (i === chats.length - 1 && typeof onComplete === 'function') {
        onComplete();
      }
    }, i * 900);
    chatTimers[index].push(timer);
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      sectionInView = true;
      const index = sync2.find('.owl-item.active').index();
      triggerChatAnimation(index);
    }
  });
}, { threshold: 0.4 });

const testimonialSection = document.getElementById('testimonialSection');
if (testimonialSection) {
  observer.observe(testimonialSection);
}


// Scroll bottom to top button

const scrollBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


// Remove #id from url

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("a");

  links.forEach(link => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href && href.startsWith("#")) {
        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });

          history.replaceState(null, null, window.location.pathname);
        }
      }
    });
  });
});

// Accordion active 

document.addEventListener("DOMContentLoaded", function () {
  const accordion = document.getElementById("accordionFlushExample");

  accordion.addEventListener("shown.bs.collapse", function (event) {
    const item = event.target.closest(".accordion-item");
    item.classList.add("active");
  });

  accordion.addEventListener("hidden.bs.collapse", function (event) {
    const item = event.target.closest(".accordion-item");
    item.classList.remove("active");
  });

  accordion.querySelectorAll(".accordion-collapse.show").forEach(collapse => {
    const item = collapse.closest(".accordion-item");
    item.classList.add("active");
  });
});

// Gallery

function toggleSliderAnimation() {
  const wrapper = document.querySelector('.image-slider-wrapper');
  const slider = document.querySelector('.image-slider');

  if (!wrapper || !slider) return;

  const wrapperWidth = wrapper.offsetWidth;
  const sliderWidth = slider.scrollWidth;

  if (sliderWidth > wrapperWidth) {
    slider.classList.add('animate');
  } else {
    slider.classList.remove('animate');
  }
}

// Run on load and resize
window.addEventListener('load', toggleSliderAnimation);
window.addEventListener('resize', toggleSliderAnimation);


// Service Detail Steps 

document.addEventListener("DOMContentLoaded", function () {
  const stepsContainer = document.querySelector('.development-process-wrapper__steps');
  const steps = document.querySelectorAll('.development-process-wrapper__steps .step');
  let animationStarted = false;

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 && 
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  function startStepAnimation() {
    steps.forEach((step, index) => {
      if (isInViewport(step) && !step.classList.contains('step-active')) {
        setTimeout(() => {
          step.classList.add('step-active');
        }, 1000 * index); // Delay based on the index (1 second per step)
      }
    });
  }

  function handleScroll() {
    startStepAnimation();
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();  // Trigger the check on load
});




     
      
      






