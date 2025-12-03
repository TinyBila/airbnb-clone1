import Head from 'next/head';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ListingCard from '../components/ListingCard';
import Filters from '../components/Filters';
import { useEffect, useState } from 'react';
import { properties } from '../data/properties';


export default function Home() {
const [listings, setListings] = useState<any[]>([]);
const [query, setQuery] = useState('');
const [filters, setFilters] = useState({ beds: undefined, maxPrice: undefined });


async function fetchListings(q = '') {
const url = new URL('/api/listings', window.location.origin);
if (q) url.searchParams.set('q', q);
const res = await fetch(url.toString());
const data = await res.json();
setListings(data);
}


useEffect(() => { fetchListings(); }, []);


const filtered = properties.filter((p) => {
if (filters.beds && (p.details?.bedrooms ?? 0) < filters.beds) return false;
if (filters.maxPrice && p.price > filters.maxPrice) return false;
return true;
});


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
{filtered.length > 0 ? (
filtered.map((property) => (
<ListingCard key={property.id} listing={property} />
))
) : (
<p className="col-span-full text-center text-gray-500">
No properties match your filters.
</p>
)}
</section>


{listings.length === 0 && (
<p className="text-center text-gray-500">No listings found for "{query}"</p>
)}
</main>
</div>
);
}
