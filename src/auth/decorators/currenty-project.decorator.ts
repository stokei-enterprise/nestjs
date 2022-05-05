import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ICurrentProject } from '../../interfaces';

export const CurrentProject = createParamDecorator(
  (data: keyof ICurrentProject, context: ExecutionContext) => {
    const request =
      context.getType() === 'http'
        ? context.switchToHttp().getRequest()
        : GqlExecutionContext.create(context).getContext().req;
    if (data) {
      return request.project && request.project[data];
    }
    return request.project;
  }
);
