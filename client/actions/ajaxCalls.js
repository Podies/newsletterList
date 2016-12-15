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
const ajaxFetchNewsletters = (params) => {
  let url = endpoint+'/api/categories/'+params.category+'/newsletters';
  if(params.category && params.subcategory) {
    url = endpoint+'/api/subcategories/'+params.subcategory+'/newsletters';
  }
  
  return axios.get(url)
    .then((response) => {
      if (response.status !== 200) {
        return Promise.reject('Newsletter Loading Failed');
      }
      return response.data;
    });
};

const ajaxFetchHandPicked = () => {
  let url = endpoint+'/api/handpicked/';
  
  return axios.get(url)
    .then((response) => {
      if (response.status !== 200) {
        return Promise.reject('Newsletter Loading Failed');
      }
      return response.data;
    });
}

export {
  ajaxFetchCategory, ajaxFetchNewsletters
};