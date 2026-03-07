'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import './BakeBot.css';

interface Message {
    id: string;
    role: 'bot' | 'user';
    content: string;
    timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: '1',
        role: 'bot',
        content: 'Hello 👋\nWelcome to The Little Bake Store!\nHow can I help you today?',
        timestamp: new Date(),
    },
];

const QUICK_REPLIES = [
    '🎂 Recommend a cake',
    '🚚 Delivery info',
    '📦 Track my order',
    '🎉 Event packages',
];

const BOT_RESPONSES: Record<string, string> = {
    'recommend': "I'd love to help! 🎂 Based on what's trending:\n\n⭐ **Classic Chocolate Birthday Cake** - Our bestseller with Belgian chocolate ganache\n⭐ **Red Velvet Layer Cake** - Perfect for special occasions\n⭐ **Mini Cakes Set (4)** - Great for gifting!\n\nWould you like to know more about any of these?",
    'delivery': "🚚 **Delivery Information:**\n\n• Same-day delivery in Abuja (order before 2pm)\n• Delivery fee: ₦2,000 within Abuja\n• Free delivery on orders above ₦50,000\n• Delivery hours: 9am - 7pm\n\nWe deliver to all areas in Abuja including Wuse, Garki, Maitama, Asokoro, and Gwarinpa!",
    'track': "📦 To track your order, please provide your order number (e.g., TLBS-12345).\n\nYou can also check your order status in your account dashboard under 'My Orders'.",
    'event': "🎉 **Our Event Packages:**\n\n🎁 **Party Dessert Box** - ₦35,000 (Save 17%!)\nIncludes: 6 cupcakes, 6 brownies, 4 dessert cups, 6 cake pops\n\n🏢 **Corporate Dessert Platter** - ₦55,000\nElegant assortment for 25-30 guests\n\nWe also do custom packages! Tell me about your event and I'll help create the perfect selection.",
    'price': "💰 Our price ranges:\n\n• Cupcakes: From ₦10,000/dozen\n• Cakes: From ₦20,000\n• Pastries: From ₦5,000\n• Dessert Cups: From ₦9,000\n• Event Packages: From ₦35,000\n\nWould you like details on any specific item?",
    'vegan': "🌱 We offer several dietary-friendly options:\n\n• **Vegan Chocolate Cake** - ₦22,000\n• **Gluten-Free Carrot Cake** - ₦20,000\n• **Sugar-Free Almond Biscotti** - ₦7,000\n\nAll made with premium ingredients!",
    'default': "Thanks for your message! 😊 I can help you with:\n\n🎂 Product recommendations\n🚚 Delivery information\n📦 Order tracking\n🎉 Event planning\n💰 Pricing\n🌱 Dietary options\n\nWhat would you like to know more about?",
};

function getBotResponse(message: string): string {
    const lower = message.toLowerCase();
    if (lower.includes('recommend') || lower.includes('cake') || lower.includes('suggest') || lower.includes('best')) {
        return BOT_RESPONSES['recommend'] || BOT_RESPONSES['default'];
    }
    if (lower.includes('delivery') || lower.includes('deliver') || lower.includes('shipping')) {
        return BOT_RESPONSES['delivery'] || BOT_RESPONSES['default'];
    }
    if (lower.includes('track') || lower.includes('order') || lower.includes('status')) {
        return BOT_RESPONSES['track'] || BOT_RESPONSES['default'];
    }
    if (lower.includes('event') || lower.includes('party') || lower.includes('corporate') || lower.includes('package')) {
        return BOT_RESPONSES['event'] || BOT_RESPONSES['default'];
    }
    if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
        return BOT_RESPONSES['price'] || BOT_RESPONSES['default'];
    }
    if (lower.includes('vegan') || lower.includes('gluten') || lower.includes('sugar free') || lower.includes('diet')) {
        return BOT_RESPONSES['vegan'] || BOT_RESPONSES['default'];
    }
    return BOT_RESPONSES['default'] || '';
}

