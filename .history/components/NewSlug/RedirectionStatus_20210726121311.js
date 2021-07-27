import React, { useState, useContext, useEffect } from 'react'

import { useRadioGroupState } from '@react-stately/radio';

import { styled } from '@stitches/react'
import { InputElementCardWrapper } from './index'
import { NewSlugStore } from '../../store'
import { 
    Accordion, 
    AccordionItem, 
    AccordionTrigger, 
    AccordionContent 
} from '../../primitives/Accordion'
import {
    Checkbox, 
    CheckboxIndicator 
} from '../../primitives/Checkbox'
import { CheckIcon } from '@radix-ui/react-icons';
import { dispatchValidationUpdate } from '../../lib/dispatchers'
import { violet, blackA } from '@radix-ui/colors'

import toast from 'react-hot-toast'

let statusItems = [
    {
        code: '301',
        name: 'Moved Permanently',
        permanence: 'Permanent',
        cacheable: 'yes',
        methods: 'GET or POST',
        description: 'redirects permanently from one URL to another passing link equity to the redirected page',
        disabled: false,
        index: 1,
    },
    {
        code: '303',
        name: 'See Other (since HTTP/1.1)',
        permanence: 'Temporary',
        cacheable: 'never',
        methods: 'Always GET',
        description: 'forces a GET request to the new URL even if original request was POST',
        disabled: false,
        index: 3,
    },
    {
        code: '305',
        name: 'Use Proxy (since HTTP/1.1)',
        permanence: '',
        cacheable: '',
        methods: '',
        description: 'The requested resource is available only through a proxy. Wont work in Mozilla and IE.',
        disabled: true,
        index: 4,
    },
    {
        code: '307',
        name: 'Temporary Redirect (since HTTP/1.1)',
        permanence: 'Temporary',
        cacheable: 'not by default',
        methods: 'Mirrors the incoming requests HTTP method',
        description: 'provides a new URL for the browser to resubmit a GET or POST request',
        disabled: false,
        index: 5,
    },
    {
        code: '308',
        name: 'Permanent Redirect (RFC 7538)',
        permanence: 'Permanent',
        cacheable: 'yes, by default',
        methods: 'Mirrors the incoming requests HTTP method',
        description: 'provides a new URL for the browser to resubmit a GET or POST request',
        disabled: false,
        index: 6,
    }
];

const Flex = styled('div', { 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'flex-start'
});

const Label = styled('label', {
    color: 'black',
    fontSize: '14px',
    lineHeight: 1,
    userSelect: 'none',
});

const Box = styled('div', {});

const Text = styled('div', {
  color: '#000',
  fontSize: '14px',
  fontWeight: 'light',
  lineHeight: 1,
  marginBottom:  '20px',
});

const HttpStatusCheckbox = ({ label, selected, handleSelectionChange, isDisabled, name, value, index }) => (
    <Flex css={{ alignItems: 'center' }}>
      <Checkbox 
        disabled={isDisabled}
        name={label}
        value={value}
        id={index}
        checked={selected} 
        onCheckedChange={() => handleSelectionChange(`${value}`)} 
    >
        <CheckboxIndicator>
          <CheckIcon />
        </CheckboxIndicator>
      </Checkbox>
      <Label css={{ paddingLeft: 15 }} htmlFor="c1">
        {label}
      </Label>
    </Flex>
);

// const AccordionContentItems = ({ description }) => {
//     if(!description || !description?.length) return <span> N/A </span>;
    
//     let needsEllipses = description?.length >= 100;
//     return (
//         <span className="text-sm font-extralight">
//             Description: {description.substring(0, 100)}{needsEllipses ? '...' : ''}
//         </span>
//     );
// }

// const RadioAccordion = () => {
//     const state = useContext(NewSlugStore.State)
//     const dispatch = useContext(NewSlugStore.Dispatch)

//     const [selected, setSelected] = useState('301')

//     const handleSelectionChange = (updatedSelection) => {
//         setSelected(updatedSelection);
//         toast.success(`Visitors will be re-routed with HTTP ${updatedSelection}`)
//     }

//     useEffect(() => {
//         let validationKey = 'routingStatus';
//         let isValidValue = true;

//         dispatchValidationUpdate({ validationKey, isValidValue, state, dispatch })
//     }, [selected])

//     return (
//         <Box>
//             <Text> 
//                 Please choose one HTTP status code from the following options (defaults to 301)
//             </Text>
//             <Accordion type="single" defaultValue="item-1" collapsible>
//                 {statusItems.map(function(value, index) {
//                     if(value.disabled) return null;
//                     let isSelected = selected===`${value.code}`;
//                     return (
//                             <AccordionItem 
//                                 key={index} 
//                                 value={value.code}
//                             >
//                                 <div style={{ 
//                                         backgroundColor: isSelected ? `${violet.violet12}` : 'white', 
//                                         color: isSelected ? '#fff' : `${blackA.blackA10}` 
//                                     }}
//                                 >
//                                     <AccordionTrigger>
                                
//                                         <HttpStatusCheckbox 
//                                             label={
//                                                 <span>
//                                                     <span className={isSelected ? "text-xs font-light text-white" : "text-xs font-light"}>
//                                                         {value.code}
//                                                     </span>
//                                                     <span className={isSelected ? "text-xs font-extralight ml-3 text-white" : "text-xs font-extralight ml-3"}>
//                                                         {value.name}
//                                                     </span>
//                                                 </span>
//                                             }
//                                             selected={selected===`${value.code}`}
//                                             handleSelectionChange={handleSelectionChange}
//                                             isDisabled={value.disabled}
//                                             name={value.name}
//                                             value={value.code}
//                                             index={value.index}
//                                         /> 
//                                     </AccordionTrigger>

//                                     <AccordionContent>
//                                         <AccordionContentItems description={value.description} />
                                        
//                                     </AccordionContent>
//                                 </div>
//                             </AccordionItem>
//                     );
//                 })}
//             </Accordion>
//         </Box>
//     );
// }

function RadioGroup(props) {
  let {children, label} = props;
  let state = useRadioGroupState(props);
  let {radioGroupProps, labelProps} = useRadioGroup(props, state);

  return (
    <div {...radioGroupProps}>
      <span {...labelProps}>{label}</span>
      <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
    </div>
  );
}

function Radio(props) {
  let {children} = props;
  let state = React.useContext(RadioContext);
  let ref = React.useRef(null);
  let {inputProps} = useRadio(props, state, ref);

  return (
    <label style={{display: 'block'}}>
      <input {...inputProps} ref={ref} />
      {children}
    </label>
  );
}


const DestinationUrl = ({ mutate }) => {
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)
    const [selected, setSelected] = useState('303')

    const updateSelection = (updatedSelection) => {
        setSelected([...updatedSelection])
    }

    return (
        <div className="w-full flex-col justify-start align-stretch">
            <InputElementCardWrapper
                title='HTTP Status Code'
                description={'Select the HTTP Status Code that should be used to re-direct visitors'}
                children={<RadioAccordion />}
            />
        </div>
    );
}

export default DestinationUrl