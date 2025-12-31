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
  Description,
} from "@heroui/react";
import { emailSchema } from "@/api/auth";
import { authStyles } from "../shared";

interface EmailStepProps {
  onSubmit: (email: string) => Promise<void>;
  isPending: boolean;
}

export default function EmailStep({ onSubmit, isPending }: EmailStepProps) {
  const t = useTranslations("auth");

  const form = useForm({
    defaultValues: { email: "" },
    onSubmit: async ({ value }) => {
      await onSubmit(value.email);
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
            <Description>{t("forgotDesc")}</Description>
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
        {t("sendOTP")}
      </Button>
    </Form>
  );
}
