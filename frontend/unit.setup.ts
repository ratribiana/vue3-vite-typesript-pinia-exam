// See also the vitest.config.ts file
import { RouterLinkStub, config } from '@vue/test-utils';
import { QueryClient, VUE_QUERY_CLIENT } from "vue-query"

config.global.mocks = {
  navIsLoading: false,
};

config.global.stubs = {
  RouterLink: RouterLinkStub,
};

config.global.provide = {
  [VUE_QUERY_CLIENT]: new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  }),
};