// @flow
import { StyleSheet } from 'modules/aphrodite-extended';

const popoverWidth = 250;

const ellipsisOverflowMixin = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export default StyleSheet.create({
  Container: {
    cursor: 'pointer',
  },
  SelectionWindow: {
    float: 'left',
    boxSizing: 'border-box',
    paddingRight: '10px',
    maxWidth: popoverWidth,
    ...ellipsisOverflowMixin,
  },
  Popover: {
    '.Popover-body': {
      padding: 10,
    },
  },
  DropdownArrow: {
    float: 'left',
  },
  Icon: {
    marginRight: 7,
  },
  LogOffIcon: {
    marginLeft: 2,
  },
  Label: {
    fontWeight: 500,
  },
});
