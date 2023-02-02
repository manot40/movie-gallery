import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

const KEY = process.env.NEXT_API_KEY;
const URL = `${process.env.NEXT_API_URL}/movie`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await axios.get<{ cast: Cast[] }>(`${URL}/${req.query.id}/credits`, {
      params: {
        api_key: KEY,
        language: 'en-US',
      },
    });

    res.status(200).json({
      message: 'Success',
      success: true,
      data: data.cast,
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
