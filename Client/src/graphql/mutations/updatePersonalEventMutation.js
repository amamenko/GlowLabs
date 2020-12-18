import { gql } from "apollo-boost";

const updatePersonalEventMutation = gql`
  mutation(
    $_id: ID
    $title: String
    $notes: String
    $date: String
    $staff: String
    $startTime: String
    $endTime: String
    $duration: Int
    $allDay: Boolean
    $blockTime: Boolean
  ) {
    updatePersonalEvent(
      _id: $_id
      title: $title
      notes: $notes
      date: $date
      staff: $staff
      startTime: $startTime
      endTime: $endTime
      duration: $duration
      allDay: $allDay
      blockTime: $blockTime
    ) {
      _id
      title
      notes
      date
      staff
      startTime
      endTime
      duration
      allDay
      blockTime
    }
  }
`;

export default updatePersonalEventMutation;
