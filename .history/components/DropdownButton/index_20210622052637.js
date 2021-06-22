import React, { useState } from 'react'
import { Dropdown, DropdownItem, Badge, Button } from '@windmill/react-ui'

function DropdownButton() {
  const [isOpen, setIsOpen] = useState(false)
  function toggleDropdown() {
    setIsOpen(!isOpen)
  }
  return (
    <div className="relative">
        <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
      <Button onClick={toggleDropdown} aria-label="Notifications" aria-haspopup="true">
        Open dropdown
      </Button>
      <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DropdownItem tag="a" href="#" className="justify-between">
          <span>Messages</span>
          <Badge type="danger">13</Badge>
        </DropdownItem>
        <DropdownItem onClick={() => alert('Alerts!')}>
          <span>Alerts</span>
        </DropdownItem>
      </Dropdown>
    </div>
  )
}

export default DropdownButton