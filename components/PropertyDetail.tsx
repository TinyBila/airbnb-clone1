import { ArrowLeft, Star, Users, Bath, Bed, Wifi, Car, Coffee, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { properties } from '../data/properties'; // adjust path/name if your data file is different

interface PropertyDetailProps {
  propertyId: string;
  onBack: () => void;
}

export function PropertyDetail({ propertyId, onBack }: PropertyDetailProps) {
  const property = properties?.find((p) => p.id === propertyId);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Property not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button onClick={onBack} className="px-3 py-1 rounded bg-gray-100">
            Back
          </button>
          <h1 className="text-xl font-semibold">{property.title}</h1>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid gap-4">
        <div className="w-full h-96 overflow-hidden rounded-lg">
          <ImageWithFallback
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {property.details?.livingRoomImage && (
            <ImageWithFallback
              src={property.details.livingRoomImage}
              alt="Living room"
              className="w-full h-60 object-cover rounded-lg"
            />
          )}
          {property.details?.bathroomImage && (
            <ImageWithFallback
              src={property.details.bathroomImage}
              alt="Bathroom"
              className="w-full h-60 object-cover rounded-lg"
            />
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold">Details</h2>
          <p className="text-sm text-gray-700 mt-2">{property.details?.description}</p>
          <ul className="mt-3 list-disc list-inside text-sm text-gray-600">
            <li>{property.details?.bedrooms ?? '—'} bedrooms</li>
            <li>{property.details?.bathrooms ?? '—'} bathrooms</li>
            <li>{property.guests ?? '—'} guests</li>
            <li>
              {property.details?.amenities?.length
                ? property.details.amenities.slice(0, 6).join(', ')
                : '—'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function getAmenityIcon(amenity: string) {
  const lowerAmenity = amenity.toLowerCase();
  
  if (lowerAmenity.includes('wifi') || lowerAmenity.includes('internet')) {
    return <Wifi className="w-5 h-5 text-gray-600" />;
  }
  if (lowerAmenity.includes('parking') || lowerAmenity.includes('garage')) {
    return <Car className="w-5 h-5 text-gray-600" />;
  }
  if (lowerAmenity.includes('kitchen') || lowerAmenity.includes('coffee')) {
    return <Coffee className="w-5 h-5 text-gray-600" />;
  }
  
  return <Check className="w-5 h-5 text-gray-600" />;
}
