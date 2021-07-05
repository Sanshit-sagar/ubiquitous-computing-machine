import React, { cloneElement } from 'react'

import { GlobalStore } from './GlobalStore'
import { NewSlugStore } from './NewSlugStore'

const providers = [ 
  <GlobalStore.Provider />, 
  <NewSlugStore.Provider /> 
];

const Store = ({ children: initial }) =>
  providers.reduce((children, parent) => cloneElement(parent, { children }), initial)

export { Store, GlobalStore, NewSlugStore }
