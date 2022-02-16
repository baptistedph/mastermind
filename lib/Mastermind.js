import Dom from './Dom'

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
    this.maxTrials = 1
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
    const restartButton = document.querySelector('.restart-button')
    const refreshButton = document.querySelector('.refresh-button')

    submitButton.addEventListener('click', () => {
      if (this.dom.colorsTry.filter(Boolean).length === this.length) {
        this.dom.updateError(null)
        if (this.trials < this.maxTrials) {
          const { won } = this.try(this.dom.colorsTry)
          this.dom.colorsTry = []

          if (won) {
            this.dom.loadWin()
          } else if (this.trials === this.maxTrials) {
            this.dom.loadGameOver(this.combinationToFind)
          }
        }
      } else {
        this.dom.updateError(`Vous devez renseigner ${this.length} couleurs.`)
      }
    })

    restartButton.addEventListener('click', () => {
      this.restart()
    })

    refreshButton.addEventListener('click', () => {
      this.restart()
    })
  }

  restart() {
    this.combinationToFind = this.generateCombination(this.colors, this.length)
    this.trials = 0
    this.dom.updaterRemainingTrials(this.maxTrials - this.trials)
    this.dom.reload()
  }

  init() {
    this.combinationToFind = this.generateCombination(this.colors, this.length)
    console.log(this.combinationToFind)

    this.handleDom()
  }

  try(colors) {
    this.trials++
    this.dom.updaterRemainingTrials(this.maxTrials - this.trials)

    let wellPlaced = 0
    let wrongPlaced = 0

    let i = 0

    for (const color of colors) {
      if (color === this.combinationToFind[i]) {
        wellPlaced++
      } else if (this.combinationToFind.includes(color)) {
        wrongPlaced++
      }

      i++
    }

    this.dom.addTry(this.trials, colors, {
      wellPlaced,
      wrongPlaced,
      won: wellPlaced === this.length,
    })

    return { won: wellPlaced === this.length }
  }
}
