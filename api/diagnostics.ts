export default {
  async fetch() {
    const present = (name:string) => Boolean(process.env[name]?.trim());
    return Response.json({
      ok:true,
      environment:{
        DATABASE_URL:present('DATABASE_URL'),
        API_TOKEN:present('API_TOKEN'),
        CRON_SECRET:present('CRON_SECRET'),
        RECIPIENT_EMAIL:present('RECIPIENT_EMAIL'),
        EMAILJS_PUBLIC_KEY:present('EMAILJS_PUBLIC_KEY'),
        EMAILJS_SERVICE_ID:present('EMAILJS_SERVICE_ID'),
        EMAILJS_TEMPLATE_ID:present('EMAILJS_TEMPLATE_ID'),
        EXPO_PUSH_TOKEN:present('EXPO_PUSH_TOKEN'),
      },
    }, { headers:{'Cache-Control':'no-store'} });
  },
};
