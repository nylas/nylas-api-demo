// @flow
import React from 'react';

import Flexbox from 'components/Flexbox';

type Props = {
  onSelect: () => any,
  children: React.Children,
  styles?: StyleSheetProp,
};

export default function DropdownMenuItem(props: Props) {
  const { onSelect, children, styles } = props;
  return (
    <Flexbox styles={styles} onClick={onSelect}>
      {children}
    </Flexbox>
  );
}
