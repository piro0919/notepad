import { DeleteResponse } from "@algolia/client-search";
import algoliaAdmin from "libs/algoliaAdmin";

export type DeleteNoteParam = {
  objectID: string;
};

export type DeleteNoteData = DeleteResponse;

async function deleteNote({
  objectID,
}: DeleteNoteParam): Promise<{ data: DeleteNoteData }> {
  const index = algoliaAdmin.initIndex(
    process.env.NODE_ENV === "development" ? "dev_NOTES" : "prod_NOTES"
  );
  const deleteResponse = await index.deleteObject(objectID).wait();

  return { data: deleteResponse };
}

export default deleteNote;
