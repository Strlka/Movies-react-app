import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { ColorModeProvider } from "./components/ui/color-mode"
import { ChakraProvider } from "@chakra-ui/react"


import { system } from './components/theme';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <ColorModeProvider defaultTheme='dark'>
        <App />
      </ColorModeProvider>
    </ChakraProvider>
  </React.StrictMode>,
)


