import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PROJECT_ID_HEADER_NAME } from '../../../auth/constants';
import { ProjectIdNotFoundException } from '../../../errors';
import { ICurrentProject } from '../../../interfaces';

export interface IProjectGuardConfig {
  readonly isRequired: boolean;
}

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  getRequest(context: ExecutionContext) {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest();
    }
    return GqlExecutionContext.create(context).getContext().req;
  }

  async canActivate(context: ExecutionContext) {
    const request = this.getRequest(context);
    const config = this.reflector.get<IProjectGuardConfig>(
      'config',
      context.getHandler()
    );
    const projectId = request?.headers[PROJECT_ID_HEADER_NAME];
    if (config?.isRequired && !projectId) {
      throw new ProjectIdNotFoundException();
    }
    const project: ICurrentProject = {
      id: projectId
    };
    request.project = project;
    return true;
  }
}
