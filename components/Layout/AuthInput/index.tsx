interface AuthInputProps {
  id: string
  type: 'email' | 'password' | 'text'
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  autoComplete?: string
  required?: boolean
  minLength?: number
  className?: string
}

export default function AuthInput({
  id,
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
  required,
  minLength,
  className = '',
}: AuthInputProps) {
  return (
    <div className={`mb-8 border-b border-black pb-4 ${className}`}>
      <label
        htmlFor={id}
        className="sr-only"
      >
        {placeholder}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="text-input w-full bg-transparent placeholder:text-black"
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
      />
    </div>
  )
}
