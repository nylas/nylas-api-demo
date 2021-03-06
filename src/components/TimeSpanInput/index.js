// @flow
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { STYLES } from 'appConstants';

const { BORDERS, COLORS } = STYLES;

const styleSheet = StyleSheet.create({
  TimeSpanInput: {
    ':focus': {
      outline: 'none',
      border: `solid 1px ${COLORS.BLUE_80}`,
      boxShadow: `0 0 3px 0 ${COLORS.BLUE_60}`,
    },
    fontSize: '14px',
    borderRadius: '3px',
    border: BORDERS.LIGHT,
    padding: '12px',
  },
});

export type Props = {
  id?: string,
  name?: string,
  title?: string,
  type?: 'datetime-local'|'date',
  disabled?: boolean,
  autoFocus?: boolean,
  placeholder?: string,
  value?: string | number,
  defaultValue?: any,
  'aria-label'?: string,
  styles?: StyleSheetProp,
  inputRef?: any,
  icon?: {
    src: string,
    size: number,
  },
};

export default function TimeSpanInput({
  icon,
  styles,
  inputRef,
  type = 'text',
  ...props
}: Props) {
  let iconStyleSheet;
  if (icon) {
    iconStyleSheet = StyleSheet.create({
      TextInput: {
        paddingLeft: 2 * icon.size,
        background: `url(${icon.src}) no-repeat left`,
        backgroundPositionX: icon.size / 2,
      },
    });
  }
  return (
    <input
      {...props}
      type={type}
      ref={inputRef}
      className={css(
        styleSheet.TimeSpanInput,
        iconStyleSheet && iconStyleSheet.TextInput,
        styles
      )}
    />
  );
}
