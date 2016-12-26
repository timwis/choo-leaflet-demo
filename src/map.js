const html = require('choo/html')
const widget = require('cache-element/widget')
const L = require('leaflet')

module.exports = () => {
  let map

  return widget({
    render: (coords) => {
      return html`
        <div>
          <div
            style="height: 500px"
            onload=${(el) => initMap(el, coords)}
            onunload${removeMap}></div>
        </div>
      `
    },
    onupdate: (el, coords) => {
      if (map) map.setView(coords)
    }
  })

  function initMap (el, coords) {
    const defaultZoom = 12
    map = L.map(el).setView(coords, defaultZoom)

    L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png'
    }).addTo(map)
  }

  function removeMap (el) {
    if (map) {
      map.remove()
      map = null
    }
  }
}


