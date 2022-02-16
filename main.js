import Mastermind from './lib/Mastermind'

const mm = new Mastermind()
mm.init()

const colorListElement = document.querySelector('.color-list')

document.addEventListener('click', e => {
  if (
    e.target.matches('.color-list .dots') ||
    (!e.target.closest('.color-list') &&
      colorListElement.classList.contains('active'))
  ) {
    colorListElement.classList.toggle('active')
  }
})
