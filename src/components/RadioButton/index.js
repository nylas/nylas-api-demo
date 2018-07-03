// @flow
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styleSheet = StyleSheet.create({
  RadioButton: {
    appearance: 'radio',
    width: '15px',
    height: '15px',
    marginRight: '10px',
  },
});

export type Props = {
  id?: string,
  name?: string,
  title?: string,
  type?: 'checkbox' | 'radio',
  disabled?: boolean,
  autoFocus?: boolean,
  checked?: boolean,
  defaultChecked?: boolean,
  onChange?: SyntheticInputEvent => void,
  'aria-label'?: string,
  styles?: StyleSheetProp,
  inputRef?: any,
};

export default function RadioButton({
  styles,
  type = 'radio',
  inputRef,
  ...props
}: Props) {
  const allStyles = [styleSheet.RadioButton, styles];
  return (
    <input {...props} ref={inputRef} type={type} className={css(allStyles)} />
  );
}
