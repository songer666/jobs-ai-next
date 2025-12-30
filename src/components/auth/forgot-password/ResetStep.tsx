'use client';

import { useTranslations } from 'next-intl';
import { useForm } from '@tanstack/react-form';
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from '@heroui/react';
import { passwordSchema } from '@/api/auth';
import { authStyles } from '../shared';

interface ResetStepProps {
  onSubmit: (newPassword: string) => Promise<void>;
  isPending: boolean;
}

export default function ResetStep({ onSubmit, isPending }: ResetStepProps) {
  const t = useTranslations('auth');

  const form = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value.newPassword);
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
        name="newPassword"
        validators={{
          onChange: ({ value }) => {
            const result = passwordSchema.safeParse(value);
            if (!result.success) {
              return t('passwordTooShort');
            }
            return undefined;
          },
        }}
      >
        {(field) => (
          <TextField
            isRequired
            name="newPassword"
            type="password"
            value={field.state.value}
            onChange={(v) => field.handleChange(v)}
            onBlur={field.handleBlur}
            isInvalid={field.state.meta.errors.length > 0}
          >
            <Label>{t('newPassword')}</Label>
            <Input placeholder={t('newPasswordPlaceholder')} />
            {field.state.meta.errors.length > 0 && (
              <FieldError>{field.state.meta.errors[0]}</FieldError>
            )}
          </TextField>
        )}
      </form.Field>

      <form.Field
        name="confirmPassword"
        validators={{
          onChangeListenTo: ['newPassword'],
          onChange: ({ value, fieldApi }) => {
            const newPassword = fieldApi.form.getFieldValue('newPassword');
            if (value !== newPassword) {
              return t('passwordMismatch');
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
            <Label>{t('confirmPassword')}</Label>
            <Input placeholder={t('confirmPasswordPlaceholder')} />
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
        {t('resetPassword')}
      </Button>
    </Form>
  );
}
