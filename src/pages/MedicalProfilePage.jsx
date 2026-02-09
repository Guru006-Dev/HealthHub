import React, { useState, useEffect, Component } from 'react';
import { motion } from 'framer-motion';
import TextToSpeech from '../components/TextToSpeech';

/* 
   -----------------------------------------------------------------------
   EXAM REQUIREMENT: STATELESS COMPONENT
   A simple functional component that just receives props and returns UI.
   No internal state.
   -----------------------------------------------------------------------
*/
const FormLabel = ({ children }) => (
    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>
        {children}
    </label>
);

/* 
   -----------------------------------------------------------------------
   EXAM REQUIREMENT: CLASS COMPONENT
   A traditional React component using 'class' and 'render()'.
   Used here to display a static privacy notice.
   -----------------------------------------------------------------------
*/
class PrivacyNotice extends Component {
    render() {
        return (
            <div style={{
                marginTop: '2rem',
                padding: '1rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '0.5rem',
                borderLeft: '4px solid goldenrod',
                fontSize: '0.9rem'
            }}>
                <strong>🔒 Secure & Private:</strong> {this.props.message}
            </div>
        );
    }
}

/* 
   -----------------------------------------------------------------------
   MAIN COMPONENT (Functional + State Management + Forms + Events)
   -----------------------------------------------------------------------
*/
const MedicalProfilePage = () => {
    // STATE MANAGEMENT (useState Hook)
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        triggers: '',
        calming: ''
    });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const data = localStorage.getItem('healthHubProfile');
        if (data) {
            setFormData(JSON.parse(data));
        }
    }, []);

    // EVENT: onChange
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // EVENT: onSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('healthHubProfile', JSON.stringify(formData));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="container" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}
                className="profile-layout" // Will use media query in styles if needed, or just inline logic
            >
                {/* LEFT COLUMN: FORM */}
                <div className="glass-card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--text-color)' }}>My Safety Profile</h1>
                        <TextToSpeech text="This is your Safety Profile. Fill in your name, emergency contact, triggers, and calming methods so we can help you better!" />
                    </div>

                    {/* FORM START */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        <div className="form-group">
                            <FormLabel>My Name:</FormLabel>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your full name"
                                required
                                style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'inherit', fontSize: '1rem' }}
                            />
                        </div>

                        <div className="form-group">
                            <FormLabel>Emergency Contact Number:</FormLabel>
                            <input
                                type="tel"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                placeholder="Parent/Guardian Phone"
                                required
                                style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'inherit', fontSize: '1rem' }}
                            />
                        </div>

                        <div className="form-group">
                            <FormLabel>My Sensory Triggers:</FormLabel>
                            <textarea
                                name="triggers"
                                value={formData.triggers}
                                onChange={handleChange}
                                placeholder="e.g. Loud noises, bright lights..."
                                rows="3"
                                style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'inherit', fontSize: '1rem' }}
                            />
                        </div>

                        <div className="form-group">
                            <FormLabel>How to Calm Me Down:</FormLabel>
                            <textarea
                                name="calming"
                                value={formData.calming}
                                onChange={handleChange}
                                placeholder="e.g. Quiet voice, counting..."
                                rows="3"
                                style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'inherit', fontSize: '1rem' }}
                            />
                        </div>

                        <button
                            type="submit"
                            style={{
                                padding: '1rem 2rem',
                                fontSize: '1.2rem',
                                background: saved ? '#22c55e' : 'var(--primary-color)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '2rem',
                                cursor: 'pointer',
                                marginTop: '1rem',
                                fontWeight: 'bold',
                                transition: 'all 0.3s'
                            }}
                        >
                            {saved ? 'Saved!' : 'Save Profile'}
                        </button>
                    </form>

                    {/* Using our CLASS Component */}
                    <PrivacyNotice message="This data is saved ONLY on your device." />
                </div>

                {/* RIGHT COLUMN: HERO ID CARD PREVIEW */}
                <div style={{ position: 'sticky', top: '100px' }}>
                    <div className="glass-card" style={{
                        padding: '0',
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                        border: '2px solid rgba(255,255,255,0.8)'
                    }}>
                        {/* ID Card Header */}
                        <div style={{
                            background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
                            padding: '1.5rem',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div>
                                <h2 style={{ margin: 0, fontSize: '1.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Safety Hero</h2>
                                <span style={{ opacity: 0.8, fontSize: '0.9rem', letterSpacing: '1px' }}>OFFICIAL ID CARD</span>
                            </div>
                            <div style={{ fontSize: '3rem' }}>🦸</div>
                        </div>

                        {/* ID Card Body */}
                        <div style={{ padding: '2rem', color: '#1e293b' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    background: '#e2e8f0',
                                    borderRadius: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '3rem',
                                    border: '3px solid white',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                }}>
                                    👤
                                </div>
                                <div>
                                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', color: '#0f172a' }}>
                                        {formData.name || "Your Name"}
                                    </h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                                        <span>📞</span>
                                        <strong>Emergency:</strong>
                                    </div>
                                    <div style={{ fontSize: '1.2rem', color: '#dc2626', fontWeight: 'bold' }}>
                                        {formData.contact || "--- --- ----"}
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <strong style={{ color: '#475569', textTransform: 'uppercase', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>⚠️ Triggers</strong>
                                <div style={{ background: '#fef2f2', padding: '1rem', borderRadius: '0.5rem', borderLeft: '4px solid #ef4444' }}>
                                    {formData.triggers || "None listed"}
                                </div>
                            </div>

                            <div>
                                <strong style={{ color: '#475569', textTransform: 'uppercase', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>😌 Calming Methods</strong>
                                <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '0.5rem', borderLeft: '4px solid #22c55e' }}>
                                    {formData.calming || "None listed"}
                                </div>
                            </div>
                        </div>

                        {/* ID Card Footer */}
                        <div style={{
                            background: '#f8fafc',
                            padding: '1rem',
                            textAlign: 'center',
                            borderTop: '1px solid #e2e8f0',
                            fontSize: '0.8rem',
                            color: '#94a3b8'
                        }}>
                            KEEP THIS CARD SAFE • HEALTHHUB CERTIFIED
                        </div>
                    </div>

                    <button
                        onClick={handlePrint}
                        style={{
                            width: '100%',
                            marginTop: '1rem',
                            padding: '1rem',
                            background: 'var(--text-color)',
                            color: 'var(--card-bg)',
                            border: 'none',
                            borderRadius: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        🖨️ Print ID Card
                    </button>
                </div>

            </motion.div>
        </div>
    );
};

export default MedicalProfilePage;
