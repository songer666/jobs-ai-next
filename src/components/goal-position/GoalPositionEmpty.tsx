"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Plus, Target } from "lucide-react";
import { Button } from "@heroui/react";

export function GoalPositionEmpty() {
  const t = useTranslations("goalPosition");

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
        <Target className="w-10 h-10 text-white/40" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{t("empty")}</h3>
      <p className="text-white/60 text-center mb-8 max-w-md">
        {t("emptyDesc")}
      </p>
      <Link href="/dashboard/goal-position/new">
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          {t("create")}
        </Button>
      </Link>
    </div>
  );
}
