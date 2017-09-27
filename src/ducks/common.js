// import axios from 'axios';
// import {BASE_URL} from './constants';

//Constants
const CHANGE_USER = 'CHANGE_USER';
const LOGIN_FAILED = 'LOGIN_FAILED';

//Actions Creators
export const doLogin = () => async dispatch => {
  //Do Login and get a response with a user inside
  //TODO complete this with the correct url
  // const response = await axios.get(BASE_URL + 'FIXFIXFIX');
  const response = {user:{name:'Name1'}, state:true};
  console.log(response);

  if(response.state){
    dispatch({
      type: CHANGE_USER,
      payload: response.user
    });
  }
  else{
    dispatch({
      type: LOGIN_FAILED,
    });
  }

};


//Reducer's Initial state
const INITIAL_STATE = {
  user: null,
};
//Reducer
export default function common(state = INITIAL_STATE, action){
  switch (action.type) {
    case CHANGE_USER:
      return {...state, user: action.payload};
    default:
      return state;
  }
};
