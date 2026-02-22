
export interface District {
  name: string;
  bnName: string;
  offset: number; // minutes relative to Dhaka
}

export const districts: District[] = [
  { name: "Dhaka", bnName: "ঢাকা", offset: 0 },
  { name: "Chittagong", bnName: "চট্টগ্রাম", offset: -5 },
  { name: "Sylhet", bnName: "সিলেট", offset: -6 },
  { name: "Rajshahi", bnName: "রাজশাহী", offset: 7 },
  { name: "Khulna", bnName: "খুলনা", offset: 5 },
  { name: "Barisal", bnName: "বরিশাল", offset: 1 },
  { name: "Rangpur", bnName: "রংপুর", offset: 5 },
  { name: "Mymensingh", bnName: "ময়মনসিংহ", offset: -1 },
  { name: "Comilla", bnName: "কুমিল্লা", offset: -3 },
  { name: "Gazipur", bnName: "গাজীপুর", offset: 0 },
  { name: "Narayanganj", bnName: "নারায়ণগঞ্জ", offset: 0 },
  { name: "Brahmanbaria", bnName: "ব্রাহ্মণবাড়িয়া", offset: -3 },
  { name: "Noakhali", bnName: "নোয়াখালী", offset: -2 },
  { name: "Feni", bnName: "ফেনী", offset: -3 },
  { name: "Chandpur", bnName: "চাঁদপুর", offset: -1 },
  { name: "Lakshmipur", bnName: "লক্ষ্মীপুর", offset: -1 },
  { name: "Cox's Bazar", bnName: "কক্সবাজার", offset: -6 },
  { name: "Bandarban", bnName: "বান্দরবান", offset: -6 },
  { name: "Khagrachari", bnName: "খাগড়াছড়ি", offset: -5 },
  { name: "Rangamati", bnName: "রাঙ্গামাটি", offset: -6 },
  { name: "Pabna", bnName: "পাবনা", offset: 5 },
  { name: "Sirajganj", bnName: "সিরাজগঞ্জ", offset: 3 },
  { name: "Bogra", bnName: "বগুড়া", offset: 4 },
  { name: "Joypurhat", bnName: "জয়পুরহাট", offset: 5 },
  { name: "Naogaon", bnName: "নওগাঁ", offset: 6 },
  { name: "Natore", bnName: "নাটোর", offset: 6 },
  { name: "Chapai Nawabganj", bnName: "চাঁপাইনবাবগঞ্জ", offset: 9 },
  { name: "Jessore", bnName: "যশোর", offset: 6 },
  { name: "Satkhira", bnName: "সাতক্ষীরা", offset: 7 },
  { name: "Meherpur", bnName: "মেহেরপুর", offset: 8 },
  { name: "Kushtia", bnName: "কুষ্টিয়া", offset: 7 },
  { name: "Chuadanga", bnName: "চুয়াডাঙ্গা", offset: 8 },
  { name: "Jhenaidah", bnName: "ঝিনাইদহ", offset: 7 },
  { name: "Magura", bnName: "মাগুরা", offset: 5 },
  { name: "Narail", bnName: "নড়াইল", offset: 5 },
  { name: "Bagerhat", bnName: "বাগেরহাট", offset: 4 },
  { name: "Pirojpur", bnName: "পিরোজপুর", offset: 3 },
  { name: "Jhalokati", bnName: "ঝালকাঠি", offset: 2 },
  { name: "Patuakhali", bnName: "পটুয়াখালী", offset: 2 },
  { name: "Bhola", bnName: "ভোলা", offset: 0 },
  { name: "Barguna", bnName: "বরগুনা", offset: 3 },
  { name: "Tangail", bnName: "টাঙ্গাইল", offset: 2 },
  { name: "Manikganj", bnName: "মানিকগঞ্জ", offset: 1 },
  { name: "Munshiganj", bnName: "মুন্সীগঞ্জ", offset: 0 },
  { name: "Faridpur", bnName: "ফরিদপুর", offset: 2 },
  { name: "Madaripur", bnName: "মাদারীপুর", offset: 1 },
  { name: "Shariatpur", bnName: "শরীয়তপুর", offset: 1 },
  { name: "Gopalganj", bnName: "গোপালগঞ্জ", offset: 3 },
  { name: "Rajbari", bnName: "রাজবাড়ী", offset: 3 },
  { name: "Kishoreganj", bnName: "কিশোরগঞ্জ", offset: -2 },
  { name: "Netrokona", bnName: "নেত্রকোণা", offset: -2 },
  { name: "Sherpur", bnName: "শেরপুর", offset: 1 },
  { name: "Jamalpur", bnName: "জামালপুর", offset: 2 },
  { name: "Sunamganj", bnName: "সুনামগঞ্জ", offset: -5 },
  { name: "Habiganj", bnName: "হবিগঞ্জ", offset: -4 },
  { name: "Moulvibazar", bnName: "মৌলভীবাজার", offset: -5 },
  { name: "Dinajpur", bnName: "দিনাজপুর", offset: 7 },
  { name: "Thakurgaon", bnName: "ঠাকুরগাঁও", offset: 8 },
  { name: "Panchagarh", bnName: "পঞ্চগড়", offset: 8 },
  { name: "Gaibandha", bnName: "গাইবান্ধা", offset: 4 },
  { name: "Kurigram", bnName: "কুড়িগ্রাম", offset: 3 },
  { name: "Nilphamari", bnName: "নীলফামারী", offset: 6 },
  { name: "Lalmonirhat", bnName: "লালমনিরহাট", offset: 4 }
];

