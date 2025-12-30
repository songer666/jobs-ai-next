'use client';

import { useEffect, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import {
    Form,
    TextField,
    Label,
    Input,
    Button,
    NumberField,
    TextArea,
    Switch,
} from '@heroui/react';
import { 
    User, 
    Phone, 
    MapPin, 
    Briefcase, 
    GraduationCap, 
    Clock, 
    Code, 
    Target, 
    DollarSign,
    Github,
    Linkedin,
    Globe,
    Loader2, 
    Edit,
    Award,
    Languages,
    FolderGit2
} from 'lucide-react';
import { useProfile, useUpdateProfile, type UpdateProfileData } from '@/api/profile';
import { useTranslations } from 'next-intl';

const styles = {
    card: 'bg-[#1a1528] rounded-xl border border-white/10 p-6',
    header: 'flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6',
    title: 'text-white font-medium flex items-center gap-2',
    switchWrapper: 'flex items-center gap-2',
    switchLabel: 'text-sm text-white/80',
    form: 'space-y-6',
    section: 'space-y-4',
    sectionTitle: 'text-white/80 font-medium text-sm border-b border-white/10 pb-2 mb-4',
    fieldGrid: 'grid grid-cols-1 md:grid-cols-2 gap-4',
    fieldIcon: 'w-4 h-4 text-white/60',
    loading: 'flex items-center justify-center py-12',
};

export function PersonalInfoForm() {
    const { data: profile, isLoading } = useProfile();
    const updateProfileMutation = useUpdateProfile();
    const [isEditMode, setIsEditMode] = useState(false);
    const t = useTranslations('settings.personal');

    const form = useForm({
        defaultValues: {
            realName: '',
            phone: '',
            location: '',
            summary: '',
            jobTarget: '',
            expectedSalary: '',
            workYears: 0,
            education: '',
            workExperience: '',
            projects: '',
            skills: '',
            certificates: '',
            languages: '',
            selfEvaluation: '',
            github: '',
            linkedin: '',
            portfolio: '',
        },
        onSubmit: async ({ value }) => {
            const data: UpdateProfileData = {};
            
            if (value.realName) data.realName = value.realName;
            if (value.phone) data.phone = value.phone;
            if (value.location) data.location = value.location;
            if (value.summary) data.summary = value.summary;
            if (value.jobTarget) data.jobTarget = value.jobTarget;
            if (value.expectedSalary) data.expectedSalary = value.expectedSalary;
            if (value.workYears > 0) data.workYears = value.workYears;
            if (value.education) data.education = value.education;
            if (value.workExperience) data.workExperience = value.workExperience;
            if (value.projects) data.projects = value.projects;
            if (value.skills) data.skills = value.skills;
            if (value.certificates) data.certificates = value.certificates;
            if (value.languages) data.languages = value.languages;
            if (value.selfEvaluation) data.selfEvaluation = value.selfEvaluation;
            if (value.github) data.github = value.github;
            if (value.linkedin) data.linkedin = value.linkedin;
            if (value.portfolio) data.portfolio = value.portfolio;
            
            updateProfileMutation.mutate(data);
        },
    });

    useEffect(() => {
        if (profile) {
            form.setFieldValue('realName', profile.realName || '');
            form.setFieldValue('phone', profile.phone || '');
            form.setFieldValue('location', profile.location || '');
            form.setFieldValue('summary', profile.summary || '');
            form.setFieldValue('jobTarget', profile.jobTarget || '');
            form.setFieldValue('expectedSalary', profile.expectedSalary || '');
            form.setFieldValue('workYears', profile.workYears || 0);
            form.setFieldValue('education', profile.education || '');
            form.setFieldValue('workExperience', profile.workExperience || '');
            form.setFieldValue('projects', profile.projects || '');
            form.setFieldValue('skills', profile.skills || '');
            form.setFieldValue('certificates', profile.certificates || '');
            form.setFieldValue('languages', profile.languages || '');
            form.setFieldValue('selfEvaluation', profile.selfEvaluation || '');
            form.setFieldValue('github', profile.github || '');
            form.setFieldValue('linkedin', profile.linkedin || '');
            form.setFieldValue('portfolio', profile.portfolio || '');
        }
    }, [profile]);

    if (isLoading) {
        return (
            <div className={styles.card}>
                <div className={styles.loading}>
                    <Loader2 className="w-8 h-8 text-white/40 animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div>
                    <h3 className={styles.title}>
                        <User className="w-5 h-5" />
                        {t('title')}
                    </h3>
                    <p className="text-white/60 text-sm mt-2">
                        {t('subtitle')}
                    </p>
                </div>
                <div className={styles.switchWrapper}>
                    <Switch
                        isSelected={isEditMode}
                        onChange={setIsEditMode}
                        size="sm"
                    >
                        <Switch.Control>
                            <Switch.Thumb />
                        </Switch.Control>
                    </Switch>
                    <span className={styles.switchLabel}>
                        <Edit className="w-4 h-4 inline mr-1" />
                        {t('editMode')}
                    </span>
                </div>
            </div>

            <Form
                className={styles.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                {/* 基本信息 */}
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>{t('sections.basic')}</div>
                    <div className={styles.fieldGrid}>
                        <form.Field name="realName">
                            {(field) => (
                                <TextField
                                    name="realName"
                                    value={field.state.value}
                                    onChange={(v) => field.handleChange(v)}
                                    onBlur={field.handleBlur}
                                    isDisabled={!isEditMode}
                                >
                                    <Label className="flex items-center gap-2">
                                        <User className={styles.fieldIcon} />
                                        {t('fields.realName')}
                                    </Label>
                                    <Input placeholder={t('fields.realNamePlaceholder')} />
                                </TextField>
                            )}
                        </form.Field>

                        <form.Field name="phone">
                            {(field) => (
                                <TextField
                                    name="phone"
                                    value={field.state.value}
                                    onChange={(v) => field.handleChange(v)}
                                    onBlur={field.handleBlur}
                                    isDisabled={!isEditMode}
                                >
                                    <Label className="flex items-center gap-2">
                                        <Phone className={styles.fieldIcon} />
                                        {t('fields.phone')}
                                    </Label>
                                    <Input placeholder={t('fields.phonePlaceholder')} />
                                </TextField>
                            )}
                        </form.Field>

                        <form.Field name="location">
                            {(field) => (
                                <TextField
                                    name="location"
                                    value={field.state.value}
                                    onChange={(v) => field.handleChange(v)}
                                    onBlur={field.handleBlur}
                                    isDisabled={!isEditMode}
                                >
                                    <Label className="flex items-center gap-2">
                                        <MapPin className={styles.fieldIcon} />
                                        {t('fields.location')}
                                    </Label>
                                    <Input placeholder={t('fields.locationPlaceholder')} />
                                </TextField>
                            )}
                        </form.Field>

                        <form.Field name="education">
                            {(field) => (
                                <TextField
                                    name="education"
                                    value={field.state.value}
                                    onChange={(v) => field.handleChange(v)}
                                    onBlur={field.handleBlur}
                                    isDisabled={!isEditMode}
                                >
                                    <Label className="flex items-center gap-2">
                                        <GraduationCap className={styles.fieldIcon} />
                                        {t('fields.education')}
                                    </Label>
                                    <Input placeholder={t('fields.educationPlaceholder')} />
                                </TextField>
                            )}
                        </form.Field>
                    </div>

                    <form.Field name="summary">
                        {(field) => (
                            <TextField
                                name="summary"
                                value={field.state.value}
                                onChange={(v) => field.handleChange(v)}
                                onBlur={field.handleBlur}
                                isDisabled={!isEditMode}
                            >
                                <Label className="flex items-center gap-2">
                                    <User className={styles.fieldIcon} />
                                    {t('fields.summary')}
                                </Label>
                                <TextArea placeholder={t('fields.summaryPlaceholder')} />
                            </TextField>
                        )}
                    </form.Field>
                </div>

                {/* 求职意向 */}
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>{t('sections.job')}</div>
                    <div className={styles.fieldGrid}>
                        <form.Field name="jobTarget">
                            {(field) => (
                                <TextField
                                    name="jobTarget"
                                    value={field.state.value}
                                    onChange={(v) => field.handleChange(v)}
                                    onBlur={field.handleBlur}
                                    isDisabled={!isEditMode}
                                >
                                    <Label className="flex items-center gap-2">
                                        <Target className={styles.fieldIcon} />
                                        {t('fields.jobTarget')}
                                    </Label>
                                    <Input placeholder={t('fields.jobTargetPlaceholder')} />
                                </TextField>
                            )}
                        </form.Field>

                        <form.Field name="expectedSalary">
                            {(field) => (
                                <TextField
                                    name="expectedSalary"
                                    value={field.state.value}
                                    onChange={(v) => field.handleChange(v)}
                                    onBlur={field.handleBlur}
                                    isDisabled={!isEditMode}
                                >
                                    <Label className="flex items-center gap-2">
                                        <DollarSign className={styles.fieldIcon} />
                                        {t('fields.expectedSalary')}
                                    </Label>
                                    <Input placeholder={t('fields.expectedSalaryPlaceholder')} />
                                </TextField>
                            )}
                        </form.Field>

                        <form.Field name="workYears">
                            {(field) => (
                                <NumberField
                                    name="workYears"
                                    value={field.state.value}
                                    onChange={(v) => field.handleChange(v)}
                                    onBlur={field.handleBlur}
                                    minValue={0}
                                    maxValue={50}
                                    isDisabled={!isEditMode}
                                >
                                    <Label className="flex items-center gap-2">
                                        <Clock className={styles.fieldIcon} />
                                        {t('fields.workYears')}
                                    </Label>
                                    <Input placeholder={t('fields.workYearsPlaceholder')} />
                                </NumberField>
                            )}
                        </form.Field>
                    </div>
                </div>

                {/* 工作与项目经历 */}
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>{t('sections.experience')}</div>
                    
                    <form.Field name="workExperience">
                        {(field) => (
                            <TextField
                                name="workExperience"
                                value={field.state.value}
                                onChange={(v) => field.handleChange(v)}
                                onBlur={field.handleBlur}
                                isDisabled={!isEditMode}
                            >
                                <Label className="flex items-center gap-2">
                                    <Briefcase className={styles.fieldIcon} />
                                    {t('fields.workExperience')}
                                </Label>
                                <TextArea placeholder={t('fields.workExperiencePlaceholder')} />
                            </TextField>
                        )}
                    </form.Field>

                    <form.Field name="projects">
                        {(field) => (
                            <TextField
                                name="projects"
                                value={field.state.value}
                                onChange={(v) => field.handleChange(v)}
                                onBlur={field.handleBlur}
                                isDisabled={!isEditMode}
                            >
                                <Label className="flex items-center gap-2">
                                    <FolderGit2 className={styles.fieldIcon} />
                                    {t('fields.projects')}
                                </Label>
                                <TextArea placeholder={t('fields.projectsPlaceholder')} />
                            </TextField>
                        )}
                    </form.Field>
                </div>

                {/* 技能与证书 */}
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>{t('sections.skills')}</div>
                    
                    <form.Field name="skills">
                        {(field) => (
                            <TextField
                                name="skills"
                                value={field.state.value}
                                onChange={(v) => field.handleChange(v)}
                                onBlur={field.handleBlur}
                                isDisabled={!isEditMode}
                            >
                                <Label className="flex items-center gap-2">
                                    <Code className={styles.fieldIcon} />
                                    {t('fields.skills')}
                                </Label>
                                <TextArea placeholder={t('fields.skillsPlaceholder')} />
                            </TextField>
                        )}
                    </form.Field>

                    <div className={styles.fieldGrid}>
                        <form.Field name="certificates">
                            {(field) => (
                                <TextField
                                    name="certificates"
                                    value={field.state.value}
                                    onChange={(v) => field.handleChange(v)}
                                    onBlur={field.handleBlur}
                                    isDisabled={!isEditMode}
                                >
                                    <Label className="flex items-center gap-2">
                                        <Award className={styles.fieldIcon} />
                                        {t('fields.certificates')}
                                    </Label>
                                    <Input placeholder={t('fields.certificatesPlaceholder')} />
                                </TextField>
                            )}
                        </form.Field>

                        <form.Field name="languages">
                            {(field) => (
                                <TextField
                                    name="languages"
                                    value={field.state.value}
                                    onChange={(v) => field.handleChange(v)}
                                    onBlur={field.handleBlur}
                                    isDisabled={!isEditMode}
                                >
                                    <Label className="flex items-center gap-2">
                                        <Languages className={styles.fieldIcon} />
                                        {t('fields.languages')}
                                    </Label>
                                    <Input placeholder={t('fields.languagesPlaceholder')} />
                                </TextField>
                            )}
                        </form.Field>
                    </div>

                    <form.Field name="selfEvaluation">
                        {(field) => (
                            <TextField
                                name="selfEvaluation"
                                value={field.state.value}
                                onChange={(v) => field.handleChange(v)}
                                onBlur={field.handleBlur}
                                isDisabled={!isEditMode}
                            >
                                <Label className="flex items-center gap-2">
                                    <User className={styles.fieldIcon} />
                                    {t('fields.selfEvaluation')}
                                </Label>
                                <TextArea placeholder={t('fields.selfEvaluationPlaceholder')} />
                            </TextField>
                        )}
                    </form.Field>
                </div>

                {/* 社交链接 */}
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>{t('sections.social')}</div>
                    <div className={styles.fieldGrid}>
                        <form.Field name="github">
                            {(field) => (
                                <TextField
                                    name="github"
                                    value={field.state.value}
                                    onChange={(v) => field.handleChange(v)}
                                    onBlur={field.handleBlur}
                                    isDisabled={!isEditMode}
                                >
                                    <Label className="flex items-center gap-2">
                                        <Github className={styles.fieldIcon} />
                                        {t('fields.github')}
                                    </Label>
                                    <Input placeholder={t('fields.githubPlaceholder')} />
                                </TextField>
                            )}
                        </form.Field>

                        <form.Field name="linkedin">
                            {(field) => (
                                <TextField
                                    name="linkedin"
                                    value={field.state.value}
                                    onChange={(v) => field.handleChange(v)}
                                    onBlur={field.handleBlur}
                                    isDisabled={!isEditMode}
                                >
                                    <Label className="flex items-center gap-2">
                                        <Linkedin className={styles.fieldIcon} />
                                        {t('fields.linkedin')}
                                    </Label>
                                    <Input placeholder={t('fields.linkedinPlaceholder')} />
                                </TextField>
                            )}
                        </form.Field>

                        <form.Field name="portfolio">
                            {(field) => (
                                <TextField
                                    name="portfolio"
                                    value={field.state.value}
                                    onChange={(v) => field.handleChange(v)}
                                    onBlur={field.handleBlur}
                                    isDisabled={!isEditMode}
                                >
                                    <Label className="flex items-center gap-2">
                                        <Globe className={styles.fieldIcon} />
                                        {t('fields.portfolio')}
                                    </Label>
                                    <Input placeholder={t('fields.portfolioPlaceholder')} />
                                </TextField>
                            )}
                        </form.Field>
                    </div>
                </div>

                <Button
                    type="submit"
                    fullWidth
                    isPending={updateProfileMutation.isPending}
                    isDisabled={!isEditMode}
                    className="gradient-btn text-white font-semibold rounded-xl h-12 mt-6"
                >
                    {updateProfileMutation.isPending ? t('saving') : t('save')}
                </Button>
            </Form>
        </div>
    );
}
