import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useInput, FieldTitle } from 'ra-core';
import { DatePicker, TimePicker, DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const Picker = ({ PickerComponent, ...fieldProps }) => {

  const {
    margin,
    options,
    label,
    source,
    resource,
    className,
    isRequired,
    minutesStep,
    helperText,
    defaultValue,
    inputVariant,
    providerOptions,
  } = fieldProps;

  const { input, meta } = useInput({ source });
  
  const { touched, error } = meta;
  
  const handleChange = useCallback(value => {
    Date.parse(value) ? input.onChange(value.toISOString()) : input.onChange(null);
  }, []);

  return (
    <div className="picker">
      <MuiPickersUtilsProvider {...providerOptions}>
        <PickerComponent
          {...options}
          label={<FieldTitle
            label={label}
            source={source}
            resource={resource}
            isRequired={isRequired}
          />}
          margin={margin}
          inputVariant={inputVariant}
          error={!!(touched && error)}
          helperText={(touched && error) || helperText}
          className={className}
          minutesStep={minutesStep}
          value={input.value ? new Date(input.value) : defaultValue}
          onChange={date => handleChange(date)}
          onBlur={() => input.onBlur(input.value ? new Date(input.value).toISOString() : null)}
        />
      </MuiPickersUtilsProvider>
    </div>
  )
}

Picker.propTypes = {
  input: PropTypes.object,
  isRequired: PropTypes.bool,
  minutesStep: PropTypes.number,
  defaultValue: PropTypes.string, // ISO-8601 string
  helperText: PropTypes.string,
  inputVariant: PropTypes.string,
  margin: PropTypes.string,
  label: PropTypes.string,
  meta: PropTypes.object,
  options: PropTypes.object,
  resource: PropTypes.string,
  source: PropTypes.string,
  labelTime: PropTypes.string,
  className: PropTypes.string,
  providerOptions: PropTypes.shape({
    utils: PropTypes.func,
    locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
};

Picker.defaultProps = {
  input: {},
  isRequired: false,
  minutesStep: 1,
  defaultValue: null,
  helperText: null,
  inputVariant: 'filled',
  margin: 'dense',
  meta: { touched: false, error: false },
  options: {},
  resource: '',
  source: '',
  labelTime: '',
  className: '',
  providerOptions: {
    utils: DateFnsUtils,
    locale: undefined,
  },
};

export const DateInput = props => <Picker PickerComponent={DatePicker} {...props} />
export const TimeInput = props => <Picker PickerComponent={TimePicker} {...props} />
export const DateTimeInput = props => <Picker PickerComponent={DateTimePicker} {...props} />
