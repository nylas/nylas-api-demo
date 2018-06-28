// @flow
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styleSheet = StyleSheet.create({
  Icon: {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    display: 'inline-block',
    marginRight: '5px',
    flex: '0 0 auto',
  }
});

type Style = {
  width: any,
  height: any,
  backgroundColor?: string,
  backgroundImage?: string,
};

export type Props = {
  src?: ?string,
  size?: any,
  width?: any,
  height?: any,
  styles?: StyleSheetProp,
};

export default function Icon(props: Props) {
  const { size, width, height, src, styles, ...rest } = props;
  const style: Style = {
    width: width != null ? width : size,
    height: height != null ? height : size,
  };
  if (!style.width || !style.height) {
    throw new Error('Icon requires a `size` or a `width` and a `height`');
  }
  if (src) {
    style.backgroundImage = `url('${src}')`;
  }

  const allStyleSheets = [
    styleSheet.Icon,
    StyleSheet.create({ Dynamic: style }).Dynamic,
    styles,
  ];

  return <div {...rest} className={'icon ' + css(allStyleSheets)} />;
}
