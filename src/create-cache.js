module.exports = createCache

function createCache () {
  let cachedEl

  return function (el) {
    if (!cachedEl) {
      console.log('creating real el')
      cachedEl = el
      return cachedEl
    } else {
      console.log('returning proxy el')
      const proxy = createProxy(cachedEl)
      return proxy
    }
  }
}

function createProxy (realEl) {
  const proxy = document.createElement('div')

  proxy.isSameNode = function (fromNode) {
    return fromNode.isSameNode(realEl)
  }

  return proxy
}
