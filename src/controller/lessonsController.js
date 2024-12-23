import { lessonsDAO } from '../dao/lessonsDAO.js'
import { isDate, isStatusValid, isPositiveInt } from '../validation/validator.js'

export const lessonsController = async (req, res) => {
    try {
        const sendErrorResponse = param =>
            res.status(400).json({ error: `Некорректно указан параметр ${param}` })

        const pageDefault = 1
        const lessonsPerPageDefault = 10
        const maxPageSize = 100

        const {
            date,
            status,
            teacherIds,
            studentsCount,
            page = pageDefault,
            lessonsPerPage = lessonsPerPageDefault
        } = req.query

        const filters = {
            page,
            lessonsPerPage
        }

        if (date) {
            const dates = date.split(',')
            if (dates.length === 1 && dates.every(isDate)) {
                filters.date = dates[0]
            } else if (dates.length === 2 && dates.every(isDate)) {
                filters.dateFrom = dates[0]
                filters.dateTo = dates[1]
            } else {
                return sendErrorResponse('date')
            }
        }

        if (status) {
            if (isStatusValid(status)) {
                filters.status = status
            } else {
                return sendErrorResponse('status')
            }
        }

        if (teacherIds) {
            const teacherIdNumbers = teacherIds.split(',').map(Number)
            if (teacherIdNumbers.every(isPositiveInt)) {
                filters.teacherIds = teacherIdNumbers
            } else {
                return sendErrorResponse('teacherIds')
            }
        }

        if (studentsCount) {
            const countRange = studentsCount.split(',').map(Number)
            if (countRange.every(isPositiveInt)) {
                if (countRange.length === 1) {
                    filters.studentsCount = countRange[0]
                } else if (countRange.length === 2) {
                    filters.studentsCountFrom = countRange[0]
                    filters.studentsCountTo = countRange[1]
                } else {
                    return sendErrorResponse('studentsCount')
                }
            }
        }

        if (lessonsPerPage > maxPageSize) {
            return res.status(400).json({
                error: `Можно запросить не больше ${maxPageSize} уроков на страницу`
            })
        }

        res.json(await lessonsDAO(filters))

    } catch (err) {
        res.status(500).json({
            error: 'Что-то пошло не так'
        })
    }
}