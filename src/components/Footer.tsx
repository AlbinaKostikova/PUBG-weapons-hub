export default function Footer() {
  return (
    <footer
      className="flex justify-center items-center h-50 shrink-0 text-center text-gray-400 
                      bg-[url('/img/footer-bg.jpg')] bg-cover bg-position-[center_18%]
                       relative">
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
      <div className="footer-icons"></div>
      <div className="absolute flex flex-col right-20 text-[#dcdcdcd6] z-10 px-4 md:px-0">
      <p >© 2026 PUBG Weapon Hub</p>
      <p>Все данные взяты из открытых источников</p></div>
    </footer>
  )
}
