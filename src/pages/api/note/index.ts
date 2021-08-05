import { NextApiRequest, NextApiResponse } from "next";
import deleteNote from "libs/deleteNote";
import partialUpdateObject from "libs/partialUpdateNote";
import saveNote from "libs/saveNote";
import verifyIdToken from "libs/verifyIdToken";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;

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
    const result = await verifyIdToken({ req });

    if ("error" in result) {
      res.status(404);
      res.end();

      return;
    }

    const {
      data: { uid },
    } = result;
    const {
      body: { createdDate, modifiedDate, note, title },
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
