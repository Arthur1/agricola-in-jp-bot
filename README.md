# agricola-today-card-bot

"Agricola in Japan" Discordサーバにて運用している「今日のアグリコラカードbot」です。

本番環境ではsystemdのtimer機能を利用して定期実行しています。

## init

```sh
nodenv install 12.14.0
npm install
```

## exec

```sh
WEBHOOK_ENDPOINT="https://hoge.com/" node main.js
```
