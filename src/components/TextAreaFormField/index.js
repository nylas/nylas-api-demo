// @flow
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { STYLES } from 'appConstants';
import FormField, {
  type BaseProps as FormFieldProps,
} from 'components/FormField';
import type { Props as TextInputProps } from 'components/TextInput';

export type Props = FormFieldProps &
  TextInputProps & {
    inputStyles?: StyleSheetProp,
  };

const { BORDERS } = STYLES;

const styleSheet = StyleSheet.create({
  TextArea: {
    height: '100px',
    width: '100%',
    fontFamily: 'inherit',
    border: BORDERS.LIGHT,
    borderRadius: 4,
    fontSize: 14,
    padding: 10,
  },
});

export default function TextAreaFormField({
  flexDirection,
  labelPlacement,
  labelStyles,
  styles,
  type = 'text',
  inputRef,
  inputStyles,
  ...props
}: Props) {
  return (
    <FormField
      {...props}
      flexDirection={flexDirection}
      labelPlacement={labelPlacement}
      labelStyles={labelStyles}
      styles={styles}
      inputRenderer={({inputRef, styles, ...inputProps}) => {
        return <textarea {...inputProps} ref={inputRef} className={css(styleSheet.TextArea)} />}}
    />
  );
}
