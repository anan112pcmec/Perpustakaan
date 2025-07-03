import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Zoom } from 'swiper/modules';
import ShinyText from '../React_bits_compo/ShinyText';
import AnimatedList from '../React_bits_compo/AnimatedList/AnimatedList';
import MasonryProduk from '../React_bits_compo/Masonry_Produk/Masonry';

const items_promo = [
    {
      id: "1",
      img: "https://lh3.googleusercontent.com/DgYEMoJUsegNo0sNvfJYzmlnuU8Kc-UPGDMO9Cgd5jyj5q4-sHkpem-Bprkg1m6rIJurOsWdEK0PM945obceaShEDUzFss3toAg=w1064",
      url: "https://example.com/one",
      height: 520,
      bg: ' #eb8f34',
    },
    {
      id: "2",
      img: "https://lh3.googleusercontent.com/k2WqzDH6Izs3aj69UcSF6g8b9ZEZfMlmW4b53KMDCYoIY9H_eTRXLppKInYdL_GtDlvQWuYSJeCdlJ7Jo0jo9VaLjyzODr-n8h0=w1064",
      url: "https://example.com/two",
      height: 400,
      bg: 'rgb(250, 58, 196)',
    },
    {
      id: "3",
      img: "https://lh3.googleusercontent.com/OU46AwWgmo_JDv267teUP5MttWJTrEoToQKxwT1KiQm-I15EYsVDIfYhnvADulfMKdGiZsUgcPXdNJQSdtAYnJ05QJboxbyXzofH=w1064",
      url: "https://example.com/three",
      height: 900,
      bg:'rgb(245, 29, 47)',
    },
    {
      id: "4",
      img: "https://scienceday.gramedia.com/images/6/scienceday-2025-logo.svg",
      url: "https://example.com/one",
      height: 250,
      bg: 'rgb(55, 235, 52)',
    },
    {
      id: "5",
      img: "https://lh3.googleusercontent.com/le6GzgfrE-ju50dQOStWNxnEZQ_CmZNJn8mOziTs2geKHTiCZu8z-Q-8ysxjyoFKkvqtfT1Z1K6Jm95pfpkYoHTg_I-jRcwUhA=w1064",
      url: "https://example.com/two",
      height: 500,
      bg: 'rgb(58, 119, 250)',
    },
    {
      id: "6",
      img: "https://lh3.googleusercontent.com/bkCFBakBQdy7uDqbozgKpwrrtxTlkZLnx3Wb-kh5uzd-f3SQcifNBvi5KXplqO24AfYIVQNB5m1yThjcEPp286cvRNjBKPqzAw=w1064",
      url: "https://example.com/three",
      height: 450,
      bg:'rgb(245, 209, 29)',
    },
    {
      id: "7",
      img: "https://lh3.googleusercontent.com/HPKsJZQyySgAv4WuiGXQBhv3LUyG-hGFhRpbnlin8EWm1p89Vorz61_YbX8xTsYE-28oB0REHED0aYbfsbBu-XRR-Grty_ltlK8=w1064",
      url: "https://example.com/three",
      height: 760,
      bg:'rgb(29, 213, 245)',
    },
    {
      id: "8",
      img: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/picture_meta/2024/5/14/xmymlkgyramorxmhupydk3.jpg",
      url: "https://example.com/three",
      height: 660,
      bg:'',
    },
     {
      id: "9",
      img: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/product-metas/-69tc9s49l.jpg",
      url: "https://example.com/three",
      height: 620,
      bg:'rgb(245, 209, 29)',
    },
    {
      id: "10",
      img: "https://bri.co.id/documents/36847/5c6fe78f-d034-0449-1d23-c9b8ffc45003?download=false",
      url: "https://example.com/three",
      height: 220,
      bg:'#fff',
    },
    {
      id: "11",
      img: "https://bri.co.id/documents/36847/fb9a1dbe-dd2c-3cdb-4c61-793db2f7a066?download=false",
      url: "https://example.com/three",
      height: 200,
      bg:'rgb(245, 209, 29)',
    },
    {
      id: "12",
      img: "https://bri.co.id/documents/36847/7f855f23-a7be-b43a-bc9b-6b92566a7037?download=false",
      url: "https://example.com/three",
      height: 200,
      bg:'#fff',
    },
    // ... more items
];

const galleryImages = [
  "https://awsimages.detik.net.id/community/media/visual/2024/02/08/jujutsu-kaisen.jpeg?w=1200",
  "https://wafuu.com/cdn/shop/files/one-piece-108-jump-comics-778840.jpg?v=1711154148",
  "https://wafuu.com/cdn/shop/files/one-piece-110-jump-comics-607689.webp?v=1730180203",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQULhjHMPAHl7ZN_j49KcJPH3MYVhX1hhmDMQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBWw4tdWPD5RYBQKdHIz6iSonsI8IY7dNUNQ&s",
  "https://m.media-amazon.com/images/I/617iirC-BNL._UF1000,1000_QL80_.jpg",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
];

const items = [
  'FAQ',
  'Dukungan Pelanggan',
  'Kerja Sama Toko',
  'Promo & Diskon',
  'Buku Terlaris',
  'Kategori Buku',
  'Ulasan Pelanggan',
  'Cara Pembayaran',
  'Pengiriman & Pengembalian',
  'Hubungi Kami'
];


export default function Dukungan() {
  return (
    <div className="w-full h-[70vh] grid grid-cols-[75%_25%] gap-4 p-4 border-l border-l-white/10 relative">
      
      {/* Kolom kiri - Masonry Promo */}
      <div className="rounded-lg shadow-sm overflow-hidden h-[80vh]">
        <MasonryProduk
          items={items_promo}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      
      </div>

      {/* Kolom kanan - List + Swiper */}
      <div className="grid gap-4">
        
        {/* Animated List */}
        <div className="flex rounded-lg shadow-sm bg-neutral-800/20 p-2">
          <AnimatedList
            items={items}
            onItemSelect={(item, index) => console.log(item, index)}
            showGradients={true}
            enableArrowNavigation={true}
            displayScrollbar={true}
          />
        </div>


      </div>
    </div>
  );
}
