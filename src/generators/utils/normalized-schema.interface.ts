import { ApplicationGeneratorOptions } from '../application/schema'

export interface NormalizedSchema extends ApplicationGeneratorOptions {
  npmScope?: boolean
  projectName: string
  projectRoot: string
  projectDirectory: string
  parsedTags: string[]
  skipGoMod?: boolean
}