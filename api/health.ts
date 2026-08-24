export default {
  async fetch() {
    return Response.json({
      ok: true,
      service: 'btcusd-controller-backend',
      runtime: 'vercel-functions',
    }, { headers: { 'Cache-Control': 'no-store' } });
  },
};
