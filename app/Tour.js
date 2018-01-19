import React, { Component } from 'react';
import { WebView } from 'react-native';
import { Container, Header, Title, Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body } from 'native-base';

import styles, { deviceWidth, deviceHeight } from './styles';

export default class Tour extends Component {
  componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
  }

  componentWillUnmount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>QMC Tour</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <WebView source={{ uri: 'http://kdakw.com/clients/qmc/0.html' }} style={{ width: deviceWidth, height: deviceHeight }} />
        </Content>
      </Container>
    );
  }
}
