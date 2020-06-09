
import {
  Alert
} from "react-native";

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
