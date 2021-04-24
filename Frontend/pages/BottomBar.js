import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {StyleSheet, Text, View, Button, Image} from 'react-native';  

import Feed from './Feed'
import Profile from './Profile'
import CreatePost from './CreatePost'
import Following from './Following'
import ChatRoom from './ChatRoom'

const create = require('../images/icons/create.png');
const dm = require('../images/icons/dm.png');
const feed = require('../images/icons/feed.png');
const profile = require('../images/icons/profile.png');
const home = require('../images/icons/home.png');

const Tab = createMaterialBottomTabNavigator();

const BottomBar = () => {
    return(
        <Tab.Navigator initialRouteName="Profile" forceInset = {{top: "always", bottom: "never"}} barStyle={{ backgroundColor: '#EDC31D', height: 68 , shadowOffset: 0}}>
            <Tab.Screen name="Following" component={Following} options={{tabBarLabel:() => {return null}, tabBarIcon: () => (
            <Image source={home} style={styles.icon}/>
          )}}  />
            <Tab.Screen name="Chat Room" component={ChatRoom} options={{tabBarLabel:() => {return null}, tabBarIcon: () => (
            <Image source={dm} style={styles.icon}/>
          )}} />
            <Tab.Screen name="Create Post" component={CreatePost} options={{tabBarLabel:() => {return null}, tabBarIcon: () => (
            <Image source={create} style={styles.icon}/>
          )}}/>
            <Tab.Screen name="Feed" component={Feed} options={{tabBarLabel:() => {return null}, tabBarIcon: () => (
            <Image source={feed} style={styles.feed_icon}/>
          )}}/>
            <Tab.Screen name="Profile" component={Profile} options={{tabBarLabel:() => {return null}, tabBarIcon: () => (
            <Image source={profile} style={styles.feed_icon}/>
          )}}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    icon: {
      height: 35,
      width: 35,
    },
    feed_icon: {
        height: 41,
        width: 35,
    },
})

export default BottomBar
