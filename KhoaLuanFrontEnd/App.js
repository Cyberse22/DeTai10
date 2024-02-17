import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import SettingScreen from "./components/Home/Setting";
import Login from "./components/User/Login";
import UserProfile from "./components/User/Profile";
import HomeScreenGV from "./components/giaovien/home";
import HomeScreenGVK from "./components/giaovu/home";
import HomeScreenSV from "./components/sinhvien/home";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () => {
  return(
    <Tab.Navigator>
      <Tab.Screen name="GiaoVuHome" component={HomeScreenGVK} />
      <Tab.Screen name="SinhVienHome" component={HomeScreenSV} />
      <Tab.Screen name="GiangVienHome" component={HomeScreenGV} />
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