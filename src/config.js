import SwapABI from "./ABI/Swap.json"
import ERC20Token from "./ABI/ERC20Token.json"
export const ContractAddress = {
    Swap:'0x39713EF3cde3dC8454b3cDBEeCeC92c4c461ce95',
    LFT:'0x1A26c71DEBa2f942fF5266cFe2f3076FcB2EB633',
    USDT:'0x62731B555E6233090533fD74ca28F3579C71320e',
}
export const TokenConfig = {
    USDT: {
      decimals: 6,
    },
    LFT: {
      decimals: 18,
    },
  };
export const ABI={
    Swap:SwapABI,
    LFT:ERC20Token,
    USDT:ERC20Token,
}