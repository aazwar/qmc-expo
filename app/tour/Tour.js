import React, { Component } from 'react';
import { WebView } from 'react-native';
import { Container, Header, Title, Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body } from 'native-base';

import styles, { deviceWidth, deviceHeight } from '../styles';
const places = require('./places.js').default;

export default class Tour extends Component {
  componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
  }

  componentWillUnmount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
  }

  render() {
    let id = this.props.navigation.state.params.id;
    let place = places.filter(e => e.id == id)[0];
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Tour')}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ width: deviceHeight - 100, textAlign: 'center' }}>
              {place.name}
            </Title>
          </Body>
          <Right />
        </Header>

        <WebView source={{ uri: place.url }} style={{ flex: 1 }} />
      </Container>
    );
  }
}
