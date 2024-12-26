import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import MenuItem from './MenuItem';

type FoodItemProps = {
  item: {
    name: string;
    items?: {
      id: string | number; 
      name: string; 
      price: number; 
      rating: number;
      description: string; 
      image: string;
      [key: string]: any; 
    }[];
  };
};

const FoodItem = ({ item }: FoodItemProps) => {
  const data = [item]; 

  return (
    <View>
      {data?.map((dataItem, dataIndex) => (
        <React.Fragment key={dataIndex}>
          <Pressable
            style={{
              margin: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 19, fontWeight: 'bold' }}>
              {dataItem?.name} ({dataItem?.items?.length || 0})
            </Text>
            <AntDesign name="down" size={20} color="black" />
          </Pressable>

          {dataItem?.items?.map((menuItem, menuIndex) => (
            <MenuItem key={menuIndex} item={menuItem} />
          ))}
        </React.Fragment>
      ))}
    </View>
  );
};

export default FoodItem;

const styles = StyleSheet.create({});
