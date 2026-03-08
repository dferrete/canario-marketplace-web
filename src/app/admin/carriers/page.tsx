"use client";

import { UserTableSection } from "@/components/admin/UserTableSection";
import { useI18n } from "@/contexts/I18nContext";

export default function AdminCarriersPage() {
    const { t } = useI18n();

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <UserTableSection
                eyebrow={t("admin.pages.carriers.eyebrow")}
                title={t("admin.pages.carriers.title")}
                subtitle={t("admin.pages.carriers.subtitle")}
                roleParam="ROLE_LOGISTICS"
            />
        </div>
    );
}
