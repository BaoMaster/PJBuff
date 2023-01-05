import { Form, InputNumber, Modal } from 'antd';
import { Button } from 'components/common/buttons/Button/Button';
import { notificationController } from 'controllers/notificationController';
import UserManagementService from '../UserManagementService';

export const AddPointForm = (Props: any) => {
  const onFinishAddPoint = (value: any) => {
    console.log(value);
    const data = { user_id: Props.userId, point: value.point };
    UserManagementService.addPoint(data).then((res: any) => {
      if (res.status === 'success') {
        notificationController.success({
          message: 'Add Point Success',
        });
        Props.closeModal();
      } else {
        notificationController.error({
          message: res.message,
        });
      }
    });
  };

  return (
    <>
      <Modal
        title="Add Point"
        visible={Props.isOpen}
        onCancel={() => Props.closeModal()}
        footer={[
          <>
            <Button style={{ display: 'inline' }} onClick={() => Props.closeModal()}>
              Close
            </Button>
            <Button
              style={{ display: 'inline' }}
              type="primary"
              className="btn btn-primary"
              form="addPoint"
              key="submit"
              htmlType="submit"
            >
              Add
            </Button>
          </>,
        ]}
      >
        <Form name="addPoint" labelCol={{ span: 2 }} wrapperCol={{ span: 20 }} onFinish={onFinishAddPoint}>
          <Form.Item label="Point" name="point" key="point">
            <InputNumber style={{ width: 400, marginLeft: '10px' }} min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
