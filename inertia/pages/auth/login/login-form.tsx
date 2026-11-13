import { cn } from "~/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Form } from "@adonisjs/inertia/react"
import { Spinner } from "~/components/ui/spinner"
import { Checkbox } from "~/components/ui/checkbox"
import { Label } from "~/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
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
                    placeholder="m@example.com"
                    required
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
                  <Input id="password" type="password" name="password" required />
                  {errors.password && <FieldError>{errors.password}</FieldError>}
                </Field>
                <fieldset className="flex items-center space-x-2">
                  <Checkbox id="remember_me" itemID="remember_me" name="remember_me" />
                  <Label htmlFor="remember_me">Remember Me</Label>
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
                  <FieldDescription className="text-center">
                    Don&apos;t have an account? <a href="#">Sign up</a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            )}
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