export interface RamadanDay {
  day: number;
  date: string; // ISO string (YYYY-MM-DD)
  sehri: string; // HH:mm
  iftar: string; // HH:mm
  banglaDate: string;
  banglaDay: string;
}

// Base timings for Dhaka (Provided by user)
export const dhakaRamadan2026: RamadanDay[] = [
    { day: 1, date: "2026-02-19", sehri: "05:12", iftar: "17:58", banglaDate: "১৯ ফেব্রুয়ারি", banglaDay: "বৃহস্পতি" },
    { day: 2, date: "2026-02-20", sehri: "05:11", iftar: "17:58", banglaDate: "২০ ফেব্রুয়ারি", banglaDay: "শুক্র" },
    { day: 3, date: "2026-02-21", sehri: "05:11", iftar: "17:59", banglaDate: "২১ ফেব্রুয়ারি", banglaDay: "শনি" },
    { day: 4, date: "2026-02-22", sehri: "05:10", iftar: "17:59", banglaDate: "২২ ফেব্রুয়ারি", banglaDay: "রবি" },
    { day: 5, date: "2026-02-23", sehri: "05:09", iftar: "18:00", banglaDate: "২৩ ফেব্রুয়ারি", banglaDay: "সোম" },
    { day: 6, date: "2026-02-24", sehri: "05:08", iftar: "18:00", banglaDate: "২৪ ফেব্রুয়ারি", banglaDay: "মঙ্গল" },
    { day: 7, date: "2026-02-25", sehri: "05:08", iftar: "18:01", banglaDate: "২৫ ফেব্রুয়ারি", banglaDay: "বুধ" },
    { day: 8, date: "2026-02-26", sehri: "05:07", iftar: "18:01", banglaDate: "২৬ ফেব্রুয়ারি", banglaDay: "বৃহস্পতি" },
    { day: 9, date: "2026-02-27", sehri: "05:06", iftar: "18:02", banglaDate: "২৭ ফেব্রুয়ারি", banglaDay: "শুক্র" },
    { day: 10, date: "2026-02-28", sehri: "05:05", iftar: "18:02", banglaDate: "২৮ ফেব্রুয়ারি", banglaDay: "শনি" },
    { day: 11, date: "2026-03-01", sehri: "05:04", iftar: "18:03", banglaDate: "১ মার্চ", banglaDay: "রবি" },
    { day: 12, date: "2026-03-02", sehri: "05:04", iftar: "18:03", banglaDate: "২ মার্চ", banglaDay: "সোম" },
    { day: 13, date: "2026-03-03", sehri: "05:03", iftar: "18:04", banglaDate: "৩ মার্চ", banglaDay: "মঙ্গল" },
    { day: 14, date: "2026-03-04", sehri: "05:02", iftar: "18:04", banglaDate: "৪ মার্চ", banglaDay: "বুধ" },
    { day: 15, date: "2026-03-05", sehri: "05:01", iftar: "18:05", banglaDate: "৫ মার্চ", banglaDay: "বৃহস্পতি" },
    { day: 16, date: "2026-03-06", sehri: "05:00", iftar: "18:05", banglaDate: "৬ মার্চ", banglaDay: "শুক্র" },
    { day: 17, date: "2026-03-07", sehri: "04:59", iftar: "18:06", banglaDate: "৭ মার্চ", banglaDay: "শনি" },
    { day: 18, date: "2026-03-08", sehri: "04:58", iftar: "18:06", banglaDate: "৮ মার্চ", banglaDay: "রবি" },
    { day: 19, date: "2026-03-09", sehri: "04:57", iftar: "18:07", banglaDate: "৯ মার্চ", banglaDay: "সোম" },
    { day: 20, date: "2026-03-10", sehri: "04:57", iftar: "18:07", banglaDate: "১০ মার্চ", banglaDay: "মঙ্গল" },
    { day: 21, date: "2026-03-11", sehri: "04:56", iftar: "18:07", banglaDate: "১১ মার্চ", banglaDay: "বুধ" },
    { day: 22, date: "2026-03-12", sehri: "04:55", iftar: "18:08", banglaDate: "১২ মার্চ", banglaDay: "বৃহস্পতি" },
    { day: 23, date: "2026-03-13", sehri: "04:54", iftar: "18:08", banglaDate: "১৩ মার্চ", banglaDay: "শুক্র" },
    { day: 24, date: "2026-03-14", sehri: "04:53", iftar: "18:09", banglaDate: "১৪ মার্চ", banglaDay: "শনি" },
    { day: 25, date: "2026-03-15", sehri: "04:52", iftar: "18:09", banglaDate: "১৫ মার্চ", banglaDay: "রবি" },
    { day: 26, date: "2026-03-16", sehri: "04:51", iftar: "18:10", banglaDate: "১৬ মার্চ", banglaDay: "সোম" },
    { day: 27, date: "2026-03-17", sehri: "04:50", iftar: "18:10", banglaDate: "১৭ মার্চ", banglaDay: "মঙ্গল" },
    { day: 28, date: "2026-03-18", sehri: "04:49", iftar: "18:10", banglaDate: "১৮ মার্চ", banglaDay: "বুধ" },
    { day: 29, date: "2026-03-19", sehri: "04:48", iftar: "18:11", banglaDate: "১৯ মার্চ", banglaDay: "বৃহস্পতি" },
    { day: 30, date: "2026-03-20", sehri: "04:47", iftar: "18:11", banglaDate: "২০ মার্চ", banglaDay: "শুক্র" }
];

