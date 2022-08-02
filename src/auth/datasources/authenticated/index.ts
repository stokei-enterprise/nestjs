import { RemoteGraphQLDataSource } from '@apollo/gateway';

import {
  ACCESS_TOKEN_HEADER_NAME,
  REFRESH_TOKEN_HEADER_NAME
} from '../../constants';

export class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    request.http?.headers.set(
      ACCESS_TOKEN_HEADER_NAME,
      context?.res?.req?.headers[ACCESS_TOKEN_HEADER_NAME]
    );
    request.http?.headers.set(
      REFRESH_TOKEN_HEADER_NAME,
      context?.res?.req?.headers[REFRESH_TOKEN_HEADER_NAME]
    );
  }
}
