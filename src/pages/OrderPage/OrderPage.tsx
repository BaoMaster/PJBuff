import React, { useEffect, useState } from 'react';
import { Col, Row, Modal, Form, InputNumber, Select, Input, Radio } from 'antd';
import { Table } from 'components/common/Table/Table';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import OrderService from './OrderPageService';
import { Button } from '@app/components/common/buttons/Button/Button';
import * as s from './Tables.styles';

import moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import { CheckCircleOutlined, ExclamationOutlined } from '@ant-design/icons';
import { notificationController } from '@app/controllers/notificationController';
import Chat from '../Chat/Chat';

const OrderPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>Chat Center</PageTitle>

      <Chat />
    </>
  );
};

export default OrderPage;
