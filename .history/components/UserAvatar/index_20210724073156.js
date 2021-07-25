import * as Avatar from '@radix-ui/react-avatar';
import * as Tooltip from '@radix-ui/react-tooltip';

const UserAvatar = () => (
  <Tooltip.Root>
    <Tooltip.Trigger>
      <Avatar.Root>

      </Avatar.Root>
    </Tooltip.Trigger>

    <Tooltip.Content side="top">
      Tooltip content
      <Tooltip.Arrow />
    </Tooltip.Content>
  </Tooltip.Root>
);

export default UserAvatar