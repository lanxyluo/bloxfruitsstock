import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  variant?: 'default' | 'filled' | 'outlined';
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ onSearch, placeholder = "Search fruits...", className, variant = 'default', ...props }, ref) => {
    const [query, setQuery] = useState('');
    
    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch?.(query);
    };
    
    const handleClear = () => {
      setQuery('');
      onSearch?.('');
    };
    
    const baseClasses = "flex items-center w-full rounded-lg border border-border bg-background transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary";
    
    const variantClasses = {
      default: "bg-background/50",
      filled: "bg-card/50",
      outlined: "bg-transparent border-2"
    };
    
    return (
      <form onSubmit={handleSearch} className="relative w-full">
        <div className={cn(baseClasses, variantClasses[variant], className)}>
          <div className="flex items-center pl-3 pr-2">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            ref={ref}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent px-3 py-3 text-white placeholder:text-muted-foreground focus:outline-none"
            {...props}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center justify-center p-2 text-muted-foreground hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export { SearchBar };
