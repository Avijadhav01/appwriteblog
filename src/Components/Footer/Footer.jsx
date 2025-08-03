import { Link } from 'react-router-dom';
import { Logo } from '../index';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Row: Logo & Copyright */}
        <div className="flex flex-col items-center justify-center mb-8">
          <Logo width={36} />
          <p className="text-sm text-gray-400 mt-4 text-center">
            &copy; {new Date().getFullYear()} BlogZone. All rights reserved.
          </p>
        </div>

        {/* Link Sections */}
        <div className="flex mx-auto justify-around gap-8 text-sm text-center w-[80%]">
          {/* Company */}
          <div>
            <h3 className="mb-3 font-semibold text-white">Company</h3>
            <ul className="space-y-2">
              {["Features", "Pricing", "Affiliate Program", "Press Kit"].map((text, idx) => (
                <li key={idx}>
                  <Link
                    to={`/${text.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-white transition-colors"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-3 font-semibold text-white">Support</h3>
            <ul className="space-y-2">
              {["Account", "Help", "Contact Us", "Customer Support"].map((text, idx) => (
                <li key={idx}>
                  <Link
                    to={`/${text.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-white transition-colors"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legals */}
          <div>
            <h3 className="mb-3 font-semibold text-white">Legal</h3>
            <ul className="space-y-2">
              {["Terms & Conditions", "Privacy Policy", "Licensing"].map((text, idx) => (
                <li key={idx}>
                  <Link
                    to={`/${text.toLowerCase().replace(/[^a-zA-Z]/g, '-').replace(/--+/g, '-')}`}
                    className="hover:text-white transition-colors"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
