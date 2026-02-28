import Link from "next/link";
import { Bird, ShoppingCart, User } from "lucide-react";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors">
                    <Bird className="w-8 h-8" />
                    <span className="font-bold text-xl tracking-tight hidden sm:block">
                        Canário Marketplace
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/" className="text-foreground/80 hover:text-primary font-medium transition-colors">
                        Explorar
                    </Link>
                    <Link href="#" className="text-foreground/80 hover:text-primary font-medium transition-colors">
                        Meus Pedidos
                    </Link>
                    <Link href="#" className="text-foreground/80 hover:text-primary font-medium transition-colors">
                        Vender
                    </Link>
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-4">
                    <button className="p-2 text-foreground/60 hover:text-primary transition-colors rounded-full hover:bg-primary/5">
                        <ShoppingCart className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-3 border-l border-border pl-4">
                        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                            <User className="w-5 h-5" />
                        </button>
                        <div className="hidden sm:flex flex-col text-sm">
                            <span className="font-semibold text-foreground leading-none">Minha Conta</span>
                            <span className="text-foreground/60 text-xs">Admin</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
