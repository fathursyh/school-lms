import vine from '@vinejs/vine'

export const createSubjectSchema = vine.create({
  name: vine.string().trim().minLength(2).maxLength(100),
  code: vine.string().trim().minLength(2).maxLength(20).toUpperCase(),
})

export const updateSubjectSchema = vine.create({
  name: vine.string().trim().minLength(2).maxLength(100),
  code: vine.string().trim().minLength(2).maxLength(20).toUpperCase(),
})
