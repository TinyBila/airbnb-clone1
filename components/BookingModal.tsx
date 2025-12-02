export default function BookingModal({ open, onClose }: any) {
if (!open) return null;
return (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center">
<div className="bg-white rounded-2xl p-6 max-w-md w-full">
<h2 className="text-xl font-semibold">Book this place</h2>
<p className="text-sm text-gray-600 mt-2">(Demo booking — implement payment/backend for real bookings)</p>
<div className="mt-4 flex justify-end gap-2">
<button onClick={onClose} className="px-4 py-2">Close</button>
<button className="px-4 py-2 bg-red-500 text-white rounded">Confirm</button>
</div>
</div>
</div>
);
}
