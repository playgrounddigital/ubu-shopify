import cx from 'classnames'
import useBreakpoints from '~/hooks/useBreakpoints'

export interface AuthInputProps {
  id: string
  type: 'email' | 'password' | 'text' | 'textarea'
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
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
  const { isDesktop } = useBreakpoints()
  const inputClasses = cx(
    'w-full rounded-lg bg-white py-5 pl-2 placeholder:text-black lg:rounded-none lg:bg-transparent lg:p-0',
    {
      'text-input': isDesktop,
      'text-base': !isDesktop,
    }
  )

  return (
    <div className={`mb-4 lg:mb-8 lg:border-b lg:border-black lg:pb-4 ${className}`}>
      <label
        htmlFor={id}
        className="sr-only"
      >
        {placeholder}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          placeholder={placeholder}
          className={inputClasses}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={cx(
            'w-full rounded-lg bg-white py-5 pl-2 placeholder:text-black lg:rounded-none lg:bg-transparent lg:p-0',
            {
              'text-input': isDesktop,
              'text-base': !isDesktop,
            }
          )}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
        />
      )}
    </div>
  )
}
