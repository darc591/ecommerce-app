import { FieldValues, FormProvider, SubmitHandler, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';

type FormProps<TValues extends FieldValues> = UseFormProps & {
  children: ((methods: UseFormReturn<TValues>) => React.ReactNode) | React.ReactNode;
  onSubmit: SubmitHandler<TValues>;
};

const Form = ({ children, onSubmit, ...rest }: FormProps<any>) => {
  const methods = useForm({ ...rest });

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
        {typeof children === 'function' ? children(methods) : children}
      </form>
    </FormProvider>
  );
};

export default Form;
