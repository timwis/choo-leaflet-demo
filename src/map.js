const html = require('choo/html')
const widget = require('cache-element/widget')
const L = require('leaflet')

module.exports = widget((handleUpdates) => {
  let map
  let currentCoords
  const defaultZoom = 12

  // Called on construction & at every state update
  handleUpdates((newCoords) => {
    if (newCoords && (!currentCoords || !coordsMatch(newCoords, currentCoords))) {
      currentCoords = newCoords
      if (map) map.setView(newCoords)
    }
  })

  return html`
    <div>
      <div style="height: 500px" onload=${onload} onunload=${onunload}></div>
    </div>
  `

  function onload (el) {
    map = L.map(el).setView(currentCoords, defaultZoom)

    L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png'
    }).addTo(map)
  }

  function onunload (el) {
    if (map) {
      map.remove()
      map = null
    }
  }
})

function coordsMatch (a, b) {
  return a[0] === b[0] && a[1] === b[1]
}
