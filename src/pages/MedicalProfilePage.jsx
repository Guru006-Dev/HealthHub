import React, { useState, useEffect, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextToSpeech from '../components/TextToSpeech';
import { Camera, Save, Printer, User } from 'lucide-react';
import { ProfileCard } from '../components/ui/profile-card';

/* 
   -----------------------------------------------------------------------
   EXAM REQUIREMENT: STATELESS COMPONENT
   A simple functional component that just receives props and returns UI.
   No internal state.
   -----------------------------------------------------------------------
*/
const FormLabel = ({ children }) => (
    <label style={{
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '600',
        color: 'var(--text-color)',
        fontSize: '0.9rem',
        letterSpacing: '0.5px'
    }}>
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
                marginTop: '1.5rem',
                padding: '0.8rem',
                background: 'rgba(0,0,0,0.05)',
                borderRadius: '12px',
                fontSize: '0.8rem',
                color: 'var(--text-color)',
                textAlign: 'center',
                backdropFilter: 'blur(5px)',
                opacity: 0.8
            }}>
                <span role="img" aria-label="lock">🔒</span> <strong>Secure:</strong> {this.props.message}
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
        calming: '',
        image: null // New state for image
    });
    const [saved, setSaved] = useState(false);
    const [showIDParams, setShowIDParams] = useState(false); // Toggle for mobile preview

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

    // EVENT: Image Upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
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

    // Premium Styles Object
    const styles = {
        container: {
            minHeight: '100vh',
            padding: '100px 20px 40px',
            // background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', // Removed to match app theme
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start'
        },
        mobileCard: {
            width: '100%',
            maxWidth: '480px',
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '40px',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            position: 'relative'
        },
        header: {
            padding: '3rem 2rem 1rem',
            textAlign: 'center',
            color: 'var(--text-color)'
        },
        inputGlass: {
            width: '100%',
            padding: '1rem 1.2rem',
            borderRadius: '15px',
            border: '1px solid rgba(0,0,0,0.1)',
            background: 'rgba(255,255,255,0.6)',
            color: 'var(--text-color)',
            fontSize: '1rem',
            fontWeight: '500',
            outline: 'none',
            transition: 'all 0.3s ease',
            marginBottom: '1rem',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
        },
        sectionTitle: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            opacity: 0.9
        }
    };

    return (
        <div style={styles.container}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={styles.mobileCard}
            >
                {/* Decorative Top Light */}
                <div style={{
                    position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)',
                    width: '200px', height: '100px', background: 'rgba(255,255,255,0.4)', filter: 'blur(50px)'
                }} />

                <div style={styles.header}>
                    <TextToSpeech text="Tap the camera to add your photo. Fill in your details to create your Safety Hero Card." color="var(--text-color)" />

                    {/* Avatar / Image Upload */}
                    <div style={{ position: 'relative', width: '120px', height: '120px', margin: '1rem auto 2rem' }}>
                        <div style={{
                            width: '100%', height: '100%', borderRadius: '50%',
                            background: 'rgba(255,255,255,0.2)',
                            backgroundImage: formData.image ? `url(${formData.image})` : 'none',
                            backgroundSize: 'cover', backgroundPosition: 'center',
                            border: '3px solid rgba(255,255,255,0.5)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                        }}>
                            {!formData.image && <User size={40} color="var(--text-color)" />}
                        </div>
                        <label htmlFor="image-upload" style={{
                            position: 'absolute', bottom: '0', right: '0',
                            background: 'white', color: '#a18cd1',
                            width: '36px', height: '36px', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}>
                            <Camera size={20} />
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ padding: '0 2rem 3rem' }}>
                    {/* Name Input - Big & Bold */}
                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                            style={{
                                ...styles.inputGlass,
                                fontSize: '2rem',
                                fontWeight: '800',
                                textAlign: 'center',
                                background: 'transparent',
                                border: 'none',
                                borderBottom: '2px solid rgba(0,0,0,0.1)',
                                borderRadius: 0,
                                padding: '0.5rem',
                                color: 'var(--text-color)'
                            }}
                        />
                        <FormLabel>Safety Hero Name</FormLabel>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <FormLabel>Emergency Contact</FormLabel>
                            <input
                                type="tel"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                required
                                style={styles.inputGlass}
                            />
                        </div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.4)', padding: '1rem', borderRadius: '20px', marginBottom: '1rem' }}>
                        <FormLabel>⚠️ My Triggers</FormLabel>
                        <textarea
                            name="triggers"
                            value={formData.triggers}
                            onChange={handleChange}
                            placeholder="e.g. Loud noises, bright lights..."
                            rows="2"
                            style={{ ...styles.inputGlass, marginBottom: 0, background: 'rgba(255,255,255,0.5)' }}
                        />
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.4)', padding: '1rem', borderRadius: '20px', marginBottom: '2rem' }}>
                        <FormLabel>😌 How to Calm Me</FormLabel>
                        <textarea
                            name="calming"
                            value={formData.calming}
                            onChange={handleChange}
                            placeholder="e.g. Quiet voice, counting..."
                            rows="2"
                            style={{ ...styles.inputGlass, marginBottom: 0, background: 'rgba(255,255,255,0.5)' }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '1.2rem',
                            borderRadius: '20px',
                            background: 'white',
                            color: '#a18cd1',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            border: 'none',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        {saved ? <span style={{ color: '#4caf50' }}>Saved!</span> : <><Save size={20} /> Save Profile</>}
                    </button>

                    <PrivacyNotice message="Data stored on device." />
                </form>

                {/* New Profile Card Preview Section */}
                <div style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <h3 style={{
                        marginTop: 0,
                        marginBottom: '2rem',
                        fontSize: '0.9rem',
                        color: 'rgba(255,255,255,0.7)',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        background: 'rgba(0,0,0,0.2)',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '20px',
                        backdropFilter: 'blur(10px)'
                    }}>
                        Live Card Preview
                    </h3>
                    <ProfileCard
                        name={formData.name || "Your Name"}
                        image={formData.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"}
                        contact={formData.contact || "No Contact Info"}
                        triggers={formData.triggers || "No triggers listed"}
                        calming={formData.calming || "No calming methods listed"}
                        isSafetyCard={true}
                        isVerified={true}
                        onFollow={handlePrint}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default MedicalProfilePage;
