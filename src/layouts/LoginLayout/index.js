// @flow
import React from 'react';
import { StyleSheet } from 'aphrodite/no-important';
import { STYLES } from 'appConstants';
import Flexbox from 'components/Flexbox';
import LoginForm from 'components/LoginForm';

const { GRADIENTS } = STYLES;

const styleSheet = StyleSheet.create({
  Wrapper: {
    width: '100%',
    height: '100%',
    background: GRADIENTS.SEAFOAM,
  },
  CenteredLogoLayout: {
    width: 500,
    zIndex: 2,
  },
});

type Props = {
  handleLoginSubmit: () => any,
};

export default function LoginLayout(props: Props) {
  return (
    <Flexbox
      alignItems="center"
      justifyContent="center"
      styles={styleSheet.Wrapper}
    >
      <Flexbox
        alignItems="center"
        flexItem={{ flex: '0 0 auto' }}
        direction="column"
        styles={styleSheet.CenteredLogoLayout}
      >
        <LoginForm
          handleLoginSubmit={props.handleLoginSubmit}/>
      </Flexbox>
    </Flexbox>
  );
}
