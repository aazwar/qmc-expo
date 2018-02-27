import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  H3,
  Toast,
} from 'native-base';
import styles, { deviceWidth, contentHeight } from './styles';

import { register, ask_permission } from './Util';

export default class Home extends Component {
  componentWillMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
    let { setting } = this.props.screenProps;

    if (!ask_permission()) {
      Toast.show({
        text: 'App permission is not granted!',
        position: 'bottom',
        buttonText: 'Ok',
        type: 'danger',
        duration: 3000,
      });
    }

    register(setting);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left style={{ width: 50 }}>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title style={{ width: deviceWidth - 100 }}>Quttainah Medical Center</Title>
          </Body>
          <Right />
        </Header>
        <ImageBackground
          source={require('./assets/splash.png')}
          style={{ height: contentHeight, flex: 1 }}
          imageStyle={{ resizeMode: 'stretch' }}
        />
      </Container>
    );
  }
}
