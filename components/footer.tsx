import Image from "next/image"

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#540f6b" }} className="text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain "
            />
            <div>
              <h3 className="text-xl font-bold">مشروع الزهراء السكني</h3>
              <p className="text-sm text-gray-200"> رقم الترخيص: I20002693</p>
            </div>
          </div>

          {/* FAL SVG */}
          <div className="flex items-center bg-white rounded-[16px] p-2">
            <Image
              src="/fal.svg"
              alt="FAL"
              width={120}
              height={80}
              className="object-contain bg-white rounded-[16px]"
            />
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right" dir="ltr">
            <p className="text-sm text-gray-200">
              &copy; 2025 مشروع الزهراء السكني. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
