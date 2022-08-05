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
      const data = TOML.parse(raw)
      return data
    }
    catch (e) {
      console.warn('Failed to parse pyproject.toml')
      process.exit(0)
    }
  }
}
