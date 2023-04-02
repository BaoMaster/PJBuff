import React from 'react';

import * as s from './Tables.styles';
import img from './AboutUss.png';
import img2 from './vivu2.png';
const Dashboard: React.FC = () => {
  return (
    <>
      <s.Card2>
        <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={img} alt="about us" />
      </s.Card2>
      <s.Card2>
        <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={img2} alt="about us2" />
      </s.Card2>
    </>
  );
};

export default Dashboard;
