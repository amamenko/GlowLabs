import { gql } from "apollo-boost";

const getAllPersonalEventsQuery = gql`
  {
    all_personal_events {
      _id
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

export default getAllPersonalEventsQuery;
