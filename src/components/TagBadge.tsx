import React from 'react';
import { getTagDefinition } from '../utils/tagRegistry';
import { X } from 'lucide-react';

export interface TagBadgeProps {
  tag: string;
  size?: 'xs' | 'sm' | 'md';
  isActive?: boolean;
  count?: number;
  removable?: boolean;
  onRemove?: (e: React.MouseEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  showEmoji?: boolean;
}

export const TagBadge: React.FC<TagBadgeProps> = ({
  tag,
  size = 'xs',
  isActive = false,
  count,
  removable = false,
  onRemove,
  onClick,
  className = '',
  showEmoji = true
}) => {
  const def = getTagDefinition(tag);

  const sizeClasses = {
    xs: 'text-[10px] px-1.5 py-0.5 gap-1 font-bold',
    sm: 'text-xs px-2 py-0.5 gap-1.5 font-bold',
    md: 'text-sm px-2.5 py-1 gap-2 font-bold'
  }[size];

  const interactiveClasses = onClick || onRemove
    ? 'cursor-pointer transition-all active:scale-95 select-none'
    : 'select-none';

  // Filter toolbar active styling
  const activeClasses = isActive
    ? 'ring-2 ring-zinc-950 shadow-xs font-black'
    : '';

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center font-['Oswald'] uppercase tracking-wider rounded border transition-colors ${def.bgClass} ${def.textClass} ${def.borderClass} ${sizeClasses} ${interactiveClasses} ${activeClasses} ${className}`}
    >
      {showEmoji && <span className="shrink-0 leading-none">{def.emoji}</span>}
      <span className="truncate">{def.label}</span>

      {count !== undefined && (
        <span className="ml-0.5 px-1 py-0.2 rounded-full text-[9px] font-mono bg-black/10 text-current">
          {count}
        </span>
      )}

      {removable && onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(e);
          }}
          className="ml-0.5 p-0.5 rounded-full hover:bg-black/15 text-current transition-colors cursor-pointer"
          title={`Remove ${def.label}`}
        >
          <X className="w-2.5 h-2.5" />
        </button>
      )}
    </span>
  );
};
