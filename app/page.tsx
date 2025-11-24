"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text3D, Environment, useGLTF } from "@react-three/drei"
import { Suspense, useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"
import * as THREE from "three"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Database,
  Globe,
  Server,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Heart,
} from "lucide-react"

function AnimatedCat() {
  const cat = useGLTF("/Cat.glb")
  const meshRef = useRef(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <primitive
      ref={meshRef}
      object={cat.scene}
      scale={2}
      position={[0, 0, 0]}
    />
  )
}

function TypedName() {
  const nameRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && nameRef.current) {
      // Load TypeIt.js dynamically
      const script = document.createElement("script")
      script.src = "https://unpkg.com/typeit@8.7.1/dist/index.umd.js"
      script.onload = () => {
        if (window.TypeIt && nameRef.current) {
          new window.TypeIt(nameRef.current, {
            strings: ["Kharisma Tio Pernanda"],
            speed: 100,
            waitUntilVisible: true,
            cursor: true,
            cursorChar: "|",
            cursorSpeed: 500,
            deleteSpeed: 50,
            lifeLike: true,
          }).go()
        }
      }
      document.head.appendChild(script)

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
      }
    }
  }, [])

  return <span ref={nameRef} className="text-4xl md:text-5xl font-bold text-gray-800"></span>
}

