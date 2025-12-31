"use client";

import { useTranslations } from "next-intl";
import { useForm } from "@tanstack/react-form";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
  Checkbox,
} from "@heroui/react";
import Link from "next/link";
import { emailSchema, passwordSchema } from "@/api/auth";
import { authStyles } from "../shared";

interface CredentialsStepProps {
  onSubmit: (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => Promise<void>;
  isPending: boolean;
}

export default function CredentialsStep({
  onSubmit,
  isPending,
}: CredentialsStepProps) {
  const t = useTranslations("auth");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  return (
    <Form
      className={authStyles.form}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) => {
            const result = emailSchema.safeParse(value);
            if (!result.success) {
              return t("invalidEmail");
            }
            return undefined;
          },
        }}
      >
        {(field) => (
          <TextField
            isRequired
            name="email"
            type="email"
            value={field.state.value}
            onChange={(v) => field.handleChange(v)}
            onBlur={field.handleBlur}
            isInvalid={field.state.meta.errors.length > 0}
          >
            <Label>{t("email")}</Label>
            <Input placeholder={t("emailPlaceholder")} />
            {field.state.meta.errors.length > 0 && (
              <FieldError>{field.state.meta.errors[0]}</FieldError>
            )}
          </TextField>
        )}
      </form.Field>

      <form.Field
        name="password"
        validators={{
          onChange: ({ value }) => {
            const result = passwordSchema.safeParse(value);
            if (!result.success) {
              return t("passwordTooShort");
            }
            return undefined;
          },
        }}
      >
        {(field) => (
          <TextField
            isRequired
            name="password"
            type="password"
            value={field.state.value}
            onChange={(v) => field.handleChange(v)}
            onBlur={field.handleBlur}
            isInvalid={field.state.meta.errors.length > 0}
          >
            <Label>{t("password")}</Label>
            <Input placeholder={t("passwordPlaceholder")} />
            {field.state.meta.errors.length > 0 && (
              <FieldError>{field.state.meta.errors[0]}</FieldError>
            )}
          </TextField>
        )}
      </form.Field>

      <div className={authStyles.checkbox.wrapper}>
        <form.Field name="rememberMe">
          {(field) => (
            <Checkbox
              name="rememberMe"
              isSelected={field.state.value}
              onChange={(v) => field.handleChange(v)}
            >
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Content>
                <Label>{t("rememberMe")}</Label>
              </Checkbox.Content>
            </Checkbox>
          )}
        </form.Field>
        <Link href="/forgot-password" className={authStyles.checkbox.link}>
          {t("forgotPassword")}
        </Link>
      </div>

      <Button
        type="submit"
        fullWidth
        isPending={isPending}
        className="gradient-btn text-white font-semibold rounded-xl h-12"
      >
        {t("next")}
      </Button>
    </Form>
  );
}
