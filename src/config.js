import SwapABI from "./ABI/Swap.json"
import ERC20Token from "./ABI/ERC20Token.json"
import Pool from "./ABI/Pool.json"
export const baseURL = 'http://13.212.177.105:8999/'
export const ContractAddress = {
    Swap:'0x87A12A2CEb2A47Fbf4EF131273c921bCac9fE314',
    LFT:'0x1A26c71DEBa2f942fF5266cFe2f3076FcB2EB633',
    USDT:'0x62731B555E6233090533fD74ca28F3579C71320e',
    Pool:'0x5CD206d05fB1Ee2ed886c313706679973075628D',
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
    Pool:Pool,
}
export const ChainId = {
  ARB: 421613,
}

export const networkConf = {
  [ChainId.ARB]: {
    chainId: '0x66eed',
    chainName: 'Arbitrum Goerli',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: ['https://rpc.goerli.arbitrum.gateway.fm','https://arbitrum-goerli.publicnode.com','https://arbitrum-goerli.public.blastapi.io','https://endpoints.omniatech.io/v1/arbitrum/goerli/public'],
    blockExplorerUrls: ['https://arbiscan.io'],
  }
}