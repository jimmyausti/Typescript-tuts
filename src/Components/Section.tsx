import{ ReactNode } from 'react'

type SectionProps = {
    title?: string;
    children: ReactNode;
}

const Section = ({ title = 'My subheading', children}: SectionProps) => {
  return (
    <div>
        <h3>{title}</h3>
        <i>{children}</i>
    </div>
  )
}

export default Section