import { Image, StyleSheet, Platform, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { text, text2, title } from "../Views/Text";
import TextBuilder from "../Views/TextBuilder";

export default function HomeScreen() {
  const [name, setName] = useState(title);
  //@ts-ignore
  const [textData, setTextData] = useState(text);
  const [textBodyProcessing, setTextBodyProcessing] = useState(false);

  function handleOnChange(data: string) {
    setTextData(data);
  }

  useEffect(() => {
    console.log(textData);
  }, [textData]);

  return (
    <View style={{ height: "100%" }}>
      <TextBuilder
        name={name}
        textData={textData}
        handleNameChange={setName}
        handleTextDataChange={handleOnChange}
        textProcessing={setTextBodyProcessing}
      />
    </View>
  );
}
