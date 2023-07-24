import { useState } from 'react';
import { Grid, MenuItem, Select as MuiSelect, SelectProps as SProps } from '@mui/material';
import { Controller, ControllerProps, FieldValues, useFormContext } from 'react-hook-form';
import Indicator from 'components/indicator/indicator';
import { useTheme } from '@emotion/react';

export type SelectOption = { label: string; value: number };

type SelectProps = Omit<SProps, 'onChange'> &
  Omit<ControllerProps, 'render' | 'control'> & {
    onChange?: (value: any, values: FieldValues) => void;
    options: SelectOption[];
  };

const Select = ({
  name,
  rules,
  defaultValue,
  placeholder,
  label,
  options,
  onChange: onChangeProp,
  ...rest
}: SelectProps) => {
  const [openSelect, setOpenSelect] = useState(false);
  const { palette } = useTheme();

  const useForm = useFormContext();
  const error = useForm.formState.errors[name];

  return (
    <Controller
      name={name}
      control={useForm.control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { value, ref, onChange } }) => (
        <Grid container display='flex' flexDirection='column'>
          <Grid item>
            <MuiSelect
              fullWidth
              key={name}
              label={label}
              open={openSelect}
              onOpen={() => setOpenSelect(true)}
              onClose={() => setOpenSelect(false)}
              autoComplete='off'
              variant='outlined'
              value={value}
              displayEmpty={Boolean(placeholder)}
              error={Boolean(error)}
              inputRef={ref}
              onChange={(e) => {
                onChange(e.target.value);
                onChangeProp?.(e.target.value, useForm.getValues());
              }}
              renderValue={(value) => {
                if (value?.label) {
                  return value.label;
                } else if (placeholder) {
                  return <p style={{ color: palette.grey[600] }}>{placeholder}</p>;
                }
              }}
              {...rest}
            >
              {placeholder && (
                <MenuItem disabled value=''>
                  <p style={{ color: palette.grey[700] }}>{placeholder}</p>
                </MenuItem>
              )}
              {options?.map((option, key) => (
                <MenuItem key={key} value={option as any}>
                  {option.label}
                </MenuItem>
              ))}
            </MuiSelect>
          </Grid>
          <Grid item>{error && <Indicator severity='error'>{error?.message as string}</Indicator>}</Grid>
        </Grid>
      )}
    />
  );
};

export default Select;
