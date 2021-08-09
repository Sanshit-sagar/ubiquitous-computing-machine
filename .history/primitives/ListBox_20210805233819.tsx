

import * as React from "react";
import styled from "styled-components";
import { useOverlay, DismissButton, FocusScope } from "react-aria";
import type { AriaListBoxOptions } from "@react-aria/listbox";
import type { Node } from "@react-types/shared";
import type { ListState } from "react-stately";
import { useListBox, useOption } from "react-aria";
export { Item } from 'react-stately'


interface PopoverProps {
  popoverRef?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}


interface ListBoxProps extends AriaListBoxOptions<unknown> {
    listBoxRef?: React.RefObject<HTMLUListElement>;
    state: ListState<unknown>;
}
  
interface OptionProps {
    item: Node<unknown>;
    state: ListState<unknown>;
}
  
interface ListItemProps {
    isFocused?: boolean;
    isSelected?: boolean;
}

interface OptionContextValue {
    labelProps: React.HTMLAttributes<HTMLElement>;
    descriptionProps: React.HTMLAttributes<HTMLElement>;
}

const Wrapper = styled.div`
    position: absolute;
    top: 100%;
    z-index: 1;
    width: 100%;
    border: 1px solid lightgray;
    border-radius: 4px;
    margin-top: 6px;
    box-shadow: 0 4px 8px #eee;
    background: white;
`;

const StyledDescription = styled.div`
    font-weight: normal;
    font-size: 12px;
`;

const List = styled.ul`
    max-height: 300px;
    overflow: auto;
    list-style: none;
    padding: 0;
    margin: 4px 0;
    outline: none;
`;

const ListItem = styled.li<ListItemProps>`
    background: ${(props) => (props.isFocused ? "seagreen" : "")};
    color: ${(props) =>
    props.isFocused ? "white" : props.isSelected ? "seagreen" : "#333"};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 14px;
    font-weight: ${(props) => (props.isSelected ? "600" : "normal")};
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: default;
    outline: none;
`;

const ItemContent = styled.div`
    display: flex;
    align-items: center;
`;

export function Popover(props: PopoverProps) {
  let ref = React.useRef<HTMLDivElement>(null);
  let { popoverRef = ref, isOpen, onClose, children } = props;

  let { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      shouldCloseOnBlur: true,
      isDismissable: false
    },
    popoverRef
  );

  return (
    <FocusScope restoreFocus>
      <Wrapper {...overlayProps} ref={popoverRef}>
        {children}
        <DismissButton onDismiss={onClose} />
      </Wrapper>
    </FocusScope>
  );
}


export function ListBox(props: ListBoxProps) {
    let ref = React.useRef<HTMLUListElement>(null);
    let { listBoxRef = ref, state } = props;
    let { listBoxProps } = useListBox(props, state, listBoxRef);

    return (
        <List {...listBoxProps} ref={listBoxRef}>
            {[...state.collection].map((item) => (
                <Option key={item.key} item={item} state={state} />
            ))}
        </List>
    );
}
  
  const OptionContext = React.createContext<OptionContextValue>({
    labelProps: {},
    descriptionProps: {}
  });
  
  function Option({ item, state }: OptionProps) {
    let ref = React.useRef<HTMLLIElement>(null);
    let {
      optionProps,
      labelProps,
      descriptionProps,
      isSelected,
      isFocused
    } = useOption(
      {
        key: item.key
      },
      state,
      ref
    );
  
    return (
      <ListItem
        {...optionProps}
        ref={ref}
        isFocused={isFocused}
        isSelected={isSelected}
      >
        <ItemContent>
          <OptionContext.Provider value={{ labelProps, descriptionProps }}>
            {item.rendered}
          </OptionContext.Provider>
        </ItemContent>
        {isSelected && (
          <CheckIcon aria-hidden="true" />
        )}
      </ListItem>
    );
  }
  
  
  export function Label({ children }: { children: React.ReactNode }) {
    let { labelProps } = React.useContext(OptionContext);
    return <div {...labelProps}>{children}</div>;
  }
  
  export function Description({ children }: { children: React.ReactNode }) {
    let { descriptionProps } = React.useContext(OptionContext);
    return (
      <StyledDescription {...descriptionProps}>{children}</StyledDescription>
    );
  }
  