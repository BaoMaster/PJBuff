import React, { useEffect, useState } from 'react';
import { Button, Col, Row, DatePicker, Space } from 'antd';
import { Table } from 'components/common/Table/Table';
import { Line } from '@ant-design/plots';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import ConfigSetting from './HistoryPageService';

import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';

import moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import { Dayjs } from 'dayjs';

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
  type RangeValue = [Dayjs | null, Dayjs | null] | null;

  const [dates, setDates] = useState<any>(null);
  const [value, setValue] = useState<any>(null);
  const { RangePicker } = DatePicker;

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    setDates([moment().subtract(13, 'days'), moment()]);
    const start = moment().subtract(13, 'days').format('DD-MM-YYYY');
    const end = moment().format('DD-MM-YYYY');
    // console.log(end);

    ConfigSetting.getListHistory(start, end).then((data: any) => {
      setChartData(data.report);
      setReportData(data.channels);
    });
  };

  const GetListHistory = () => {
    console.log(dates);

    // const start = date.date[0][0]._d;
    // const end = date.date[0][1]._d;

    ConfigSetting.getListHistory(moment(dates[0]).format('DD-MM-YYYY'), moment(dates[1]).format('DD-MM-YYYY')).then(
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
      title: t('common.actions'),
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
              {t('common.restore_order')}
            </Button>
          </Space>
        );
      },
    },
    {
      title: t('common.orderId'),
      dataIndex: 'order_id',
      key: 'order_id',
      sorter: (a, b) => a.order_id - b.order_id,
      showSorterTooltip: false,
    },
    {
      title: t('common.channel_id'),
      dataIndex: 'channel_id',
      key: 'channel_id',
      sorter: (a, b) => a.channel_id.localeCompare(b.channel_id),
      showSorterTooltip: false,
    },
    {
      title: t('common.user_id'),
      dataIndex: 'user_id',
      key: 'user_id',
      sorter: (a, b) => a.user_id - b.user_id,
      showSorterTooltip: false,
    },
    {
      title: t('common.sub_start'),
      dataIndex: 'sub_start',
      key: 'sub_start',
      sorter: (a, b) => a.sub_start - b.sub_start,
      showSorterTooltip: false,
    },
    {
      title: t('common.sub_end'),
      dataIndex: 'sub_end',
      key: 'sub_end',
      sorter: (a, b) => a.sub_end - b.sub_end,
      showSorterTooltip: false,
    },
    {
      title: t('common.sub_need'),
      dataIndex: 'sub_need',
      key: 'sub_need',
      sorter: (a, b) => a.sub_need - b.sub_need,
      showSorterTooltip: false,
    },
    {
      title: t('common.num_bh'),
      dataIndex: 'num_bh',
      key: 'num_bh',
      sorter: (a, b) => a.num_bh - b.num_bh,
      showSorterTooltip: false,
    },
    {
      title: t('common.start_date'),
      dataIndex: 'start_date',
      key: 'start_date',
      render: (start_date) => `${moment(start_date).format('DD-MM-YYYY, h:mm:ss a')}`,
      sorter: (a, b) => a.start_date - b.start_date,
      showSorterTooltip: false,
    },
    {
      title: t('common.end_date'),
      dataIndex: 'end_date',
      key: 'end_date',
      render: (end_date) => `${moment(end_date).format('DD-MM-YYYY, h:mm:ss a')}`,
      sorter: (a, b) => a.end_date - b.end_date,
      showSorterTooltip: false,
    },
    {
      title: t('common.note'),
      dataIndex: 'note',
      key: 'note',
      sorter: (a, b) => a.note.localeCompare(b.note),
      showSorterTooltip: false,
    },
    {
      title: t('common.rate'),
      dataIndex: 'rate',
      key: 'rate',
      sorter: (a, b) => a.rate - b.rate,
      showSorterTooltip: false,
    },
    {
      title: t('common.time_check'),
      dataIndex: 'time_check',
      key: 'time_check',
      render: (time_check) => `${moment(time_check).format('DD-MM-YYYY, h:mm:ss a')}`,
      sorter: (a, b) => a.time_check - b.time_check,
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
      <PageTitle>{t('common.history_page')}</PageTitle>

      <Col>
        {/* <S.Card title={t('common.history_order')}>
          <Row style={{ width: '100%' }}>
            <Col>
              <Line {...config} />
            </Col>
          </Row>
        </S.Card> */}
        <S.Card title={t('common.list_history')}>
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
              <Button onClick={() => GetListHistory()}>Fillter</Button>
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
