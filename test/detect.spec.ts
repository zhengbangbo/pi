import terminalLink from 'terminal-link'
import { describe, expect, test } from 'vitest'
import { detect, getlockPath } from '../src'
import { INSTALL_PAGE } from '../src/agents'

describe.skip('detect', () => {
  test('case-0-empty', async () => {
    const cwd = `${process.cwd()}/test/test-files/locks/case-0-empty`
    expect(await detect({ cwd })).toMatchInlineSnapshot('null')
  })
  test('case-1-only-pipenv', async () => {
    const cwd = `${process.cwd()}/test/test-files/locks/case-1-only-pipenv`
    expect(await detect({ cwd })).toMatchInlineSnapshot('"pipenv"')
  })
  test('case-2-only-poetry', async () => {
    const cwd = `${process.cwd()}/test/test-files/locks/case-2-only-poetry`
    expect(await detect({ cwd })).toMatchInlineSnapshot('null')
  })
  test('case-3-full', async () => {
    const cwd = `${process.cwd()}/test/test-files/locks/case-3-full`
    expect(await detect({ cwd })).toMatchInlineSnapshot('"pipenv"')
  })
})

test.skip('findup', async () => {
  const cwd = `${process.cwd()}/test/test-files/locks/case-1-only-pipenv`
  expect(await getlockPath(cwd)).toMatchInlineSnapshot('"/Users/zbb/i/pi/test/test-files/locks/case-1-only-pipenv/Pipfile.lock"')
})

test('terminal link', () => {
  expect(terminalLink('pipenv', INSTALL_PAGE.pipenv)).toMatchInlineSnapshot('"pipenv (​https://pipenv.pypa.io/en/latest/​)"')
})

