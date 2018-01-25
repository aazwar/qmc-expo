import React, { Component } from 'react';
import { View } from 'react-native';
import { Permissions, Notifications } from 'expo';
import { Container, Header, Title, Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';
import uuid from 'uuid';

import Conversation from './Conversation';
import styles from '../styles';

export default class Chat extends Component {
  state = { message: [] };

  async componentWillMount() {
    let conversation = new Conversation();
    this.conversation = conversation;
    await conversation.load();
    if (!conversation.push_token) {
      try {
        conversation.push_token = await Notifications.getExpoPushTokenAsync();
        conversation.channel_id = await `QMC-${uuid.v4()}`;
        console.log(conversation);
      } catch (err) {}
    }
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, conversation.messages),
    }));
  }

  componentWillUnmount() {
    let conversation = this.conversation;
    conversation.store();
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    console.log(this.state);
  }

  render() {
    const user = [];
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
