import Image from 'next/image';


export default function ListingCard({ listing, onClick }: any) {
return (
<article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
<div className="relative h-48 w-full">
<Image src={listing.image} alt={listing.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, 33vw" />
</div>
<div className="p-4">
<h3 className="font-semibold">{listing.title}</h3>
<p className="text-sm text-gray-500">{listing.location}</p>
<div className="mt-2 flex items-center justify-between">
<div className="text-sm">{listing.beds} beds • {listing.rating} ★</div>
<div className="font-semibold">${listing.price}/night</div>
</div>
</div>
</article>
);
}
