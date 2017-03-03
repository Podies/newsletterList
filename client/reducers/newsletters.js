const defaultState = {
  list: [],
  listLoaded: false,
  listLoadingError: ''
};

const newsletters = (state = defaultState, action) => {
  let copy = Object.assign({}, state);
  switch (action.type) {
    case 'ADD_NEWSLETTERS':
      copy.list = action.data;
      copy.listLoaded = true;
      return copy;
    default:
      return state;
  }
};

export default newsletters;