'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/data/products';
import './products.css';

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProducts(products.filter(p => p.id !== id));
            } else {
                alert('Failed to delete product');
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    return (
        <div className="admin-products-page">
            <div className="products-header">
                <h1>Product Management</h1>
                <Link href="/admin/products/add" className="btn btn-primary">
                    + Add New Product
                </Link>
            </div>

            <div className="product-list-card">
                {loading ? (
                    <div className="loading-state">Loading products...</div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <div className="product-thumbnail">
                                            {product.image ? (
                                                <Image src={product.image} alt={product.name} width={48} height={48} />
                                            ) : (
                                                <div className="placeholder">🧁</div>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <strong>{product.name}</strong>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{product.slug}</div>
                                    </td>
                                    <td>{product.category?.name || 'Uncategorized'}</td>
                                    <td>{formatPrice(product.price)}</td>
                                    <td>
                                        <span className={`status-badge ${product.inStock ? 'delivered' : 'preparing'}`}>
                                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-btns">
                                            <Link href={`/admin/products/edit/${product.id}`} className="btn-edit" title="Edit">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                </svg>
                                            </Link>
                                            <button onClick={() => handleDelete(product.id)} className="btn-delete" title="Delete">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="3 6 5 6 21 6" />
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                    <line x1="10" y1="11" x2="10" y2="17" />
                                                    <line x1="14" y1="11" x2="14" y2="17" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
