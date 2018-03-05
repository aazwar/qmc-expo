import React, { Component } from 'react';
import { Linking, Image, View, TouchableWithoutFeedback } from 'react-native';
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
  state = { cases: [] };

  componentDidMount() {
    let id = this.props.navigation.state.params.id;
    fetch(`${SERVER}/ajax/gallery/retrieve-case?id=${id}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        let cases = json;
        this.setState({ cases });
      })
      .catch(error =>
        Toast.show({
          text: "Can't fetch Case Information",
          position: 'bottom',
          buttonText: 'Ok',
          type: 'warning',
        })
      );
  }

  render() {
    let { cases } = this.state;
    let id = this.props.navigation.state.params.id;
    return (
      <Container style={styles.container}>
        <Header>
          <Left style={{ width: 50 }}>
            <Button transparent onPress={() => this.props.navigation.navigate('Gallery')}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ width: deviceWidth - 100 }}>Case History</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem cardBody>
              <Body>
                <Text>Tap image to zoom</Text>
              </Body>
            </CardItem>
          </Card>
          {cases.map(gcase => (
            <Card key={gcase.id}>
              <CardItem>
                <Body>
                  <Text>{`Before: ${gcase.before_caption}`}</Text>
                </Body>
              </CardItem>
              <CardItem cardBody>
                <TouchableWithoutFeedback
                  key={gcase.id}
                  onPress={() =>
                    this.props.navigation.navigate('Zoom', {
                      id,
                      images: [
                        { source: { uri: `${SERVER}/${gcase.before_image}` } },
                        { source: { uri: `${SERVER}/${gcase.after_image}` } },
                      ],
                    })
                  }>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: `${SERVER}/${gcase.before_image}` }} style={{ height: 200, width: null, flex: 1 }} />
                    <Image source={{ uri: `${SERVER}/${gcase.after_image}` }} style={{ height: 200, width: null, flex: 1 }} />
                  </View>
                </TouchableWithoutFeedback>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>{`After: ${gcase.after_caption}`}</Text>
                </Body>
              </CardItem>
            </Card>
          ))}
        </Content>
      </Container>
    );
  }
}
