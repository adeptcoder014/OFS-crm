import Image from "next/image";

export default function Loading() {
  return <Image src="/loading.gif" style={{margin:"auto"}} alt="Loader" width="350" height="250" />;
}
