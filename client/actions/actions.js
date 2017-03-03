const addCategory = (data) => {
  return {
    type: 'UPDATE_CATEGORY',
    data
  };
};
const addNewsletters = (data) => {
  return {
    type: 'ADD_NEWSLETTERS',
    data
  }
}
const updateFailed = (data) => {
  return {
    type: 'UPDATE_CATEGORY_FAILED',
    data
  };
};

const show404Page = (data) => {
  return {
    type: 'SHOW_404_PAGE',
    data
  };
};

export {
  addCategory, updateFailed, addNewsletters, show404Page
};
