const addCategory = (data) => {
  return {
    type: 'UPDATE_CATEGORY',
    data
  };
};
const addSubCategory = (data) => {
  console.log('called in action')
  return {
    type: 'UPDATE_SUB_CATEGORY',
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
  addCategory, updateFailed, addSubCategory
};