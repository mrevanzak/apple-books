import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useScrollToTop } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { SearchBarCommands } from "react-native-screens";

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const [, setSearch] = useState("");
  // @ts-expect-error just type error
  const inputRef = useRef<SearchBarCommands>();
  const flatlistRef = useRef<FlatList>(null);
  useScrollToTop(flatlistRef);

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: "Search",
          headerShown: true,
          headerLargeTitle: true,
          headerLargeTitleStyle: {
            fontFamily: "NewYork",
          },
          headerSearchBarOptions: {
            ref: inputRef,
            placeholder: "Books & Audiobooks",
            onChangeText: (text) => setSearch(text.nativeEvent.text),
          },
          headerStyle: {
            backgroundColor: colorScheme === "light" ? "white" : "dark",
          },
          contentStyle: {
            backgroundColor: colorScheme === "light" ? "white" : "dark",
          },
        }}
      />

      <FlatList
        ref={flatlistRef}
        contentContainerClassName="px-6 mt-10 bg-white dark:bg-black"
        contentInsetAdjustmentBehavior="automatic"
        ListHeaderComponent={() => (
          <Text className="font-new-york text-2xl dark:text-white border-b-hairline border-gray-800 pb-4">
            Trending
          </Text>
        )}
        data={Array.from({ length: 100 }, (_, i) => `Book ${i + 1}`)}
        ItemSeparatorComponent={() => (
          <View className="h-hairline bg-gray-200 dark:bg-gray-800" />
        )}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "black" : "gray",
              },
            ]}
            className="flex-row items-center gap-2 py-4"
            onPress={() => {
              inputRef.current?.setText(item);
              inputRef.current?.focus();
            }}
          >
            <IconSymbol name="magnifyingglass" color="gray" size={16} />
            <Text className="text-xl dark:text-white">{item}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
