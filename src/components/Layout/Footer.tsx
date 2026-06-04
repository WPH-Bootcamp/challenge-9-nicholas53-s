import Logo from '@/Asset/Logo.svg';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-6 mt-auto">
      <div className="px-35 max-md:px-6 flex items-center justify-between">
        <img src={Logo} alt="Movie" className="h-7 w-auto" />
        <p className="text-gray-500 text-sm">Copyright ©2025 Movie Explorer</p>
      </div>
    </footer>
  );
}
