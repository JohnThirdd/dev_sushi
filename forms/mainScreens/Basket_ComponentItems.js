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
export default class Basket_ComponentItems extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = 
    {
      numArray: [0,1],
      basketArray: ['1'],
    }
  }

  addToBasket()
  {

  }

  render(){
    return(
        <View key={this.props.index} style={styles.container}>
            <Image
              resizeMode={'contain'} 
              source={{uri: this.props.item.image.url}}
              loadingIndicatorSource={require('./imgLoader.png')}
              style={styles.iamgeStyle}
            />

          <View style={styles.childСontainer}>
            <Text style={styles.textStyle}>
              {this.props.item.name}
            </Text>

            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row',}}>
              <TouchableOpacity style = {styles.buttonStyle}
                onPress = {
                  () => {
                    var _obj = this.props.item;
                    this.props.minusOne(_obj);
                  }
                }>
                <Text style = {{color:'rgb(36, 185, 209)'}}>
                  -
                </Text>
              </TouchableOpacity>

              <Text style={styles.kolvo}>
                {this.props.item.kol}
              </Text>

              <TouchableOpacity style = {[styles.buttonStyle, {left: 55}]} 
                onPress = { 
                  () => { 
                    var _obj = this.props.item;
                    this.props.addOne(_obj);
                  } 
                }>
                <Text style = {{color:'rgb(36, 185, 209)'}}>
                  +
                </Text>
              </TouchableOpacity>

              <Text style={{right: 55, bottom: 12, fontWeight: 'bold', position: 'absolute'}}>
                {this.props.item.prices[0].price * this.props.item.kol}
              </Text>
            </View>
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
    //backgroundColor: 'rgb(36, 185, 209)',
    //alignItems: 'center',
    height: 145,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomWidth:2,
    borderBottomColor: '#ededed',
  },

  childСontainer: {
    //position: 'absolute',
    justifyContent: 'center',
    width: Dimensions.get('window').width-105,
    left: 90,
  },

  textStyle: {
    fontSize: 15,
    position: 'absolute',
    top: 10,
    fontWeight: 'bold',
  },

  iamgeStyle: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 125, 
    height: 125,
    borderWidth: 2,
    borderColor: '#ededed',
  },

  buttonStyle: {
    bottom: 10, 
    position: 'absolute',
    borderWidth: 1,
    margin:1,
    padding:2,
    width: 25,
    alignItems: 'center',
    borderColor: 'rgb(36, 185, 209)',
    borderRadius: 5,
    justifyContent: 'center',
  },

  kolvo:{
    bottom: 10,
    position: 'absolute',
    left: 35,
    justifyContent: 'center',
    padding:2,
    margin:1,
  },
});
//==============================================================================
//==============================================================================
//==============================================================================
