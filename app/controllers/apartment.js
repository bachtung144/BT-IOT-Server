const Apartment = require('../models/apartment')
const Building = require("../models/building");

exports.getInfor = (req,res) => {
    const {idApartment} = req.params;

    Apartment.findById(idApartment)
        .then( apartment => {
            if (apartment) {
                Building.findById(apartment.id_building).then(
                    building => {
                        res.status(200).send({
                            building: building.name,
                            address: building.address,
                            location: building.location,
                            city: building.city,
                            district: building.district,
                            apartment: apartment.address
                        })
                    }
                )
            }
            else res.status(404).send({err: 'not found'})
        }).catch( err => res.status(500).send({err: err}))
}
