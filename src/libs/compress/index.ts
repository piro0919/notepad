import { compress as lzutf8Compress } from "lzutf8";

function compress(input: string): string {
  return lzutf8Compress(input, { outputEncoding: "StorageBinaryString" });
}

export default compress;
