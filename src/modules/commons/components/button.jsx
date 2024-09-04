import PropTypes from 'prop-types'
export default function Button({ children }) {
  return (
    <button className="focus-visible:ring-ring inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-amber-500 px-4 py-2 text-sm font-medium shadow transition-colors hover:bg-amber-500/90 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50">
      {children}
    </button>
  )
}
Button.propTypes = {
  children: PropTypes.node,
}
