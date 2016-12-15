import axios from 'axios';
const endpoint = 'http://localhost:8000';

//fetch category
const ajaxFetchCategory = (data) => {
  const url = endpoint+'/api/categories';

  return axios.get(url)
    .then((response) => {
      if (response.status !== 200) {
        return Promise.reject('Category Loading Failed');
      }
      return response.data;
    });
};

//fetch newsletters
const ajaxFetchNewsletters = (data) => {
  const url = endpoint+'/api/newsletter';

  return axios.get(url)
    .then((response) => {
      if (response.status !== 200) {
        return Promise.reject('Newsletter Loading Failed');
      }
      return response.data;
    });
};

export {
  ajaxFetchCategory, ajaxFetchNewsletters
};