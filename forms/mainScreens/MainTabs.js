import React from 'react';
import { Animated, StyleSheet, Image, View, AppRegistry, Text, Alert, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import ComponentItems from './ComponentItems';
import {connect} from 'react-redux';
//==============================================================================
//==============================================================================
//==============================================================================
var products;
var basketObj;
//==============================================================================
//==============================================================================
//==============================================================================
class topTabComponent extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = 
    {
      scrollY: new Animated.Value(0),
      objArray: [{zero:0},{one:1}],
      numArray: [0,1],
      basketArray: ['1'],
    }
  }

  

  componentWillMount(){
    products = this.props.products;
    basketObj = this.props.basketObj;
  }

  componentDidMount(){
    this.props.scrollAnimation(this.state.scrollY);
  }

  render(){
    let _productsRender = products.items.map((_item, _i) => {
      return <ComponentItems key={_i} index={_i} item={_item} 
      addToBasket={ (addToBasket) => {

        if(basketObj.findIndex(_item => _item.id == addToBasket.id)==-1)
        {
          basketObj.push(addToBasket);
          basketObj[basketObj.findIndex(_item => _item.id == addToBasket.id)].kol=1;
        }
        else
        {
          basketObj[basketObj.findIndex(_item => _item.id == addToBasket.id)].kol++;
        }
        //console.log(this.props.basketObj);
        this.props.addToBasket(basketObj);
        this.props.plusCounter();
      }
    }/>
    });

    return(
      <View style={styles.container}>
        <TouchableOpacity 
          onPress = { () => { 
            console.log('file = ', this.state.scrollY); 
            this.props.scrollAnimation(this.state.scrollY)
          }
        }>
          <Text>кликни</Text>
        </TouchableOpacity>
        <ScrollView 
          scrollEventThrottle={20}
          onScroll={
              Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}])
          }>
          {_productsRender}
        </ScrollView>
        <TouchableOpacity 
          onPress = { () => { 
            console.log('file = ', this.state.scrollY); 
            this.props.scrollAnimation(this.state.scrollY)
          }
        }>
          <Text>кликни</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    basketObj: state.basketObj
  }
}

function mapDispatchToProps(dispatch){
  return{
    plusCounter : () => dispatch({type: 'PLUS_C'}),
    minusCounter : () => dispatch({type: 'MINUS_C'}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(topTabComponent)
//==============================================================================
//==============================================================================
//==============================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'rgb(36, 185, 209)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: Dimensions.get('window').height - 200,
  },
});
//==============================================================================
//==============================================================================
//==============================================================================
