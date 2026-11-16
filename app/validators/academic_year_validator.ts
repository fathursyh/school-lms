import vine from '@vinejs/vine'

export const createAcademicYearSchema = vine.create({
  year: vine.number().positive().withoutDecimals(),
  semester: vine.enum(['EVEN', 'ODD']),
})