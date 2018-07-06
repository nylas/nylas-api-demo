// @flow
import React from 'react';
import FormField from 'components/FormField';
import type { BaseProps as FormFieldProps } from 'components/FormField';
import TimeSpanInput from "../TimeSpanInput";

export type Props = FormFieldProps & {
    inputStyles?: StyleSheetProp,
    inputRef?:any,
    type?:any
};

export default function TimeSpanFormField({
    labelPlacement,
    labelStyles,
    inputRef,
    type = 'datetime-local',
    inputStyles,
    ...props}:Props){
        return(
            <FormField
                {...props}
                labelPlacement={labelPlacement}
                labelStyles={labelStyles}
                inputRenderer = {inputProps=>
                    <TimeSpanInput
                        ref={inputRef}
                        {...props}
                        {...inputProps}
                        type={type}
                        styles={inputStyles}
                    />

                }
            />
        );
};
