import { useEffect, useState } from 'react';

export default function Filters({ onChange }: { onChange?: (f: any) => void }) {
  const [beds, setBeds] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    onChange?.({
      beds: beds ? Number(beds) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  }, [beds, maxPrice, onChange]);

  return (
    <div className="max-w-3xl mx-auto mt-4 px-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
          type="number"
          min="0"
          placeholder="Min beds"
          className="px-3 py-2 border border-gray-300 rounded-lg w-full sm:w-24 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          type="number"
          min="0"
          placeholder="Max price ($)"
          className="px-3 py-2 border border-gray-300 rounded-lg w-full sm:w-36 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
    </div>
  );
}

