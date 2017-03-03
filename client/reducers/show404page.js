const defaultState = {
  '404': false
};
const show404page = (state = defaultState, action) => {
  let copy = Object.assign({}, state);
  switch (action.type) {
    case 'SHOW_404_PAGE':
      copy['404'] = true;
      return copy;
    default:
      return state;
  }
};

export default show404page;