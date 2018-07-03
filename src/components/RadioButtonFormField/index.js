// @flow
import React from 'react';
import FormField from 'components/FormField';
import RadioButton from 'components/RadioButton';


export default function RadioButtonFormField({
  labelPlacement,
  labelStyles,
  inputStyles,
  ...props
}: Props) {
  return (
    <FormField
      {...props}
      labelPlacement={labelPlacement}
      labelStyles={labelStyles}
      flexDirection="row"
      inputRenderer={inputProps =>
        <RadioButton {...props} {...inputProps} styles={inputStyles} />}
    />
  );
}
