import * as api from './ajaxCalls';
import * as actions from './actions';

const fetchCategory = () => {
  return(dispatch) => {
    return api.ajaxFetchCategory().then
      ((responseData) => {
        dispatch(action.addCategory(responseData.categories))
      },
      (err) => {
        dispatch(action.updateFailed(err));
      }
    );
  };
};

const fetchSubCategory = () => {
  return(dispatch) => {
    return api.ajaxFetchSubCategory().then
      ((responseData) => {
        dispatch(action.addSubCategory(responseData.subcategories))
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