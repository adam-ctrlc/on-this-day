import { gql } from "@apollo/client";

export const GET_ON_THIS_DAY = gql`
  query GetOnThisDay($month: Int, $day: Int) {
    onThisDay(month: $month, day: $day) {
      events {
        events {
          year
          description
          wikipedia {
            title
            wikipedia
          }
        }
      }
      births {
        births {
          year
          description
          wikipedia {
            title
            wikipedia
          }
        }
      }
      deaths {
        deaths {
          year
          description
          wikipedia {
            title
            wikipedia
          }
        }
      }
    }
  }
`;
