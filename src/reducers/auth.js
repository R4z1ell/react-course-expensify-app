export default (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        uid: action.uid
      };
    case "LOGOUT":
      /* When we're going to DISPATCH this 'LOGOUT' we will return an EMPTY Object, so we will WIPE the 'uid'
      property that was previously SET by the 'LOGIN' Action */
      return {};
    default:
      return state;
  }
};
