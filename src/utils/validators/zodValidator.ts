import { ZodTypeAny } from 'zod';

const zodValidator = (zod: ZodTypeAny) => {
  return {
    validate: {
      [zod._def.typeName]: (value: any) => {
        const _result = zod.safeParse(value);

        if (_result.success) {
          return undefined;
        }

        return _result.error.issues[0].message;
      },
    },
  };
};

export default zodValidator;
