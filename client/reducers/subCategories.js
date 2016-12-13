const defaultState = {
  list: [],
  listLoaded: false,
  listLoadingError: ''
};

const subCategories = (state = defaultState, action) => {
  let copy = Object.assign({}, state);
  switch (action.type) {
    case 'UPDATE_CATEGORY':
      copy.list = action.data;
      copy.listLoaded = true;
      return copy;
    default:
      return state;
  }
};

export default subCategories;