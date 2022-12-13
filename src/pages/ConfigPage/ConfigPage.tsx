import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'antd';
import { AutoComplete } from 'components/common/AutoComplete/AutoComplete';
import { SearchInput as CommonSearchInput } from 'components/common/inputs/SearchInput/SearchInput';
import { Option } from 'components/common/selects/Select/Select';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import ConfigSetting from './ConfigService';

const ConfigPage: React.FC = () => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [result, setResult] = useState<string[]>([]);
  const [settingData, setSettingData] = useState<any>(null);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);

  useEffect(() => {
    ConfigSetting.getSetting().then((data: any) => {
      if (data.status === 'success') {
        setSettingData(data.setting);
      }
    });
  }, []);

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
        title={t('modals.basic')}
        visible={isOpenEdit}
        onOk={() => setIsOpenEdit(false)}
        onCancel={() => setIsOpenEdit(false)}
      >
        <p>{t('modals.someContent')}</p>
        <p>{t('modals.someContent')}</p>
        <p>{t('modals.someContent')}</p>
      </Modal>
    </>
  );
};

export default ConfigPage;
