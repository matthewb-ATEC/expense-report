import { Link } from 'react-router-dom'

interface NavTabProps {
  name: string
}

const toKebabCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

const NavTab = ({ name }: NavTabProps) => {
  const link = toKebabCase(name)

  return (
    <Link to={`/${link}`}>
      <div className="w-full h-full py-2 px-8 md:px-0 hover:bg-white hover:text-atec transition duration-200 whitespace-nowrap">
        {name}
      </div>
    </Link>
  )
}

export default NavTab
