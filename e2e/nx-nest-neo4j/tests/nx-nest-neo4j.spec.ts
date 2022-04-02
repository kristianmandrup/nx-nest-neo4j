import {
  checkFilesExist,
  ensureNxProject,
  readFile,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing'

describe('application e2e', () => {
  it('should create application', async () => {
    const appName = uniq('app')
    const libName = uniq('lib')
    ensureNxProject('@nx-go/nx-go', 'dist/packages/nx-go')
    await runNxCommandAsync(`generate @nx-go/nx-go:application ${appName}`)

    // main.ts file exists
    const appDir = `apps/${appName}`
    const files = {
      main: `${appDir}/main.ts`,
      generateTypings: `${appDir}/generate-typings.ts`
    }
    expect(() => checkFilesExist(files.main)).not.toThrow()
    expect(() => checkFilesExist(files.generateTypings)).not.toThrow()
    expect(readFile(files.generateTypings)).toContain('GraphQLDefinitionsFactory')
  })

  describe('--directory', () => {
    it('should create main.ys in the specified directory', async () => {
      const plugin = uniq('nx-nest-neo4j')
      ensureNxProject('nx-nest-neo4j', 'dist/packages/nx-nest-neo4j')
      await runNxCommandAsync(`generate nx-nest-neo4j:application ${plugin} --directory subdir`)
      expect(() => checkFilesExist(`apps/subdir/${plugin}/main.ts`)).not.toThrow()
    })
  })

  describe('--tags', () => {
    it('should add tags to nx.json', async () => {
      const plugin = uniq('nx-nest-neo4j')
      ensureNxProject('nx-nest-neo4j', 'dist/packages/nx-nest-neo4j')
      await runNxCommandAsync(`generate nx-nest-neo4j:application ${plugin} --tags e2etag,e2ePackage`)
      const projectJson = readJson(`apps/${plugin}/project.json`)
      expect(projectJson.tags).toEqual(['e2etag', 'e2ePackage'])
    })
  })
})

