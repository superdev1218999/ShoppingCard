import React, { PureComponent } from 'react';
import { Router, Scene, Drawer } from 'react-native-router-flux';
import Init from './app/screens/Init';
import Login from './app/screens/Login';
import Logout from './app/screens/Logout';
import FetchUser from './app/screens/FetchUser';
import ListView from './app/screens/ListView';
import Home from './app/screens/Home';
import ItemDetails from './app/screens/ItemDetails';
import CardListView from './app/screens/CardListView';
import DrawerNavigator from './app/screens/DrawerNavigator';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import CreateStore from './app/redux/Store';

class App extends PureComponent {
  render = () => {
    const { store, persistor } = CreateStore();
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router navigationBarStyle={{ backgroundColor: '#7573E1' }}>
            <Scene key='root' hideNavBar>
              <Scene key='init' component={Init} type='replace' initial />

              <Scene key='Logout' component={Logout} />
              <Scene key='FetchUser' component={FetchUser} />

              <Scene
                key='Unauthenticated'
                hideNavBar
                type="replace">
                <Scene
                  key='Login'
                  component={Login}
                  initial
                  panHandlers={null} />
              </Scene>

              <Scene
                key='Authenticated'
                hideNavBar
                type="replace">
                <Scene key="MainTabBar" initial hideNavBar>
                  <Drawer contentComponent={DrawerNavigator}
                    //drawerImage={Images.menu}
                    key="drawer"
                    drawerWidth={300}
                    drawerOpenRoute="DrawerOpen"
                    drawerCloseRoute="DrawerClose"
                    drawerToggleRoute="DrawerToggle"
                  >
                    <Scene key="main_tabbar"
                      swipeEnabled={false}
                      tabs={true}
                      lazy
                      tabBarPosition='bottom'
                      showIcon={true}
                      inactiveTintColor={'#868E96'}
                      indicatorStyle={{ backgroundColor: '#FFFFFF' }}
                      activeTintColor={'#3F51B5'}
                      tabBarStyle={{ backgroundColor: '#FFFFFF' }}
                      panHandlers={null}
                    >
                      <Scene key="list_tab" title="List" hideNavBar>
                        <Scene key='listView' component={ListView} type='replace' />
                      </Scene>
                      <Scene key="home_tab" title="Home" hideNavBar>
                        <Scene key='home' component={Home} type='replace' />
                      </Scene>
                    </Scene>
                  </Drawer>
                  <Scene key='itemDetails' component={ItemDetails} type='replace' />
                  <Scene key='cardListView' component={CardListView} type='replace' />
                </Scene>
              </Scene>

            </Scene>
          </Router>
        </PersistGate>
      </Provider>
    )
  }

}

export default App;
