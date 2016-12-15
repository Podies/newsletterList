import * as api from './ajaxCalls';
import * as actions from './actions';

const fetchCategory = () => {
  return(dispatch) => {
    return api.ajaxFetchCategory().then
      ((responseData) => {
        dispatch(actions.addCategory(responseData.categories))
      },
      (err) => {
        dispatch(actions.updateFailed(err));
      }
    );
  };
};

const fetchSubCategory = () => {
  return(dispatch) => {
    return api.ajaxFetchSubCategory().then
      ((responseData) => {
        dispatch(actions.addSubCategory(responseData.subcategories))
      },
      (err) => {
        dispatch(actions.updateFailed(err));
      }
    );
  };
};

export  {
  fetchCategory, fetchSubCategory
}