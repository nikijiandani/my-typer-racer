import { useState, useEffect } from "react";

export default function useFetch() {
  const [data, setData] = useState([]);
  const corsAnywhere = 'https://cors-anywhere.herokuapp.com/'
  const getKeyUrl = "https://random-word-api.herokuapp.com/key?"

  useEffect(() => {
    var result = fetch(corsAnywhere + getKeyUrl, {
      method: 'get',
    }).then(function(response) {
      return response.text(); // pass the data as promise to next then block
    }).then(function(data) {
      var my_api_key = data;

      console.log(my_api_key, '\n');
    
      return fetch(`https://random-word-api.herokuapp.com//word?key=${my_api_key}&number=100`); // make a 2nd request and return a promise
    })
    .then(function(response) {
      return response.json();
    })
    .catch(function(error) {
      console.log('Request failed', error)
    })

    result.then(function(r) {
      setData(r);
    });
  }, []);
  
  return data;
}