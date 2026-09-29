import Link from "next/link";

export const runtime = 'edge';
export default function NotFound(){return <div className="empty-state"><p className="eyebrow">404 / Lost frame</p><h1 className="page-title">This story isn't here.</h1><p className="page-subtitle mx-auto">The title or page you requested could not be found.</p><Link href="/" className="action-btn primary mt-6">Back to Cineverse</Link></div>}
