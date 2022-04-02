import { Linter } from '@nrwl/linter';
import { UnitTestRunner } from '../../utils/test-runners';

export interface GeneratorOptions {
  name: string;
  directory?: string;
  skipFormat?: boolean;
}

interface NormalizedOptions extends GeneratorOptions {
  appProjectRoot: string;
}
