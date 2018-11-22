import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, TextInput, Dimensions, ScrollView, Animated, Modal } from 'react-native';
import { createStackNavigator } from 'react-navigation';
//==============================================================================
//==============================================================================
//==============================================================================
export default class RegForm extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = 
    {
      modalVisible: false,
    }
  }

  render() {
    return <NavigationApp/>;
  }
}

class test extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = 
    {
      modalVisible: false,
    }
  }

  render() {
    return (
          <View style={styles.container}>


            <TouchableOpacity style={styles.buttonStyle}>
              <Text style = {styles.buttonText}>Отмена</Text>
            </TouchableOpacity>
          </View>
    );
  }
}

const NavigationApp = createStackNavigator({
  JoinHome: { screen: test },
  RegHome: { screen: test },
  MainHome: { screen: test },
}, {
  navigatonOptions: {
    headerStyle: { marginTop: Expo.Constants.statusBarHeight },
  headerMode: 'screen' 
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', 
    height: Dimensions.get('window').height,
  },

  buttonStyle: {
    borderWidth: 1,
    alignItems: 'center',
    width: 150,
    borderColor: 'rgb(36, 185, 209)',
    borderRadius: 5,
    justifyContent: 'center',
    margin: 5,
    padding: 5,
  },

  buttonText:{
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'rgb(36, 185, 209)',
    alignItems: 'center',
  },

  boldText:{
    fontSize: 25,
    color: 'rgb(36, 160, 209)',
  },

  justText:{
    marginLeft: 5,
    marginBottom: 10,
    color: 'gray',
  },

  textInputStyle: 
  {
    alignSelf: 'stretch',
    
    padding: 20,
  },
});


//24A0D1