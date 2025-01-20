"use server";

import { sendEmail } from "@/lib/sendgrid";

export const sendContactEmailAction = async (formData: FormData) => {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const message = formData.get("message") as string;

        await sendEmail({
            to: "vajkonorbert13@gmail.com",
            templateName: "ContactSubmission",
            dynamicTemplateData: {
                name,
                email,
                message
            }
        })

        return { errorMessage: null }
    } catch (error) {
        console.log(error);
    }
}