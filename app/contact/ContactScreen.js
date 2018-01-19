import React, { Component } from 'react';
import { View, Image } from 'react-native';
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
  List,
  ListItem,
  H3,
  Separator,
} from 'native-base';

import styles, { deviceWidth, deviceHeight } from '../styles';

export default class ContactScreen extends Component {
  static navigationOptions = { header: null };
  render() {
    return (
      <List>
        <Separator bordered>
          <H3>Address</H3>
        </Separator>
        <ListItem>
          <Text>
            Quttainah Medical Center{'\n'}
            Alsha'b Albahary-Gulf Road-Block 8{'\n'}
            Front of Layaly Al-Helmiya Cafe{'\n'}
            Phone number: +965-1888883
          </Text>
        </ListItem>
        <ListItem>
          <Button>
            <Text onpress={() => console.log(this)}>Map</Text>
          </Button>
        </ListItem>
        <Separator bordered>
          <H3>Important Contact</H3>
        </Separator>
      </List>
    );
  }
}
