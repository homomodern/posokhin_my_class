const dateRegexp = /^\d{4}-(1[0-2]|0[1-9])-(30|[0-2][0-9])$/

export const isDate = date => dateRegexp.test(date)

