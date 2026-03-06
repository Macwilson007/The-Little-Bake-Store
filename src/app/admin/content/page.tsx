'use client';

import React, { useState, useEffect } from 'react';
import '../admin.css';

export default function ContentManagementPage() {
    const [settings, setSettings] = useState<any>(null);
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const res = await fetch('/api/content');
            const data = await res.json();
            setSettings(data.settings);
            setTestimonials(data.testimonials);
        } catch (error) {
            console.error('Failed to fetch content');
        } finally {
            setLoading(false);
        }
    };

    const handleSettingsUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await fetch('/api/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'settings', data: settings })
            });
            alert('Settings updated successfully!');
        } catch (error) {
            alert('Failed to update settings');
        } finally {
            setSaving(false);
        }
    };

    const handleAddTestimonial = async () => {
        const author = prompt('Author Name:');
        const content = prompt('Content:');
        if (!author || !content) return;

        try {
            await fetch('/api/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'testimonial',
                    data: { author, content, role: 'Customer', rating: 5, avatar: '👤' }
                })
            });
            fetchContent();
        } catch (error) {
            alert('Failed to add testimonial');
        }
    };

    const handleDeleteTestimonial = async (id: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;
        try {
            await fetch(`/api/content?type=testimonial&id=${id}`, { method: 'DELETE' });
            fetchContent();
        } catch (error) {
            alert('Failed to delete testimonial');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Content Management</h1>
                <span>Manage global store information & testimonials</span>
            </div>

            <div className="admin-grid-2">
                {/* Global Settings */}
                <div className="admin-card">
                    <h3>Hero & Store Details</h3>
                    <form onSubmit={handleSettingsUpdate} style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '4px' }}>Hero Title</label>
                            <input
                                type="text"
                                value={settings?.heroTitle || ''}
                                onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '4px' }}>Hero Subtitle</label>
                            <textarea
                                value={settings?.heroSubtitle || ''}
                                onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd', minHeight: '80px' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '4px' }}>Hero Image URL</label>
                            <input
                                type="text"
                                value={settings?.heroImage || ''}
                                onChange={(e) => setSettings({ ...settings, heroImage: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '4px' }}>Contact Email</label>
                                <input
                                    type="email"
                                    value={settings?.contactEmail || ''}
                                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '4px' }}>Contact Phone</label>
                                <input
                                    type="text"
                                    value={settings?.contactPhone || ''}
                                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '4px' }}>Instagram URL</label>
                            <input
                                type="text"
                                value={settings?.instagramUrl || ''}
                                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={saving}
                            className="btn btn-primary"
                            style={{ padding: '1rem', background: '#3A1F1D', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            {saving ? 'Saving...' : 'Save All Changes'}
                        </button>
                    </form>
                </div>

                {/* Testimonials */}
                <div className="admin-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0 }}>Testimonials</h3>
                        <button onClick={handleAddTestimonial} className="btn btn-sm" style={{ padding: '0.5rem 1rem', background: '#D6A36D', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            + Add New
                        </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '500px', overflowY: 'auto' }}>
                        {testimonials.map((t) => (
                            <div key={t.id} style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '8px', position: 'relative' }}>
                                <div style={{ fontWeight: 'bold' }}>{t.author}</div>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>{t.role}</div>
                                <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#444', fontStyle: 'italic' }}>"{t.content}"</div>
                                <button
                                    onClick={() => handleDeleteTestimonial(t.id)}
                                    style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer' }}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