export default function BakeBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const recognitionRef = useRef<any>(null);

    const sendMessage = useCallback((text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'bot',
                content: getBotResponse(text),
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    }, []);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = false;
                recognitionRef.current.interimResults = false;
                recognitionRef.current.lang = 'en-US';

                recognitionRef.current.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    if (transcript.trim()) {
                        setInput(transcript);
                        sendMessage(transcript);
                    }
                    setIsListening(false);
                    if (inputRef.current) {
                        inputRef.current.placeholder = "Type your message...";
                    }
                };

                recognitionRef.current.onend = () => {
                    setIsListening(false);
                    if (inputRef.current) {
                        inputRef.current.placeholder = "Type your message...";
                    }
                };
            }
        }
    }, [sendMessage]);

    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert("Speech recognition isn't supported in this browser.");
            return;
        }
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            try {
                recognitionRef.current.start();
                setIsListening(true);
                if (inputRef.current) {
                    inputRef.current.placeholder = "Listening... Speak now";
                }
            } catch (err) {
                console.error("Failed to start recognition", err);
                setIsListening(false);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    const handleQuickReply = (reply: string) => {
        sendMessage(reply);
    };

    return (
        <div className="bakebot" id="bakebot">
            {/* Chat Window */}
            <div className={`bakebot-window ${isOpen ? 'open' : ''}`}>
                <div className="bakebot-header">
                    <div className="bakebot-header-info">
                        <div className="bakebot-avatar" style={{ position: 'relative' }}>
                            <Image src="/images/receptionist.png" alt="Avatar" fill style={{ objectFit: 'cover' }} />
                        </div>
                        <div>
                            <h4>BakeBot</h4>
                            <span className="bakebot-status">
                                <span className="status-dot"></span>
                                Online
                            </span>
                        </div>
                    </div>
                    <button className="bakebot-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="bakebot-messages">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`bakebot-message ${msg.role}`}>
                            {msg.role === 'bot' && (
                                <div className="bakebot-msg-avatar" style={{ position: 'relative' }}>
                                    <Image src="/images/receptionist.png" alt="Avatar" fill style={{ objectFit: 'cover' }} />
                                </div>
                            )}
                            <div className="bakebot-msg-bubble">
                                {msg.content.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line.replace(/\*\*(.*?)\*\*/g, '«$1»')}
                                        {i < msg.content.split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="bakebot-message bot">
                            <div className="bakebot-msg-avatar" style={{ position: 'relative' }}>
                                <Image src="/images/receptionist.png" alt="Avatar" fill style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="bakebot-msg-bubble bakebot-typing">
                                <span className="typing-dot"></span>
                                <span className="typing-dot"></span>
                                <span className="typing-dot"></span>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length <= 2 && (
                    <div className="bakebot-quick-replies">
                        {QUICK_REPLIES.map((reply) => (
                            <button
                                key={reply}
                                className="quick-reply-btn"
                                onClick={() => handleQuickReply(reply)}
                            >
                                {reply}
                            </button>
                        ))}
                    </div>
                )}

                <div className="bakebot-input-container">
                    <form className="bakebot-input" onSubmit={handleSubmit} style={{ flex: 1, borderTop: 0 }}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={isListening ? "Listening..." : "Type your message..."}
                            className="bakebot-input-field"
                            id="bakebot-input"
                        />
                        <button type="submit" className="bakebot-send hide-desktop" disabled={!input.trim()} aria-label="Send message">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        </button>
                    </form>
                    <button
                        type="button"
                        onClick={toggleListening}
                        className={`bakebot-mic ${isListening ? 'listening' : ''}`}
                        aria-label="Voice input"
                    >
                        {isListening ? (
                            <div className="mic-wave">
                                <span></span><span></span><span></span>
                            </div>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                <line x1="12" y1="19" x2="12" y2="23" />
                                <line x1="8" y1="23" x2="16" y2="23" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Floating Button */}
            <button
                className={`bakebot-fab ${isOpen ? 'hidden' : ''}`}
                onClick={() => setIsOpen(true)}
                aria-label="Open chat"
                id="bakebot-fab"
            >
                <div className="bakebot-fab-icon" style={{ position: 'relative' }}>
                    <Image src="/images/receptionist.png" alt="Avatar" fill style={{ objectFit: 'cover' }} />
                </div>
                <span className="bakebot-fab-pulse"></span>
            </button>
        </div>
    );
}
