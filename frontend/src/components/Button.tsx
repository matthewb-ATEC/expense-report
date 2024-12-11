interface ButtonProps {
  text: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  className?: string
}

const Button = ({ text, onClick, disabled, type, className }: ButtonProps) => {
  if (disabled)
    return (
      <button
        type={type ?? 'button'}
        onClick={onClick}
        disabled
        className={`text-text-muted border-text-muted border-2 px-3 py-2 rounded-full ${className}`}
      >
        {text}
      </button>
    )

  return (
    <button
      type={type ?? 'button'}
      onClick={onClick}
      className={`text-white border-2 px-3 py-2 rounded-full transform transition-transform transition-colors duration-300 ease-in-out
        bg-atec-light hover:bg-atec active:bg-atec-light
        border-atec-light hover:border-atec active:border-atec-light
        ${className}`}
    >
      {text}
    </button>
  )
}

export default Button
