import { StyleSheet, SafeAreaView, ScrollView, View, ViewStyle, StyleProp } from "react-native";

export type BaseLayoutProps = {
  scrollable?: boolean;
  viewStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

const BaseLayout: React.FC<BaseLayoutProps> = ({ children, scrollable = false, viewStyle }) => {
  return (
    <SafeAreaView>
      {scrollable ? (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={StyleSheet.flatten([style.view, viewStyle && viewStyle])}>{children}</View>
        </ScrollView>
      ) : (
        <View style={StyleSheet.flatten([style.view, viewStyle && viewStyle])}>{children}</View>
      )}
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  view: {
    padding: 24,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
});

export default BaseLayout;
