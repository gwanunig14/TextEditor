import React, { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import {
  useEditorBridge,
  useBridgeState,
  Toolbar,
  RichText,
  ImageBridge,
  TenTapStartKit,
  CodeBridge,
  PlaceholderBridge,
} from "@10play/tentap-editor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import debounce from "lodash/debounce";
import { SourceSans3_Regular } from "../(tabs)/font";
import Loader from "./Loader";

const TOOL_BAR_OFFSET = 12;

interface RichTextEditorProps {
  onChange?: (data: string) => void;
  initialData?: string;
  textProcessing: (processing: boolean) => void;
}

const customCodeBlockCSS = `
${SourceSans3_Regular}
* {
  font-family: 'Source Sans 3', sans-serif;
}
`;

function RichTextEditor({
  onChange,
  initialData,
  textProcessing,
}: RichTextEditorProps) {
  const { height } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const [toolbarHeight, setToolbarHeight] = useState(0);

  // debounce prevents the editor from crashing from too many state updates
  const debouncedHandleOnChange = debounce(async () => {
    try {
      const html = await editor.getHTML();
      if (onChange) {
        onChange(html);
      }
    } catch (error) {
      console.error("Error getting html from editor", error);
    }
  });

  const editor = useEditorBridge({
    bridgeExtensions: [
      ...TenTapStartKit,
      CodeBridge.configureCSS(customCodeBlockCSS),
      PlaceholderBridge.configureExtension({
        placeholder: "Type here...",
      }),
      ImageBridge.configureExtension({
        inline: true,
      }),
    ],
    autofocus: false,
    onChange: () => {
      textProcessing(true);
      debouncedHandleOnChange();
    },
    initialContent: initialData,
    avoidIosKeyboard: true,
  });

  const state = useBridgeState(editor);

  if (Platform.OS === "web") {
    return null;
  }

  /**
   * I believe the @10play/tentap-editor library is not handling the keyboard offset correctly.
   * Only on the iphone SE does the toolbar completely hide and the height of it needs to be added
   * manually like it is here.
   */
  const offset =
    bottom + top + (height < 700 ? toolbarHeight : TOOL_BAR_OFFSET);

  return (
    <View style={{ height: "100%" }}>
      <SafeAreaView style={styles.container}>
        {state.isReady ? null : (
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Loader />
          </View>
        )}
        <View
          style={{
            opacity: state.isReady ? 1 : 0,
            // height: '100',
            flex: 1,
          }}
        >
          <RichText editor={editor} />
        </View>
      </SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={offset}
      >
        <View
          onLayout={(e) => {
            e.persist();
            setToolbarHeight(e.nativeEvent.layout.height);
          }}
        >
          <Toolbar editor={editor} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default RichTextEditor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    // position: "absolute",
    width: "100%",
    bottom: 0,
  },
});
