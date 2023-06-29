import Web3 from "web3"
import { InjectedConnector, NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {ContractAddress, ABI, networkConf, ChainId} from './config'
import { useCallback, useMemo } from 'react'
let web3 = null
export const contract = {}
export function contractInit (){
    var web3Provider
    if (window.ethereum) {
        web3Provider = window.ethereum
        web3 = new Web3(web3Provider)
        for (const key in ContractAddress) {
            // //console.log(key,contractAddress[key])
            contract[key]= new web3.eth.Contract(
                ABI[key],
                ContractAddress[key]
            )
        }
    }
}
// react-web3允许连接的链
export const injected = new InjectedConnector({
    supportedChainIds: [ChainId.ARB],
})
export const changeNetwork = (chainId) => {
    return new Promise(reslove => {
        const { ethereum } = window
        if (ethereum && ethereum.isMetaMask && networkConf[chainId]) {
            try {
                ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: networkConf[chainId].chainId }],
                }).then(()=>{
                    reslove()
                })
            } catch (error) {
                ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [
                        {
                            ...networkConf[chainId]
                        }
                    ],
                }).then(() => {
                    setTimeout(reslove, 500)
                })
            }
        } else {
            reslove()
        }
    })
}
export const useConnectWallet = (autoConnect) => {
    const { activate, deactivate, active } = useWeb3React()
    const connectWallet = useCallback((connector, chainId) => {
        return changeNetwork(chainId).then(() => {
            return activate(connector, undefined, true)
                .then(() => {
                    if (window.ethereum && window.ethereum.on) {
                        // 监听钱包事件
                        // const { ethereum } = window
                        window.ethereum.on('accountsChanged', (accounts) => {
                            if (accounts.length === 0) {
                                // 无账号，则代表锁定了,主动断开
                                deactivate()
                            }
                            // 账号改了，刷新网页
                            // window.location.reload()
                        })

                        window.ethereum.on('disconnect', () => {
                            // 断开连接
                            deactivate()
                        })

                        // window.ethereum.on('message', message => {
                        //     console.log('message', message)
                        // })

                    }
                })
                .catch((error) => {
                    switch (true) {
                        case error instanceof UnsupportedChainIdError:
                            // console.log('链错了')
                            break
                        case error instanceof NoEthereumProviderError:
                            // console.log('不是钱包环境')
                            break
                        case error instanceof UserRejectedRequestError:
                            // console.log('用户拒绝连接钱包')
                            break
                        default:
                            console.log(error)
                    }
                })
        })
        // eslint-disable-next-line
    }, [])
    useMemo(() => {
        // 首次尝试连接
        !active  && autoConnect && connectWallet(injected, ChainId.ARB)
        // window.ethereum && window.ethereum.on('networkChanged', () => {
            // 切换网络后，尝试连接
            // !active && connectWallet(injected, ChainId.BSC)
        // })
        // eslint-disable-next-line
    }, [])
    return connectWallet
}
function verifyExistence (contractName){
    if(contract[contractName]){
        return contract[contractName]
    }else{
        if(! web3){
            var web3Provider
            if (window.ethereum) {
                web3Provider = window.ethereum
                web3 = new Web3(web3Provider)
            }else{
                return new Error('no suitable environment')
            }
        }
        contract[contractName] = new web3.eth.Contract(
            ABI[contractName],
            ContractAddress[contractName]
        )
        return contract[contractName]
    }
}
/* 获取汇率 */
export function getReserves(){
    if(verifyExistence('Swap')){
        return contract.Swap.methods.getReserves().call()
    }else{
        return Promise.reject('contract Uninitialized')
    }
}
/* 获取输出数量 */
export function getAmountOut(amountIn,reserveIn,reserveOut){
    if(verifyExistence('Swap')){
        return contract.Swap.methods.getAmountOut(amountIn,reserveIn,reserveOut).call()
    }else{
        return Promise.reject('contract Uninitialized')
    }
}
/* 获取输入数量 */
export function getAmountIn(amountOut,reserveIn,reserveOut){
    if(verifyExistence('Swap')){
        return contract.Swap.methods.getAmountIn(amountOut,reserveIn,reserveOut).call()
    }else{
        return Promise.reject('contract Uninitialized')
    }
}
/* 购买LFT */
export function swapBuy(address,amountIn,amountOutMin,deadline){
    if(verifyExistence('Swap')){
        return contract.Swap.methods.swapBuy(amountIn,amountOutMin,deadline).send({
            from:address
        })
    }else{
        return Promise.reject('contract Uninitialized')
    }
}
/* 售卖LFT */
export function swapSell(address,amountIn,amountOutMin,deadline){
    if(verifyExistence('Swap')){
        return contract.Swap.methods.swapSell(amountIn,amountOutMin,deadline).send({
            from:address
        })
    }else{
        return Promise.reject('contract Uninitialized')
    }
}
/* 获取LFT余额 */
export function getLFTBalance(address){
    if(verifyExistence('LFT')){
        return contract.LFT.methods.balanceOf(address).call({
            from:address
        })
    }else{
        return Promise.reject('contract Uninitialized')
    }
}
/* 获取LFT授权额度 */
export function getLftAllowance(address,toAddress){
    if(verifyExistence('LFT')){
        return contract.LFT.methods.allowance(address, toAddress).call()
    }else{
        return Promise.reject('contract Uninitialized')
    }
}
/* LFT授权 */
export function LftApprove(address,toAddress,amount){
    if(verifyExistence('LFT')){
        return contract.LFT.methods.approve(toAddress, amount).send({
            from:address
        })
    }else{
        return Promise.reject('contract Uninitialized')
    }
}
/* 获取USDT授权额度 */
export function getUsdtAllowance(address,toAddress){
    if(verifyExistence('USDT')){
        return contract.USDT.methods.allowance(address, toAddress).call()
    }else{
        return Promise.reject('contract Uninitialized')
    }
}
/* 获取USDT余额 */
export function getUSDTBalance(address){
    if(verifyExistence('USDT')){
        return contract.USDT.methods.balanceOf(address).call({
            from:address
        })
    }else{
        return Promise.reject('contract Uninitialized')
    }
}
/* USDT授权 */
export function USDTApprove(address,toAddress,amount){
    if(verifyExistence('USDT')){
        return contract.USDT.methods.approve(toAddress, amount).send({
            from:address
        })
    }else{
        return Promise.reject('contract Uninitialized')
    }
}
/* 监听LFT事件 */
export function subscribeLFT(EventName,callback){
    if(verifyExistence('LFT')){
        return contract.LFT.events[EventName]({
            filter: {},
            fromBlock: "latest",
          }).on("data",callback)
    }else{
        return Promise.reject('contract Uninitialized')
    }
}
/* LFT质押 */
export function stake(address,data){
    if(verifyExistence('Pool')){
        return contract.Pool.methods.stake(data).send({
            from:address
        })
    }else{
        return Promise.reject('contract Uninitialized')
    }
}
/* LFT提现 */
export function drawToken(address,data){
    if(verifyExistence('Pool')){
        return contract.Pool.methods.drawToken(data).send({
            from:address
        })
    }else{
        return Promise.reject('contract Uninitialized')
    }
}