import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import prettierPlugin from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default tseslint.config({
  extends: [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    ...compat.extends('@rocketseat/eslint-config/next'),
    ...compat.extends('prettier'),
  ],
  plugins: {
    'react-hooks': reactHooks,
    'simple-import-sort': simpleImportSort,
    prettier: prettierPlugin,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'prettier/prettier': 'error',
  },
})
