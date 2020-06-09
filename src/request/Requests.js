
import {encode_query_data_to_url} from "../Tool"

// post request
export function post_request(url, jsonFile) {
  // I'm implementing this through most easy way
  // search about how to insert data in post request

  // url = encode_query_data_to_url(url, jsonFile)
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonFile)
    })
    .then(response => response.json())
    .then(response => {
      // alert(JSON.stringify(response));
      if (response["success"]) {
        resolve(response);
      }
      else {
        reject(response);
      }
    })
  });
}

// get request
export function get_request(url, jsonFile) {
  url = encode_query_data_to_url(url, jsonFile);
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then((response) => {
        // alert(JSON.stringify(response));
        if (response["success"]) {
          resolve(response);
        }
        else {
          reject(response);
        }
      })
  });
}

// put request
export function put_request(url, jsonFile) {
  // url = encode_query_data_to_url(url, jsonFile)
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonFile)
    })
    .then(response => response.json())
    .then(response => {
      // alert(JSON.stringify(response));
      if (response["success"]) {
        resolve(response);
      }
      else {
        reject(response);
      }
    })
  });
}
