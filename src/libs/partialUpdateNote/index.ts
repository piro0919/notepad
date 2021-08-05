import { PartialUpdateObjectResponse } from "@algolia/client-search";
import algoliaAdmin from "libs/algoliaAdmin";

export type SaveNoteParam = Partial<
  Pick<Note, "modifiedDate" | "note" | "title">
> & { objectID: string };

export type PartialUpdateObjectNoteData = PartialUpdateObjectResponse;

async function partialUpdateNote(
  note: SaveNoteParam
): Promise<{ data: PartialUpdateObjectNoteData }> {
  const index = algoliaAdmin.initIndex(
    process.env.NODE_ENV === "development" ? "dev_NOTES" : "prod_NOTES"
  );
  const partialUpdateObjectResponse = await index
    .partialUpdateObject(note, { createIfNotExists: false })
    .wait();

  return { data: partialUpdateObjectResponse };
}

export default partialUpdateNote;
