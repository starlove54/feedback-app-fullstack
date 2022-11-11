import PropTypes from 'prop-types'
function Button({children, version, isDisabled, type}) {
  return (
    <button type = {type} disabled = {isDisabled} className = {`btn btn-${version}`}>
      {children}
    </button>
  )
}

Button.defaultProps = {
    version: 'primary',
    isDisabled: false,
    type : 'button'
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    version : PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired 
}

export default Button
