import React from 'react';
import { StyleSheet, Image, View, AppRegistry, Text, Alert, ScrollView } from 'react-native';
import ComponentItems from './ComponentItems';
//==============================================================================
//==============================================================================
//==============================================================================
var products;
//==============================================================================
//==============================================================================
//==============================================================================
export default class topTabComponent extends React.Component {

  componentWillMount(){
    products = this.props.products;
    //console.log(products.items);
  }

  render(){
    let _productsRender = products.items.map((_item, _i) => {
      return <ComponentItems key={_i} index={_i} item={_item} />
    });

    return(
      <View style={styles.container}>
        <ScrollView>
          {_productsRender}
        </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
//==============================================================================
//==============================================================================
//==============================================================================
