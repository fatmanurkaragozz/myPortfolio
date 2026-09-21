import { ReactNode } from 'react';
import { useLanguage } from '../i18n/useLanguage';

interface AlertProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export default function Alert({
  children,
  variant = "info",
  title,
  dismissible = false,
  onDismiss,
  className = "",
}: AlertProps) {
  const { t } = useLanguage();
  const variants = {
    info: `bg-blue-50 border-blue-500 text-blue-800 dark:bg-blue-950/30 dark:text-blue-200`,
    success: `bg-green-50 border-green-500 text-green-800 dark:bg-green-950/30 dark:text-green-200`,
    warning: `bg-amber-50 border-amber-500 text-amber-800 dark:bg-amber-950/30 dark:text-amber-200`,
    error: `bg-red-50 border-red-500 text-red-800 dark:bg-red-950/30 dark:text-red-200`,
  };

  return (
    <div
      role="alert"
      className={`border-l-4 rounded-r-lg p-4 flex justify-between items-start 
                  ${variants[variant]} ${className}`}
    >
      <div className="flex-1">
        {title && (
          <p className="font-semibold mb-1">
            {title}
          </p>
        )}
        <div className="text-sm opacity-90">
          {children}
        </div>
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className="ml-4 opacity-60 hover:opacity-100 transition-opacity p-1"
          aria-label={t('alert.close')}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
