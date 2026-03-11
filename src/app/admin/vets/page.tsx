"use client";

import { UserTableSection } from "@/components/admin/UserTableSection";
import { useI18n } from "@/contexts/I18nContext";

export default function AdminVetsPage() {
    const { t } = useI18n();

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <UserTableSection
                eyebrow={t("admin.pages.vets.eyebrow")}
                title={t("admin.pages.vets.title")}
                subtitle={t("admin.pages.vets.subtitle")}
                roleParam="ROLE_VET"
            />
        </div>
    );
}
