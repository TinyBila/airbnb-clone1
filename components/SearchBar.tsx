import { useState } from 'react';


export default function SearchBar({ onSearch }: { onSearch?: (q: string) => void }) {
const [q, setQ] = useState('');
return (
<div className="max-w-3xl mx-auto mt-6">
<form
onSubmit={(e) => {
e.preventDefault();
onSearch?.(q);
}}
className="flex gap-2"
>
<input
value={q}
onChange={(e) => setQ(e.target.value)}
placeholder="Search for location, property, or keyword"
className="flex-1 px-4 py-2 rounded-lg border focus:outline-none"
/>
<button className="px-4 py-2 bg-red-500 text-white rounded-lg">Search</button>
</form>
</div>
);
}
