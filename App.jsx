
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Provider } from 'react-redux';
// import GettingStarted from './screens/GettingStarted';
// import Home from './screens/Home';
// import AttendanceManagement from './screens/AttendanceManagementScreen';
// import ProgressTracker from './screens/TrackerScreen/ProgressTrackerScreen';
// import LoginScreen from './screens/LoginScreen';
// import store from './utils/store/store';
// import InventoryTracker from './screens/TrackerScreen/InventoryTrackerScreen';
// import InventoryManagement from './screens/InventoryManagementScreen';
// import ReduceInventory from './components/InventoryManagement/ReduceInventory';
// import AddInventory from './components/InventoryManagement/AddInventory';
// import RaiseReceipt from './components/InventoryManagement/RaiseReceipt';
// import AttendaceTracker from './screens/TrackerScreen/AttendanceTrackerScreen';

// import ProgressManagementScreen from './screens/ProgressManagementScreen';

// const Stack = createStackNavigator();

// function AppContent() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Getting Started">
//         <Stack.Screen
//           name="Getting Started"
//           component={GettingStarted}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Home"
//           component={Home}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Attendance"
//           component={AttendanceManagement}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Progress"
//           component={ProgressTracker}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Inventory"
//           component={InventoryTracker}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="InventoryManagement"
//           component={InventoryManagement}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="ReduceInventory"
//           component={ReduceInventory}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="AddInventory"
//           component={AddInventory}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Raise"
//           component={RaiseReceipt}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="AttendaceTracker"
//           component={AttendaceTracker}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="ProgressTracker"
//           component={ProgressManagementScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Login"
//           component={LoginScreen}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// function App() {
//   return (
//     <Provider store={store}>
//       <AppContent />
//     </Provider>
//   );
// }

// export default App;

////                   Current app.js is here                                  
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider, useSelector, useDispatch} from 'react-redux';
import GettingStarted from './screens/GettingStarted';
import Home from './screens/Home';
import AttendanceManagement from './screens/AttendanceManagementScreen';
import ProgressTracker from './screens/TrackerScreen/ProgressTrackerScreen';
import LoginScreen from './screens/LoginScreen';
import {setToken, setUser} from './utils/store/authSlice';
import store from './utils/store/store';
import InventoryTracker from './screens/TrackerScreen/InventoryTrackerScreen';
import InventoryManagement from './screens/InventoryManagementScreen';
import ReduceInventory from './components/InventoryManagement/ReduceInventory';
import AddInventory from './components/InventoryManagement/AddInventory';
import RaiseReceipt from './components/InventoryManagement/RaiseReceipt';
import AttendaceTracker from './screens/TrackerScreen/AttendanceTrackerScreen';
import ProgressManagementScreen from './screens/ProgressManagementScreen';
import EndDayForAllScreen from './components/AttendanceManagement/EndDayForAll';
import ProfileScreen from './screens/ProfileScreen';
import SuperVisorInventoryScreen from './screens/SuperVisorInventoryScreen';
import SuperVisorInventoryUpdateScreen from './screens/SuperVisorInventoryUpdateScreen';
import PaymentTracker from './screens/TrackerScreen/PaymentTrackerScreen';
import SuperVisorPaymentManagementScreen from './screens/SuperVisorPaymentManagement';
import AdminInventoryTracker from './screens/TrackerScreen/AdminTrackerScreen';
import PaymentManagement from './components/PaymentManagement/PaymentManagement';
import { setupAxiosInterceptor } from './utils/axiosInterceptor';
import { navigationRef } from './utils/navigationRef';
import ClientPaymentTracker from './screens/ClientPaymentTracker';

const Stack = createStackNavigator();

