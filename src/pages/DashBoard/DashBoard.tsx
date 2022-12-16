import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputNumber, Modal, Row, Table, DatePicker, Space } from 'antd';
import { AutoComplete } from 'components/common/AutoComplete/AutoComplete';
import { SearchInput as CommonSearchInput } from 'components/common/inputs/SearchInput/SearchInput';
import { Option } from 'components/common/selects/Select/Select';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import ConfigSetting from './DashBoardService';
import { notificationController } from '@app/controllers/notificationController';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { Card } from 'components/common/Card/Card';
import { PieChart } from '@app/components/common/charts/PieChart';
import moment from 'moment';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  const [settingData, setSettingData] = useState<any>(null);
  const [computerData, setComputerData] = useState<any>(null);
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
  const dataChart = [
    { value: 1048, name: 'Đang chạy' },
    { value: 735, name: 'Đã xong' },
    { value: 580, name: 'Chờ Huỷ' },
  ];
  const name = 'Thống kê đơn';

  return (
    <>
      <PageTitle>Trang thống kê</PageTitle>
      <Col>
        <S.Card title="Page Configuration">
          <Row style={{ width: '100%' }}>
            <Col md={12}>
              <label>Thống kê đơn: </label>
              <PieChart data={dataChart} name={name} showLegend={true} />
            </Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col md={6}>
              <label>Danh sách máy đang chạy: </label>
            </Col>
            <Col md={24}>
              <Table dataSource={computerData} columns={computerColumns} />;
            </Col>
          </Row>

          <Row style={{ width: '100%' }}>
            <Col md={15}>
              <label>Get subscribe: </label>
            </Col>
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
              <Table dataSource={reportData} columns={columns} />;
            </Col>
          </Row>
        </S.Card>
      </Col>
    </>
  );
};

export default Dashboard;
