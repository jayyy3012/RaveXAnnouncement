"use client";

import { Search, Ticket, Users, PlaySquare, X } from "lucide-react";
import Image from "next/image";

import { motion } from "framer-motion";
import ConcertEffects from "../ConcertEffects";
import SpecularButton from "../SpecularButton";

interface LandingPageProps {
  onNext: () => void;
}

export default function LandingPage({ onNext }: LandingPageProps) {
  return (
    <div className="w-full bg-black text-white font-sans overflow-x-hidden">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-start pt-8 pb-32">
        <motion.div 
          className="absolute inset-0 z-0 bg-cover bg-bottom bg-no-repeat opacity-80"
          style={{ backgroundImage: "url('/rave-bg.jpg')" }}
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none" />
        <ConcertEffects />
        
        <motion.div 
          className="relative z-10 w-full max-w-7xl px-6 flex justify-between items-center mb-24"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <span className="text-3xl font-black italic tracking-tighter">Rave<span className="text-transparent bg-clip-text bg-gradient-to-r from-ravex-pink to-ravex-purple pr-2">X</span></span>
          <div className="hidden md:flex gap-8 text-sm font-medium items-center">
            
          </div>
        </motion.div>

        <div className="relative z-10 flex flex-col items-center text-center mt-12">
          <motion.p 
            className="text-xs tracking-[0.3em] text-gray-300 mb-6 uppercase font-bold"
            initial={{ opacity: 0, letterSpacing: "0em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          >
            MUSIC • PEOPLE • PLACES • TOGETHER
          </motion.p>
          
          <motion.h1 
            className="text-5xl sm:text-7xl font-bold tracking-tight mb-8 uppercase leading-[1.1]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          >
            your World <br />
            your People <br />
            your <span className="text-transparent bg-clip-text bg-gradient-to-r from-ravex-pink to-ravex-purple pr-2">Rave</span>
          </motion.h1>

          <motion.span 
            className="text-5xl font-black italic tracking-tighter mb-2"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
          >
            Rave<span className="text-transparent bg-clip-text bg-gradient-to-r from-ravex-pink to-ravex-purple pr-2">X</span>
          </motion.span>
          
          <motion.p 
            className="text-xs tracking-[0.2em] text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Your music world. One app.
          </motion.p>
          
          <SpecularButton 
            onClick={onNext}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            JOIN RAVEX <span className="text-xl">→</span>
          </SpecularButton>
        </div>

        <div className="absolute bottom-12 w-full flex justify-between px-12 z-10">
          <p className="text-xs tracking-[0.2em] text-gray-400 uppercase font-bold mx-auto">
            A BRIGHTER MUSIC CULTURE TOGETHER
          </p>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="w-full bg-[#050505] py-32 px-6 border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <p className="text-ravex-purple text-xs font-bold tracking-[0.2em] mb-4 uppercase">The Problem</p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase leading-tight mb-8">
              Music is everywhere.<br/>
              Your experience isn't.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Events are on one platform.<br/>
              Artists on another.<br/>
              Communities somewhere else.<br/>
              Your memories disappear between them.<br/><br/>
              It's time for a change.
            </p>
          </motion.div>
          <div className="relative h-[400px] flex items-center justify-center">
            {/* Placeholder styled components to represent floating scattered experiences */}
            <motion.div 
              className="absolute transform -rotate-12 -translate-x-12 -translate-y-8 glass-card p-4 rounded-xl opacity-60"
              initial={{ y: -100, x: -100, opacity: 0, rotate: -45 }}
              whileInView={{ y: 0, x: -48, opacity: 0.6, rotate: -12 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring", bounce: 0.5 }}
            >
              <div className="w-40 h-24 bg-gray-800 rounded mb-2"></div>
              <p className="text-[10px] uppercase text-center">Different Apps</p>
            </motion.div>
            <motion.div 
              className="absolute z-10 glass-card p-2 rounded-xl border-ravex-purple shadow-2xl"
              initial={{ scale: 0, opacity: 0, rotate: 180 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            >
              <div className="w-48 h-64 bg-gray-800 rounded flex flex-col justify-end p-4 bg-gradient-to-t from-black to-gray-800">
                 <p className="text-xs font-bold">EVENT TICKET</p>
              </div>
            </motion.div>
            <motion.div 
              className="absolute transform rotate-12 translate-x-16 translate-y-12 glass-card p-4 rounded-xl opacity-60"
              initial={{ x: 200, opacity: 0, rotate: 45 }}
              whileInView={{ x: 64, opacity: 0.6, rotate: 12 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, type: "spring" }}
            >
              <p className="text-[10px] uppercase text-center mb-2">Scattered Experiences</p>
              <div className="w-32 h-16 bg-gray-800 rounded"></div>
            </motion.div>
            <motion.div 
              className="absolute transform -rotate-6 translate-x-4 translate-y-32"
              initial={{ y: 150, opacity: 0 }}
              whileInView={{ y: 128, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-[10px] uppercase text-gray-500">No Connection</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE SOLUTION */}
      <section className="w-full bg-[#0a0a0f] py-32 px-6 border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-ravex-purple text-xs font-bold tracking-[0.2em] mb-4 uppercase">The Solution</p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase leading-tight mb-6">
              Your Music World.<br/>
              One App.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              RaveX brings events, artists, communities, experiences and your music identity together in one place.
            </p>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, rotateY: 90 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.6 }}
          >
            <motion.span 
              className="text-7xl font-black italic tracking-tighter mb-8 glow-btn p-8 rounded-full bg-black/50 border border-ravex-purple/20 inline-block"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              Rave<span className="text-transparent bg-clip-text bg-gradient-to-r from-ravex-pink to-ravex-purple pr-2">X</span>
            </motion.span>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400">
              Discover <span className="mx-2">x</span> Experience <span className="mx-2">x</span> Connect
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: WHAT YOU GET */}
      <section className="w-full bg-[#050505] py-32 px-6 border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.p 
            className="text-ravex-purple text-xs font-bold tracking-[0.2em] mb-16 uppercase text-center"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What You Get
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: Search, title: "Discover", desc: "Find events, artists and new music.", color: "text-ravex-cyan" },
              { icon: Ticket, title: "Experience", desc: "Be part of live moments that matter.", color: "text-ravex-pink" },
              { icon: Users, title: "Connect", desc: "Meet people with the same vibe.", color: "text-ravex-purple" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="flex flex-col items-center border-r border-white/5 last:border-0 pb-12 md:pb-0"
                initial={{ y: 100, opacity: 0, scale: 0.5 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2, type: "spring", bounce: 0.5 }}
              >
                <div className="w-20 h-20 rounded-full border border-ravex-purple flex items-center justify-center mb-8 glow-btn">
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">{item.title}</h3>
                <p className="text-gray-400 text-sm max-w-[200px]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: MUSIC PASSPORT */}
      <section className="relative w-full bg-ravex-gradient py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-center relative z-10">
          <motion.div 
            className="lg:pr-8"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-ravex-purple text-xs font-bold tracking-[0.2em] mb-4 uppercase">Music Passport</p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase leading-tight mb-6">
              Your Music<br/>
              Journey,<br/>
              Remembered.
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-sm">
              Every event. Every artist. Every city.<br/>
              Your experiences shape your story.<br/>
              With <span className="font-bold text-white">RaveX Music Passport</span>,<br/>
              your journey lives on.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex justify-center py-12"
            initial={{ scale: 0, rotateZ: -180, opacity: 0 }}
            whileInView={{ scale: 1, rotateZ: 3, opacity: 1 }}
            whileHover={{ scale: 1.05, rotateZ: 0, rotateX: 10, rotateY: -10 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.5 }}
          >
            <div className="w-72 h-96 rounded-2xl bg-black border border-ravex-purple/50 shadow-[0_0_50px_rgba(139,92,246,0.3)] flex flex-col p-8 relative overflow-hidden cursor-pointer transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-ravex-purple/20 to-transparent"></div>
              <span className="text-2xl font-black italic tracking-tighter relative z-10 mb-auto">Rave<span className="text-ravex-pink">X</span></span>
              <div className="relative z-10 self-center my-auto w-24 h-24 border border-ravex-purple rounded-full flex items-center justify-center">
                <div className="w-full h-px bg-ravex-purple absolute"></div>
                <div className="h-full w-px bg-ravex-purple absolute"></div>
                <div className="w-16 h-16 rounded-full border border-ravex-purple absolute"></div>
              </div>
              <p className="text-[10px] tracking-widest text-center uppercase text-gray-400 relative z-10 mt-auto">MUSIC PASSPORT</p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-8 lg:pl-12">
            {[
              { val: "27", label: "Events" },
              { val: "14", label: "Artists" },
              { val: "08", label: "Cities" },
              { val: "COUNTLESS", label: "Memories", color: "text-ravex-purple", isText: true }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2, type: "spring" }}
              >
                <p className={`${stat.isText ? 'text-xl' : 'text-4xl'} font-bold mb-1 ${stat.color || ''}`}>{stat.val}</p>
                <p className="text-[10px] tracking-widest text-gray-400 uppercase font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: BOTTOM CTA */}
      <section className="relative w-full py-40 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 bg-cover bg-bottom bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('/rave-bg.jpg')" }}
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-black pointer-events-none" />
        
        <motion.div 
          className="relative z-10 max-w-2xl w-full"
          initial={{ y: 150, opacity: 0, scale: 0.8 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        >
          <p className="text-xs tracking-[0.2em] text-gray-300 mb-6 uppercase font-bold">
            Be part of a bigger tomorrow
          </p>
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
            Join The Movement
          </h2>
          <p className="text-gray-400 mb-12">
            Get early access. Be the first to know.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 justify-center" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="bg-black/50 border border-white/20 text-white rounded-lg px-6 py-4 outline-none focus:border-ravex-purple transition-colors flex-grow max-w-md backdrop-blur-sm"
            />
            <SpecularButton 
              type="submit"
              className="whitespace-nowrap flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              JOIN RAVEX <span>→</span>
            </SpecularButton>
          </form>
          <p className="text-[10px] text-gray-500 mt-4">No spam. Just music.</p>
        </motion.div>
      </section>

      {/* SECTION 7: FOOTER */}
      <footer className="w-full bg-black py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div>
            <span className="text-3xl font-black italic tracking-tighter block mb-2">Rave<span className="text-transparent bg-clip-text bg-gradient-to-r from-ravex-pink to-ravex-purple pr-2">X</span></span>
            <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">Your music world. One app.</p>
          </div>
          
          <div className="flex gap-6">
            <a href="https://www.instagram.com/ravex.live?stkn=emtpdWwwMGRjcjg4" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><X className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1a6 6 0 0 0-9 0h-1a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-1h2v1a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2z"></path><path d="M9 14h.01"></path><path d="M15 14h.01"></path></svg></a>
          </div>

          <div className="text-right">
            <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase leading-relaxed font-bold">
              Music<br/>People<br/>Places<br/>Together
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 border-t border-white/5 pt-8">
          <p>© 2026 RaveX. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-300 transition">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition">Terms</a>
            <a href="#" className="hover:text-gray-300 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
