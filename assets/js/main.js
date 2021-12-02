(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });
})()


// --------------Merchants and driver section change script --------------------------

let ourMerchants = document.querySelector('#ourMerchants')
let ourDriver = document.querySelector('#ourDriver')
let ourMerchantsSpan = document.querySelector('#ourMerchants span')
let ourourDriverSpan = document.querySelector('#ourDriver span')

let ourMerchantsCarousel = document.querySelector('.ourMerchantsCarousel ')
let ourDriverCaourosel = document.querySelector('.ourDriverCaourosel')

//----------functions 
let showHide = (marchantsDisplay, driverDisplay, transition) => {
  ourMerchantsCarousel.style.display = marchantsDisplay
  ourDriverCaourosel.style.display = driverDisplay
  ourMerchantsCarousel.style.transition = transition
  ourDriverCaourosel.style.transition = transition
}

let headerTitle = (merchantsTxdec, merchantsSpanCol, DriverTxDec, DriverSpanCol) => {
  ourMerchants.style.textDecoration = merchantsTxdec
  ourMerchantsSpan.style.color = merchantsSpanCol
  //--------
  ourDriver.style.textDecoration = DriverTxDec
  ourourDriverSpan.style.color = DriverSpanCol

}
//----------------events
document.addEventListener('click', (e) => {
  if (e.target == ourMerchants || e.target == ourMerchantsSpan) {
    showHide('block', 'none', '.5s all ease-in-out')
    headerTitle('underline', '#DC6E89', 'none', '#000')

  }
})
// ---------
document.addEventListener('click', (e) => {
  if (e.target == ourDriver || e.target == ourourDriverSpan) {
    showHide('none', 'block', '.5s all ease-in-out')
    headerTitle('none', '#000', 'underline', '#DC6E89')

  }
})