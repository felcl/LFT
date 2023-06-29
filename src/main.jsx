import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from "react-router-dom";
import App from './App.jsx'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
// import { WagmiConfig } from 'wagmi'
import {Provider} from "react-redux"; // 引入Provider组件
import { store, persistor } from './store'
// import { config } from './wagmi'
import './index.css'
import Vconsole from 'vconsole'
import './lang/index.js'
// const vConsole = new Vconsole()
function getLibrary(provider){
  const library = new Web3(provider);
  return library // this will vary according to whether you use e.g. ethers or web3.js
}
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <WagmiConfig config={config}> */}
          <Web3ReactProvider getLibrary={getLibrary}>
            <HashRouter>
              <App />
            </HashRouter>
          </Web3ReactProvider>
          {/* </WagmiConfig> */}
        </PersistGate>
      </Provider>
  // </React.StrictMode>,
)
