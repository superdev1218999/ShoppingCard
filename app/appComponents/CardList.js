import React, { PureComponent } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class CardList extends PureComponent {
  render = () => {
    return (
      <TouchableOpacity>
        <View style={ItemCellStyle.MainContainer}>
          <Image
            style={ItemCellStyle.Image}
            source={{ uri: this.props.imgUrl }}
          />
          <View style={ItemCellStyle.InnerContainer}>
            <Text style={ItemCellStyle.ItemName}>{this.props.name}</Text>
            <Text style={ItemCellStyle.ItemPrice}>Rs {this.props.price}.00</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default connect(null, null)(CardList);

const ItemCellStyle = StyleSheet.create({
  'MainContainer': {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 4,
    // background color must be set
    backgroundColor: "#FFFFFF", // invisible color
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#FFFFFF'
  },
  'Image': {
    width: 100,
    height: 100
  },
  'InnerContainer': {
    flexDirection: 'column',
    paddingLeft: 10
  },
  'ItemName': {
    fontWeight: '800',
    fontSize: 17
  },
  ItemPrice: {
    fontWeight: '300',
    fontSize: 13
  }
});