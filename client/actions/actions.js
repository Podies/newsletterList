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

export {
  addCategory, updateFailed, addNewsletters
};