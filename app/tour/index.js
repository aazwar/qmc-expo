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
const height = (deviceWidth - 20) / 664 * 393.0;
export default class Tour extends Component {
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

        <Content padder>
          {places.map(place =>
            <Card key={place.id}>
              <CardItem header>
                <Text style={{ fontWeight: 'bold' }}>
                  {place.name}
                </Text>
              </CardItem>
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
