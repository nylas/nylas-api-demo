import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { STYLES } from 'appConstants';

const { COLORS, BACKGROUND_COLORS } = STYLES;

const DefaultStyleSheet = StyleSheet.create({
  Button: {
    color: COLORS.NYLAS_BLACK_60,
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 500,
    backgroundColor: BACKGROUND_COLORS.MAIN,
    border: `2px solid ${COLORS.LIGHT_GRAY_80}`,
    lineHeight: '1em',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.04)',
    borderRadius: '4px',
    padding: '12px 30px',
    minHeight: '37px',
    cursor: 'pointer',
    ':hover': {
      boxShadow: `0 0 2px ${COLORS.LIGHT_GRAY_80} inset`,
    },
  },
  EmphasisButton: {
    color: 'white',
    backgroundColor: COLORS.BLUE,
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.04)',
    border: 'none',
  },
  DangerButton: {
    color: 'white',
    backgroundColor: COLORS.RED,
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.04)',
    border: 'none',
  },
  DisabledButton: {
    boxShadow: 'none',
    backgroundColor: COLORS.LIGHT_GRAY_80,
    cursor: 'default',
    ':hover': {
      boxShadow: 'none',
    },
    ':focus': {
      outline: 'none',
    },
  },
  SmallButton: {
    fontSize: 14,
    padding: '3px 7px',
  },
});

type Props = {
  children: any,
  styles?: StyleSheetProp,
  emphasis?: boolean,
  danger?: boolean,
  disabled?: boolean,
  small?: boolean,
};

export default function Button({
  children,
  styles,
  emphasis,
  danger,
  disabled,
  small,
  ...props
}: Props) {
  const allStyleSheets = [
    DefaultStyleSheet.Button,
    emphasis && DefaultStyleSheet.EmphasisButton,
    danger && DefaultStyleSheet.DangerButton,
    disabled && DefaultStyleSheet.DisabledButton,
    small && DefaultStyleSheet.SmallButton,
    styles,
  ];
  return (
    <button type="button" {...props} className={css(allStyleSheets)}>
      {children}
    </button>
  );
}
