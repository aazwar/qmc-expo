import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Root } from 'native-base';

import Home from './app/Home';
import Appointment from './app/appointment';
import About from './app/About';
import Contact from './app/contact';
import Chat from './app/chat';
import Doctors from './app/doctors';
import History from './app/History';
import Tour from './app/Tour';
import Rating from './app/Rating';
import SideBar from './app/SideBar';
import Map from './app/contact/MapScreen';
import Biography from './app/doctors/Biography';
import Services from './app/services';
import Service from './app/services/Service';
import Setting from './app/Setting';

const screens = {
  Home: { screen: Home },
  About: { screen: About },
  Appointment: { screen: Appointment },
  Contact: { screen: Contact },
  Chat: { screen: Chat },
  Doctors: { screen: Doctors },
  History: { screen: History },
  Tour: { screen: Tour },
  Rating: { screen: Rating },
  Map: { screen: Map },
  Biography: { screen: Biography },
  Services: { screen: Services },
  Service: { screen: Service },
};

const Drawer = DrawerNavigator(screens, {
  initialRouteName: 'Home',
  contentOptions: {
    activeTintColor: '#e91e63',
  },
  contentComponent: props => <SideBar {...props} />,
});

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },
    ...screens,
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none',
  }
);

let setting = new Setting();
setting.load();

export default () =>
  <Root>
    <AppNavigator screenProps={{ setting }} />
  </Root>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
