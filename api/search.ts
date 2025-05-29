import { infiniteQueryOptions } from "@tanstack/react-query";

import { client } from "./common";
import { bookSchema, createPaginatedSchema } from "./common/schema";

const LIMIT = 20;

export const getSearch = (query: string) =>
  infiniteQueryOptions({
    queryKey: ["search", query],
    queryFn: async ({ pageParam }) => {
      const fields = new URLSearchParams();
      fields.append("fields", Object.keys(bookSchema.shape).join(","));

      const response = await client
        .get("search.json", {
          searchParams: {
            q: query,
            offset: pageParam,
            limit: LIMIT,
            fields: Object.keys(bookSchema.shape).join(","),
          },
        })
        .json();

      return createPaginatedSchema(bookSchema).parse(response);
    },
    enabled: query !== "",
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.offset + LIMIT,
    select: (data) => data?.pages?.flatMap((page) => page?.docs),
  });
