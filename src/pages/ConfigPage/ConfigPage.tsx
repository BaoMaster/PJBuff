import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputNumber, Modal, Row } from 'antd';
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

const ConfigPage: React.FC = () => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [result, setResult] = useState<string[]>([]);
  const [settingData, setSettingData] = useState<any>(null);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);

  useEffect(() => {
    getSettingData();
  }, []);

  const getSettingData = () => {
    ConfigSetting.getSetting().then((data: any) => {
      if (data.status === 'success') {
        setSettingData(data.setting);
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
      }else{
        notificationController.error({
          message: data.message,
        });
      }
    });
  };

  return (
    <>
      <PageTitle>Page Configuration</PageTitle>
      <Col>
        <S.Card title="Page Configuration" extra={<Button onClick={() => setIsOpenEdit(true)}>Edit</Button>}>
          <Row style={{ width: '100%' }}>
            <Col md={6}>
              <label>Bonus like over 500: </label>
            </Col>
            <Col>
              <label>{settingData?.bonus_like_over_500}</label>
            </Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col md={6}>
              <label>Bonus like under 500: </label>
            </Col>
            <Col>
              <label>{settingData?.bonus_like_under_500}</label>
            </Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col md={6}>
              <label>Bonus over 500: </label>
            </Col>
            <Col>
              <label>{settingData?.bonus_over_500}</label>
            </Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col md={6}>
              <label>Bonus under 500: </label>
            </Col>
            <Col>
              <label>{settingData?.bonus_under_500}</label>
            </Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col md={6}>
              <label>Max Minute: </label>
            </Col>
            <Col>
              <label>{settingData?.max_minute}</label>
            </Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col md={6}>
              <label>Max Thread: </label>
            </Col>
            <Col>
              <label>{settingData?.max_thread}</label>
            </Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col md={6}>
              <label>Price Rate: </label>
            </Col>
            <Col>
              <label>{settingData?.price_rate}</label>
            </Col>
          </Row>
          <Row style={{ width: '100%' }}>
            <Col md={6}>
              <label>User Thread: </label>
            </Col>
            <Col>
              <label>{settingData?.user_thread}</label>
            </Col>
          </Row>
        </S.Card>
      </Col>
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
          initialValues={settingData}
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
