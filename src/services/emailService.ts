import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: import.meta.env.VITE_SMTP_HOST,
  port: parseInt(import.meta.env.VITE_SMTP_PORT),
  auth: {
    user: import.meta.env.VITE_SMTP_USER,
    pass: import.meta.env.VITE_SMTP_PASS
  }
});

export async function sendExpiryReminder(email: string, items: any[]) {
  const mailOptions = {
    from: '"ExpireWise" <notifications@expirewise.com>',
    to: email,
    subject: 'Items Expiring Soon - Action Required',
    html: `
      <h2>Items Expiring Soon</h2>
      <p>The following items in your ExpireWise inventory are expiring soon:</p>
      <ul>
        ${items.map(item => `
          <li>
            <strong>${item.name}</strong> - Expires on ${new Date(item.expiryDate).toLocaleDateString()}
          </li>
        `).join('')}
      </ul>
      <p>Log in to ExpireWise to manage these items and reduce food waste!</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Reminder email sent successfully');
  } catch (error) {
    console.error('Error sending reminder email:', error);
  }
}