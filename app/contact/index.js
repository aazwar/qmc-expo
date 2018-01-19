import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Container, Body, Left, Right, Header, Content, Button, Icon, Title, Separator, ListItem, H3, Text } from 'native-base';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { Linking, TouchableOpacity } from 'react-native';

import ContactScreen from './ContactScreen';
import MapScreen from './MapScreen';
import styles, { deviceWidth, deviceHeight } from '../styles';

export default class ContactHome extends React.Component {
  info(text, icon, link, color, text2) {
    if (typeof icon === 'string') {
      icon = <FontAwesome name={icon} size={27} style={{ color }} />;
    }
    return (
      <ListItem icon>
        <Left>
          <TouchableOpacity onPress={() => Linking.openURL(link)}>
            {icon}
          </TouchableOpacity>
        </Left>
        <Body>
          <Text onPress={() => Linking.openURL(link)}>
            {text}
          </Text>
          {text2 &&
            <Text note onPress={() => Linking.openURL(link)}>
              {text2}
            </Text>}
        </Body>
      </ListItem>
    );
  }

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
            <Title>Contact Us</Title>
          </Body>
          <Right />
        </Header>

        <Content padded>
          <Separator bordered>
            <H3>Address</H3>
          </Separator>
          <ListItem>
            <Text style={{ fontWeight: 'bold' }}>Quttainah Medical Center</Text>
          </ListItem>
          <ListItem>
            <Text>
              Alsha'b Albahary-Gulf Road-Block 8{'\n'}
              Front of Layaly Al-Helmiya Cafe
            </Text>
          </ListItem>
          <ListItem>
            <Button onPress={() => this.props.navigation.navigate('Map')}>
              <Text>Map</Text>
            </Button>
          </ListItem>
          <Separator bordered>
            <H3>Important Contact</H3>
          </Separator>
          <ListItem>
            <Body>
              <Text>Lina Bazi</Text>
              <Text note>Patient Liason </Text>
            </Body>
          </ListItem>
          {this.info('+965-1888883-(682)', 'phone', 'tel:+965-1888883,682', 'green')}
          {this.info('+965-94123311', <Entypo name="mobile" size={27} />, 'tel:+965-94123311', 'black')}
          {this.info(
            'L.bazzi@qmc-kuwait.com',
            <Icon ios="ios-mail" android="md-mail" />,
            'mailto:L.bazzi@qmc-kuwait.com',
            'black'
          )}
          <ListItem />
          {this.info('+965-1888883-(570)', 'phone', 'tel:+965-1888883,570', 'green', 'Admission')}
          {this.info('+965-1888883-(481)', 'phone', 'tel:+965-1888883,481', 'green', 'Accounting 1')}
          {this.info('+965-1888883-(482)', 'phone', 'tel:+965-1888883,482', 'green', 'Accounting 2')}
          {this.info('+965-1888883-(681)', 'phone', 'tel:+965-1888883,681', 'green', 'Marketing/Social Media')}
          {this.info('+965-99248844', 'phone', 'tel:+965-99248844', 'green', 'Pharmacy')}
          {this.info('+965-1888883-(410)', 'phone', 'tel:+965-1888883,410', 'green', 'Café/Museum')}
        </Content>
      </Container>
    );
  }
}
