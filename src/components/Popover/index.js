// @flow
import React from 'react';
import { StyleSheet, css } from 'modules/aphrodite-extended';
import { STYLES } from 'appConstants';
import BasePopover from 'react-popover';

const { BACKGROUND_COLORS, COLORS } = STYLES;

// Border matches STYLES.BORDERS.LIGHT and should be same for popover body and tip
const borderColor = COLORS.LIGHT_GRAY_80;
const borderWidth = 1;
const defaultTipSize = 10;

export type Placement =
  // Sides
  | 'above'
  | 'right'
  | 'below'
  | 'left'
  // Orientations
  | 'row'
  | 'column'
  // Orders
  | 'start'
  | 'end'
  // Automatic
  | null;

type Props = {
  children?: React.Children,
  width?: number | string,
  minWidth?: number,
  styles?: StyleSheetProp,
  // props from react-popover, see https://github.com/littlebits/react-popover
  isOpen: boolean,
  body?: React.Children,
  preferPlace?: Placement,
  place?: Placement,
  onOuterAction?: () => any,
  refreshIntervalMs?: ?number | ?boolean,
  enterExitTransitionDurationMs?: ?number,
  target?: React.Element<*>,
  tipSize?: number,
  tipEnabled?: boolean,
};

function _basePopoverProps(props: Props) {
  const {
    body,
    place,
    target,
    isOpen,
    styles,
    preferPlace,
    onOuterAction,
    width = 'auto',
    minWidth = 300,
    tipEnabled = true,
    tipSize = defaultTipSize,
    refreshIntervalMs = false,
    enterExitTransitionDurationMs = 0,
  } = props;

  const styleSheet = StyleSheet.create({
    Popover: {
      '.Popover-body': {
        width,
        minWidth,
        backgroundColor: BACKGROUND_COLORS.MAIN,
        border: `${borderColor} solid ${borderWidth}px`,
        borderRadius: '5px',
        boxShadow: '0 2px 16px 0 rgba(33,43,54,0.08)',
        fontSize: 15,
        fontWeight: 500,
      },
      '.Popover-tipShape': {
        fill: BACKGROUND_COLORS.MAIN,
        stroke: borderColor,
        strokeWidth: `${borderWidth}px`,
        // This prevents stroking the edge that touches the rectangular body.
        strokeDasharray: `${tipSize * 3}, ${tipSize * 2}`,
      },

      // hacks to hide the rectangular border where it touches the tip
      '.Popover-tip': {
        zIndex: '10',
      },
      '.Popover-body[style*="order: -1"]': {
        marginRight: `-${borderWidth}px`,
        marginBottom: `-${borderWidth}px`,
      },
      '.Popover-body[style*="order: 1"]': {
        marginLeft: `-${borderWidth}px`,
        marginTop: `-${borderWidth}px`,
      },
    },
  });

  return {
    body,
    place,
    target,
    isOpen,
    preferPlace,
    onOuterAction,
    refreshIntervalMs,
    enterExitTransitionDurationMs,
    tipSize: tipEnabled ? tipSize : 0.01,
    className: css(styleSheet.Popover, styles),
  };
}

export default function Popover(props: Props) {
  const basePopoverProps = _basePopoverProps(props);
  return (
    <BasePopover {...basePopoverProps}>
      {props.children}
    </BasePopover>
  );
}
