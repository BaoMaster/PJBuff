import React, { useEffect, useState } from 'react';
import { Button, Col, Row, DatePicker, Space, Form } from 'antd';
import { Table } from 'components/common/Table/Table';
import { Line } from '@ant-design/plots';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import ConfigSetting from './HistoryPageService';

import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';

import moment from 'moment';
import { ColumnsType } from 'antd/es/table';

const Dashboard: React.FC = () => {
  interface HistoryDataType {
    key: React.Key;
    end_date: number;
    start_date: number;
    cancel: number;
    note: string;
    num_bh: number;
    user_id: number;
    rate: number;
    sub_start: number;
    time_check: number;
    sub_end: number;
    sub_need: number;
    channel_id: string;
    order_id: number;
  }
  interface ChartData {
    date: string;
    total: number;
  }
  const { t } = useTranslation();
  const [reportData, setReportData] = useState<any>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
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
    asyncFetch();
    setDate({
      Picker: [moment().subtract(6, 'days').format('DD-MM-YYYY'), moment().format('DD-MM-YYYY')],
    });
  }, []);

  const asyncFetch = () => {
    const start = moment().subtract(6, 'days').format('DD-MM-YYYY');
    const end = moment().format('DD-MM-YYYY');
    console.log(end);

    ConfigSetting.getListHistory(start, end).then((data: any) => {
      setChartData(data.report);
      setReportData(data.channels);
    });
  };

  const GetListHistory = () => {
    const start = date.date[0][0]._d;
    const end = date.date[0][1]._d;

    ConfigSetting.getListHistory(moment(start).format('DD-MM-YYYY'), moment(end).format('DD-MM-YYYY')).then(
      (data: any) => {
        setChartData(data.report);
        setReportData(data.channels);
      },
    );
  };
  const RestoreOrder = (id: any) => {
    ConfigSetting.restoreOrder(id);
  };
  const columns: ColumnsType<HistoryDataType> = [
    {
      title: t('tables.actions'),
      dataIndex: 'actions',
      width: '15%',
      align: 'center',
      render: (_: any, value: any) => {
        return (
          <Space>
            <Button
              type="ghost"
              onClick={() => {
                console.log(value.channel_id);

                RestoreOrder(value.order_id);
              }}
            >
              Restore Order
            </Button>
          </Space>
        );
      },
    },
    {
      title: 'Order Id',
      dataIndex: 'order_id',
      key: 'order_id',
      sorter: (a, b) => a.order_id - b.order_id,
      showSorterTooltip: false,
    },
    {
      title: 'Channel Id',
      dataIndex: 'channel_id',
      key: 'channel_id',
      sorter: (a, b) => a.channel_id.localeCompare(b.channel_id),
      showSorterTooltip: false,
    },
    {
      title: 'User Id',
      dataIndex: 'user_id',
      key: 'user_id',
      sorter: (a, b) => a.user_id - b.user_id,
      showSorterTooltip: false,
    },
    {
      title: 'Sub Start',
      dataIndex: 'sub_start',
      key: 'sub_start',
      sorter: (a, b) => a.sub_start - b.sub_start,
      showSorterTooltip: false,
    },
    {
      title: 'Sub End',
      dataIndex: 'sub_end',
      key: 'sub_end',
      sorter: (a, b) => a.sub_end - b.sub_end,
      showSorterTooltip: false,
    },
    {
      title: 'Sub Need',
      dataIndex: 'sub_need',
      key: 'sub_need',
      sorter: (a, b) => a.sub_need - b.sub_need,
      showSorterTooltip: false,
    },
    {
      title: 'Num Bh',
      dataIndex: 'num_bh',
      key: 'num_bh',
      sorter: (a, b) => a.num_bh - b.num_bh,
      showSorterTooltip: false,
    },
    {
      title: 'Start Sate',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (start_date) => `${moment(start_date).format('DD-MM-YYYY, h:mm:ss a')}`,
      sorter: (a, b) => a.start_date - b.start_date,
      showSorterTooltip: false,
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'end_date',
      render: (end_date) => `${moment(end_date).format('DD-MM-YYYY, h:mm:ss a')}`,
      sorter: (a, b) => a.end_date - b.end_date,
      showSorterTooltip: false,
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      sorter: (a, b) => a.note.localeCompare(b.note),
      showSorterTooltip: false,
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      sorter: (a, b) => a.rate - b.rate,
      showSorterTooltip: false,
    },
    {
      title: 'Time Check',
      dataIndex: 'time_check',
      key: 'time_check',
      render: (time_check) => `${moment(time_check).format('DD-MM-YYYY, h:mm:ss a')}`,
      sorter: (a, b) => a.time_check - b.time_check,
      showSorterTooltip: false,
    },
  ];

  const config = {
    data: chartData,
    padding: 'auto',
    width: 1500,
    xField: 'date',
    yField: 'total',
  };

  form.setFieldsValue({
    Picker: date.Picker,
  });
  return (
    <>
      <PageTitle>Trang Lịch Sử</PageTitle>

      <Col>
        <Row style={{ width: '100%' }}>
          <Col md={6}>
            <Space direction="vertical" size={12}>
              <Form.Item name="Picker" label="date">
                {' '}
                // the name here is `Picker` from your code
                <RangePicker format="YYYY-MM-DD" onChange={onChange} onOk={onOk} />
              </Form.Item>
            </Space>
          </Col>
          <Col md={1}>
            <Button onClick={() => GetListHistory()}>Fillter</Button>
          </Col>
        </Row>
        <S.Card title="History Order">
          <Row style={{ width: '100%' }}>
            <Col>
              <Line {...config} />
            </Col>
          </Row>
        </S.Card>
        <S.Card title="List History">
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
