import Dom from './Dom'

export default class Mastermind {
  constructor() {
    this.colors = ['red', 'green', 'blue', 'orange', 'yellow', 'purple']
    this.length = 4
    this.combinationToFind = null
    this.trials = [
      ['red', 'green', 'blue', 'orange'],
      ['red', 'blue', 'green', 'purple'],
    ]
    this.dom = new Dom()
  }

  generateCombination(colors, length) {
    return Array.from(
      { length },
      () => colors[Math.floor(Math.random() * colors.length)],
    )
  }

  loadDom() {
    this.dom.loadColorList(this.colors)
    this.dom.loadEntries(this.length)
    this.dom.loadTrials(this.trials)
  }

  init() {
    this.combinationToFind = this.generateCombination(this.colors, this.length)

    return this.combinationToFind
  }

  try(colors) {
    this.trials.push(colors)

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

    return {
      wellPlaced,
      wrongPlaced,
      won: wellPlaced === this.length,
    }
  }
}
