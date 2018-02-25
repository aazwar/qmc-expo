import React, { Component } from 'react';
import { Container, Header, Title, Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body } from 'native-base';
import { Image, AsyncStorage } from 'react-native';

import styles, { deviceWidth } from '../styles';

export default class About extends Component {
  componentWillMount() {}

  render() {
    let id = this.props.navigation.state.params.id;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Review', { id })}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Write Review</Title>
          </Body>
          <Right />
        </Header>

        <Content padder />
      </Container>
    );
  }
}
