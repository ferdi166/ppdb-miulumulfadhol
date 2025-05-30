import React from 'react'
import FormPendaftaran from '../../components/FormPendaftaran/FormPendaftaran'
import Background from '../../components/background/background'
import { FormProvider } from '../../context/FormContext'

// Halaman untuk menampilkan formulir pendaftaran peserta didik baru
const Pendaftaran = () => {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* Header dengan background */}
      <div className="bg-emerald-700 relative overflow-hidden h-72">
        <Background />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex items-center">
          <div className="text-center w-full">
            <h2 className="text-3xl font-bold text-white mb-4">FORMULIR PENDAFTARAN</h2>
            <p className="text-white/80">
              Silakan lengkapi formulir pendaftaran peserta didik baru di bawah ini
            </p>
          </div>
        </div>
      </div>

      {/* Form pendaftaran */}
      <FormProvider>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-16 relative">
          {/* Dekorasi latar belakang */}
          <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-emerald-700/10 transform translate-x-full -translate-y-32 rotate-45"></div>
          <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-emerald-700/10 transform -translate-x-full translate-y-32 rotate-45"></div>

          {/* Dekorasi kupu-kupu */}
          <div className="absolute right-0 top-0 w-[200px] h-[200px] transform translate-x-full -translate-y-20">
            <div className="absolute w-full h-full">
              <div className="absolute w-16 h-16 bg-emerald-700/10 rounded-full transform rotate-45 top-0 right-0"></div>
              <div className="absolute w-16 h-16 bg-emerald-700/10 rounded-full transform rotate-45 top-0 right-16"></div>
              <div className="absolute w-16 h-16 bg-emerald-700/10 rounded-full transform rotate-45 top-16 right-0"></div>
              <div className="absolute w-16 h-16 bg-emerald-700/10 rounded-full transform rotate-45 top-16 right-16"></div>
            </div>
          </div>
          <div className="absolute left-0 bottom-0 w-[200px] h-[200px] transform -translate-x-full translate-y-20">
            <div className="absolute w-full h-full">
              <div className="absolute w-16 h-16 bg-emerald-700/10 rounded-full transform rotate-45 bottom-0 left-0"></div>
              <div className="absolute w-16 h-16 bg-emerald-700/10 rounded-full transform rotate-45 bottom-0 left-16"></div>
              <div className="absolute w-16 h-16 bg-emerald-700/10 rounded-full transform rotate-45 bottom-16 left-0"></div>
              <div className="absolute w-16 h-16 bg-emerald-700/10 rounded-full transform rotate-45 bottom-16 left-16"></div>
            </div>
          </div>
          <FormPendaftaran mode="create" />
        </div>
      </FormProvider>
    </main>
  )
}

export default Pendaftaran
