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

const departments = require('./departments.js').default;

let moment = require('moment');

export default class Book extends Component {
  state = {
    name: '',
    family_name: '',
    mobile: '',
    birth_date: '',
    birth_date_chooser_visible: false,
    department_id: '',
    department_text: '',
    appointment_date: moment().add(1, 'days').format('YYYY-MM-DD'),
    appointment_date_chooser_visible: false,
    appointment_time: moment().format('HH') + ':00',
    appointment_time_chooser_visible: false,
  };

  async componentWillMount() {
    let { setting } = this.props.screenProps;
    this.setState(setting.values());
  }

  componentWillUnmount() {
    let { setting } = this.props.screenProps;
    setting.assign(this.state);
    setting.store();
  }

  book() {
    let { setting } = this.props.screenProps;
    let birth_date = moment(this.state.birth_date);
    let appointment_time = moment(this.state.appointment_time, 'HH:mm');
    let data = {
      name: this.state.name,
      fam_name: this.state.family_name,
      mobile: this.state.mobile,
      day: birth_date.format('D'),
      month: birth_date.format('MMMM'),
      year: birth_date.format('YYYY'),
      speciality_id: this.state.department_id,
      date: moment(this.state.appointment_date).format('YYYY-MM-DD'),
      hour: appointment_time.format('h'),
      time: appointment_time.format('A'),
    };
    const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
    fetch('http://qmc-kuwait.com/btsup.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    }).then(function(response) {
      let app_data = {
        speciality_id: this.state.speciality_id,
        date: `${this.state.appointment_date}T${moment(this.state.appointment_time).format('HH')}:00:00`,
      };
      console.log(Expo.FileSystem.documentDirectory);
      console.log(app_data);
      Alert.alert('Appointment', response._bodyText, [{ text: 'OK' }], { cancelable: false });
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
          <Form>
            <Separator bordered>
              <H3>Patient Information</H3>
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
            <Separator bordered>
              <H3>Appointment</H3>
            </Separator>
            <Item stackedLabel>
              <Label>Department/Service</Label>
              <Dropdown
                containerStyle={{ alignSelf: 'stretch' }}
                label="Select Department/Service"
                data={departments}
                value={this.state.department_text}
                onChangeText={(value, index, data) => this.setState({ department_id: value, department_text: data[index].label })}
              />
            </Item>
            <Item stackedLabel>
              <Label>Appointment Date</Label>
              <Grid>
                <Col>
                  <Item>
                    <Input value={this.state.appointment_date} editable={false} placeHolder="Appointment Date" />
                    <Icon active name="calendar" onPress={() => this.setState({ appointment_date_chooser_visible: true })} />
                  </Item>
                </Col>
                <Col>
                  <Item>
                    <Input value={this.state.appointment_time} editable={false} placeHolder="Appointment Time" />
                    <Icon
                      active
                      name="ios-clock-outline"
                      onPress={() => this.setState({ appointment_time_chooser_visible: true })}
                    />
                  </Item>
                </Col>
              </Grid>
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
          <DateTimePicker
            date={moment(this.state.appointment_date).toDate()}
            mode="date"
            onConfirm={date =>
              this.setState({ appointment_date: moment(date).format('YYYY-MM-DD'), appointment_date_chooser_visible: false })}
            onCancel={() => this.setState({ appointment_date_chooser_visible: false })}
            isVisible={this.state.appointment_date_chooser_visible}
          />
          <DateTimePicker
            date={moment(this.state.appointment_time, 'HH:mm').toDate()}
            mode="time"
            onConfirm={time =>
              this.setState({ appointment_time: `${moment(time).format('HH')}:00`, appointment_time_chooser_visible: false })}
            onCancel={() => this.setState({ appointment_time_chooser_visible: false })}
            isVisible={this.state.appointment_time_chooser_visible}
          />
        </Content>

        <Footer>
          <FooterTab>
            <Button active full onPress={this.book.bind(this)}>
              <Text>Book an Appointment</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
