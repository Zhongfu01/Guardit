import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
} from "react-native";

import {beetle1Url} from '../url/Guardit';
import {beetle2Url} from '../url/Guardit';
import {beetle3Url} from '../url/Guardit';
import {beetle4Url} from '../url/Guardit';
import {beetle5Url} from '../url/Guardit';

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
  return new Promise((resolve, reject) => {
    post_request(
      LocalUpdateDeviceUrl,
      newDevice
    )
    .then(jsonResponse => {
      // success
      jsonResponse = jsonResponse["data"]
      make_alert('Success', 'The device has been updated successfully.');
      resolve();
    })
    .catch(errorMsg => {
      make_alert('Failed', 'Something went wrong while trying to update the device.');
      reject();
    })
  })
}

export function get_icon_url(iconName) {
  // get icon url from the icon name
  switch (iconName) {
    case 'beetle1':
      return beetle1Url
      break;
    case 'beetle2':
      return beetle2Url
      break;
    case 'beetle3':
      return beetle3Url
      break;
    case 'beetle4':
      return beetle4Url
      break;
    case 'beetle5':
      return beetle5Url
      break;
    default:
      return beetle1Url
  }
}
