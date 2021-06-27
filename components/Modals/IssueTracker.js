

import Link from 'next/link'

const IssueTrackerInfoModal = ({ orgName }) => {
  return (
        <div className="flex-1 text-white">
            <p className="text-2xl mb-5">
                Interested in tracking issues for {orgName}?
            </p>
        </div>
    );
}

export default IssueTrackerInfoModal