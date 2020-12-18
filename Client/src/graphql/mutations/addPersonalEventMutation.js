import { gql } from "apollo-boost";

const addPersonalEventMutation = gql`
  mutation(
    $title: String!
    $notes: String
    $staff: String!
    $date: String!
    $startTime: String!
    $endTime: String!
    $duration: Int!
    $allDay: Boolean
    $blockTime: Boolean
  ) {
    addPersonalEvent(
      title: $title
      notes: $notes
      staff: $staff
      date: $date
      startTime: $startTime
      endTime: $endTime
      duration: $duration
      allDay: $allDay
      blockTime: $blockTime
    ) {
      title
      notes
      staff
      date
      startTime
      endTime
      duration
      allDay
      blockTime
    }
  }
`;

export default addPersonalEventMutation;
