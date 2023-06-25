import Web3 from "web3"
import {ContractAddress,ABI} from './config'
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