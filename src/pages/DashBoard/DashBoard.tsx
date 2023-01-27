import React, { useEffect, useState } from 'react';
import { Button, Col, Row, DatePicker, Space } from 'antd';
import { Table } from 'components/common/Table/Table';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import { Line } from '@ant-design/plots';
import ConfigSetting from './DashBoardService';

import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { Card } from 'components/common/Card/Card';
import * as s from './Tables.styles';
import moment from 'moment';
import { ColumnsType } from 'antd/es/table';

const Dashboard: React.FC = () => {
  interface ComputerDataType {
    key: React.Key;
    computer_name: string;
    run: number;
    time: number;
  }
  interface SubscribeDataType {
    key: React.Key;
    date: string;
    total: number;
  }
  interface ChartData {
    date: string;
    total: number;
  }

  const { t } = useTranslation();
  const [computerData, setComputerData] = useState<any>(null);
  const [runningChannel, setRunningChannel] = useState(0);
  const [completedChannel, setCompletedChannel] = useState(0);
  const [cancelChannel, setCancelChannel] = useState(0);
  const [reportData, setReportData] = useState<any>(null);
  const [date, setDate] = useState<any>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [dates, setDates] = useState<any>(null);
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
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    setDates([moment().subtract(6, 'days'), moment()]);
    const start = moment().subtract(6, 'days').format('DD-MM-YYYY');
    const end = moment().format('DD-MM-YYYY');

    ConfigSetting.getListHistory(start, end).then((data: any) => {
      setChartData(data.data);
      setReportData(data.data);
    });
  };

  const GetListHistory = () => {
    console.log(dates);

    ConfigSetting.getListHistory(moment(dates[0]).format('DD-MM-YYYY'), moment(dates[1]).format('DD-MM-YYYY')).then(
      (data: any) => {
        setChartData(data.report);
        setReportData(data.data);
      },
    );
  };

  const getAllData = () => {
    ConfigSetting.getComputerRunning().then((data: any) => {
      setComputerData(data.data);
    });
    ConfigSetting.getChannelRunning().then((data: any) => {
      setRunningChannel(data?.data.length || 0);setReportData
    });
    ConfigSetting.getChannelCompleted().then((data: any) => {
      setCompletedChannel(data?.data.length || 0);
    });
    ConfigSetting.getChannelCancel().then((data: any) => {
      setCancelChannel(data?.data.length || 0);
    });
  };
  const GetSubscribe = () => {
    console.log(12, date.date[0][1]._d);
    const start = date.date[0][0]._d;
    const end = date.date[0][1]._d;
    console.log(moment(end).format('DD-MM-YYYY'));

    ConfigSetting.getSubscribeByDays(moment(start).format('DD-MM-YYYY'), moment(end).format('DD-MM-YYYY')).then(
      (data: any) => {
        setReportData(data.data);
      },
    );
  };

  const columns: ColumnsType<SubscribeDataType> = [
    {
      title: t('common.Date'),
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => a.date.localeCompare(b.date),
      showSorterTooltip: false,
    },
    {
      title: t('common.Total'),
      dataIndex: 'total',
      key: 'total',
      sorter: (a, b) => a.total - b.total,
      showSorterTooltip: false,
    },
  ];

  const computerColumns: ColumnsType<ComputerDataType> = [
    {
      title: t('common.ComputerName'),
      dataIndex: 'computer_name',
      key: 'computer_name',
      sorter: (a, b) => a.computer_name.localeCompare(b.computer_name),
      showSorterTooltip: false,
    },
    {
      title: t('common.Run'),
      dataIndex: 'run',
      key: 'run',
      sorter: (a, b) => a.run - b.run,
      showSorterTooltip: false,
    },
    {
      title: t('common.Time'),
      dataIndex: 'time',
      key: 'time',
      render: (time) => `${moment(time).format('DD-MM-YYYY, h:mm:ss a')}`,
      sorter: (a, b) => a.time - b.time,
      showSorterTooltip: false,
    },
  ];
  const config = {
    data: chartData,
    // padding: 'auto',
    width: 1500,
    xField: 'date',
    yField: 'total',
  };
  function disabledDate(current: any) {
    // Can not select days before today and today
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 30;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 30;

    return !!tooEarly || !!tooLate;
  }

  return (
    <>
      <PageTitle>Trang thống kê</PageTitle>

      <Col>
        <s.Card title={t('common.history_order')}>
          <Row style={{ width: '100%' }}>
            <Col md={6}>
              <Space direction="vertical" size={12}>
                <RangePicker
                  format="DD-MM-YYYY"
                  disabledDate={disabledDate}
                  onCalendarChange={(val) => setDates(val)}
                  value={dates}
                />
              </Space>
            </Col>
            <Col md={1}>
              <Button onClick={() => GetListHistory()}>{t('common.fillter')}</Button>
            </Col>
          </Row>
          <Row style={{ width: '100%' }} />
          <Row style={{ width: '100%', marginTop: '20px' }}>
            <Col>
              <Line {...config} />
            </Col>
          </Row>
        </s.Card>

        <s.Card title={t('common.Orderstatitic')}>
          <Row style={{ width: '100%' }}>
            <Col xs={24} md={8}>
              <Card
                title={t('common.Running')}
                bordered={false}
                headStyle={{ color: 'black' }}
                bodyStyle={{
                  color: 'black',
                  fontSize: '500%',
                  padding: '30px 30px',
                  justifyContent: 'center',
                }}
                style={{ background: 'rgb(255, 246, 189)', width: '50%', transform: 'translateX(50%)' }}
              >
                {runningChannel}
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                title={t('common.Completed')}
                bordered={false}
                headStyle={{ color: 'black' }}
                bodyStyle={{
                  color: 'black',
                  fontSize: '500%',
                  padding: '30px 30px',
                  justifyContent: 'center',
                }}
                style={{ background: 'rgb(206, 237, 199)', width: '50%', transform: 'translateX(50%)' }}
              >
                {completedChannel}
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                title={t('common.Cancel')}
                bordered={false}
                headStyle={{ color: 'black' }}
                bodyStyle={{
                  color: 'black',
                  fontSize: '500%',
                  padding: '30px 30px',
                  justifyContent: 'center',
                }}
                style={{ background: 'rgb(220, 0, 0)', width: '50%', transform: 'translateX(50%)' }}
              >
                {cancelChannel}
              </Card>
            </Col>
          </Row>
        </s.Card>
        <s.Card title={t('common.RunningMachineList')}>
          <Row style={{ width: '100%' }}>
            <Col md={24}>
              <Table dataSource={computerData} columns={computerColumns} />
            </Col>
          </Row>
        </s.Card>
        <s.Card title={t('common.Subscribebydate')}>
          <Row style={{ width: '100%' }}>
            <Col md={6}>
              <Space direction="vertical" size={12}>
                <RangePicker format="YYYY-MM-DD" onChange={onChange} onOk={onOk} />
              </Space>
            </Col>
            <Col md={1}>
              <Button onClick={() => GetSubscribe()}>{t('common.fillter')}</Button>
            </Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col md={24}>
              <Table dataSource={reportData} columns={columns} />
            </Col>
          </Row>
        </s.Card>
      </Col>
    </>
  );
};

export default Dashboard;
