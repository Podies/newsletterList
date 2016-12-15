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

const fetchNewsletters = (params) => {
  return(dispatch) => {
    return api.ajaxFetchNewsletters(params).then
      ((responseData) => {
        dispatch(actions.addNewsletters(responseData.newsletters))
      },
      (err) => {
        dispatch(actions.updateFailed(err));
      }
    );
  };
};

const fetchHandPicked = () => {
  return(dispatch) => {
    return api.ajaxFetchHandPicked().then
      ((responseData) => {
        dispatch(actions.addNewsletters(responseData.newsletters))
      },
      (err) => {
        dispatch(actions.updateFailed(err));
      }
    );
  };
}

export  {
  fetchCategory, fetchNewsletters
}