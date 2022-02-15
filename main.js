import Mastermind from './Mastermind'

const mm = new Mastermind()
mm.init()

const { wellPlaced, wrongPlaced, won } = mm.try([
  'red',
  'blue',
  'orange',
  'green',
])

console.log(wellPlaced, wrongPlaced, won)
