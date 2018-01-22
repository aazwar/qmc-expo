import React, { Component } from 'react';
import { Image } from 'react-native';
import { Content, Text, List, ListItem, Icon, Container, Left, Right, Badge } from 'native-base';
import { FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import styles from './styles';

const drawerCover = require('./assets/drawer-cover.png');
const drawerImage = require('./assets/quttainah-logo.png');

const datas = [
  {
    name: 'Home',
    route: 'Home',
    icon: <Icon active ios="ios-home" android="md-home" style={{ color: '#777', fontSize: 26, width: 30 }} />,
    bg: '#C5F442',
  },
  {
    name: 'About Us',
    route: 'About',
    icon: <MaterialCommunityIcons active name="quicktime" style={{ color: '#777', fontSize: 26, width: 30 }} />,
    bg: '#C5F442',
  },
  {
    name: 'Departments/Services',
    route: 'Services',
    icon: <FontAwesome name="group" style={{ color: '#777', fontSize: 26, width: 30 }} />,
    bg: '#C5F442',
  },
  {
    name: 'Doctors',
    route: 'Doctors',
    icon: <FontAwesome name="stethoscope" style={{ color: '#777', fontSize: 26, width: 30 }} />,
    bg: '#C5F442',
  },
  {
    name: 'Book an Appointment',
    route: 'Appointment',
    icon: 'calendar',
    bg: '#C5F442',
  },
  {
    name: 'Contact',
    route: 'Contact',
    icon: 'call',
    bg: '#C5F442',
  },
  {
    name: '360º Virtual Tour',
    route: 'Tour',
    icon: 'images',
    bg: '#C5F442',
  },
  {
    name: 'Chat',
    route: 'Chat',
    icon: 'chatbubbles',
    bg: '#C5F442',
  },
  /*{
    name: 'History',
    route: 'History',
    icon: 'phone-portrait',
    bg: '#C5F442',
  },*/
  {
    name: 'Rating',
    route: 'Rating',
    icon: 'star',
    bg: '#C5F442',
  },
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    };
  }

  render() {
    let renderIcon = icon => {
      if (typeof icon == 'string') {
        return <Icon active name={icon} style={{ color: '#777', fontSize: 26, width: 30 }} />;
      } else {
        return icon;
      }
    };
    return (
      <Container>
        <Content bounces={false} style={{ flex: 1, backgroundColor: '#fff', top: -1 }}>
          <Image source={drawerCover} style={styles.drawerCover} />
          <Image square style={styles.drawerImage} source={drawerImage} />
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
                <Left>
                  {renderIcon(data.icon)}
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg,
                      }}>
                      <Text style={styles.badgeText}>{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
