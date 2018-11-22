import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, Dimensions, ScrollView, Animated } from 'react-native';
//==============================================================================
//==============================================================================
//==============================================================================
export default class EmptyBasketForm extends React.Component {
  render() {
    return (
          <View style={styles.container}>
            <Image
              resizeMode={'contain'} 
              source={require('./shopping-cart.png')}
              style={
                {
                  width: 100,
                  height: 100,
                  marginBottom: 15,
                }}/>

            <Text style = {styles.justText}>Ваша корзина пуста и вы можете исправить это.</Text>

            <TouchableOpacity style={styles.buttonStyle} onPress = { () => {this.props.goAdd()} }>
              <Text style = {styles.buttonText}>Добавить</Text>
            </TouchableOpacity>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', 
    height: Dimensions.get('window').height,
  },

  justText:{
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'gray',
    alignItems: 'center',
    marginBottom: 10,
  },

  buttonText:{
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'rgb(36, 185, 209)',
    alignItems: 'center',
  },

  buttonStyle: {
    borderWidth: 1,
    alignItems: 'center',
    borderColor: 'rgb(36, 185, 209)',
    borderRadius: 5,
    justifyContent: 'center',
    margin: 5,
    padding: 5,
  },
});


//24A0D1