export const duas = [
  {
    title: "Sehri Dua (Intention for Fasting)",
    arabic: "نَوَيْتُ اَنْ اَصُوْمَ رَمَضَانَ الْكَرِيْمِ مِنْ شَهْرِ رَمَضَانَ الْمُبَارَكِ لِلّٰهِ تَعَالَى",
    transliteration: "Nawaitu an asuma ghadan min shahri ramadanal mubarak lillahi ta'ala.",
    translation: "I intend to keep the fast for tomorrow in the month of Ramadan, purely for the sake of Allah.",
    bangla: "আমি আল্লাহর সন্তুষ্টির জন্য আগামীকালের রমজান মাসের রোজা রাখার নিয়ত করছি।"
  },
  {
    title: "Iftar Dua",
    arabic: "اَللّٰهُمَّ اِنِّی لَکَ صُمْتُ وَبِکَ اٰمَنْتُ وَعَلَيْکَ تَوَکَّلْتُ وَعَلٰی رِزْقِکَ اَفْطَرْتُ",
    transliteration: "Allahumma inni laka sumtu wa bika amantu wa 'alayka tawakkaltu wa 'ala rizqika aftartu.",
    translation: "O Allah! I fasted for You and I believe in You and I put my trust in You and with Your sustenance I break my fast.",
    bangla: "হে আল্লাহ! আমি তোমারই জন্য রোজা রেখেছি এবং তোমারই দেয়া রিজিক দ্বারা ইফতার করছি।"
  }
];
