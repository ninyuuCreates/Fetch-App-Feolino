import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  disabled?: boolean;
}

function SearchBar({
  value,
  onChange,
  onSearch,
  disabled = false,
}: SearchBarProps) {
  return (
    <div className="search-wrapper" role="search">
      <Search size={21} className="search-icon" />

      <input
        type="text"
        aria-label="Dog breed"
        placeholder="Search a dog breed..."
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !disabled) onSearch();
        }}
      />

      <button type="button" onClick={onSearch} disabled={disabled}>
        Fetch
      </button>
    </div>
  );
}

export default SearchBar;