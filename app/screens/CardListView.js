import React, { PureComponent } from 'react';
import { FlatList, View, TouchableOpacity, Image, Text } from 'react-native';
import { Container, Header, Left, Body, Right, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import ItemCell from '../appComponents/itemCell';
import AppImage from '../functions/image';
import { connect } from 'react-redux';

class CardListView extends PureComponent {

  render = () => {
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
            <Title style={{ color: '#FFFFFF', alignSelf: 'center' }}>My CardList</Title>
          </Body>
          <Right />
        </Header>

        <View style={{ flex: 1, backgroundColor: '#EBEBEB' }}>
          {(this.props.cardList.length > 0) ?
            <FlatList
              data={this.props.cardList}
              extraData={this.props}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({ item }) => <ItemCell listItem={item} fromCardView={true} />}
              scrollEnabled={true}
            />
            :
            <View style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            >
              <Text style={{ fontSize: 17, fontWeight: '500' }}>Card is Empty.</Text>
            </View>
          }
        </View>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cardList: state.card.cardList
  }
}

export default connect(mapStateToProps, null)(CardListView);