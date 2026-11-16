import { type Data } from '@generated/data'
import { Form } from '@adonisjs/inertia/react'
import { Plus } from 'lucide-react'
import React from 'react'
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
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Button, buttonVariants } from '../ui/button'

const currentYear = new Date().getFullYear()

interface AcademicYearFormProps {
  academicYear?: Data.AcademicYear | null
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
}

export default function AcademicYearForm({
  academicYear,
  open: controlledOpen,
  onOpenChange,
  trigger,
}: AcademicYearFormProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  const setOpen = isControlled ? (onOpenChange ?? (() => {})) : setUncontrolledOpen
  const isEdit = Boolean(academicYear)

  const formBody = (
    <Form
      key={academicYear?.id ?? 'create'}
      {...(isEdit
        ? {
            route: 'administrators.academic_years.update' as const,
            routeParams: { id: academicYear!.id },
          }
        : {
            route: 'administrators.academic_years.store' as const,
          })}
      onSuccess={({ flash }) => {
        if (flash.success) {
          setOpen(false)
        }
      }}
      noValidate
      options={{ only: ['academicYears'] }}
    >
      {({ errors, processing, setError }) => (
        <>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? 'Edit Academic Year' : 'Create New Academic Year'}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? 'Update the academic year details below. Click save when you are done.'
                : 'Make a new academic year here. Click save when you are done.'}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="my-4">
            <Field data-invalid={!!errors.year}>
              <FieldLabel htmlFor="year">Year</FieldLabel>
              <Input
                id="year"
                type="number"
                min={2000}
                max={2100}
                name="year"
                defaultValue={academicYear?.year ?? currentYear}
                aria-invalid={!!errors.year}
                onChange={() => setError('year', '')}
              />
              {errors.year && <FieldError>{errors.year}</FieldError>}
            </Field>
            <Field data-invalid={!!errors.semester}>
              <FieldLabel htmlFor="semester">Semester</FieldLabel>
              <RadioGroup
                id="semester"
                name="semester"
                defaultValue={academicYear?.semester ?? 'ODD'}
                className="flex w-fit gap-4"
                aria-invalid={!!errors.semester}
                onChange={() => setError('semester', '')}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="ODD" id="odd" />
                  <FieldLabel htmlFor="odd">Odd</FieldLabel>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="EVEN" id="even" />
                  <FieldLabel htmlFor="even">Even</FieldLabel>
                </div>
              </RadioGroup>
              {errors.semester && <FieldError>{errors.semester}</FieldError>}
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-8">
            <DialogClose className={buttonVariants({ variant: 'ghost' })}>
              Cancel
            </DialogClose>
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
            Create New Year
          </DialogTrigger>
        ))}
      <DialogContent className="sm:max-w-sm">{formBody}</DialogContent>
    </Dialog>
  )
}
