/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons
 */

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  Toggle,
} from 'react-native-ui-kitten';


const BackIcon = (style) => (
  <Icon {...style} name='arrow-back' />
);

const BackAction = () => (
  <TopNavigationAction icon={BackIcon} />
);
const onToggleValueChange = () => {
  console.log('Hello')
}


const AppNavbar = (props) => {
 
 
  const ThemeSelector = () => (

    <Toggle
      checked={props.defaultTheme}
      text='Dark'
      textStyle={styles.text}
       onChange={props.onThemeChange}
      size="tiny"
    />
  
  )
  return (
  <TopNavigation
    
    title='UK Short News'
    subtitle='News Re-defined'
    rightControls={ThemeSelector()}
    
  />
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 11,
  },
});

export default AppNavbar;