import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, BookOpen, GraduationCap, Github } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import TextToSpeech from '../components/TextToSpeech';
import userPhoto from '../assets/photo.jpg';

const AboutPage = () => {
    const navigate = useNavigate();
    return (
        <div className="container" style={{ paddingBottom: '3rem', paddingTop: '100px' }}>
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
                className="glass-card"
                style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.5rem', color: 'var(--text-color)', margin: 0 }}>About HealthHub</h1>
                    <TextToSpeech text="This is the About Page. Here you can find details about the team and the course." />
                </div>

                {/* Member Details */}
                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.8rem', borderBottom: '2px solid var(--primary-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User color="var(--primary-color)" /> Project Member
                    </h2>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '4px solid white',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}>
                            <img src={userPhoto} alt="Project Member" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>Guru</h3>
                            <p style={{ fontSize: '1.2rem', margin: 0, opacity: 0.8 }}>Roll No: CB.SC.U4CSE23720</p>
                        </div>
                    </div>
                </section>

                {/* Course Details */}
                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.8rem', borderBottom: '2px solid var(--primary-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <BookOpen color="var(--primary-color)" /> Course Details
                    </h2>
                    <div style={{ background: 'rgba(255,255,255,0.5)', padding: '1.5rem', borderRadius: '1rem' }}>
                        <p><strong>Course Code:</strong> 23CSE461</p>
                        <p><strong>Course Name:</strong> Full Stack Frameworks</p>
                    </div>
                </section>

                {/* Professor Details */}
                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.8rem', borderBottom: '2px solid var(--primary-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <GraduationCap color="var(--primary-color)" /> Course Teacher
                    </h2>
                    <div style={{ background: 'rgba(255,255,255,0.5)', padding: '1.5rem', borderRadius: '1rem' }}>
                        <h3 style={{ margin: '0 0 0.5rem 0' }}>Dr. T. Senthil Kumar</h3>
                        <p style={{ margin: '0' }}>Professor</p>
                        <p style={{ margin: '0' }}>Amrita School of Computing</p>
                        <p style={{ margin: '0' }}>Amrita Vishwa Vidyapeetham</p>
                        <p style={{ margin: '0' }}>Coimbatore - 641112</p>
                        <p style={{ margin: '1rem 0 0 0', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                            Email: t_senthilkumar@cb.amrita.edu
                        </p>
                    </div>
                </section>

                {/* GitHub Details */}
                <section>
                    <h2 style={{ fontSize: '1.8rem', borderBottom: '2px solid var(--primary-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Github color="var(--primary-color)" /> GitHub Details
                    </h2>
                    <div style={{ background: 'rgba(255,255,255,0.5)', padding: '1.5rem', borderRadius: '1rem' }}>
                        <p style={{ marginBottom: '1rem' }}>
                            <strong>Product Page:</strong> <a href="https://github.com/Guru006-Dev/HealthHub" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>Guru006-Dev/HealthHub</a>
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <strong>Collaborator - Academic</strong>

                            </div>
                            <div>
                                <strong>Collaborator - Industry</strong>

                            </div>
                        </div>
                    </div>
                </section>

            </motion.div>
        </div>
    );
};

export default AboutPage;
