const choo = require('choo')
const html = require('choo/html')

const Map = require('./map')

const app = choo()
const mapInstance = Map()

app.model({
  state: {
    title: 'Hello, world',
    coords: [39.9526, -75.1652]
  },
  reducers: {
    setCoords: (state, data) => {
      return { coords: data }
    },
    updateTitle: (state, data) => {
      return { title: data }
    }
  }
})

const View = (state, prev, send) => {
  return html`
    <main>
      <h1>${state.title}</h1>
      <div><input value=${state.title} oninput=${updateTitle}/></div>
      <button onclick=${toPhiladelphia}>Philadelphia</button>
      <button onclick=${toSeattle}>Seattle</button>
      ${mapInstance(state.coords)}
    </main>
  `
  function updateTitle (evt) {
    send('updateTitle', evt.target.value)
  }
  function toPhiladelphia () {
    send('setCoords', [39.9526, -75.1652])
  }
  function toSeattle () {
    send('setCoords', [47.6062, -122.3321])
  }
}

app.router([
  ['/', View]
])

const tree = app.start()
document.body.appendChild(tree)
