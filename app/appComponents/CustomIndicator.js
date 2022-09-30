import React, { PureComponent } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import PropTypes from 'prop-types';

class LoadingIndicator extends PureComponent {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    empty: PropTypes.bool.isRequired,
    error: PropTypes.any.isRequired,
    errorText: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      isFetching: this.props.isFetching,
      empty: this.props.empty,
      error: this.props.error
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    const newState = {};

    if (props.isFetching != state.isFetching) {
      newState.isFetching = props.isFetching;
    }
    if (props.empty != state.empty) {
      newState.empty = props.empty;
    }
    if (props.error != state.error) {
      newState.error = props.empterrory;
    }

    return newState;
  }

  render = () => {
    return (
      (this.state.isFetching) ?
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#FFFFFF' }}>
          <SkypeIndicator size={40} color='#7573E1' />
        </View>
        :
        (this.state.empty) ?
          <TextErrorView
            errorText={this.props.errorText}
          />
          :
          null
    );
  }


}

export default LoadingIndicator;