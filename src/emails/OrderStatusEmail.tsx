import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';

interface OrderEmailProps {
    orderNumber: string;
    customerName: string;
    status: string;
}

export const OrderStatusEmail = ({
    orderNumber,
    customerName,
    status
}: OrderEmailProps) => (
    <Html>
        <Head />
        <Preview>Your order {orderNumber} is now {status}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>The Little Bake Store</Heading>
                <Text style={text}>Hi {customerName},</Text>
                <Text style={text}>
                    We&apos;re writing to let you know that the status of your order <strong>#{orderNumber}</strong> has been updated to:
                </Text>
                <Section style={statusBox}>
                    <Text style={statusText}>{status.replace(/_/g, ' ')}</Text>
                </Section>
                <Text style={text}>
                    Thank you for choosing The Little Bake Store! We&apos;re hard at work making sure your treats are perfect.
                </Text>
                <Link href={`${process.env.APP_URL}/shop`} style={button}>
                    Visit our Store
                </Link>
                <Text style={footer}>
                    &copy; 2026 The Little Bake Store. All rights reserved.
                </Text>
            </Container>
        </Body>
    </Html>
);

const main = {
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    maxWidth: '580px',
};

const h1 = {
    color: '#3A1F1D',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    margin: '30px 0',
};

const text = {
    color: '#444',
    fontSize: '16px',
    lineHeight: '26px',
};

const statusBox = {
    background: '#f9f9f9',
    borderRadius: '8px',
    padding: '24px',
    textAlign: 'center' as const,
    margin: '24px 0',
    border: '1px solid #eee',
};

const statusText = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#3A1F1D',
    margin: '0',
    textTransform: 'uppercase' as const,
};

const button = {
    backgroundColor: '#3A1F1D',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '12px',
    marginTop: '25px',
};

const footer = {
    color: '#8898aa',
    fontSize: '12px',
    marginTop: '40px',
    textAlign: 'center' as const,
};

export default OrderStatusEmail;
