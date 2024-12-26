import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";
import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";
import { supabase } from "../supabase";

const { width } = Dimensions.get("window");

interface Hotel {
  id: string;
  name: string;
  adress?: string;
  description?: string;
  featured_image: string;
  time: string;
  cuisines?: string | string[];
  aggregate_rating?: string | number;
  menu?: { name: string; price: number }[];
}

const CarouselComponent = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [activeIndex, setActiveIndex] = useState(0); 
  const router = useRouter();

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

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % hotels.length); 
    }, 3000); 

    return () => clearInterval(timer); 
  }, [hotels.length]);

  return (
    <View style={styles.container}>
      <Swiper
        autoplay={false} 
        loop={true}
        dotColor="#90A4AE"
        activeDotColor="#13274F"
        removeClippedSubviews={false}
        style={styles.wrapper}
        showsPagination={true}
        index={activeIndex} 
        onIndexChanged={(index) => setActiveIndex(index)} 
      >
        {hotels.map((hotel) => (
          <Pressable
            key={hotel.id}
            onPress={() =>
              router.push({
                pathname: "/hotel",
                params: {
                  id: hotel.id,
                  name: hotel.name,
                  adress: hotel.adress,
                  cuisines: Array.isArray(hotel.cuisines)
                    ? hotel.cuisines.join(", ")
                    : hotel.cuisines,
                  aggregate_rating: hotel.aggregate_rating?.toString(),
                  menu: JSON.stringify(hotel.menu || []),
                },
              })
            }
          >
            <Image
              source={{ uri: hotel.featured_image }}
              style={styles.image}
            />
          </Pressable>
        ))}
      </Swiper>
    </View>
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  wrapper: {
    height: 200,
  },
  image: {
    width: width * 0.94,
    height: 200,
    borderRadius: 6,
    alignSelf: "center",
  },
});
