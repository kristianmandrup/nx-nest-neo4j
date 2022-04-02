import type { Tree } from '@nrwl/devkit';
import { convertNxGenerator } from '@nrwl/devkit';
import type {
  NestGeneratorWithLanguageOption,
  NestGeneratorWithTestOption,
  NormalizedOptions,
} from '../utils';
import {
  normalizeOptions,
  runNestSchematic,
  unitTestRunnerToSpec,
} from '../utils';

export type UserGeneratorOptions = NestGeneratorWithLanguageOption &
  NestGeneratorWithTestOption;

export function userGenerator(
  tree: Tree,
  rawOptions: UserGeneratorOptions
): Promise<any> {
  const options = normalizeServiceOptions(tree, rawOptions);

  return runNestSchematic(tree, 'service', options);
}

export default userGenerator;

export const serviceSchematic = convertNxGenerator(userGenerator);

function normalizeServiceOptions(
  tree: Tree,
  options: UserGeneratorOptions
): NormalizedOptions {
  return {
    ...normalizeOptions(tree, options),
    language: options.language,
    spec: unitTestRunnerToSpec(options.unitTestRunner),
  };
}
