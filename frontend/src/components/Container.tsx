interface ContainerProps {
  children: React.ReactNode
  className?: string
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={`flex flex-col h-full flex-grow space-y-4 bg-container-light p-8 rounded-md shadow-md ${className}`}
    >
      {children}
    </div>
  )
}

export default Container
