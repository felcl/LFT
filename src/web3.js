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
export function getReserves(){
    if(verifyExistence('Swap')){
        return contract.Swap.methods.getReserves().call()
    }else{
        return Promise.reject('contract Uninitialized')
    }
}
export function getLftAllowance(address,toAddress){
    if(verifyExistence('LFT')){
        return contract.LFT.methods.allowance(address, toAddress).call()
    }else{
        return Promise.reject('contract Uninitialized')
    }
}
export function LftApprove(address,toAddress,amount){
    if(verifyExistence('LFT')){
        return contract.LFT.methods.approve(toAddress, amount).send({
            from:address
        })
    }else{
        return Promise.reject('contract Uninitialized')
    }
}
export function getUsdtAllowance(address,toAddress){
    if(verifyExistence('USDT')){
        return contract.USDT.methods.allowance(address, toAddress).call()
    }else{
        return Promise.reject('contract Uninitialized')
    }
}