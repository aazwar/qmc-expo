import React, { Component } from 'react';
import { Permissions, Notifications } from 'expo';
import { View, Alert } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  Left,
  Right,
  Body,
  Form,
  Input,
  Item,
  Label,
  Separator,
  H3,
  FooterTab,
  Toast,
} from 'native-base';
import uuid from 'uuid';

import styles from '../styles';
import { SERVER } from '../Util';

export default class Register extends Component {
  state = {
    name: '',
  };

  componentWillMount() {}

  async register() {
    let { conversation } = this.props;
    let { setting } = this.props.screenProps;
    try {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;

      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }

      // Stop here if the user did not grant permissions
      if (finalStatus !== 'granted') {
        throw Error('Failed to obtain permission');
      }

      setting.name = this.state.name;
      if (!setting.name) {
        throw Error('Name is blank');
      }
      setting.store();

      if (!conversation.push_token) {
        conversation.push_token = await Notifications.getExpoPushTokenAsync();
        conversation.channel_id = `QMC-${uuid.v4()}`;
        conversation.store();
      }

      let response = await fetch(`${SERVER}/ajax/chat/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: setting.name,
          channel_id: conversation.channel_id,
          push_token: conversation.push_token,
        }),
      });
      if (response.status == 200 && response._bodyText == 'Success') {
        this.props.reload();
      } else {
        Toast.show({
          text: 'Error registering chat. Try again later',
          position: 'bottom',
          buttonText: 'Ok',
          type: 'danger',
          duration: 3000,
        });
      }
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
        <Content padder>
          <Form>
            <Separator bordered>
              <H3>Chat Registration</H3>
            </Separator>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
                autoCorrect={false}
                autoCapitalize="words"
              />
            </Item>
            <Item>
              <Text>Please enter your name so our staff can recognize you.</Text>
            </Item>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button active full onPress={this.register.bind(this)}>
              <Text>Register Chat</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }
}
