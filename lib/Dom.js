export default class Dom {
  constructor() {
    this.colorsTry = []
  }

  loadGameOver(combinationToFind) {
    const submitButton = document.querySelector('.add-try-button')
    const boardElement = document.querySelector('.board')
    const restartContentElement = document.querySelector('.restart-content')
    const h3Element = restartContentElement.querySelector('h3')

    const ulColors = document.createElement('ul')
    ulColors.classList.add('colors')

    for (const color of combinationToFind) {
      const liColor = document.createElement('li')
      liColor.classList.add('color')
      liColor.style.backgroundColor = color

      ulColors.appendChild(liColor)
    }

    h3Element.insertAdjacentElement('afterend', ulColors)

    h3Element.innerText = 'La combinaison à trouver était :'
    submitButton.disabled = true
    boardElement.classList.add('restart')
  }

  loadWin() {
    const submitButton = document.querySelector('.add-try-button')
    const boardElement = document.querySelector('.board')
    const h3Element = document.querySelector('.restart-content h3')

    submitButton.disabled = true
    h3Element.innerText = 'Vous avez gagné !'
    boardElement.classList.add('restart')
  }

  updateError(error) {
    const errorElement = document.querySelector('.error')
    if (error) {
      errorElement.classList.add('show')
    } else {
      errorElement.classList.remove('show')
    }
    errorElement.innerText = error
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
    const submitButton = document.querySelector('.add-try-button')
    const boardElement = document.querySelector('.board')
    const colorsElement = document.querySelector('.restart-content .colors')

    if (colorsElement) {
      colorsElement.innerHTML = ''
    }

    submitButton.disabled = false
    boardElement.classList.remove('restart')
    this.clearTrials()
  }

  loadColorList(colors) {
    const colorListElement = document.querySelector('.color-list')
    const colorsElement = colorListElement.querySelector('.colors')

    for (const color of colors) {
      const liColor = document.createElement('li')
      liColor.classList.add('color')
      liColor.style.backgroundColor = color
      liColor.draggable = true

      liColor.addEventListener('dragstart', () => {
        liColor.classList.add('dragging')
      })

      liColor.addEventListener('dragend', () => {
        liColor.classList.remove('dragging')
      })

      colorsElement.appendChild(liColor)
    }

    document.addEventListener('click', e => {
      if (
        e.target.matches('.color-list .dots') ||
        (!e.target.closest('.color-list') &&
          colorListElement.classList.contains('active'))
      ) {
        colorListElement.classList.toggle('active')
      }
    })
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
