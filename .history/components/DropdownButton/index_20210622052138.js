import React, { useState } from 'react'
import { Dropdown, DropdownItem, Badge, Button } from '@windmill/react-ui'

function DropdownButton() {
  const [isOpen, setIsOpen] = useState(false)
  function toggleDropdown() {
    setIsOpen(!isOpen)
  }
  return (
    <div className="relative">
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