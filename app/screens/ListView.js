import React, { PureComponent } from 'react';
import { FlatList, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Container, Header, Left, Right, Title, Body, Button, Icon } from 'native-base';
import ItemCell from '../appComponents/itemCell';
import { Actions } from 'react-native-router-flux';
import { getList } from '../redux/Actions/CartAction';
import { connect } from 'react-redux';
import CustomIndicator from '../appComponents/CustomIndicator';

class ListView extends PureComponent {
  // static navigationOptions = {
  //   tabBarLabel: 'List',
  //   tabBarIcon: ({ tintColor }) => (
  //     <Image
  //       source={Assets.delete}
  //       style={[{ tintColor: tintColor }]}
  //     />
  //   ),
  // };

  componentDidMount = () => {
    this.props.getList();
  }

  render = () => {
    return (
      <Container>
        <Header>
          <Left >
            <Button
              transparent
              onPress={() => Actions.drawerOpen()}>
              <Icon name='menu' style={{ color: '#FFFFFF' }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#FFFFFF', alignSelf: 'center' }}>List</Title>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => Actions.push('cardListView')}>
              <Text style={{ color: '#FFFFFF' }}>Card List</Text>
            </TouchableOpacity>
          </Right>
        </Header>

        <View style={{ flex: 1, backgroundColor: '#EBEBEB' }}>
          {(this.props.loading) ?
            <CustomIndicator
              isFetching={this.props.loading}
              empty={this.props.cardData.length === 0}
              error={''}
              errorText={''}
            />
            :
            <FlatList
              data={this.props.cardData}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({ item }) => <ItemCell listItem={item} fromCardView={false} />}
            />
          }
        </View>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cardData: state.card.cardData,
    loading: state.card.loading,
    error: state.card.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getList: () => {
      dispatch(getList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView);

