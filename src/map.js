const html = require('choo/html')
const L = require('leaflet')

const createCache = require('./create-cache')

module.exports = function initMap () {
  const cache = createCache()
  let cachedCoords
  let map

  return function Map (coords) {
    let currentCoords = coords
    const defaultZoom = 12

    if (coords && (!cachedCoords || !coordsMatch(coords, cachedCoords))) {
      cachedCoords = coords
      if (map) map.setView(coords)
    }

    return cache(html`
      <div style="height: 500px" onload=${onload} onunload=${onunload}></div>
    `)

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
  }
}

function coordsMatch (a, b) {
  return a[0] === b[0] && a[1] === b[1]
}
