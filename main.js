import Mastermind from './lib/Mastermind'

const mm = new Mastermind()
mm.init()

const handleTheme = () => {
  const switchThemeButton = document.querySelector('.switch-theme-button')

  let theme = window.localStorage.getItem('mastermind-theme')

  if (theme) {
    document.body.className = theme
  } else {
    window.localStorage.setItem('mastermind-theme', 'light')
    document.body.className = 'light'
  }

  switchThemeButton.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark'
    window.localStorage.setItem('mastermind-theme', theme)
    document.body.className = theme
  })
}

handleTheme()
