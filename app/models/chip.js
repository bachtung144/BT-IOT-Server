const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChipSchema = new Schema({
    esp_id: {
        type: String,
        unique: true
    },
    list_gpio: [
        {
            id: {
                type: String,
                enum: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7'],
            },
            value: {
                type: Number,
                enum: [5, 4, 0, 2, 14, 12, 13],
            },
            used: Boolean
        }
    ]
})

const chip = mongoose.model('ChipModel', ChipSchema,"Chip")
module.exports = chip;
