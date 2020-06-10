
import {
  Alert
} from "react-native";

import {post_request} from './request/Requests';

import {LocalUpdateDeviceUrl} from '../url/Guardit';


export function encode_query_data_to_url(url, data) {
  const ret = [];
  for (let d in data) {
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  }
  return url + '?' + ret.join('&');
}

export function make_alert(title, body) {
  Alert.alert(
    //title
    title,
    //body
    body,
    [
      // {text: 'Yes', onPress: () => console.log('Yes Pressed')},
      // {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
    ],
    { cancelable: true }
    //clicking out side of alert will cancel
  );
}

export function update_remote_device(newDevice) {
  // user Userinfo.device to update device data in remote site
  post_request(
    LocalUpdateDeviceUrl,
    newDevice
  )
  .then(jsonResponse => {
    // success
    jsonResponse = jsonResponse["data"]
    make_alert('Success', 'The device has been updated successfully.');
  })
  .catch(errorMsg => {
    make_alert('Failed', 'Something went wrong while trying to update the device.');
  })
}
