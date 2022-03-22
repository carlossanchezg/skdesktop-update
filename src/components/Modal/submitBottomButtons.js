import React from "react";

import Button from "../Button";

const SubmitBottomButtons = ({
  leftButtonText,
  submitButtonText,
  cancelFunction,
  submitFunction,
  submitBg,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor: 'red',
        justifyContent: "space-evenly",
        marginTop: 35,
      }}
    >
      <Button
        styleBtn={{
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: "gray",
          borderStyle: "solid",
          borderRadius: 100,
          width: 143,
          height: 49,
        }}
        onPress={cancelFunction}
        content={
          <text style={{ color: "gray" }}>
            {leftButtonText ? leftButtonText : "Cancel"}
          </text>
        }
      />
      <Button
        styleBtn={{
          backgroundColor: "#0B6DF6",
          borderRadius: 100,
          width: 143,
          height: 49,
        }}
        onPress={submitFunction}
        content={<text style={{ color: "white" }}>{submitButtonText}</text>}
      />
    </div>
  );
};

export default SubmitBottomButtons;
