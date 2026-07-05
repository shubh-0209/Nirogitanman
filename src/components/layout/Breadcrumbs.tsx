import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-1 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <a href={item.href} className="hover:text-primary transition-colors">
                {item.title}
              </a>
            ) : (
              <span className="text-foreground font-medium">{item.title}</span>
            )}
            {index < items.length - 1 && (
              <ChevronRight className="h-4 w-4 mx-1" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
