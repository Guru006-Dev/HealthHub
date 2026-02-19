import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowLeft, Navigation } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TextToSpeech from '../components/TextToSpeech';

// Fix for Leaflet marker icons in React
import L from 'leaflet';

// Delete the default icon URL to force Leaflet to use the options below
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const FindHelpPage = () => {
    const navigate = useNavigate();
    const [position, setPosition] = useState(null); // [lat, lng]
    const [loading, setLoading] = useState(true);
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition([latitude, longitude]);
                    setLoading(false);
                    generateNearbyHospitals(latitude, longitude);
                },
                (err) => {
                    console.error("Error getting location:", err);
                    // Fallback to New York City if permission denied or error
                    const fallback = [40.7128, -74.0060];
                    setPosition(fallback);
                    setLoading(false);
                    generateNearbyHospitals(fallback[0], fallback[1]);
                }
            );
        } else {
            setLoading(false);
        }
    }, []);

    const generateNearbyHospitals = (lat, lng) => {
        // Simulate nearby hospitals by adding small random offsets
        const mockHospitals = [
            { id: 1, name: "City General Hospital", lat: lat + 0.01, lng: lng + 0.01, type: "Hospital" },
            { id: 2, name: "Community Medical Center", lat: lat - 0.005, lng: lng + 0.015, type: "Clinic" },
            { id: 3, name: "Emergency Care Unit", lat: lat + 0.008, lng: lng - 0.005, type: "Urgent Care" },
        ];
        setHospitals(mockHospitals);
    };

    return (
        <div className="container" style={{ paddingBottom: '3rem' }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    margin: '2rem 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--secondary-color)',
                    fontWeight: 'bold',
                    fontSize: '1rem'
                }}
            >
                <ArrowLeft size={20} /> Go Back
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                        <Navigation size={40} color="var(--primary-color)" /> Find Nearby Help
                    </h1>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                        <TextToSpeech text="This map shows hospitals and clinics near you. Click 'Call Now' if you need help." />
                    </div>
                    <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
                        Locating nearest hospitals and clinics...
                    </p>
                </header>

                <div className="glass-card" style={{ height: '500px', width: '100%', padding: '0.5rem', overflow: 'hidden' }}>
                    {loading ? (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                            <h2>Locating you...</h2>
                        </div>
                    ) : (
                        position && (
                            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {/* User Location */}
                                <Marker position={position}>
                                    <Popup>
                                        You are here
                                    </Popup>
                                </Marker>

                                {/* Hospitals */}
                                {hospitals.map(h => (
                                    <Marker key={h.id} position={[h.lat, h.lng]}>
                                        <Popup>
                                            <strong>{h.name}</strong><br />
                                            {h.type}
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        )
                    )}
                </div>

                {/* List View of Hospitals */}
                <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {hospitals.map(h => (
                        <motion.div
                            key={h.id}
                            whileHover={{ y: -5 }}
                            className="glass-card"
                            style={{ padding: '1.5rem' }}
                        >
                            <h3 style={{ margin: '0 0 0.5rem 0' }}>🏥 {h.name}</h3>
                            <p style={{ margin: 0, opacity: 0.7 }}>{h.type}</p>
                            <button style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: 'var(--secondary-color)', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>
                                Call Now
                            </button>
                        </motion.div>
                    ))}
                </div>

            </motion.div>
        </div>
    );
};

export default FindHelpPage;
