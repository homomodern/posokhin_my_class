const dateRegexp = /^\d{4}-(1[0-2]|0[1-9])-(30|[0-2][0-9])$/

export const isDate = date => dateRegexp.test(date)

export const isStatusValid = status => (status === '0' || status === '1') ? true : false

export const isPositiveInt  = num => !isNaN(num) && (num > 0) && Number.isInteger(num)
