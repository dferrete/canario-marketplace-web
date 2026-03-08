"use client";

import { useEffect, useState } from "react";
import { adminService, UserResponse } from "@/services/admin.service";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Star, Search, Loader2, UserCheck, UserX, ShieldBan, Eye, CheckCircle, Clock, AlertTriangle, ShieldAlert } from "lucide-react";
import { Pagination } from "@/components/ui/Pagination";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/contexts/I18nContext";

export function UserTableSection({
    eyebrow,
    title,
    subtitle,
    roleParam
}: {
    eyebrow: string;
    title: string;
    subtitle: string;
    roleParam: "ROLE_USER" | "ROLE_VET" | "ROLE_LOGISTICS";
}) {
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<number | null>(null);
    const [activeStatus, setActiveStatus] = useState<string>("ALL");
    const [searchTerm, setSearchTerm] = useState("");
    const { t } = useI18n();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const data = await adminService.getAllUsers(currentPage, 10, searchTerm, roleParam, activeStatus);
            setUsers(data.content);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchUsers();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, activeStatus, searchTerm, roleParam]);

    const handleApprove = async (id: number) => {
        setActionLoading(id);
        try {
            await adminService.approveUser(id);
            toast.success(t("admin.users.toastApproveSuccess"));
            fetchUsers();
        } catch (error) {
            toast.error(t("admin.users.toastApproveError"));
        } finally {
            setActionLoading(null);
        }
    };

    const handleSuspend = async (id: number) => {
        setActionLoading(id);
        try {
            await adminService.suspendUser(id);
            toast.success(t("admin.users.toastSuspendSuccess"));
            fetchUsers();
        } catch (error) {
            toast.error(t("admin.users.toastSuspendError"));
        } finally {
            setActionLoading(null);
        }
    };

    const handleBlock = async (id: number) => {
        if (confirm(t("admin.users.confirmBlock"))) {
            setActionLoading(id);
            try {
                await adminService.blockUser(id);
                toast.success(t("admin.users.toastBlockSuccess"));
                fetchUsers();
            } catch (error) {
                toast.error(t("admin.users.toastBlockError"));
            } finally {
                setActionLoading(null);
            }
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">{t("admin.users.status.labelActive")}</Badge>;
            case "PENDING_APPROVAL":
                return <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20">{t("admin.users.status.labelPending")}</Badge>;
            case "SUSPENDED":
                return <Badge variant="destructive" className="bg-orange-500/10 text-orange-600 border-orange-500/20">{t("admin.users.status.labelSuspended")}</Badge>;
            case "BLOCKED":
                return <Badge variant="destructive" className="bg-red-500/10 text-red-600 border-red-500/20">{t("admin.users.status.labelBlocked")}</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getRoleBadge = (role: string) => {
        switch (role) {
            case "ROLE_ADMIN":
                return <span className="text-purple-600 font-medium text-xs">{t("admin.users.roles.admin")}</span>;
            case "ROLE_USER":
                return <span className="text-blue-600 font-medium text-xs">{t("admin.users.roles.member")}</span>;
            case "ROLE_LOGISTICS":
                return <span className="text-amber-600 font-medium text-xs">{t("admin.users.roles.carrier")}</span>;
            case "ROLE_VET":
                return <span className="text-emerald-600 font-medium text-xs">{t("admin.users.roles.vet")}</span>;
            default:
                return <span className="text-gray-600 font-medium text-xs">{t("admin.users.roles.unknown")}</span>;
        }
    };

    return (
        <div className="mb-16">
            <div className="flex flex-col mb-6 gap-2">
                <div>
                    <span className="text-primary font-semibold tracking-wider uppercase text-xs mb-1 block">{eyebrow}</span>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
                    <p className="text-muted-foreground mt-1">
                        {subtitle}
                    </p>
                </div>
            </div>

            {/* Mockup de Quantificação Rápida */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div
                    onClick={() => { setActiveStatus("ACTIVE"); setCurrentPage(0); }}
                    className={`bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer transition-all hover:-translate-y-1 ${activeStatus === "ACTIVE" ? "border-emerald-500 ring-1 ring-emerald-500/50" : "hover:border-emerald-200"}`}
                >
                    <div>
                        <p className={`text-sm font-medium mb-1 ${activeStatus === "ACTIVE" ? "text-emerald-700 font-bold" : "text-gray-500"}`}>{t("admin.users.status.active")}</p>
                        <h4 className="text-2xl font-bold text-gray-900">--</h4>
                    </div>
                    <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5" />
                    </div>
                </div>

                <div
                    onClick={() => { setActiveStatus("PENDING_APPROVAL"); setCurrentPage(0); }}
                    className={`bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer transition-all hover:-translate-y-1 ${activeStatus === "PENDING_APPROVAL" ? "border-amber-500 ring-1 ring-amber-500/50" : "hover:border-amber-200"}`}
                >
                    <div>
                        <p className={`text-sm font-medium mb-1 ${activeStatus === "PENDING_APPROVAL" ? "text-amber-700 font-bold" : "text-gray-500"}`}>{t("admin.users.status.pending")}</p>
                        <h4 className="text-2xl font-bold text-gray-900">--</h4>
                    </div>
                    <div className="h-10 w-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5" />
                    </div>
                </div>

                <div
                    onClick={() => { setActiveStatus("SUSPENDED"); setCurrentPage(0); }}
                    className={`bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer transition-all hover:-translate-y-1 ${activeStatus === "SUSPENDED" ? "border-orange-500 ring-1 ring-orange-500/50" : "hover:border-orange-200"}`}
                >
                    <div>
                        <p className={`text-sm font-medium mb-1 ${activeStatus === "SUSPENDED" ? "text-orange-700 font-bold" : "text-gray-500"}`}>{t("admin.users.status.suspended")}</p>
                        <h4 className="text-2xl font-bold text-gray-900">--</h4>
                    </div>
                    <div className="h-10 w-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                </div>

                <div
                    onClick={() => { setActiveStatus("BLOCKED"); setCurrentPage(0); }}
                    className={`bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer transition-all hover:-translate-y-1 ${activeStatus === "BLOCKED" ? "border-red-500 ring-1 ring-red-500/50" : "hover:border-red-200"}`}
                >
                    <div>
                        <p className={`text-sm font-medium mb-1 ${activeStatus === "BLOCKED" ? "text-red-700 font-bold" : "text-gray-500"}`}>{t("admin.users.status.blocked")}</p>
                        <h4 className="text-2xl font-bold text-gray-900">--</h4>
                    </div>
                    <div className="h-10 w-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
                        <ShieldAlert className="w-5 h-5" />
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl border shadow-sm mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row w-full gap-3">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder={t("admin.users.searchPlaceholder")}
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(0); }}
                            className="pl-9 w-full bg-gray-50"
                        />
                    </div>
                    <select
                        className="flex h-10 items-center justify-between rounded-md border border-input bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary w-full sm:w-48 cursor-pointer"
                        value={activeStatus}
                        onChange={(e) => { setActiveStatus(e.target.value); setCurrentPage(0); }}
                    >
                        <option value="ALL">{t("admin.users.status.all")}</option>
                        <option value="ACTIVE">{t("admin.users.status.active")}</option>
                        <option value="PENDING_APPROVAL">{t("admin.users.status.pending")}</option>
                        <option value="SUSPENDED">{t("admin.users.status.suspended")}</option>
                        <option value="BLOCKED">{t("admin.users.status.blocked")}</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="overflow-x-auto min-h-[250px]">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-gray-50/80 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">{t("admin.users.colId")}</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">{t("admin.users.colUser")}</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">{t("admin.users.colRole")}</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">{t("admin.users.colRating")}</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">{t("admin.users.colStatus")}</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs text-right">{t("admin.users.colActions")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="py-16 text-center">
                                        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                                        <p className="text-gray-500">{t("admin.users.loading")}</p>
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-16 text-center">
                                        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Search className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <p className="text-gray-600 font-medium">{t("admin.users.emptyTitle")}</p>
                                        <p className="text-gray-400 text-sm mt-1">{t("admin.users.emptyDesc")}</p>
                                    </td>
                                </tr>
                            ) : (
                                users.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4 font-mono text-gray-500 text-xs">
                                            #{u.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm">
                                                    {u.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{u.name}</div>
                                                    <div className="text-xs text-gray-500 flex flex-col gap-0.5 mt-0.5">
                                                        <span>{u.email}</span>
                                                        <span className="text-gray-400">{u.cpf} • {u.phone || t("admin.users.noPhone")}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-middle">
                                            <div className="flex flex-col gap-1 items-start">
                                                {getRoleBadge(u.role)}
                                                {u.partnerDocumentType && (
                                                    <span className="text-xs font-mono bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">
                                                        {u.partnerDocumentType}: {u.partnerDocumentNumber}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-middle">
                                            <div className="flex items-center gap-1.5 bg-yellow-50 text-yellow-700 w-fit px-2.5 py-1 rounded border border-yellow-200 shadow-sm">
                                                <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                                                <span className="font-bold text-xs">{u.rating ? u.rating.toFixed(1) : "5.0"}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-middle">
                                            {getStatusBadge(u.status)}
                                        </td>
                                        <td className="px-6 py-4 text-right align-middle">
                                            <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-primary/10 rounded-full" title={t("admin.users.actionView")}>
                                                    <Eye size={18} />
                                                </button>

                                                {u.status === "PENDING_APPROVAL" && (
                                                    <button
                                                        disabled={actionLoading === u.id}
                                                        onClick={() => handleApprove(u.id)}
                                                        className="p-2 text-emerald-500 hover:text-emerald-600 transition-colors hover:bg-emerald-500/10 rounded-full"
                                                        title={t("admin.users.actionApprove")}
                                                    >
                                                        {actionLoading === u.id ? <Loader2 size={18} className="animate-spin" /> : <UserCheck size={18} />}
                                                    </button>
                                                )}

                                                {u.status === "ACTIVE" && u.role !== "ROLE_ADMIN" && (
                                                    <button
                                                        disabled={actionLoading === u.id}
                                                        onClick={() => handleSuspend(u.id)}
                                                        className="p-2 text-orange-500 hover:text-orange-600 transition-colors hover:bg-orange-500/10 rounded-full"
                                                        title={t("admin.users.actionSuspend")}
                                                    >
                                                        {actionLoading === u.id ? <Loader2 size={18} className="animate-spin" /> : <ShieldBan size={18} />}
                                                    </button>
                                                )}

                                                {u.role !== "ROLE_ADMIN" && u.status !== "BLOCKED" && (
                                                    <button
                                                        disabled={actionLoading === u.id}
                                                        onClick={() => handleBlock(u.id)}
                                                        className="p-2 text-red-500 hover:text-red-600 transition-colors hover:bg-red-500/10 rounded-full"
                                                        title={t("admin.users.actionBlock")}
                                                    >
                                                        {actionLoading === u.id ? <Loader2 size={18} className="animate-spin" /> : <UserX size={18} />}
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {!isLoading && totalElements > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalElements={totalElements}
                    onPageChange={setCurrentPage}
                    className="mt-6"
                />
            )}
        </div>
    );
}
