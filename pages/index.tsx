import Head from 'next/head';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ListingCard from '../components/ListingCard';
import Filters from '../components/Filters';
import { useEffect, useState } from 'react';


export default function Home() {
const [listings, setListings] = useState<any[]>([]);
const [query, setQuery] = useState('');


async function fetchListings(q = '') {
const url = new URL('/api/listings', window.location.origin);
if (q) url.searchParams.set('q', q);
const res = await fetch(url.toString());
const data = await res.json();
setListings(data);
}


useEffect(() => { fetchListings(); }, []);


return (
<div>
<Head>
<title>Airbnb Clone</title>
</Head>
<Header />
<main className="max-w-6xl mx-auto px-4">
<SearchBar onSearch={(q) => { setQuery(q); fetchListings(q); }} />
<Filters onChange={(filters: any) => {
// simple local filter demo
const qs = new URLSearchParams();
if (filters.beds) qs.set('beds', String(filters.beds));
if (filters.maxPrice) qs.set('maxPrice', String(filters.maxPrice));
fetch(`/api/listings?${qs.toString()}`).then(r => r.json()).then(setListings);
}} />


<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
{listings.map(l => (
<ListingCard key={l.id} listing={l} />
))}
</section>


{listings.length === 0 && (
<p className="text-center text-gray-500">No listings found for "{query}"</p>
)}
</main>
</div>
);
}
