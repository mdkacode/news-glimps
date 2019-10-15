import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Image, Text, NetInfo } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import axios from 'axios';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  Layout,
} from 'react-native-ui-kitten';
import moment from "moment";

import * as WebBrowser from 'expo-web-browser';
const DEVICE_WIDTH = Math.round(Dimensions.get('window').width);
const DEVICE_HEIGHT = Math.round(Dimensions.get('window').height) - 90;
const placeholderImage = "https://i.redd.it/vm5jchx1gjzz.jpg";


const url = 'http://192.168.0.102:8888/getnews';



const data = [
  {
    "id": 1,
    "urlToImage": "https://i.redd.it/vm5jchx1gjzz.jpg",
    "description": "Loading Title For You Hang On !!",
    "content": "Loading Content For You ",
    "url": "https://www.gogole.com",
    "Author": 'Loading...',
    "source": {
      name: 'Loading...'
    }

  }
]




const config = {
  velocityThreshold: 0.1,
  directionalOffsetThreshold: 80
};

const ApplicationContent = () => {

  const [iniNews, setiniNews] = useState(0);
  const [listNews, setListNews] = useState(data);

  useEffect(() => {
    console.log('asasas')
    axios.get(url).then(response => {
      console.log(response.data)
      setListNews(response.data)

    })

  }, []);


  const onSwipeUp = () => {
    console.log(listNews.length);
    if (iniNews >= 0) {
      console.log(iniNews);
      setiniNews(iniNews >= listNews.length - 1 ? 0 : iniNews + 1);
    }

  }

  const onSwipeDown = () => {
    console.log("lefttap");
    if (iniNews > 0) setiniNews(iniNews - 1);
  }

  const _handlePressButtonAsync = async () => {
    console.log('Hello')
    let result = await WebBrowser.openBrowserAsync(listNews[iniNews].url);

  };

  // eslint-disable-next-line react-native/no-inline-styles

  return <GestureRecognizer onSwipeUp={onSwipeUp} onSwipeLeft={_handlePressButtonAsync} onSwipeDown={onSwipeDown} config={config}>

    <View key={listNews[iniNews].id} style={{ flex: 1, flexDirection: 'column', position: "absolute", width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}>
      <View style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT / 2, backgroundColor: 'powderblue' }} >
        <Image
          style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT / 2 }}
          source={{ uri: listNews[iniNews].urlToImage || placeholderImage }}
        />
      </View>
      <View style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT / 2 }} >
        <Text style={styles.heading}>
          {listNews[iniNews].description}
        </Text>
        <Text style={styles.extrainfo}>
          {moment(listNews[iniNews].publishedAt).format("DD:MM:YYYY hh:MMA")} | {listNews[iniNews].source.name || 'No Source'}  | {listNews[iniNews].author}
        </Text>
        <Text style={styles.content}>
          {listNews[iniNews].content}
        </Text>
      </View>
      <View style={{ width: DEVICE_WIDTH }}    >
        <Text style={styles.readmore} onPress={_handlePressButtonAsync}>TAP TO READ FULL</Text>
      </View>
    </View>
  </GestureRecognizer>

};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "justify",
    alignContent: "space-between",
    marginLeft: 10,
    marginRight: 15,
    marginBottom: 10,
    marginTop: 15
  },
  content: {
    fontSize: 15,
    fontWeight: "normal",
    textAlign: "justify",
    alignContent: "space-between",
    marginLeft: 10,
    marginRight: 15,
    marginBottom: 20
  },
  readmore: {
    textAlign: "center",
    backgroundColor: "#000000",
    color: "#ffff",
    fontWeight: "bold",
    paddingTop: 15,
    marginTop: 30,
    height: 200
  },
  extrainfo: {


    height: 50,
    color: "#A9A9A9",
    marginLeft: 10
  }
})

export default ApplicationContent; 