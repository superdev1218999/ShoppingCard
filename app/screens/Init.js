import React, { PureComponent } from 'react';
import { getSessionToken } from '../redux/Actions/AuthActions';
import { connect } from 'react-redux';
import CustomIndicator from '../appComponents/CustomIndicator';

class Init extends PureComponent {

  componentDidMount = () => {
    this.props.getSessionToken();
  }

  render = () => {
    return (
      <CustomIndicator
        isFetching={true}
        empty={false}
        error={''}
        errorText={''}
      />
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    getSessionToken: () => {
      dispatch(getSessionToken())
    }
  }
}

export default connect(null, mapDispatchToProps)(Init);