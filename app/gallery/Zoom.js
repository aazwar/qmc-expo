import React, { Component } from 'react';
import { Linking, Image, View } from 'react-native';
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
  Card,
  CardItem,
} from 'native-base';
import Gallery from 'react-native-image-gallery';

import styles, { deviceWidth, contentHeight } from '../styles';

export default class GalleryScreen extends Component {
  render() {
    let { id, images } = this.props.navigation.state.params;
    return (
      <Container style={styles.container}>
        <Header>
          <Left style={{ width: 50 }}>
            <Button transparent onPress={() => this.props.navigation.navigate('GalleryDetail', { id })}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ width: deviceWidth - 100 }}>Zoom</Title>
          </Body>
          <Right />
        </Header>
        <Gallery style={{ flex: 1, backgroundColor: 'black' }} images={images} />
      </Container>
    );
  }
}
