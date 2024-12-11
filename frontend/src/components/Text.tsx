interface TextProps {
  text: string
  className?: string
}

export const Title = ({ text, className }: TextProps) => {
  return (
    <div className={`text-lg text-text-primary font-bold ${className}`}>
      {text}
    </div>
  )
}

export const Subtitle = ({ text, className }: TextProps) => {
  return (
    <div className={`text-md text-text-secondary font-normal ${className}`}>
      {text}
    </div>
  )
}

export const Header = ({ text, className }: TextProps) => {
  return (
    <div
      className={`text-sm text-text-secondary font-normal uppercase ${className}`}
    >
      {text}
    </div>
  )
}

export const Text = ({ text, className }: TextProps) => {
  return (
    <div className={`text-md text-text-muted font-normal ${className}`}>
      {text}
    </div>
  )
}

export const Subtext = ({ text, className }: TextProps) => {
  return (
    <div className={`text-sm text-text-muted font-light ${className}`}>
      {text}
    </div>
  )
}
