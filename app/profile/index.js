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
  Separator,
  H3,
} from 'native-base';
import { Alert } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Col, Row, Grid } from 'react-native-easy-grid';

import Setting from '../Setting';
import styles, { deviceWidth } from '../styles';

let moment = require('moment');

export default class Profile extends Component {
  state = {
    name: '',
    family_name: '',
    mobile: '',
    birth_date: '',
    birth_date_chooser_visible: false,
  };

  async componentWillMount() {
    let { setting } = this.props.screenProps;
    this.setState(setting.values());
  }

  componentWillUnmount() {
    this.save();
  }

  save() {
    let { setting } = this.props.screenProps;
    setting.assign(this.state);
    setting.store();
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                <Icon name="ios-menu" />
              </Button>
            </Left>
            <Body>
              <Title>Profile</Title>
            </Body>
            <Right />
          </Header>

          <Form>
            <Separator bordered>
              <H3>Profile Information</H3>
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
            <Item stackedLabel>
              <Label>Family Name</Label>
              <Input
                onChangeText={family_name => this.setState({ family_name })}
                value={this.state.family_name}
                autoCorrect={false}
                autoCapitalize="words"
              />
            </Item>
            <Item stackedLabel>
              <Label>Birth Date</Label>
              <Grid>
                <Col>
                  <Item>
                    <Input value={this.state.birth_date} editable={false} placeHolder="Birth Date" />
                    <Icon active name="calendar" onPress={() => this.setState({ birth_date_chooser_visible: true })} />
                  </Item>
                </Col>
                <Col />
              </Grid>
            </Item>
            <Item stackedLabel>
              <Label>Mobile Number</Label>
              <Input onChangeText={mobile => this.setState({ mobile })} value={this.state.mobile} keyboardType="phone-pad" />
            </Item>
            <Text />
          </Form>
          <DateTimePicker
            date={this.state.birth_date ? moment(this.state.birth_date).toDate() : new Date()}
            mode="date"
            onConfirm={date =>
              this.setState({ birth_date: moment(date).format('YYYY-MM-DD'), birth_date_chooser_visible: false })}
            onCancel={() => this.setState({ birth_date_chooser_visible: false })}
            isVisible={this.state.birth_date_chooser_visible}
          />
        </Content>

        <Footer>
          <FooterTab>
            <Button active full onPress={this.save.bind(this)}>
              <Text>Save Information</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
