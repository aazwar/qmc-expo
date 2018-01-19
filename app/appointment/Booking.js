import React, { Component } from 'react';
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
  Form,
  Item,
  Input,
  Label,
} from 'native-base';

import styles, { deviceWidth } from '../styles';

export default class Book extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
          <Form>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input />
            </Item>
            <Item stackedLabel last>
              <Label>Family Name</Label>
              <Input />
            </Item>
            <Item stackedLabel last>
              <Label>Mobile Number</Label>
              <Input />
            </Item>
          </Form>
        </Content>

        <Footer>
          <FooterTab>
            <Button active full>
              <Text>Book</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
