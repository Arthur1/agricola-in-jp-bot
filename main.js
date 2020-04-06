'use strict'

require('dotenv').config()
const webhook = require('webhook-discord')
const cardsMaster = require('./cards_master.json')
const decksMaster = require('./decks_master.json')

main()

function main() {
  const cards = cardsMaster[2].data
  const card = cards[Math.floor(Math.random() * cards.length)]
  const message = createMessage(card)

  const endpoint = process.env.WEBHOOK_ENDPOINT
  const Hook = new webhook.Webhook(endpoint)
  Hook.send(message)
}

function createMessage(card) {
  const message = new webhook.MessageBuilder()
  message.setName('今日のアグリコラカードBot')
  message.setTitle(`[${card.card_id_display}] ${card.japanese_name}`)
  message.addField('デッキ', decksMaster[card.deck])

  if (card.type === 'occupation') {
    message.setColor('#FBC02D')
    message.addField('カテゴリー', card.category + '+')
  } else {
    message.setColor('#F57C00')
    if (card.prerequisite) message.addField('前提', card.prerequisite)
    if (card.costs) message.addField('コスト', card.costs)
    if (card.card_points != 0) message.addField('カード点', card.card_points + '点')
  }

  message.addField('テキスト', card.description)
  return message
}

/*
  SELECT * FROM `cards_master` 
  WHERE deck NOT IN ("WB", "RR", "RR5", "RM", "OR", "OM", "ME", "MF", "L17", "L18", "L5", "LR")
  ORDER BY `cards_master`.`card_id`  ASC
*/
