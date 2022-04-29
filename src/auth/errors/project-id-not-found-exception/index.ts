import { NotFoundException } from '@nestjs/common';

export class ProjectIdNotFoundException extends NotFoundException {
  constructor() {
    super('projectIdNotFound');
  }
}
