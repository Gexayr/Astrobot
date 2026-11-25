# AstroBot - деплой

Один контейнер `app` (Express) отдаёт и API (`/api/*`), и собранный лендинг. Рядом - PostgreSQL и одноразовый контейнер `migrate`, который синхронизирует схему БД. TLS и домен - на nginx хоста.

```
браузер ──https──> nginx (хост, certbot) ──> 127.0.0.1:3000 ──> app:8080 ──> db:5432
```

## API

| Метод | Путь | Что делает |
|---|---|---|
| GET | `/api/healthz` | healthcheck |
| POST | `/api/subscribe` | `{ email }` → таблица `subscribers` (форма в футере) |
| POST | `/api/preorders` | `{ name, email, quantity, phone?, country?, comment? }` → таблица `preorders` (кнопка «Reserve Yours Now») |

Лимит: 10 запросов / 10 мин с одного IP. Если заданы `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`, о каждом предзаказе приходит сообщение в Telegram.

## SEO

`pnpm --filter @workspace/astrobot run build` пререндерит `/`, `/privacy`, `/terms` в готовый HTML (`artifacts/astrobot/scripts/prerender.mjs`): свой title, description, canonical, JSON-LD (Product, FAQPage), а также `sitemap.xml` и `robots.txt`. Домен задаётся `SITE_URL` (по умолчанию `https://astrobot.amsoft.am`). Новую страницу нужно добавить в `routes` в prerender.mjs и в `pages` в `artifacts/api-server/src/app.ts`, иначе сервер отдаст 404.

## Вариант 1 - Docker (рекомендуется)

```bash
git clone git@github.com:Gexayr/Astrobot.git /var/www/astrobot && cd /var/www/astrobot
cp .env.example .env            # задать POSTGRES_PASSWORD (openssl rand -hex 24)
docker compose up -d --build
curl http://127.0.0.1:3000/api/healthz   # {"status":"ok"}

# nginx + SSL
sudo cp deploy/nginx.conf /etc/nginx/sites-available/astrobot   # заменить server_name
sudo ln -s /etc/nginx/sites-available/astrobot /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Обновление: `git pull && docker compose up -d --build`.

Посмотреть заявки:
```bash
docker compose exec db psql -U astrobot -d astrobot -c "select * from preorders order by id desc;"
```

Бэкап БД (повесить на cron):
```bash
docker compose exec -T db pg_dump -U astrobot astrobot | gzip > backup-$(date +%F).sql.gz
```

## Вариант 2 - PM2 (без Docker)

Нужны Node 24, pnpm 10, PostgreSQL на хосте. В `.env` задать `DATABASE_URL`.

```bash
pnpm install --frozen-lockfile
pnpm --filter @workspace/astrobot --filter @workspace/api-server run build
set -a; . ./.env; set +a; pnpm --filter @workspace/db run push
pm2 start ecosystem.config.cjs --env production && pm2 save && pm2 startup
```

## Локальная разработка

```bash
pnpm install
DATABASE_URL=postgres://... PORT=8080 pnpm --filter @workspace/api-server run dev   # API
pnpm --filter @workspace/astrobot run dev                                          # сайт, /api проксируется на :8080
```

После изменений в `lib/api-spec/openapi.yaml` - `pnpm --filter @workspace/api-spec run codegen`.
