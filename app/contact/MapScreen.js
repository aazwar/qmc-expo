import React, { Component } from 'react';
import { WebView } from 'react-native';
import { Container, Header, Title, Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body } from 'native-base';

import styles, { deviceWidth, contentHeight } from '../styles';

export default class Rating extends Component {
  render() {
    let placeUrl =
      'https://www.google.com/maps/place/Quttainah+Medical+Center/@29.3508777,48.028332,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x5cddd330c44d78f5!8m2!3d29.3508777!4d48.0305207';
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Contact')}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Location</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <WebView source={{ uri: placeUrl }} style={{ flex: 1, width: deviceWidth, height: contentHeight }} />
        </Content>
      </Container>
    );
  }
}
