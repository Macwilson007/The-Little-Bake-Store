'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/ImageUpload';
import '@/app/admin/products/products.css';

export default function AddProductPage() {
    const router = useRouter();
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        shortDescription: '',
        price: '',
        originalPrice: '',
        categoryId: '',
        image: '',
        badge: '',
        inStock: true,
        flavor: '',
        ingredients: '',
    });

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as any;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        });
    };

    const handleImageChange = (url: string) => {
        setFormData({ ...formData, image: url });
    };

    const generateSlug = () => {
        setFormData({
            ...formData,
            slug: formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const dataToSubmit = {
                ...formData,
                ingredients: formData.ingredients.split(',').map(i => i.trim()).filter(i => i),
                price: parseFloat(formData.price),
                originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
            };

            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSubmit),
            });

            if (res.ok) {
                router.push('/admin/products');
                router.refresh();
            } else {
                alert('Failed to add product');
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-form-page">
            <div className="products-header">
                <h1>Add New Product</h1>
                <Link href="/admin/products" className="btn btn-secondary">Cancel</Link>
            </div>

            <div className="admin-card product-form-container">
                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-grid">
                        <div className="form-group full-width">
                            <label className="form-label">Product Name</label>
                            <input
                                className="form-input"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={generateSlug}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Slug</label>
                            <input
                                className="form-input"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <select
                                className="form-input"
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Price (₦)</label>
                            <input
                                className="form-input"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Original Price (₦, Optional)</label>
                            <input
                                className="form-input"
                                name="originalPrice"
                                type="number"
                                value={formData.originalPrice}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label className="form-label">Product Image</label>
                            <ImageUpload
                                value={formData.image}
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label className="form-label">Short Description</label>
                            <input
                                className="form-input"
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group full-width">
                            <label className="form-label">Full Description</label>
                            <textarea
                                className="form-input"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Flavor</label>
                            <input
                                className="form-input"
                                name="flavor"
                                value={formData.flavor}
                                onChange={handleChange}
                                placeholder="e.g. Vanilla"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Badge</label>
                            <select
                                className="form-input"
                                name="badge"
                                value={formData.badge}
                                onChange={handleChange}
                            >
                                <option value="">None</option>
                                <option value="new">New</option>
                                <option value="bestseller">Bestseller</option>
                                <option value="popular">Popular</option>
                                <option value="sale">Sale</option>
                            </select>
                        </div>

                        <div className="form-group full-width">
                            <label className="form-label">Ingredients (Comma separated)</label>
                            <input
                                className="form-input"
                                name="ingredients"
                                value={formData.ingredients}
                                onChange={handleChange}
                                placeholder="Flour, Sugar, Butter..."
                            />
                        </div>

                        <div className="form-group in-stock-group">
                            <input
                                type="checkbox"
                                name="inStock"
                                checked={formData.inStock}
                                onChange={handleChange}
                                id="inStock"
                            />
                            <label htmlFor="inStock">In Stock</label>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
