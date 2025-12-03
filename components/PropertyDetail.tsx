import { ArrowLeft, Star, Users, Bath, Bed, Wifi, Car, Coffee, Check } from 'lucide-react';
import { properties } from '../data/properties';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PropertyDetailProps {
  propertyId: string;
  onBack: () => void;
}

export function PropertyDetail({ propertyId, onBack }: PropertyDetailProps) {
  const property = properties.find((p) => p.id === propertyId);

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to results
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="md:row-span-2">
            <ImageWithFallback
              src={property.image}
              alt="Main property view"
              className="w-full h-full object-cover rounded-xl"
              style={{ minHeight: '400px' }}
            />
          </div>
          <div>
            <ImageWithFallback
              src={property.details.livingRoomImage}
              alt="Living room"
              className="w-full h-full object-cover rounded-xl"
              style={{ minHeight: '195px' }}
            />
          </div>
          <div>
            <ImageWithFallback
              src={property.details.bathroomImage}
              alt="Bathroom"
              className="w-full h-full object-cover rounded-xl"
              style={{ minHeight: '195px' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-gray-900 mb-2">{property.title}</h1>
                  <p className="text-gray-600">{property.location}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-gray-900 text-gray-900" />
                  <span className="text-gray-900">{property.rating}</span>
                  <span className="text-gray-500">({property.details.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">{property.guests} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">{property.details.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">{property.details.bathrooms} bathrooms</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h2 className="text-gray-900 mb-4">About this place</h2>
              <p className="text-gray-600 leading-relaxed">
                {property.details.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.details.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 flex items-center justify-center">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 bg-white border border-gray-200 rounded-xl shadow-lg p-6">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-gray-900">${property.price}</span>
                  <span className="text-gray-500">/ night</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="border border-gray-300 rounded-lg p-3">
                    <label className="block text-xs text-gray-600 mb-1">Check-in</label>
                    <input
                      type="date"
                      className="w-full border-none p-0 text-sm focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div className="border border-gray-300 rounded-lg p-3">
                    <label className="block text-xs text-gray-600 mb-1">Check-out</label>
                    <input
                      type="date"
                      className="w-full border-none p-0 text-sm focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>

                <div className="border border-gray-300 rounded-lg p-3 mb-4">
                  <label className="block text-xs text-gray-600 mb-1">Guests</label>
                  <select className="w-full border-none p-0 text-sm focus:outline-none focus:ring-0">
                    {Array.from({ length: property.guests }, (_, i) => i + 1).map(
                      (num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'guest' : 'guests'}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <button className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors mb-4">
                  Reserve
                </button>

                <p className="text-center text-gray-500 text-sm mb-4">
                  You won't be charged yet
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>${property.price} x 5 nights</span>
                    <span>${property.price * 5}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Cleaning fee</span>
                    <span>$50</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Service fee</span>
                    <span>$75</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span>${property.price * 5 + 125}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
