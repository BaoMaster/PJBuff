import React, { useEffect, useState } from 'react';
import { Col, Row, DatePicker, Space, Modal, Form, InputNumber, Select, notification, Input } from 'antd';
import { Table } from 'components/common/Table/Table';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import OrderService from './OrderPageService';
import { Button } from '@app/components/common/buttons/Button/Button';

import moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined, FireOutlined } from '@ant-design/icons';
import { notificationController } from '@app/controllers/notificationController';

const OrderPage: React.FC = () => {
  const { t } = useTranslation();
  const [channelsData, setChannelsData] = useState<any>([]);
  const [channelsDataSelected, setChannelsDataSelected] = useState<any>([]);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [form] = Form.useForm();

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
    OrderService.getChannelRunning().then((data: any) => {
      var resData: any = [];
      data.channels.forEach((item: any) => {
        resData.push({ ...item, key: item.order_id });
      });
      setChannelsData(resData);
      setIsOpenDelete(false);
      setIsOpenEdit(false);
    });
    // OrderService.getChannelRunning().then((data: any) => {
    //   setRunningChannel(data?.total || 0);
    // });
    // OrderService.getChannelCompleted().then((data: any) => {
    //   setCompletedChannel(data?.total || 0);
    // });
    // OrderService.getChannelCancel().then((data: any) => {
    //   setCancelChannel(data?.total || 0);
    // });
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      const selectedData: any = [];
      selectedRows.forEach((item: any) => {
        const temp = channelsData.find((x: any) => x.order_id === item.order_id);
        selectedData.push(temp);
      });
      setChannelsDataSelected(selectedData);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
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
      sorter: (a, b) => a.insert_date - b.insert_date,
    },
    {
      title: 'Last Update',
      dataIndex: 'last_update',
      key: 'last_update',
      render: (last_update) => `${moment(last_update).format('DD-MM-YYYY, h:mm:ss a')}`,
      sorter: (a, b) => a.last_update - b.last_update,
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
      sorter: (a, b) => a.last_get - b.last_get,
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
    }
  ];

  const onFinishUpdate = (value: any) => {
    console.log(1212,value);
    
    const updateList: any = [];
    channelsDataSelected.forEach((item: any) => {
      const dataUpdate = {
        channel_id: item.channel_id,
        tab_run: value.tab_run,
        priority: (value.priority === null || typeof(value.priority) === 'undefined') ? 0 : value.priority,
        note: item.note
      };
      updateList.push(dataUpdate);
    });
    OrderService.updateMultiOrder(updateList).then((res: any) => {
      if (res.status === 'success') {
        notificationController.success({
          message: 'Update Order Success',
        });
        getAllData();
        setChannelsDataSelected([]);
      } else {
        notificationController.error({
          message: res.message,
        });
      }
    });
  };

  const onCloseModelUpdate = () => {
    setIsOpenEdit(false);
    form.resetFields();
  };

  const onDeleteOrder = () => {
    const deleteDataList: any = [];
    channelsDataSelected.forEach((item: any) => {
      const dataDelete = { channel_id: item.channel_id };
      deleteDataList.push(dataDelete);
    });
    OrderService.deleteMultiOrder(deleteDataList).then((res: any) => {
      if (res.status === 'success') {
        notificationController.success({
          message: 'Delete Order Success',
        });
        getAllData();
        setChannelsDataSelected([]);
      } else {
        notificationController.error({
          message: res.message,
        });
      }
    });
  };

  return (
    <>
      <PageTitle>Trang thống kê</PageTitle>
      <Col>
        <S.Card
          title="Order List"
          extra={
            <div style={{ display: 'flex' }}>
              <Button severity="success">Add</Button>
              <Button
                disabled={channelsDataSelected.length > 0 ? false : true}
                severity="info"
                style={{ marginLeft: '15px', marginRight: '15px' }}
                onClick={() => setIsOpenEdit(true)}
              >
                Edit
              </Button>
              <Button
                disabled={channelsDataSelected.length > 0 ? false : true}
                severity="error"
                onClick={() => setIsOpenDelete(true)}
              >
                Delete
              </Button>
            </div>
          }
        >
          <Row style={{ width: '100%' }}>
            <Col md={24}>
              <Table
                dataSource={channelsData}
                columns={channelColumns}
                scroll={{ x: 2000 }}
                rowSelection={{ ...rowSelection }}
              />
            </Col>
          </Row>
        </S.Card>
      </Col>
      {/* /////////// */}
      <Modal
        title="Update Order"
        visible={isOpenEdit}
        onCancel={() => onCloseModelUpdate()}
        footer={[
          <>
            <Button style={{ display: 'inline' }} onClick={() => onCloseModelUpdate()}>
              Close
            </Button>
            <Button
              style={{ display: 'inline' }}
              type="primary"
              className="btn btn-primary"
              form="updateOrder"
              key="submit"
              htmlType="submit"
            >
              Save changes
            </Button>
          </>,
        ]}
      >
        <Form name="updateOrder" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinishUpdate} form={form}>
          <Form.Item label="Tab Run" name="tab_run" required>
            <InputNumber style={{ width: '100%' }} min={0} required/>
          </Form.Item>
          <Form.Item label="Priority" name="priority">
            <Select defaultValue={0}>
              <Select.Option value={0}>Normal</Select.Option>
              <Select.Option value={1}>High</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Note" name="note" required>
            <Input style={{ width: '100%' }} required/>
          </Form.Item>
        </Form>
      </Modal>
      {/* /////////// */}
      <Modal
        title="Delete Order"
        visible={isOpenDelete}
        onCancel={() => setIsOpenDelete(false)}
        footer={[
          <>
            <Button style={{ display: 'inline' }} onClick={() => setIsOpenDelete(false)}>
              Close
            </Button>
            <Button
              style={{ display: 'inline' }}
              type="primary"
              className="btn btn-primary"
              onClick={() => onDeleteOrder()}
              danger
            >
              Delete
            </Button>
          </>,
        ]}
      >
        <div>Are you sure to delete Order ?</div>
      </Modal>
    </>
  );
};

export default OrderPage;
