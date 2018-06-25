import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import Flexbox from 'components/Flexbox';

export type BaseProps = {
  id?: string,
  name: string,
  label: React.Children, // Required prop for accessibility
  labelPlacement?: 'before' | 'after' | 'none',
  flexDirection?: 'row' | 'column',
  onChange?: SyntheticInputEvent => void,
  required?: boolean,
  styles?: StyleSheetProp,
  labelStyles?: StyleSheetProp,
};

export type InputRendererProps = {
  name: string,
  title: string,
  id: string,
  'aria-label': string,
  onBlur: SyntheticInputEvent => void,
  onFocus: SyntheticInputEvent => void,
  onChange: SyntheticInputEvent => void,
  inputRef: any,
};

export type Props = {
  inputRenderer: InputRendererProps => React.Children,
} & BaseProps;

export type Context = {
  registerField?: (field: FormField) => void, // eslint-disable-line
};

const styleSheet = StyleSheet.create({
  Label: {
    flex: 'auto',
    cursor: 'inherit',
    fontSize: 14,
    fontWeight: 500,
    marginBottom: '1px',
  },
  LabelTop: {
    marginBottom: '5px',
  },
  Input: {
    padding: '10px',
  },
});

export default class FormField extends Component {
  props: Props;
  context: Context;
  input: ?HTMLInputElement;

  static contextTypes = {
    registerField: PropTypes.func
  };

  constructor(...args: Array<any>) {
    super(...args);
    this.input = null;
  }

  componentDidMount() {
    const { registerField } = this.context;
    if (registerField) {
      registerField(this);
    }
  }

  _onInputChange = (e: SyntheticInputEvent) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e);
    }
  };

  render() {
    const {
      id,
      name,
      label,
      inputRenderer,
      flexDirection,
      styles,
      labelStyles,
      labelPlacement = 'before',
    } = this.props;
    const computedId = id || `${name}-${label}`;
    const labelElement =
      labelPlacement === 'none'
        ? null
        : <label
            htmlFor={computedId}
            className={css(
              styleSheet.Label,
              labelPlacement === 'top' && styleSheet.TopLabel,
              labelStyles
            )}
          >
            {label}
          </label>;
    const inputElement = inputRenderer({
      name,
      title: label,
      id: computedId,
      inputRef: (input: HTMLInputElement) => {
        this.input = input;
      },
      'aria-label': label,
    });
    const isRow = flexDirection === 'row';

    return (
      <Flexbox direction="column" styles={styles}>
        <Flexbox
          direction={isRow ? 'row' : 'column'}
          alignItems={isRow ? 'center' : 'stretch'}
          flexItem={{ flex: 'auto' }}
        >
          {labelPlacement === 'before' && labelElement}
          {inputElement}
          {labelPlacement === 'after' && labelElement}
        </Flexbox>
      </Flexbox>
    );
  }
}
