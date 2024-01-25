import { Injectable } from '@nestjs/common';

import { UnknownZodObjectSchema, ZodConfigType } from './types';
import { ZodConfigStatic } from './zod-config-static';

/**
 * Method that helps consumers to create a `ZodConfigStatic` in a structured way.
 *
 * Also "forces" the service to carry the schema as a static property so we can
 * access it later when we want to help consumers to instantiate the class outside
 * the NestJS context.
 *
 * TODO: try to make methods asynchronous
 *
 * @param schema
 */
export const ZodConfig = <Schema extends UnknownZodObjectSchema>(
  schema: Schema,
): ZodConfigType<Schema> => {
  @Injectable()
  class ZodConfig extends ZodConfigStatic<Schema> {
    public static readonly schema = schema;

    constructor() {
      super(schema);
    }
  }

  return ZodConfig;
};
