const choo = require('choo')
const html = require('choo/html')

const Map = require('./map')

const app = choo()

app.model({
  state: {
    title: 'Hello, world',
    coords: [39.9526, -75.1652]
  },
  reducers: {
    setCoords: (data, state) => {
      return { coords: data }
    },
    updateTitle: (data, state) => {
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
      ${Map(state.coords)}
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

app.router((route) => [
  route('/', View)
])

const tree = app.start()
document.body.appendChild(tree)
