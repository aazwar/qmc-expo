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
import Zoom from './app/gallery/Zoom';
import Review from './app/services/Review';
import WriteReview from './app/services/WriteReview';
import Video from './app/video';

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
  Zoom: { screen: Zoom },
  Review: { screen: Review },
  WriteReview: { screen: WriteReview },
	Video: { screen: Video }
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

export default class App extends React.Component {
  state = { loaded: false };

  async componentWillMount() {
    let setting = new Setting();
    await setting.load();
    this.setting = setting;
    Font.loadAsync({
      'medula-one': require('./app/assets/fonts/MedulaOne-Regular.ttf'),
      Roboto: require('./node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('./node_modules/native-base/Fonts/Roboto_medium.ttf'),
    }).then(() => this.setState({ loaded: true }));
  }

  render() {
    if (!this.state.loaded) return null;
    return (
      <Root>
        <AppNavigator screenProps={{ setting: this.setting }} />
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
