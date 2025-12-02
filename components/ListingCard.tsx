import Image from 'next/image';


export default function ListingCard({ listing, onClick }: any) {
  // Safely get bedrooms from details or default to 0
  const beds = listing.details?.bedrooms ?? 0;

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer" onClick={onClick}>
      <div className="relative h-48 w-full overflow-hidden bg-gray-200">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/400x300?text=Image+Not+Found';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate">{listing.title}</h3>
        <p className="text-sm text-gray-500 truncate">{listing.location}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            {beds} {beds === 1 ? 'bed' : 'beds'} • {listing.rating} ★
          </div>
          <div className="font-semibold text-gray-900">${listing.price}/night</div>
        </div>
      </div>
    </article>
  );
}
