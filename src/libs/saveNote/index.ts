import { SaveObjectResponse } from "@algolia/client-search";
import algoliaAdmin from "libs/algoliaAdmin";

export type SaveNoteParam = Note;

export type SaveNoteData = SaveObjectResponse;

async function saveNote(note: SaveNoteParam): Promise<{ data: SaveNoteData }> {
  const index = algoliaAdmin.initIndex(
    process.env.NODE_ENV === "development" ? "dev_NOTES" : "prod_NOTES"
  );
  const saveObjectResponse = await index
    .saveObject(note, {
      autoGenerateObjectIDIfNotExist: true,
    })
    .wait();

  return { data: saveObjectResponse };
}

export default saveNote;
