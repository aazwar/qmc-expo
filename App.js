import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";

import Home from './app/Home';
import Book from './app/Book';
import Call from './app/Call';
import Chat from './app/Chat';
import Doctor from './app/Doctor';
import History from './app/History';
import Tour from './app/Rating';
import Rating from './app/Rating';
import SideBar from './app/SideBar';

const Drawer = DrawerNavigator(
  {
    Home: { screen: Home },
    Book: { screen: Book },
    Call: { screen: Call },
    Chat: { screen: Chat },
    Doctor: { screen: Doctor },
    History: { screen: History },
    Tour: { screen: Tour },
    Rating: { screen: Rating },
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },

    Book: { screen: Book },
    Call: { screen: Call },
    Chat: { screen: Chat },
    Doctor: { screen: Doctor },
    History: { screen: History },
    Tour: { screen: Tour },
    Rating: { screen: Rating },
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
