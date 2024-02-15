import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import HomeScreen from "./components/Home/Home";
import SettingScreen from "./components/Home/Setting";
import Login from "./components/User/Login";
import UserProfile from "./components/User/Profile";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () => {
  return(
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name = "Trang Chủ" component={HomeStack} />
        <Drawer.Screen name = "Hồ Sơ" component={UserProfile}/>
        <Drawer.Screen name = "Đăng Nhập" component={Login} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App