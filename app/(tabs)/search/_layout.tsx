import { Stack } from "expo-router";

export default function SearchLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerLargeTitle: true,
        headerShown: true,
      }}
    />
  );
}
