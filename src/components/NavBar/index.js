// @flow
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { STYLES } from 'appConstants';

import Flexbox from 'components/Flexbox';
import NavDropDownMenu from 'components/NavDropDownMenu';
import logo from './logo.svg';

const { BACKGROUND_COLORS } = STYLES;
const defaultText = 'Nylas';

const styleSheet = StyleSheet.create({
  MainLayout: {
    height: '100%',
    backgroundColor: BACKGROUND_COLORS.MAIN_INSET,
  },
  CompanyText: {
    height: '34px',
    fontSize: '28px',
    color: 'rgb(6, 51, 44)',
  },
  Img: {
    height: '100%',
    marginRight: '10px',
  },
  Header: {
    height: 80,
    backgroundColor: BACKGROUND_COLORS.MAIN,
    padding: 23,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  HeaderRightSide: {
    marginLeft: 'auto',
    height: '100%',
  },
});

type Props = {
  handleLogoutSubmit: () => any,
  logoSrc?: string,
  logoTxt?: string,
  toggleDisplayView: () => any,
}

export default function NavBar(props: Props) {
  return (
    <Flexbox direction="column" styles={styleSheet.MainLayout}>
      <Flexbox
        alignItems="center"
        flexItem={{ flex: '0 0 auto' }}
        styles={styleSheet.Header}
      >
        <Flexbox
          alignItems="center"
          styles={styleSheet.CompanyText}
        >
          <img
            className={css(styleSheet.Img)}
            src={props.logoSrc ? props.logoSrc : logo}
            alt="company-logo"
          />
          {props.logoText ? props.logoText : defaultText}
        </Flexbox>
        <Flexbox alignItems="center" styles={styleSheet.HeaderRightSide}>
          <NavDropDownMenu
            handleLogoutSubmit={props.handleLogoutSubmit}
            toggleDisplayView={props.toggleDisplayView}
          />
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
  }
