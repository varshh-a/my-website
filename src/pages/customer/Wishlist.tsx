import React, { useEffect, useState } from 'react';

interface WishlistItem {
  id: string;
  title: string;
  price: number;
  image?: string;
}

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
  }, []);

  const removeFromWishlist = (id: string) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="space-y-4">
          {wishlist.map(item => (
            <li key={item.id} className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-4">
                {item.image && <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />}
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="text-sm text-red-500 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
