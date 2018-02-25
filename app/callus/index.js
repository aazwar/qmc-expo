import React, { Component } from 'react';
import { Linking, ImageBackground } from 'react-native';
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
import styles, { deviceWidth, contentHeight } from '../styles';

export default class CallUs extends Component {
  componentDidMount() {
    Linking.openURL('tel:+9651888883');
    this.props.navigation.navigate('Home');
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
          source={require('../assets/splash.png')}
          style={{ height: contentHeight, flex: 1 }}
          imageStyle={{ resizeMode: 'stretch' }}
        />
      </Container>
    );
  }
}
