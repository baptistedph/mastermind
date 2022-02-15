export default class Dom {
  loadColorList(colors) {
    const colorsElement = document.querySelector('.color-list .colors')

    for (const color of colors) {
      const li = document.createElement('li')
      li.classList.add('color')
      li.style.backgroundColor = color
      li.draggable = true
      li.addEventListener('dragstart', () => {
        li.classList.add('dragging')
      })

      li.addEventListener('dragend', () => {
        li.classList.remove('dragging')
      })

      colorsElement.appendChild(li)
    }
  }

  loadEntries(length) {
    let colorsTry = []

    const colorsElement = document.querySelector('.entry .colors')
    const submitButton = document.querySelector('.add-try')

    for (let i = 0; i < length; i++) {
      let activeColor

      const li = document.createElement('li')
      li.classList.add('color')

      li.addEventListener('dragover', e => {
        e.preventDefault()
        const dragging = document.querySelector('.dragging')
        activeColor = dragging.style.backgroundColor
      })

      li.addEventListener('drop', () => {
        colorsTry[i] = activeColor
        li.style.backgroundColor = activeColor
      })

      colorsElement.appendChild(li)
    }

    submitButton.addEventListener('click', () => {
      console.log(colorsTry)
    })
  }

  loadTrials(trials) {
    const trialsElement = document.querySelector('.trials')

    let currentTrial = 1

    for (const trial of trials) {
      const li = document.createElement('li')
      li.classList.add('try')
      const span = document.createElement('span')
      span.innerText = currentTrial
      const ul = document.createElement('ul')
      ul.classList.add('colors')

      for (const color of trial) {
        const liColor = document.createElement('li')
        liColor.classList.add('color')
        liColor.style.backgroundColor = color
        ul.appendChild(liColor)
      }

      li.appendChild(span)
      li.appendChild(ul)
      trialsElement.appendChild(li)

      currentTrial++
    }
  }
}
