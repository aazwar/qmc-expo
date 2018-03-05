import React, { Component } from 'react';
import { Linking, Image, TouchableWithoutFeedback } from 'react-native';
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
  H3,
  Toast,
  Card,
  CardItem,
} from 'native-base';

import { SERVER } from '../Util';
import styles, { deviceWidth, contentHeight } from '../styles';

export default class GalleryScreen extends Component {
  state = { categories: [] };

  componentDidMount() {
    fetch(`${SERVER}/ajax/gallery/category-list`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(json => {
        let categories = json;
        this.setState({ categories });
      })
      .catch(error =>
        Toast.show({
          text: "Can't fetch Case History",
          position: 'bottom',
          buttonText: 'Ok',
          type: 'warning',
        })
      );
  }

  render() {
    let { categories } = this.state;
    return (
      <Container style={styles.container}>
        <Header>
          <Left style={{ width: 50 }}>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title style={{ width: deviceWidth - 100 }}>Case History</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          {categories.map(category => (
            <Card key={category.id}>
              <CardItem>
                <Body>
                  <Text style={{ fontWeight: 'bold' }}>{category.name}</Text>
                </Body>
              </CardItem>
              <CardItem cardBody>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('GalleryDetail', { id: category.id })}>
                  <Image source={{ uri: `${SERVER}/${category.cover_image}` }} style={{ height: 200, width: null, flex: 1 }} />
                </TouchableWithoutFeedback>
              </CardItem>
              <CardItem>
                <Text>{category.description}</Text>
              </CardItem>
            </Card>
          ))}
        </Content>
      </Container>
    );
  }
}
