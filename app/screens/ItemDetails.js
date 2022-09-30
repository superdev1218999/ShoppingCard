import React, { PureComponent } from 'react';
import { View, Dimensions, Image, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Title } from 'native-base';
import AppImage from '../functions/image';
import CustomToast from '../appComponents/CustomToast';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { addToCart } from '../redux/Actions/CartAction';

class ItemDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      totalPrice: 0.00
    }
  }

  Default_Toast_Bottom = () => {
    this.refs.defaultToastBottom.ShowToastFunction('Item already in the Card');
  }

  Error_Toast_Bottom = () => {
    this.refs.defaultToastTopWithDifferentColor.ShowToastFunction('Please Add Count.');
  }

  Success_Toast_Bottom = () => {
    this.refs.defaultToastTopWithSuccesstColor.ShowToastFunction('Added to Card Succesfully.');
  }

  add = () => {
    this.setState((prevState, nextProps) => ({
      count: prevState.count + 1,
      totalPrice: prevState.totalPrice + this.props.itemDesc.price
    }))
  }

  minus = () => {
    if (this.state.count > 0)
      this.setState((prevState, nextProps) => ({
        count: prevState.count - 1,
        totalPrice: prevState.totalPrice - this.props.itemDesc.price
      }))
  }

  checkAlreadyInCard = (cardItem) => {
    let isExist = this.props.cardList.filter((existingItem) => existingItem.id === cardItem.id);
    if (isExist.length > 0) {
      return true;
    }
    else {
      return false;
    }

  }

  addToMyCart = () => {
    if (this.state.count > 0) {
      const cartItem = {
        price: this.props.itemDesc.price,
        image: this.props.itemDesc.image,
        name: this.props.itemDesc.name,
        count: this.state.count,
        id: this.props.itemDesc.id
      }
      if (!this.checkAlreadyInCard(cartItem)) {
        this.props.addToCart(cartItem);
        this.Success_Toast_Bottom();
      }
      else {
        this.Default_Toast_Bottom();
      }
    }
    else {
      this.Error_Toast_Bottom();
    }
  }

  render = () => {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height * 0.4;

    return (
      <Container>
        <Header>
          <Left>
            <TouchableOpacity onPress={() => Actions.pop()}>
              <Image
                style={{ width: 15, height: 15 }}
                source={AppImage.back}
              />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={{ color: '#FFFFFF', alignSelf: 'center' }}>{this.props.itemDesc.name}</Title>
          </Body>
          <Right />
        </Header>

        <View style={{ flexDirection: 'column' }}>
          <Image
            source={{ uri: this.props.itemDesc.image }}
            style={{ height: height, width: width }}
          />
          <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: '800' }}>Price {this.props.itemDesc.price}.00</Text>

          <View style={{ padding: 10 }} />

          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <TouchableOpacity onPress={() => this.add()}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#EBA023', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={AppImage.plus} style={{ width: 20, height: 20 }} />
              </View>
            </TouchableOpacity>
            <TextInput
              value={this.state.count.toString()}
              maxLength={2}
              multiline={false}
              editable={false}
              style={{
                height: 40,
                width: 100,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#C9C9C9',
                marginLeft: 10,
                marginRight: 10,
                fontSize: 16,
                fontWeight: '700',
                color: '#000000'
              }}
            />
            <TouchableOpacity onPress={() => this.minus()}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#EBA023', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={AppImage.minus} style={{ width: 20, height: 20 }} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ padding: 10 }} />

          <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: '800' }}>Total Price is RS {this.state.totalPrice}</Text>

          <View style={{ padding: 10 }} />

          <TouchableOpacity
            style={{
              width: 150,
              height: 40,
              backgroundColor: '#27AE60',
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center'
            }}
            onPress={() => this.addToMyCart()}
          >
            <Text style={{ fontWeight: '800', color: '#FFFFFF', fontSize: 17 }}>add to card</Text>
          </TouchableOpacity>
        </View>

        <CustomToast ref="defaultToastBottom" position="bottom" />
        <CustomToast ref="defaultToastTopWithDifferentColor" backgroundColor='#D0021B' position="bottom" />
        <CustomToast ref="defaultToastTopWithSuccesstColor" backgroundColor='#236EC5' position="bottom" />
      </Container>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    cardList: state.card.cardList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => {
      dispatch(addToCart(item))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
