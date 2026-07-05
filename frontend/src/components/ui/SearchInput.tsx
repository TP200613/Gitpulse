import React from "react";
import { Search, Loader2 } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  isLoading: boolean;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onSearch, isLoading, placeholder }) => {
  return (
    <div className="relative flex w-full max-w-xl items-center rounded-xl border border-white/[0.05] bg-black/40 p-1.5 backdrop-blur-md transition-all duration-300 focus-within:border-[#39d353]/30 focus-within:shadow-[0_0_30px_rgba(57,211,83,0.06)]">
      <div className="pl-4 text-gray-500">
        <Search size={18} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        placeholder={placeholder}
        disabled={isLoading}
        className="w-full bg-transparent px-3 py-2 text-sm font-medium text-white placeholder-gray-500 outline-none disabled:cursor-not-allowed"
      />
      <button
        onClick={onSearch}
        disabled={isLoading || !value.trim()}
        className="flex h-9 items-center gap-2 rounded-lg bg-[#238636] px-4 font-mono text-xs font-bold text-white transition-all duration-200 hover:bg-[#2ea043] hover:shadow-[0_0_15px_rgba(46,160,67,0.3)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#238636] disabled:hover:shadow-none"
      >
        {isLoading ? (
          <>
            <Loader2 size={12} className="animate-spin" />
            <span>PARSING</span>
          </>
        ) : (
          <span>RUN_DIAGNOSTICS</span>
        )}
      </button>
    </div>
  );
};