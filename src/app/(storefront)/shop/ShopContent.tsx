'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Category, Product, formatPrice, categories as staticCategories } from '@/data/products';
import './shop.css';

interface Subcategory {
    slug: string;
    name: string;
}

interface DbCategory {
    id: string;
    name: string;
    slug: string;
    image?: string | null;
    description?: string | null;
    subcategories: Subcategory[];
}

export default function ShopContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');
    const subcategoryParam = searchParams.get('subcategory');

    const [dbProducts, setDbProducts] = useState<Product[]>([]);
    const [dbCategories, setDbCategories] = useState<DbCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
    const [selectedCategory, setSelectedCategory] = useState(categoryParam || '');
    const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
    const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
    const [selectedDiet, setSelectedDiet] = useState<string[]>([]);
    const [availableOnly, setAvailableOnly] = useState(false);
    const [sortBy, setSortBy] = useState('popular');
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [pRes, cRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/categories')
                ]);

                if (!pRes.ok) throw new Error(`Products API failed: ${pRes.statusText}`);
                if (!cRes.ok) throw new Error(`Categories API failed: ${cRes.statusText}`);

                const pData = await pRes.json();
                const cData = await cRes.json();

                if (Array.isArray(pData)) {
                    setDbProducts(pData);
                } else {
                    console.error('Products data is not an array:', pData);
                }

                if (Array.isArray(cData)) {
                    setDbCategories(cData);
                } else {
                    console.error('Categories data is not an array:', cData);
                }
            } catch (err) {
                console.error('Error loading shop data:', err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const flavors = ['chocolate', 'vanilla', 'red velvet', 'carrot', 'butter', 'almond', 'assorted'];
    const occasions = ['birthday', 'wedding', 'anniversary', 'corporate-event', 'valentine', 'baby-shower'];
    const dietTypes = ['vegan', 'gluten-free', 'sugar-free'];

    const filteredProducts = useMemo(() => {
        if (!Array.isArray(dbProducts)) return [];
        let result = [...dbProducts];

        // Category filter
        if (selectedCategory || categoryParam) {
            const cat = selectedCategory || categoryParam;
            result = result.filter((p) => {
                const pCatSlug = p.category?.slug || p.category;
                return pCatSlug === cat;
            });
        }

        // Subcategory filter
        if (subcategoryParam) {
            result = result.filter((p) => p.subcategory === subcategoryParam);
        }

        // Price filter
        result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Flavor filter
        if (selectedFlavors.length > 0) {
            result = result.filter((p) => p.flavor && selectedFlavors.includes(p.flavor.toLowerCase()));
        }

        // Occasion filter
        if (selectedOccasions.length > 0) {
            result = result.filter((p) => {
                const pOccasions = p.occasions || [];
                return pOccasions.some((o: string) => selectedOccasions.includes(o.toLowerCase()));
            });
        }

        // Diet filter
        if (selectedDiet.length > 0) {
            result = result.filter((p) => {
                const pDietTypes = p.dietTypes || [];
                return pDietTypes.some((d: string) => selectedDiet.includes(d.toLowerCase()));
            });
        }

        // Availability
        if (availableOnly) {
            result = result.filter((p) => p.inStock);
        }

        // Sort
        switch (sortBy) {
            case 'price-low': result.sort((a, b) => a.price - b.price); break;
            case 'price-high': result.sort((a, b) => b.price - a.price); break;
            case 'rating': result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
            case 'newest': result.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0)); break;
            default: result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        }

        return result;
    }, [dbProducts, selectedCategory, categoryParam, subcategoryParam, priceRange, selectedFlavors, selectedOccasions, selectedDiet, availableOnly, sortBy]);

    const toggleFilter = (value: string, arr: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        setter(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
    };

    const clearFilters = () => {
        setSelectedCategory('');
        setSelectedFlavors([]);
        setSelectedOccasions([]);
        setSelectedDiet([]);
        setPriceRange([0, 100000]);
        setAvailableOnly(false);
    };

    const activeCategory = selectedCategory || categoryParam;
    const activeCategoryData = dbCategories.find((c) => c.slug === activeCategory) || staticCategories.find(c => c.slug === activeCategory);
    const activeSubcategoryData = activeCategoryData?.subcategories?.find((s: Subcategory) => s.slug === subcategoryParam);

    if (loading) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading Shop...</div>;

    return (
        <div className="shop-page">
            {/* Breadcrumb */}
            <div className="breadcrumb-bar">
                <div className="container">
                    <nav className="breadcrumb" id="breadcrumb">
                        <Link href="/">Home</Link>
                        <span className="breadcrumb-sep">/</span>
                        <Link href="/shop">Shop</Link>
                        {activeCategoryData && (
                            <>
                                <span className="breadcrumb-sep">/</span>
                                <Link href={`/shop?category=${activeCategoryData.slug}`}>
                                    {activeCategoryData.name}
                                </Link>
                            </>
                        )}
                        {activeSubcategoryData && (
                            <>
                                <span className="breadcrumb-sep">/</span>
                                <span className="breadcrumb-current">{activeSubcategoryData.name}</span>
                            </>
                        )}
                    </nav>
                </div>
            </div>

            <div className="container">
                <div className="shop-header">
                    <div>
                        <h1>{activeSubcategoryData?.name || activeCategoryData?.name || 'All Products'}</h1>
                        <p className="shop-count">{filteredProducts.length} products found</p>
                    </div>

                    <div className="shop-controls">
                        <button
                            className="filter-toggle-btn btn btn-secondary btn-sm"
                            onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
                                <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
                                <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" />
                                <line x1="17" y1="16" x2="23" y2="16" />
                            </svg>
                            Filters
                        </button>

                        <select
                            className="shop-sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            id="sort-select"
                        >
                            <option value="popular">Most Popular</option>
                            <option value="newest">Newest</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>
                </div>

                <div className="shop-layout">
                    {/* Sidebar Filters */}
                    <aside className={`shop-sidebar ${filterDrawerOpen ? 'open' : ''}`} id="shop-sidebar">
                        <div className="sidebar-header">
                            <h3>Filters</h3>
                            <button className="sidebar-close" onClick={() => setFilterDrawerOpen(false)}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Category */}
                        <div className="filter-group">
                            <h4 className="filter-title">Category</h4>
                            <div className="filter-options">
                                <label className="filter-option">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={!activeCategory}
                                        onChange={() => setSelectedCategory('')}
                                    />
                                    <span>All Categories</span>
                                </label>
                                {staticCategories.map((cat) => (
                                    <label key={cat.slug} className="filter-option">
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={activeCategory === cat.slug}
                                            onChange={() => setSelectedCategory(cat.slug)}
                                        />
                                        <span>{cat.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="filter-group">
                            <h4 className="filter-title">Price Range</h4>
                            <div className="price-range">
                                <input
                                    type="range"
                                    min="0"
                                    max="100000"
                                    step="1000"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                    className="price-slider"
                                />
                                <div className="price-labels">
                                    <span>₦0</span>
                                    <span>₦{priceRange[1].toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Flavor */}
                        <div className="filter-group">
                            <h4 className="filter-title">Flavor</h4>
                            <div className="filter-options">
                                {flavors.map((f) => (
                                    <label key={f} className="filter-option checkbox">
                                        <input
                                            type="checkbox"
                                            checked={selectedFlavors.includes(f)}
                                            onChange={() => toggleFilter(f, selectedFlavors, setSelectedFlavors)}
                                        />
                                        <span className="checkbox-custom"></span>
                                        <span>{f.charAt(0).toUpperCase() + f.slice(1)}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Occasion */}
                        <div className="filter-group">
                            <h4 className="filter-title">Occasion</h4>
                            <div className="filter-options">
                                {occasions.map((o) => (
                                    <label key={o} className="filter-option checkbox">
                                        <input
                                            type="checkbox"
                                            checked={selectedOccasions.includes(o)}
                                            onChange={() => toggleFilter(o, selectedOccasions, setSelectedOccasions)}
                                        />
                                        <span className="checkbox-custom"></span>
                                        <span>{o.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Diet Type */}
                        <div className="filter-group">
                            <h4 className="filter-title">Diet Type</h4>
                            <div className="filter-options">
                                {dietTypes.map((d) => (
                                    <label key={d} className="filter-option checkbox">
                                        <input
                                            type="checkbox"
                                            checked={selectedDiet.includes(d)}
                                            onChange={() => toggleFilter(d, selectedDiet, setSelectedDiet)}
                                        />
                                        <span className="checkbox-custom"></span>
                                        <span>{d.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Availability */}
                        <div className="filter-group">
                            <h4 className="filter-title">Availability</h4>
                            <label className="filter-option checkbox">
                                <input
                                    type="checkbox"
                                    checked={availableOnly}
                                    onChange={(e) => setAvailableOnly(e.target.checked)}
                                />
                                <span className="checkbox-custom"></span>
                                <span>In Stock Only</span>
                            </label>
                        </div>

                        <button className="btn btn-secondary clear-filters-btn" onClick={clearFilters}>
                            Clear All Filters
                        </button>
                    </aside>

                    {filterDrawerOpen && (
                        <div className="filter-overlay" onClick={() => setFilterDrawerOpen(false)} />
                    )}

                    {/* Product Grid */}
                    <div className="shop-grid">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-4 product-grid">
                                {filteredProducts.map((product: Product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="shop-empty">
                                <span className="shop-empty-icon">🔍</span>
                                <h3>No products found</h3>
                                <p>Try adjusting your filters to find what you&apos;re looking for</p>
                                <button className="btn btn-primary" onClick={clearFilters}>
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
