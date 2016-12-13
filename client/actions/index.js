import * as fetch from './ajaxFetch';
import * as action from './action';

const fetchCategory = (data) => {
  return(dispatch) => {
    return fetch.ajaxFetchCategory(data).then
      ((res) => {
        dispatch(action.addCategory(res.categories))
      },
      (err) => {
        dispatch(action.updateFailed(err));
      }
    );
  };
};

const fetchSubCategory = (data) => {
  return(dispatch) => {
    return fetch.ajaxFetchSubCategory(data).then
      ((res) => {
        dispatch(action.addSubCategory(res.subcategories))
      },
      (err) => {
        dispatch(action.updateFailed(err));
      }
    );
  };
};

export  {
  fetchCategory, fetchSubCategory
}