import Breadcrumb from 'ui/Breadcrumb'

import { useCrumbs } from './context'

function PlanBreadcrumb() {
  const crumbs = useCrumbs()

  return (
    <div className="mx-6 md:mx-0 flex flex-row">
      <Breadcrumb paths={crumbs} />
    </div>
  )
}

export default PlanBreadcrumb