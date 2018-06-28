// @flow
import { css } from 'modules/aphrodite-extended';
import React, { Component } from 'react';

import Flexbox from 'components/Flexbox';
import Icon from 'components/Icon';
import Popover from 'components/Popover';

import DropDownMenuItem from './DropDownMenuItem';
import stylesheet from './stylesheet.js';
import dropDownArrowSrc from './DropDownArrowIcon.svg';
import logOffIconSrc from './logOffIcon.svg';
import settingsIconSrc from './settingsIcon.svg';


type StyleProps = {
  Container?: StyleSheetProp,
  SelectionWindow?: StyleSheetProp,
  DropdownArrow?: StyleSheetProp,
  Popover?: StyleSheetProp,
  DropdownItem?: StyleSheetProp,
};

type Props = {
  children: React.Children,
  handleLogoutSubmit: () => any,
  styles?: StyleProps,
  toggleDisplayView: () => any,
};

type State = {
  isOpen: boolean,
};

export default class NavDropDownMenu extends Component {
  _isMounted: boolean;
  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);
    this._isMounted = false;
    this.state = { isOpen: false };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggleMenu = () => {
    if (this._isMounted) {
      this.setState({ isOpen: !this.state.isOpen });
    }
  };

  closeMenu = () => {
    if (this._isMounted && this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  };

  render() {
    const { isOpen } = this.state;

    const {
      handleLogoutSubmit,
      styles = {},
      toggleDisplayView,
    } = this.props;

    const popoverBody = (
      <div onClick={this.closeMenu}>
        <DropDownMenuItem onSelect={() => toggleDisplayView('mail')}>
          <a>Mail</a>
        </DropDownMenuItem>
        <DropDownMenuItem onSelect={() => toggleDisplayView('calendar')}>
          <a>Calendar</a>
        </DropDownMenuItem>
        <DropDownMenuItem onSelect={() => toggleDisplayView('settings')}>
          <a>
            <Icon
              src={settingsIconSrc}
              size="22px"
              styles={stylesheet.Icon}
            />
            Settings
          </a>
        </DropDownMenuItem>
        <DropDownMenuItem
          onSelect={() => handleLogoutSubmit()}
        >
          <a>
            <Icon
              src={logOffIconSrc}
              size="20px"
              styles={[stylesheet.LogOffIcon, stylesheet.Icon]}
            />
            Sign Out
          </a>
        </DropDownMenuItem>
      </div>
    );

    const popoverProps = {
      isOpen,
      body: popoverBody,
      onOuterAction: this.closeMenu,
      styles: [stylesheet.Popover, styles.Popover],
    };

    return (
      <div
        className={css(stylesheet.Container, styles.Container)}
        onClick={this.toggleMenu}
        width={190}
      >
        <Popover {...popoverProps}>
          <div style={{ overflow: 'hidden', display: 'flex' }}>
            <div
              className={css(
                stylesheet.SelectionWindow,
                styles.SelectionWindow
              )}
            >
              <Flexbox alignItems="center">
                <span className={css(stylesheet.Label)}>
                  Menu
                </span>
              </Flexbox>
            </div>
            <Icon
              src={dropDownArrowSrc}
              width={10}
              height={25}
              styles={[stylesheet.DropDownArrow]}
            />
          </div>

        </Popover>
      </div>
    );
  }
}
