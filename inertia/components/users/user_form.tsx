import { Form } from '@adonisjs/inertia/react'
import { Plus } from 'lucide-react'
import React from 'react'
import { Button, buttonVariants } from '~/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '~/components/ui/field'
import { Input } from '~/components/ui/input'

export interface UserFormTarget {
  id: string
  identifier: string
  name: string
  email: string
}

interface UserFormProps {
  roleLabel: string
  identifierLabel?: string
  action: string
  method?: 'post' | 'put'
  onlyProp: string
  user?: UserFormTarget | null
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
}

export default function UserForm({
  roleLabel,
  identifierLabel = 'Identifier',
  action,
  method,
  onlyProp,
  user,
  open: controlledOpen,
  onOpenChange,
  trigger,
}: UserFormProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  const setOpen = isControlled ? (onOpenChange ?? (() => {})) : setUncontrolledOpen
  const isEdit = Boolean(user)
  const formMethod = method ?? (isEdit ? 'put' : 'post')

  const formBody = (
    <Form
      key={user?.id ?? 'create'}
      action={action}
      method={formMethod}
      onSuccess={({ flash }) => {
        if (flash.success) {
          setOpen(false)
        }
      }}
      noValidate
      options={{ only: [onlyProp] }}
    >
      {({ errors, processing, setError }) => (
        <>
          <DialogHeader>
            <DialogTitle>{isEdit ? `Edit ${roleLabel}` : `Create New ${roleLabel}`}</DialogTitle>
            <DialogDescription>
              {isEdit
                ? `Update the ${roleLabel.toLowerCase()} details below. Click save when you are done.`
                : `Add a new ${roleLabel.toLowerCase()} here. Click save when you are done.`}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="my-4">
            <Field data-invalid={!!errors.identifier}>
              <FieldLabel htmlFor="identifier">{identifierLabel}</FieldLabel>
              <Input
                id="identifier"
                name="identifier"
                defaultValue={user?.identifier ?? ''}
                aria-invalid={!!errors.identifier}
                onChange={() => setError('identifier', '')}
              />
              {errors.identifier && <FieldError>{errors.identifier}</FieldError>}
            </Field>
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                defaultValue={user?.name ?? ''}
                aria-invalid={!!errors.name}
                onChange={() => setError('name', '')}
              />
              {errors.name && <FieldError>{errors.name}</FieldError>}
            </Field>
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                defaultValue={user?.email ?? ''}
                aria-invalid={!!errors.email}
                onChange={() => setError('email', '')}
              />
              {errors.email && <FieldError>{errors.email}</FieldError>}
            </Field>
            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="password">
                {isEdit ? 'Password (leave blank to keep current)' : 'Password'}
              </FieldLabel>
              <Input
                id="password"
                type="password"
                name="password"
                aria-invalid={!!errors.password}
                onChange={() => setError('password', '')}
              />
              {errors.password && <FieldError>{errors.password}</FieldError>}
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-8">
            <DialogClose className={buttonVariants({ variant: 'ghost' })}>Cancel</DialogClose>
            <Button type="submit" disabled={processing}>
              Save changes
            </Button>
          </DialogFooter>
        </>
      )}
    </Form>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isControlled &&
        (trigger ?? (
          <DialogTrigger className={buttonVariants()}>
            <Plus />
            Create New {roleLabel}
          </DialogTrigger>
        ))}
      <DialogContent className="sm:max-w-sm">{formBody}</DialogContent>
    </Dialog>
  )
}
