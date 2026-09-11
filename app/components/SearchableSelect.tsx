import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

interface SearchableSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}

export default function SearchableSelect({ options, value, onChange, placeholder, disabled }: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const uniqueOptions = Array.from(new Set(options));
  const filteredOptions = uniqueOptions.filter(opt => opt.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div 
        className={`glass-card-inner text-white rounded-lg px-4 py-3 outline-none transition-colors flex items-center justify-between border border-transparent ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer focus-within:border-ravex-purple hover:border-white/20'}`}
        onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen);
            if (!isOpen) setSearch("");
          }
        }}
        tabIndex={disabled ? -1 : 0}
      >
        <span className={value ? "text-white truncate" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 glass-card-inner rounded-lg shadow-2xl max-h-60 flex flex-col overflow-hidden border border-white/10 bg-black/90 backdrop-blur-xl">
          <div className="p-3 border-b border-white/10 flex items-center gap-2 sticky top-0 bg-black/50 backdrop-blur-md">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="bg-transparent text-white outline-none w-full text-sm"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto flex-1 p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div 
                  key={opt}
                  className={`px-3 py-2 rounded-md cursor-pointer text-sm text-gray-200 transition-colors ${value === opt ? 'bg-ravex-purple/20 text-white' : 'hover:bg-white/10'}`}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                    setSearch("");
                  }}
                >
                  {opt}
                </div>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-sm text-gray-500">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
