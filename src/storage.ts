import { existsSync, promises as fs } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

export interface Storage {
  last_run_command?: string
}

let storage: Storage | undefined

const storage_path = resolve(fileURLToPath(import.meta.url), '../_storage.json')

export async function dump() {
  if (storage)
    await fs.writeFile(storage_path, JSON.stringify(storage), 'utf-8')
}

export async function load(fn?: (storage: Storage) => Promise<boolean> | boolean) {
  if (!storage) {
    storage = existsSync(storage_path)
      ? JSON.parse(await fs.readFile(storage_path, 'utf-8')) || {}
      : {}
  }

  if (fn) {
    if (await fn(storage!))
      await dump()
  }

  return storage!
}
