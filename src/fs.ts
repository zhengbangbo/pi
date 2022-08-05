import fs from 'fs'
import { resolve } from 'path'
import TOML from '@iarna/toml'

export function getProjectToml(cwd = process.cwd()) {
  // pipenv - Pipfile
  // potery - pyproject.toml
  const path = resolve(cwd, 'pyproject.toml')

  if (fs.existsSync(path)) {
    try {
      const raw = fs.readFileSync(path, 'utf-8')
      // If not use JSON methods, build throw "Property 'poetry' does not exist on type 'AnyJson'"
      const data = JSON.parse(JSON.stringify(TOML.parse(raw)))
      return data
    }
    catch (e) {
      console.warn('Failed to parse pyproject.toml')
      process.exit(0)
    }
  }
}
