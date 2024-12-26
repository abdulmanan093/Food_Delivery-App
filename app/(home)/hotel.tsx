import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Animated,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import FoodItem from "../../components/FoodItem";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  items: {
    id: string;
    name: string;
    price: number;
    description: string;
    rating: number;
    ratings: number;
    image: string;
    veg: boolean;
    bestSeller: boolean;
    quantity?: number;
  }[];
}

const hotel = () => {
  const params = useLocalSearchParams<{
    name: string;
    menu: string;
    aggregate_rating: string;
    description?: string;
  }>();
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart.cart);
  // const menu = [
  //   {
  //     id: "20",
  //     name: "Recommended",
  //     items: [
  //       {
  //         id: "101",
  //         name: "Paneer 65",
  //         price: 275,
  //         description:
  //           "This is served with Raita and gravy and has loaded with chilli paste mixed chicken Kebabs",
  //         rating: 3,
  //         ratings: 43,
  //         image:
  //           "https://b.zmtcdn.com/data/pictures/2/18820472/b07647252aae32993047faf13a1cccf4.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*",
  //         veg: true,
  //         bestSeller: false,
  //         quantity: 1,
  //       },
  //       {
  //         id: "102",
  //         name: "Chilly Chicken (Boneless)",
  //         price: 285,
  //         description:
  //           "E: 604.42 KCal (163.36 KCal), C: 29.67 Grams (8.02 Grams), P: 50.63 Grams (13.68 Grams), F: 30.94 Grams (8.36 Grams)",
  //         rating: 4.3,
  //         ratings: 34,
  //         image:
  //           "https://b.zmtcdn.com/data/pictures/chains/8/51828/68d04135bbac1e3d5ff5a87d45974da1.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
  //         veg: false,
  //         bestSeller: true,
  //         quantity: 1,
  //       },
  //       {
  //         id: "103",
  //         name: "Spl Veg Biryani",
  //         price: 250,
  //         description:
  //           "E: 1327.35 KCal (126.41 KCal), C: 213.24 Grams (20.31 Grams), P: 26.99 Grams (2.57 Grams), F: 38.46 Grams (3.66 Grams)",
  //         rating: 2,
  //         ratings: 56,
  //         image:
  //           "https://b.zmtcdn.com/data/pictures/chains/8/51828/1f8008fc1cec3cd7ea2b559c32b1e642.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
  //         veg: true,
  //         bestSeller: false,
  //         quantity: 1,
  //       },
  //       {
  //         id: "104",
  //         name: "Chilly Paneer",
  //         price: 220,
  //         description:
  //           "E: 871.69 KCal (272.40 KCal), C: 21.54 Grams (6.73 Grams), P: 51.90 Grams (16.22 Grams), F: 64.36 Grams (20.11 Grams",
  //         rating: 3.8,
  //         ratings: 22,
  //         image:
  //           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4rgOs6C9rJuwL_sjJB5n7CeGKEA-Xg2yxIYq025B7_7avmruQHZ0DPpJa8GiSzPkEfas&usqp=CAU",
  //         veg: true,
  //         bestSeller: true,
  //         quantity: 1,
  //       },
  //       {
  //         id: "105",
  //         name: "Chicken 65",
  //         price: 300,
  //         description:
  //           "E: 544.39 KCal (155.54 KCal), C: 25.11 Grams (7.17 Grams), P: 45.15 Grams (12.90 Grams), F: 27.91 Grams (7.97 Grams)",
  //         rating: 1,
  //         ratings: 45,
  //         image:
  //           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTCYsmzl1yfX0MwTN-E_uHC-bk3p181VzjIA&usqp=CAU",
  //         veg: false,
  //         bestSeller: true,
  //         quantity: 1,
  //       },
  //     ],
  //   },
  //   {
  //     id: "11",
  //     name: "Rice",
  //     items: [
  //       {
  //         id: "201",
  //         name: "Chicken Fried Rice",
  //         price: 260,
  //         description:
  //           "E: 1142.26 KCal (163.18 KCal), C: 125.05 Grams (17.86 Grams), P: 40.11 Grams (5.73 Grams), F: 51.37 Grams (7.34 Grams)",
  //         rating: 3,
  //         ratings: 34,
  //         image:
  //           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1wuHjGnvTD4Aewe_M2-_5OSwPiPv1kUvMljF-sqoPRzvoFxD06BK2ac2jV-ZmQG6lQTg&usqp=CAU",
  //         veg: false,
  //         bestSeller: true,
  //       },
  //       {
  //         id: "202",
  //         name: "Egg Fried Rice",
  //         price: 220,
  //         description:
  //           "E: 1729.51 KCal (164.72 KCal), C: 204.54 Grams (19.48 Grams), P: 44.03 Grams (4.19 Grams), F: 79.02 Grams (7.53 Grams)",
  //         rating: 4.3,
  //         ratings: 52,
  //         image:
  //           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXumfbiH2jcIY8xq9QW6B1QGoh3OJ596SnpQ&usqp=CAU",
  //         veg: false,
  //         bestSeller: false,
  //       },
  //       {
  //         id: "203",
  //         name: "Veg Fried Rice",
  //         price: 190,
  //         description:
  //           "E: 1477.00 KCal (140.67 KCal), C: 204.14 Grams (19.44 Grams), P: 22.90 Grams (2.18 Grams), F: 59.95 Grams (5.71 Grams)",
  //         rating: 5,
  //         ratings: 56,
  //         image:
  //           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREAW6AHZuQtR_1d9WPZn5mjK_jG-aAJxYfLQ&usqp=CAU",
  //         veg: true,
  //         bestSeller: true,
  //       },
  //       {
  //         id: "204",
  //         name: "Jeera Rice",
  //         price: 195,
  //         description:
  //           "E: 1832.30 KCal (174.50 KCal), C: 246.73 Grams (23.50 Grams), P: 27.51 Grams (2.62 Grams), F: 78.15 Grams (7.44 Grams)",
  //         rating: 2,
  //         ratings: 48,
  //         image:
  //           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLvPe-0FZVXXBJkBWf--jnjCcKN6PxD1Zgdw&usqp=CAU",
  //         veg: true,
  //         bestSeller: false,
  //       },
  //     ],
  //   },
  // ];
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const ITEM_HEIGHT = 650;

  const [modalVisible, setModalVisible] = useState(false);

  const recievedMenu = params?.menu ? JSON.parse(params.menu) : [];

  const scrollToCategory = (index: number) => {
    const yOffset = index * ITEM_HEIGHT;
    Animated.timing(scrollAnim, {
      toValue: yOffset,
      duration: 500,
      useNativeDriver: true,
    }).start();
    scrollViewRef.current?.scrollTo({ y: yOffset, animated: true });
  };

  

  return (
    <>
      <ScrollView ref={scrollViewRef} style={{ backgroundColor: "white" }}>
        <View
          style={{
            marginTop: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          
          <Ionicons
            onPress={() => router.back()}
            style={{ padding: 5 }}
            name="arrow-back"
            size={24}
            color="black"
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 14,
              gap: 10,
            }}
          >
            {/* <SimpleLineIcons name="camera" size={24} color="black" />
            <Ionicons name="bookmark-outline" size={24} color="black" />
            <MaterialCommunityIcons
              name="share-outline"
              size={24}
              color="black"
            /> */}
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 12,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {params?.name}
          </Text>
  
          <Text
            style={{
              marginTop: 5,
              color: "gray",
              fontWeight: "500",
              fontSize: 15,
            }}
          >
            {params?.description}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#006A4E",
                borderRadius: 4,
                paddingHorizontal: 4,
                paddingVertical: 5,
                gap: 4,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
              >
                {params?.aggregate_rating}K Ratings
              </Text>
              <Ionicons name="star" size={15} color="white" />
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D0F0C0",
              borderRadius: 20,
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginTop: 12,
            }}
          >
            <Text>30 - 40 mins • 6 km | Bangalore</Text>
          </View>
        </View>
        <View
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 5,
            backgroundColor: "white",
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ backgroundColor: "white" }}
          >
            <View style={{ flexDirection: "row" }}>
              {recievedMenu?.map((item: MenuItem, index: number) => (
                <Pressable
                  key={item?.id || index}
                  onPress={() => scrollToCategory(index)}
                  style={{
                    paddingHorizontal: 7,
                    borderRadius: 4,
                    paddingVertical: 5,
                    marginVertical: 10,
                    marginHorizontal: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "#181818",
                    borderWidth: 1,
                    backgroundColor: "black",
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {recievedMenu?.map((item: MenuItem, index: number) => (
          <FoodItem key={index} item={item} />
        ))}
      </ScrollView>

      {/* <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          right: 25,
          bottom: cart?.length > 0 ? 70 : 35,
          backgroundColor: "black",
        }}
      >
        <Ionicons
          style={{ textAlign: "center" }}
          name="fast-food-outline"
          size={24}
          color="white"
        />
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "500",
            fontSize: 11,
            marginTop: 3,
          }}
        >
          MENU
        </Text>
      </Pressable> */}

      {/* <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(!modalVisible)}
      >
        <View
          style={{
            height: 190,
            width: 250,
            backgroundColor: "black",
            position: "absolute",
            bottom: 35,
            right: 10,
            borderRadius: 7,
          }}
        >
          {menu?.map((item, index) => (
            <View
              key={item?.id || index} 
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ color: "#D0D0D0", fontWeight: "600", fontSize: 18 }}
              >
                {item?.name}
              </Text>
              <Text
                style={{ color: "#D0D0D0", fontWeight: "600", fontSize: 18 }}
              >
                {item?.items?.length}
              </Text>
            </View>
          ))}
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={{ width: 120, height: 70, resizeMode: "contain" }}
              source={{
                uri: "https://i.imghippo.com/files/GNTA4584KA.png",
              }}
            />
          </View>
        </View>
      </Modal> */}

      {cart?.length > 0 && (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/cart",
              params: {
                name: params.name,
              },
            })
          }
          style={{
            backgroundColor: "#fd5c63",
            paddingHorizontal: 10,
            paddingVertical: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            {cart.length} items added
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              marginTop: 5,
              fontWeight: "600",
            }}
          >
            Add items(s) worth 240 to reduce surge fee by Rs 35.
          </Text>
        </Pressable>
      )}
    </>
  );
};

export default hotel;

const styles = StyleSheet.create({});
