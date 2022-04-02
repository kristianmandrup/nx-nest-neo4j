import { names, Tree, readJson } from '@nrwl/devkit'
import { ApplicationGeneratorOptions } from '../application/schema'
import { NormalizedSchema } from './normalized-schema.interface'

export function normalizeGenOptions(
  tree: Tree,
  projectBase: string,
  options: ApplicationGeneratorOptions,
): NormalizedSchema {
  const nxJson = readJson(tree, 'nx.json')
  const name = names(options.name).fileName
  const projectDirectory = options.directory ? `${names(options.directory).fileName}/${name}` : name
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-')
  const projectRoot = `${projectBase}/${projectDirectory}`
  const parsedTags = options.tags ? options.tags.split(',').map((s) => s.trim()) : []

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
    npmScope: nxJson.npmScope,
  }
}