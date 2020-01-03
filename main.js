'use strict'

const cron = require('node-cron')
cron.schedule('0 0 8 * * *', postRandomCard)

function postRandomCard() {
  const webhook = require('webhook-discord')
  const endpoint = process.env.WEBHOOK_ENDPOINT
  const Hook = new webhook.Webhook(endpoint)

  const cardsMaster = require('./cards_master.json')
  const decksMaster = require('./decks_master.json')

  let cards = cardsMaster[2].data
  let card = cards[Math.floor(Math.random() * cards.length)]

  const message = new webhook.MessageBuilder()
  message.setName('今日のアグリコラカードBot')
  message.setTitle(`[${card.card_id_display}] ${card.japanese_name}`)

  let color = card.type === 'occupation' ? '#FBC02D' : '#F57C00'
  message.setColor(color)

  message.addField('デッキ', decksMaster[card.deck])

  if (card.type === 'occupation') {
    message.addField('カテゴリー', card.category + '+')
  } else {
    if (card.prerequisite) message.addField('前提', card.prerequisite)
    if (card.costs) message.addField('コスト', card.costs)
    if (card.cardPoints) message.addField('カード点', card.cardPoints + '点')
  }

  message.addField('効果', card.description)

  Hook.send(message)
}

