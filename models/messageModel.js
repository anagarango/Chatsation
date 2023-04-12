const mongoose = require('mongoose')
const { Schema, models, model } = mongoose

const messageSchema = new Schema({
	name: String,
	message: String
})

const MessageModel = models.Message || model('Message', messageSchema)

module.exports = MessageModel