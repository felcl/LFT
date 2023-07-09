const defaultStates = {
    token: '',
    address: '',
    slippage: '0.3',
};

export default (previousState = defaultStates, action) => {
    if(action.type === 'SETTOKEN'){
        return {
            ...previousState,
            token:action.token,
            address:action.address
        }
    }
    if(action.type === 'SETSLIPPAGE'){
        return {
            ...previousState,
            slippage:action.slippage,
        }
    }
    return previousState;
}