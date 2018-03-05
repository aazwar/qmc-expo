import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Permissions, Notifications } from 'expo';
import { Container, Header, Title, Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body, Toast } from 'native-base';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat } from 'react-native-gifted-chat';
import { Feather } from '@expo/vector-icons';
import _ from 'lodash';
import uuid from 'uuid';

import styles from '../styles';
import { SERVER, register } from '../Util';

export default class Chat extends Component {
  state = { message: [], notification: {} };

  async retrieve_messages() {
    let { setting } = this.props.screenProps;
    let { conversation } = this.props;

    await register(setting, conversation);

    try {
      let response = await fetch(`${SERVER}/ajax/chat/retrieve`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel_id: conversation.channel_id,
          last_date: _.last(conversation.messages).createdAt,
        }),
      });
      let data = await response.json();

      let messages = data.map(m => ({ text: m.text, _id: m.id, createdAt: m.datetime, user: { _id: parseInt(m.user_id) } }));
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));
      conversation.messages = conversation.messages.concat(messages);
      conversation.store();
    } catch (err) {
      Toast.show({
        text: err.toString(),
        position: 'bottom',
        buttonText: 'Ok',
        type: 'danger',
        duration: 3000,
      });
    }
  }

  _handleNotification(notification) {
    //this.setState({notification: notification});
    this.retrieve_messages();
  }

  async componentDidMount() {
    this._notificationSubscription = Notifications.addListener(this._handleNotification.bind(this));
    let { conversation } = this.props;
    await this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, conversation.messages.slice().reverse()),
    }));

    await this.retrieve_messages();
  }

  componentWillUnmount() {
    let { conversation } = this.props;
    conversation.store();
  }

  async onSend(messages = []) {
    let { conversation } = this.props;
    try {
      let response = await fetch(`${SERVER}/ajax/chat/send`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel_id: conversation.channel_id,
          push_token: conversation.push_token,
          messages: messages.map(m => ({ user_id: 1, datetime: m.createdAt, text: m.text, id: m._id })),
        }),
      });
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));
      conversation.messages = conversation.messages.concat(messages);
      console.log(conversation.messages);
      conversation.store();
    } catch (err) {
      Toast.show({
        text: err.toString(),
        position: 'bottom',
        buttonText: 'Ok',
        type: 'danger',
        duration: 3000,
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          forceGetKeyboardHeight={Platform.OS === 'android' && Platform.Version < 21}
          renderAvatar={null}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === 'android' ? <KeyboardSpacer /> : null}
      </View>
    );
  }
}
