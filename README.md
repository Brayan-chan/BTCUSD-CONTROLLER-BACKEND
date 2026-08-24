# BTCUSD Controller Backend

Backend personal serverless para BTCUSD Controller, diseñado para **Vercel Hobby**.

## Arquitectura

- Vercel Functions: API HTTPS.
- Neon PostgreSQL: alertas y estado persistente.
- QStash Schedule: ejecuta `POST /api/check-alerts` cada minuto.
- Binance: precio BTC/USDT.
- EmailJS: correo al activar una alerta.
- Expo Push: notificación remota opcional.

No usa SQLite, procesos permanentes ni Vercel Cron. Vercel Hobby limita su cron nativo a una ejecución diaria.

## 1. Instalar

```bash
bun install
cp .env.example .env
```

Genera dos secretos diferentes:

```bash
openssl rand -hex 32
openssl rand -hex 32
```

## 2. Neon

Crea una base PostgreSQL en Neon y coloca su conexión en `DATABASE_URL`. Después:

```bash
bun run db:migrate
```

## 3. Vercel

Importa este repositorio en Vercel y configura:

- `DATABASE_URL`
- `API_TOKEN`
- `CRON_SECRET`
- `RECIPIENT_EMAIL`
- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EXPO_PUSH_TOKEN` (opcional)
- `ALLOWED_ORIGIN` (vacío para app nativa)

Despliega y comprueba:

```bash
curl https://TU-DOMINIO.vercel.app/api/health
curl -H "Authorization: Bearer API_TOKEN" https://TU-DOMINIO.vercel.app/api/status
```

## 4. QStash

Crea un Schedule con:

- Destination: `https://TU-DOMINIO.vercel.app/api/check-alerts`
- Method: `POST`
- Cron: `* * * * *`
- Header reenviado: `X-Cron-Secret: CRON_SECRET`
- Retries: 3

Con la API de QStash, el header se envía como `Upstash-Forward-X-Cron-Secret`.

## API móvil

Todas requieren `Authorization: Bearer API_TOKEN`, excepto health.

- `GET /api/alerts`
- `POST /api/alerts`
- `POST /api/cancel-alert` con `{"id":"..."}`
- `GET /api/status`
- `POST /api/check-alerts` protegido por `X-Cron-Secret`

## Alcance

QStash tiene resolución máxima de un minuto. La alerta puede tardar hasta aproximadamente un minuto más latencia/reintentos; no es un feed de trading de baja latencia.
