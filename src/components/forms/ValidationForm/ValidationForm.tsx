import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { InputNumber } from '@app/components/common/inputs/InputNumber/InputNumber';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Switch } from '@app/components/common/Switch/Switch';
import { Radio, RadioButton, RadioGroup } from '@app/components/common/Radio/Radio';
import { Slider } from '@app/components/common/Slider/Slider';
import { Upload, UploadDragger } from '@app/components/common/Upload/Upload';
import { Rate } from '@app/components/common/Rate/Rate';
import { Checkbox, CheckboxGroup } from '@app/components/common/Checkbox/Checkbox';
import { notificationController } from '@app/controllers/notificationController';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ConfigSetting from './FormService';

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const normFile = (e = { fileList: [] }) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
interface DBProps {
  getnew: any;
}

export const ValidationForm: React.FC<DBProps> = ({ getnew }) => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [content, setContent] = useState('false');

  const [form] = BaseForm.useForm();

  const { t } = useTranslation();

  const onFinish = async (values = {}) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFieldsChanged(false);
      notificationController.success({ message: 'Upload success' });
      console.log(values);
    }, 1000);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    setLoading(true);

    let idCardBase64 = '';

    await getBase64(fileList, (result: string) => {
      idCardBase64 = result.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

      ConfigSetting.upLoadPost(content, idCardBase64).then((data: any) => {
        if (data.status === 200) {
          setTimeout(() => {
            setLoading(false);
            setFieldsChanged(false);
            getnew();
            notificationController.success({ message: 'Upload success' });
          }, 1000);
        }
      });
    });
  };

  const getBase64 = async (file: any, cb: any) => {
    console.log('file: ', file);
    let reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  return (
    <BaseForm form={form} layout="vertical" name="contentForm">
      <BaseForm.Item name="Content" label="Content" rules={[{ required: true, message: t('common.requiredField') }]}>
        <Input onChange={(event) => setContent(event.target.value)} />
      </BaseForm.Item>
      <BaseForm.Item name="image" label="Attach Image" rules={[{ required: true, message: t('common.requiredField') }]}>
        <Upload name="logo" {...props} listType="picture-card">
          <Button type="default" disabled={fileList.length > 1}>
            <UploadOutlined />
          </Button>
        </Upload>
        <Button
          type="default"
          onClick={handleUpload}
          disabled={fileList.length === 0 || isLoading}
          loading={uploading}
          style={{ marginTop: 16, width: '100%' }}
        >
          Upload Post
        </Button>
      </BaseForm.Item>
    </BaseForm>
  );
};
