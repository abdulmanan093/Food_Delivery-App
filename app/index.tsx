import { StyleSheet } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
const Index = () => {
  return <Redirect href="/(authenticate)/login" />;
};

export default Index;
const styles = StyleSheet.create({});
