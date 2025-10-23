'use client'
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-hot-toast';

export default function TestAddress() {
    const { user, isLoaded } = useUser();
    const [testAddress, setTestAddress] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        street: '123 Main St',
        city: 'Dhaka',
        state: 'Dhaka Division',
        zip: '1200',
        country: 'Bangladesh',
        phone: '01712345678'
    });
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);

    const testSaveAddress = async () => {
        setLoading(true);
        try {
            console.log('Sending address data:', testAddress);
            const response = await fetch('/api/address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testAddress)
            });

            const data = await response.json();
            console.log('Response:', data);

            if (!response.ok) {
                throw new Error(data.error || 'Failed to save');
            }

            toast.success('Address saved successfully!');
            fetchAddresses();
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchAddresses = async () => {
        try {
            const response = await fetch('/api/address');
            const data = await response.json();
            console.log('Fetched addresses:', data);
            
            if (response.ok) {
                setAddresses(data.addresses);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    if (!isLoaded) return <div className="p-10">Loading...</div>;
    if (!user) return <div className="p-10">Please login first</div>;

    return (
        <div className="min-h-screen p-10">
            <h1 className="text-3xl font-bold mb-6">Address Test Page</h1>
            
            <div className="mb-6 p-4 bg-blue-50 rounded">
                <p><strong>User ID:</strong> {user.id}</p>
                <p><strong>Email:</strong> {user.emailAddresses[0]?.emailAddress}</p>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Test Address Form</h2>
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(testAddress).map(([key, value]) => (
                        <div key={key}>
                            <label className="block text-sm font-medium mb-1">{key}</label>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => setTestAddress({...testAddress, [key]: e.target.value})}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    ))}
                </div>
                <button
                    onClick={testSaveAddress}
                    disabled={loading}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? 'Saving...' : 'Test Save Address'}
                </button>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Saved Addresses</h2>
                <button
                    onClick={fetchAddresses}
                    className="mb-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                    Refresh Addresses
                </button>
                <div className="space-y-4">
                    {addresses.map((addr, idx) => (
                        <div key={idx} className="p-4 border rounded bg-gray-50">
                            <p><strong>Name:</strong> {addr.name}</p>
                            <p><strong>Address:</strong> {addr.street}, {addr.city}, {addr.state} {addr.zip}</p>
                            <p><strong>Phone:</strong> {addr.phone}</p>
                        </div>
                    ))}
                    {addresses.length === 0 && (
                        <p className="text-gray-500">No addresses found</p>
                    )}
                </div>
            </div>
        </div>
    );
}
