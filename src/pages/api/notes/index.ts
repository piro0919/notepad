import { NextApiRequest, NextApiResponse } from "next";
import searchNotes from "libs/searchNotes";
import verifyIdToken from "libs/verifyIdToken";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;

  if (method === "GET") {
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
      data: { hits },
    } = await searchNotes({
      requestOptions: {
        filters: `uid:${uid}`,
      },
    });

    res.send(hits);
    res.status(200);
    res.end();

    return;
  }

  res.status(404);
  res.end();

  return;
}

export default handler;
