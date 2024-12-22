import { lessonsDAO } from '../dao/lessonsDAO.js'

export const lessonsController = async (req, res) => {

    const errorResponse = field =>
        res.status(400).json({ error: `Некорректно указано поле ${field}` })

    const {
        date,
        status,
        page = 1,
        teacherIds,
        studentsCount,
        lessonsPerPage = 10
    } = req.query

    const filters = {
        page,
        lessonsPerPage
    }

    if (date) {
        const dates = date.split(',')
        if (dates.length === 1 && dates[0]) {
            filters.date = dates[0]
        } else if (dates.length === 2 && dates[0] && dates[1]) {
            filters.dateFrom = dates[0]
            filters.dateTo = dates[1]
        } else {
            return errorResponse('date')
        }
    }

    if (status) {
        if (status) {
            filters.status = status
        } else {
            return errorResponse('status')
        }
    }

    if (teacherIds) {
        const teacherIdNumbers = teacherIds.split(',').map(Number)
        if (teacherIdNumbers) {
            filters.teacherIds = teacherIdNumbers
        } else {
            return errorResponse('teacherIds')
        }
    }

    if (studentsCount) {
        const countRange = studentsCount.split(',')
        if (countRange) {
            if (countRange.length === 1) {
                filters.studentsCount = countRange[0]
            }
            if (countRange.length === 2) {
                filters.studentsCountFrom = countRange[0]
                filters.studentsCountTo = countRange[1]
            }
        } else {
            return errorResponse('studentsCount')
        }
    }


    return res.json(await lessonsDAO(filters))

}