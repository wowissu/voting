import { basePath } from '@/../config'

export function resolveUrl(path: string) {
  return `${basePath}${path}`
}