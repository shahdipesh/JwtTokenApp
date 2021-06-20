import { combineReducers } from "redux";
import userReducer from './user/user.reducer'
var rootReducers =combineReducers({
    user:userReducer
})

export default rootReducers