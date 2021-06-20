const initialState = {
   isUserLoggedIn: false,
   users:null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'LOGIN_STATUS':
        return { ...state,
            isUserLoggedIn:payload 
            
            }
            case 'SET_USERS':
                return { ...state,
                    users:payload 
                    
                    }
    default:
        return state
    }
}
