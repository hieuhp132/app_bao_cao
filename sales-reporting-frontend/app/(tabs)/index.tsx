import { Image, StyleSheet, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function HomeScreen() {
  const [jsonData, setData] = useState([]);
  const round = (value: number, decimals: number): number => {
    return Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);
  };
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get("http://localhost:8081/top-city");
        setData(res.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReport();
  }, []);
  console.log("data:", jsonData);
  return (
    <View style={styles.bottomDiv}>
      <View style={styles.nav}>
        <Text style={styles.navText}>Dashboard</Text>
        <TouchableOpacity>
          <Ionicons
            name="notifications"
            size={24}
            color="white"
            style={styles.iconNoti}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.BodyDiv}>
        <View style={styles.rowfunc1}>
          <Text style={styles.bodyText}>Tên người dùng : </Text>
        </View>
        <View style={styles.rowfunc}>
          <View style={styles.money_earn}>
            <MaterialIcons name="attach-money" size={24} color="white" />
          </View>
          <View>
            <Text style={styles.bodyText}>
              Thành phố có số lượng doanh thu lớn nhất là{" "}
              <Text>{jsonData[0]}</Text>
            </Text>
            <Text style={styles.bodyText}>{round(jsonData[1], 2)}$</Text>
          </View>
        </View>
        <View style={styles.rowfunc}>
          <View style={styles.money_earn}>
            <MaterialIcons name="attach-money" size={24} color="white" />
          </View>
          <View>
            <Text style={styles.bodyText}>Tổng doanh thu hôm nay</Text>
            <Text style={styles.bodyText}>12.500.500 đ</Text>
          </View>
        </View>
        <View style={styles.rowfunc}>
          <View style={styles.money_earn}>
            <MaterialIcons name="attach-money" size={24} color="white" />
          </View>
          <View>
            <Text style={styles.bodyText}>Tổng doanh thu hôm nay</Text>
            <Text style={styles.bodyText}>12.500.500 đ</Text>
          </View>
        </View>
        <View style={styles.rowfunc}></View>
        <View style={styles.rowfunc}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowfunc1: {
    marginTop: 20,
    marginBottom: 10,
  },
  money_earn: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "#2980b9",
    marginLeft: 10,
  },
  rowfunc: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: "auto",
    borderRadius: 10,
    marginBottom: 10,
    padding: 20,
  },
  bodyText: {
    color: "black",
    fontSize: 20,
    fontFamily: "Roboto",
  },
  iconNoti: {
    width: 24,
  },
  nav: {
    marginTop: 40,
    flexDirection: "row", // Align items horizontally
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  navText: {
    fontSize: 35,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "white",
  },
  bottomDiv: {
    backgroundColor: "#2980b9",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 10,
    height: "100%",
    flex: 1,
  },
  BodyDiv: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#ecf0f1",
    height: "100%",
    flexDirection: "column",
    overflow: "scroll",
    paddingRight: 30,
    paddingLeft: 30,
  },
});
