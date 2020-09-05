'use strict'

import Masonry from 'masonry-layout'

const grid = document.querySelector('.grid')
const msnry = new Masonry(grid, {
  itemSelector: '.grid-item',
  columnWidth: '.grid-item',
  gutter: 48,
  percentPosition: true,
  horizontalOrder: true
})

msnry.once('layoutComplete', () => {
  grid.classList.add('load')
})

msnry.layout()
