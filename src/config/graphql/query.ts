import { gql } from "@apollo/client";
import { LEEKDAO_SPACE } from "../constants/voting"

const LOAD_PROPOSALS = gql`
    query Proposals($state:String!) {
    proposals(
        first: 20,
        skip: 0,
        where: {
            space_in: ["${LEEKDAO_SPACE}"],
            state:$state
        },
        orderBy: "created",
        orderDirection: desc
    ) {
        id
        title
        start
        end
        state
        author
    }
    }
`;

export default LOAD_PROPOSALS;