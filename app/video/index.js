import React, { Component } from 'react';
import { Linking, Image, WebView } from 'react-native';
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

export default class VideoScreen extends Component {
  state = { videos: [] };

  componentDidMount() {
    fetch(`${SERVER}/ajax/video/retrieve`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(json => {
        let videos = json;
        this.setState({ videos });
      })
      .catch(error =>
        Toast.show({
          text: "Can't fetch Video list",
          position: 'bottom',
          buttonText: 'Ok',
          type: 'warning',
        })
      );
  }

  render() {
    let { videos } = this.state;
    return (
      <Container style={styles.container}>
        <Header>
          <Left style={{ width: 50 }}>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title style={{ width: deviceWidth - 100 }}>Video</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          {videos.map(video => (
            <Card key={video.id}>
              <CardItem cardBody>
                <WebView
                  source={{
                    uri: `https://www.youtube.com/embed/${
                      video.id
                    }?autoplay=1&playsinline=1&rel=0&fs=0&modestbranding=1&showinfo=0`,
                  }}
                  allowsInlineMediaPlayback={true}
                  style={{ height: (deviceWidth - 10) * 9 / 16 }}
                />
              </CardItem>
              <CardItem>
                <Text>{video.caption}</Text>
              </CardItem>
            </Card>
          ))}
        </Content>
      </Container>
    );
  }
}
