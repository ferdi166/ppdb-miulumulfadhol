import React from 'react'

// Komponen untuk menampilkan informasi kontak panitia PPDB
const Kontak = () => {
  return (
    <section className="py-10 md:py-16 bg-gray-50 relative overflow-hidden">
      {/* Dekorasi latar belakang */}
      <div className="absolute right-0 top-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-emerald-600/10 transform translate-x-32 -translate-y-32 rotate-45"></div>
      <div className="absolute left-0 bottom-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-emerald-600/10 transform -translate-x-32 translate-y-32 rotate-45"></div>
      
      {/* Dekorasi kupu-kupu */}
      <div className="absolute right-0 top-0 w-[200px] h-[200px] transform translate-x-20 -translate-y-20">
        <div className="absolute w-full h-full">
          <div className="absolute w-16 h-16 bg-emerald-600/10 rounded-full transform rotate-45 top-0 right-0"></div>
          <div className="absolute w-16 h-16 bg-emerald-600/10 rounded-full transform rotate-45 top-0 right-16"></div>
          <div className="absolute w-16 h-16 bg-emerald-600/10 rounded-full transform rotate-45 top-16 right-0"></div>
          <div className="absolute w-16 h-16 bg-emerald-600/10 rounded-full transform rotate-45 top-16 right-16"></div>
        </div>
      </div>

      <div className="absolute left-0 bottom-0 w-[200px] h-[200px] transform -translate-x-20 translate-y-20">
        <div className="absolute w-full h-full">
          <div className="absolute w-16 h-16 bg-emerald-600/10 rounded-full transform rotate-45 bottom-0 left-0"></div>
          <div className="absolute w-16 h-16 bg-emerald-600/10 rounded-full transform rotate-45 bottom-0 left-16"></div>
          <div className="absolute w-16 h-16 bg-emerald-600/10 rounded-full transform rotate-45 bottom-16 left-0"></div>
          <div className="absolute w-16 h-16 bg-emerald-600/10 rounded-full transform rotate-45 bottom-16 left-16"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Judul section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-700 mb-3 md:mb-4">KONTAK PANITIA</h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Untuk informasi lebih lanjut mengenai Pendaftaran Peserta Didik Baru (PPDB) MI Ulumul Fadhol, 
            silakan menghubungi kami melalui:
          </p>
        </div>

        {/* Informasi kontak */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative p-6 md:p-8">
          {/* Kolom kiri - Informasi kontak */}
          <div className="space-y-6">
            {/* Alamat */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="p-3 bg-emerald-700 rounded-full">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">Alamat Sekolah:</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Jl. Halmahera No.119, Klampok
                  <br />
                  Kec. Sananwetan, Blitar
                  <br />
                  Jawa Timur, Indonesia
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="p-3 bg-emerald-700 rounded-full">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">Email:</h3>
                <a href="mailto:mi.ulumulfadhol@gmail.com" className="text-sm md:text-base text-emerald-700 hover:text-emerald-800 font-medium">
                  mi.ulumulfadhol@gmail.com
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="p-3 bg-emerald-700 rounded-full">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">WhatsApp:</h3>
                <a href="https://api.whatsapp.com/send/?phone=6285804276710&text&type=phone_number&app_absent=0" className="text-sm md:text-base text-emerald-700 hover:text-emerald-800 font-medium">
                  Bu Retno (0858-0427-6710)
                </a>
              </div>
            </div>
          </div>

          {/* Kolom kanan - Peta lokasi sekolah */}
          <div className="rounded-lg overflow-hidden shadow-lg h-[300px] md:h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.715593333863!2d112.16395779999999!3d-8.1304103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78ebf361513f99%3A0x63e1adc74b0d779a!2sMI%20Ulumul%20Fadhol!5e0!3m2!1sid!2sid!4v1744469885410!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi MI Ulumul Fadhol"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Kontak