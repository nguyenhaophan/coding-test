import { readFileSync } from 'fs'
import { join } from 'path'

export default function config() {
  const path = join(process.cwd(), './data/db.json')

  const configData = JSON.parse(readFileSync(path, 'utf8').toString())
  return { configData }
}
