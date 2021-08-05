import { NextApiRequest, NextApiResponse } from "next";
import deleteNote from "libs/deleteNote";
import partialUpdateObject from "libs/partialUpdateNote";
import saveNote from "libs/saveNote";

async function handler(
  { method, ...req }: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (method === "DELETE") {
    const {
      query: { objectID },
    } = req;

    if (typeof objectID !== "string") {
      res.status(400);
      res.end();

      return;
    }

    await deleteNote({
      objectID,
    });

    res.status(200);
    res.end();

    return;
  }

  if (method === "PATCH") {
    const {
      body: { modifiedDate, note, objectID, title },
    } = req;

    await partialUpdateObject({
      modifiedDate,
      note,
      objectID,
      title,
    });

    res.status(200);
    res.end();

    return;
  }

  if (method === "POST") {
    const {
      body: { createdDate, modifiedDate, note, title, uid },
    } = req;

    const { data } = await saveNote({
      createdDate,
      modifiedDate,
      note,
      title,
      uid,
    });

    res.send(data);
    res.status(200);
    res.end();

    return;
  }

  res.status(404);
  res.end();

  return;
}

export default handler;
