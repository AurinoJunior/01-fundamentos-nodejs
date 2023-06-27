export function exctractQuery (queryString) {
  return queryString.substring(1).split('&').reduce((queryParameters, query) => {
    const [key, value] = query.split('=')
    queryParameters[key] = value
    return queryParameters
  }, {})
} 