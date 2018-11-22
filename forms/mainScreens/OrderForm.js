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
  AsyncStorage } from 'react-native';
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
            <Text>
              {this.props.orderList.delivery_list.items[0].name}
            </Text>
            
            <Text>
              Наличным при получении
            </Text>
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
    alignItems: 'center',
    height: 145,
    width: Dimensions.get('window').width,
    //justifyContent: 'center',
    flexDirection: 'column',
    //borderBottomWidth:2,
    borderBottomColor: '#ededed',
  },

  firstText: {
    position: 'relative',
    padding: 10,
    paddingRight: 100,
    borderBottomWidth:2,
    borderBottomColor: '#ededed',
    flexDirection: 'row',
    width: Dimensions.get('window').width,
  },

  textStyle: {
    fontSize: 16,
  },
});
//==============================================================================
//==============================================================================
//==============================================================================
