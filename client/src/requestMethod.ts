import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTc5ZjQ2ZDg3NGIzMWJmMDVjNzVlNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NDEwMzkzNCwiZXhwIjoxNjU0MTA3NTM0fQ.PFCE7JVBGjuZOG-I-JoIe-8Eiwv1_M3_fwKocWj3ipU";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
