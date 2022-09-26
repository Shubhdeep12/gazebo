import cs from 'classnames'
import uniqueId from 'lodash/uniqueId'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'

const Checkbox = forwardRef(
  ({ label, showLabel = true, disabled, ...props }, ref) => {
    const id = uniqueId('radio-input')
    const { className, ...newProps } = props

    return (
      <div
        className={cs('flex items-center flex-wrap', {
          'text-ds-gray-quaternary': disabled,
          'text-ds-gray-octonary': !disabled,
        })}
      >
        <input
          id={id}
          ref={ref}
          disabled={disabled}
          className="cursor-pointer mr-2"
          type="checkbox"
          {...newProps}
        />
        <label
          htmlFor={id}
          className={cs('cursor-pointer', { 'sr-only': showLabel === false })}
        >
          {label}
        </label>
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

Checkbox.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  showLabel: PropTypes.bool,
}

export default Checkbox