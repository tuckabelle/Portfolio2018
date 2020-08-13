// const header_height = headerimg.offsetHeight - 40
//
// //header.style.height = 'header_height'
// const hidden_class = 'totop'
// let scrollPos = window.pageYOffset
// let lastScrollPos = 0
//
// scrollPos = window.pageYOffset
// header.style.height = headerimg.offsetHeight + 'px'
// const header_h = header.offsetHeight
// console.log(header_h)
// if (scrollPos >= header_height) {
//   headerimg.classList.add(hidden_class)
// } else {
//   headerimg.classList.remove(hidden_class)
// }
//
// window.addEventListener('scroll', function() {
//   scrollPos = window.pageYOffset
//   header.style.height = headerimg.offsetHeight + 'px'
//   const header_h = header.offsetHeight
//   console.log(header_h)
//   if (scrollPos >= header_height) {
//     headerimg.classList.add(hidden_class)
//   } else {
//     headerimg.classList.remove(hidden_class)
//   }
//
//   lastScrollPos = scrollPos
// })

function resizeGridItem(item) {
  let grid = document.getElementsByClassName('grid')[0]
  let rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')
  )
  let rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue('grid-row-gap')
  )
  let rowSpan = Math.ceil(
    (item.querySelector('.content').getBoundingClientRect().height + rowGap) /
      (rowHeight + rowGap)
  )
  item.style.gridRowEnd = 'span ' + rowSpan
}

function resizeAllGridItems() {
  let allItems = document.getElementsByClassName('item')
  for (let x = 0; x < allItems.length; x++) {
    resizeGridItem(allItems[x])
  }
}

function resizeInstance(instance) {
  let item = instance.elements[0]
  resizeGridItem(item)
}

window.onload = resizeAllGridItems()
window.addEventListener('resize', resizeAllGridItems)
