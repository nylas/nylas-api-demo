// @flow
import React from 'react';
import { StyleSheet } from 'aphrodite/no-important';
import Flexbox, { type FlexboxProps } from 'components/Flexbox';

const styleSheet = StyleSheet.create({
  Header: {
    fontWeight: '200',
    marginBottom: '15px',
  },
  LargeHeader: {
    fontSize: '36px',
    lineHeight: '36px',
  },
  MediumHeader: {
    fontSize: '25px',
    fontWeight: '400',
    marginBottom: 8,
  },
  SmallHeader: {
    fontSize: '20px',
    fontWeight: '400',
    marginTop: '20px',
    marginBottom: '5px',
  },
});

type Props = FlexboxProps & {
  small?: boolean,
  medium?: boolean,
  children: React.Children,
  styles?: StyleSheetProp,
};

export default function Header(props: Props) {
  const { small, medium, children, styles, ...flexboxProps } = props;
  let sizeStyleSheet = styleSheet.LargeHeader;
  if (medium) {
    sizeStyleSheet = styleSheet.MediumHeader;
  }
  if (small) {
    sizeStyleSheet = styleSheet.SmallHeader;
  }
  return (
    <Flexbox
      styles={[styleSheet.Header, sizeStyleSheet, styles]}
      {...flexboxProps}
    >
      {children}
    </Flexbox>
  );
}
