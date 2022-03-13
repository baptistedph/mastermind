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
    this.dom.handleTheme()
    const submitButton = document.querySelector('.add-try-button')
    const refreshButton = document.querySelector('.refresh-button')
    let restartButton = document.querySelector('.restart-button')

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

  init() {
    this.combinationToFind = this.generateCombination(this.colors, this.length)

    this.handleDom()
  }

  try(colors) {
    this.trials++
    this.dom.updaterRemainingTrials(this.maxTrials - this.trials)

    const userColors = [...colors]
    const randomColors = [...this.combinationToFind]

    const wellPlaced = []
    const wrongPlaced = []

    let i = 0
    while (i < randomColors.length) {
      if (randomColors[i] === userColors[i]) {
        wellPlaced.push(userColors[i])
        userColors.splice(i, 1)
        randomColors.splice(i, 1)
      } else {
        i++
      }
    }

    i = 0
    while (i < userColors.length) {
      const colorIndex = randomColors.indexOf(userColors[i])
      if (colorIndex > -1) {
        wrongPlaced.push(userColors[i])
        userColors.splice(i, 1)
        randomColors.splice(i, 1)
      } else {
        i++
      }
    }

    this.dom.addTry(this.trials, colors, {
      wellPlaced: wellPlaced.length,
      wrongPlaced: wrongPlaced.length,
      won: wellPlaced.length === this.length,
    })

    return { won: wellPlaced.length === this.length }
  }
}
