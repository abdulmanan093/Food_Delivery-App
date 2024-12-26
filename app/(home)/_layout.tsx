import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="hotel" />
        <Stack.Screen name="cart" />
        <Stack.Screen name="order" />
        <Stack.Screen name="userdetails" />
        <Stack.Screen name="basket" />
      </Stack>
    </Provider>
  );
}
