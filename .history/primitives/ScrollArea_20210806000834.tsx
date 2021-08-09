
import React from 'react'
import * as ScrollArea from './ScrollArea';
import { css } from '../stiches.config'


const SCROLLBAR_SIZE = 8;

const RECOMMENDED_CSS__SCROLLAREA__ROOT: any = {
  width: '100%',
  height: '100%',
};

const scrollAreaClass = css({
    ...RECOMMENDED_CSS__SCROLLAREA__ROOT,
    border: '1px solid black',
  });
  
  const RECOMMENDED_CSS__SCROLLAREA__VIEWPORT: any = {
    width: '100%',
    height: '100%',
  };
  
  const scrollAreaViewportClass = css({
    ...RECOMMENDED_CSS__SCROLLAREA__VIEWPORT,
  });
  
  const RECOMMENDED_CSS__SCROLLBAR__ROOT: any = {
    display: 'flex',
    // ensures no selection
    userSelect: 'none',
    // disable browser handling of all panning and zooming gestures on touch devices
    touchAction: 'none',
  };
  
  const scrollbarClass = css({
    ...RECOMMENDED_CSS__SCROLLBAR__ROOT,
    transition: 'background 160ms ease-out',
    padding: 2,
    background: 'rgba(0, 0, 0, 0.3)',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.5)',
    },
    '&[data-orientation="vertical"]': {
      width: SCROLLBAR_SIZE,
    },
    '&[data-orientation="horizontal"]': {
      flexDirection: 'column',
      height: SCROLLBAR_SIZE,
    },
  });
  
  const RECOMMENDED_CSS__SCROLLBAR__THUMB: any = {
    flex: 1,
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
      minWidth: 44,
      minHeight: 44,
    },
  };
  
  const thumbClass = css({
    ...RECOMMENDED_CSS__SCROLLBAR__THUMB,
    background: 'black',
    borderRadius: SCROLLBAR_SIZE,
  });
  
  const cornerClass = css({
    background: 'rgba(0, 0, 0, 0.3)',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'black',
      width: SCROLLBAR_SIZE,
      height: SCROLLBAR_SIZE,
      borderRadius: SCROLLBAR_SIZE,
    },
  });

const ScrollAreaStory = ({ children, vertical = true, horizontal = true, ...props }: any) => (
    <ScrollArea.Root
      {...props}
      className={scrollAreaClass}
      style={{ width: 200, height: 200, ...props.style }}
    >
      <ScrollArea.Viewport className={scrollAreaViewportClass}>{children}</ScrollArea.Viewport>
      {vertical && (
        <ScrollArea.Scrollbar className={scrollbarClass} orientation="vertical">
          <ScrollArea.Thumb className={thumbClass} />
        </ScrollArea.Scrollbar>
      )}
      {horizontal && (
        <ScrollArea.Scrollbar className={scrollbarClass} orientation="horizontal">
          <ScrollArea.Thumb className={thumbClass} />
        </ScrollArea.Scrollbar>
      )}
      <ScrollArea.Corner className={cornerClass} />
    </ScrollArea.Root>
);

export const Basic = () => {
    const [props, setProps] = React.useState({} as any);
    return (
      <>
        <div style={{ margin: '20px auto', width: 'max-content', textAlign: 'center' }}>
          <form
            onChange={(event) => {
              const formData = new FormData(event.currentTarget);
              const entries = (formData as any).entries();
              const cleanup = [...entries].map(([key, value]: any) => [key, value || undefined]);
              const props = Object.fromEntries(cleanup);
              setProps(props);
            }}
          >
            <label>
              type:{' '}
              <select name="type">
                <option></option>
                <option>always</option>
                <option>auto</option>
                <option>scroll</option>
                <option>hover</option>
              </select>
            </label>{' '}
            <label>
              dir:{' '}
              <select name="dir">
                <option></option>
                <option>ltr</option>
                <option>rtl</option>
              </select>
            </label>{' '}
            <label>
              scrollHideDelay: <input type="number" name="scrollHideDelay" />
            </label>
          </form>
        </div>
  
        <ScrollAreaStory
          {...props}
          key={props.type}
          style={{ width: 800, height: 800, margin: '30px auto' }}
        >
          {Array.from({ length: 30 }).map((_, index) => (
            <Copy key={index} />
          ))}
        </ScrollAreaStory>
      </>
    );
  };
  