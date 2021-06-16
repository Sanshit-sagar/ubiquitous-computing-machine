import React, { cloneElement } from 'react'
import { GlobalStore } from './GlobalStore'

const providers = [ <GlobalStore.Provider /> ]

const Store = ({ children: initial }) =>
  providers.reduce((children, parent) => cloneElement(parent, { children }), initial)

export { Store, GlobalStore }
