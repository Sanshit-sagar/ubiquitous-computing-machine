import { styled } from '@stitches/react';
import { violet, mauve, blackA } from '@radix-ui/colors';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { darkTheme } from '../stiches.config'

const SCROLLBAR_SIZE = 10;

const StyledScrollArea = styled(ScrollAreaPrimitive.Root, {
  borderRadius: 4,
  overflow: 'hidden',
});

const StyledViewport = styled(ScrollAreaPrimitive.Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
});

const StyledScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  background: blackA.blackA6,
  transition: 'background 160ms ease-out',
  '&:hover': { background: blackA.blackA8 },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
});

const StyledThumb = styled(ScrollAreaPrimitive.Thumb, {
  flex: 1,
  background: mauve.mauve10,
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 60,
    minHeight: 60,
  },
});

const StyledCorner = styled(ScrollAreaPrimitive.Corner, {
  background: blackA.blackA8,
});

// Exports
const ScrollArea = StyledScrollArea;
const ScrollAreaViewport = StyledViewport;
const ScrollAreaScrollbar = StyledScrollbar;
const ScrollAreaThumb = StyledThumb;
const ScrollAreaCorner = StyledCorner;

const Box = styled('div', {});
const Text = styled('div', {
  color: violet.violet11,
  fontSize: 12,
  lineHeight: '18px',
  fontWeight: 500,
});

const ScrollView = ({ content }) => {
  
  return (
    <Box css={{ borderRadius: '5px', backgroundColor: '#efefef' }}>
      <ScrollArea style={{ width: '440px', height: '400px' }}>
        <ScrollAreaViewport css={{ backgroundColor: 'white' }}>
          <Box css={{ width: '97.5%', mt: '$1', mb: '$2', py: '$2', px: '$1' }}>
            {content}
          </Box>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaScrollbar orientation="horizontal">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollArea>
    </Box>
  );
}

export const TableScrollView = ({ content }) => {
  
  return (
    <Box css={{ borderRadius: '5px', backgroundColor: '#efefef' }}>
      <ScrollArea style={{ width: '1275px', height: '530px' }}>
        <ScrollAreaViewport css={{ backgroundColor: 'white' }}>
      
      <Box css={{ width: '100%', mt: '$1', mb: '$2', py: '$2', px: '$1', backgroundColor: darkTheme.colors.loContrast, color: darkTheme.colors.hiContrast }}>
        {content}
      </Box>
        </ScrollAreaViewport>

        <ScrollAreaScrollbar orientation="horizontal">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>

        <ScrollAreaCorner />
      </ScrollArea>
    </Box>
  );
}

const ScrollAreaPage = ({ content }) => {
  return (

    <ScrollArea style={{ width: '400px', height: '400px' }}>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>

      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>

      <ScrollAreaViewport style={{ width: '2000px', padding: 20 }}>
        { content }
      </ScrollAreaViewport>

      <ScrollAreaCorner />
    </ScrollArea>
  );
}

export default ScrollView