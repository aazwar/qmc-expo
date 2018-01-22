import React, { Component } from 'react';
import { WebView } from 'react-native';
import { Container, Header, Title, Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body } from 'native-base';

import styles, { deviceWidth, deviceHeight } from '../styles';

const departments = require('./departments.js').default;

export default class Appointments extends Component {
  async componentWillMount() {
    console.log(this.props);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
          <Text>No past appointments</Text>
        </Content>
      </Container>
    );
  }
}
