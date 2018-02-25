import React from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Root } from 'native-base';
import { Font } from 'expo';

import Home from './app/Home';
import Appointment from './app/appointment';
import About from './app/About';
import Contact from './app/contact';
import Chat from './app/chat';
import Doctors from './app/doctors';
import Tour from './app/tour';
import TourView from './app/tour/Tour';
import SideBar from './app/SideBar';
import Map from './app/contact/MapScreen';
import Biography from './app/doctors/Biography';
import Services from './app/services';
import Service from './app/services/Service';
import Setting from './app/Setting';
import Profile from './app/profile';
import CallUs from './app/callus';
import Gallery from './app/gallery';
import GalleryDetail from './app/gallery/Detail';
import Review from './app/services/Review';
import WriteReview from './app/services/WriteReview';

const screens = {
  Home: { screen: Home },
  About: { screen: About },
  Appointment: { screen: Appointment },
  Contact: { screen: Contact },
  Chat: { screen: Chat },
  Doctors: { screen: Doctors },
  Tour: { screen: Tour },
  TourView: { screen: TourView },
  Profile: { screen: Profile },
  Map: { screen: Map },
  Biography: { screen: Biography },
  Services: { screen: Services },
  Service: { screen: Service },
  CallUs: { screen: CallUs },
  Gallery: { screen: Gallery },
  GalleryDetail: { screen: GalleryDetail },
  Review: { screen: Review },
  WriteReview: { screen: WriteReview },
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
Font.loadAsync({
  'medula-one': require('./app/assets/fonts/MedulaOne-Regular.ttf'),
});

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
