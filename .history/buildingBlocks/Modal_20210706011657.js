import {
  IconAlertCircle,
  Button,
  IconTrash,
  IconCheck,
  Modal,
  Space,
  Typography,
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
        onCancel={toggle}
        onConfirm={toggle}
        customFooter={[
          <Space style={{ width: "100%" }}>
            <Button size="medium" block type="secondary">
              Cancel
            </Button>
            <Button size="medium" block danger icon={<IconTrash />}>
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
            <Button size="medium" block icon={<IconCheck />}>
              Confirm
            </Button>
          </Space>,
        ]}
      />
    </>
  );
}

function InfoModal(props) {
  const { visible, toggle } = props

  return (
    <>
      <Modal
        size="small"
        layout="vertical"
        title="Modal with vertical layout"
        description="Description of modal"
        visible={visible}
        onCancel={() => toggle()}
        onConfirm={() => toggle()}
        icon={
          <IconAlertCircle 
            background="brand" 
            size="xlarge" 
          />
        }
      />
    </>
  );
}

export default InfoModal