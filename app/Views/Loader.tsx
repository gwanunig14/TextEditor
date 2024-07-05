import React from "react";
import { Text } from "react-native";

interface Props {
  size?: "sm" | "md" | "lg";
  noCenter?: boolean;
}
const Loader = ({ size, noCenter }: Props) => {
  return <Text style={{ fontSize: 120 }}>Blank View For Loading</Text>;
};

export default Loader;
