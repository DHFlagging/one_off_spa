import { combineReducers } from "redux"
import loadingReducer from "./loading"
const rootReducer = combineReducers({
  somethingIsLoading: loadingReducer
})

export default rootReducer
