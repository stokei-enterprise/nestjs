import { SetMetadata } from '@nestjs/common';
import { IProjectGuardConfig } from '@/auth/guards';

export const ProjectConfig = (config?: IProjectGuardConfig) =>
  SetMetadata('config', config);
