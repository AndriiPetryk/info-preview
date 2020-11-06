import PropTypes from 'prop-types';

const rewardStates = {
  rejected: 'rejected',
  removed: 'removed',
  approving: 'approving',
  approved: 'approved',
  rejectedNotification: 'rejected_notification',
  sent: 'sent',
  completed: 'completed',
  redeemed: 'redeemed',
  scheduling: 'scheduling',
  scheduled: 'scheduled',
  activated: 'activated',
};

export const sentRewardsPageQuery = 'page';
export const sentRewardsPerPageQuery = 'per_page';
export const sentRewardsSearchQuery = 'participant_name';
export const sentRewardsFromDate = 'sent_at_from';
export const sentRewardsToDate = 'sent_at_till';
export const programId = 'program_id';
export const orderingField = 'ordering_field';
export const orderingDirection = 'ordering_direction';
export const tabQuery = 'scope';
export const stateQuery = 'state';
export const statusQuery = 'status';
export const bucketIdQuery = 'bucket_id';

export const orderingDirectionValues = {
  asc: 'asc nulls last',
  desc: 'desc nulls first',
};

export const tabMap = {
  all: 'was_sent',
  redeemed: 'redeemed_completed',
  unredeemed: 'unredeemed',
};

export const redeemedTabStates = [
  rewardStates.redeemed,
  rewardStates.scheduling,
  rewardStates.scheduled,
  rewardStates.completed,
];

export const unredeemedTabStates = [rewardStates.sent];

export const allTabStates = [
  ...redeemedTabStates,
  ...unredeemedTabStates,
  rewardStates.removed,
];

export const sentRewardsResetParams = {
  [sentRewardsPageQuery]: '1',
  [sentRewardsPerPageQuery]: '50',
  [sentRewardsSearchQuery]: '',
  [sentRewardsFromDate]: null,
  [sentRewardsToDate]: null,
  [programId]: [],
  [orderingField]: 'sent_at',
  [orderingDirection]: orderingDirectionValues.desc,
  [statusQuery]: [],
  [bucketIdQuery]: [],
};

export const sentRewardsDefaultParams = {
  ...sentRewardsResetParams,
  [tabQuery]: tabMap.all,
};

export const programListPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })
);

export const sentRewardsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    manager: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
    employee: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      current_sign_in_at: PropTypes.string,
    }),
    bucket: PropTypes.shape({}),
    state: PropTypes.string,
  })
);

export const urlParamsPropTypes = PropTypes.shape({
  [sentRewardsPageQuery]: PropTypes.string,
  [sentRewardsPerPageQuery]: PropTypes.string,
  [sentRewardsSearchQuery]: PropTypes.string,
  [sentRewardsFromDate]: PropTypes.string,
  [sentRewardsToDate]: PropTypes.string,
  [programId]: PropTypes.arrayOf(PropTypes.string),
});

const {
  approving,
  approved,
  sent,
  activated,
  redeemed,
  scheduled,
  completed,
} = rewardStates;

export const dateFormat = 'MMM D, YYYY';

export const STATE_DATE_MAP = {
  approved: 'approved_at',
  sent: 'sent_at',
  activated: 'activated_at',
  redeemed: 'redeemed_at',
  scheduled: 'scheduled_at',
  completed: 'completed_at',
};

export const approvalsOptions = [
  { label: 'Approving', value: approving },
  { label: 'Approved', value: approved },
];

export const progressOptions = [
  { label: 'Received', value: sent },
  { label: 'Activated', value: activated },
  { label: 'Redeemed', value: redeemed },
  { label: 'Scheduled', value: scheduled },
  { label: 'Completed', value: completed },
];

export const statusHintMap = {
  sent:
    'This reward has been received, but the user has not yet browsed our Experience Menu.',
  activated:
    'This user has browsed our Experience Menu after receiving this reward, but has not yet redeemed it.',
  redeemed: 'This reward has been redeemed and is awaiting scheduling',
  scheduled: 'This reward has been redemmed and scheduled',
  completed: 'This reward has been redeemed and completed',
};

export const statisticsMap = {
  [tabMap.all]: 'was_sent_count',
  [tabMap.redeemed]: 'redeemed_completed_count',
  [tabMap.unredeemed]: 'unredeemed_count',
};
