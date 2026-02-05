import React, { useState, useEffect, Component } from 'react';
import { motion } from 'framer-motion';

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

    return (
        <div style={{ paddingTop: '100px', paddingBottom: '50px', maxWidth: '800px', margin: '0 auto' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card"
                style={{ padding: '2rem' }}
            >
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-color)' }}>My Safety Profile</h1>

                {/* FORM START */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div className="form-group">
                        {/* Using our STATELESS Component */}
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
                        <FormLabel>My Sensory Triggers (Things that scare me):</FormLabel>
                        <textarea
                            name="triggers"
                            value={formData.triggers}
                            onChange={handleChange}
                            placeholder="e.g. Loud noises, bright lights, touching..."
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
                            placeholder="e.g. Quiet voice, counting, deep breaths..."
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
                <PrivacyNotice message="This data is saved ONLY on your device for your safety. We do not send it anywhere." />

            </motion.div>
        </div>
    );
};

export default MedicalProfilePage;
