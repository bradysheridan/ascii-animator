import Link from 'next/link';

export default function Nav() {
  return(
    <div className="flex w-full justify-start mt-2 gap-2">
      <Link href="/about">[About]</Link>
      <Link href="/controls">[Controls]</Link>
      <a href="https://github.com/bradysheridan/ascii-animator" target="_blank">[Github]</a>
      <a href="https://www.npmjs.com/package/trace-ascii-image" target="_blank">[npm]</a>
    </div>
  );
}