const value=(name:string)=>process.env[name]?.trim()??'';
export const env={
  databaseUrl:value('DATABASE_URL')||'postgresql://invalid:invalid@127.0.0.1:5432/invalid',
  databaseConfigured:Boolean(value('DATABASE_URL')),
  apiToken:value('API_TOKEN'),
  cronSecret:value('CRON_SECRET'),
  allowedOrigin:value('ALLOWED_ORIGIN'),
  recipientEmail:value('RECIPIENT_EMAIL'),
  expoPushToken:value('EXPO_PUSH_TOKEN'),
  emailJsPublicKey:value('EMAILJS_PUBLIC_KEY'),
  emailJsServiceId:value('EMAILJS_SERVICE_ID'),
  emailJsTemplateId:value('EMAILJS_TEMPLATE_ID'),
};
