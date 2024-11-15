import { createAuthClient } from 'better-auth/react';
import { adminClient } from 'better-auth/client/plugins';
export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000', // the base url of your auth server
  plugins: [adminClient()],
});
