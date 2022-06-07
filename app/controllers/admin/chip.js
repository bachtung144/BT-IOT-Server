const Chip = require("../../models/chip");
const ESP_8266 = [
    {
        id: 'd1',
        value: 5,
        used: false
    },
    {
        id: 'd2',
        value: 4,
        used: false
    },
    {
        id: 'd3',
        value: 0,
        used: false
    },
    {
        id: 'd4',
        value: 2,
        used: false
    },
    {
        id: 'd5',
        value: 14,
        used: false
    },
    {
        id: 'd6',
        value: 12,
        used: false
    },
    {
        id: 'd7',
        value: 13,
        used: false
    },
]

const findAllChip = async (res) => {
    const chips = await Chip.find({})
    if (chips) res.status(200).send({data: chips})
    else res.status(404).send({err: 'not found'})
}

exports.getAll = async (req, res) => {
    await findAllChip(res)
}

exports.addNew = (req,res) => {
    let {esp_id} = req.body
    let data = {esp_id, list_gpio: ESP_8266}
    let tmpChip = new Chip(data)
    tmpChip.save(async (err) => {
        if (err) res.status(500).send({err: err})
        else await findAllChip(res)
    })
}

exports.update = (req,res) => {
    let id = req.params.id;
    let {esp_id} = req.body
    let data = {esp_id}
    Chip.findOneAndUpdate({_id: id}, {$set:data}, {new: true}, async (err, doc) => {
        if (err) res.status(500).send({err: err})
        else await findAllChip(res)
    });
}

exports.delete = async (req,res) => {
    let id = req.params.id;
    const chip = await Chip.deleteOne({_id: id})

    if (chip) await findAllChip(res)
    else res.status(500).send({err: 'delete error'})
}

