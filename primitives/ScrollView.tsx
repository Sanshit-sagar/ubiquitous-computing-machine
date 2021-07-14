import { styled } from '@stitches/react';
import * as ScrollArea from '@radix-ui/react-scroll-area';

const SCROLLBAR_SIZE = 8;

const StyledScrollArea = styled(ScrollArea.Root, {
  width: '100%',
  height: '100%',
});

const StyledViewport = styled(ScrollArea.Viewport, {
  width: '100%',
  height: '100%',
});

const StyledScrollbar = styled(ScrollArea.Scrollbar, {
  display: 'flex',
  padding: 2,
  background: 'rgba(255, 255, 255, 0.3)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.3)',
  },
  transition: 'background 160ms ease-out',
  '&[data-orientation="vertical"]': {
    width: SCROLLBAR_SIZE,
  },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
});

const StyledThumb = styled(ScrollArea.Thumb, {
  flex: 1,
  background: 'white',
  borderRadius: SCROLLBAR_SIZE,
});

const StyledCorner = styled(ScrollArea.Corner, {
  background:'rgba(255, 255, 255, 0.3)',
});

const ScrollView = ({ slot }) => (
  <div style={{ height: 400 }}>
    <StyledScrollArea>
      <StyledViewport>
        <div
          style={{
            width: '100vw',
            height: 1000,
            backgroundColor: 'red'
          }}
        >
            {slot}
        </div>
      </StyledViewport>

      <StyledScrollbar orientation="vertical">
        <StyledThumb />
      </StyledScrollbar>

      <StyledScrollbar orientation="horizontal">
        <StyledThumb />
      </StyledScrollbar>

      <StyledCorner />
    </StyledScrollArea>
  </div>
);

export default ScrollView