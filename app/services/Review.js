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
  Toast,
  Card,
  CardItem,
} from 'native-base';
import { View } from 'react-native';
import moment from 'moment';
import styles, { deviceWidth } from '../styles';
import { SERVER } from '../Util';
const services = require('./services.js').default;

class Star extends Component {
  render() {
    let { rating, size, stats } = this.props;
    if (stats) {
      rating = stats.rating;
    } else {
      rating = parseInt(rating);
    }
    let style = {
      fontSize: size == 'small' ? 16 : 28,
      color: 'orange',
    };
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        {stats && <Text style={{ fontWeight: 'bold' }}>{`${stats.rating.toFixed(2)} `}</Text>}
        <Icon style={style} name="ios-star" />
        <Icon style={style} name={rating < 1.5 ? 'ios-star-outline' : rating < 2 ? 'ios-star-half' : 'ios-star'} />
        <Icon style={style} name={rating < 2.5 ? 'ios-star-outline' : rating < 3 ? 'ios-star-half' : 'ios-star'} />
        <Icon style={style} name={rating < 3.5 ? 'ios-star-outline' : rating < 4 ? 'ios-star-half' : 'ios-star'} />
        <Icon style={style} name={rating < 4.5 ? 'ios-star-outline' : rating < 5 ? 'ios-star-half' : 'ios-star'} />
        {stats && <Text style={{ color: 'blue', fontWeight: 'bold' }}>{`${stats.number} reviews`}</Text>}
      </View>
    );
  }
}

export default class Review extends Component {
  state = { reviews: [] };

  _statistic(data) {
    let total = 0;
    let number = 0;
    let rating = 0;
    let irating = [0, 0, 0, 0, 0];
    data.map(e => {
      let r = parseInt(e.rating);
      number += 1;
      total += r;
      irating[r - 1] += 1;
    });
    if (number) {
      rating = total / number;
    }
    return {
      total,
      number,
      rating,
      irating,
    };
  }

  _dummy() {
    let reviews = [
      {
        name: 'AAA',
        date: '2018-02-20',
        rating: '5',
        review:
          'Beware when using computed properties as their value might change each time you are calling them. Also, they can change any other value in their enclosing scope if a setter is used (more below)!!!',
      },
      {
        name: 'BBB',
        date: '2018-02-20',
        rating: '4',
        review:
          'To start, you have to write a variable and explicitly declare the type of the property to help the compiler know what kind of value will be assigned to it.',
      },
      {
        name: 'CCC',
        date: '2018-02-20',
        rating: '5',
        review:
          'To start, you have to write a variable and explicitly declare the type of the property to help the compiler know what kind of value will be assigned to it.',
      },
    ];
    let stats = this._statistic(reviews);
    this.setState({ reviews, stats });
    console.log(stats);
  }

  componentDidMount() {
    let id = this.props.navigation.state.params.id;
    this._dummy();
    fetch(`${SERVER}/ajax/rating/retrieve`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        department_id: id,
      }),
    })
      .then(response => response.json())
      .then(json => {
        let reviews = json.reviews;
        let stats = this._statistic(reviews);
        this.setState({ reviews, stats });
      })
      .catch(error =>
        Toast.show({
          text: "Can't update review",
          position: 'bottom',
          buttonText: 'Ok',
          type: 'warning',
        })
      );
  }

  render() {
    let id = this.props.navigation.state.params.id;
    let service = services.filter(e => e.id == id)[0];
    let { stats, reviews } = this.state;
    console.log(stats);
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Services')}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ width: deviceWidth - 80 }}>{service.name}</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Card>{stats && <Star stats={stats} />}</Card>
          {reviews.map((review, id) => (
            <Card key={id}>
              <CardItem>
                <Left>
                  <Text style={{ marginLeft: 0, fontSize: 12, fontWeight: 'bold' }}>{review.name}</Text>
                </Left>
                <Body />
                <Right>
                  <Text style={{ fontSize: 12 }}>{moment(review.date).format('YYYY-MM-DD')}</Text>
                </Right>
              </CardItem>
              <CardItem cardBody>
                <Text style={{ margin: 10 }}>{review.review}</Text>
              </CardItem>
              <CardItem>
                <Left>
                  <Star size="small" rating={review.rating} />
                </Left>
              </CardItem>
            </Card>
          ))}
        </Content>

        <Footer>
          <FooterTab>
            <Button active full onPress={() => this.props.navigation.navigate('WriteReview', { id })}>
              <Text>Write Review</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
