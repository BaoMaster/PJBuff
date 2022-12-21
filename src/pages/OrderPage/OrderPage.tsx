import React, { useEffect, useState } from 'react';
import { Button, Col, Row, DatePicker, Space } from 'antd';
import { Table } from 'components/common/Table/Table';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import ConfigSetting from './OrderPageService';

import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { Card } from 'components/common/Card/Card';

import moment from 'moment';

const OrderPage: React.FC = () => {
  const { t } = useTranslation();
  const [computerData, setComputerData] = useState<any>(null);
  const [runningChannel, setRunningChannel] = useState(0);
  const [completedChannel, setCompletedChannel] = useState(0);
  const [cancelChannel, setCancelChannel] = useState(0);
  const [reportData, setReportData] = useState<any>(null);
  const [date, setDate] = useState<any>(null);
  const { RangePicker } = DatePicker;

  const onChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    let date = [];
    date.push(value);
    setDate({ date: date });
  };

  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value);
  };

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    ConfigSetting.getChannelRunning().then((data: any) => {
      setComputerData(data.channels);
    });
    ConfigSetting.getChannelRunning().then((data: any) => {
      setRunningChannel(data?.total || 0);
    });
    ConfigSetting.getChannelCompleted().then((data: any) => {
      setCompletedChannel(data?.total || 0);
    });
    ConfigSetting.getChannelCancel().then((data: any) => {
      setCancelChannel(data?.total || 0);
    });
  };
  const GetSubscribe = () => {
    console.log(12, date.date[0][1]._d);
    const start = date.date[0][0]._d;
    const end = date.date[0][1]._d;
    console.log(moment(end).format('DD-MM-YYYY'));

    ConfigSetting.getSubscribeByDays(moment(start).format('DD-MM-YYYY'), moment(end).format('DD-MM-YYYY')).then(
      (data: any) => {
        setReportData(data.reports);
      },
    );
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  const computerColumns = [
    {
      title: 'order_id',
      dataIndex: 'order_id',
      key: 'order_id',
    },
    {
      title: 'insert_date',
      dataIndex: 'insert_date',
      key: 'insert_date',
    },
    {
      title: 'last_update',
      dataIndex: 'last_update',
      key: 'last_update',
    },
    {
      title: 'channel_id',
      dataIndex: 'channel_id',
      key: 'channel_id',
    },
    {
      title: 'current_view',
      dataIndex: 'current_view',
      key: 'current_view',
    },
    {
      title: 'current_subscribe',
      dataIndex: 'current_subscribe',
      key: 'current_subscribe',
    },
    {
      title: 'inscrease_subscribe',
      dataIndex: 'inscrease_subscribe',
      key: 'inscrease_subscribe',
    },
    {
      title: 'tab_run',
      dataIndex: 'tab_run',
      key: 'tab_run',
    },
    {
      title: 'subscribe_need',
      dataIndex: 'subscribe_need',
      key: 'subscribe_need',
    },
    {
      title: 'priority',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: 'start_subscribe',
      dataIndex: 'start_subscribe',
      key: 'start_subscribe',
    },
    {
      title: 'last_get',
      dataIndex: 'last_get',
      key: 'last_get',
    },
    {
      title: 'verified',
      dataIndex: 'verified',
      key: 'verified',
    },

    {
      title: 'note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'enabled',
      dataIndex: 'enabled',
      key: 'enabled',
    },
  ];

  return (
    <>
      <PageTitle>Trang thống kê</PageTitle>
      <Col>
        <S.Card title="Order List">
          <Row style={{ width: '100%' }}>
            <Col md={24}>
              <Table dataSource={computerData} columns={computerColumns} scroll={{ x: 400 }} />
            </Col>
          </Row>
        </S.Card>
        <S.Card title="Subscribe by date">
          <Row style={{ width: '100%' }}>
            <Col md={8}>
              <Space direction="vertical" size={12}>
                <RangePicker format="YYYY-MM-DD" onChange={onChange} onOk={onOk} />
              </Space>
            </Col>
            <Col md={1}>
              <Button onClick={() => GetSubscribe()}>Fillter</Button>
            </Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col md={24}>
              <Table dataSource={reportData} columns={columns} />
            </Col>
          </Row>
        </S.Card>
      </Col>
    </>
  );
};

export default OrderPage;
