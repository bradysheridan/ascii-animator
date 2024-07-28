import Link from 'next/link';
import Nav from '@/components/Nav';

export default function Menu({children}) {
  return(
    <nav className="controls-wrap">
      <div className="controls-header">
        <h1 className="text-[1.4em]">
            <Link href="/">
              ASCII Animator<sup><span className="text-xs">[v0.1]</span></sup>
            </Link>
        </h1>
        <div className="text-xs">
          <Nav />
        </div>
      </div>

      {children}
    </nav>
  );
}