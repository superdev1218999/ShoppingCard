/**
 * A thin wrapper over the react-native-simple-store
 * Singleton module see https://k94n.com/es6-modules-single-instance-pattern
 */

import store from 'react-native-simple-store'

export class AppAuthToken {
    /**
     * ## AppAuthToken
     *
     * set the key from the config
     */
    constructor() {
        this.SESSION_TOKEN_KEY = 'SESSION_TOKEN_KEY'
        this.FCM_REGISTRATION_TOKEN = 'FCM_REGISTRATION_TOKEN'
        this.LOGGED_OUT_KEY = 'LOGGED_OUT_KEY'
    }

    /**
     * ### storeSessionToken
     * Store the session key
     */
    storeSessionToken(sessionToken) {
        return store.save(this.SESSION_TOKEN_KEY, {
            sessionToken: sessionToken
        })
    }

    /**
     * ### getSessionToken
     * @param {Object} sessionToken the currentUser object
     *
     * When Hot Loading, the sessionToken  will be passed in, and if so,
     * it needs to be stored on the device.  Remember, the store is a
     * promise so, have to be careful.
     */
    getSessionToken(sessionToken) {
        if (sessionToken) {
            return store.save(this.SESSION_TOKEN_KEY, {
                sessionToken: sessionToken
            }).then(() => {
                return store.get(this.SESSION_TOKEN_KEY)
            })
        }
        return store.get(this.SESSION_TOKEN_KEY)
    }

    /**
     * ### deleteSessionToken
     * Deleted during log out
     */
    deleteSessionToken() {
        return store.delete(this.SESSION_TOKEN_KEY)
    }


	/**
	 * ### storefcm_token
	 * Store the session key
	 */
	storeFCMToken(fcm_token) {
		return store.save(this.FCM_REGISTRATION_TOKEN, {
			fcm_token: fcm_token
		})
	}

	/**
	 * ### getSessionToken
	 * @param {Object} sessionToken the currentUser object
	 *
	 * When Hot Loading, the sessionToken  will be passed in, and if so,
	 * it needs to be stored on the device.  Remember, the store is a
	 * promise so, have to be careful.
	 */
	getFCMToken(fcm_token) {
		if (fcm_token) {
			return store.save(this.FCM_REGISTRATION_TOKEN, {
				fcm_token: fcm_token
			}).then(() => {
				return store.get(this.FCM_REGISTRATION_TOKEN)
			})
		}
		return store.get(this.FCM_REGISTRATION_TOKEN)
	}


	storeLoggedOut(isLoggedOut) {
		return store.save(this.LOGGED_OUT_KEY, isLoggedOut);
	}

	getLoggedOut() {
		return store.get(this.LOGGED_OUT_KEY)
	}
}
// The singleton variable
export let appAuthToken = new AppAuthToken();
