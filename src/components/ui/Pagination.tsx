"use client";

import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/I18nContext";

export interface PaginationProps {
    currentPage: number;       // 0-based (matches backend Spring Page)
    totalPages: number;
    totalElements?: number;
    onPageChange: (page: number) => void;
    className?: string;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i);

    const pages: (number | "...")[] = [];

    if (current <= 3) {
        pages.push(0, 1, 2, 3, 4, "...", total - 1);
    } else if (current >= total - 4) {
        pages.push(0, "...", total - 5, total - 4, total - 3, total - 2, total - 1);
    } else {
        pages.push(0, "...", current - 1, current, current + 1, "...", total - 1);
    }

    return pages;
}

export function Pagination({ currentPage, totalPages, totalElements, onPageChange, className }: PaginationProps) {
    const { t } = useI18n();
    const safeTotal = Math.max(totalPages, 1);
    const pages = getPageNumbers(currentPage, safeTotal);

    // Build the info text from i18n strings
    const pageOfText = t("pagination.pageOf")
        .replace("{current}", String(currentPage + 1))
        .replace("{total}", String(safeTotal));

    const recordLabel = totalElements === 1
        ? t("pagination.recordSingular")
        : t("pagination.recordPlural");

    const totalInfoText = totalElements !== undefined
        ? t("pagination.totalInfo")
            .replace("{total}", String(totalElements))
            .replace("{label}", recordLabel)
        : null;

    return (
        <div className={cn("flex flex-col items-center gap-3", className)}>
            {/* Page info */}
            <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{pageOfText}</span>
                {totalInfoText && (
                    <> · <span className="font-semibold text-foreground">{totalInfoText}</span></>
                )}
            </p>

            {/* Nav controls — only shown when there's more than 1 page */}
            {totalPages > 1 && (
                <nav
                    className="flex items-center justify-center gap-1 flex-wrap"
                    aria-label="Pagination"
                >
                    {/* Previous */}
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 px-2.5"
                        disabled={currentPage === 0}
                        onClick={() => onPageChange(currentPage - 1)}
                        aria-label={t("pagination.previous")}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">{t("pagination.previous")}</span>
                    </Button>

                    {/* Page numbers */}
                    {pages.map((page, idx) =>
                        page === "..." ? (
                            <span
                                key={`ellipsis-${idx}`}
                                className="flex h-9 w-9 items-center justify-center text-muted-foreground"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </span>
                        ) : (
                            <Button
                                key={page}
                                variant={page === currentPage ? "default" : "outline"}
                                size="sm"
                                className={cn(
                                    "h-9 w-9 p-0 rounded-full text-sm font-medium transition-all",
                                    page === currentPage && "shadow-md"
                                )}
                                onClick={() => onPageChange(page as number)}
                                aria-label={`${(page as number) + 1}`}
                                aria-current={page === currentPage ? "page" : undefined}
                            >
                                {(page as number) + 1}
                            </Button>
                        )
                    )}

                    {/* Next */}
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 px-2.5"
                        disabled={currentPage === totalPages - 1}
                        onClick={() => onPageChange(currentPage + 1)}
                        aria-label={t("pagination.next")}
                    >
                        <span className="hidden sm:inline">{t("pagination.next")}</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </nav>
            )}
        </div>
    );
}
