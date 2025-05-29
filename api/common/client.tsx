import ky from "ky";

export const client = ky.create({
  prefixUrl: process.env.EXPO_PUBLIC_API_URL,
});
