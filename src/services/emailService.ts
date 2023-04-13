import emailjs from "emailjs-com";
import { Job } from "../types";

// Replace with your EmailJS user ID and template ID
const emailjsUserId = "YOUR_USER_ID";
const emailjsTemplateId = "YOUR_TEMPLATE_ID";

export const sendJobEmail = async (job: Job, recipientEmail: string) => {
  try {
    const emailTemplateParams = {
      // Add the necessary parameters based on your EmailJS template
      recipient_email: recipientEmail,
      job_id: job.jobId,
      company: job.company,
      // Add other parameters as needed
    };

    const response = await emailjs.send(
      "default_service", // Use default email service
      emailjsTemplateId,
      emailTemplateParams,
      emailjsUserId
    );

    return response;
  } catch (error) {
    console.error("Error sending job email:", error);
    throw error;
  }
};
