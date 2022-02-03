import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TitleAndIconClose = ({ closeModal, modalTitle }) => {
  return (
    <div
      style={{
        // backgroundColor: 'thistle',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <text>{modalTitle}</text>
      <FontAwesomeIcon
        onClick={() => closeModal(false)}
        size="lg"
        icon="times"
        style={{
          cursor: 'pointer'
        }}
      />
    </div>
  );
};

export default TitleAndIconClose;
