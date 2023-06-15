import Web3 from "web3"
import {ContractAddress,ABI} from './config'

export const contract = {}
export function contractInit (){
    var web3Provider
    if (window.ethereum) {
        web3Provider = window.ethereum
        var web3 = new Web3(web3Provider)
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
        new Error('contract Uninitialized')
    }
}
export function getReserves(){
    if(verifyExistence('Swap')){
        return contract.Swap.methods.getReserves()
    }else{
        return Promise.reject('contract Uninitialized')
    }
}