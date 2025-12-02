
import type { NextApiRequest, NextApiResponse } from 'next';
import listings from '../../data/listings.json';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
const { q, minPrice, maxPrice, beds } = req.query;
let results = listings as any[];


if (q && typeof q === 'string') {
const ql = q.toLowerCase();
results = results.filter(l => l.title.toLowerCase().includes(ql) || l.location.toLowerCase().includes(ql));
}


if (minPrice) results = results.filter(l => l.price >= Number(minPrice));
if (maxPrice) results = results.filter(l => l.price <= Number(maxPrice));
if (beds) results = results.filter(l => l.beds === Number(beds));


res.status(200).json(results);
}
