import { useState } from 'react';
import { Search, SlidersHorizontal, Home, LogOut } from 'lucide-react';
import { PropertyCard } from './PropertyCard';
import { properties, Property } from '../data/properties';

interface HomePageProps {
  onPropertyClick: (propertyId: string) => void;
  onLogout: () => void;
}

export function HomePage({ onPropertyClick, onLogout }: HomePageProps) {
  const [searchLocation, setSearchLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minRating: '',
    guests: '',
  });

  const filteredProperties = properties.filter((property) => {
    const matchesLocation = searchLocation
      ? property.location.toLowerCase().includes(searchLocation.toLowerCase())
      : true;

    const matchesMinPrice = filters.minPrice
      ? property.price >= parseInt(filters.minPrice)
      : true;

    const matchesMaxPrice = filters.maxPrice
      ? property.price <= parseInt(filters.maxPrice)
      : true;

    const matchesRating = filters.minRating
      ? property.rating >= parseFloat(filters.minRating)
      : true;

    const matchesGuests = filters.guests
      ? property.guests >= parseInt(filters.guests)
      : true;

    return (
      matchesLocation &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesRating &&
      matchesGuests
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-500">
              <Home className="w-8 h-8" />
              <span className="text-rose-500">StayScape</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-rose-500 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Search by location..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Min Price ($)</label>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, minPrice: e.target.value })
                    }
                    placeholder="Min"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Max Price ($)</label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, maxPrice: e.target.value })
                    }
                    placeholder="Max"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Min Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    value={filters.minRating}
                    onChange={(e) =>
                      setFilters({ ...filters, minRating: e.target.value })
                    }
                    placeholder="4.0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Guests</label>
                  <input
                    type="number"
                    value={filters.guests}
                    onChange={(e) =>
                      setFilters({ ...filters, guests: e.target.value })
                    }
                    placeholder="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>
              <button
                onClick={() =>
                  setFilters({
                    minPrice: '',
                    maxPrice: '',
                    minRating: '',
                    guests: '',
                  })
                }
                className="mt-4 text-rose-500 hover:text-rose-600"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-gray-900">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'stay' : 'stays'} available
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => onPropertyClick(property.id)}
            />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No properties found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
