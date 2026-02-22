import React, { useState, useEffect, useMemo } from 'react';
import { format, addMinutes, parse, isAfter, isBefore, startOfDay, addDays } from 'date-fns';
import { Moon, Sun, MapPin, Clock, Calendar as CalendarIcon, ChevronDown, BookOpen, ExternalLink, Share2, Printer, Sparkles, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { GoogleGenAI } from "@google/genai";
import { districts, dhakaRamadan2026, type District, type RamadanDay, duas } from './data/ramadanData';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getApiKey = () => {
  try {
    return process.env.GEMINI_API_KEY || "";
  } catch (e) {
    return "";
  }
};

let aiInstance: GoogleGenAI | null = null;
const getAi = () => {
  const key = getApiKey();
  if (!key) return null;
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey: key });
  }
  return aiInstance;
};

export default function App() {
  const [selectedDistrict, setSelectedDistrict] = useState<District>(districts[0]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDistrictMenuOpen, setIsDistrictMenuOpen] = useState(false);
  const [districtSearch, setDistrictSearch] = useState('');
  const [hadith, setHadith] = useState<{ text: string; reference: string } | null>(null);
  const [isLoadingHadith, setIsLoadingHadith] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchHadith() {
      const ai = getAi();
      if (!ai) {
        console.warn("GEMINI_API_KEY is missing. Hadith feature disabled.");
        return;
      }
      
      setIsLoadingHadith(true);
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: "Provide a short, inspiring Hadith related to Ramadan or fasting. Include the text in English and its reference (e.g., Sahih Bukhari). Keep it concise.",
        });
        const text = response.text || "";
        const lines = text.split('\n').filter(l => l.trim());
        setHadith({
          text: lines[0] || "Fasting is a shield.",
          reference: lines[1] || "Sahih Bukhari"
        });
      } catch (error) {
        console.error("Failed to fetch Hadith:", error);
      } finally {
        setIsLoadingHadith(false);
      }
    }
    fetchHadith();
  }, []);

  const filteredDistricts = useMemo(() => {
    return districts.filter(d => 
      d.name.toLowerCase().includes(districtSearch.toLowerCase()) || 
      d.bnName.includes(districtSearch)
    );
  }, [districtSearch]);

  const adjustedCalendar = useMemo(() => {
    return dhakaRamadan2026.map(day => {
      const sehriTime = parse(day.sehri, 'HH:mm', new Date(day.date));
      const iftarTime = parse(day.iftar, 'HH:mm', new Date(day.date));
      
      return {
        ...day,
        sehri: format(addMinutes(sehriTime, selectedDistrict.offset), 'HH:mm'),
        iftar: format(addMinutes(iftarTime, selectedDistrict.offset), 'HH:mm'),
      };
    });
  }, [selectedDistrict]);

  const nextEvent = useMemo(() => {
    const today = format(currentTime, 'yyyy-MM-dd');
    const currentDayData = adjustedCalendar.find(d => d.date === today);
    
    if (!currentDayData) {
      const firstDay = adjustedCalendar[0];
      const firstDaySehri = parse(`${firstDay.date} ${firstDay.sehri}`, 'yyyy-MM-dd HH:mm', new Date());
      if (isBefore(currentTime, firstDaySehri)) {
        return { type: 'Ramadan Starts', time: firstDaySehri, label: 'First Sehri' };
      }
      return null;
    }

    const sehriTime = parse(`${currentDayData.date} ${currentDayData.sehri}`, 'yyyy-MM-dd HH:mm', new Date());
    const iftarTime = parse(`${currentDayData.date} ${currentDayData.iftar}`, 'yyyy-MM-dd HH:mm', new Date());

    if (isBefore(currentTime, sehriTime)) {
      return { type: 'Sehri', time: sehriTime, label: 'Sehri Ends' };
    } else if (isBefore(currentTime, iftarTime)) {
      return { type: 'Iftar', time: iftarTime, label: 'Iftar Starts' };
    } else {
      const nextDay = adjustedCalendar.find(d => d.day === currentDayData.day + 1);
      if (nextDay) {
        const nextSehri = parse(`${nextDay.date} ${nextDay.sehri}`, 'yyyy-MM-dd HH:mm', new Date());
        return { type: 'Sehri', time: nextSehri, label: 'Next Sehri' };
      }
    }
    return null;
  }, [currentTime, adjustedCalendar]);

  const timeRemaining = useMemo(() => {
    if (!nextEvent) return null;
    const diff = nextEvent.time.getTime() - currentTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { hours, minutes, seconds };
  }, [nextEvent, currentTime]);

  const format12h = (time24h: string) => {
    if (!time24h || time24h === '--:--') return '--:--';
    const [hours, minutes] = time24h.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-ramadan-cream selection:bg-ramadan-gold/30">
      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border-[40px] border-ramadan-green" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border-[40px] border-ramadan-gold" />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-12 pb-8 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-4"
        >
          <div className="flex items-center justify-center gap-2 text-ramadan-gold mb-2">
            <Moon className="w-5 h-5 fill-current" />
            <span className="uppercase tracking-[0.3em] text-xs font-semibold">Ramadan Kareem</span>
            <Moon className="w-5 h-5 fill-current scale-x-[-1]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-ramadan-green">
            Ramadan 2026
          </h1>
          <p className="text-ramadan-dark/60 italic font-serif mt-2">Bangladesh Calendar</p>
        </motion.div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-24 space-y-12">
        
        {/* District & Current Status Section */}
        <section className="grid lg:grid-cols-3 gap-8">
          {/* District Selector Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-black/5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-ramadan-gold mb-4">
                <MapPin className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest font-bold">Location</span>
              </div>
              <h2 className="text-3xl font-serif font-semibold mb-2">{selectedDistrict.name}</h2>
              <p className="text-ramadan-dark/40 text-sm mb-6">{selectedDistrict.bnName} জেলা</p>
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsDistrictMenuOpen(!isDistrictMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-ramadan-cream rounded-xl border border-black/5 hover:border-ramadan-gold transition-colors"
              >
                <span className="text-sm font-medium">Change District</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", isDistrictMenuOpen && "rotate-180")} />
              </button>
              
              <AnimatePresence>
                {isDistrictMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-0 right-0 mb-2 max-h-80 overflow-hidden bg-white rounded-xl shadow-xl border border-black/10 z-50 flex flex-col"
                  >
                    <div className="p-2 border-b border-black/5">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-ramadan-dark/30" />
                        <input 
                          type="text"
                          placeholder="Search district..."
                          value={districtSearch}
                          onChange={(e) => setDistrictSearch(e.target.value)}
                          className="w-full pl-8 pr-4 py-2 bg-ramadan-cream rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-ramadan-gold/50"
                          autoFocus
                        />
                      </div>
                    </div>
                    <div className="overflow-y-auto p-2 grid grid-cols-2 gap-1 max-h-64">
                      {filteredDistricts.length > 0 ? (
                        filteredDistricts.map((d) => (
                          <button
                            key={d.name}
                            onClick={() => {
                              setSelectedDistrict(d);
                              setIsDistrictMenuOpen(false);
                              setDistrictSearch('');
                            }}
                            className={cn(
                              "text-left px-3 py-2 rounded-lg text-sm transition-colors",
                              selectedDistrict.name === d.name 
                                ? "bg-ramadan-green text-white" 
                                : "hover:bg-ramadan-cream"
                            )}
                          >
                            {d.name}
                          </button>
                        ))
                      ) : (
                        <div className="col-span-2 py-4 text-center text-xs text-ramadan-dark/40 italic">
                          No districts found
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Countdown Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 bg-ramadan-green text-white rounded-3xl p-8 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Clock className="w-32 h-32" />
            </div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-ramadan-gold mb-4">
                  <div className="w-2 h-2 rounded-full bg-ramadan-gold animate-pulse" />
                  <span className="text-xs uppercase tracking-widest font-bold">Live Countdown</span>
                </div>
                
                {nextEvent ? (
                  <>
                    <h3 className="text-lg font-serif italic opacity-80 mb-2">{nextEvent.label} in</h3>
                    <div className="flex gap-4 md:gap-8 items-end">
                      <div className="flex flex-col">
                        <span className="text-5xl md:text-7xl font-serif font-bold tabular-nums">
                          {String(timeRemaining?.hours).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest opacity-50 mt-1">Hours</span>
                      </div>
                      <span className="text-4xl md:text-6xl font-serif opacity-30 pb-2">:</span>
                      <div className="flex flex-col">
                        <span className="text-5xl md:text-7xl font-serif font-bold tabular-nums">
                          {String(timeRemaining?.minutes).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest opacity-50 mt-1">Minutes</span>
                      </div>
                      <span className="text-4xl md:text-6xl font-serif opacity-30 pb-2">:</span>
                      <div className="flex flex-col">
                        <span className="text-5xl md:text-7xl font-serif font-bold tabular-nums">
                          {String(timeRemaining?.seconds).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest opacity-50 mt-1">Seconds</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <h3 className="text-3xl font-serif italic">Ramadan is approaching...</h3>
                )}
              </div>

              <div className="mt-8 flex items-center gap-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <Sun className="w-5 h-5 text-ramadan-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-50">Sehri Ends</p>
                    <p className="text-xl font-serif font-bold">
                      {format12h(adjustedCalendar.find(d => d.date === format(currentTime, 'yyyy-MM-dd'))?.sehri || '--:--')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <Moon className="w-5 h-5 text-ramadan-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-50">Iftar Starts</p>
                    <p className="text-xl font-serif font-bold">
                      {format12h(adjustedCalendar.find(d => d.date === format(currentTime, 'yyyy-MM-dd'))?.iftar || '--:--')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Hadith of the Day */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-ramadan-gold/10 rounded-3xl p-8 border border-ramadan-gold/20 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-ramadan-gold mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest font-bold">Hadith of the Day</span>
          </div>
          {isLoadingHadith ? (
            <div className="animate-pulse space-y-2">
              <div className="h-4 bg-ramadan-gold/20 w-3/4 mx-auto rounded" />
              <div className="h-4 bg-ramadan-gold/20 w-1/2 mx-auto rounded" />
            </div>
          ) : hadith ? (
            <div className="max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl font-serif italic text-ramadan-green mb-4">
                "{hadith.text}"
              </p>
              <p className="text-xs font-bold uppercase tracking-widest opacity-40">— {hadith.reference}</p>
            </div>
          ) : null}
        </motion.section>

        {/* Calendar Grid */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-6 h-6 text-ramadan-gold" />
              <h2 className="text-3xl font-serif font-bold">Full Calendar</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4 text-xs uppercase tracking-widest font-bold text-ramadan-dark/40 mr-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-ramadan-green/10" />
                  <span>Past</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-ramadan-gold" />
                  <span>Today</span>
                </div>
              </div>
              <button className="p-2 hover:bg-ramadan-dark/5 rounded-full transition-colors opacity-40 hover:opacity-100">
                <Printer className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-ramadan-dark/5 rounded-full transition-colors opacity-40 hover:opacity-100">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {adjustedCalendar.map((day) => {
              const isToday = day.date === format(currentTime, 'yyyy-MM-dd');
              const isPast = isBefore(parse(day.date, 'yyyy-MM-dd', new Date()), startOfDay(currentTime)) && !isToday;
              
              return (
                <motion.div
                  key={day.day}
                  whileHover={{ y: -4 }}
                  className={cn(
                    "relative p-6 rounded-2xl border transition-all duration-300",
                    isToday 
                      ? "bg-white border-ramadan-gold shadow-lg ring-1 ring-ramadan-gold/20" 
                      : isPast 
                        ? "bg-ramadan-dark/5 border-transparent opacity-60" 
                        : "bg-white border-black/5 hover:border-ramadan-gold/30 shadow-sm"
                  )}
                >
                  {isToday && (
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-ramadan-gold text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter shadow-sm">
                      Today
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-3xl font-serif font-bold text-ramadan-green">
                        {day.day}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest font-bold ml-1 opacity-40">Ramadan</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium">{day.banglaDate}</p>
                      <p className="text-[10px] opacity-40">{day.banglaDay}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 opacity-60">
                        <Sun className="w-3 h-3" />
                        <span>Sehri</span>
                      </div>
                      <span className="font-serif font-bold">{format12h(day.sehri)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 opacity-60">
                        <Moon className="w-3 h-3" />
                        <span>Iftar</span>
                      </div>
                      <span className="font-serif font-bold">{format12h(day.iftar)}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Duas Section */}
        <section className="grid md:grid-cols-2 gap-8">
          {duas.map((dua, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-ramadan-cream flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-ramadan-gold" />
                </div>
                <h3 className="text-xl font-serif font-bold">{dua.title}</h3>
              </div>
              
              <div className="space-y-6">
                <p className="text-3xl font-serif text-right leading-loose text-ramadan-green" dir="rtl">
                  {dua.arabic}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-ramadan-gold mb-1">Bangla</p>
                    <p className="text-sm font-medium leading-relaxed">{dua.bangla}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-ramadan-gold mb-1">Transliteration</p>
                    <p className="text-sm italic opacity-70 leading-relaxed">{dua.transliteration}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-ramadan-gold mb-1">English Translation</p>
                    <p className="text-sm opacity-70 leading-relaxed">{dua.translation}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Footer Info */}
        <footer className="pt-12 border-t border-black/5 text-center space-y-4">
          <p className="text-sm text-ramadan-dark/40 max-w-2xl mx-auto">
            Timings are based on the Islamic Foundation Bangladesh standards for Dhaka. 
            District offsets are approximate. Please consult your local mosque for precise timings.
          </p>
          <div className="flex items-center justify-center gap-6 text-xs font-bold uppercase tracking-widest text-ramadan-gold">
            <span>© ২০২৬ ডিজাইন ও ডেভেলপমেন্ট: Md. Irfan</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
