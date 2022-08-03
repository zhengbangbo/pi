import { execSync } from 'child_process'
import os from 'os'

export function exclude<T>(arr: T[], v: T) {
  const clone = [...arr]
  const index = clone.indexOf(v)
  if (index >= 0)
    clone.splice(index, 1)

  return clone
}

export function remove<T>(arr: T[], v: T) {
  const index = arr.indexOf(v)
  if (index >= 0)
    arr.splice(index, 1)

  return arr
}

export function cmdExists(cmd: string) {
  try {
    execSync(
      os.platform() === 'win32'
        ? `cmd /c "(help ${cmd} > nul || exit 0) && where ${cmd} > nul 2> nul"`
        : `command -v ${cmd}`,
    )
    return true
  }
  catch {
    return false
  }
}
