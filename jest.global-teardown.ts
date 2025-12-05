import { Config } from '@jest/types';

// https://jestjs.io/docs/configuration#globalteardown-string
export default async function globalTeardown(
  globalConfig: Config.GlobalConfig,
  projectConfig: Config.ProjectConfig,
) {}
