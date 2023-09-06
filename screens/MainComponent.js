import HomeScreen from "./HomeScreen";
import { View, Text, Platform } from "react-native";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchGames } from "../features/games/gamesSlice";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";
import Constants from "expo-constants";

const Drawer = createDrawerNavigator();

const HomeNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{headerStyle: { backgroundColor: '#5637DD'}}}
        >
            <Stack.Screen
                name= 'Home'
                component={HomeScreen}
                options={({ navigation }) => ({
                    title: 'Home',
                    headerLeft: () => (
                        <Icon
                            name='home'
                            type='font-awesome'
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold' }}/>
    </DrawerContentScrollView>
)

const Main = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGames());
    }, [dispatch]);

    return (
        <View
            style={{
                flex: 1,
                paddingTop:
                    Platform.OS === 'ios' ? 0 :
                    Constants.statusBarHeight
            }}
        >
            <Drawer.Navigator
                initialRouteName='Home'
                drawerContent={CustomDrawerContent}
            >
                <Drawer.Screen
                    name='Home'
                    component={HomeNavigator}
                    options={{
                        title: 'Home',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='home'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
            </Drawer.Navigator>
        </View>
    );
};

export default Main;