import vine from '@vinejs/vine'

export const createAcademicYearSchema = vine.create({
  year: vine.number().min(2000).max(2100),
  semester: vine.enum(['EVEN', 'ODD']),
})

export const updateAcademicYearSchema = vine.create({
  year: vine.number().min(2000).max(2100),
  semester: vine.enum(['EVEN', 'ODD']),
})