import sgMail, { MailDataRequired } from '@sendgrid/mail';

type Props = {
    to: string;
    templateName: "ContactSubmission";
    dynamicTemplateData?: Record<string, string>;
}

export const sendEmail = async ({
    to,
    templateName,
    dynamicTemplateData
}: Props) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    const msg = {
        to: to,
        from: {
            email: "vajkonorbert13@gmail.com",
            name: "This is a demo"
        },
        templateId: templates[templateName],
        dynamicTemplateData
    }

    try {
        await sgMail.send(msg);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send email");
    }
}

const templates = {
    ContactSubmission: "d-be5fbd34cca84e6db467df63732ac247"
}