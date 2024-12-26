import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/slices/cartSlice";
import { RootState } from "../redux/store"; 
import { useRouter } from "expo-router"; 

type MenuItemProps = {
  item: {
    id: string | number;
    name: string;
    price: number;
    rating: number;
    description: string;
    image: string;
    [key: string]: any;
  };
};

const MenuItem = ({ item }: MenuItemProps) => {
  const dispatch = useDispatch();
  const router = useRouter(); 
  const cartItem = useSelector((state: RootState) =>
    state.cart.cart.find((cartItem) => cartItem.id === item.id)
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <View>
      <Pressable
        style={{
          margin: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 15,
        }}
      >
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600", width: 220 }}>
            {item?.name}
          </Text>
          <Text style={{ marginTop: 4, fontSize: 15, fontWeight: "500" }}>
            ₨{item?.price}
          </Text>
          <Text
            style={{
              marginTop: 5,
              borderRadius: 4,
            }}
          >
            {[0, 0, 0, 0, 0].map((_, i) => (
              <FontAwesome
                key={i}
                style={{ paddingHorizontal: 3 }}
                name={i < Math.floor(item.rating) ? "star" : "star-o"}
                size={15}
                color="#FFD700"
              />
            ))}
          </Text>
          <Text
            style={{ width: 200, marginTop: 8, color: "gray", fontSize: 16 }}
          >
            {item?.description.length > 40
              ? item?.description.substring(0, 37) + "..."
              : item?.description}
          </Text>
        </View>

        <Pressable
          
          style={{ marginRight: 10 }}
        >
          <Image
            style={{ width: 120, height: 120, borderRadius: 8 }}
            source={{ uri: item?.image }}
          />
          {quantity > 0 ? (
            <Pressable
              style={{
                position: "absolute",
                top: 95,
                left: 20,
                backgroundColor: "#fd5c63",
                flexDirection: "row",
                paddingHorizontal: 10,
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <Pressable
                onPress={() => {
                  if (quantity === 1) {
                    dispatch(removeFromCart(item));
                    return;
                  }
                  dispatch(decrementQuantity({ id: item.id }));
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    color: "white",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    color: "white",
                    paddingHorizontal: 6,
                    fontSize: 15,
                  }}
                >
                  {quantity}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  dispatch(incrementQuantity({ id: item.id }));
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    color: "white",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                dispatch(addToCart({ ...item, quantity: 1 }));
              }}
              style={{
                position: "absolute",
                top: 95,
                left: 20,
                borderColor: "#E32636",
                borderWidth: 1,
                flexDirection: "row",
                paddingHorizontal: 25,
                paddingVertical: 5,
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: 5,
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "600", color: "#fd5c63" }}
              >
                ADD
              </Text>
            </Pressable>
          )}
        </Pressable>
        
      </Pressable>
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({});
