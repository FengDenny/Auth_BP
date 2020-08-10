const initState = {};

export default (state = initState, action) => {
  if (action.type === 'REGISTER_ACTION') {
    // to access multi level data in api
    return action.payload.data.user;
    // Destory Redux auth token and logout
  } else if (action.type === 'LOGOUT') {
    return initState;
  } else {
    return state;
  }
};
