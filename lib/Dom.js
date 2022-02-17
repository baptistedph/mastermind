export default class Dom {
  constructor() {
    this.colorsTry = []
    this.previousCombinationToFind = null
  }

  loadGameOver(combinationToFind) {
    const submitButton = document.querySelector('.add-try-button')
    const boardElement = document.querySelector('.board')
    const restartContentElement = document.querySelector('.restart-content')
    const titleElements = restartContentElement.querySelectorAll('h3')
    const colorsElements = restartContentElement.querySelectorAll('.colors')
    const restartButton = restartContentElement.querySelector('.restart-button')

    if (this.previousCombinationToFind !== combinationToFind) {
      if (this.previousCombinationToFind) {
        for (const title of titleElements) {
          title.remove()
        }

        for (const colors of colorsElements) {
          colors.remove()
        }
      }

      const ulColors = document.createElement('ul')
      ulColors.classList.add('colors')

      for (const color of combinationToFind) {
        const liColor = document.createElement('li')
        liColor.classList.add('color')
        liColor.style.backgroundColor = color

        ulColors.appendChild(liColor)
      }

      const h3Title = document.createElement('h3')
      h3Title.innerText = 'La combinaison à trouver était :'

      restartContentElement.insertBefore(h3Title, restartButton)
      restartContentElement.insertBefore(ulColors, restartButton)

      submitButton.disabled = true
      boardElement.classList.add('restart')
    }

    this.previousCombinationToFind = combinationToFind
  }

  loadWin() {
    const submitButton = document.querySelector('.add-try-button')
    const boardElement = document.querySelector('.board')
    const restartContentElement = document.querySelector('.restart-content')
    const restartButton = restartContentElement.querySelector('.restart-button')
    const h3Element = restartContentElement.querySelector('h3')

    if (h3Element) {
      h3Element.remove()
    }

    const h3Title = document.createElement('h3')
    h3Title.innerText = 'Bravo, vous avez gagné !'

    restartContentElement.insertBefore(h3Title, restartButton)

    submitButton.disabled = true
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

    let i = 1

    for (const color of colors) {
      const liColor = document.createElement('li')
      liColor.draggable = true
      liColor.classList.add('color')

      const labelColor = document.createElement('label')
      labelColor.htmlFor = `color-${i}`
      labelColor.style.backgroundColor = color

      const inputColor = document.createElement('input')
      inputColor.type = 'color'
      inputColor.id = `color-${i}`

      liColor.appendChild(labelColor)
      liColor.appendChild(inputColor)

      liColor.addEventListener('dragstart', () => {
        liColor.classList.add('dragging')
      })

      liColor.addEventListener('dragend', () => {
        liColor.classList.remove('dragging')
      })

      colorsElement.appendChild(liColor)
      i++
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
        const labelElement = dragging.querySelector('label')

        activeColor = labelElement.style.backgroundColor
        liColor.style.borderColor = labelElement.style.backgroundColor
        liColor.classList.add('dragover')
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

  addTry(id, colors, { wellPlaced, wrongPlaced }) {
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
