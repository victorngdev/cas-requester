import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import Tabs from "./tabs.component";
import LoginScreen from "../login/login.component";
import RegisterScreen from "../register/register.component";
import ResetPassScreen from "../reset-password/reset-password.component";
import RequestInfoScreen from "../request-info/request-info.component";
import FeedbackScreen from "../feedback/feedback.component";

const AuthStack = createStackNavigator();
const ContainerStack = createStackNavigator();

const AuthStackScreen = () => (
    <AuthStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Register" component={RegisterScreen} />
        <AuthStack.Screen name="ResetPass" component={ResetPassScreen} />
    </AuthStack.Navigator>
);

const ContainerStackScreen = () => (
    <ContainerStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <ContainerStack.Screen name="Request" component={RequestInfoScreen} />
        <ContainerStack.Screen name="Feedback" component={FeedbackScreen} />
        <ContainerStack.Screen name="Home" component={Tabs} />
    </ContainerStack.Navigator>
);

const Navigation = ({ currentUser }) => (
    <NavigationContainer>
        {currentUser ? <ContainerStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Navigation);