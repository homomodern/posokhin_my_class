import { lessonsDAO } from '../dao/lessonsDAO.js'

export const lessonsController = async (req, res) => {
    const {
        page = 1,
        lessonsPerPage = 10
    } = req.query

    const filters = {
        page,
        lessonsPerPage
    }

    return res.json(await lessonsDAO(filters))

}