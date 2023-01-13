import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputNumber, Modal, Row, Table } from 'antd';
import { AutoComplete } from 'components/common/AutoComplete/AutoComplete';
import { SearchInput as CommonSearchInput } from 'components/common/inputs/SearchInput/SearchInput';
import { Option } from 'components/common/selects/Select/Select';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import ConfigSetting from './ConfigService';
import { notificationController } from '@app/controllers/notificationController';
import { ColumnsType } from 'antd/lib/table';

const ConfigPage: React.FC = () => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [result, setResult] = useState<string[]>([]);
  const [settingData, setSettingData] = useState<any>(null);
  const [settingDataUpdate, setSettingDataUpdate] = useState<any>(null);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);

  useEffect(() => {
    getSettingData();
  }, []);

  const getSettingData = () => {
    ConfigSetting.getSetting().then((data: any) => {
      if (data.status === 'success') {
        setSettingDataUpdate(data.setting);
        var convertData = Object.entries(data.setting).map((entry) => {
          return { [entry[0]]: entry[1] };
        });
        const dataSetting: any = [];
        convertData.forEach((item: any) => {
          const settingNameLength = Object.keys(item).toString().split('_').length;
          let name = Object.keys(item).toString();
          for (let index = 0; index < settingNameLength; index++) {
            name = name.replace('_', ' ');
          }

          const dataRes = { setting: name.toUpperCase(), value: Object.values(item).toString() };
          dataSetting.push(dataRes);
        });
        console.log(dataSetting);

        setSettingData(dataSetting);
      }
    });
  };

  const onFinishUpdate = (value: any) => {
    ConfigSetting.updateSetting(value).then((data: any) => {
      if (data.status === 'success') {
        notificationController.success({
          message: 'Update Setting Success',
        });
        setIsOpenEdit(false);
        getSettingData();
      } else {
        notificationController.error({
          message: data.message,
        });
      }
    });
  };

  const columns: any = [
    {
      title: 'Setting',
      dataIndex: 'setting',
      width:'500px'
    },
    {
      title: 'Value',
      dataIndex: 'value',
      width:'200px'
    },
  ];

  return (
    <>
      <PageTitle>Page Configuration</PageTitle>
      <S.Card title={<h1>Page Configuration</h1>} extra={<Button onClick={() => setIsOpenEdit(true)}>Edit</Button>}>
        <Table columns={columns} dataSource={settingData} pagination={false} bordered />
      </S.Card>
      {/* <Table columns={columns} dataSource={settingData} pagination={false} bordered /> */}
      <Modal
        title="Update Setting"
        visible={isOpenEdit}
        onCancel={() => setIsOpenEdit(false)}
        footer={[
          <>
            <Button onClick={() => setIsOpenEdit(false)}>Close</Button>
            <Button type="primary" className="btn btn-primary" form="updateSetting" key="submit" htmlType="submit">
              Save changes
            </Button>
          </>,
        ]}
      >
        <Form
          name="updateSetting"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={settingDataUpdate}
          onFinish={onFinishUpdate}
        >
          <Form.Item label="Bonus Over 500" name="bonus_over_500">
            <InputNumber style={{ width: 200, marginLeft: '10px' }} min={0} />
          </Form.Item>
          <Form.Item label="Bonus Under 500" name="bonus_under_500">
            <InputNumber style={{ width: 200, marginLeft: '10px' }} min={0} />
          </Form.Item>
          <Form.Item label="User Thread" name="user_thread">
            <InputNumber style={{ width: 200, marginLeft: '10px' }} min={0} />
          </Form.Item>
          <Form.Item label="Max Thread" name="max_thread">
            <InputNumber style={{ width: 200, marginLeft: '10px' }} min={0} />
          </Form.Item>
          <Form.Item label="Max Minute" name="max_minute">
            <InputNumber style={{ width: 200, marginLeft: '10px' }} min={0} />
          </Form.Item>
          <Form.Item label="Channel Prior" name="channel_prior">
            <InputNumber style={{ width: 200, marginLeft: '10px' }} min={0} />
          </Form.Item>
          <Form.Item label="Price Rate" name="price_rate">
            <InputNumber style={{ width: 200, marginLeft: '10px' }} min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ConfigPage;
