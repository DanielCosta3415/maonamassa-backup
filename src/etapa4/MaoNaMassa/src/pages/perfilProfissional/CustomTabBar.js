// Componente TabBarCustomizado.js

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const CustomTabBar = ({ navigationState, position, jumpTo }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {navigationState.routes.map((route, i) => {
        const focused = navigationState.index === i;
        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => jumpTo(route.key)}
            style={{
              backgroundColor: focused ? "#BE99FF" : "#F4EEFF",
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 12,
              marginHorizontal: 0,
            }}
          >
            <Text
              style={{
                color: focused ? "#FFF" : "#BE99FF",
                fontFamily: "KrubSemibold",
                fontSize: 14,
              }}
            >
              {route.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
