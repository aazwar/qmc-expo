import React, { Component } from 'react';
import { Container, Header, Title, Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body } from 'native-base';
import { Image, AsyncStorage } from 'react-native';

import styles, { deviceWidth } from './styles';
import MarkDown from './MarkDown';

export default class About extends Component {
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
            <Title>About QMC</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                AsyncStorage.clear();
              }}>
              <Icon name="ios-refresh" />
            </Button>
          </Right>
        </Header>

        <Content>
          <Image style={{ width: deviceWidth, height: 501 * deviceWidth / 900 }} source={require('./assets/about-us.jpg')} />
          <Text />
          <MarkDown style={{ padding: 10, fontSize: 16 }}>
            {`QMC *"Quttainah Medical Center"* is complete medical center in Kuwait which provide highest standard of medical services.

Quttainah uses the latest technology, advanced techniques, specialized training and skills to give his patients the best possible results from their cosmetic or reconstructive procedures.`}
          </MarkDown>
        </Content>
      </Container>
    );
  }
}
