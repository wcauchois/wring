import { gql } from "apollo-boost";

export const configFragment = gql`
  fragment config on WebRingConfig {
    id
    data
  }
`;

export const writeConfigMutation = gql`
  mutation writeConfig($data: JSON!) {
    writeConfig(data: $data) {
      ...config
    }
  }

  ${configFragment}
`;

export const configQuery = gql`
  {
    config {
      ...config
    }
  }
  ${configFragment}
`;
