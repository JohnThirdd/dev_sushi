import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, Dimensions, ScrollView, Animated } from 'react-native';
import ProfileNotLoggin from './ProfileNotLoggin';
import ProfileLoginForm from './ProfileLoginForm';
import {connect} from 'react-redux';
//==============================================================================
//==============================================================================
//==============================================================================
var vari='0';
class ProfileForm extends React.Component {
  render() {
    return (
          <View style={styles.container}>
            {this.props.profileToken == '0'
              ? 
              <ProfileNotLoggin 
                requestKey={this.props.requestKey} 
                requestUrls={this.props.requestUrls}
                requestCityId={this.props.requestCityId}
                vari={(_vari)=>{vari=_vari; this.props.plusCounter(); this.props.saveToken(_vari.user.info.token)}}
                regSuccess={(_regSuccess)=>{vari=_regSuccess; this.props.plusCounter(); this.props.saveToken(_regSuccess.user.info.token)}}/>
              :
              <ProfileLoginForm profileToken = {this.props.profileToken} exit={()=>{vari='0', this.props.plusCounter()}}/>
            }
          </View>
    );
  }
}

function mapStateToProps(state){
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)

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
  }
});


//24A0D1