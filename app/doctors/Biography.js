import React, { Component } from 'react';
import { Container, Header, Title, Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body } from 'native-base';

import styles, { deviceWidth } from '../styles';

import MarkDown from '../MarkDown';
const doctors = require('./doctors.js').default;

export default class Biography extends Component {
  render() {
    let id = this.props.navigation.state.params.id;
    let doctor = doctors.filter(e => e.id == id)[0];
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Doctors')}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ width: deviceWidth - 80 }}>
              {doctor.name}
            </Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <MarkDown>
            {doctor.biography + '\n'}
          </MarkDown>
        </Content>
      </Container>
    );
  }
}
