import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendQuoteEmail(data: {
    name: string;
    email: string;
    storeUrl?: string;
    needs: string;
    budget?: string;
    timeline?: string;
}) {
    const recipientValue = process.env.RECIPIENT_EMAIL || "david.svestak96@gmail.com";
    const recipients = recipientValue.split(/[;,]+/).map(e => e.trim()).filter(Boolean);

    try {
        const result = await resend.emails.send({
            from: "LeadBase Spark <onboarding@resend.dev>",
            to: recipients,
            subject: `New Quote Request from ${data.name}`,
            text: `
Name: ${data.name}
Email: ${data.email}
Store URL: ${data.storeUrl || "N/A"}
Needs: ${data.needs}
Budget: ${data.budget || "N/A"}
Timeline: ${data.timeline || "N/A"}
            `,
            html: `
                <h2>New Quote Request</h2>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Store URL:</strong> ${data.storeUrl || "N/A"}</p>
                <p><strong>Needs:</strong> ${data.needs}</p>
                <p><strong>Budget:</strong> ${data.budget || "N/A"}</p>
                <p><strong>Timeline:</strong> ${data.timeline || "N/A"}</p>
            `,
        });

        if (result.error) {
            throw new Error(`Resend API error: ${JSON.stringify(result.error)}`);
        }

        console.log("Email sent successfully via Resend:", result.data?.id);
        return result.data;
    } catch (error) {
        console.error("Error sending email via Resend:", error);
        throw error;
    }
}
