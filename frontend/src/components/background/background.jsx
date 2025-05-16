import React from 'react'

// Komponen untuk menampilkan latar belakang dengan kotak-kotak yang bergerak
const Background = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Kotak bergerak bagian kiri */}
      <div className="absolute w-32 h-32 bg-white/5 -rotate-12 animate-float-slow rounded-lg" 
        style={{top: '10%', left: '5%', animationDelay: '0s'}}></div>
      <div className="absolute w-24 h-24 bg-white/5 rotate-12 animate-float-slow rounded-lg" 
        style={{top: '40%', left: '15%', animationDelay: '2s'}}></div>
      <div className="absolute w-40 h-40 bg-white/5 -rotate-45 animate-float-slow rounded-lg" 
        style={{top: '70%', left: '8%', animationDelay: '4s'}}></div>
      
      {/* Kotak bergerak bagian kanan */}
      <div className="absolute w-36 h-36 bg-white/5 rotate-45 animate-float-slow rounded-lg" 
        style={{top: '20%', right: '10%', animationDelay: '1s'}}></div>
      <div className="absolute w-28 h-28 bg-white/5 -rotate-12 animate-float-slow rounded-lg" 
        style={{top: '50%', right: '15%', animationDelay: '3s'}}></div>
      <div className="absolute w-44 h-44 bg-white/5 rotate-12 animate-float-slow rounded-lg" 
        style={{top: '80%', right: '5%', animationDelay: '5s'}}></div>
    </div>
  )
}

export default Background