// global imports  START
import React, {useState,useEffect} from 'react';
import {mapping, dark as darkTheme, light as lightTheme} from '@eva-design/eva';
import {ApplicationProvider} from 'react-native-ui-kitten';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import axios from 'axios'; 
// global imports  END

// local import START
import AppNavbar from './component/Appbar';
import ApplicationContent from './component/Content';
import Detailed from './component/DetailNews';
import AppContainer from "./component/notification";

// local import END

const PUSH_TOKEN = '';

const App = () => {

  //notification START
  const sendPushNotification = async () => {
    const message = {
      to: PUSH_TOKEN,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { data: 'goes here' },
    };
  }
  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      axios.get(`http://192.168.0.102:8888/test?phoneCode=${token}`).then(response => {
        console.log(response)
      })
    } else {
      alert('Must use physical device for Push Notifications');
    }
  };
  //NOTIFICATION END

  useEffect(() => {
    registerForPushNotificationsAsync();
    sendPushNotification();

  }, []);

  const [theme, setTheme] = useState(darkTheme);
  const [checktheme, setchecktheme] = useState(false);
  const onThemeChange = () => {
    if (theme === darkTheme) {
      setTheme(lightTheme);
      setchecktheme(false);
    } else if (theme === lightTheme) {
      setTheme(darkTheme);
      setchecktheme(true);
    }
  };
  return (
    <ApplicationProvider mapping={mapping} theme={theme}>
      {/* <AppNavbar onThemeChange={onThemeChange} defaultTheme={checktheme} /> */}
      <ApplicationContent />
      {/* <AppContainer/> */}
      {/* <Detailed/> */}
    </ApplicationProvider>
  );
};

export default App;
