import Dom from './Dom'
import { hexToRGB } from './utils/hexToRGB'

export default class Mastermind {
  constructor() {
    this.colors = [
      'rgb(162, 205, 205)',
      'rgb(198, 213, 126)',
      'rgb(255, 225, 175)',
      'rgb(213, 126, 126)',
      'rgb(242, 181, 212)',
    ]
    this.length = 4
    this.combinationToFind = null
    this.trials = 0
    this.maxTrials = 10
    this.dom = new Dom()
  }

  generateCombination(colors, length) {
    return Array.from(
      { length },
      () => colors[Math.floor(Math.random() * colors.length)],
    )
  }

  handleDom() {
    this.dom.loadColorList(this.colors)
    this.dom.loadEntries(this.length)
    this.dom.updaterRemainingTrials(this.maxTrials - this.trials)
    const submitButton = document.querySelector('.add-try-button')
    const refreshButton = document.querySelector('.refresh-button')
    const inputColorElements = document.querySelectorAll('.color-list input')
    const restartButton = document.querySelector('.restart-button')

    for (const input of inputColorElements) {
      input.addEventListener('input', e => {
        const id = e.target.id.split('-')[1] - 1
        const labelElement = e.target.previousElementSibling
        const color = e.target.value
        labelElement.style.backgroundColor = color

        this.colors[id] = hexToRGB(color)
        this.setColors(this.colors)
        this.combinationToFind = this.generateCombination(
          this.colors,
          this.length,
        )
        console.log(this.combinationToFind)
      })
    }

    submitButton.addEventListener('click', () => {
      if (this.dom.colorsTry.filter(Boolean).length === this.length) {
        this.dom.updateError(null)
        if (this.trials < this.maxTrials) {
          const { won } = this.try(this.dom.colorsTry)
          this.dom.colorsTry = []

          if (won) {
            this.dom.loadWin()
          } else if (this.trials === this.maxTrials) {
            restartButton = this.dom.loadGameOver(this.combinationToFind)
          }
        }
      } else {
        this.dom.updateError(`Vous devez renseigner ${this.length} couleurs.`)
      }
    })

    refreshButton.addEventListener('click', () => {
      this.dom.loadGameOver(this.combinationToFind)
    })

    restartButton.addEventListener('click', () => {
      this.restart()
    })
  }

  restart() {
    this.combinationToFind = this.generateCombination(this.colors, this.length)
    this.trials = 0
    this.dom.updaterRemainingTrials(this.maxTrials - this.trials)
    this.dom.reload()
    this.dom.updateError(null)
  }

  setColors(colors) {
    window.localStorage.setItem('mastermind-colors', JSON.stringify(colors))
  }

  init() {
    const theme = window.localStorage.getItem('mastermind-colors')

    if (theme) {
      this.colors = JSON.parse(theme)
    } else {
      this.setColors(this.colors)
    }

    this.setColors(this.colors)
    this.combinationToFind = this.generateCombination(this.colors, this.length)
    console.log(this.combinationToFind)

    this.handleDom()
  }

  try(colors) {
    this.trials++
    this.dom.updaterRemainingTrials(this.maxTrials - this.trials)

    const wellPlaced = []
    let wrongPlaced = []

    let i = 0

    for (const color of colors) {
      if (color === this.combinationToFind[i]) {
        wellPlaced.push(color)
        wrongPlaced = wrongPlaced.filter(item => item !== color)
      } else if (this.combinationToFind.includes(color)) {
        wrongPlaced.push(color)
      }
      i++
    }

    this.dom.addTry(this.trials, colors, {
      wellPlaced: wellPlaced.length,
      wrongPlaced: wrongPlaced.length,
      won: wellPlaced.length === this.length,
    })

    return { won: wellPlaced.length === this.length }
  }
}
