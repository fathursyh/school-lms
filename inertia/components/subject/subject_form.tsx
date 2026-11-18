import { type Data } from '@generated/data'
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

interface SubjectFormProps {
  subject?: Data.Subject | null
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
}

export default function SubjectForm({
  subject,
  open: controlledOpen,
  onOpenChange,
  trigger,
}: SubjectFormProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  const setOpen = isControlled ? (onOpenChange ?? (() => {})) : setUncontrolledOpen
  const isEdit = Boolean(subject)

  const formBody = (
    <Form
      key={subject?.id ?? 'create'}
      {...(isEdit
        ? {
            route: 'administrators.subjects.update' as const,
            routeParams: { id: subject!.id },
          }
        : {
            route: 'administrators.subjects.store' as const,
          })}
      onSuccess={({ flash }) => {
        if (flash.success) {
          setOpen(false)
        }
      }}
      noValidate
      options={{ only: ['subjects'] }}
    >
      {({ errors, processing, setError }) => (
        <>
          <DialogHeader>
            <DialogTitle>{isEdit ? 'Edit Subject' : 'Create New Subject'}</DialogTitle>
            <DialogDescription>
              {isEdit
                ? 'Update the subject details below. Click save when you are done.'
                : 'Add a new subject here. Click save when you are done.'}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="my-4">
            <Field data-invalid={!!errors.code}>
              <FieldLabel htmlFor="code">Code</FieldLabel>
              <Input
                id="code"
                name="code"
                placeholder="e.g. MATH101"
                defaultValue={subject?.code ?? ''}
                aria-invalid={!!errors.code}
                onChange={() => setError('code', '')}
              />
              {errors.code && <FieldError>{errors.code}</FieldError>}
            </Field>
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="e.g. Mathematics"
                defaultValue={subject?.name ?? ''}
                aria-invalid={!!errors.name}
                onChange={() => setError('name', '')}
              />
              {errors.name && <FieldError>{errors.name}</FieldError>}
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
            Create New Subject
          </DialogTrigger>
        ))}
      <DialogContent className="sm:max-w-sm">{formBody}</DialogContent>
    </Dialog>
  )
}
