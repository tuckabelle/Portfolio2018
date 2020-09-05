const Navigation = () => {
  const trigger = document.querySelector('#actionButton1')
  const menu = document.querySelector('.action-menu')

  trigger.addEventListener('click', function() {
    if (menu.classList.contains('is-active')) {
      this.setAttribute('aria-expanded', 'false')
      this.classList.remove('is-active')
      menu.classList.remove('is-active')
    } else {
      menu.classList.add('is-active')
      this.setAttribute('aria-expanded', 'true')
      this.classList.add('is-active')
    }
  })
  document.addEventListener('click', function(event) {
    let isClickInside = trigger.contains(event.target)

    if (!isClickInside) {
      trigger.setAttribute('aria-expanded', 'false')
      trigger.classList.remove('is-active')
      menu.classList.remove('is-active')
    }
  })
}

export default Navigation
