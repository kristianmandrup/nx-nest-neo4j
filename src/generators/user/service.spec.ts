import type { Tree } from '@nrwl/devkit';
import { createTreeWithNestApplication } from '../utils/testing';
import type { UserGeneratorOptions } from './service';
import { userGenerator } from './service';

describe('user generator', () => {
  let tree: Tree;
  const project = 'api';
  const options: UserGeneratorOptions = {
    name: 'test',
    project,
    unitTestRunner: 'jest',
  };

  beforeEach(() => {
    tree = createTreeWithNestApplication(project);
    jest.clearAllMocks();
  });

  it('should run successfully', async () => {
    await expect(userGenerator(tree, options)).resolves.not.toThrowError();
  });
});
