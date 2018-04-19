import React, { Component } from 'react';
import { ImageBackground, Image, TouchableOpacity } from 'react-native';
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
} from 'native-base';
import { Row, Col } from 'react-native-easy-grid';
import styles, { deviceWidth, contentHeight } from './styles';

import { register, ask_permission } from './Util';

export default class Home extends Component {
  componentWillMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
    let { setting } = this.props.screenProps;

    if (!ask_permission()) {
      Toast.show({
        text: 'App permission is not granted!',
        position: 'bottom',
        buttonText: 'Ok',
        type: 'danger',
        duration: 3000,
      });
    }

    register(setting);
  }

  render() {
    let style = {
      icon: { width: deviceWidth * 0.7 / 3, height: deviceWidth * 0.7 / 3 },
      col: { justifyContent: 'flex-start', alignItems: 'center', margin: 10 },
      row: { height: deviceWidth / 3 + 50 },
      text: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
      },
    };
    let menu = [
      { text: 'Call Us', icon: require('./assets/icons/call.png'), screen: 'CallUs' },
      { text: 'Book an Appointment', icon: require('./assets/icons/appointment.png'), screen: 'Appointment' },
      { text: 'Find a Doctor', icon: require('./assets/icons/doctor.png'), screen: 'Doctor' },

      { text: '360º Virtual Tour', icon: require('./assets/icons/360-tour.png'), screen: 'Tour' },
      { text: 'Surgery Case History', icon: require('./assets/icons/history.png'), screen: 'Gallery' },
      { text: 'Rate Our Service', icon: require('./assets/icons/rate.png'), screen: 'Services' },

      { text: 'Live Chat', icon: require('./assets/icons/chat.png'), screen: 'Chat' },
    ];
		let nav = this.props.navigation;

    function renderCell(index) {
      let cell = menu[index];
      return (
        <Col style={style.col}>
          <TouchableOpacity onPress={() => nav.navigate(cell.screen)}>
            <Image source={cell.icon} style={style.icon} />
          </TouchableOpacity>
          <Text style={style.text}>{cell.text}</Text>
        </Col>
      );
    }

    return (
      <Container style={styles.container}>
        <Header>
          <Left style={{ width: 50 }}>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title style={{ width: deviceWidth - 100 }}>Quttainah Medical Center</Title>
          </Body>
          <Right />
        </Header>
        <ImageBackground
          source={require('./assets/home-bg.jpg')}
          style={{ height: contentHeight, flex: 1 }}
          imageStyle={{ resizeMode: 'stretch' }}>
          <Row style={style.row}>
            {renderCell(0)}
            {renderCell(1)}
            {renderCell(2)}
          </Row>
          <Row style={style.row}>
            {renderCell(3)}
            {renderCell(4)}
            {renderCell(5)}
          </Row>
          <Row style={style.row}>
						<Col/>
            {renderCell(6)}
						<Col/>
          </Row>
        </ImageBackground>
      </Container>
    );
  }
}
