import Link from 'next/link';


export default function Header() {
return (
<header className="sticky top-0 bg-white shadow-sm z-20">
<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
<Link href="/" className="text-xl font-semibold">Airbnb Clone</Link>
<nav className="flex gap-4 items-center">
<a className="hidden md:inline">Become a host</a>
<button className="px-3 py-1 border rounded-full">Sign in</button>
</nav>
</div>
</header>
);
}
