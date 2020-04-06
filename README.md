# agricola-today-card-bot

"Agricola in Japan" Discordサーバにて運用している「今日のアグリコラカードbot」です。

本番環境ではsystemdのtimer機能を利用して定期実行しています。

## init

```sh
nodenv install 12.16.1
exec $SHELL -l
cd agricola-today-card-bot/
npm install
cp .env.sample .env
vim .env
```

.envファイルにDiscordのWebhookURLを入力してください。

```
WEBHOOK_ENDPOINT='https://discordapp.com/api/webhooks/hoge/fuga'
```

## exec

```sh
node main.js
```
