type MailtoInput = {
  email: string;
  subject: string;
  body: string;
};

export function buildMailtoLink({ email, subject, body }: MailtoInput) {
  const params = new URLSearchParams({
    subject,
    body,
  });

  return `mailto:${email}?${params.toString()}`;
}
