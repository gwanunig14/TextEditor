import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import RichTextEditor from "./RichTextEditor";

interface TextBuilderProps {
  name: string;
  textData: string;
  handleNameChange: (name: string) => void;
  handleTextDataChange: (textData: string) => void;
  textProcessing: (processing: boolean) => void;
  hide?: boolean;
}

const TextBuilder = ({
  name,
  textData,
  handleNameChange,
  handleTextDataChange,
  textProcessing,
  hide,
}: TextBuilderProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingTop: 16,
        }}
      >
        <TextInput
          placeholderTextColor="#acb5bd"
          style={styles.input}
          placeholder="Title"
          onChangeText={(text) => handleNameChange(text)}
          defaultValue={name}
        />
      </View>
      {!hide && (
        <RichTextEditor
          onChange={(data: string) => {
            handleTextDataChange(data);
          }}
          initialData={textData}
          textProcessing={textProcessing}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 40,
    height: "100%",
  },
  content: {
    paddingTop: 16,
  },
  contentWeb: {
    marginVertical: 16,
  },
  input: {
    fontSize: 26,
    paddingVertical: 4,
    height: 50,
    fontFamily: "SourceSans3_Bold",
    color: "#000",
    width: "100%",
  },
});

export default TextBuilder;
