import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../redux/Actions/AuthActions';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Container } from 'native-base'
import CustomIndicator from '../appComponents/CustomIndicator';
//import CookieManager from 'react-native-cookies'
//import firebase from 'react-native-firebase';


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...authActions }, dispatch)
  }
}

class Logout extends PureComponent {
  componentDidMount = () => {
    //firebase.analytics().logEvent('logged_out');
    //CookieManager.clearAll();
    this.props.actions.logout();
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

export default connect(null, mapDispatchToProps)(Logout)