import React, { Component } from 'react';
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
  H3,
  Badge,
} from 'native-base';
import { Image } from 'react-native';

import styles from '../styles';

const services = require('./services.js').default;

export default class Services extends Component {
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
            <Title>Services</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          {services.map(service =>
            <Card key={service.id}>
              <CardItem>
                <Body>
                  <Text>
                    {service.name}
                  </Text>
                </Body>
              </CardItem>
              <CardItem cardBody>
                <Image source={service.image} style={{ height: 200, width: null, flex: 1 }} />
              </CardItem>
              <CardItem>
                <Left>
                  <Button rounded info small onPress={() => this.props.navigation.navigate('Service', { id: service.id })}>
                    <Text>Detail</Text>
                  </Button>
                </Left>
                <Right>
                  <Button
                    rounded
                    info
                    small
                    onPress={() => this.props.navigation.navigate('Book', { id: service.id })}
                    style={{ width: 200 }}>
                    <Text style={{ textAlign: 'center' }}>Book an Appointment</Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
          )}
        </Content>
      </Container>
    );
  }
}
