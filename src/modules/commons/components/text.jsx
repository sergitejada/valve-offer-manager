import PropTypes from 'prop-types'

export default function Text({ as = 'p', children, className = '', ...props }) {
  const Component = as

  const baseStyles = 'text-gray-900 dark:text-gray-100'
  const styles = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-bold',
    h4: 'text-xl font-bold',
    h5: 'text-lg font-bold',
    h6: 'text-base font-bold',
    p: 'text-base',
  }

  const combinedClassName = `${baseStyles} ${styles[as]} ${className}`.trim()

  return (
    <Component className={combinedClassName} {...props}>
      {children}
    </Component>
  )
}

Text.propTypes = {
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']),
  children: PropTypes.node,
  className: PropTypes.string,
}
