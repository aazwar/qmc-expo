import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content, Header, Body, Title, Button, Left, Right, Icon, Tab, Tabs } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import Appointments from './Appointments';
import Booking from './Booking';

export default class Appointment extends React.Component {
  static navigationOptions = { header: null };

  render() {
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title style={{ width: 250 }}>Appointment</Title>
          </Body>
          <Right />
        </Header>
        <Tabs initialPage={0}>
          <Tab heading="Booking">
            <Booking {...this.props} />
          </Tab>
          <Tab heading="Appointments">
            <Appointments {...this.props} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
