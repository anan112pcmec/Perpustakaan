// Swiperrek.js
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFlip, Navigation } from 'swiper/modules';
import '../node_modules/swiper/swiper.css';
import '../node_modules/swiper/modules/effect-flip.css';
import { useState, useEffect, useRef, memo } from 'react';
import { animate } from 'animejs';
import { Zoom, Pagination, Autoplay } from "swiper/modules";
import ShinyText from './React_bits_compo/ShinyText';


const GlassGridBox = memo((props:any) => {
  const headerRef = useRef(null);
  const featuredRef = useRef(null);
  const sliderRef = useRef(null);
  const newsRef = useRef(null);
  const contactRef = useRef(null);

  const galleryImages = [
    "https://awsimages.detik.net.id/community/media/visual/2024/02/08/jujutsu-kaisen.jpeg?w=1200",
    "https://wafuu.com/cdn/shop/files/one-piece-108-jump-comics-778840.jpg?v=1711154148",
    "https://wafuu.com/cdn/shop/files/one-piece-110-jump-comics-607689.webp?v=1730180203",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQULhjHMPAHl7ZN_j49KcJPH3MYVhX1hhmDMQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBWw4tdWPD5RYBQKdHIz6iSonsI8IY7dNUNQ&s",
    "https://m.media-amazon.com/images/I/617iirC-BNL._UF1000,1000_QL80_.jpg",
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  ];

  useEffect(() => {
    const targets = [
      {
        ref: headerRef,
        animation: () =>
          animate(headerRef.current, {
            opacity: [0, 1],
            translateY: [40, 0],
            easing: "ease-out",
            duration: 800,
          }),
      },
      {
        ref: featuredRef,
        animation: () =>
          animate(featuredRef.current, {
            opacity: [0, 1],
            translateX: [-30, 0],
            easing: "ease-out",
            duration: 700,
          }),
      },
      {
        ref: sliderRef,
        animation: () =>
          animate(sliderRef.current, {
            opacity: [0, 1],
            scale: [0.9, 1],
            easing: "ease-out",
            duration: 1000,
          }),
      },
      {
        ref: newsRef,
        animation: () =>
          animate(newsRef.current, {
            opacity: [0, 1],
            translateX: [30, 0],
            easing: "ease-out",
            duration: 800,
          }),
      },
      {
        ref: contactRef,
        animation: () =>
          animate(contactRef.current, {
            opacity: [0, 1],
            translateX: [30, 0],
            easing: "ease-out",
            duration: 800,
          }),
      },
    ];

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = targets.find((t) => t.ref.current === entry.target);
            if (target) {
              target.animation();
              obs.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    targets.forEach(({ ref }) => {
      if (ref.current) {
        // set opacity 0 & transform translate awal (css)
        ref.current.style.opacity = "0";
        ref.current.style.transform = "translateY(40px)";
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
    <div className="max-w-[1200px] mx-auto px-6 py-12  rounded-3xl shadow-2xl text-white">
    {/* Header */}
    <header ref={headerRef} className="text-right mb-16">
      <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
        Service Kami
      </h1>
      <p className="text-lg text-gray-300 leading-relaxed">
        Explore a curated gallery of stunning artworks and immersive experiences 
        that celebrate creativity and nature.
      </p>
    </header>

    {/* Featured and Slider */}
    <div className="grid md:grid-cols-10 gap-8 mb-20">
      {/* Featured Artworks */}
      <div
        ref={featuredRef}
        className="md:col-span-3 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-md space-y-6"
      >
        <h2 className="text-xl font-semibold mb-4">Featured Artworks</h2>
        <div className="flex items-center space-x-4 bg-white/20 rounded-xl p-3 shadow hover:scale-105 transition-transform">
          <img
            src="https://uploads7.wikiart.org/images/vincent-van-gogh/starry-night.jpg"
            alt="Starry Night"
            className="w-16 h-16 object-cover rounded-md"
            loading="lazy"
          />
          <div>
            <h3 className="text-white font-medium">Starry Night</h3>
            <p className="text-sm text-white/80 italic">Vincent van Gogh</p>
          </div>
        </div>
        {/* Tambahkan artwork lainnya jika perlu */}
      </div>

      {/* Slider */}
      <div ref={sliderRef} className="md:col-span-7">
        <Swiper
          style={{ padding: "2px" }}
          zoom={true}
          modules={[Zoom, Pagination, Autoplay]}
          className="mySwiper"
          spaceBetween={5}
          slidesPerView={5}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={2000}
          allowTouchMove={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {galleryImages.map((src, i) => (
            <SwiperSlide key={i}>
              <div
                className="swiper-zoom-container"
                style={{
                  width: "130px",
                  height: "200px",
                  overflow: "hidden",
                  margin: "auto",
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                <img
                  src={src}
                  alt={`Slide ${i + 1}`}
                  className="w-full h-full object-cover rounded-xl hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </div>

      </>

        
    );
});

export default GlassGridBox;
