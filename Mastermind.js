export default class Mastermind {
  constructor() {
    this.colors = ['red', 'green', 'blue', 'orange', 'yellow', 'purple']
    this.length = 4
    this.combinationToFind = null
    this.trials = 0
  }

  generateCombination(colors, length) {
    return Array.from(
      { length },
      () => colors[Math.floor(Math.random() * colors.length)],
    )
  }

  init() {
    this.combinationToFind = this.generateCombination(this.colors, this.length)

    return this.combinationToFind
  }

  try(colors) {
    this.try++

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
