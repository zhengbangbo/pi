import { expect, test } from 'vitest'
import { getProjectToml } from '../src/fs'

test('get project toml', () => {
  const cwd = `${process.cwd()}/test/test-files`

  expect(getProjectToml(cwd)).toMatchInlineSnapshot(`
    {
      "build-system": {
        "build-backend": "poetry.masonry.api",
        "requires": [
          "poetry>=1.0.0",
        ],
      },
      "tool": {
        "poetry": {
          "authors": [
            "Bang-Bo Zheng <zhengbangbo@hotmail.com>",
          ],
          "classifiers": [
            "Development Status :: 5 - Production/Stable",
            "Topic :: Software Development :: Testing",
            "Topic :: Software Development :: Quality Assurance",
            "Topic :: Software Development :: Libraries :: Python Modules",
            "Operating System :: MacOS",
            "Operating System :: POSIX :: Linux",
            "Operating System :: Microsoft :: Windows",
            "Programming Language :: Python :: 3.7",
            "Programming Language :: Python :: 3.8",
            "Programming Language :: Python :: 3.9",
            "Programming Language :: Python :: 3.10",
          ],
          "dependencies": {
            "pymysql": {
              "optional": true,
              "version": "^1.0.2",
            },
            "pytest": "^7.1.1",
            "python": "^3.7",
            "requests": "^2.22.0",
            "sqlalchemy": {
              "optional": true,
              "version": "^1.4.36",
            },
            "toml": "^0.10.2",
          },
          "description": "One-stop solution for HTTP(S) testing.",
          "dev-dependencies": {
            "coverage": "^4.5.4",
          },
          "documentation": "https://github.com/zhengbangbo/pi",
          "extras": {},
          "homepage": "https://github.com/zhengbangbo/pi",
          "include": [
            "docs/CHANGELOG.md",
          ],
          "keywords": [
            "python",
          ],
          "license": "MIT",
          "name": "test",
          "readme": "README.md",
          "repository": "https://github.com/zhengbangbo/pi",
          "scripts": {
            "run": "src.main:main",
          },
          "source": [
            {
              "name": "tsinghua",
              "url": "https://pypi.tuna.tsinghua.edu.cn/simple/",
            },
          ],
          "version": "v4.2.0",
        },
      },
    }
  `)
})

