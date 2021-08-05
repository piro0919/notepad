import { ObjectWithObjectID } from "@algolia/client-search";
import algoliaClient from "libs/algoliaClient";

export type GetNoteParam = {
  objectID: string;
};

export type GetNoteData = Note & ObjectWithObjectID;

async function getNote({
  objectID,
}: GetNoteParam): Promise<{ data: GetNoteData }> {
  const index = algoliaClient.initIndex(
    process.env.NODE_ENV === "development" ? "dev_NOTES" : "prod_NOTES"
  );
  const noteWithObjectID = await index.getObject<Note>(objectID);

  return { data: noteWithObjectID };
}

export default getNote;
