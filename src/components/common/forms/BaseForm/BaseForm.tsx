import React, { ComponentProps } from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import { BaseFormItem } from '@app/components/common/forms/components/BaseFormItem/BaseFormItem';
import { BaseFormList } from '@app/components/common/forms/components/BaseFormList/BaseFormList';
import { notificationController } from '@app/controllers/notificationController';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseFormProps = Omit<ComponentProps<typeof Form>, 'onFinish'> & { onFinish?: (values: any) => void };

export interface BaseFormInterface<T> extends React.FC<T> {
  Title: typeof BaseFormTitle;
  Item: typeof BaseFormItem;
  List: typeof BaseFormList;
  useForm: typeof Form.useForm;
  Provider: typeof Form.Provider;
}

export const BaseForm: BaseFormInterface<BaseFormProps> = ({ onFinishFailed, layout = 'vertical', ...props }) => {
  const { t } = useTranslation();

  const onFinishFailedDefault = (error: ValidateErrorEntity<unknown>) => {
    notificationController.error({
      message: t('common.error'),
      description: error.errorFields[0].errors,
    });
  };
  const [form] = BaseForm.useForm();
  const submitForm = () => {
    form.resetFields();
  };
  return (
    <Form
      style={{ width: '100%' }}
      onFinishFailed={onFinishFailed || onFinishFailedDefault}
      layout={layout}
      {...props}
    />
  );
};

BaseForm.Title = BaseFormTitle;
BaseForm.Item = BaseFormItem;
BaseForm.List = BaseFormList;
BaseForm.useForm = Form.useForm;
BaseForm.Provider = Form.Provider;
