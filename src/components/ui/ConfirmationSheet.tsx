import type { ReactNode } from 'react';
import { BottomSheet } from './BottomSheet';
import { Button } from './Button';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  loading?: boolean;
}

export function ConfirmationSheet({
  open,
  onClose,
  title,
  children,
  confirmLabel,
  cancelLabel = 'Cancel',
  onConfirm,
  loading,
}: Props) {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <h3 className="font-bold text-ink-800 text-lg mb-4 pr-8">{title}</h3>
      {children}
      <div className="flex flex-col gap-2.5 mt-6">
        <Button fullWidth onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
        <Button fullWidth variant="ghost" onClick={onClose}>
          {cancelLabel}
        </Button>
      </div>
    </BottomSheet>
  );
}
