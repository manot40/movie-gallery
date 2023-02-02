import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

const KEY = process.env.NEXT_API_KEY;
const URL = process.env.NEXT_API_URL;

type Discover = {
  results: Movie[];
  total_results: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { page, genre, search } = req.query;
    const finalUrl = `${URL}/${search ? 'search' : 'discover'}/movie`;
    const { data } = await axios.get<Discover>(finalUrl, {
      params: {
        page,
        adult: false,
        query: search,
        api_key: KEY,
        language: 'en-US',
        with_genres: +(genre || '0') ? genre : undefined,
      },
    });

    res.status(200).json({
      message: 'Success',
      success: true,
      data: data.results,
      count: data.total_results,
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
