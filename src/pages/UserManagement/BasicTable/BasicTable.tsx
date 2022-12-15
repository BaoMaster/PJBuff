import React, { useEffect, useState, useCallback } from 'react';
import { Col, Divider, Form, Input, InputNumber, Modal, Row, Space, TablePaginationConfig } from 'antd';
import { BasicTableRow, getBasicTableData, Pagination, Tag } from 'api/table.api';
import { Table } from 'components/common/Table/Table';
import { Button } from 'components/common/buttons/Button/Button';
import { useTranslation } from 'react-i18next';
import { notificationController } from 'controllers/notificationController';
import { useMounted } from '@app/hooks/useMounted';
import UserManagementService from '../UserManagementService';

const initialPagination: Pagination = {
  current: 1,
  pageSize: 5,
};

export const BasicTable: React.FC = () => {
  const [tableData, setTableData] = useState<{ data: any; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [userSelectData, setUserSelectData] = useState<number>(0);
  const { t } = useTranslation();
  const { isMounted } = useMounted();
  const [form] = Form.useForm();

  useEffect(() => {
    getUserData();
  }, []);

  const onFinishUpdate = (value: any) => {
    let dataUpdate;
    if (value.newPassword == null) {
      dataUpdate = {
        id: userSelectData,
        discount: value.discount,
      };
    } else {
      dataUpdate = {
        id: userSelectData,
        discount: value.discount,
        password: value.newPassword,
      };
    }
    UserManagementService.updateUserInfo(dataUpdate).then((res: any) => {
      if (res.status === 'success') {
        notificationController.success({
          message: 'Update Success',
        });
        getUserData();
        setIsOpenEdit(false);
      } else {
        notificationController.error({
          message: res.message,
        });
      }
    });
  };

  const handleEditUser = async (userId: number) => {
    setUserSelectData(userId);
    var findUser = await tableData.data.find((x: any) => x.id === userId);
    form.setFieldsValue({
      username: findUser.username,
      discount: findUser.discount,
    });
    setIsOpenEdit(true);
  };

  const getUserData = () => {
    UserManagementService.getUserList().then((dataRes: any) => {
      setTableData({ ...tableData, data: dataRes.accounts });
    });
  };

  const handleCancelEdit = async () => {
    setUserSelectData(0);
    setIsOpenEdit(false);
  };

  const columns: any = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'Last Order',
      dataIndex: 'last_order',
      key: 'last_order',
    },
    {
      title: 'Processing',
      dataIndex: 'processing',
      key: 'processing',
    },
    {
      title: 'Max Thread',
      dataIndex: 'max_thread',
      key: 'max_thread',
    },

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
                handleEditUser(value.id);
              }}
            >
              Edit
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={tableData.data} loading={tableData.loading} scroll={{ x: 800 }} bordered />

      <Modal
        title="Update Setting"
        visible={isOpenEdit}
        onCancel={() => handleCancelEdit()}
        footer={[
          <>
            <Button style={{ display: 'inline' }} onClick={() => handleCancelEdit()}>
              Close
            </Button>
            <Button
              style={{ display: 'inline' }}
              type="primary"
              className="btn btn-primary"
              form="updateSetting"
              key="submit"
              htmlType="submit"
            >
              Save changes
            </Button>
          </>,
        ]}
      >
        <Form
          name="updateSetting"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinishUpdate}
          form={form}
        >
          <Form.Item label="User name" name="username" key="username">
            <Input disabled style={{ width: 300, marginLeft: '10px' }} />
          </Form.Item>
          <Form.Item label="Discount" name="discount" key="discount">
            <InputNumber style={{ width: 300, marginLeft: '10px' }} min={0} />
          </Form.Item>
          <Divider style={{ fontSize: '14px' }} plain key="divi">
            Leave it blank if you don't want to update your password
          </Divider>
          <Form.Item label="New Password" name="newPassword" key="newPassword">
            <Input.Password placeholder="New Password" style={{ width: 300, marginLeft: '10px' }} />
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            name="confirmNewPassword"
            key="confirmNewPassword"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              ({ getFieldValue }) => ({
                required: getFieldValue('newPassword') ? true : false,
                message: 'Please confirm your password!',
              }),
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm New Password" style={{ width: 300, marginLeft: '10px' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
