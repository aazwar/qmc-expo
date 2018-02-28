import React, { Component } from 'react';
import { View } from 'react-native';
import { Permissions, Notifications } from 'expo';
import { Container, Header, Title, Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';

import Chat from './Chat';
import Register from './Register';
import Conversation from './Conversation';
import styles from '../styles';

export default class ChatRoot extends Component {
  state = { ready: false, message: [] };

  async componentWillMount() {
    let conversation = new Conversation();
    this.conversation = conversation;
    await conversation.load();
    this.setState({ ready: true });
  }

  componentWillUnmount() {
    let conversation = this.conversation;
    conversation.store();
  }

  reload() {
    this.forceUpdate();
  }

  render() {
    if (!this.state.ready) return null;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Chat with QMC</Title>
          </Body>
          <Right />
        </Header>
        <Chat {...this.props} conversation={this.conversation} />
      </Container>
    );
  }
}
