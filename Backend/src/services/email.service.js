import emailjs from "./transporter.js";
const STATUS_EMAIL_CONTENT = {
  interview: {
    icon: "📅",
    title: "You've been invited to interview!",
    color: "#d97706",
    bg: "#fef3c7",
    message: (jobTitle, companyName, interviewDate, interviewTime, interviewLink) =>
      `Good news — ${companyName} would like to move forward with an interview for the ${jobTitle} role, scheduled for ${interviewDate} at ${interviewTime}. Join here: ${interviewLink}`,
  },
  shortlisted: {
    icon: "⭐",
    title: "You've been shortlisted!",
    color: "#2563eb",
    bg: "#dbeafe",
    message: (jobTitle, companyName) =>
      `Your application for ${jobTitle} at ${companyName} has been shortlisted. The recruiting team will be in touch with next steps.`,
  },
  hired: {
    icon: "🎉",
    title: "Congratulations, you're hired!",
    color: "#059669",
    bg: "#d1fae5",
    message: (jobTitle, companyName) =>
      `${companyName} has decided to move forward with you for the ${jobTitle} role. Congratulations! You'll receive onboarding details shortly.`,
  },
  rejected: {
    icon: "📩",
    title: "Update on your application",
    color: "#dc2626",
    bg: "#fee2e2",
    message: (jobTitle, companyName) =>
      `Thank you for applying for ${jobTitle} at ${companyName}. After careful review, we've decided not to move forward at this time. We encourage you to apply again in the future.`,
  },
};

export const sendApplicationStatusEmail = async ({
  to,
  candidateName,
  jobTitle,
  companyName,
  status,
  interviewLink,
  interviewDate,
  interviewTime,
}) => {
  const content = STATUS_EMAIL_CONTENT[status];

  if (!content) return;

  const templateParams = {
    to_email: to,
    candidate_name: candidateName,
    job_title: jobTitle,
    company_name: companyName,
    status_title: content.title,
    status_message: content.message(
      jobTitle,
      companyName,
      interviewDate,
      interviewTime,
      interviewLink,
    ),
    accent_color: content.color,
    accent_bg: content.bg,
    status_icon: content.icon,
    time: new Date().toLocaleString(),
    ...(status === "interview" && {
      interview_link: interviewLink,
      interview_date: interviewDate,
      interview_time: interviewTime,
    }),
  };

  const serviceId =
    status === "interview"
      ? process.env.EMAILJS_SERVICE_ID_INTERVIEW
      : process.env.EMAILJS_SERVICE_ID;
  const templateId =
    status === "interview"
      ? process.env.EMAILJS_TEMPLATE_ID_INTERVIEW
      : process.env.EMAILJS_TEMPLATE_ID;

  try {
    await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      status === "interview"
        ? {
            publicKey: process.env.EMAILJS_PUBLIC_KEY_INTERVIEW,
            privateKey: process.env.EMAILJS_PRIVATE_KEY_INTERVIEW,
          }
        : undefined,
    );
  } catch (error) {
    console.error(
      "Failed to send application status email",
      error?.text || error?.message || error,
    );
  }
};

export const sendCompanyInviteEmail = async ({
  to,
  companyName,
  inviterName,
  inviteLink,
}) => {
  const templateParams = {
    to_email: to,
    company_name: companyName,
    inviter_name: inviterName,
    invite_link: inviteLink,
    time: new Date().toLocaleString(),
  };

  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID_INVITE,
      templateParams,
    );
  } catch (error) {
    const detail = error?.text || error?.message || "Unknown EmailJS error";
    console.error("Failed to send company invite email:", detail);
    throw new Error(detail);
  }
};
