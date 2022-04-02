import { formatFiles, getWorkspaceLayout, Tree } from '@nrwl/devkit'
import { join } from 'path'
import { addFiles, normalizeGenOptions } from '../utils'
import type { GeneratorOptions } from './schema'

export default async function (tree: Tree, options: GeneratorOptions) {
  const normalizedOptions = normalizeGenOptions(tree, getWorkspaceLayout(tree).libsDir, options)
  // const sourceRoot = normalizedOptions.projectRoot
  addFiles(tree, join(__dirname, 'files'), normalizedOptions)
  await formatFiles(tree)
}