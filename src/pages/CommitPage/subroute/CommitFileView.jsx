import PropTypes from 'prop-types'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useCommitBasedCoverageForFileViewer } from 'services/file'
import { CODE_RENDERER_TYPE } from 'shared/utils/fileviewer'
import { getFilenameFromFilePath } from 'shared/utils/url'
import Breadcrumb from 'ui/Breadcrumb'
import CodeRenderer from 'ui/CodeRenderer'
import CodeRendererProgressHeader from 'ui/CodeRenderer/CodeRendererProgressHeader'
import SingleLine from 'ui/CodeRenderer/SingleLine'
import ToggleHeader from 'ui/FileViewer/ToggleHeader'

function ErrorDisplayMessage() {
  return (
    <div className="border-solid border-ds-gray-tertiary border p-4">
      <p>
        There was a problem getting the source code from your provider. Unable
        to show line by line coverage.
      </p>
    </div>
  )
}

// This function solely done to eliminate max-statements complexity
// TODO: probably move this to some sort of context; think of a solution with useReducer
function useCoverageAndFlagsStates() {
  const [selectedFlags, setSelectedFlags] = useState([])

  return {
    flagsState: { selectedFlags, setSelectedFlags },
  }
}

function CommitFileView({ diff }) {
  const { owner, repo, provider, commit, path } = useParams()
  const change = diff?.headCoverage?.coverage - diff?.baseCoverage?.coverage
  const fileName = getFilenameFromFilePath(path)

  // *********** This is temporary code that will be here in the meantime *********** //
  const {
    flagsState: { selectedFlags, setSelectedFlags },
  } = useCoverageAndFlagsStates()

  const {
    isLoading: coverageIsLoading,
    totals: fileCoverage,
    coverage: coverageData,
    flagNames,
    content,
  } = useCommitBasedCoverageForFileViewer({
    owner,
    repo,
    provider,
    commit,
    path,
    selectedFlags,
  })

  const flagData = {
    flagNames,
    selectedFlags,
    setSelectedFlags,
  }

  // *********** This is temporary code that will be here in the meantime *********** //

  const title = (
    <Breadcrumb
      paths={[
        {
          pageName: 'commit',
          text: 'Impacted files',
          options: { commit: commit },
        },
        { pageName: 'path', text: fileName },
      ]}
    />
  )

  return (
    <div className="flex flex-col gap-4">
      <ToggleHeader
        title={title}
        flagData={flagData}
        coverageIsLoading={coverageIsLoading}
      />
      <div>
        <CodeRendererProgressHeader
          fileCoverage={fileCoverage}
          change={change}
        />
        {content ? (
          <CodeRenderer
            code={content}
            fileName={fileName}
            rendererType={CODE_RENDERER_TYPE.SINGLE_LINE}
            LineComponent={({ i, line, getLineProps, getTokenProps }) => (
              <SingleLine
                key={i + 1}
                line={line}
                number={i + 1}
                getLineProps={getLineProps}
                getTokenProps={getTokenProps}
                coverage={coverageData && coverageData[i + 1]}
              />
            )}
          />
        ) : (
          <ErrorDisplayMessage />
        )}
      </div>
    </div>
  )
}

CommitFileView.propTypes = {
  diff: PropTypes.shape({
    baseCoverage: PropTypes.shape({
      coverage: PropTypes.number,
    }),
    headCoverage: PropTypes.shape({
      coverage: PropTypes.number,
    }),
  }),
}

export default CommitFileView