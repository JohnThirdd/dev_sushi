import React from 'react';
import { StyleSheet, Image, View, AppRegistry, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
//==============================================================================
//==============================================================================
//==============================================================================
const FAT_TEXT = 'Лучший день - 23 сентебря!';
const SMALL_TEXT = 'Только 23 сентебря будет лучший но не понятный день. Что-то будет продаваться в 3 раза дешевле чем ваша машина';
//==============================================================================
//==============================================================================
//==============================================================================
export default class topTabComponent extends React.Component {
  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity
          onPress={ () => this.props.close() }
          style = {styles.buttonModal}>
          <Text style={styles.textButton}>−</Text>
        </TouchableOpacity>

        <Image
          resizeMode={'contain'} 
          source={{uri: this.props.urlImage}}
          style={
            {
              width: Dimensions.get('window').width - 30, 
              height: 124,
              borderRadius: 15,
        }}/>
        <View>
          <ScrollView>
            <Text style={styles.fatText}> {FAT_TEXT} </Text>
            <Text style={styles.smallText}> {SMALL_TEXT} </Text>
          </ScrollView>
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
    width: Dimensions.get('window').width,
    height: 250,
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'absolute',
    bottom: -4,
    zIndex: 2,
    alignItems: 'center',
  },
  buttonModal: {
    //margin: 10,
    alignItems: 'center',
    //backgroundColor: '#DDDDDD',
    borderRadius: 10,
    //padding: 2
  },
  textButton:{
    fontSize: 30,    
    fontWeight: 'bold',
    color: 'black',
  },
  fatText:{
    fontSize: 15,    
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 10,
    paddingTop: 7,
  },
  smallText:{
    fontSize: 11,
    color: 'gray',
    padding: 10
  }
});
//==============================================================================
//==============================================================================
//==============================================================================
