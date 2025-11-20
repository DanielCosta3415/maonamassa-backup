import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import ListaDeHorarios from "./ListaDeHorarios";
import CustomTabBar from "./CustomTabBar";

const { width: screenWidth } = Dimensions.get("window");

const DisponibilidadeProfissional = ({ disponibilidade }) => {
  const [index, setIndex] = useState(0);

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const novasRotas = disponibilidade.map((item) => ({
      key: item.dia,
      title: item.dia,
      horarios: item.horarios,
    }));

    setRoutes(novasRotas);

    setIndex(0);
  }, [disponibilidade]);

  const renderAgenda = ({ route }) => {
    return <ListaDeHorarios horarios={route.horarios} />;
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#007AFF" }}
      tabStyle={{ width: "auto", paddingHorizontal: 8 }}
      style={{
        backgroundColor: "transparent",
        elevation: 0,
      }}
      renderLabel={({ route, focused }) => (
        <View
          style={{
            backgroundColor: focused ? "#007AFF" : "#E0E0E0",
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 6,
            marginHorizontal: 4,
          }}
        >
          <Text
            style={{
              color: focused ? "#FFF" : "#333",
              fontFamily: "Krub",
              fontSize: 14,
            }}
          >
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  if (routes.length === 0) {
    return null;
  }

  return (
    <View style={styles.tabContainer}>
      <Text style={styles.h2}>Disponibilidade de horários</Text>
      <TabView
        key={disponibilidade[0]?.dia || "tabs"}
        navigationState={{ index, routes }}
        renderScene={renderAgenda}
        onIndexChange={setIndex}
        initialLayout={{ width: screenWidth }}
        renderTabBar={(props) => <CustomTabBar {...props} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  h2: {
    fontFamily: "InterBold",
    color: "#3A3A3C",
    fontSize: 24,
  },
  tabContainer: {
    height: 270,
    marginTop: 24,
    gap: 32,
  },
});

export default DisponibilidadeProfissional;
