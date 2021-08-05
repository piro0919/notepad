import { decompress as lzutf8Decompress } from "lzutf8";

function decompress(input: string): string {
  return lzutf8Decompress(input, { inputEncoding: "StorageBinaryString" });
}

export default decompress;
