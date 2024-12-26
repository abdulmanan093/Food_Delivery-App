import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  FlatList,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Carousel from "../../components/Carousel";
import Categories from "../../components/Categories";
import Hotel from "../../components/Hotel";
import MenuItem from "../../components/MenuItem";
import { supabase } from "../../supabase";
import { useRouter } from "expo-router";
import HotelList from "../../components/HotelCards";

interface HotelData {
  id: string;
  name: string;
  adress?: string;
  smalladress?: string;
  cuisines: string | string[];
  aggregate_rating: string | number;
  featured_image: string;
  time: string;
  description?: string;
  average_cost_for_two?: number;
  longitude?: number;
  latitude?: number;
  menu?: { name: string; price: number }[];
}

const Index = () => {
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Fetching your location..."
  );

  const [searchQuery, setSearchQuery] = useState(""); 
  const [isFocused, setIsFocused] = useState(false);
  const [filteredHotels, setFilteredHotels] = useState<HotelData[]>([]); 
  const [barHotel, setbarHotel] = useState<HotelData[]>([]); 
  const [hotels, setHotels] = useState<HotelData[]>([]);

  const router = useRouter();
  const [data, setData] = useState<HotelData[]>([]);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data, error } = await supabase
          .from("hotels") 
          .select("*")
          .limit(3);

        if (error) {
          console.error("Error fetching hotels:", error.message);
          Alert.alert("Error", "Could not fetch hotels.");
          return;
        }

        setHotels(data || []);
      } catch (err) {
        console.error("Unexpected error:", err);
        Alert.alert("Error", "An unexpected error occurred.");
      }
    };

    fetchHotels();
  }, []);

  const checkIfLocationEnabled = async () => {
    const enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location Services Not Enabled",
        "Please enable your location services to continue",
        [{ text: "OK" }]
      );
    } else {
      setLocationServicesEnabled(true);
    }
  };

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Not Granted",
        "Allow the app to use the location service",
        [{ text: "OK" }]
      );
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const { latitude, longitude } = location.coords;

    try {
      const addressResponse = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (addressResponse.length > 0) {
        const { name, postalCode, city } = addressResponse[0];
        const formattedAddress = `${name}, ${postalCode}, ${city}`;
        
        setDisplayCurrentAddress(formattedAddress);
      } else {
        setDisplayCurrentAddress("Unable to fetch address");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setDisplayCurrentAddress("Error fetching address");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from("hotels").select("*");
        
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setData(data);
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    }

    fetchData();
  }, []);
  
  useEffect(() => {
    if (searchQuery) {
      const results = data.filter((hotel) =>
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredHotels(results);
    } else {
      setFilteredHotels([]);
    }
  }, [searchQuery, data]);

  const closeDropdown = () => {
    setIsFocused(false);
    Keyboard.dismiss(); 
  };

  // const recommended = [
  //   {
  //     id: 0,
  //     name: "Nandhana Palace",
  //     image:
  //       "https://b.zmtcdn.com/data/pictures/chains/3/50713/81d0735ce259a6bf800e16bb54cb9e5e.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
  //     time: "35 - 45",
  //     type: "Andhra",
  //   },
  //   {
  //     id: 1,
  //     name: "GFC Biriyani",
  //     image:
  //       "https://b.zmtcdn.com/data/pictures/0/20844770/f9582144619b80d30566f497a02e2c8d.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*",
  //     time: "10 - 35",
  //     type: "North Indian",
  //   },
  //   {
  //     id: 2,
  //     name: "Happiness Dhaba",
  //     image:
  //       "https://b.zmtcdn.com/data/reviews_photos/2f1/c66cf9c2c68f652db16f2c0a6188a2f1_1659295848.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
  //     time: "20 - 25",
  //     type: "North Indian",
  //   },

  //   {
  //     id: 3,
  //     name: "Happiness Dhaba",
  //     image:
  //       "https://b.zmtcdn.com/data/reviews_photos/2f1/c66cf9c2c68f652db16f2c0a6188a2f1_1659295848.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
  //     time: "20 - 25",
  //     type: "North Indian",
  //   },
  //   {
  //     id: 4,
  //     name: "Happiness Dhaba",
  //     image:
  //       "https://b.zmtcdn.com/data/reviews_photos/2f1/c66cf9c2c68f652db16f2c0a6188a2f1_1659295848.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
  //     time: "20 - 25",
  //     type: "North Indian",
  //   },
  // ];
  // const items = [
  //   {
  //     id: "0",
  //     name: "Offers",
  //     description: "Upto 50% off",
  //     image: "https://cdn-icons-png.flaticon.com/128/9356/9356378.png",
  //   },
  //   {
  //     id: "1",
  //     name: "Legends",
  //     description: "Across India",
  //     image: "https://cdn-icons-png.flaticon.com/128/8302/8302686.png",
  //   },
  //   {
  //     id: "2",
  //     name: "Gourmet",
  //     description: "Selections",
  //     image: "https://cdn-icons-png.flaticon.com/128/1065/1065715.png",
  //   },
  //   {
  //     id: "3",
  //     name: "Healthy",
  //     description: "Curated dishes",
  //     image: "https://cdn-icons-png.flaticon.com/128/415/415744.png",
  //   },
  //   {
  //     id: "4",
  //     name: "Legends",
  //     description: "Across India",
  //     image: "https://cdn-icons-png.flaticon.com/128/8302/8302686.png",
  //   },
  //   {
  //     id: "5",
  //     name: "Gourmet",
  //     description: "Selections",
  //     image: "https://cdn-icons-png.flaticon.com/128/1065/1065715.png",
  //   },
  // ];
  
  
  
  
  //       "https://b.zmtcdn.com/data/pictures/2/18820472/b07647252aae32993047faf13a1cccf4.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*",
  
  
  
  
  //           "https://b.zmtcdn.com/data/pictures/chains/8/51828/68d04135bbac1e3d5ff5a87d45974da1.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
  
  
  
  
  
  //           "https://b.zmtcdn.com/data/pictures/chains/8/51828/1f8008fc1cec3cd7ea2b559c32b1e642.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4rgOs6C9rJuwL_sjJB5n7CeGKEA-Xg2yxIYq025B7_7avmruQHZ0DPpJa8GiSzPkEfas&usqp=CAU",
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTCYsmzl1yfX0MwTN-E_uHC-bk3p181VzjIA&usqp=CAU",
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1wuHjGnvTD4Aewe_M2-_5OSwPiPv1kUvMljF-sqoPRzvoFxD06BK2ac2jV-ZmQG6lQTg&usqp=CAU",
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXumfbiH2jcIY8xq9QW6B1QGoh3OJ596SnpQ&usqp=CAU",
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREAW6AHZuQtR_1d9WPZn5mjK_jG-aAJxYfLQ&usqp=CAU",
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLvPe-0FZVXXBJkBWf--jnjCcKN6PxD1Zgdw&usqp=CAU",
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScVnb3JlCmtRJUTXo3Tj3dl_ZPjq2ScYFE6g&usqp=CAU",
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsboAN558yvuCNpy0Lm40ZMT7iYZRkfbL6xA&usqp=CAU",
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR30R3IntPKgz0A7WzeylvnDyM8EwmAfE2qXA&usqp=CAU",
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVdGrJhslCsWFMNhndCotN4HNucd_pm9nQSA&usqp=CAU",
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEO2PLGXFMmFjaR1Kj19mndyPl-Wh4Kbq0Hw&usqp=CAU",
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzUsgy4YrizXUafeKLzAWasb93wvT_TSIvgw&usqp=CAU",
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFXsKQIgGajlkt7qydP7TS6xpVD_gKY6ufnw&usqp=CAU",
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu0iR3PZXGiNSyJf8XCMHuF13y9KL2owcNYQ&usqp=CAU",
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHbn8yLak8QNu-M5P4ttVPHFkvKwz4G48x7w&usqp=CAU",
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsQSJX9mRckG3R7NfvYCRe-08s-z22tX-6nQ&usqp=CAU",
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu0iR3PZXGiNSyJf8XCMHuF13y9KL2owcNYQ&usqp=CAU",
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjGqVUxo6HO-CtXn-AHgAin1tvN4l8_A0e1Q&usqp=CAU",
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkpI5t_Hgch4-I9edPRV4YNeZKgMX1iHtQng&usqp=CAU",


  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          padding: 10,
        }}
      >
        <Image
          source={{
            uri: "https://i.ibb.co/wWv0SRW/Screenshot-2024-12-25-190737-3-removebg-preview.png",
          }}
          style={{ width: 40, height: 40 }}
        />

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>Deliver To</Text>
          <Text style={{ color: "gray", fontSize: 16, marginTop: 3 }}>
            {displayCurrentAddress}
          </Text>
        </View>
        <Pressable
          onPress={() => router.push("/userdetails")}
          style={{
            backgroundColor: "#fd6c73",
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="person-outline" size={20} color="white" />
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: "#C0C0C0",
          paddingVertical: 8,
          paddingHorizontal: 10,
          borderRadius: 11,
          marginTop: 10,
          marginHorizontal: 10,
        }}
      >
        <TextInput
          placeholder="Search for food, hotels"
          style={{ flex: 1 }}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsFocused(true)}
          
        />
        <AntDesign name="search1" size={24} color="#E52B50" />
      </View>

      {isFocused && searchQuery.length > 0 && (
        <View
          style={{
            position: "absolute",
            top: 125, 
            left: 10,
            right: 10,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#C0C0C0",
            borderRadius: 10,
            maxHeight: 200,
            zIndex: 1000, 
          }}
        >
          {filteredHotels.map((hotel) => (
            <Pressable
              key={hotel.id}
              onPress={() => {
                router.push({
                  pathname: "/hotel",
                  params: {
                    id: hotel.id,
                    name: hotel.name,
                    adress: hotel.adress,
                    smalladress: hotel.smalladress,
                    cuisines: Array.isArray(hotel.cuisines)
                      ? hotel.cuisines.join(", ")
                      : hotel.cuisines,
                    aggregate_rating: hotel.aggregate_rating.toString(),
                    menu: JSON.stringify(hotel.menu || []),
                  },
                });
                closeDropdown();
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#E0E0E0",
              }}
            >
              <Image
                source={{ uri: hotel.featured_image }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                  marginRight: 10,
                }}
              />
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {hotel.name}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      <Carousel />
    <HotelList />

      <Text
        style={{
          textAlign: "center",
          marginTop: 7,
          letterSpacing: 4,
          marginBottom: 5,
          color: "gray",
        }}
      >
        ALL RESTAURANTS
      </Text>

      <View style={{ marginHorizontal: 8 }}>
        {data?.map((item, index) => (
          <Hotel key={index} item={item} menu={item?.menu} />

        ))}
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({});
