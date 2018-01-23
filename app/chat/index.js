import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Title, Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';

import Conversation from './Conversation';
import styles from '../styles';

export default class Chat extends Component {
  state = { message: []}
  
  async componentWillMount() {
    let conversation = new Conversation();
    await conversation.load();
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, conversation.messages),
    }));
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    console.log(this.state);
  }

  render() {
    const user = [
      
    ]
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>1-on-1 Chat</Title>
          </Body>
          <Right />
        </Header>

        <View style={{ flex: 1 }}>
          <GiftedChat
            renderAvatar={null}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
        </View>
      </Container>
    );
  }
}
