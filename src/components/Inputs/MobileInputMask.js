import React from "react";
import NumberFormat from "react-number-format";
import { TextField } from "@material-ui/core";

const NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            id: props.name,
            value: values.value,
          },
        });
      }}
      format="##### ### ###"
      isNumericString
    />
  );
};

const FormattedPhoneInput = ({ setData, value, id }) => {
  return (
    <React.Fragment>
      <TextField
        label="Mobile"
        value={value}
        variant="outlined"
        fullWidth={true}
        onChange={setData}
        name="mobileNumber"
        id="mobileNumber"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    </React.Fragment>
  );
};

export default FormattedPhoneInput;
