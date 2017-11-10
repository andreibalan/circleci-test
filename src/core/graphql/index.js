import axios from 'axios';

import createClient from './client';
import createCustomLink from './link/customLink';
import LocalLink from './link/localLink';
import mockedSchema from './mock';

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  // config.headers.Authorization = 'Bearer 74a2869371c45eaa8c16ab343eb32ed333f1e498';
  config.headers.Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdhbml6YXRpb25zIjpbWyI5NmEyZjc2OS00MmFlLTQ1ODYtYjY2MS05ZjMyNGI1NWMwOTAiLCJtYW8tb3JnIl0sWyJiY2E0ODNiMS0yYjk1LTQwYmQtYWM0YS05Nzk5ODcxM2U1ODkiLCJxYSJdLFsiNDBiZTg0OTAtZThmMC00YTE3LWE5ZDktYTY4NmU4YjNkOWRhIiwibWFnbm9saWEiXSxbIjVhMzBjZTI0LTAyMzQtNGNiYy1iNTIyLWQyMDEyNTMxYzc1YSIsIm1hbnVhbCJdLFsiNTBlMWVmMTktOGU5ZC00ZmExLWIwMjctZmRjNjZkN2U4NGUwIiwid2FycmlvcnMtJi1nYW5nc3RlcnMiXSxbImJlMzQ1NmExLWFjN2MtNDk0Ni04MzEwLTE0ODMzYWM5YjQ4NCIsImRveC1jaGFubmVsIl0sWyJjODBhN2E2YS1jYWQzLTRjY2UtYTczOS03ZjEzMjI3ZTkxNjQiLCJtZ20taW1wYWN0Il0sWyIxODhjYTA1OS04MTY0LTQzNTQtYTBjYi0xNjMzMWRjNmQ5ODkiLCJtaXR1Il1dLCJ1c2VySWQiOiI5YWFjODQ5ZS1kZTM5LTQ0NGItYWE4OC1iZDYxZTA3MGVkNzAiLCJpc3N1ZXIiOiJ6eXBsaW5lIiwicm9sZXMiOlsib3JnX2FkbWluIiwic3lzX2FkbWluIl0sImlhdCI6MTUxMDEzNDk0NCwiZXhwIjoxNTEwMTU2NTQ0fQ.4iNVG7M0iOH3pyRGOgSg4f_KpiKi5rSsEGRmly0MmsM';
  config.headers['X-Organization-Slug'] = 'mgm-impact';

  return config;
});

const link = createCustomLink({
  uri: 'https://zypline-api-dev.ownzones.com/graphql',
  axiosInstance,
});

export default createClient({
  link: new LocalLink({ schema: mockedSchema }),
});
