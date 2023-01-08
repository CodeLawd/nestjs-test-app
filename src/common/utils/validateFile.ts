import { FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';

export const fileValidators = [
  new MaxFileSizeValidator({ maxSize: 200000 }),
  new FileTypeValidator({ fileType: 'image/*' }),
];

export const imageValidators = [
  new MaxFileSizeValidator({ maxSize: 200000 }),
  new FileTypeValidator({ fileType: 'image/*' }),
];
