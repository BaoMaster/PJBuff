import { Modal } from 'antd';
import { Table } from 'components/common/Table/Table';
import { Button } from 'components/common/buttons/Button/Button';
import moment from 'moment';

export const PointHistory = (Prop: any) => {
  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Point',
      dataIndex: 'point',
      key: 'point',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Date Time',
      dataIndex: 'datetime',
      key: 'datetime',
      render: (_: any, value: any) => {
        const date = moment(value.datetime).format('DD-MM-YYYY HH:mm:ss')
        return (
          <span>{date}</span>
        )}
    },
  ];

  return (
    <>
      <Modal
        title="Point History"
        visible={Prop.isOpen}
        onCancel={() => Prop.closeModal()}
        footer={[
          <>
            <Button style={{ display: 'inline' }} onClick={() => Prop.closeModal()}>
              Close
            </Button>
          </>,
        ]}
        width={1000}
      >
        <Table columns={columns} dataSource={Prop.PointData} scroll={{ x: 800 }} bordered pagination={false}/>
      </Modal>
    </>
  );
};
