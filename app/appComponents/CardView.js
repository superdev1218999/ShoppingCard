import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

class CardView extends PureComponent {
  render = () => {
    return (
      <TouchableOpacity>
        <View style={CardViewStyle.CardWrapper}>
          <Image
            style={CardViewStyle.Image}
            source={{ uri: this.props.imgUrl }}
          />
          <Text style={CardViewStyle.MainText}>{this.props.name}</Text>
          <Text style={CardViewStyle.TinyText}>Rs {this.props.price}.00</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const CardViewStyle = StyleSheet.create({
  CardWrapper: {
    width: 170,
    height: 260,
    flexDirection: 'column',
    margin: 10,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 4,
    // background color must be set
    backgroundColor: "#FFFFFF" // invisible color
  },
  Image: {
    width: 170,
    height: 200
  },
  MainText: {
    fontSize: 17,
    color: '#353437',
    fontWeight: '800',
    paddingLeft: 5
  },
  TinyText: {
    fontSize: 13,
    paddingLeft: 5
  }
});


export default CardView;


