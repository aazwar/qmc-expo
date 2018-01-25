import React, { Component } from 'react';
import { WebView } from 'react-native';
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
  Card,
  CardItem,
} from 'native-base';
import { Image, TouchableOpacity } from 'react-native';

import styles, { deviceWidth, deviceHeight } from '../styles';

const places = require('./places.js').default;
const height = (deviceHeight - 20) / 918.0 * 168.0;
export default class Tour extends Component {
  componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
  }

  componentWillUnmount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
  }

  render() {
    console.log(height, deviceWidth);
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

        <Content padder>
          {places.map(place =>
            <Card key={place.id}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('TourView', { id: place.id })}>
                <CardItem cardBody>
                  <Image source={place.image} style={{ height, width: null, flex: 1 }} />
                </CardItem>
              </TouchableOpacity>
            </Card>
          )}
          <Text />
        </Content>
      </Container>
    );
  }
}
