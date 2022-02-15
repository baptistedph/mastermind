import Mastermind from './lib/Mastermind'

const mm = new Mastermind()
mm.init()
mm.loadDom()

const { wellPlaced, wrongPlaced, won } = mm.try([
  'red',
  'blue',
  'orange',
  'green',
])
