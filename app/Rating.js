import React, { Component } from 'react';
import { WebView } from 'react-native';
import { Container, Header, Title, Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body } from 'native-base';

import styles, { deviceWidth, contentHeight } from './styles';

export default class Rating extends Component {
  render() {
    //let placeUrl =  'https://www.google.co.id/search?q=Quttainah+Medical+Center,+Arabian+Gulf+St%D8%8C+Nafi+Bin+Al+Azraq,+Kuwait&ludocid=6691736827747727605#lrd=0x3fcf9ce87e166469:0x5cddd330c44d78f5,3';
    let placeUrl = 'https://search.google.com/local/writereview?placeid=ChIJaWQWfuiczz8R9XhNxDDT3Vw';
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Rating</Title>
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
