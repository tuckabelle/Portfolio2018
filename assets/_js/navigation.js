const header = document.querySelector('.site-nav')
const header_height = header.offsetHeight + 8
//console.log(header_height);
const hidden_class = 'totop'
let scrollPos = window.pageYOffset
let lastScrollPos = 0
let offsetScroll = true

window.addEventListener('scroll', function() {
  scrollPos = window.pageYOffset

  if (!offsetScroll) {
    scrollPos += header_height
  }

  if (scrollPos > header_height) {
    offsetScroll = false

    header.classList.add(hidden_class)
  } else {
    offsetScroll = true
    header.classList.remove(hidden_class)
  }

  lastScrollPos = scrollPos
})
