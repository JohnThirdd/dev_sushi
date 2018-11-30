import React from 'react';

import { 
  StyleSheet, 
  Image,
  View, 
  AppRegistry, 
  Text, 
  Alert, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity,
  AsyncStorage,
  Modal } from 'react-native';
//==============================================================================
//==============================================================================
//==============================================================================
export default class OrderForm extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = 
    {
      numArray: [0,1],
      basketArray: ['1'],
      modalVisible: false,
    }
  }

  render(){
    return(
        <View style={styles.container}>
          <View style={styles.firstText}>
            <Text style={styles.textStyle}>
              Новый заказ в городе {this.props.cityName}
            </Text>

            <TouchableOpacity style = {{right:8, top:8, position: 'absolute'}} onPress = { () => { this.props.closeOrder() }}>
              <Text style={{fontSize:20}}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <View style = {styles.buttonOrder}>
            <TouchableOpacity style={styles.firstText} onPress={() => { this.props.openAdress(); }}>
              <Text>
                {this.props.orderList.delivery_list.items[0].name}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.firstText}>
              <Text>
                {this.props.orderList.delivery_list.items[1].name}
              </Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: 'white',
    alignItems: 'center',
    height: 145,
    width: Dimensions.get('window').width,
    //justifyContent: 'center',
    flexDirection: 'column',
    borderBottomWidth:2,
    borderBottomColor: '#ededed',
  },

  buttonOrder: {
    flex: 1,
    backgroundColor: 'white',
    //alignItems: 'center',
    height: 145,
    width: Dimensions.get('window').width,
    //justifyContent: 'center',
    flexDirection: 'column',
    //borderBottomWidth:2,
    borderBottomColor: '#ededed',
  },

  firstText: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth:2,
    borderBottomColor: '#ededed'
  },

  textStyle: {
    fontSize: 16,
  },
});
//==============================================================================
//==============================================================================
//==============================================================================
