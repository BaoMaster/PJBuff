import React from 'react';

import * as s from './Tables.styles';
import img from './AboutUss.png';
const Dashboard: React.FC = () => {
  return (
    <s.Card2 >
      <img src={img} alt="about us" />
    </s.Card2>
  );
};

export default Dashboard;
