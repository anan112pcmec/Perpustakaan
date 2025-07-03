export default function Footer() {
  return (
    <footer className="bg-black text-white font-sans pt-16 pb-8 px-8">
      <div className="max-w-h  grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Left Section with Call to Action */}
        <div className="col-span-1 md:col-span-1">
          <div className="bg-neutral-900 p-6 rounded-xl shadow-md border border-white/10">
            <p className="text-lg font-semibold mb-4">Bring your website to life.</p>
            <button className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-6 py-2 rounded-full transition duration-300">
              Book a call
            </button>
          </div>
        </div>

        {/* Product */}
        <div>
          <h4 className="text-white font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#" className="hover:text-white transition">About</a></li>
            <li><a href="#" className="hover:text-white transition">Services</a></li>
            <li><a href="#" className="hover:text-white transition">Reviews</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#" className="hover:text-white transition">Blog</a></li>
            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#" className="hover:text-white transition">Terms of Use</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between max-w-h mx-auto px-8 text-sm text-white/50">
        <p>© 2024 Library Faiz. All rights reserved.</p>
        <a href="#" className="hover:text-white transition mt-4 md:mt-0">
          <i className="fab fa-linkedin text-xl"></i> {/* Requires FontAwesome */}
        </a>
      </div>
    </footer>
  );
}
