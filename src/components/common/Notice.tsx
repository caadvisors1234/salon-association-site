import { AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedSection } from './AnimatedSection';

type NoticeVariant = 'warning' | 'info';

interface NoticeProps {
  title: string;
  items: string[];
  variant: NoticeVariant;
  className?: string;
}

const variantConfig = {
  warning: {
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-400 dark:border-yellow-500',
    iconColor: 'text-yellow-400 dark:text-yellow-500',
    titleColor: 'text-yellow-800 dark:text-yellow-200',
    textColor: 'text-yellow-700 dark:text-yellow-300',
    Icon: AlertTriangle,
  },
  info: {
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-400 dark:border-blue-500',
    iconColor: 'text-blue-400 dark:text-blue-500',
    titleColor: 'text-blue-800 dark:text-blue-200',
    textColor: 'text-blue-700 dark:text-blue-300',
    Icon: Info,
  },
};

export function Notice({ title, items, variant, className }: NoticeProps) {
  const config = variantConfig[variant];
  const { Icon } = config;

  return (
    <AnimatedSection className={cn('max-w-4xl mx-auto', className)}>
      <div
        className={cn(
          'border-l-4 p-6 rounded-r-lg',
          config.bgColor,
          config.borderColor
        )}
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <Icon className={cn('h-5 w-5', config.iconColor)} aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className={cn('text-lg font-medium', config.titleColor)}>
              {title}
            </h3>
            <div className={cn('mt-2 text-sm', config.textColor)}>
              <ul className="list-disc space-y-2 pl-5">
                {items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
} 