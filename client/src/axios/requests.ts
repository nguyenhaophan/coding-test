type RouteTypes = 'users' | 'store'

type UrlType = 'all' | 'login' | 'register' | 'delete' | 'profile'

type IdType = string

export function request(route: RouteTypes, type: UrlType, id: IdType = '') {
  return `${route}/${type}/${id}`
}
