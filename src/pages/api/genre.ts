import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

const KEY = process.env.NEXT_API_KEY;
const URL = `${process.env.NEXT_API_URL}/genre/movie/list?api_key=${KEY}&language=en-US`;

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await axios.get<{ genres: Genre[] }>(URL);
    res.status(200).json({
      message: 'Success',
      success: true,
      data: data.genres.map((g) => ({ ...g, id: g.id.toString() })),
    });
  } catch (err: any) {
    const { response } = err;
    console.error(err.message);

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
