type RouteTypes = 'users'

type UrlType = 'all' | 'login' | 'register' | 'delete'

type IdType = string

export function request(route: RouteTypes, type: UrlType, id: IdType = '') {
  return `${route}/${type}/${id}`
}
