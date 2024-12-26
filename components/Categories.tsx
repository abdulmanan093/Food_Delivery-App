import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

// Define the item type for the categories
interface CategoryItem {
  id: string;
  name: string;
}

const Categories = () => {
  const items: CategoryItem[] = [
    {
      id: "1",
      name: "fastest delivery",
    },
    {
      id: "2",
      name: "rating 4.0+",
    },
    {
      id: "3",
      name: "offers",
    },
    {
      id: "4",
      name: "cuisines",
    },
    {
      id: "5",
      name: "MAX Safety",
    },
    {
      id: "6",
      name: "Pro",
    },
  ];

  const handlePress = (item: CategoryItem) => {
    // Handle category press (e.g., navigation or filter)
    console.log("Pressed category:", item.name);
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handlePress(item)}
            style={styles.touchable}
          >
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  touchable: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  categoryContainer: {
    padding: 5,
    backgroundColor: "#DB7093",
    borderRadius: 4,
  },
  categoryText: {
    paddingHorizontal: 5,
    color: "white",
    fontWeight: "500",
  },
});
