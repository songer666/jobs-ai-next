"use client";

import Link from "next/link";
import {
  Target,
  FileText,
  BarChart3,
  HelpCircle,
  Calendar,
  ChevronRight,
  Loader2,
  Sparkles,
  Clock,
} from "lucide-react";
import { useDashboardData } from "@/api/dashboard";
import { useTranslations } from "next-intl";

const styles = {
  wrapper: "space-y-4 sm:space-y-6",
  welcome: {
    card: "relative overflow-hidden bg-[#1a1528] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-8",
    gradient:
      "absolute inset-0 bg-gradient-to-r from-[#fd409a]/20 to-[#f5a867]/20",
    content: "relative z-10 space-y-1 sm:space-y-2",
    title: "text-xl sm:text-2xl font-bold text-white",
    subtitle: "text-sm sm:text-base text-white/60",
  },
  stats: {
    grid: "grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4",
    card: "bg-[#1a1528] border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5 hover:border-[#fd409a]/30 transition-colors",
    icon: "w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3",
    value: "text-xl sm:text-3xl font-bold text-white mb-1",
    label: "text-white/50 text-xs sm:text-sm",
  },
  section: {
    wrapper:
      "bg-[#1a1528] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6",
    header: "flex items-center justify-between mb-4 sm:mb-5",
    title: "text-base sm:text-lg font-bold text-white flex items-center gap-2",
    viewAll:
      "text-[#fd409a] text-xs sm:text-sm hover:text-[#f5a867] flex items-center gap-1",
  },
  actions: {
    grid: "grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4",
    card: "bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-5 transition-all hover:border-[#fd409a]/30 group",
    icon: "w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform",
    title: "text-sm sm:text-base text-white font-semibold mb-1",
    description: "text-white/50 text-xs sm:text-sm mb-2 sm:mb-3",
    btn: "text-transparent bg-clip-text bg-gradient-to-r from-[#fd409a] to-[#f5a867] text-xs sm:text-sm font-medium flex items-center gap-1",
  },
  list: {
    wrapper: "space-y-2 sm:space-y-3 w-full",
    item: "flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer",
    icon: "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0",
    iconInner: "w-4 h-4 sm:w-5 sm:h-5",
    content: "flex-1 min-w-0",
    contentTop: "flex items-center gap-2 mb-1",
    badge: "text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full shrink-0",
    title:
      "text-sm sm:text-base text-white font-medium truncate max-w-[105px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-5xl",
    meta: "text-white/50 text-xs sm:text-sm",
    score: "text-sm sm:text-base font-bold shrink-0",
    arrow: "w-4 h-4 sm:w-5 sm:h-5 text-white/30 shrink-0",
  },
  usage: {
    wrapper: "space-y-4",
    item: "space-y-2",
    label: "flex items-center justify-between text-sm",
    labelText: "text-white/70",
    labelValue: "text-white font-medium",
    bar: "h-2 bg-white/10 rounded-full overflow-hidden",
    fill: "h-full rounded-full transition-all duration-500",
  },
  empty: "text-center py-8 text-white/40",
  loading: "flex items-center justify-center py-8",
};

function getScoreColor(score: number | null): string {
  if (score === null) return "text-gray-400";
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-yellow-400";
  return "text-red-400";
}

function getUsageColor(percentage: number): string {
  if (percentage >= 80) return "bg-red-500";
  if (percentage >= 50) return "bg-yellow-500";
  return "bg-gradient-to-r from-[#fd409a] to-[#f5a867]";
}

