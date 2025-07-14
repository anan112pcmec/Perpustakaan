export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black via-neutral-900 to-black text-white font-sans pt-16 pb-8 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* CTA Section */}
        <div className="col-span-1">
          <div className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10 flex flex-col items-center justify-center h-full text-center">
            <i className="fa-brands fa-uncharted text-5xl text-teal-200 mb-4"></i>
            <p className="text-xl font-semibold">Bring your website to life.</p>
          </div>
        </div>

        {/* Product */}
        <div>
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-box text-teal-200"></i>
            Product
          </h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#" className="hover:text-white transition-all">About</a></li>
            <li><a href="#" className="hover:text-white transition-all">Services</a></li>
            <li><a href="#" className="hover:text-white transition-all">Reviews</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-building text-teal-200"></i>
            Company
          </h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#" className="hover:text-white transition-all">Blog</a></li>
            <li><a href="#" className="hover:text-white transition-all">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-all">Careers</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-scale-balanced text-teal-200"></i>
            Legal
          </h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#" className="hover:text-white transition-all">Terms of Use</a></li>
            <li><a href="#" className="hover:text-white transition-all">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 text-sm text-white/50">
        <p>© 2024 Library Faiz. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-all duration-300">
            <i className="fab fa-linkedin text-xl"></i>
          </a>
          <a href="#" className="hover:text-white transition-all duration-300">
            <i className="fab fa-github text-xl"></i>
          </a>
          <a href="#" className="hover:text-white transition-all duration-300">
            <i className="fab fa-twitter text-xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
