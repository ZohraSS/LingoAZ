interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="🔍 Search any word..."
      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 text-lg outline-none transition focus:border-blue-500"
    />
  );
}