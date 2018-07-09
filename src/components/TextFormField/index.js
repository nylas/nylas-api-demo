// @flow
import React from 'react';
import FormField from 'components/FormField';
import TextInput from 'components/TextInput';
import type { BaseProps as FormFieldProps } from 'components/FormField';
import type { Props as TextInputProps } from 'components/TextInput';

export type Props = FormFieldProps &
  TextInputProps & {
    inputStyles?: StyleSheetProp,
  };

export default function TextFormField({
  flexDirection,
  labelPlacement,
  labelStyles,
  type = 'text',
  inputStyles,
  ...props
}: Props) {
  return (
    <FormField
      {...props}
      flexDirection={flexDirection}
      labelPlacement={labelPlacement}
      labelStyles={labelStyles}
      inputRenderer={inputProps =>
        <TextInput
          {...props}
          {...inputProps}
          type={type}
          styles={inputStyles}
        />}
    />
  );
}
