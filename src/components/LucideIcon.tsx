import React from "react";
import {
  BarChart3,
  Cpu,
  Globe,
  LayoutGrid,
  Sparkles,
  Server,
  HelpCircle,
  Menu,
  X,
  ArrowUpRight,
  MessageSquare,
  Linkedin,
  Github,
  Mail,
  User,
  Phone,
  Building2,
  DollarSign,
  Send,
  Check,
  Loader2,
  ChevronDown,
  AlertTriangle,
  Terminal
} from "lucide-react";

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function LucideIcon({ name, className = "", size = 24 }: LucideIconProps) {
  const icons: Record<string, React.ComponentType<any>> = {
    BarChart3,
    Cpu,
    Globe,
    LayoutGrid,
    Sparkles,
    Server,
    HelpCircle,
    Menu,
    X,
    ArrowUpRight,
    MessageSquare,
    Linkedin,
    Github,
    Mail,
    User,
    Phone,
    Building2,
    DollarSign,
    Send,
    Check,
    Loader2,
    ChevronDown,
    AlertTriangle,
    Terminal
  };

  const IconComponent = icons[name] || HelpCircle;
  return <IconComponent className={className} size={size} />;
}
