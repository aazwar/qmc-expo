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

const doctors = require('./doctors.js').default;

export default class Doctors extends Component {
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
            <Title>Doctors</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          {doctors.map(doctor =>
            <Card key={doctor.id}>
              <CardItem>
                <Body>
                  <Text>
                    {doctor.name}
                  </Text>
                  <Text note>
                    {doctor.title}
                  </Text>
                </Body>
              </CardItem>
              <CardItem cardBody>
                <Image source={doctor.image} style={{ height: 200, width: null, flex: 1 }} />
              </CardItem>
              <CardItem>
                <Left>
                  <Badge primary>
                    <Text>Available</Text>
                  </Badge>
                </Left>
                <Right>
                  <Button rounded info small onPress={() => this.props.navigation.navigate('Biography', { id: doctor.id })}>
                    <Text>Biography</Text>
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
