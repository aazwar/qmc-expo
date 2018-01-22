import React, { Component } from 'react';
import { Container, Header, Title, Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body } from 'native-base';

import styles from './styles';
import MarkDown from './MarkDown';

export default class About extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>About QMC</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <MarkDown>
            {`*Practice Philosophy*

Dr. Quttainah is dedicated to the highest standard of patient safety, care and surgical excellence. Full consultations are given to each patient allowing for individualized care and treatment. Our clinic strives to achieve the results you desire, and through education and communication we can ensure you are satisfied with your results. Dr. Quttainah uses the latest technology, advanced techniques, specialized training and skills to give his patients the best possible results from their cosmetic or reconstructive procedures.
 
Using his extensive background in cosmetic and reconstructive microsurgery, Dr. Quttainah brings to each patient a unique combination of advanced surgical experience that will maximize their cosmetic enhancements. We understand that plastic surgery is a life changing decision, and our main goal is to allow our patients the opportunity to communicate their needs in a comfortable and professional atmosphere, ensuring privacy and confidentiality regarding all treatments.
      
*Our Vision*
      
To provide each patient with the world-class care, exceptional service and results.
      
*Our Mission*

Our mission at the Quttainah Medical Center is to provide a safe, comfortable and effective service to our patients. We strive to give exceptional service and leading edge treatmentsl. We strive for optimum results and complete satisfaction.
 
We base our treatments on extensive experience and clinical evidence. Our goal is to educate our patients an give each patient individualized treatment according to their needs. We will ensure that you will have a pleasant experience and will receive expert care with exceptional results.

*Our Values*
      
- Compassion
- A commitment to quality
- Accountability
- Respect for the individual innovation
- Research based treatments
- Highly qualified and Educated Staff

`}
          </MarkDown>
        </Content>
      </Container>
    );
  }
}
