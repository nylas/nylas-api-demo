// @flow
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

export type FlexItemProps = {
  order?: number,
  grow?: number,
  shrink?: number,
  basis?: string,
  flex?: string,
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline',
  styles?: StyleSheetProp,
};

export function FlexItem({
  order,
  grow = 1,
  shrink = 1,
  basis = 'auto',
  flex,
  alignSelf,
  styles,
  ...props
}: FlexItemProps) {
  const styleObj: Object = {};
  if (order) {
    styleObj.order = order;
  }
  if (alignSelf) {
    styleObj.alignSelf = alignSelf;
  }

  if (flex) {
    styleObj.flex = flex;
  } else {
    styleObj.flexGrow = grow;
    styleObj.flexShrink = shrink;
    styleObj.flexBasis = basis;
  }
  const sheet = StyleSheet.create({
    FlexItem: styleObj,
  });
  const sheets = [sheet.FlexItem, styles];
  return <div {...props} className={css(sheets)} />;
}

export type FlexboxProps = {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse',
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around',
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline',
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around',
  flexItem?: FlexItemProps,
  styles?: StyleSheetProp,
};

export default function Flexbox({
  direction = 'row',
  wrap = 'nowrap',
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  alignContent = 'stretch',
  flexItem,
  styles,
  ...props
}: FlexboxProps) {
  const sheet = StyleSheet.create({
    Flexbox: {
      display: 'flex',
      flexDirection: direction,
      flexWrap: wrap,
      justifyContent: justifyContent,
      alignItems: alignItems,
      alignContent: alignContent,
      // Set minWidth to 0 to allow ellpsis overflow on nested flexboxes. See
      // https://stackoverflow.com/questions/39838908/text-overflow-ellipsis-not-working-in-nested-flexbox
      minWidth: 0,
    },
  });
  const sheets = [sheet.Flexbox, styles];
  if (flexItem) {
    return <FlexItem {...props} {...flexItem} styles={sheets} />;
  }
  return <div {...props} className={css(sheets)} />;
}
