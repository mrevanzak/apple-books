import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";

export default function SearchScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Search",
          headerShown: true,
          headerLargeTitle: true,
          headerSearchBarOptions: {
            placeholder: "Search...",
            onChangeText: (text) => console.log(text),
          },
        }}
      />

      <ThemedView>
        <ThemedText>Search: {}</ThemedText>
      </ThemedView>
    </>
  );
}
