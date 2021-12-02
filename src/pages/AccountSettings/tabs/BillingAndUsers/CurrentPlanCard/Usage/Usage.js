import { accountDetailsPropType } from 'services/account'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
import Progress from 'ui/Progress'
import Icon from 'ui/Icon'
import A from 'ui/A'

const getRollingTimeWindow = () => {
  const month = new Date().getMonth() + 1
  const day = new Date().getDate()
  const today = `${month}/${day}`

  const prevMonth = month === 1 ? 12 : month - 1
  const monthAgo = `${prevMonth}/${day}`

  return `${monthAgo} - ${today}`
}

function Usage({ accountDetails, isFreePlan, show = false }) {
  const uploadsNumber = 250 //to do - get the uploads per owner
  const progressAmount = (uploadsNumber * 100) / 250
  const isUsageExceeded = uploadsNumber >= 250
  const curDates = getRollingTimeWindow()

  return (
    <div className="flex flex-col">
      <h2 className="font-semibold">Usage</h2>
      <p className="mt-4">
        {accountDetails.activatedUserCount ?? 0} of{' '}
        {accountDetails.plan.quantity ?? 0} users
      </p>
      {show && ( //we would change this condition to check if the plan is free.
        <Fragment>
          <p className="mt-4">
            {uploadsNumber} of 250 uploads month {curDates}
          </p>
          <div className="mt-4">
            <Progress amount={progressAmount} label={false} useUsage={true} />
          </div>
          {isUsageExceeded && (
            <div className="mt-4 flex flex-col">
              <div className="flex flex-row">
                <span className="text-ds-primary-red">
                  <Icon name="exclamation" variant="solid" />{' '}
                </span>
                <p className="font-semibold ml-1">
                  usage exceeded upload limit
                </p>
              </div>
              <p className="mt-4">
                <span className="font-semibold">Tip:</span> upgrade to 6 users
                for unlimited uploads{' '}
                <A to={{ pageName: 'upgradePlan' }}> upgrade today </A>
              </p>
            </div>
          )}
        </Fragment>
      )}
      <hr className="my-6" />
    </div>
  )
}

Usage.propTypes = {
  accountDetails: accountDetailsPropType.isRequired,
  isFreePlan: PropTypes.bool.isRequired,
  show: PropTypes.bool,
}

export default Usage
