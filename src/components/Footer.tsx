export default function Footer() {
  return (
    <footer
      className="flex justify-between items-center h-50 shrink-0 text-center text-gray-400 
                      bg-[url('/img/footer-bg.jpg')] bg-cover bg-position-[center_18%]
                       relative">
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
      <div className="footer-icons flex gap-4 z-20 ml-10 mt-6">
        <a
          href="https://vk.com/pubg"
          title="VK"
          className="group p-2 rounded-lg bg-white/10 hover:bg-white/15 transition">
          <img
            src="/vk.svg"
            alt="VK"
            className="w-6 h-6 opacity-85 group-hover:opacity-100 
                 transition duration-300 group-hover:scale-110
                 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]"
          />
        </a>
        <a
          href="https://www.twitch.tv/pubg_cis"
          title="Twitch"
          className="group p-2 rounded-lg bg-white/10 hover:bg-white/15 transition">
          <img
            src="/twitch.svg"
            alt="Twitch"
            className="w-6 h-6 opacity-85 group-hover:opacity-100 
                 transition duration-300 group-hover:scale-110
                 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
          />
        </a>
        <a
          href="https://www.youtube.com/c/PUBGRU"
          title="YouTube"
          className="group p-2 rounded-lg bg-white/10 hover:bg-white/15 transition">
          <img
            src="/youtube.svg"
            alt="YouTube"
            className="w-6 h-6 opacity-85 group-hover:opacity-100 
                 transition duration-300 group-hover:scale-110
                 group-hover:drop-shadow-[0_0_10px_rgba(255,0,0,0.4)]"
          />
        </a>
        <a
          href="https://discord.com/invite/pubgru"
          title="Discord"
          className="group p-2 rounded-lg bg-white/10 hover:bg-white/15 transition">
          <img
            src="/discord.svg"
            alt="Discord"
            className="w-6 h-6 opacity-85 group-hover:opacity-100 
                 transition duration-300 group-hover:scale-110
                 group-hover:drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]"
          />
        </a>
        <a
          href="https://www.tiktok.com/@pubg_cis"
          title="TikTok"
          className="group p-2 rounded-lg bg-white/10 hover:bg-white/15 transition">
          <img
            src="/tiktok.svg"
            alt="TikTok"
            className="w-6 h-6 opacity-85 group-hover:opacity-100 
                 transition duration-300 group-hover:scale-110
                 group-hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.35)]"
          />
        </a>
      </div>
      <div className="absolute flex flex-col right-20 text-[#dcdcdcd6] z-20 px-4 md:px-0">
        <p>© 2026 PUBG Weapon Hub</p>
        <p>Все данные взяты из открытых источников</p>
      </div>
    </footer>
  )
}
