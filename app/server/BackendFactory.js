import {apiServices} from './Service'
import {appAuthToken} from '../functions/AppAuthToken';
import {Actions, ActionConst} from 'react-native-router-flux'

export default function BackendFactory(upCallback){
	//
	var isInitialized = false;
	//
	var fetchErrorHandler = function(error, callback){
		if (error.code == 2015){
			console.log('User should be taken to Log-in screen');
			// Actions.Logout({type: ActionConst.RESET});

			// Api call to get new token
			apiServices.refreshToken((json, error) =>{
				if(error) {
					Actions.Logout({type: ActionConst.RESET});
				} else {
					// Api response
					if(json.results && json.results.sessionToken) {
						// get existing session object from async storage (already expired)
						return appAuthToken.getSessionToken()
							.then((token) => {
								// Append new token to existing session object (making it valid again)
								token.sessionToken.sessionToken = json.results.sessionToken;

								// store updated session object in async storage
								return appAuthToken.storeSessionToken(token.sessionToken)
									.then(() => {
										// call api service with new token
										callback(token);
									})
									.catch((error) => {
										Actions.Logout({type: ActionConst.RESET});
									})
							})
							.catch((error) => {
								Actions.Logout({type: ActionConst.RESET});
							})
					} else {
						Actions.Logout({type: ActionConst.RESET});
					}
				}
			})

		} else if (error.code == 2010){
			Actions.Logout({type: ActionConst.RESET});
		}
		console.log(error);
	};
	//
	//	If recently initialized, just return the apiServices
	if (isInitialized){
		if (typeof upCallback == 'undefined') {
			return apiServices;
		} else {
			upCallback(apiServices);
		}
	}
	else{
		//console.log('Initialize BackendFactory -> getting token');
		return appAuthToken.getSessionToken()
			.then((token) => {
				apiServices.initialize(token, fetchErrorHandler);
				isInitialized = true;
				//
				if (typeof upCallback == 'undefined') {
					return apiServices;
				} else {
					upCallback(apiServices);
				}
			})
			.catch((error) => {
				apiServices.initialize(null, fetchErrorHandler);
				//
				if (typeof upCallback == 'undefined') {
					return apiServices;
				} else {
					upCallback(apiServices);
				}
			})
	}
	// return apiServices
}