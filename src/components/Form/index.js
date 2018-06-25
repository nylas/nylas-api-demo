import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import type FormField from 'components/FormField';

export type Props = {
  styles?: StyleSheetProp,
  children?: React.Children,
  onSubmit: (inputMap: { [fieldName: string]: any }) => any,
};

const defaultStyleSheet = StyleSheet.create({
  Form: {
    display: 'flex',
    flexDirection: 'column',
    flex: 'auto',
  },
});

export default class Form extends Component {
  props: Props;
  formFields: Array<FormField>;

  static defaultProps: Props = {
    onSubmit: inputMap => undefined,
  };

  static childContextTypes = {
    registerField: PropTypes.func,
  };

  constructor() {
    super();
    this.formFields = [];
  }

  getChildContext(): Context {
    return {
      registerField: this._registerField
    };
  }

  _registerField = (field: FormField) => {
    this.formFields.push(field);
  };

  _onSubmit = (e: any) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const inputMap = {};
    const filledInputs = this.formFields
      .map(field => field.input)
      .filter(input => {
        if (!input) {
          return false;
        }
        const { type, checked } = input || {};
        if (type === 'checkbox' && !checked) {
          return false;
        }
        return true;
      });
    for (const input of filledInputs) {
      const { type, name, value } = input || {};
      if (type === 'checkbox') {
        if (inputMap[name] instanceof Array) {
          inputMap[name].push(value);
        } else {
          inputMap[name] = [value];
        }
      } else {
        inputMap[name] = value;
      }
    }
    onSubmit(inputMap);
  };

  render() {
    const { children, styles, ...props } = this.props;
    return (
      <form
        {...props}
        className={css(defaultStyleSheet.Form, styles)}
        onSubmit={this._onSubmit}
      >
        {children}
      </form>
    );
  }
}
