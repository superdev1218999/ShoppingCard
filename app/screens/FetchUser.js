import { connect } from 'react-redux'
import { getUserById } from '../redux/Actions/UserActions';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Container } from 'native-base'
import CustomIndicator from '../appComponents/CustomIndicator';

function mapDispatchToProps(dispatch) {
  return {
    getUserById: (userId) => {
      dispatch(getUserById(userId))
    }
  }
}

class FetchUser extends PureComponent {
  componentDidMount = () => {
    this.props.getUserById(this.props.userId);
  }

  render = () => {
    return (
      <Container>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <CustomIndicator
            isFetching={true}
            empty={true}
            error={''}
            errorText={''}
          />
        </View>
      </Container>
    );
  }
}

export default connect(null, mapDispatchToProps)(FetchUser)