function AppContent() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        const token = await AsyncStorage.getItem('token');
        if (user && token) {
          dispatch(setUser(JSON.parse(user)));
          dispatch(setToken(token));
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    checkAuth();
  }, [dispatch]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Getting Started' : 'Home'}>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Attendance"
              component={AttendanceManagement}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Progress"
              component={ProgressTracker}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Inventory"
              component={InventoryTracker}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="InventoryManagement"
              component={InventoryManagement}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ReduceInventory"
              component={ReduceInventory}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddInventory"
              component={AddInventory}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Raise"
              component={RaiseReceipt}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AttendaceTracker"
              component={AttendaceTracker}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProgressTracker"
              component={ProgressManagementScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen name="EndDayForAll" component={EndDayForAllScreen}    options={{headerShown: false}} />
            <Stack.Screen name="Profile" component={ProfileScreen}    options={{headerShown: false}}/>
            <Stack.Screen name="SuperVisorInventory" component={SuperVisorInventoryScreen}    options={{headerShown: false}}/>
            <Stack.Screen name="SuperVisorInventoryUpdate" component={SuperVisorInventoryUpdateScreen}    options={{headerShown: false}}/>
            <Stack.Screen name="PaymentTracker" component={PaymentTracker}    options={{headerShown: false}}/>
            <Stack.Screen name="AdminPaymentManagement" component={SuperVisorPaymentManagementScreen}    options={{headerShown: false}}/>
            <Stack.Screen name="AdminInventoryTracker" component={AdminInventoryTracker}    options={{headerShown: false}}/>
            <Stack.Screen name="PaymentRequest" component={PaymentManagement}    options={{headerShown: false}}/>
            <Stack.Screen name="ClientPayment" component={ClientPaymentTracker}    options={{headerShown: false}}/>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Getting Started"
              component={GettingStarted}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  useEffect(() => {
    setupAxiosInterceptor();
  }, []);
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;

// import React, { useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Provider, useSelector, useDispatch } from 'react-redux';
// import GettingStarted from './screens/GettingStarted';
// import Home from './screens/Home';
// import AttendanceManagement from './screens/AttendanceManagementScreen';
// import ProgressTracker from './screens/TrackerScreen/ProgressTrackerScreen';
// import LoginScreen from './screens/LoginScreen';
// import { setToken, setUser } from './utils/store/authSlice';
// import store from './utils/store/store';
// import InventoryTracker from './screens/TrackerScreen/InventoryTrackerScreen';
// import InventoryManagement from './screens/InventoryManagementScreen';
// import ReduceInventory from './components/InventoryManagement/ReduceInventory';
// import AddInventory from './components/InventoryManagement/AddInventory';
// import RaiseReceipt from './components/InventoryManagement/RaiseReceipt';
// import AttendaceTracker from './screens/TrackerScreen/AttendanceTrackerScreen';
// import ProgressManagementScreen from './screens/ProgressManagementScreen';
// import EndDayForAllScreen from './components/AttendanceManagement/EndDayForAll';

// const Stack = createStackNavigator();

// function AppContent() {
//   const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
//   const userRole = useSelector(state => state.auth.user?.role); // Fetch user role from the Redux store
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const user = await AsyncStorage.getItem('user');
//         console.log('userssad',user)
//         const token = await AsyncStorage.getItem('token');
//         if (user && token) {
//           dispatch(setUser(JSON.parse(user)));
//           dispatch(setToken(token));
//         }
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     };
//     checkAuth();
//   }, [dispatch]);

//   // Define stacks based on user role
//   const renderScreensByRole = () => {
//     switch (userRole) {
//       case 'Supervisor':
//         return (
//           <>
//             <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
//             <Stack.Screen name="Attendance" component={AttendanceManagement} options={{ headerShown: false }} />
//             <Stack.Screen name="Progress" component={ProgressTracker} options={{ headerShown: false }} />
//             <Stack.Screen name="Inventory" component={InventoryTracker} options={{ headerShown: false }} />
//             <Stack.Screen name="InventoryManagement" component={InventoryManagement} options={{ headerShown: false }} />
//             <Stack.Screen name="ReduceInventory" component={ReduceInventory} options={{ headerShown: false }} />
//             <Stack.Screen name="AddInventory" component={AddInventory} options={{ headerShown: false }} />
//             <Stack.Screen name="Raise" component={RaiseReceipt} options={{ headerShown: false }} />
//             <Stack.Screen name="AttendaceTracker" component={AttendaceTracker} options={{ headerShown: false }} />
//             <Stack.Screen name="ProgressTracker" component={ProgressManagementScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="EndDayForAll" component={EndDayForAllScreen} />
//           </>
//         );
//       case 'admin':
//         return (
//           <>
//             <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
//             <Stack.Screen name="Attendance" component={AttendanceManagement} options={{ headerShown: false }} />
//             <Stack.Screen name="Progress" component={ProgressTracker} options={{ headerShown: false }} />
//             <Stack.Screen name="EndDayForAll" component={EndDayForAllScreen} />
//           </>
//         );
//       case 'Internal User':
//         return (
//           <>
//             <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
//             <Stack.Screen name="Attendance" component={AttendanceManagement} options={{ headerShown: false }} />
//             <Stack.Screen name="Progress" component={ProgressTracker} options={{ headerShown: false }} />
//           </>
//         );
//       default:
//         return (
//           <>
//             <Stack.Screen name="Getting Started" component={GettingStarted} options={{ headerShown: false }} />
//             <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//           </>
//         );
//     }
//   };

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName={isAuthenticated ? 'Getting Started' : 'Home'}>
//         {isAuthenticated ? renderScreensByRole() : (
//           <>
//             <Stack.Screen name="Getting Started" component={GettingStarted} options={{ headerShown: false }} />
//             <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// function App() {
//   return (
//     <Provider store={store}>
//       <AppContent />
//     </Provider>
//   );
// }

// export default App;




// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import UserHome from './screens/UserHome';

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName='UserHome'>
//         <Stack.Screen
//           name="UserHome"
//           component={UserHome}
//           options={{headerShown: false}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
