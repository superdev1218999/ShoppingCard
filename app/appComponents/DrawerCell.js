import React, { PureComponent } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

class DrawerCell extends PureComponent {
	render = () => {
		return (
			<TouchableOpacity onPress={this.props.action}>
				<View style={{ height: 50, flex: 1, alignItems: 'center', flexDirection: 'row' }}>
					<View style={{ left: 20, flexDirection: 'row', flex: 1 }}>
						<Image source={this.props.icon} style={{ width: 20, height: 20, tintColor: this.props.iconColor }} />
						<View style={{ left: 10, alignItems: 'center' }}>
							<Text style={{ fontSize: 17, color: '#4F4F4F', fontWeight: '300' }}>{this.props.title}</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

export default DrawerCell;