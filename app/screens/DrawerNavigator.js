import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, SectionList, Image } from 'react-native';
import DrawerCell from '../appComponents/DrawerCell';
import Images from '../functions/image';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container } from 'native-base';
import PropTypes from 'prop-types';
//import { CachedImage } from 'react-native-cached-image';

class DrawerNavigator extends PureComponent {
	static propTypes = {
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		userType: PropTypes.string.isRequired,
		imgUrl: PropTypes.string.isRequired,
		nic: PropTypes.string.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			firstName: this.props.userProfile.firstName,
			lastName: this.props.userProfile.lastName,
			userType: this.props.userProfile.designation,
			imgUrl: this.props.userProfile.photo,
			nic: this.props.userProfile.pid
		}
	};

	static getDerivedStateFromProps = (props, state) => {
		const newState = {};

		if (props.userProfile.firstName != state.firstName) {
			newState.firstName = props.userProfile.firstName;
		}
		if (props.userProfile.lastName != state.lastName) {
			newState.lastName = props.userProfile.lastName;
		}
		if (props.userProfile.designation != state.userType) {
			newState.userType = props.userProfile.designation;
		}
		if (props.userProfile.photo != state.imgUrl) {
			newState.imgUrl = props.userProfile.photo;
		}
		if (props.userProfile.pid != state.nic) {
			newState.nic = props.userProfile.pid;
		}

		return newState;
	}

	logout = () => {
		Actions.Logout({ type: ActionConst.RESET });
	}

	goToHome = () => {
		console.log('home to');
	}

	goToChangeLanguage = () => {

	}

	goToMyAccount = () => {

	}

	goToSync = () => {

	}

	goToAbout = () => {

	}

	goToHelpandSupport = () => {

	}

	goToContact = () => {

	}

	returnSideMenuList = () => {
		let sections = [
			{ key: "home", data: [{ action: this.goToHome, icon: Images.plus, title: 'Parking', key: "1" }] },
			{ key: "language", data: [{ action: this.goToChangeLanguage, icon: Images.minus, title: 'Gps', key: "2" }] },
			{ key: "logout", data: [{ action: this.logout, icon: Images.delete, title: 'Sign out', key: "0" }] }
		];

		return sections;
	}

	render = () => {
		let firstName = '';
		let lastName = '';
		let designation = '';
		let Id = '';
		let imgUrl = '';

		if (this.state.firstName && this.state.lastName && this.state.userType && this.state.nic && this.state.imgUrl) {
			firstName = this.state.firstName;
			lastName = this.state.lastName;
			designation = this.state.userType;
			Id = this.state.nic;
			imgUrl = this.state.imgUrl;
		}
		return (
			<Container>
				<View style={styles.header}>
					<View style={{ width: '100%', height: '100%', backgroundColor: '#3540CC' }} />
					<View style={styles.detailContainer}>
						{(imgUrl === 'string') ?
							<Image
								source={Images.defaultLogo}
								style={{
									width: 75,
									height: 75,
									borderColor: '#FFFFFF',
									borderWidth: 2, 
									borderRadius: 75 / 2
								}}
							/>
							:
							<Image
								source={{ uri: imgUrl }}
								style={{
									width: 75,
									height: 75,
									borderColor: '#FFFFFF',
									borderWidth: 2,
									borderRadius: 75 / 2
								}}
							/>
						}
						<View style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)', marginLeft: 13 }}>
							<Text style={[styles.navHeaderName]}>{firstName}</Text>
							<Text style={[styles.navHeaderName]}>{lastName}</Text>
							<Text style={[styles.navHeaderUserRole]}>{designation}</Text>
							<Text style={[styles.navHeaderUserId]}>{Id}</Text>
						</View>
					</View>
				</View>
				<View>
					<SectionList
						sections={this.returnSideMenuList()}
						renderItem={({ item }) =>
							<DrawerCell
								icon={item.icon}
								title={item.title}
								action={item.action.bind(this)}
							/>
						}
						renderSectionHeader={({ section }) =>
							section.key === "logout" ?
								<View style={{ flex: 1, height: 0.4, backgroundColor: "#DFDFDF" }} />
								:
								null
						}
					/>
				</View>
				<View style={{ flexDirection: 'row', position: 'absolute', bottom: 2 }}>
					<View style={{ flexDirection: 'row', flex: 3 }}>
						<Text style={{ color: '#ffaf20', fontSize: 20, fontWeight: '300', marginLeft: 20 }}>CITY</Text>
						<Text style={{ color: '#ffaf20', fontSize: 20, fontWeight: 'bold' }}>MEAD</Text>
					</View>
					<View style={{ flex: 1 }}>
						<Text style={{ color: '#828282', fontSize: 18, fontWeight: 'normal' }}>V 0.1</Text>
					</View>
				</View>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		height: 140
	},
	detailContainer: {
		position: 'absolute',
		bottom: 30,
		left: 25,
		flexDirection: 'row',
	},
	navHeaderName: {
		fontSize: 20,
		color: '#FFFFFF',
		fontWeight: 'bold'
	},
	navHeaderUserRole: {
		fontSize: 15,
		color: '#FFFFFF',
		fontWeight: 'normal'
	},
	navHeaderUserId: {
		fontSize: 15,
		color: '#FFFFFF',
		fontWeight: 'normal'
	}
});

const mapStateToProps = (state) => {
	return {
		userProfile: state.user.userProfile,
	}
}

export default connect(mapStateToProps, null)(DrawerNavigator);