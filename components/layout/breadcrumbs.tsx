import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="面包屑" className="flex items-center gap-2 text-sm text-muted">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const content = item.href && !isLast ? (
          <Link href={item.href} className="focus-ring rounded-md px-1 text-muted hover:text-foreground">
            {item.label}
          </Link>
        ) : (
          <span className="px-1 text-foreground">{item.label}</span>
        );

        return (
          <span key={item.label} className="flex items-center">
            {content}
            {!isLast && <ChevronRight className="ml-2 h-3.5 w-3.5 text-muted" aria-hidden />}
          </span>
        );
      })}
    </nav>
  );
}
