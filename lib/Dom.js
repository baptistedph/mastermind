export default class Dom {
  constructor() {
    this.colorsTry = []
  }

  loadGameOver(combinationToFind) {
    const submitButton = document.querySelector('.add-try')
    const boardElement = document.querySelector('.board')
    const colorsElement = document.querySelector('.game-over-content .colors')

    for (const color of combinationToFind) {
      const liColor = document.createElement('li')
      liColor.classList.add('color')
      liColor.style.backgroundColor = color

      colorsElement.appendChild(liColor)
    }

    submitButton.disabled = true
    boardElement.classList.add('game-over')
  }

  clearTrials() {
    const trialsElement = document.querySelector('.trials')

    trialsElement.innerHTML = ''
  }

  updaterRemainingTrials(remainingTrials) {
    const remainingTrialsElement = document.querySelector('.remaining-trials')

    remainingTrialsElement.innerText = `${remainingTrials} essai${
      remainingTrials > 1 ? 's' : ''
    } restant${remainingTrials > 1 ? 's' : ''}.`
  }

  reload() {
    const submitButton = document.querySelector('.add-try')
    const boardElement = document.querySelector('.board')
    const gameOverColorsElement = document.querySelector(
      '.game-over-content .colors',
    )

    gameOverColorsElement.innerHTML = ''

    submitButton.disabled = false
    boardElement.classList.remove('game-over')
    this.clearTrials()
  }

  loadColorList(colors) {
    const colorsElement = document.querySelector('.color-list .colors')

    for (const color of colors) {
      const liColor = document.createElement('li')
      liColor.classList.add('color')
      liColor.style.backgroundColor = color
      liColor.draggable = true

      liColor.addEventListener('dragstart', e => {
        liColor.classList.add('dragging')
      })

      liColor.addEventListener('dragend', () => {
        liColor.classList.remove('dragging')
      })

      colorsElement.appendChild(liColor)
    }
  }

  loadEntries(length) {
    const colorsElement = document.querySelector('.entry .colors')

    for (let i = 0; i < length; i++) {
      let activeColor

      const liColor = document.createElement('li')
      liColor.classList.add('color')

      liColor.addEventListener('dragover', e => {
        e.preventDefault()
        const dragging = document.querySelector('.dragging')
        activeColor = dragging.style.backgroundColor
        liColor.classList.add('dragover')
        liColor.style.borderColor = dragging.style.backgroundColor
      })

      liColor.addEventListener('dragleave', () => {
        liColor.classList.remove('dragover')
        liColor.style.borderColor = null
      })

      liColor.addEventListener('drop', () => {
        this.colorsTry[i] = activeColor
        liColor.style.backgroundColor = activeColor
        liColor.classList.remove('dragover')
        liColor.style.borderColor = null
      })

      colorsElement.appendChild(liColor)
    }
  }

  resetEntries() {
    const colorsElement = document.querySelector('.entry .colors')

    for (const child of colorsElement.children) {
      child.style.backgroundColor = ''
    }
  }

  addTry(id, colors, { wellPlaced, wrongPlaced, won }) {
    const trialsElement = document.querySelector('.trials')

    const liTry = document.createElement('li')
    liTry.classList.add('try')

    const spanId = document.createElement('span')
    spanId.classList.add('id')
    spanId.innerText = id

    const spanWellPlaced = document.createElement('span')
    spanWellPlaced.classList.add('well-placed')
    spanWellPlaced.innerText = wellPlaced

    const spanWrongPlaced = document.createElement('span')
    spanWrongPlaced.classList.add('wrong-placed')
    spanWrongPlaced.innerText = wrongPlaced

    const ulColors = document.createElement('ul')
    ulColors.classList.add('colors')

    for (const color of colors) {
      const liColor = document.createElement('li')
      liColor.classList.add('color')
      liColor.style.backgroundColor = color
      ulColors.appendChild(liColor)
    }

    liTry.appendChild(spanId)
    liTry.appendChild(ulColors)
    liTry.appendChild(spanWellPlaced)
    liTry.appendChild(spanWrongPlaced)
    trialsElement.appendChild(liTry)
    this.resetEntries()
  }
}
