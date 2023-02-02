import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

const KEY = process.env.NEXT_API_KEY;
const URL = `${process.env.NEXT_API_URL}/movie`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data: movie } = await axios.get<MovieDetail>(`${URL}/${req.query.id}`, {
      params: {
        api_key: KEY,
        language: 'en-US',
      },
    });

    const data = await (async () => {
      let trailer_video = [] as TrailerVideo[];

      if (trailer_video) {
        const { data: videos } = await axios.get<{ results: TrailerVideo[] }>(
          `${URL}/${req.query.id}/videos`,
          {
            params: {
              api_key: KEY,
              language: 'en-US',
            },
          }
        );

        trailer_video = videos.results;
      }

      return { ...movie, trailer_video };
    })();

    res.status(200).json({
      message: 'Success',
      success: true,
      data,
    });
  } catch (err: any) {
    const { response } = err;

    if (!response)
      return res.status(500).json({ success: false, message: 'Error when fetching resource(s)' });

    if (response.status < 500)
      return res.status(response.status).json({
        success: false,
        message: (response.data.errors || []).join(','),
      });

    res.status(response.status || 500).json({
      success: false,
      message: response.data?.message || 'Error when fetching resource(s)',
    });
  }
}
