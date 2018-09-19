import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native';
//==============================================================================
//==============================================================================
//==============================================================================
export default class FetchExample extends React.Component {

  render(){
    return(
      <View style={styles.container}>
        <Text style = { styles.headerText }>Привет!</Text>
        <Text style = { styles.justText }>Выбери свой город</Text>
        <TouchableOpacity style = {styles.button} onPress = { this.props.selectCityMethod }>
          <Text style = {styles.buttonText}> Выбрать </Text> 
        </TouchableOpacity>
      </View>
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(36, 185, 209)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText:{
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white'
  },

  justText:{
    fontSize: 25,
    color: 'white'
  },

  button: {
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },

  buttonText:{
    fontSize: 20,
  },
});
//==============================================================================
//==============================================================================
//==============================================================================