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
  TouchableOpacity } from 'react-native';
//==============================================================================
//==============================================================================
//==============================================================================

//==============================================================================
//==============================================================================
//==============================================================================
export default class ComponentItems extends React.Component {

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

            <TouchableOpacity onPress={ () => console.log(this.props.item.image.url) }>
              <Text>
                от {this.props.item.prices[0].price}
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
});
//==============================================================================
//==============================================================================
//==============================================================================
