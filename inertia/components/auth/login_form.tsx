import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Form } from '@adonisjs/inertia/react'
import { Spinner } from '~/components/ui/spinner'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'

export function LoginForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form route="session.store" noValidate>
          {({ errors, processing }) => (
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@school.edu.com"
                  required
                  disabled={processing}
                  autoFocus
                />
                {errors.email && <FieldError>{errors.email}</FieldError>}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  disabled={processing}
                />
                {errors.password && <FieldError>{errors.password}</FieldError>}
              </Field>
              <fieldset className="flex items-center space-x-2">
                <Checkbox id="rememberMe" itemID="rememberMe" name="rememberMe" />
                <Label htmlFor="rememberMe">Remember me</Label>
              </fieldset>
              <Field>
                <Button
                  type="submit"
                  className="btn btn--primary btn--block"
                  disabled={processing}
                  style={{ marginTop: 4 }}
                >
                  <Spinner className={!processing ? 'hidden' : ''} aria-hidden={!processing} />
                  {processing ? 'One moment…' : 'Sign in'}
                </Button>
              </Field>
            </FieldGroup>
          )}
        </Form>
      </CardContent>
    </Card>
  )
}
