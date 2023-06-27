import http from 'node:http'
import { routes } from './routes.js'

import { json } from './middlewares/json.js'
import { exctractQuery } from './utils/extract-query.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if(route) {
    const {groups = []} = url.match(route.path)
    const {query = '', ...params} = groups
    req.params = { ...params }
    req.query = query ? exctractQuery(query) : {}

    return route.handler(req, res)
  } 

  return res.writeHead(404).end()
})

server.listen(3333)