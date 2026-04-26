import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold text-amber">Neighbo</span>
            <p className="mt-4 text-sm max-w-md">
              Your local neighborhood network. Connect, share, and grow with your community. We make knowing your neighbors easy.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">Navigation</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/" className="hover:text-amber transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-amber transition-colors">About Us</Link></li>
              <li><Link href="/explore" className="hover:text-amber transition-colors">Explore</Link></li>
              <li><Link href="/contact" className="hover:text-amber transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/privacy" className="hover:text-amber transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-amber transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 flex items-center justify-between">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} Neighbo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
