import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Image, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "../supabase";

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

const HotelCard = ({ hotel }: { hotel: Hotel }) => {
  const router = useRouter();

  return (
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
      style={{
        backgroundColor: "white",
        flexDirection: "row",
        margin: 10,
        borderRadius: 8,
      }}
    >
      <View>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "cover",
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 7,
          }}
          source={{ uri: hotel.featured_image }}
        />
      </View>
      <View style={{ padding: 10, flexDirection: "column" }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{hotel.name}</Text>
        {hotel.description && (
          <Text
            style={{
              marginTop: 3,
              fontSize: 15,
              fontWeight: "500",
              color: "gray",
            }}
          >
            {hotel.description}
          </Text>
        )}
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 11 }}
        >
          <Ionicons name="time" size={24} color="green" />
          <Text>{hotel.time} mins</Text>
        </View>
      </View>
    </Pressable>
  );
};

const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

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

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </ScrollView>
  );
};

export default HotelList;
