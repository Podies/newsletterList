import axios from 'axios';
// const endpoint = 'http://localhost:8000';

//fetch category
const ajaxFetchCategory = (data) => {
  const url = '/api/categories';

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
  let url = '/api/categories/'+params.category+'/newsletters';
  if(params.category && params.subcategory) {
    url = '/api/subcategories/'+params.subcategory+'/newsletters';
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
  let url = '/api/handpicked/';

  return axios.get(url)
    .then((response) => {
      if (response.status !== 200) {
        return Promise.reject('Newsletter Loading Failed');
      }
      return response.data;
    });
}
const ajaxFetchSearchNewsletters = (searchTerm) => {
  let url = '/api/search/'+searchTerm;

  return axios.get(url)
    .then((response) => {
      if (response.status !== 200) {
        return Promise.reject('No Newsletter Found');
      }
      return response.data;
    });
}

const ajaxSubscribe = (info) => {
  let url = '/api/user/subscribe';

  return axios.post(url, info)
    .then((response) => {
      // if (response.status !== 200) {
      //   return Promise.reject('No Newsletter Found');
      // }
      return console.log('Submitted Successfully');
    });
}

export {
  ajaxFetchCategory, ajaxFetchNewsletters, ajaxFetchHandPicked, ajaxFetchSearchNewsletters, ajaxSubscribe
};
