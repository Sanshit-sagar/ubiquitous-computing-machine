import {
  IconAlertCircle,
  Button,
  IconTrash,
  IconCheck,
  Modal,
  Space,
  Typography,
  IconDatabase,
} from "@supabase/ui";

export const DangerModal = ({ visible, toggle }) => {
  return (
    <>
      <Modal
        size="small"
        layout="vertical"
        title="Custom footer with vertical layout"
        description="Description of modal"
        visible={visible}
        onCancel={() => toggle()}
        onConfirm={() => toggle()}
        customFooter={[
          <Space style={{ width: "100%" }}>
            <Button size="medium" block type="secondary" onClick={toggle}>
              Cancel
            </Button>
            <Button size="medium" block danger icon={<IconTrash />} onClick={toggle}>
              Delete
            </Button>
          </Space>,
        ]}
      >
        <Typography.Text type="secondary">
          Modal content is inserted here, if you need to insert anything into
          the Modal you can do so via
        </Typography.Text>
      </Modal>
    </>
  );
}

export const SuccessModal = ({ visible, toggle }) => {

  return (
    <>
      <Modal
        size="small"
        title="This modal is to confirm something"
        description="Description of modal"
        icon={<IconCheck background="brand" size="xxxlarge" />}
        visible={visible}
        onCancel={() => toggle()}
        onConfirm={() => toggle()}
        layout="vertical"
        customFooter={[
          <Space style={{ width: "100%" }}>
            <Button 
              size="medium" 
              block 
              icon={<IconCheck />}
              onClick={toggle}
            >
              Confirm
            </Button>
          </Space>,
        ]}
      />
    </>
  );
}

function InfoModal(props) {
  const { visible, toggle, title, data } = props

  return (
    <>
      <Modal
        size="small"
        layout="vertical"
        title={title}
        description={JSON.stringify(data)}
        visible={visible}
        onCancel={() => toggle()}
        onConfirm={() => toggle()}
        icon={
          <IconDatabase 
            background="brand" 
            size="medium" 
          />
        }
      />
    </>
  );
}

export default InfoModal