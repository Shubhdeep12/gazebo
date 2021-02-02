import Card from 'ui/Card'
import { accountDetailsPropType } from 'services/account'

import ActionsBilling from './ActionsBilling'
import BenefitList from '../../../shared/BenefitList'

function CurrentPlanCard({ accountDetails }) {
  const plan = accountDetails.rootOrganization?.plan ?? accountDetails.plan
  const isFreePlan = plan.value === 'users-free'

  return (
    <Card className="px-12 py-10 pb-4 mb-4">
      <h3 className="text-lg text-pink-500 font-bold">{plan.marketingName}</h3>
      <h2 className="text-4xl uppercase">
        {isFreePlan ? 'Free' : `$${plan.baseUnitPrice}`}
      </h2>
      <div className="mt-8 text-sm border-gray-200">
        <BenefitList
          iconName="check"
          iconColor="text-pink-500"
          benefits={plan.benefits}
        />
      </div>
      <hr className="my-6" />
      <p className="mt-4">
        {accountDetails.activatedUserCount ?? 0} /{' '}
        {accountDetails.plan.quantity ?? 0} Active users
      </p>
      <p className="mt-3 text-codecov-red font-bold" data-test="inactive-users">
        {accountDetails.inactiveUserCount} Inactive users
      </p>

      <div className="flex flex-col items-center mt-6">
        <ActionsBilling
          accountDetails={accountDetails}
          isFreePlan={isFreePlan}
        />
      </div>
    </Card>
  )
}

CurrentPlanCard.propTypes = {
  accountDetails: accountDetailsPropType.isRequired,
}

export default CurrentPlanCard
