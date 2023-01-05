import React, { useEffect, useState } from 'react';
import { Col, Row, DatePicker, Space, Modal, Form, InputNumber, Select, notification, Input, Radio } from 'antd';
import { Table } from 'components/common/Table/Table';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import OrderService from './OrderPageService';
import { Button } from '@app/components/common/buttons/Button/Button';

import moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationOutlined,
  FireOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { notificationController } from '@app/controllers/notificationController';
import { AnyIfEmpty } from 'react-redux';
import { getData } from 'country-list';

const OrderPage: React.FC = () => {
  const { t } = useTranslation();
  const [channelsData, setChannelsData] = useState<any>([]);
  const [channelsDataOnLoad, setChannelsDataOnLoad] = useState<any>([]);
  const [channelAddData, setChannelAddData] = useState<any>([]);
  const [channelsDataSelected, setChannelsDataSelected] = useState<any>([]);
  const [userList, setUserList] = useState<UserListSelectType[]>([]);
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [isOpenCancel, setIsOpenCancel] = useState<boolean>(false);
  const [isOpenConfirmCancel, setIsOpenConfirmCancel] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('all');
  const [searchValue, setSearchValue] = useState<any>();
  const [form] = Form.useForm();
  const [formAdd] = Form.useForm();
  interface UserListSelectType {
    lable: string;
    value: string;
  }
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
    user_id: number;
    last_get: number;
    verified: number;
    note: string;
    enabled: number;
  }
  interface ChannelAddDataType {
    key: React.Key;
    channel_id: string;
    note: string;
    state: number;
  }

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async (value?: string) => {
    setIsLoading(true);
    var resData: any = [];
    if (value === 'running') {
      OrderService.getChannelRunning().then((data: any) => {
        data.channels.forEach((item: any) => {
          resData.push({ ...item, key: item.order_id, status: 'Running' });
        });
        setChannelsData(resData);
        setChannelsDataOnLoad(resData);
      });
    } else if (value === 'cancel') {
      OrderService.getChannelCancel().then((data: any) => {
        data.channels.forEach((item: any) => {
          resData.push({ ...item, key: item.order_id, status: 'Cancel' });
        });
        setChannelsData(resData);
        setChannelsDataOnLoad(resData);
      });
    } else if (value === 'complete') {
      OrderService.getChannelCompleted().then((data: any) => {
        data.channels.forEach((item: any) => {
          resData.push({ ...item, key: item.order_id, status: 'Complete' });
        });
        setChannelsData(resData);
        setChannelsDataOnLoad(resData);
      });
    } else {
      const running: any = await OrderService.getChannelRunning();
      running.channels.forEach((item: any) => {
        resData.push({ ...item, key: item.order_id, status: 'Running' });
      });

      const complete: any = await OrderService.getChannelCompleted();
      complete.channels.forEach((item: any) => {
        resData.push({ ...item, key: item.order_id, status: 'Complete' });
      });

      const cancel: any = await OrderService.getChannelCancel();
      cancel.channels.forEach((item: any) => {
        resData.push({ ...item, key: item.order_id, status: 'Cancel' });
      });
      const uniqueUserIds = Array.from(new Set(resData.map((x: any) => x.user_id)));
      // const res =  uniqueUserIds.map((x: any) => {
      //   const abc1: UserListSelectType = {
      //     lable:x.user_id,
      //     value:x.user_id
      //   };
      //   return abc1;
      // }),
      // setUserList(res);
      setChannelsData(resData);
      setChannelsDataOnLoad(resData);
    }
    setIsOpenDelete(false);
    setIsOpenEdit(false);
    setIsOpenCancel(false);
    setIsLoading(false);
    setIsOpenConfirmCancel(false);
    setChannelsDataSelected([]);

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
  const channelAddDColumns: ColumnsType<ChannelAddDataType> = [
    {
      title: 'Channel Id',
      dataIndex: 'channel_id',
      key: 'channel_id',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: 'Subscribe Need',
      dataIndex: 'subscribe_need',
      key: 'subscribe_need',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      render: (state) => (state === 0 ? <ExclamationOutlined /> : <CheckCircleOutlined />),
    },
  ];
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
      showSorterTooltip: false,
    },
    {
      title: 'Last Update',
      dataIndex: 'last_update',
      key: 'last_update',
      render: (last_update) => `${moment(last_update).format('DD-MM-YYYY, h:mm:ss a')}`,
      sorter: (a, b) => a.last_update - b.last_update,
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
      sorter: (a, b) => a.priority - b.priority,
      render: (priority) => (priority ? 'High' : 'Normal'),
      showSorterTooltip: false,
    },
    {
      title: 'Start Subs',
      dataIndex: 'start_subscribe',
      key: 'start_subscribe',
      sorter: (a, b) => a.start_subscribe - b.start_subscribe,
      showSorterTooltip: false,
    },
    {
      title: 'User Id',
      dataIndex: 'user_id',
      key: 'user_id',
      sorter: (a, b) => a.start_subscribe - b.start_subscribe,
      showSorterTooltip: false,
    },
    {
      title: 'Last Get',
      dataIndex: 'last_get',
      key: 'last_get',
      render: (last_get) => `${moment(last_get).format('DD-MM-YYYY, h:mm:ss a')}`,
      sorter: (a, b) => a.last_get - b.last_get,
      showSorterTooltip: false,
    },
    // {
    //   title: 'Verified',
    //   dataIndex: 'verified',
    //   key: 'verified',
    //   render: (verified) => (verified ? <CheckCircleOutlined /> : <CloseCircleOutlined />),
    //   showSorterTooltip: false,
    // },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      showSorterTooltip: false,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      showSorterTooltip: false,
    },
  ];

  const addToList = (value: any) => {
    const dataAdd = {
      channel_id: value.channel_id,
      priority: value.priority === null || typeof value.priority === 'undefined' ? 0 : value.priority,
      note: value.note,
      subscribe_need: value.subscribe_need,
      state: 0,
    };
    formAdd.resetFields();
    setChannelAddData((prevState: any) => [...prevState, dataAdd]);
  };
  const onFinishAdd = () => {
    const ListData = channelAddData;
    ListData.forEach((data: any, index: number) => {
      if (data.state !== 1) {
        delete data['state'];
        OrderService.insertOrder(data).then((res: any) => {
          if (res.status === 'success') {
            notificationController.success({
              message: 'Add Order Success',
            });
            ListData.splice(index, 1);
            setChannelAddData((prevState: any) => {
              const newState = prevState.map((obj: any) => {
                if (data.channel_id === obj.channel_id) {
                  return { ...obj, state: 1 };
                }

                return obj;
              });

              return newState;
            });
          } else {
            notificationController.error({
              message: res.message,
            });
            setChannelAddData((prevState: any) => {
              const newState = prevState.map((obj: any) => {
                if (data.channel_id === obj.channel_id) {
                  return { ...obj, state: 0 };
                }

                return obj;
              });

              return newState;
            });
          }
        });
      }
    });
    setChannelAddData(ListData);
  };

  const onFinishConfirmCancel = (value: any) => {
    channelsDataSelected.forEach((item: any) => {
      OrderService.ConfirmCancelOrder(
        item.channel_id,
        value.refund === null || typeof value.refund === 'undefined' ? 1 : value.refund,
      ).then((res: any) => {
        notificationController.success({
          message: 'Update Order Success',
        });
        getAllData();
      });
    });
  };

  const onFinishUpdate = (value: any) => {
    const updateList: any = [];
    channelsDataSelected.forEach((item: any) => {
      const dataUpdate = {
        channel_id: item.channel_id,
        tab_run: value.tab_run,
        priority: value.priority === null || typeof value.priority === 'undefined' ? 0 : value.priority,
        note: value.note,
        enabled: value.enabled === null || typeof value.enabled === 'undefined' ? 0 : value.enabled,
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

  const onCloseModelAdd = () => {
    setIsOpenAdd(false);
    setChannelAddData([]);
    formAdd.resetFields();
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

  const onCancelOrder = () => {
    channelsDataSelected.forEach((item: any) => {
      OrderService.CancelOrder(item.channel_id).then((res: any) => {
        notificationController.success({
          message: 'Cancel Order Success',
        });
        getAllData();
        setChannelsDataSelected([]);
      });
    });
  };

  const handleChangeSelectState = (value: string) => {
    setStatus(value);
    getAllData(value);
  };

  const onChangeInputUser = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const currValue = e.target.value;
    setSearchValue(currValue);
    const filteredData = channelsDataOnLoad.filter((item: any) => item.user_id.toString().includes(currValue));
    setChannelsData(filteredData);
  };

  return (
    <>
      <PageTitle>Trang thống kê</PageTitle>
      <Col>
        <S.Card
          title="Order List"
          extra={
            <div style={{ display: 'flex' }}>
              <Button severity="success" onClick={() => setIsOpenAdd(true)}>
                Add
              </Button>
              <Button
                disabled={channelsDataSelected.length > 0 ? false : true}
                severity="info"
                style={{ marginLeft: '15px' }}
                onClick={() => setIsOpenEdit(true)}
              >
                Edit
              </Button>
              <Button
                disabled={channelsDataSelected.length > 0 ? false : true}
                severity="error"
                style={{ marginLeft: '15px' }}
                onClick={() => setIsOpenDelete(true)}
              >
                Delete
              </Button>
              {status === 'running' && (
                <Button
                  disabled={channelsDataSelected.length > 0 ? false : true}
                  severity="error"
                  style={{ marginLeft: '15px' }}
                  onClick={() => setIsOpenCancel(true)}
                >
                  Cancel
                </Button>
              )}
              {status === 'cancel' && (
                <Button
                  disabled={channelsDataSelected.length > 0 ? false : true}
                  severity="error"
                  style={{ marginLeft: '15px' }}
                  onClick={() => setIsOpenConfirmCancel(true)}
                >
                  Confirm Cancel
                </Button>
              )}
            </div>
          }
        >
          <>
            <Row style={{ width: '100%', justifyContent: 'end' }}>
              <div style={{ marginRight: '10px', display: 'flex' }}>
                <span style={{ marginTop: '8px', marginRight: '10px', fontSize: 'larger' }}>User: </span>
                <Input value={searchValue} onChange={onChangeInputUser} />
              </div>
              <div>
                <span style={{ marginTop: '8px', marginRight: '10px', fontSize: 'larger' }}>Status: </span>
                <Select
                  defaultValue="all"
                  style={{ width: 200 }}
                  onChange={handleChangeSelectState}
                  value={status}
                  options={[
                    {
                      value: 'all',
                      label: 'All',
                    },
                    {
                      value: 'running',
                      label: 'Running',
                    },
                    {
                      value: 'complete',
                      label: 'Complete',
                    },
                    {
                      value: 'cancel',
                      label: 'Cancel',
                    },
                  ]}
                />
              </div>
            </Row>
            <Row style={{ width: '100%' }}>
              <Col md={24}>
                <Table
                  dataSource={channelsData}
                  columns={channelColumns}
                  scroll={{ x: 2000 }}
                  rowSelection={{ ...rowSelection }}
                  loading={isLoading}
                />
              </Col>
            </Row>
          </>
        </S.Card>
      </Col>
      <Modal
        title="Add Order"
        visible={isOpenAdd}
        onCancel={() => onCloseModelAdd()}
        width={1000}
        footer={[
          <>
            <Button style={{ display: 'inline' }} onClick={() => onCloseModelAdd()}>
              Close
            </Button>

            <Button
              style={{ display: 'inline' }}
              type="primary"
              className="btn btn-primary"
              form="addOrder"
              onClick={() => onFinishAdd()}
              disabled={channelAddData.length < 1}
            >
              Add List
            </Button>
          </>,
        ]}
      >
        <Form name="addOrder" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={addToList} form={formAdd}>
          <Form.Item label="Channel Id" name="channel_id" required>
            <Input style={{ width: '100%' }} required />
          </Form.Item>
          <Form.Item label="Priority" name="priority">
            <Select defaultValue={0}>
              <Select.Option value={0}>Normal</Select.Option>
              <Select.Option value={1}>High</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Subscribe Need" name="subscribe_need" required>
            <InputNumber style={{ width: '100%' }} min={0} required />
          </Form.Item>
          <Form.Item label="Note" name="note" required>
            <Input style={{ width: '100%' }} required />
          </Form.Item>
          <Form.Item name="btn" required style={{ float: 'right' }}>
            <Button
              style={{ display: 'inline' }}
              type="primary"
              className="btn btn-primary"
              form="addOrder"
              key="submit"
              htmlType="submit"
            >
              Add
            </Button>
          </Form.Item>
        </Form>
        <Table dataSource={channelAddData} columns={channelAddDColumns} scroll={{ x: 100 }} pagination={false} />
      </Modal>
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
            <InputNumber style={{ width: '100%' }} min={0} required />
          </Form.Item>
          <Form.Item label="Priority" name="priority">
            <Select defaultValue={0}>
              <Select.Option value={0}>Normal</Select.Option>
              <Select.Option value={1}>High</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Note" name="note" required>
            <Input style={{ width: '100%' }} required />
          </Form.Item>
          <Form.Item label="enabled" name="enabled">
            <Select defaultValue={0}>
              <Select.Option value={0}>Stop</Select.Option>
              <Select.Option value={1}>Run</Select.Option>
            </Select>
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
      {/* /////////// */}
      <Modal
        title="Cancel Order"
        visible={isOpenCancel}
        onCancel={() => setIsOpenCancel(false)}
        footer={[
          <>
            <Button style={{ display: 'inline' }} onClick={() => setIsOpenCancel(false)}>
              Close
            </Button>
            <Button
              style={{ display: 'inline' }}
              type="primary"
              className="btn btn-primary"
              onClick={() => onCancelOrder()}
              danger
            >
              Cancel
            </Button>
          </>,
        ]}
      >
        <div>Are you sure to cancel Order ?</div>
      </Modal>
      {/* /////////// */}
      <Modal
        title="Confirm Cancel Order"
        visible={isOpenConfirmCancel}
        onCancel={() => setIsOpenConfirmCancel(false)}
        footer={[
          <>
            <Button style={{ display: 'inline' }} onClick={() => setIsOpenConfirmCancel(false)}>
              Close
            </Button>
            <Button
              style={{ display: 'inline' }}
              type="primary"
              className="btn btn-primary"
              form="confirmCancelOrder"
              key="submit"
              htmlType="submit"
            >
              Confirm
            </Button>
          </>,
        ]}
      >
        <>
          <div>Do you want to refund this order?</div>
          <Form name="confirmCancelOrder" wrapperCol={{ span: 16 }} onFinish={onFinishConfirmCancel} form={form}>
            <Form.Item label="Refund ?" name="refund" style={{ marginTop: '10px' }}>
              <Radio.Group defaultValue={1}>
                <Radio value={1}>Yes</Radio>
                <Radio value={0}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </>
      </Modal>
    </>
  );
};

export default OrderPage;
