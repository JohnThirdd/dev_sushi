import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, Dimensions, ScrollView, Animated, ImageBackground } from 'react-native';
import ProfileNotLoggin from './ProfileNotLoggin';
import {connect} from 'react-redux';
//==============================================================================
//==============================================================================
//==============================================================================
var vari='0';
export default class ProfileLoginForm extends React.Component {
  render() {
    return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
              resizeMode={'contain'} 
              source={require('./checked.png')}
              style={
                {
                  width: 50,
                  height: 50,
                  marginBottom: 15,
                }}/>
              <Text style={styles.boldText}>{this.props.profileToken.user.info.user_name}</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.props.exit()}}>
                <Text style = {styles.buttonText}>Выйти</Text>
              </TouchableOpacity>
            </View>
          </View>
    );
  }
}

/*function mapStateToProps(state){
  return {
    profileToken: state.profileToken
  }
}

function mapDispatchToProps(dispatch){
  return{
    plusCounter : () => dispatch({type: 'PLUS_C',vari:vari}),
    minusCounter : () => dispatch({type: 'MINUS_C'}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLoginForm)*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'center',
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

  header: {
    backgroundColor: 'rgb(36, 185, 209)',
    width: Dimensions.get('window').width,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText:{
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'rgb(36, 185, 209)',
    alignItems: 'center',
  },

  boldText:{
    fontSize: 20,
    color: 'white',
  },

  justText:{
    marginLeft: 5,
    marginBottom: 10,
    color: 'gray',
  }
});


//24A0D1