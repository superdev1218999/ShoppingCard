import React, { PureComponent } from 'react';
import {
	View,
	Text,
	StyleSheet,
	StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { login } from '../redux/Actions/AuthActions';
import { Container, Content, Button, Icon, Form, Item, Label, Input } from 'native-base';
import BackendFactory from '../server/BackendFactory';

class Login extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			nic: '',
			password: '',
			passError: '',
			nicError: '',
			isLogging: false,
			isPushedToken: false,
			showPassword: false,
			showText: 'SHOW'
		}
	}

	componentDidMount = () => {
		console.log('in the logging screen');
	}

	showPassword = () => {
		if (this.state.showPassword)
			this.setState({
				showPassword: false,
				showText: 'HIDE'
			});
		else
			this.setState({
				showPassword: true,
				showText: 'SHOW'
			});
	}

	LoginToDashboard = () => {
		if (this.state.password !== '' && this.state.passError === '' && this.state.nic !== '' && this.state.nicError === '') {
			this.props.login(this.state.nic, this.state.password);
		}
		else {
			if (this.state.password === '') {
				this.setState({
					passError: 'Please enter a password'
				});
			}
		}
	}

	// persistPushToken = () => {
	// 	this.setState({ isPushedToken: true }, () => {
	// 		BackendFactory((api) => {
	// 			api.persistPushToken((res, error) => {
	// 				if (res && res.data === '') {
	// 					this.setState({ isPushedToken: false }, () => Actions.ongoingJob());
	// 				}
	// 				else {
	// 					this.setState({ isPushedToken: false }, () => this.dropdown.alertWithType('error', 'Error', error.message));
	// 				}
	// 			});
	// 		});
	// 	});
	// }

	passwordIsEmpty = (text) => {
		if (text.length < 8) {
			this.setState({
				passError: 'Please enter a password',
				password: text
			});
		}
		else {
			this.setState({
				passError: '',
				password: text
			});
		}
	}

	validateNIC = (nic) => {
		let reg = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;
		if (reg.test(nic)) {
			this.setState({
				nicError: '',
				nic: nic
			});
		}
		else {
			this.setState({
				nicError: 'NIC Number not correct',
				nic: nic
			});
		}
	}

	handleFacebookLogin = () => {
		BackendFactory((api) => {
			api.fburl((res, error) => {
				if (res) {
					console.log(res.results);
					//console.log('Facebook URL Failure');
					//Actions.push('Facebook', { fburl: data.results })
				} else {
					//	Open Facebook WebView
					console.log(res);
				}
			});
		});
	};

	render = () => {
		return (
			<Container>
				<StatusBar translucent animated barStyle="dark-content" backgroundColor='rgba(0,0,0,0)' />
				<Content keyboardShouldPersistTaps='always'>
					<View style={Loginstyle.innerContainer}>
						<View style={Loginstyle.iconTop}>
							<Text style={Loginstyle.iconTopText}>HM</Text>
						</View>

						<View style={{ marginBottom: 10 }}>
							<Button
								rounded block iconLeft
								//disabled={this.props.auth.form.isFetching}
								onPress={this.handleFacebookLogin}
								style={StyleSheet.flatten(Loginstyle.fbButton)}>
								<Icon name='logo-facebook' />
								<Text style={Loginstyle.loginButtonText}>Continue with Facebook</Text>
							</Button>
						</View>

						<View style={Loginstyle.orTextDividerContainer}>
							<Text style={{ fontSize: 17 }}>OR</Text>
						</View>

						<Form>
							<Item stackedLabel error={(this.state.nicError !== '') ? true : false}>
								<Label>Nic</Label>
								<Input
									keyboardType='default'
									//disabled={this.props.auth.form.isFetching}
									onChangeText={(nic) => this.validateNIC(nic)}
									autoCapitalize='none'
								/>
							</Item>
							<Text style={Loginstyle.fieldErrorText}>{this.state.nicError}</Text>

							<View style={Loginstyle.passwordFieldContainer}>
								<Item stackedLabel error={(this.state.passError !== '') ? true : false} style={StyleSheet.flatten(Loginstyle.passwordField)}>
									<Label>Password</Label>
									<Input
										secureTextEntry={!this.state.showPassword}
										//disabled={this.props.auth.form.isFetching}
										onChangeText={(password) => this.passwordIsEmpty(password)}
										value={this.state.password}
									/>
								</Item>

								<Icon
									active
									name={(this.state.showPassword) ? 'eye' : 'eye-off'}
									onPress={() => this.showPassword()}
									style={StyleSheet.flatten(Loginstyle.showPasswordIcon)} />
							</View>

							<Text style={Loginstyle.fieldErrorText}>{this.state.passError}</Text>
						</Form>

						<View style={Loginstyle.loginButtonContainer}>
							<Button
								rounded block
								disabled={this.state.nic === '' || this.state.password === '' || this.state.passError !== '' || this.state.nicError !== ''}
								onPress={this.LoginToDashboard}
								style={StyleSheet.flatten((this.state.nic === '' || this.state.password === '' || this.state.passError !== '' || this.state.nicError !== '') ? Loginstyle.loginButtonDisabled : Loginstyle.loginButton)}>
								<Text style={Loginstyle.loginButtonText}>Login</Text>
							</Button>
						</View>

						<View style={[Loginstyle.navLinkContainer, { flexDirection: 'row' }]}>
							<Text style={[Loginstyle.navLinkText, { flex: 1, textAlign: 'center' }]}>
								{'Forgot your password? '}
								<Text
									onPress={() => console.log('forget password')}
									style={Loginstyle.navLink}>
									{'Reset password'}
								</Text>
							</Text>
						</View>
					</View>
				</Content>
			</Container>
		)
	}

}

const mapDispatchToProps = (dispatch) => {
	return {
		login: (email, password) => {
			dispatch(login(email, password))
		}
	}
}

const Loginstyle = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#DCDCDC',
	},
	innerContainer: {
		marginLeft: 16,
		marginRight: 16,
		marginBottom: 10,
		marginTop: 10
	},
	iconTop: {
		backgroundColor: '#7573E1',
		width: 100,
		height: 100,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		marginBottom: 30,
		marginTop: 20
	},
	iconTopText: {
		color: '#FFFFFF',
		fontSize: 22,
		fontWeight: 'bold'
	},
	fbButton: {
		backgroundColor: '#4862a3',
	},
	orTextDividerContainer: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 5,
		justifyContent: 'center',
	},
	loginButtonContainer: {
		marginBottom: 10
	},
	loginButton: {
		backgroundColor: '#095ae4',
		marginTop: 8,
	},
	loginButtonDisabled: {
		backgroundColor: '#7d9de4',
		marginTop: 8,
	},
	loginButtonText: {
		fontSize: 15,
		color: 'white',
		marginLeft: 10
	},
	fieldErrorText: {
		color: 'red',
		marginLeft: 15
	},
	showPasswordIcon: {
		paddingTop: 30,
		color: 'gray'
	},
	passwordFieldContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	passwordField: {
		flex: 1
	},
	navLinkContainer: {
		marginTop: 10,
		marginBottom: 10,
		flexDirection: 'row',
		alignSelf: 'center',
	},
	navLinkText: {
		fontSize: 14,
		color: '#303f9f'
	},
	navLink: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#303f9f'
	},
	loginButton: {
		backgroundColor: '#000000'
	},
	loginButtonText: {
		fontSize: 16,
		color: 'white',
		marginLeft: 10
	}
});

export default connect(null, mapDispatchToProps)(Login);
