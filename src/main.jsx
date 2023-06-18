import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { WagmiConfig } from 'wagmi'
import {Provider} from "react-redux"; // 引入Provider组件
import { store, persistor } from './store'
import { config } from './wagmi'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <WagmiConfig config={config}>
            <App />
          </WagmiConfig>
        </PersistGate>
      </Provider>
  // </React.StrictMode>,
)
