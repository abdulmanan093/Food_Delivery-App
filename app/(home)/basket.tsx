import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React, { useState } from "react";
import ConfettiCannon from "react-native-confetti-cannon";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; 

const Basket = () => {
  const [order, setOrder] = useState(false);
  const router = useRouter();



  return (
    <View style={{ flex: 1, backgroundColor: "#e6e6e6" }}>
      <TouchableOpacity
        onPress={() => router.replace("/order")}
        style={{
          flexDirection: "row", 
          alignItems: "center", 
          position: "absolute",
          width: "100%",
          backgroundColor: "#ffefef",
          paddingHorizontal: 12,
          paddingVertical: 24,
          elevation: 3, 
          shadowColor: "#000", 
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 2,
        }}
      >
        <Ionicons
          name="arrow-back"
          size={30}
          color="#fd5c63"
        />
        <Text
          style={{
            marginLeft: 8, 
            fontSize: 20,
            fontWeight: "600",
            color: "#fd5c63",
          }}
        >
          Go Back
        </Text>
      </TouchableOpacity>

      <ConfettiCannon
        count={200}
        origin={{ x: -10, y: 0 }}
        fallSpeed={3000}
        fadeOut={true}
        autoStart={true}
      />

      <View
        style={{
          marginTop: "60%",
          padding: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginVertical: 8,
            textAlign: "center",
          }}
        >
          Your Order is Confirmed
        </Text>

        <Text
          style={{
            fontSize: 18,
            marginVertical: 8,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Thank you for your order!
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/")}
          style={{
            backgroundColor: "#fd6c73",
            paddingHorizontal: 16,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 16,
            width: "100%",
            height: 50,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#fff",
              textAlign: "center",
            }}
          >
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Basket;