export default function DashboardOverview() {
  const t = useTranslations("dashboard");
  const { data, isLoading } = useDashboardData();

  const stats = data
    ? [
        {
          icon: Target,
          value: data.stats.interviewCount,
          label: t("stats.interview"),
          color: "bg-blue-500/20 text-blue-400",
        },
        {
          icon: FileText,
          value: data.stats.resumeCount,
          label: t("stats.resume"),
          color: "bg-purple-500/20 text-purple-400",
        },
        {
          icon: HelpCircle,
          value: data.stats.questionCount,
          label: t("stats.questions"),
          color: "bg-green-500/20 text-green-400",
        },
      ]
    : [];

  const actions = [
    {
      icon: Target,
      title: t("actions.interview.title"),
      desc: t("actions.interview.desc"),
      href: "/dashboard/interview",
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      icon: FileText,
      title: t("actions.resume.title"),
      desc: t("actions.resume.desc"),
      href: "/dashboard/resume-generator",
      color: "bg-purple-500/20 text-purple-400",
    },
    {
      icon: HelpCircle,
      title: t("actions.questions.title"),
      desc: t("actions.questions.desc"),
      href: "/dashboard/questions",
      color: "bg-green-500/20 text-green-400",
    },
  ];

  // 转换最近活动数据
  const getActivityConfig = (
    type: "interview" | "resume" | "analysis" | "question",
  ) => {
    const configs = {
      interview: {
        typeLabel: t("activity.types.interview"),
        icon: Target,
        color: "bg-blue-500/20 text-blue-400",
        basePath: "/dashboard/interview",
      },
      resume: {
        typeLabel: t("activity.types.resume"),
        icon: FileText,
        color: "bg-[#fd409a]/20 text-[#fd409a]",
        basePath: "/dashboard/resume-generator",
      },
      analysis: {
        typeLabel: t("activity.types.analysis"),
        icon: BarChart3,
        color: "bg-purple-500/20 text-purple-400",
        basePath: "/dashboard/analysis",
      },
      question: {
        typeLabel: t("activity.types.question"),
        icon: HelpCircle,
        color: "bg-green-500/20 text-green-400",
        basePath: "/dashboard/questions",
      },
    };
    return configs[type];
  };

  const recentActivities =
    data?.recentActivities.map((activity) => {
      const config = getActivityConfig(activity.type);
      return {
        ...activity,
        typeLabel: config.typeLabel,
        icon: config.icon,
        color: config.color,
        href: `${config.basePath}/${activity.id}`,
        meta: new Date(activity.date).toLocaleDateString("zh-CN"),
      };
    }) || [];

  return (
    <div className={styles.wrapper}>
      {/* Welcome */}
      <div className={styles.welcome.card}>
        <div className={styles.welcome.gradient} />
        <div className={styles.welcome.content}>
          <h2 className={styles.welcome.title}>
            <Sparkles className="w-6 h-6 inline-block mr-2 text-yellow-400" />
            {t("welcome.title")}
          </h2>
          <p className={styles.welcome.subtitle}>{t("welcome.subtitle")}</p>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.stats.grid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.stats.card}>
            <div className={`${styles.stats.icon} ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className={styles.stats.value}>{stat.value}</div>
            <div className={styles.stats.label}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className={styles.section.wrapper}>
            <div className={styles.section.header}>
              <h3 className={styles.section.title}>
                <Sparkles className="w-5 h-5 text-yellow-400" />
                {t("actions.title")}
              </h3>
            </div>
            <div className={styles.actions.grid}>
              {actions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className={styles.actions.card}
                >
                  <div className={`${styles.actions.icon} ${action.color}`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <h4 className={styles.actions.title}>{action.title}</h4>
                  <p className={styles.actions.description}>{action.desc}</p>
                  <span className={styles.actions.btn}>
                    {t("actions.startNow")} <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Usage Stats */}
        <div className={styles.section.wrapper}>
          <div className={styles.section.header}>
            <h3 className={styles.section.title}>
              <Calendar className="w-5 h-5 text-[#fd409a]" />
              {t("usage.title")}
            </h3>
          </div>
          <div className={styles.usage.wrapper}>
            {data?.usage && (
              <>
                <div className={styles.usage.item}>
                  <div className={styles.usage.label}>
                    <span className={styles.usage.labelText}>
                      {t("usage.interview")}
                    </span>
                    <span className={styles.usage.labelValue}>
                      {data.usage.interview.used} / {data.usage.interview.limit}
                    </span>
                  </div>
                  <div className={styles.usage.bar}>
                    <div
                      className={`${styles.usage.fill} ${getUsageColor((data.usage.interview.used / data.usage.interview.limit) * 100)}`}
                      style={{
                        width: `${Math.min((data.usage.interview.used / data.usage.interview.limit) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
                <div className={styles.usage.item}>
                  <div className={styles.usage.label}>
                    <span className={styles.usage.labelText}>
                      {t("usage.resume")}
                    </span>
                    <span className={styles.usage.labelValue}>
                      {data.usage.generate.used} / {data.usage.generate.limit}
                    </span>
                  </div>
                  <div className={styles.usage.bar}>
                    <div
                      className={`${styles.usage.fill} ${getUsageColor((data.usage.generate.used / data.usage.generate.limit) * 100)}`}
                      style={{
                        width: `${Math.min((data.usage.generate.used / data.usage.generate.limit) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
                <div className={styles.usage.item}>
                  <div className={styles.usage.label}>
                    <span className={styles.usage.labelText}>
                      {t("usage.questions")}
                    </span>
                    <span className={styles.usage.labelValue}>
                      {data.usage.question.used} / {data.usage.question.limit}
                    </span>
                  </div>
                  <div className={styles.usage.bar}>
                    <div
                      className={`${styles.usage.fill} ${getUsageColor((data.usage.question.used / data.usage.question.limit) * 100)}`}
                      style={{
                        width: `${Math.min((data.usage.question.used / data.usage.question.limit) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </>
            )}
            <Link
              href="/dashboard/billing"
              className="block mt-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#fd409a] to-[#f5a867] text-sm hover:opacity-80"
            >
              {t("usage.upgrade")}
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={styles.section.wrapper}>
        <div className={styles.section.header}>
          <h3 className={styles.section.title}>
            <Clock className="w-5 h-5 text-green-400" />
            {t("activity.title")}
          </h3>
        </div>
        {isLoading ? (
          <div className={styles.loading}>
            <Loader2 className="w-6 h-6 text-[#fd409a] animate-spin" />
          </div>
        ) : recentActivities.length > 0 ? (
          <div className={styles.list.wrapper}>
            {recentActivities.map((item, index) => (
              <Link key={index} href={item.href} className={styles.list.item}>
                <div className={`${styles.list.icon} ${item.color}`}>
                  <item.icon className={styles.list.iconInner} />
                </div>
                <div className={styles.list.content}>
                  <div className={styles.list.contentTop}>
                    <span className={`${styles.list.badge} ${item.color}`}>
                      {item.typeLabel}
                    </span>
                    <span className={styles.list.title}>{item.title}</span>
                  </div>
                  <div className={styles.list.meta}>{item.meta}</div>
                </div>
                {item.score !== null && (
                  <div
                    className={`${styles.list.score} ${getScoreColor(item.score)}`}
                  >
                    {item.score}
                    {t("activity.score")}
                  </div>
                )}
                <ChevronRight className={styles.list.arrow} />
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>{t("activity.empty")}</div>
        )}
      </div>
    </div>
  );
}
