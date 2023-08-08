import React from 'react';
import {
  Grid,
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  TextField,
} from '@mui/material';
import { Controller, FieldValues, UseControllerProps, useFormContext } from 'react-hook-form';
import Indicator from 'components/indicator/indicator';

type AutocompleteOption =
  | {
      label: string;
      value: number;
    }
  | string;

type AutocompleteProps<T = any> = Omit<UseControllerProps, 'control'> &
  Omit<
    MuiAutocompleteProps<T, any, any, any>,
    'renderInput' | 'size' | 'onInputChange' | 'options'| 'onChange'
  > & {
    label?: string;
    options: AutocompleteOption[];
    onChange?(option: any | null): void;
    onInputChange?(value: string, values: FieldValues): void;
  };

const Autocomplete = ({
  name,
  rules,
  label,
  options,
  placeholder,
  onChange,
  onInputChange,
  ...rest
}: AutocompleteProps) => {
  const useForm = useFormContext();

  const error = useForm.formState.errors[name];

  return (
    <Controller
      name={name}
      control={useForm.control}
      rules={rules}
      render={({ field }) => (
        <Grid container display='flex' flexDirection='column'>
          <Grid item>
            <MuiAutocomplete
              options={options}
              onChange={(_, value) => {
                field.onChange(value);
                onChange?.(value);
              }}
              onInputChange={(_, value, reason) => {
                if (reason === 'input') {
                  field.onChange(value);
                  onInputChange?.(value, useForm.getValues());
                }
              }}
              {...rest}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={placeholder}
                  error={Boolean(error)}
                  label={label}
                />
              )}
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

export default Autocomplete;
