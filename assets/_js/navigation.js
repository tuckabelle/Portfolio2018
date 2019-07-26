const header = document.querySelector('#post__img')
const headerimg = document.querySelector('#post__img img')
const header_height = headerimg.offsetHeight - 40

//header.style.height = 'header_height'
const hidden_class = 'totop'
let scrollPos = window.pageYOffset
let lastScrollPos = 0

scrollPos = window.pageYOffset
header.style.height = headerimg.offsetHeight + 'px'
const header_h = header.offsetHeight
console.log(header_h)
if (scrollPos >= header_height) {
  headerimg.classList.add(hidden_class)
} else {
  headerimg.classList.remove(hidden_class)
}

window.addEventListener('scroll', function() {
  scrollPos = window.pageYOffset
  header.style.height = headerimg.offsetHeight + 'px'
  const header_h = header.offsetHeight
  console.log(header_h)
  if (scrollPos >= header_height) {
    headerimg.classList.add(hidden_class)
  } else {
    headerimg.classList.remove(hidden_class)
  }

  lastScrollPos = scrollPos
})
