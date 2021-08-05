import axiosInstance from "libs/axiosInstance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fetcher(url: string): Promise<any> {
  return axiosInstance.get(url).then(({ data }) => data);
}

export default fetcher;
