import React, { PureComponent } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Container, Header, Left, Right, Title, Body, Button, Icon } from 'native-base';
import { getList } from '../redux/Actions/CartAction';
import CardView from '../appComponents/CardView';
import { Actions } from 'react-native-router-flux';
import CardList from '../appComponents/CardList';
import { connect } from 'react-redux';
import CustomIndicator from '../appComponents/CustomIndicator';

class HomeScreen extends PureComponent {

  componentDidMount = () => {
    //this.props.getListRequest();
  }

  _handleRefresh = () => {
    this.props.getList();
  }

  _renderHeaderComponent = () => {
    return (
      <FlatList
        horizontal
        data={this.props.cardData}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => <CardView imgUrl={item.image} name={item.name} price={item.price} />}
      />
    )
  }

  _renderFooterComponent = () => {
    return (
      (this.props.loading) ?
        <CustomIndicator
          isFetching={this.props.loading}
          empty={this.props.cardData.length === 0}
          error={''}
          errorText={''}
        />
        :
        null
    )
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
            <Title style={{ color: '#FFFFFF', alignSelf: 'center' }}>Home</Title>
          </Body>
          <Right />
        </Header>

        <FlatList
          style={{ flex: 1, backgroundColor: '#F3F2F3' }}
          data={this.props.cardData}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => <CardList imgUrl={item.image} name={item.name} price={item.price} />}
          ListHeaderComponent={this._renderHeaderComponent}
          ListFooterComponent={this._renderFooterComponent}
          onRefresh={this._handleRefresh}
          refreshing={this.props.loading}
        />
      </Container>
    );
  }
}

const HomeStyle = StyleSheet.create({
  MainContainer: {
    flexDirection: 'column'
  },
  ButtonWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    //marginBottom: 36,
    padding: 20,
    backgroundColor: '#FFFFFF'
  }
});

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
