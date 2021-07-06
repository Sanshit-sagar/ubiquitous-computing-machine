import {
  IconAlertCircle,
  Button,
  IconTrash,
  IconCheck,
  Modal,
  Space,
  Typography,
  IconDatabase,
  IconExternalLink,
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
              Done
            </Button>
          </Space>,
        ]}
      />
    </>
  );
}

function sanitize(text, len) {
  return `${text.substring(0, len)}...`; 
}

function InfoModal(props) {
  const { visible, toggle, data, setData } = props

  return (
    <>
      <Modal
        size="medium"
        layout="vertical"
        title={!data ? 'Slug Info' : data.slug || 'Slug Details'}
        description={!data ? '' : 
          <div className="inline-flex justify-start align-center text-blue-800">
              <a href={data.url || data.destination}>
                {sanitize(data.url, 25) || sanitize(data.destination.substring, 25)}
              </a>
              <IconExternalLink className="h-6 w-6 text-blue-500" />
          </div>
        }
        visible={visible}
        onCancel={() => {
          toggle()
          setData({
            title: 'N/A'
          })
        }}
        onConfirm={() => {
          toggle()
          setData({
            title: 'N/A',
            prev: data.slug || data.url || data.destination || 'N/A'
          })
        }}
        // icon={
        //   <IconDatabase 
        //     background="brand" 
        //     size="medium" 
        //   />
        // }
      >
      
        <p> Slug: {data.slug} </p>
        <p> Expiry: {data.config.ttl} </p>
        <p> Routing Status: {data.config.routingStatus} </p> 
        <p> SEO Tags: {data.config.seoTags.length} </p>
        <p> Blacklist: {data.config.blacklist.length} </p>
      </Modal>
    </>
  );
}

export default InfoModal