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
} from "@heroui/react";
import { emailSchema, passwordSchema, nameSchema } from "@/api/auth";
import { authStyles } from "../shared";

interface InfoStepProps {
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  isPending: boolean;
}

export default function InfoStep({ onSubmit, isPending }: InfoStepProps) {
  const t = useTranslations("auth");

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      await onSubmit({
        name: value.name,
        email: value.email,
        password: value.password,
      });
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
        name="name"
        validators={{
          onChange: ({ value }) => {
            const result = nameSchema.safeParse(value);
            if (!result.success) {
              return t("nameRequired");
            }
            return undefined;
          },
        }}
      >
        {(field) => (
          <TextField
            isRequired
            name="name"
            value={field.state.value}
            onChange={(v) => field.handleChange(v)}
            onBlur={field.handleBlur}
            isInvalid={field.state.meta.errors.length > 0}
          >
            <Label>{t("name")}</Label>
            <Input placeholder={t("namePlaceholder")} />
            {field.state.meta.errors.length > 0 && (
              <FieldError>{field.state.meta.errors[0]}</FieldError>
            )}
          </TextField>
        )}
      </form.Field>

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

      <form.Field
        name="confirmPassword"
        validators={{
          onChangeListenTo: ["password"],
          onChange: ({ value, fieldApi }) => {
            const password = fieldApi.form.getFieldValue("password");
            if (value !== password) {
              return t("passwordMismatch");
            }
            return undefined;
          },
        }}
      >
        {(field) => (
          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            value={field.state.value}
            onChange={(v) => field.handleChange(v)}
            onBlur={field.handleBlur}
            isInvalid={field.state.meta.errors.length > 0}
          >
            <Label>{t("confirmPassword")}</Label>
            <Input placeholder={t("confirmPasswordPlaceholder")} />
            {field.state.meta.errors.length > 0 && (
              <FieldError>{field.state.meta.errors[0]}</FieldError>
            )}
          </TextField>
        )}
      </form.Field>

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
