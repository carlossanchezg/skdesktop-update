import React from 'react';

import styles from './Input.module.css';

const Input = ({
  inputValue,
  inputValueFunction,
  examplePlaceHolder,
  inputType,
  customHeight,
  customWidth,
  customPaddingLeft,
  customBorderRadius,
  customMarginBottom,
  customDisable
}) => {
  return (
    <input
      autoFocus
      required
      disabled={customDisable}
      value={inputValue}
      type={inputType}
      name="inputEmail"
      className={styles.input}
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      placeholder={examplePlaceHolder}
      onChange={inputValueFunction}
      style={{
        height: customHeight ? customHeight : null,
        width: customWidth ? customWidth : null,
        borderRadius: customBorderRadius ? customBorderRadius : null,
        paddingLeft: customPaddingLeft ? customPaddingLeft : null,
        marginBottom: customMarginBottom ? customMarginBottom : null
      }}
    />
  );
};

export default Input;
