import { SetMetadata } from '@nestjs/common';
import { IProjectGuardConfig } from '../guards';

export const ProjectConfig = (config?: IProjectGuardConfig) =>
  SetMetadata('config', config);
