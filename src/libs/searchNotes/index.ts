import { SearchOptions, SearchResponse } from "@algolia/client-search";
import algoliaClient from "libs/algoliaClient";

export type SearchNotesParam = {
  query?: string;
  requestOptions?: SearchOptions;
};

export type SearchNotesData = SearchResponse<Note>;

async function searchNotes({
  query = "",
  requestOptions,
}: SearchNotesParam): Promise<{
  data: SearchNotesData;
}> {
  const index = algoliaClient.initIndex(
    process.env.NODE_ENV === "development" ? "dev_NOTES" : "prod_NOTES"
  );
  const searchResponse = await index.search<Note>(query, requestOptions);

  return { data: searchResponse };
}

export default searchNotes;
