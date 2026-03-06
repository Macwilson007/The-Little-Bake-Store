import { Resend } from 'resend';
import OrderStatusEmail from '@/emails/OrderStatusEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderStatusEmail(
    to: string,
    customerName: string,
    orderNumber: string,
    status: string
) {
    try {
        await resend.emails.send({
            from: process.env.EMAIL_FROM || 'The Little Bake Store <orders@littlebakestore.com>',
            to: [to],
            subject: `Update on Order #${orderNumber}`,
            react: OrderStatusEmail({
                orderNumber,
                customerName,
                status
            }),
        });
    } catch (error) {
        console.error('Failed to send email:', error);
    }
}
