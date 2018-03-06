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
  Card,
  CardItem,
} from 'native-base';
import { Image, AsyncStorage, TouchableOpacity, View, TextInput } from 'react-native';

import Conversation from '../chat/Conversation';
import styles, { deviceWidth, deviceHeight } from '../styles';
import { send_review } from '../Util';

export default class About extends Component {
  state = { rating: 5, review: '' };
	
	componentWillMount() {
		let conversation = new Conversation();
		conversation.load();
		this.setState({ conversation });
	}
	
	send(id, uid, rating, review) {
		send_review(id, uid, rating, review).then(() => this.props.navigation.navigate('Review', { id }))
	}
	
  render() {
    let id = this.props.navigation.state.params.id;
    let { rating, conversation } = this.state;
    let style = {
      fontSize: 28,
      color: 'orange',
    };
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Review', { id })}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Write Review</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Card>
            <CardItem>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
				<Text style={{ fontWeight: 'bold'}}>Rate: </Text>
                <TouchableOpacity onPress={() => this.setState({ rating: 1 })}>
                  <Icon style={style} name="ios-star" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ rating: 2 })}>
                  <Icon style={style} name={rating > 1 ? 'ios-star' : 'ios-star-outline'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ rating: 3 })}>
                  <Icon style={style} name={rating > 2 ? 'ios-star' : 'ios-star-outline'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ rating: 4 })}>
                  <Icon style={style} name={rating > 3 ? 'ios-star' : 'ios-star-outline'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ rating: 5 })}>
                  <Icon style={style} name={rating > 4 ? 'ios-star' : 'ios-star-outline'} />
                </TouchableOpacity>
              </View>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text style={{ fontWeight: 'bold'}}>Review</Text>
            </CardItem>
            <CardItem body>
              <TextInput
                multiline={true}
                numberOfLines={10}
                onChangeText={review => this.setState({ review })}
                value={this.state.review}
                style={{ height: 160, borderColor: 'gray', borderWidth: 1, flex: 1 }}
              />
            </CardItem>
            <CardItem>
              <Left>
                <Button rounded info small onPress={() => this.send(id, conversation.channel_id, this.state.rating, this.state.review)}>
                  <Text>Submit</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
