interface BodyProps {
  children: React.ReactNode
}

const Body = ({ children }: BodyProps) => {
  return (
    <div className="bg-background-light flex-grow items-center justify-center py-8 px-8 md:py-16 md:px-24 lg:px-48">
      {children}
    </div>
  )
}

export default Body
