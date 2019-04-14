import { combineReducers } from 'redux';
import commandReducer from './commandReducer';

export default combineReducers({
    command: commandReducer
})