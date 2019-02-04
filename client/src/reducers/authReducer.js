import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
    console.log(action);
    switch (action.type) {
        case FETCH_USER:
        return action.payload || false;
        //as payload can be an empty string if the user  is not logged in, we dont want to return ''
        //'' || false, returns false in js
        default:
            return state;
    }
}