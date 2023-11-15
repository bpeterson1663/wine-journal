import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './features/store'
import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/carousel/styles.css'
import '@mantine/notifications/styles.css'

import './index.css'

const theme = createTheme({
  fontFamily: 'Lexend Deca',
  primaryColor: 'cyan'
  /** Put your mantine theme override here */
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <MantineProvider theme={ theme } defaultColorScheme="dark">
          <Notifications position="top-right" zIndex={ 1000 } />
          <App />
        </MantineProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
