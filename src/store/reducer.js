const defaultStates = {
    token: '',
    address: '',
};

export default (previousState = defaultStates, action) => {
    if(action.type === 'SETTOKEN'){
        return {
            ...previousState,
            token:action.token,
            address:action.address
        }
    }
    return previousState;
}