import React, { useEffect, useState } from 'react';
import { Button, Col, Row, DatePicker, Space } from 'antd';
import { Table } from 'components/common/Table/Table';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import ConfigSetting from './OrderPageService';

import moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined, FireOutlined } from '@ant-design/icons';

const OrderPage: React.FC = () => {
  const { t } = useTranslation();
  const [channelsData, setChannelsData] = useState<any>(null);
  interface ChannelDataType {
    key: React.Key;
    order_id: number;
    insert_date: number;
    last_update: number;
    run: number;
    channel_id: string;
    current_view: number;
    current_subscribe: number;
    inscrease_subscribe: number;
    tab_run: number;
    subscribe_need: number;
    priority: number;
    start_subscribe: number;
    last_get: number;
    verified: number;
    note: string;
    enabled: number;
  }

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    ConfigSetting.getChannelRunning().then((data: any) => {
      setChannelsData(data.channels);
    });
    // ConfigSetting.getChannelRunning().then((data: any) => {
    //   setRunningChannel(data?.total || 0);
    // });
    // ConfigSetting.getChannelCompleted().then((data: any) => {
    //   setCompletedChannel(data?.total || 0);
    // });
    // ConfigSetting.getChannelCancel().then((data: any) => {
    //   setCancelChannel(data?.total || 0);
    // });
  };

  const channelColumns: ColumnsType<ChannelDataType> = [
    {
      title: 'Order Id',
      dataIndex: 'order_id',
      key: 'order_id',
      sorter: (a, b) => a.order_id - b.order_id,
      showSorterTooltip: false,
    },
    {
      title: 'Insert Date',
      dataIndex: 'insert_date',
      key: 'insert_date',
      render: (insert_date) => `${moment(insert_date).format('DD-MM-YYYY, h:mm:ss a')}`,
    },
    {
      title: 'Last Update',
      dataIndex: 'last_update',
      key: 'last_update',
      render: (last_update) => `${moment(last_update).format('DD-MM-YYYY, h:mm:ss a')}`,
    },
    {
      title: 'Channel Id',
      dataIndex: 'channel_id',
      key: 'channel_id',
      sorter: (a, b) => a.channel_id.localeCompare(b.channel_id),
      showSorterTooltip: false,
    },
    {
      title: 'Current Views',
      dataIndex: 'current_view',
      key: 'current_view',
      sorter: (a, b) => a.current_view - b.current_view,
      showSorterTooltip: false,
    },
    {
      title: 'Current Subs',
      dataIndex: 'current_subscribe',
      key: 'current_subscribe',
      sorter: (a, b) => a.current_subscribe - b.current_subscribe,
      showSorterTooltip: false,
    },
    {
      title: 'Inscrease Subs',
      dataIndex: 'inscrease_subscribe',
      key: 'inscrease_subscribe',
      sorter: (a, b) => a.inscrease_subscribe - b.inscrease_subscribe,
      showSorterTooltip: false,
    },
    {
      title: 'Tab Run',
      dataIndex: 'tab_run',
      key: 'tab_run',
      sorter: (a, b) => a.tab_run - b.tab_run,
      showSorterTooltip: false,
    },
    {
      title: 'Subs Need',
      dataIndex: 'subscribe_need',
      key: 'subscribe_need',
      sorter: (a, b) => a.subscribe_need - b.subscribe_need,
      showSorterTooltip: false,
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (priority ? <FireOutlined /> : priority),
    },
    {
      title: 'Start Subs',
      dataIndex: 'start_subscribe',
      key: 'start_subscribe',
      sorter: (a, b) => a.start_subscribe - b.start_subscribe,
      showSorterTooltip: false,
    },
    {
      title: 'Last Get',
      dataIndex: 'last_get',
      key: 'last_get',
      render: (last_get) => `${moment(last_get).format('DD-MM-YYYY, h:mm:ss a')}`,
    },
    {
      title: 'Verified',
      dataIndex: 'verified',
      key: 'verified',
      render: (verified) => (verified ? <CheckCircleOutlined /> : <CloseCircleOutlined />),
    },

    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Enabled',
      dataIndex: 'enabled',
      key: 'enabled',
      render: (enabled) => (enabled ? <CheckCircleOutlined /> : <CloseCircleOutlined />),
    },
  ];

  return (
    <>
      <PageTitle>Trang thống kê</PageTitle>
      <Col>
        <S.Card title="Order List">
          <Row style={{ width: '100%' }}>
            <Col md={24}>
              <Table dataSource={channelsData} columns={channelColumns} scroll={{ x: 400 }} />
            </Col>
          </Row>
        </S.Card>
      </Col>
    </>
  );
};

export default OrderPage;
