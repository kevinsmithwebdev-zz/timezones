const routeNames = [
  'data',
  'api'
]

const routes = routeNames.map(name => ({
    path: `/${name}`,
    router: require(`./${name}/${name}`)
  })
)

module.exports = routes
