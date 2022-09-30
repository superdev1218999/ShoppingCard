import React, { PureComponent } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AppImage from '../functions/image';
import { connect } from 'react-redux';
import { removeFromCart } from '../redux/Actions/CartAction';

class ItemCell extends PureComponent {

  _removeItemFromCart = () => {
    Alert.alert(
      'Warning',
      'Are you sure?',
      [
        {
          text: 'Ok',
          onPress: () => { this.props.removeFromCart(this.props.listItem); },
        },
        {
          text: 'Cancel',
          onPress: () => { console.log('cancel') },
        }
      ],
    )
  }

  render = () => {
    return (
      (!this.props.fromCardView) ?
        <TouchableOpacity onPress={() => Actions.push('itemDetails', { 'itemDesc': this.props.listItem })}>
          <View style={ItemCellStyle.MainContainer}>
            <View style={{ flex: 0.3, alignItems: 'stretch' }}>
              <Image
                style={ItemCellStyle.Image}
                source={{ uri: this.props.listItem.image }}
              />
            </View>
            <View style={ItemCellStyle.InnerContainer}>
              <Text numberOfLines={1} style={ItemCellStyle.ItemName}>{this.props.listItem.name}</Text>
              <Text style={ItemCellStyle.ItemPrice}>Rs {this.props.listItem.price}.00</Text>
            </View>
          </View>
        </TouchableOpacity>
        :
        <TouchableOpacity>
          <View style={ItemCellStyle.MainContainer}>
            <View style={{ flex: 0.3, alignItems: 'stretch' }}>
              <Image
                style={ItemCellStyle.Image}
                source={{ uri: this.props.listItem.image }}
              />
            </View>
            <View style={ItemCellStyle.InnerContainer}>
              <Text numberOfLines={1} style={ItemCellStyle.ItemName}>{this.props.listItem.name}</Text>
              <Text style={ItemCellStyle.ItemPrice}>Rs {this.props.listItem.price}.00</Text>
              <Text style={ItemCellStyle.ItemPrice}>Ordered Item Count: {this.props.listItem.count}</Text>
              <Text style={ItemCellStyle.ItemPrice}>Total Price: {this.props.listItem.count * this.props.listItem.price}</Text>
            </View>
            <View style={ItemCellStyle.ImageWrapper}>
              <TouchableOpacity onPress={this._removeItemFromCart}>
                <Image source={AppImage.delete} style={ItemCellStyle.DeleteImage} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (item) => {
      dispatch(removeFromCart(item))
    }
  }
}

export default connect(null, mapDispatchToProps)(ItemCell);

const ItemCellStyle = StyleSheet.create({
  'MainContainer': {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 5,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 4,
    backgroundColor: "#FFFFFF", // invisible color
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
    height: 120
  },
  'Image': {
    flex: 1
  },
  DeleteImage: {
    width: 40,
    height: 40
  },
  ImageWrapper: {
    //position: 'absolute',
    //top: 5,
    //right: 5
    flex: 0.12
  },
  'InnerContainer': {
    flex: 0.58
  },
  'ItemName': {
    paddingLeft: 10,
    fontWeight: '800',
    fontSize: 17,
    width: 150
  },
  ItemPrice: {
    paddingLeft: 10,
    fontWeight: '300',
    fontSize: 13
  }
});

