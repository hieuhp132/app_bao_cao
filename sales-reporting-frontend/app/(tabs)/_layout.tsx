import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tổng quan",
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Thêm",
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle" size={24} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="report-post"
        options={{
          title: "Báo cáo",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="newspaper" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
