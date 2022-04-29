import { NotFoundException } from '@nestjs/common';

export class DateNotFoundException extends NotFoundException {
  constructor() {
    super('dateNotFound');
  }
}
