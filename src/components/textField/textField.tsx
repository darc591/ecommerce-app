import { Controller, ControllerProps, FieldValues, useFormContext } from 'react-hook-form';
import { Grid, TextField as MuiTextField, TextFieldProps as TFProps } from '@mui/material';
import * as masks from 'utils/masks';
import Indicator from '../indicator/indicator';

type TextFieldProps = TFProps &
  Omit<ControllerProps, 'render' | 'control'> & {
    onInputChange?: (value: string, values: FieldValues) => void;
    mask?: 'currency';
  };

const TextField = ({
  name,
  label,
  required,
  variant = 'outlined',
  inputMode,
  onInputChange,
  rules,
  defaultValue,
  mask,
  shouldUnregister,
  ...rest
}: TextFieldProps) => {
  const useForm = useFormContext();
  const error = useForm.formState.errors[name];

  const handleFormat = (value: string) => {
    if (mask) {
      return masks?.[mask]?.format(value);
    } else {
      return value;
    }
  };

  const handleParse = (value: string) => {
    if (mask) {
      return masks?.[mask]?.parse(value);
    } else {
      return value;
    }
  };
  return (
    <Controller
      name={name}
      control={useForm.control}
      rules={rules}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      render={({ field: { value, ref, onChange } }) => (
        <Grid container display='flex' flexDirection='column'>
          <Grid item>
            <MuiTextField
              label={label}
              required={required}
              key={name}
              variant={variant}
              defaultValue={defaultValue}
              error={Boolean(error)}
              value={handleFormat(value || (value != 0 ? '' : value))}
              onChange={(e) => {
                const value = handleParse(e.target.value) as string;
                onChange(value);
                onInputChange?.(value, useForm.getValues());
              }}
              inputProps={{
                inputMode: inputMode,
                ...rest.inputProps,
              }}
              InputProps={{
                ref: ref,
                ...rest.InputProps,
              }}
              {...rest}
            />
          </Grid>
          <Grid item>
            {error && <Indicator severity='error'>{error?.message as string}</Indicator>}
          </Grid>
        </Grid>
      )}
    />
  );
};

export default TextField;
