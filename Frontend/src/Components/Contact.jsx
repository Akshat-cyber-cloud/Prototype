import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const payload = {
            ...formData,
            access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
            subject: `New Contact Message from ${formData.name}`,
            from_name: "FOODZ Contact Form"
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
                console.log('Form Submitted Successfully:', result);
            } else {
                setSubmitStatus('error');
                console.error('Submission Failed:', result);
            }
        } catch (error) {
            setSubmitStatus('error');
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-page">
            {/* Hero Section */}
            <div className="contact-hero">
                <div className="container">
                    <h1>CONTACT US</h1>
                </div>
            </div>

            {/* Info Cards Section */}
            <div className="contact-info-section">
                {/* Address Card */}
                <div className="info-card">
                    <div className="icon">
                        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                    </div>
                    <h3>ADDRESS LINE</h3>
                    <p>Cannaught Place, New Delhi,<br />Delhi 110001, India</p>
                </div>

                {/* Phone Card (Featured/Green) */}
                <div className="info-card featured">
                    <div className="icon">
                        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                    </div>
                    <h3>PHONE NUMBER</h3>
                    <p>+91 11 2345 6789<br />+91 98765 43210</p>
                </div>

                {/* Mail Card */}
                <div className="info-card">
                    <div className="icon">
                        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </div>
                    <h3>MAIL ADDRESS</h3>
                    <p>contact@foodz.in<br />support@foodz.in</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="contact-main">
                {/* Left Column: Get In Touch */}
                <div className="get-in-touch">
                    <h2 className="section-title">GET IN TOUCH</h2>
                    <p className="section-desc">
                        Looking for the best flavors in Delhi? Visit us or drop a message!
                    </p>
                    <div className="map-container">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.8392319277!2d77.0688975472!3d28.5272803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b34766245%3A0x315409ecca56a5d!2sDelhi!5e0!3m2!1sen!2sin!4v1711832000000!5m2!1sen!2sin" 
                            allowFullScreen="" 
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

                {/* Right Column: Fill Up The Form */}
                <div className="contact-form-section">
                    <h2 className="section-title">FILL UP THE FORM</h2>
                    <p className="section-desc">
                        Your email address will not be published. Required fields are marked *
                    </p>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        {submitStatus === 'success' && (
                            <div className="status-msg success" style={{
                                background: '#d4edda', color: '#155724', padding: '15px', 
                                borderRadius: '8px', fontWeight: '600', marginBottom: '10px'
                            }}>
                                Message sent successfully! We'll get back to you soon.
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="status-msg error" style={{
                                background: '#f8d7da', color: '#721c24', padding: '15px', 
                                borderRadius: '8px', fontWeight: '600', marginBottom: '10px'
                            }}>
                                Oops! Something went wrong. Please try again.
                            </div>
                        )}
                        <div className="input-group">
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Your Name*" 
                                className="input-field"
                                value={formData.name}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email Address*" 
                                className="input-field"
                                value={formData.email}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <textarea 
                                name="message" 
                                placeholder="Enter Your Message Here" 
                                className="input-field"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? "SENDING..." : "GET IN TOUCH"}
                            {!isSubmitting && (
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
