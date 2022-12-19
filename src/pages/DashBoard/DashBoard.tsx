import React, { useEffect, useState } from 'react';
import { Button, Col, Row, DatePicker, Space } from 'antd';
import { Table } from 'components/common/Table/Table';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import ConfigSetting from './DashBoardService';

import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { Card } from 'components/common/Card/Card';

import moment from 'moment';

const Dashboard: React.FC = () => {
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
    ConfigSetting.getComputerRunning().then((data: any) => {
      setComputerData(data.computers);
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
      title: 'Computer Name',
      dataIndex: 'computer_name',
      key: 'computer_name',
    },
    {
      title: 'Run',
      dataIndex: 'run',
      key: 'run',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
  ];


  return (
    <>
      <PageTitle>Trang thống kê</PageTitle>
      <Col>
        <S.Card title="Order Statitic">
          <Row style={{ width: '100%' }}>
            <Col md={8}>
              <Card
                title="Running"
                bordered={false}
                headStyle={{ color: 'black' }}
                bodyStyle={{
                  color: 'black',
                  fontSize: '500%',
                  padding: '30px 30px',
                  justifyContent: 'center',
                }}
                style={{ background: 'rgb(255, 246, 189)', width: '50%' }}
              >
                {runningChannel}
              </Card>
            </Col>
            <Col md={8}>
              <Card
                title="Completed"
                bordered={false}
                headStyle={{ color: 'black' }}
                bodyStyle={{
                  color: 'black',
                  fontSize: '500%',
                  padding: '30px 30px',
                  justifyContent: 'center',
                }}
                style={{ background: 'rgb(206, 237, 199)', width: '50%' }}
              >
                {completedChannel}
              </Card>
            </Col>
            <Col md={8}>
              <Card
                title="Cancel"
                bordered={false}
                headStyle={{ color: 'black' }}
                bodyStyle={{
                  color: 'black',
                  fontSize: '500%',
                  padding: '30px 30px',
                  justifyContent: 'center',
                }}
                style={{ background: 'rgb(220, 0, 0)', width: '50%' }}
              >
                {cancelChannel}
              </Card>
            </Col>
          </Row>
        </S.Card>
        <S.Card title="Running Machine List">
          <Row style={{ width: '100%' }}>
            <Col md={24}>
              <Table dataSource={computerData} columns={computerColumns} />
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

export default Dashboard;
