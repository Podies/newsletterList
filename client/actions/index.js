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

const fetchNewsletters = () => {
  return(dispatch) => {
    return api.ajaxFetchNewsletters().then
      ((responseData) => {
        dispatch(actions.addNewsletters(responseData.newsletters))
      },
      (err) => {
        dispatch(actions.updateFailed(err));
      }
    );
  };
};

export  {
  fetchCategory, fetchNewsletters
}