import { getSearch } from "@/api/search";
import { Image } from "@/components/Image";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LegendList, type LegendListRef } from "@legendapp/list";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useScrollToTop } from "@react-navigation/native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { cssInterop } from "nativewind";
import { useRef } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { SearchBarCommands } from "react-native-screens";
import { useDebounceValue } from "usehooks-ts";

cssInterop(LegendList, {
  className: { target: "style" },
  contentContainerClassName: { target: "contentContainerStyle" },
});

export default function SearchScreen() {
  const bottomTabHeight = useBottomTabBarHeight();
  const colorScheme = useColorScheme();
  const [search, setSearch] = useDebounceValue("", 500);

  // @ts-expect-error just type error
  const inputRef = useRef<SearchBarCommands>();
  const listRef = useRef<LegendListRef>(null);
  useScrollToTop(listRef);

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    getSearch(search),
  );

  return (
    <SafeAreaView className="flex-1">
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

      <LegendList
        ref={listRef}
        recycleItems={true}
        contentContainerClassName="px-6 mt-10 bg-white dark:bg-black"
        contentContainerStyle={{
          paddingBottom: bottomTabHeight,
        }}
        contentInsetAdjustmentBehavior="automatic"
        ListEmptyComponent={() => (
          <Text className="font-new-york text-2xl dark:text-white border-b-hairline border-gray-800 pb-4">
            No results found
          </Text>
        )}
        // ListHeaderComponent={() => (
        //   <Text className="font-new-york text-2xl dark:text-white border-b-hairline border-gray-800 pb-4">
        //     Trending
        //   </Text>
        // )}
        data={data ?? []}
        ItemSeparatorComponent={() => (
          <View className="h-hairline bg-gray-200 ml-20 dark:bg-gray-800" />
        )}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "black" : "gray",
              },
            ]}
            className="flex-row items-center gap-4 py-4"
            onPress={() => {
              inputRef.current?.setText(item.title);
              inputRef.current?.focus();
              setSearch(item.title);
            }}
          >
            <Image
              source={{
                uri: `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`,
              }}
              className="aspect-[2/3] w-16 rounded-sm"
              withSkeleton
            />
            <View className="flex-row justify-between items-center flex-1 gap-6">
              <View className="flex-1 gap-1">
                <Text className="font-semibold dark:text-white">
                  {item.title}
                </Text>
                <Text className="text-gray-500 dark:text-gray-400">
                  Book • ★ {item.ratings_average}{" "}
                  <Text className="text-gray-300 dark:text-gray-600">
                    ({item.ratings_count})
                  </Text>
                </Text>
              </View>
              <Text className="rounded-full py-2 px-8 bg-gray-100 font-medium">
                GET
              </Text>
            </View>
          </Pressable>
        )}
        keyboardDismissMode="on-drag"
        keyExtractor={(item) => String(item.key)}
        onEndReached={() => {
          if (hasNextPage && !isFetching) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          isFetching && <ActivityIndicator size="large" />
        }
      />
    </SafeAreaView>
  );
}
