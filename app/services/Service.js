import React, { Component } from 'react';
import { Container, Header, Title, Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body } from 'native-base';

import styles, { deviceWidth } from '../styles';
import MarkDown from '../MarkDown';
const services = require('./services.js').default;

export default class Service extends Component {
  render() {
    let id = this.props.navigation.state.params.id;
    let service = services.filter(e => e.id == id)[0];
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Services')}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ width: deviceWidth - 80 }}>{service.name}</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate('Review', { id: service.id })}>
              <Icon name="ios-star-half-outline" />
            </Button>
            {service.id == 8 && (
              <Button
                transparent
                onPress={() => this.props.navigation.navigate('Gallery', { dep_id: this.props.navigation.state.params.id })}>
                <Icon name="ios-images-outline" />
              </Button>
            )}
          </Right>
        </Header>

        <Content padder>
          <MarkDown>{service.desc + '\n'}</MarkDown>
        </Content>

        <Footer>
          <FooterTab>
            <Button active full>
              <Text>Book an Appointment</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