function ProjectSlider({ projects }: { projects: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % projects.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {projects.map((project, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="aspect-video bg-gray-100 relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-gray-800 text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-gray-600">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-gray-800 font-semibold mb-2">Fitur Utama:</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      {project.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-gray-800 font-semibold mb-2">Teknologi:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech: string, idx: number) => (
                        <Badge key={idx} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button size="sm" className="bg-gray-800 hover:bg-gray-700 text-white">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                    {project.demo && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg hover:bg-gray-50 text-gray-800 rounded-full p-2"
        disabled={isAnimating}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg hover:bg-gray-50 text-gray-800 rounded-full p-2"
        disabled={isAnimating}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => !isAnimating && setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function SkillCard({ skill, index }: { skill: any; index: number }) {
  return (
    <Card
      className="bg-white border-gray-200 shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg ${skill.color} shadow-sm`}>{skill.icon}</div>
          <div>
            <CardTitle className="text-gray-800 text-lg">{skill.name}</CardTitle>
            <Badge variant="secondary" className="mt-1 bg-gray-100 text-gray-700">
              {skill.level}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{skill.progress}%</span>
          </div>
          <Progress value={skill.progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function Portfolio() {
  useEffect(() => {
    // Load AOS library
    const aosScript = document.createElement("script")
    aosScript.src = "https://unpkg.com/aos@2.3.1/dist/aos.js"
    aosScript.onload = () => {
      if (window.AOS) {
        window.AOS.init({
          duration: 800,
          easing: "ease-in-out",
          once: true,
          offset: 100,
        })
      }
    }
    document.head.appendChild(aosScript)

    // Load AOS CSS
    const aosCSS = document.createElement("link")
    aosCSS.rel = "stylesheet"
    aosCSS.href = "https://unpkg.com/aos@2.3.1/dist/aos.css"
    document.head.appendChild(aosCSS)

    return () => {
      if (document.head.contains(aosScript)) {
        document.head.removeChild(aosScript)
      }
      if (document.head.contains(aosCSS)) {
        document.head.removeChild(aosCSS)
      }
    }
  }, [])

  const skills = [
    {
      name: "Java",
      level: "Pemula",
      progress: 50,
      icon: <Server className="w-6 h-6 text-white" />,
      color: "bg-orange-500",
    },
    {
      name: "JavaScript",
      level: "Pemula",
      progress: 50,
      icon: <Code className="w-6 h-6 text-white" />,
      color: "bg-yellow-500",
    },
    {
      name: "HTML",
      level: "Pemula",
      progress: 50,
      icon: <Globe className="w-6 h-6 text-white" />,
      color: "bg-red-500",
    },
    {
      name: "CSS",
      level: "Pemula",
      progress: 50,
      icon: <Globe className="w-6 h-6 text-white" />,
      color: "bg-blue-500",
    },
    {
      name: "Tailwind CSS",
      level: "Pemula",
      progress: 50,
      icon: <Globe className="w-6 h-6 text-white" />,
      color: "bg-cyan-500",
    },
    {
      name: "Python",
      level: "Pemula",
      progress: 50,
      icon: <Code className="w-6 h-6 text-white" />,
      color: "bg-green-500",
    },
    { name: "C", level: "Pemula", progress: 50, icon: <Code className="w-6 h-6 text-white" />, color: "bg-gray-600" },
    {
      name: "Laravel",
      level: "Pemula",
      progress: 50,
      icon: <Server className="w-6 h-6 text-white" />,
      color: "bg-red-600",
    },
    {
      name: "PHP",
      level: "Pemula",
      progress: 50,
      icon: <Code className="w-6 h-6 text-white" />,
      color: "bg-purple-600",
    },
    {
      name: "MySQL",
      level: "Pemula",
      progress: 50,
      icon: <Database className="w-6 h-6 text-white" />,
      color: "bg-blue-600",
    },
    {
      name: "PostgreSQL",
      level: "Pemula",
      progress: 50,
      icon: <Database className="w-6 h-6 text-white" />,
      color: "bg-blue-700",
    },
    {
      name: "Kotlin",
      level: "Pemula",
      progress: 50,
      icon: <Code className="w-6 h-6 text-white" />,
      color: "bg-yellow-700",
    },
  ]

  const projects = [
    {
      title: "Sistem Penjualan Ayam Geprek",
      description: "Sebuah aplikasi web sederhana yang dirancang untuk membantu pengelolaan penjualan ayam geprek secara efisien. Sistem ini memungkinkan admin untuk mengelola data menu, transaksi, serta melihat laporan penjualan secara berkala. Cocok digunakan untuk usaha kuliner skala kecil hingga menengah.",
      features: ["Login & Register", "Sistem Pemesanan", "Dashboard Admin", "Laporan Sederhana","CRUD Menu Ayam"],
      tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      image: "/placeholder.svg?height=200&width=300",
      github: "https://github.com/Paradox281/website-penjualanayamgeprek",
      demo: null,

    },
    {
      title: "Aplikasi Android Todo List Akademik",
      description: "Aplikasi Android sederhana yang digunakan untuk mencatat dan mengelola data akademik seperti jurusan, mahasiswa, dan mata kuliah.",
      features: ["CRUD Data Jurusan", "CRUD Data Mahasiswa", "CRUD Data Mata Kuliah"],
      tech: ["Kotlin"],
      image: "/placeholder.svg?height=200&width=300",
      github: "https://github.com/Paradox281/Android-Studio-Mahasiswa-Pintar",
      demo: null,

    },
    {
      title: "Website My Alquran",
      description: "Sebuah website Al-Qur'an digital yang menampilkan daftar surah lengkap, ayat-ayat Al-Qur'an, terjemahan dalam Bahasa Indonesia. Website ini dibangun untuk memudahkan pengguna membaca dan memahami Al-Qur'an secara online, baik di desktop maupun mobile.",
      features: ["Daftar Surah Lengkap 114 Surah", "Tampilan Ayat dan Terjemahan", "Audio Surah", "Responsif di Semua Perangkat","Integrasi API Al-Qur'an"],
      tech: ["NextJs"],
      image: "/placeholder.svg?height=200&width=300",
      github: "https://github.com/Paradox281/My-Alquran",
      demo: "https://v0-my-al-quran.vercel.app/",
    },
    {
      title: "ComingSoonPage",
      description: "Layout Page Coming Soon Berbasis Website",
      features: ["Page ComingSoon"],
      tech: ["NextJs","ThreeJs"],
      image: "/placeholder.svg?height=200&width=300",
      github: "https://github.com/Paradox281/Coming-Soon",
      demo: "https://v0-coming-soon-game-page.vercel.app/",
    },
    {
      title: "Machine Learning Microservices Starter",
      description: " Menyediakan workflow untuk memproses file CSV yang di-upload user melalui web",
      features: ["Menganalisis data","Menjalankan machine learning sederhana", "Menyimpan hasil ke database", "Menampilkan visualisasi lewat web"],
      tech: ["Phyton","Groq"],
      image: "/placeholder.svg?height=200&width=300",
      github: "https://github.com/Paradox281/Machine-Learning/",
      demo: null,
    },
    {
      title: "Altura Android",
      description: " Menyediakan Pemesanan Traveling",
      features: ["Booking Destinasi","Pemesanan Destinasi"],
      tech: ["ExpoJS"],
      image: "/placeholder.svg?height=200&width=300",
      github: "https://github.com/Paradox281/Wisata-android/",
      demo: null,
    },  

  ]

  const experiences = [
    {
      type: "Belajar",
      title: "Sedang Belajar Midtrans",
      description: "Mempelajari Payment Gateway menggunakan Midtrans untuk pengembangan website modern",
      period: "Saat ini",
      status: "ongoing",
    },
    {
      type: "Kursus",
      title: "Bootcamp Laravel Arutalalab",
      description: "Mengikuti bootcamp intensif untuk mempelajari Laravel",
      period: "2024",
      status: "completed",
    },
    {
      type: "Kursus",
      title: "VSGA Kominfo",
      description: "Mengikuti Vocational School Graduate Academy yang diadakan Kominfo",
      period: "2024",
      status: "completed",
    },
    {
      type: "Proyek",
      title: "Presence App",
      description: "Membuat website Presensi untuk Padepokan79",
      period: "2024",
      status: "completed",
    },
  ]

  // Tambahkan fungsi untuk salam sesuai jam WIB
  function getGreeting() {
    // WIB = UTC+7
    const now = new Date()
    const utcHour = now.getUTCHours()
    const wibHour = (utcHour + 7) % 24
    if (wibHour >= 5 && wibHour < 12) return "Good morning"
    if (wibHour >= 12 && wibHour < 15) return "Good afternoon"
    if (wibHour >= 15 && wibHour < 21) return "Good evening"
    // Good night dari jam 21.00 - 02.59
    return "Good night"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section with 3D Cat Animation */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="absolute inset-0 w-full h-full opacity-80">
          <Canvas camera={{ position: [0, 0, 10] }}>
            <Suspense fallback={null}>
              <Environment preset="city" />
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} />
              <AnimatedCat />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {getGreeting()},Master
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700">
            Programmer Awal yang Tertarik Membangun Aplikasi Web Modern"
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
              Lihat Portfolio
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 shadow-lg"
            >
              Hubungi Saya
            </Button>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo Section */}
            <div className="flex justify-center lg:justify-start" data-aos="fade-right">
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <img
                    src="https://cdn.rafled.com/anime-icons/images/374yi72bsJLqPnyn3085StHiuZXNgKAc.jpg"
                    alt="Profile Photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative elements with cat theme */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-pulse flex items-center justify-center text-2xl">
                  🐾
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500 rounded-full opacity-20 animate-pulse delay-1000 flex items-center justify-center text-xl">
                  🐱
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6" data-aos="fade-left">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Tentang Saya</h2>
                <TypedName />
              </div>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Halo! Saya seorang <span className="font-semibold text-blue-600">newbie programmer</span> yang
                  passionate dalam dunia web development. Meskipun masih dalam tahap pembelajaran, saya memiliki
                  semangat tinggi untuk terus berkembang dan menciptakan solusi digital yang bermanfaat.
                </p>

                <p>
                  Saat ini saya fokus mempelajari teknologi{" "}
                  <span className="font-semibold text-purple-600">full-stack development</span> dengan berbagai bahasa
                  pemrograman seperti Java, JavaScript, PHP, dan Python. Setiap hari adalah kesempatan baru untuk
                  belajar dan mengasah kemampuan coding saya.
                </p>

                <p>
                  <span className="font-semibold text-green-600">Tujuan saya</span> adalah menjadi seorang developer
                  yang dapat berkontribusi dalam menciptakan aplikasi web yang user-friendly dan memberikan dampak
                  positif bagi pengguna. Saya percaya bahwa dengan konsistensi dan dedikasi, impian untuk menjadi
                  programmer profesional akan tercapai.
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Lokasi</p>
                    <p className="font-semibold text-gray-800">Sumatera Barat, Indonesia</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Mulai Coding</p>
                    <p className="font-semibold text-gray-800">2021</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Code className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500">Fokus</p>
                    <p className="font-semibold text-gray-800">Web Development</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Heart className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-500">Passion</p>
                    <p className="font-semibold text-gray-800">Masih menjelajahi berbagai bidang untuk menemukan passion yang tepat</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Bahasa yang Dikuasai</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Berikut adalah bahasa yang sedang saya pelajari dan kembangkan sebagai seorang programmer pemula
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Proyek Terbaik Saya</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Koleksi proyek sederhana yang telah saya buat selama perjalanan belajar programming
            </p>
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <div className="overflow-hidden relative group">
              <div className="flex gap-8 animate-marquee group-hover:[animation-play-state:paused]" style={{ width: 'max-content' }}>
                {projects.concat(projects).map((project, idx) => (
                  idx < projects.length * 2 - 2 && (
                    <div key={idx} className="w-[350px] flex-shrink-0">
                      <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="aspect-video bg-gray-100 relative overflow-hidden rounded-t-lg">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="text-gray-800 text-xl">{project.title}</CardTitle>
                          <CardDescription className="text-gray-600">{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="text-gray-800 font-semibold mb-2">Fitur Utama:</h4>
                            <ul className="text-gray-600 text-sm space-y-1">
                              {project.features.map((feature, fidx) => (
                                <li key={fidx} className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-gray-800 font-semibold mb-2">Teknologi:</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.tech.map((tech, tidx) => (
                                <Badge key={tidx} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-3 pt-4">
                            <Button size="sm" className="bg-gray-800 hover:bg-gray-700 text-white" asChild>
                              <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" />
                                GitHub
                              </a>
                            </Button>
                            {project.demo && (
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Demo
                                </a>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )
                ))}
              </div>
              <style jsx>{`
                @keyframes marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                  animation: marquee 30s linear infinite;
                  display: flex;
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Pengalaman & Progress</h2>
            <p className="text-gray-600">Perjalanan belajar dan pengalaman yang telah saya lalui</p>
          </div>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="bg-white border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge className="mb-2 bg-purple-100 text-purple-800">{exp.type}</Badge>
                      <CardTitle className="text-gray-800 text-xl">{exp.title}</CardTitle>
                      <CardDescription className="text-gray-600 mt-2">{exp.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-sm">{exp.period}</p>
                      <Badge
                        variant={exp.status === "ongoing" ? "default" : "secondary"}
                        className={
                          exp.status === "ongoing" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"
                        }
                      >
                        {exp.status === "ongoing" ? "Sedang Berlangsung" : "Selesai"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto text-center">
          <div data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Mari Berkolaborasi!</h2>
            <p className="text-xl text-gray-600 mb-12">
              Saya terbuka untuk peluang belajar, magang, atau proyek kolaborasi
            </p>

            <div className="flex justify-center gap-6 mb-12">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                <Mail className="w-5 h-5 mr-2" />
                Email
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 shadow-lg"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 shadow-lg"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </Button>
            </div>

            <div className="text-gray-500">
              <p>© 2024 Portfolio Newbie Developer. Dibuat dengan ❤️ menggunakan Next.js & Three.js</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
