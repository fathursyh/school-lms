import vine from '@vinejs/vine'

export const createUserSchema = vine.create({
  identifier: vine.string().trim().minLength(2).maxLength(50),
  name: vine.string().trim().minLength(2).maxLength(100),
  email: vine.string().trim().email().maxLength(254),
  password: vine.string().minLength(6).maxLength(100),
})

export const updateUserSchema = vine.create({
  identifier: vine.string().trim().minLength(2).maxLength(50),
  name: vine.string().trim().minLength(2).maxLength(100),
  email: vine.string().trim().email().maxLength(254),
  password: vine.string().minLength(6).maxLength(100).optional(),
})
