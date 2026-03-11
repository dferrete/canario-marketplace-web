"use client";

import { UserTableSection } from "@/components/admin/UserTableSection";
import { useI18n } from "@/contexts/I18nContext";

export default function AdminUsersPage() {
    const { t } = useI18n();

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <UserTableSection
                eyebrow={t("admin.pages.members.eyebrow")}
                title={t("admin.pages.members.title")}
                subtitle={t("admin.pages.members.subtitle")}
                roleParam="ROLE_USER,ROLE_ADMIN"
            />
        </div>
    );
}
