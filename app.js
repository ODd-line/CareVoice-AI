document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const recordBtn = document.getElementById("recordBtn");
  const transcriptBox = document.getElementById("transcriptBox");
  const aiResponse = document.getElementById("aiResponse");
  const langBtns = document.querySelectorAll(".lang-btn");
  const sosBtn = document.getElementById("sosBtn");
  const statusPill = document.getElementById("statusPill");
  const revealEls = document.querySelectorAll(".reveal");
  const counterEls = document.querySelectorAll(".counter");
  const demoScenarioLabel = document.getElementById("demoScenarioLabel");
  const demoScenarioText = document.getElementById("demoScenarioText");
  const mockTranscript = document.getElementById("mockTranscript");
  const mockInsight = document.getElementById("mockInsight");
  const mockSignal = document.getElementById("mockSignal");
  const exportBtn = document.getElementById("exportBtn");
  const demoModeBtn = document.getElementById("demoModeBtn");
  const judgeModeStatus = document.getElementById("judgeModeStatus");
  const evidenceTotal = document.getElementById("evidenceTotal");
  const evidenceMix = document.getElementById("evidenceMix");
  const evidenceLatency = document.getElementById("evidenceLatency");
  const evidenceSus = document.getElementById("evidenceSus");
  const openPortalBtn = document.getElementById("openPortalBtn");
  const globalLangSelect = document.getElementById("globalLangSelect");
  const countryThemeBadge = document.getElementById("countryThemeBadge");
  const languageSwitchStatus = document.getElementById("languageSwitchStatus");
  const spainThemeToggleBtn = document.getElementById("spainThemeToggleBtn");
  const googleLoginBtn = document.getElementById("googleLoginBtn");
  const backWelcomeBtn = document.getElementById("backWelcomeBtn");
  const switchAccountBtn = document.getElementById("switchAccountBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const authStatusText = document.getElementById("authStatusText");
  const memberStatusText = document.getElementById("memberStatusText");
  const memberNameValue = document.getElementById("memberNameValue");
  const memberModeValue = document.getElementById("memberModeValue");
  const memberRiskValue = document.getElementById("memberRiskValue");
  const memberLastSyncValue = document.getElementById("memberLastSyncValue");
  const recentLogsList = document.getElementById("recentLogsList");
  const addQuickNoteBtn = document.getElementById("addQuickNoteBtn");
  const saveCarePlanBtn = document.getElementById("saveCarePlanBtn");
  const generateBriefBtn = document.getElementById("generateBriefBtn");
  const memberNotesList = document.getElementById("memberNotesList");
  const sessionBriefText = document.getElementById("sessionBriefText");
  const aiSignalCategory = document.getElementById("aiSignalCategory");
  const aiSignalConfidence = document.getElementById("aiSignalConfidence");
  const aiSignalSeverity = document.getElementById("aiSignalSeverity");
  const aiSignalNextStep = document.getElementById("aiSignalNextStep");
  const seeSoundTarget = document.getElementById("seeSoundTarget");
  const seeSoundCompareBtn = document.getElementById("seeSoundCompareBtn");
  const seeSoundTranscript = document.getElementById("seeSoundTranscript");
  const seeSoundIpa = document.getElementById("seeSoundIpa");
  const seeSoundScore = document.getElementById("seeSoundScore");
  const seeSoundAdvice = document.getElementById("seeSoundAdvice");
  const seeSoundMouth = document.getElementById("seeSoundMouth");
  const seeSoundMouthHint = document.getElementById("seeSoundMouthHint");
  const seeSoundCoachImage = document.getElementById("seeSoundCoachImage");
  const loginPortal = document.getElementById("loginPortal");
  const memberUnlockBtn = document.getElementById("memberUnlockBtn");
  const appExperience = document.getElementById("appExperience");
  const memberGateBanner = document.getElementById("memberGateBanner");
  const memberLockables = document.querySelectorAll(".member-lockable");
  const memberOnlyBadges = document.querySelectorAll(".member-only-badge");
  const brandHomeLink = document.querySelector(".brand-lockup");

  let currentLang = "en-US";
  let activeUiLang = "en";
  let recognition = null;
  let isListening = false;
  let scenarioIndex = 0;
  let activeUserId = "local-demo";
  let judgeModeTimer = null;
  let judgeModeRemaining = 0;
  const localLogsKey = "carevoice.logs.v1";
  const memberNotesKey = "carevoice.member.notes.v1";
  const uiLangKey = "carevoice.ui.lang.v1";
  const spainThemeVariantKey = "carevoice.es.theme.variant.v1";
  const localLogs = [];
  const memberNotes = [];
  const responseLatencies = [];
  let mouthGuideTimer = null;
  let spainThemeVariant = localStorage.getItem(spainThemeVariantKey) === "rich" ? "rich" : "light";

  const demoScenarios = [
    {
      label: "Medication reminder check-in",
      transcript: "我啱啱食咗血壓藥，今晚要再食嗎？",
      insight: "Medication-related input logged. Caregiver summary prepared.",
      note: "Medication adherence journey: low-friction daily monitoring"
    },
    {
      label: "Symptom escalation monitoring",
      transcript: "我今日有啲頭暈同胸口唔舒服。",
      insight: "Symptom logged. Suggest caregiver review and doctor consultation.",
      note: "Symptom tracking journey: early warning and triage support"
    },
    {
      label: "Emergency detection workflow",
      transcript: "He fainted in the bathroom, please help now.",
      insight: "Emergency signal detected. SOS escalation pathway activated.",
      note: "Emergency journey: fast alert pipeline with caregiver visibility"
    }
  ];

  const i18n = {
    en: {
      "nav.professionals": "Professionals",
      "nav.platform": "Platform",
      "nav.journey": "Journey",
      "nav.market": "Market",
      "nav.contact": "Contact",
      "nav.language": "Language",
      "nav.switching": "Switching language...",
      "nav.switchDone": "Language updated",
      "nav.switchLocalOnly": "Language updated (local mode; translator unavailable)",
      "nav.memberLogin": "Member Login",
      "nav.demo": "Request Live Demo",
      "welcome.eyebrow": "Bienvenue",
      "welcome.title": "CareVoice Clinical Connect",
      "welcome.copy": "Une plateforme professionnelle de sante vocale pour les equipes de soins aux aines, les partenaires communautaires et les aidants familiaux a Hong Kong.",
      "welcome.status": "Utilisez le bouton Connexion membre en haut a droite pour ouvrir l'acces professionnel.",
      "portal.eyebrow": "Portail Membre",
      "portal.title": "Console d'acces professionnel",
      "portal.signInGoogle": "Se connecter avec Google",
      "portal.back": "Retour a l'accueil",
      "gate.preview": "Mode Apercu",
      "gate.title": "Essayez l'experience principale avant la connexion",
      "gate.copy": "Vous pouvez tester la capture vocale et le coach de prononciation maintenant. Connectez-vous pour debloquer les exports, le mode jury et les outils complets de l'espace membre.",
      "gate.button": "Ouvrir la connexion membre",
      "voice.title": "Studio de capture vocale",
      "voice.live": "Direct",
      "voice.stack": "Pile d'intelligence vocale",
      "nav.spainThemeLight": "Spain Theme: Light",
      "nav.spainThemeRich": "Spain Theme: Rich",
      "welcome.eyebrow": "Welcome",
      "voice.liveTranscript": "Transcription en direct",
      "voice.aiInsight": "Insight IA",
      "voice.seeSoundTitle": "Coach de prononciation SeeSound",
      "voice.targetPlaceholder": "J'ai besoin d'aide pour la prononciation",
      "welcome.title": "CareVoice Clinical Connect",
      "voice.visualCoach": "Coach visuel de communication",
      "voice.coachCaption": "Observez la posture des levres et reproduisez la forme de la bouche pendant que vous parlez.",
      "voice.lipGuide": "Guide labial : suivez le mouvement des levres et copiez la forme en parlant",
      "welcome.copy": "A professional voice-health platform for elderly care teams, community partners, and family caregivers across Hong Kong.",
      "welcome.status": "Use the small Member Login button on the top-right to open the professional access portal.",
      "portal.eyebrow": "Member Portal",
      "portal.title": "Professional Access Console",
      "portal.signInGoogle": "Sign in with Google",
      "portal.back": "Back to Welcome",
      "gate.preview": "Preview Mode",
      "gate.title": "Try the core experience before login",
      "gate.copy": "You can test voice capture and pronunciation coaching now. Sign in to unlock exports, judge mode, and full member workspace tools.",
      "gate.button": "Open Member Login",
      "voice.title": "Voice Capture Studio",
      "voice.live": "Live",
      "voice.stack": "Speech Intelligence Stack",
      "voice.recordBtn": "🎙️ Hold to Speak",
      "voice.quickCantonese": "Cantonese",
      "voice.quickEnglish": "English",
      "voice.liveTranscript": "Live Transcript",
      "voice.aiInsight": "AI Insight",
      "voice.seeSoundTitle": "SeeSound Pronunciation Coach",
      "voice.targetPlaceholder": "I need help with pronunciation",
      "voice.compare": "Compare with Target",
      "voice.visualCoach": "Visual Communication Coach",
      "voice.coachCaption": "Watch lip posture and match your mouth shape while speaking.",
      "voice.lipGuide": "Lip guide: follow the moving lips and copy the shape while speaking",
      "voice.upperLip": "Upper Lip",
      "voice.lowerLip": "Lower Lip"
    },
    zh: {
      "nav.professionals": "醫護專區",
      "nav.platform": "平台",
      "nav.journey": "流程",
      "nav.market": "市場",
      "nav.contact": "聯絡",
      "nav.language": "語言",
      "nav.switching": "轉緊語言...",
      "nav.switchDone": "語言轉好咗",
      "nav.switchLocalOnly": "語言轉好咗（本地模式，翻譯服務暫時用唔到）",
      "nav.memberLogin": "會員登入",
      "nav.demo": "申請即時示範",
      "nav.spainThemeLight": "西班牙主題：淺色",
      "nav.spainThemeRich": "西班牙主題：濃郁",
      "welcome.eyebrow": "歡迎",
      "welcome.title": "CareVoice 臨床連接平台",
      "welcome.copy": "專為長者照護團隊、社區夥伴與家庭照顧者而設的專業語音健康平台。",
      "welcome.status": "請用右上角會員登入，打開專業存取入口。",
      "portal.eyebrow": "會員入口",
      "portal.title": "專業存取控制台",
      "portal.signInGoogle": "使用 Google 登入",
      "portal.back": "返回歡迎頁",
      "gate.preview": "預覽模式",
      "gate.title": "登入前都可以先體驗核心功能",
      "gate.copy": "你可以先試語音輸入同發音教練。登入後就可以解鎖匯出、評審模式同完整會員工具。",
      "gate.button": "打開會員登入",
      "voice.title": "語音錄製工作室",
      "voice.live": "即時",
      "voice.stack": "語音智能技術層",
      "voice.recordBtn": "🎙️ 撳住講嘢",
      "voice.quickCantonese": "粵語",
      "voice.quickEnglish": "英文",
      "voice.liveTranscript": "即時語音轉錄",
      "voice.aiInsight": "AI 健康分析",
      "voice.seeSoundTitle": "SeeSound 發音教練",
      "voice.targetPlaceholder": "我想改善發音",
      "voice.compare": "同目標句比較",
      "voice.visualCoach": "可視化發音教練",
      "voice.coachCaption": "睇住嘴形，講嘢時跟住模仿。",
      "voice.lipGuide": "嘴形指引：跟住移動中嘅嘴唇去模仿口形",
      "voice.upperLip": "上唇",
      "voice.lowerLip": "下唇"
    },
    de: {
      "nav.professionals": "Fachkräfte",
      "nav.platform": "Plattform",
      "nav.journey": "Ablauf",
      "nav.market": "Markt",
      "nav.contact": "Kontakt",
      "nav.language": "Sprache",
      "nav.switching": "Sprache wird umgestellt...",
      "nav.switchDone": "Sprache aktualisiert",
      "nav.switchLocalOnly": "Sprache aktualisiert (lokaler Modus; Ubersetzer nicht verfugbar)",
      "nav.memberLogin": "Mitglieder-Login",
      "nav.demo": "Live-Demo anfragen",
      "nav.spainThemeLight": "Spanien-Theme: Hell",
      "nav.spainThemeRich": "Spanien-Theme: Intensiv",
      "welcome.eyebrow": "Willkommen",
      "welcome.title": "CareVoice Clinical Connect",
      "welcome.copy": "Eine professionelle Sprach-Gesundheitsplattform für Pflegeteams, Partner und Familien.",
      "welcome.status": "Nutzen Sie den Mitglieder-Login oben rechts für den professionellen Zugang.",
      "portal.eyebrow": "Mitgliederportal",
      "portal.title": "Professionelle Zugriffskonsole",
      "portal.signInGoogle": "Mit Google anmelden",
      "portal.back": "Zurück",
      "gate.preview": "Vorschau-Modus",
      "gate.title": "Kernfunktionen vor Login testen",
      "gate.copy": "Sprachaufnahme und Aussprache-Coaching können sofort getestet werden.",
      "gate.button": "Mitglieder-Login öffnen",
      "voice.title": "Spracherfassungs-Studio",
      "voice.live": "Live",
      "voice.stack": "Sprachintelligenz-Stack",
      "voice.recordBtn": "🎙️ Zum Sprechen halten",
      "voice.quickCantonese": "Kantonesisch",
      "voice.quickEnglish": "Englisch",
      "voice.liveTranscript": "Live-Transkript",
      "voice.aiInsight": "KI-Einblick",
      "voice.seeSoundTitle": "SeeSound Aussprache-Coach",
      "voice.targetPlaceholder": "Ich brauche Hilfe bei der Aussprache",
      "voice.compare": "Mit Ziel vergleichen",
      "voice.visualCoach": "Visueller Kommunikationscoach",
      "voice.coachCaption": "Achte auf die Lippenhaltung und imitiere die Mundform beim Sprechen.",
      "voice.lipGuide": "Lippenhilfe: Folge den bewegten Lippen und kopiere die Form",
      "voice.upperLip": "Oberlippe",
      "voice.lowerLip": "Unterlippe"
    },
    ja: {
      "nav.professionals": "医療専門職",
      "nav.platform": "プラットフォーム",
      "nav.journey": "利用フロー",
      "nav.market": "市場",
      "nav.contact": "連絡先",
      "nav.language": "言語",
      "nav.switching": "言語を切り替え中...",
      "nav.switchDone": "言語を更新しました",
      "nav.switchLocalOnly": "言語を更新しました（ローカルモード: 翻訳サービスを利用できません）",
      "nav.memberLogin": "メンバーログイン",
      "nav.demo": "ライブデモを依頼",
      "nav.spainThemeLight": "スペインテーマ: ライト",
      "nav.spainThemeRich": "スペインテーマ: リッチ",
      "welcome.eyebrow": "ようこそ",
      "welcome.title": "CareVoice Clinical Connect",
      "welcome.copy": "高齢者ケアチームと家族向けの音声ヘルスケアプラットフォームです。",
      "welcome.status": "右上のメンバーログインからプロ向けアクセスを開いてください。",
      "portal.eyebrow": "メンバーポータル",
      "portal.title": "プロフェッショナルアクセスコンソール",
      "portal.signInGoogle": "Google でログイン",
      "portal.back": "戻る",
      "gate.preview": "プレビューモード",
      "gate.title": "ログイン前にコア機能を体験",
      "gate.copy": "音声入力と発音コーチを先に試せます。",
      "gate.button": "メンバーログインを開く",
      "voice.title": "音声キャプチャスタジオ",
      "voice.live": "ライブ",
      "voice.stack": "音声インテリジェンス構成",
      "voice.recordBtn": "🎙️ 押して話す",
      "voice.quickCantonese": "広東語",
      "voice.quickEnglish": "英語",
      "voice.liveTranscript": "ライブ文字起こし",
      "voice.aiInsight": "AI インサイト",
      "voice.seeSoundTitle": "SeeSound 発音コーチ",
      "voice.targetPlaceholder": "発音の練習をしたい",
      "voice.compare": "目標と比較",
      "voice.visualCoach": "ビジュアル発音コーチ",
      "voice.coachCaption": "唇の形を見ながら、話すときに同じ形を真似してください。",
      "voice.lipGuide": "唇ガイド：動く唇に合わせて口の形を真似する",
      "voice.upperLip": "上唇",
      "voice.lowerLip": "下唇"
    },
    es: {
      "nav.professionals": "Profesionales",
      "nav.platform": "Plataforma",
      "nav.journey": "Recorrido",
      "nav.market": "Mercado",
      "nav.contact": "Contacto",
      "nav.language": "Idioma",
      "nav.switching": "Cambiando idioma...",
      "nav.switchDone": "Idioma actualizado",
      "nav.switchLocalOnly": "Idioma actualizado (modo local: traductor no disponible)",
      "nav.memberLogin": "Inicio de sesión",
      "nav.demo": "Solicitar demo",
      "nav.spainThemeLight": "Tema España: Claro",
      "nav.spainThemeRich": "Tema España: Intenso",
      "welcome.eyebrow": "Bienvenido",
      "welcome.title": "CareVoice Clinical Connect",
      "welcome.copy": "Una plataforma profesional de salud por voz para equipos de cuidado de mayores, socios comunitarios y cuidadores familiares en Hong Kong.",
      "welcome.status": "Usa el botón de inicio de sesión de miembro en la esquina superior derecha para abrir el acceso profesional.",
      "portal.eyebrow": "Portal de Miembros",
      "portal.title": "Consola de Acceso Profesional",
      "portal.signInGoogle": "Iniciar sesión con Google",
      "portal.back": "Volver a Bienvenida",
      "gate.preview": "Modo de Vista Previa",
      "gate.title": "Prueba la experiencia principal antes de iniciar sesión",
      "gate.copy": "Puedes probar ahora la captura de voz y el entrenamiento de pronunciación. Inicia sesión para desbloquear exportaciones, modo jurado y herramientas completas del espacio de miembros.",
      "gate.button": "Abrir inicio de sesión de miembro",
      "voice.title": "Estudio de Captura de Voz",
      "voice.live": "En vivo",
      "voice.stack": "Stack de Inteligencia de Voz",
      "voice.recordBtn": "🎙️ Mantener para hablar",
      "voice.quickCantonese": "Cantonés",
      "voice.quickEnglish": "Inglés",
      "voice.liveTranscript": "Transcripción en vivo",
      "voice.aiInsight": "Insight de IA",
      "voice.seeSoundTitle": "Entrenador de pronunciación SeeSound",
      "voice.targetPlaceholder": "Necesito ayuda con la pronunciación",
      "voice.compare": "Comparar con objetivo",
      "voice.visualCoach": "Entrenador visual de comunicación",
      "voice.coachCaption": "Observa la postura de los labios e imita la forma de la boca mientras hablas.",
      "voice.lipGuide": "Guía labial: sigue el movimiento de los labios y copia la forma mientras hablas",
      "voice.upperLip": "Labio superior",
      "voice.lowerLip": "Labio inferior"
    },
    fr: {
      "nav.professionals": "Professionnels",
      "nav.platform": "Plateforme",
      "nav.journey": "Parcours",
      "nav.market": "Marché",
      "nav.contact": "Contact",
      "nav.language": "Langue",
      "nav.switching": "Changement de langue...",
      "nav.switchDone": "Langue mise a jour",
      "nav.switchLocalOnly": "Langue mise a jour (mode local : traducteur indisponible)",
      "nav.memberLogin": "Connexion membre",
      "nav.demo": "Demander une démo",
      "nav.spainThemeLight": "Thème Espagne : Clair",
      "nav.spainThemeRich": "Thème Espagne : Intense",
      "voice.recordBtn": "🎙️ Maintenir pour parler",
      "voice.quickCantonese": "Cantonais",
      "voice.quickEnglish": "Anglais",
      "voice.compare": "Comparer à la cible",
      "voice.upperLip": "Lèvre supérieure",
      "voice.lowerLip": "Lèvre inférieure"
    }
  };

  const uiToSpeechLang = {
    en: "en-US",
    zh: "zh-HK",
    de: "de-DE",
    ja: "ja-JP",
    es: "es-ES",
    fr: "fr-FR"
  };

  const uiToGoogleLang = {
    en: "en",
    zh: "zh-TW",
    de: "de",
    ja: "ja",
    es: "es",
    fr: "fr"
  };

  let pendingGoogleLang = null;
  let googleTranslateReady = false;
  let translationRetryTimer = null;
  let switchStatusTimer = null;

  // Google callback entrypoint from the external translate script.
  window.__carevoiceInitTranslate = () => {
    tryInitGoogleTranslateWidget();
  };
  window.googleTranslateElementInit = () => {
    if (typeof window.__carevoiceInitTranslate === "function") {
      window.__carevoiceInitTranslate();
    }
  };

  const quickSpeechToUiLang = {
    "zh-HK": "zh",
    "en-US": "en"
  };

  const staticFallbackMaps = {
    zh: {
      "BUSINESS PROPOSITION": "商業主張",
      "Voice-to-Care Continuum": "語音到照護連續流程",
      "From symptom narration to caregiver escalation and audit logs in one unified workflow.": "由症狀敘述到照顧者升級同審核紀錄，全部放喺同一個流程。",
      "DEPLOYMENT READINESS": "部署就緒",
      "Institutional Grade Rollout": "機構級落地推行",
      "Designed for NGOs, clinics, and pilot programmes with measurable operational outcomes.": "為 NGO、診所同試點計劃而設，營運成效可量化。",
      "TRUST FRAMEWORK": "信任框架",
      "Responsible AI + Human Oversight": "負責任 AI + 人手監督",
      "Assistive decision support only, with transparent risk flags and non-diagnostic safeguards.": "只提供輔助決策支持，風險提示透明，並設有非診斷安全機制。",
      "HEALTHCARE PROFESSIONALS": "醫護專業人員",
      "Built for Doctors, Nurses, and Care Managers": "為醫生、護士同照護經理而設",
      "Doctor View": "醫生視角",
      "Nursing Team": "護理團隊",
      "Care Manager": "照護經理",
      "Open Professional Workspace": "開啟專業工作區",
      "View Evidence Library": "查看證據資料庫",
      "COMPANY POSITIONING": "公司定位",
      "A Full-Stack Voice Health Platform for Aging Communities": "面向高齡社群嘅全棧語音健康平台",
      "Start Product Demo": "開始產品示範",
      "View Market Potential": "查看市場潛力",
      "CORE OFFERING": "核心方案",
      "Voice-First Care OS": "語音優先照護系統",
      "BUSINESS READINESS": "商業化就緒",
      "B2B2C Expansion": "B2B2C 擴展",
      "ACTIVE SESSION": "目前會話",
      "Member Access": "會員存取",
      "Trial mode active. Member login required for exports, judge mode, and cloud sync.": "試用模式進行中。匯出、評審模式同雲端同步需要會員登入。",
      "OPERATIONS COCKPIT": "營運控制台",
      "Member Workspace Overview": "會員工作區總覽",
      "SESSION MODE": "會話模式",
      "Trial": "試用",
      "SIGNED-IN MEMBER": "已登入會員",
      "Not Signed In": "未登入",
      "RISK EVENTS IN SESSION": "本次會話風險事件",
      "LAST SYNC": "最後同步",
      "Not Synced": "未同步",
      "Recent Voice Records": "最近語音紀錄",
      "Professional Checklist": "專業檢查清單",
      "MEMBER COMMAND DECK": "會員指令面板",
      "Professional Follow-up Tools": "專業跟進工具",
      "Add Follow-up Note": "新增跟進備註",
      "Save Care Plan Snapshot": "儲存照護計劃快照",
      "Generate Session Brief": "產生會話摘要",
      "Member Notes": "會員備註",
      "No notes yet.": "暫時未有備註。",
      "Auto Brief": "自動摘要",
      "PROFESSOR DEMO VIEW": "教授示範視圖",
      "Designed Like a Fundable Health-Tech Product": "以可融資醫療科技產品標準設計",
      "REAL-LIFE SCENARIOS": "真實生活場景",
      "How CareVoice Works in Daily Life": "CareVoice 喺日常生活點樣運作",
      "ASSESSMENT EVIDENCE": "評審證據",
      "HOW PEOPLE USE IT": "實際使用方式",
      "GO-TO-MARKET": "市場拓展策略",
      "REVENUE MODEL": "收入模式",
      "DEFENSIBILITY": "護城河",
      "MARKET INTELLIGENCE": "市場情報",
      "Verified Findings": "已驗證發現",
      "Discover More: Reports, Media, Expert Voices": "深入了解：報告、媒體、專家觀點",
      "DESIGNED FOR COLLABORATION WITH": "協作對象",
      "University Labs": "大學實驗室",
      "Elderly NGOs": "長者 NGO",
      "Primary Clinics": "基層診所",
      "Caregiver Networks": "照顧者網絡",
      "Platform": "平台",
      "Market": "市場",
      "Live Demo": "即時示範"
    },
    de: {
      "BUSINESS PROPOSITION": "GESCHÄFTSPROPOSITION",
      "Voice-to-Care Continuum": "Sprach-zu-Pflege-Kontinuum",
      "DEPLOYMENT READINESS": "EINSATZBEREITSCHAFT",
      "Institutional Grade Rollout": "Rollout auf Institutionsniveau",
      "TRUST FRAMEWORK": "VERTRAUENSRAHMEN",
      "Responsible AI + Human Oversight": "Verantwortungsvolle KI + menschliche Aufsicht",
      "HEALTHCARE PROFESSIONALS": "GESUNDHEITSFACHKRÄFTE",
      "Built for Doctors, Nurses, and Care Managers": "Für Ärzte, Pflegekräfte und Care Manager entwickelt",
      "Doctor View": "Arztansicht",
      "Nursing Team": "Pflegeteam",
      "Care Manager": "Care Manager",
      "Open Professional Workspace": "Professionellen Arbeitsbereich öffnen",
      "View Evidence Library": "Evidenzbibliothek ansehen",
      "COMPANY POSITIONING": "UNTERNEHMENSPOSITIONIERUNG",
      "Start Product Demo": "Produktdemo starten",
      "View Market Potential": "Marktpotenzial ansehen",
      "CORE OFFERING": "KERNANGEBOT",
      "Voice-First Care OS": "Voice-First Care OS",
      "BUSINESS READINESS": "GESCHÄFTSREIFE",
      "B2B2C Expansion": "B2B2C-Expansion",
      "ACTIVE SESSION": "AKTIVE SITZUNG",
      "Member Access": "Mitgliederzugang",
      "OPERATIONS COCKPIT": "BETRIEBSCOCKPIT",
      "Member Workspace Overview": "Überblick Mitgliederarbeitsbereich",
      "SESSION MODE": "SITZUNGSMODUS",
      "Trial": "Testmodus",
      "SIGNED-IN MEMBER": "ANGEMELDETES MITGLIED",
      "Not Signed In": "Nicht angemeldet",
      "RISK EVENTS IN SESSION": "RISIKOEREIGNISSE IN DER SITZUNG",
      "LAST SYNC": "LETZTE SYNCHRONISIERUNG",
      "Not Synced": "Nicht synchronisiert",
      "Recent Voice Records": "Letzte Sprachaufzeichnungen",
      "Professional Checklist": "Professionelle Checkliste",
      "MEMBER COMMAND DECK": "MITGLIEDER-KOMMANDODECK",
      "Professional Follow-up Tools": "Professionelle Nachverfolgungstools",
      "Add Follow-up Note": "Nachverfolgungsnotiz hinzufügen",
      "Save Care Plan Snapshot": "Pflegeplan-Snapshot speichern",
      "Generate Session Brief": "Sitzungszusammenfassung erstellen",
      "Member Notes": "Mitgliedernotizen",
      "No notes yet.": "Noch keine Notizen.",
      "ASSESSMENT EVIDENCE": "BEWERTUNGSNACHWEISE",
      "GO-TO-MARKET": "GO-TO-MARKET",
      "REVENUE MODEL": "ERLÖSMODELL",
      "DEFENSIBILITY": "VERTEIDIGBARKEIT",
      "MARKET INTELLIGENCE": "MARKTINTELLIGENZ",
      "Verified Findings": "Verifizierte Erkenntnisse",
      "Platform": "Plattform",
      "Market": "Markt",
      "Live Demo": "Live-Demo"
    },
    ja: {
      "BUSINESS PROPOSITION": "ビジネス提案",
      "Voice-to-Care Continuum": "音声からケアまでの連続導線",
      "DEPLOYMENT READINESS": "導入準備",
      "Institutional Grade Rollout": "機関レベルの展開",
      "TRUST FRAMEWORK": "信頼フレームワーク",
      "Responsible AI + Human Oversight": "責任あるAI + 人間による監督",
      "HEALTHCARE PROFESSIONALS": "医療専門職",
      "Built for Doctors, Nurses, and Care Managers": "医師・看護師・ケアマネージャー向けに設計",
      "Doctor View": "医師ビュー",
      "Nursing Team": "看護チーム",
      "Care Manager": "ケアマネージャー",
      "Open Professional Workspace": "プロ向けワークスペースを開く",
      "View Evidence Library": "エビデンスライブラリを見る",
      "COMPANY POSITIONING": "企業ポジショニング",
      "Start Product Demo": "製品デモを開始",
      "View Market Potential": "市場ポテンシャルを見る",
      "CORE OFFERING": "コア提供価値",
      "Voice-First Care OS": "音声ファースト ケアOS",
      "BUSINESS READINESS": "事業準備性",
      "B2B2C Expansion": "B2B2C拡大",
      "ACTIVE SESSION": "アクティブセッション",
      "Member Access": "メンバーアクセス",
      "OPERATIONS COCKPIT": "運用コックピット",
      "Member Workspace Overview": "メンバーワークスペース概要",
      "SESSION MODE": "セッションモード",
      "Trial": "試用",
      "SIGNED-IN MEMBER": "ログイン中メンバー",
      "Not Signed In": "未ログイン",
      "RISK EVENTS IN SESSION": "セッション内リスクイベント",
      "LAST SYNC": "最終同期",
      "Not Synced": "未同期",
      "Recent Voice Records": "最近の音声記録",
      "Professional Checklist": "プロ向けチェックリスト",
      "MEMBER COMMAND DECK": "メンバーコマンドデッキ",
      "Professional Follow-up Tools": "プロ向けフォローアップツール",
      "Add Follow-up Note": "フォローアップメモを追加",
      "Save Care Plan Snapshot": "ケアプランのスナップショットを保存",
      "Generate Session Brief": "セッション要約を生成",
      "Member Notes": "メンバーノート",
      "No notes yet.": "まだノートはありません。",
      "ASSESSMENT EVIDENCE": "評価エビデンス",
      "GO-TO-MARKET": "市場展開",
      "REVENUE MODEL": "収益モデル",
      "DEFENSIBILITY": "防衛優位性",
      "MARKET INTELLIGENCE": "市場インテリジェンス",
      "Verified Findings": "検証済みの知見",
      "Platform": "プラットフォーム",
      "Market": "市場",
      "Live Demo": "ライブデモ"
    },
    es: {
      "BUSINESS PROPOSITION": "PROPUESTA DE NEGOCIO",
      "Voice-to-Care Continuum": "Continuo de voz a cuidado",
      "DEPLOYMENT READINESS": "PREPARACION DE DESPLIEGUE",
      "Institutional Grade Rollout": "Despliegue de nivel institucional",
      "TRUST FRAMEWORK": "MARCO DE CONFIANZA",
      "Responsible AI + Human Oversight": "IA responsable + supervision humana",
      "HEALTHCARE PROFESSIONALS": "PROFESIONALES DE LA SALUD",
      "Built for Doctors, Nurses, and Care Managers": "Disenado para medicos, enfermeria y gestores de cuidado",
      "Doctor View": "Vista del medico",
      "Nursing Team": "Equipo de enfermeria",
      "Care Manager": "Gestor de cuidado",
      "Open Professional Workspace": "Abrir espacio profesional",
      "View Evidence Library": "Ver biblioteca de evidencias",
      "COMPANY POSITIONING": "POSICIONAMIENTO DE LA EMPRESA",
      "Start Product Demo": "Iniciar demo del producto",
      "View Market Potential": "Ver potencial de mercado",
      "CORE OFFERING": "OFERTA PRINCIPAL",
      "Voice-First Care OS": "Sistema de cuidado priorizando voz",
      "BUSINESS READINESS": "PREPARACION DE NEGOCIO",
      "B2B2C Expansion": "Expansion B2B2C",
      "ACTIVE SESSION": "SESION ACTIVA",
      "Member Access": "Acceso de miembro",
      "OPERATIONS COCKPIT": "CABINA DE OPERACIONES",
      "Member Workspace Overview": "Resumen del espacio de miembros",
      "SESSION MODE": "MODO DE SESION",
      "Trial": "Prueba",
      "SIGNED-IN MEMBER": "MIEMBRO CON SESION",
      "Not Signed In": "Sin iniciar sesion",
      "RISK EVENTS IN SESSION": "EVENTOS DE RIESGO EN LA SESION",
      "LAST SYNC": "ULTIMA SINCRONIZACION",
      "Not Synced": "Sin sincronizar",
      "Recent Voice Records": "Registros de voz recientes",
      "Professional Checklist": "Lista profesional",
      "MEMBER COMMAND DECK": "PANEL DE COMANDOS DE MIEMBRO",
      "Professional Follow-up Tools": "Herramientas profesionales de seguimiento",
      "Add Follow-up Note": "Agregar nota de seguimiento",
      "Save Care Plan Snapshot": "Guardar instantanea del plan de cuidado",
      "Generate Session Brief": "Generar resumen de sesion",
      "Member Notes": "Notas del miembro",
      "No notes yet.": "Aun no hay notas.",
      "ASSESSMENT EVIDENCE": "EVIDENCIA DE EVALUACION",
      "GO-TO-MARKET": "SALIDA AL MERCADO",
      "REVENUE MODEL": "MODELO DE INGRESOS",
      "DEFENSIBILITY": "DEFENSIBILIDAD",
      "MARKET INTELLIGENCE": "INTELIGENCIA DE MERCADO",
      "Verified Findings": "Hallazgos verificados",
      "Platform": "Plataforma",
      "Market": "Mercado",
      "Live Demo": "Demo en vivo"
    },
    fr: {
      "BUSINESS PROPOSITION": "PROPOSITION COMMERCIALE",
      "Voice-to-Care Continuum": "Continuum de la voix aux soins",
      "DEPLOYMENT READINESS": "PREPARATION AU DEPLOIEMENT",
      "Institutional Grade Rollout": "Deploiement de niveau institutionnel",
      "TRUST FRAMEWORK": "CADRE DE CONFIANCE",
      "Responsible AI + Human Oversight": "IA responsable + supervision humaine",
      "HEALTHCARE PROFESSIONALS": "PROFESSIONNELS DE SANTE",
      "Built for Doctors, Nurses, and Care Managers": "Concu pour medecins, infirmiers et gestionnaires de soins",
      "Doctor View": "Vue medecin",
      "Nursing Team": "Equipe infirmiere",
      "Care Manager": "Gestionnaire de soins",
      "Open Professional Workspace": "Ouvrir l'espace professionnel",
      "View Evidence Library": "Voir la bibliotheque de preuves",
      "COMPANY POSITIONING": "POSITIONNEMENT DE L'ENTREPRISE",
      "Start Product Demo": "Demarrer la demo produit",
      "View Market Potential": "Voir le potentiel du marche",
      "CORE OFFERING": "OFFRE PRINCIPALE",
      "Voice-First Care OS": "OS de soins axe sur la voix",
      "BUSINESS READINESS": "MATURITE COMMERCIALE",
      "B2B2C Expansion": "Expansion B2B2C",
      "ACTIVE SESSION": "SESSION ACTIVE",
      "Member Access": "Acces membre",
      "OPERATIONS COCKPIT": "COCKPIT D'OPERATIONS",
      "Member Workspace Overview": "Vue d'ensemble de l'espace membre",
      "SESSION MODE": "MODE DE SESSION",
      "Trial": "Essai",
      "SIGNED-IN MEMBER": "MEMBRE CONNECTE",
      "Not Signed In": "Non connecte",
      "RISK EVENTS IN SESSION": "EVENEMENTS DE RISQUE EN SESSION",
      "LAST SYNC": "DERNIERE SYNCHRONISATION",
      "Not Synced": "Non synchronise",
      "Recent Voice Records": "Enregistrements vocaux recents",
      "Professional Checklist": "Checklist professionnelle",
      "MEMBER COMMAND DECK": "PANEL DE COMMANDES MEMBRE",
      "Professional Follow-up Tools": "Outils professionnels de suivi",
      "Add Follow-up Note": "Ajouter une note de suivi",
      "Save Care Plan Snapshot": "Enregistrer l'instantane du plan de soins",
      "Generate Session Brief": "Generer le brief de session",
      "Member Notes": "Notes membre",
      "No notes yet.": "Aucune note pour le moment.",
      "ASSESSMENT EVIDENCE": "PREUVES D'EVALUATION",
      "GO-TO-MARKET": "STRATEGIE GO-TO-MARKET",
      "REVENUE MODEL": "MODELE DE REVENUS",
      "DEFENSIBILITY": "DEFENDABILITE",
      "MARKET INTELLIGENCE": "INTELLIGENCE DE MARCHE",
      "Verified Findings": "Constats verifies",
      "Platform": "Plateforme",
      "Market": "Marche",
      "Live Demo": "Demo en direct"
    }
  };

  function normalizeStaticText(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  function applyStaticFallback(lang) {
    const fallbackMap = staticFallbackMaps[lang];
    if (!fallbackMap) return;

    const leafElements = document.querySelectorAll("body *:not(script):not(style):not(noscript)");
    leafElements.forEach((el) => {
      if (el.closest("#google_translate_element")) return;
      if (el.childElementCount > 0) return;
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) return;

      const normalized = normalizeStaticText(el.textContent);
      if (!normalized) return;

      const translated = fallbackMap[normalized];
      if (!translated) return;

      if (!el.dataset.cvOriginalText) {
        el.dataset.cvOriginalText = el.textContent || "";
      }
      el.textContent = translated;
      el.dataset.cvFallbackTranslated = "1";
    });
  }

  function restoreStaticFallback() {
    const translatedEls = document.querySelectorAll("[data-cv-fallback-translated='1']");
    translatedEls.forEach((el) => {
      if (typeof el.dataset.cvOriginalText === "string") {
        el.textContent = el.dataset.cvOriginalText;
      }
      delete el.dataset.cvFallbackTranslated;
      delete el.dataset.cvOriginalText;
    });
  }

  const countryThemeMeta = {
    en: {
      emoji: "🇺🇸",
      label: "United States Theme",
      coachImages: [
        "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
      ],
      coachAlt: "U.S. healthcare pronunciation coaching visual"
    },
    zh: {
      emoji: "🇭🇰",
      label: "Hong Kong Theme",
      coachImages: [
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80"
      ],
      coachAlt: "Hong Kong healthcare pronunciation coaching visual"
    },
    de: {
      emoji: "🇩🇪",
      label: "Germany Theme",
      coachImages: [
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80"
      ],
      coachAlt: "German healthcare pronunciation coaching visual"
    },
    ja: {
      emoji: "🇯🇵",
      label: "Japan Theme",
      coachImages: [
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80"
      ],
      coachAlt: "Japanese healthcare pronunciation coaching visual"
    },
    es: {
      emoji: "🇪🇸",
      label: "Spain Theme",
      coachImages: [
        "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
      ],
      coachAlt: "Spanish healthcare pronunciation coaching visual"
    },
    fr: {
      emoji: "🇫🇷",
      label: "France Theme",
      coachImages: [
        "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
      ],
      coachAlt: "French healthcare pronunciation coaching visual"
    }
  };

  function getTranslation(lang, key) {
    return (i18n[lang] && i18n[lang][key]) || (i18n.en && i18n.en[key]) || key;
  }

  function applyLocalI18nText(lang) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      el.textContent = getTranslation(lang, key);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (!key) return;
      const translated = getTranslation(lang, key);
      el.setAttribute("placeholder", translated);
      if (el.id === "seeSoundTarget") {
        el.value = translated;
      }
    });
  }

  function syncQuickLanguageButtons() {
    langBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === currentLang);
    });
  }

  function setLanguageSwitchStatus(message, tone) {
    if (!languageSwitchStatus) return;
    languageSwitchStatus.textContent = message || "";
    languageSwitchStatus.classList.remove("is-loading", "is-success");
    if (tone === "loading") languageSwitchStatus.classList.add("is-loading");
    if (tone === "success") languageSwitchStatus.classList.add("is-success");
  }

  function setGoogTransCookie(targetLang) {
    const cookieValue = `/en/${targetLang}`;
    document.cookie = `googtrans=${cookieValue};path=/;SameSite=Lax`;
    const host = window.location && window.location.hostname ? window.location.hostname : "";
    if (host && host.includes(".") && host !== "localhost") {
      document.cookie = `googtrans=${cookieValue};path=/;domain=.${host};SameSite=Lax`;
    }
  }

  function applyFullPageTranslation(uiLang, options = {}) {
    const { showStatus = true, maxAttempts = 10 } = options;
    const targetLang = uiToGoogleLang[uiLang] || "en";
    let translationApplied = targetLang === "en";
    setGoogTransCookie(targetLang);

    if (translationRetryTimer) {
      clearTimeout(translationRetryTimer);
      translationRetryTimer = null;
    }

    const attemptTranslation = (attempt = 0) => {
      const translateSelect = document.querySelector(".goog-te-combo");

      if (!translateSelect) {
        pendingGoogleLang = targetLang;
        if (attempt === 0) {
          initFullPageTranslationEngine();
        }
      } else {
        if (translateSelect.value !== targetLang) {
          translateSelect.value = targetLang;
          translateSelect.dispatchEvent(new Event("change", { bubbles: true }));
        }
        translationApplied = true;
      }

      if (attempt < maxAttempts) {
        translationRetryTimer = setTimeout(() => attemptTranslation(attempt + 1), 320);
      } else {
        if (showStatus) {
          const statusKey = translationApplied ? "nav.switchDone" : "nav.switchLocalOnly";
          setLanguageSwitchStatus(getTranslation(activeUiLang, statusKey), "success");
          if (switchStatusTimer) clearTimeout(switchStatusTimer);
          switchStatusTimer = setTimeout(() => setLanguageSwitchStatus(""), 1400);
        }
      }
    };

    attemptTranslation();
  }

  function tryInitGoogleTranslateWidget() {
    if (googleTranslateReady) return true;
    if (!window.google || !window.google.translate || !window.google.translate.TranslateElement) {
      return false;
    }

    const host = document.getElementById("google_translate_element");
    if (!host) return false;

    host.innerHTML = "";
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
        includedLanguages: "en,zh-TW,de,ja,es,fr"
      },
      "google_translate_element"
    );

    googleTranslateReady = true;
    if (pendingGoogleLang) {
      setTimeout(() => applyFullPageTranslation(activeUiLang), 250);
    }
    return true;
  }

  function initFullPageTranslationEngine() {
    if (tryInitGoogleTranslateWidget()) return;

    let attempts = 0;
    const maxAttempts = 30;
    const timer = setInterval(() => {
      attempts += 1;
      const ready = tryInitGoogleTranslateWidget();
      if (ready || attempts >= maxAttempts) {
        clearInterval(timer);
        if (!ready) {
          setLanguageSwitchStatus(getTranslation(activeUiLang, "nav.switchLocalOnly"), "success");
          if (switchStatusTimer) clearTimeout(switchStatusTimer);
          switchStatusTimer = setTimeout(() => setLanguageSwitchStatus(""), 1800);
        }
      }
    }, 300);
  }

  function applyCountryTheme(lang) {
    const theme = countryThemeMeta[lang] || countryThemeMeta.en;
    if (countryThemeBadge) {
      countryThemeBadge.textContent = `${theme.emoji} ${theme.label}`;
    }

    if (seeSoundCoachImage) {
      const candidates = Array.isArray(theme.coachImages) ? theme.coachImages.slice() : [];
      const fallback = countryThemeMeta.en && Array.isArray(countryThemeMeta.en.coachImages)
        ? countryThemeMeta.en.coachImages[0]
        : "";

      let imageIndex = 0;
      const tryNextImage = () => {
        if (!seeSoundCoachImage) return;
        const nextSrc = candidates[imageIndex] || fallback;
        if (!nextSrc) return;
        seeSoundCoachImage.src = nextSrc;
        imageIndex += 1;
      };

      seeSoundCoachImage.onerror = () => {
        if (imageIndex < candidates.length) {
          tryNextImage();
        } else if (fallback && seeSoundCoachImage.src !== fallback) {
          seeSoundCoachImage.src = fallback;
        }
      };

      tryNextImage();
      seeSoundCoachImage.alt = theme.coachAlt;
    }
  }

  function applyUiLanguage(lang) {
    const safeLang = i18n[lang] ? lang : "en";
    activeUiLang = safeLang;
    document.documentElement.lang = safeLang;
    if (document.body) {
      document.body.setAttribute("data-ui-lang", safeLang);
    }

    // Apply local i18n first so language changes are visible immediately,
    // even when Google Translate is delayed or unavailable.
    applyLocalI18nText(safeLang);
    restoreStaticFallback();
    applyStaticFallback(safeLang);

    if (switchStatusTimer) {
      clearTimeout(switchStatusTimer);
      switchStatusTimer = null;
    }
    setLanguageSwitchStatus(getTranslation(safeLang, "nav.switching"), "loading");

    currentLang = uiToSpeechLang[safeLang] || "en-US";
    if (recognition) recognition.lang = currentLang;
    syncQuickLanguageButtons();
    localStorage.setItem(uiLangKey, safeLang);
    applyFullPageTranslation(safeLang);
    applyCountryTheme(safeLang);
    updateSpainThemeVariantUi(safeLang);
  }

  function reassertTranslationsOnReturn() {
    const desiredUiLang = localStorage.getItem(uiLangKey) || activeUiLang || "en";

    // If something changed the stored language while we were away, fully re-apply.
    if (desiredUiLang !== activeUiLang) {
      applyUiLanguage(desiredUiLang);
      return;
    }

    // Otherwise, quietly re-apply the translation engine in case the browser
    // suspended/rewrote the translated DOM while the tab was inactive.
    if (desiredUiLang && desiredUiLang !== "en") {
      applyLocalI18nText(desiredUiLang);
      restoreStaticFallback();
      applyStaticFallback(desiredUiLang);
      applyFullPageTranslation(desiredUiLang, { showStatus: false, maxAttempts: 6 });
    }
  }

  function updateSpainThemeVariantUi(lang) {
    if (!document.body) return;

    if (lang === "es") {
      document.body.setAttribute("data-es-variant", spainThemeVariant);
      if (spainThemeToggleBtn) {
        spainThemeToggleBtn.hidden = false;
        const key = spainThemeVariant === "rich" ? "nav.spainThemeRich" : "nav.spainThemeLight";
        spainThemeToggleBtn.textContent = getTranslation(lang, key);
        spainThemeToggleBtn.setAttribute("aria-pressed", spainThemeVariant === "rich" ? "true" : "false");
      }
      return;
    }

    document.body.removeAttribute("data-es-variant");
    if (spainThemeToggleBtn) {
      spainThemeToggleBtn.hidden = true;
      spainThemeToggleBtn.setAttribute("aria-pressed", "false");
    }
  }

  function loadLocalLogs() {
    try {
      const parsed = JSON.parse(localStorage.getItem(localLogsKey) || "[]");
      if (Array.isArray(parsed)) {
        parsed.slice(-200).forEach((item) => localLogs.push(item));
      }
    } catch (err) {
      console.warn("Could not parse local logs:", err);
    }
  }

  function persistLocalLog(entry) {
    localLogs.push(entry);
    const trimmed = localLogs.slice(-200);
    localStorage.setItem(localLogsKey, JSON.stringify(trimmed));
    localLogs.length = 0;
    trimmed.forEach((item) => localLogs.push(item));
  }

  function loadMemberNotes() {
    try {
      const parsed = JSON.parse(localStorage.getItem(memberNotesKey) || "[]");
      if (Array.isArray(parsed)) {
        parsed.slice(-100).forEach((item) => memberNotes.push(item));
      }
    } catch (err) {
      console.warn("Could not parse member notes:", err);
    }
  }

  function persistMemberNote(text, type) {
    const entry = {
      text,
      type,
      timestamp: Date.now()
    };
    memberNotes.push(entry);
    const trimmed = memberNotes.slice(-100);
    localStorage.setItem(memberNotesKey, JSON.stringify(trimmed));
    memberNotes.length = 0;
    trimmed.forEach((item) => memberNotes.push(item));
  }

  function buildSessionBrief() {
    const latestLogs = localLogs.slice(-10);
    if (!latestLogs.length) {
      return "No interaction data yet. Capture voice input to generate a session brief.";
    }

    const categoryCounts = { general: 0, medication: 0, symptom: 0, emergency: 0 };
    latestLogs.forEach((item) => {
      if (categoryCounts[item.category] !== undefined) {
        categoryCounts[item.category] += 1;
      }
    });

    const dominantCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0][0];
    const avgLatency = responseLatencies.length
      ? Math.round(responseLatencies.reduce((a, b) => a + b, 0) / responseLatencies.length)
      : 0;

    return `Latest 10 interactions processed. Dominant category: ${dominantCategory}. Emergency events: ${categoryCounts.emergency}. Average response latency: ${avgLatency} ms.`;
  }

  function refreshMemberTools() {
    if (memberNotesList) {
      const latestNotes = memberNotes.slice(-6).reverse();
      memberNotesList.innerHTML = "";
      if (!latestNotes.length) {
        const li = document.createElement("li");
        li.textContent = "No notes yet.";
        memberNotesList.appendChild(li);
      } else {
        latestNotes.forEach((note) => {
          const li = document.createElement("li");
          li.textContent = `${new Date(note.timestamp).toLocaleString()} - ${note.type}: ${note.text}`;
          memberNotesList.appendChild(li);
        });
      }
    }

    if (sessionBriefText && sessionBriefText.textContent === "No brief generated yet.") {
      sessionBriefText.textContent = buildSessionBrief();
    }
  }

  function smoothScrollToY(targetY, duration) {
    const startY = window.scrollY;
    const delta = targetY - startY;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, startY + delta * eased);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  function glideToElement(element, offset) {
    if (!element) return;
    const targetY = element.getBoundingClientRect().top + window.scrollY - (offset || 0);
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      window.scrollTo(0, Math.max(0, targetY));
    } else {
      smoothScrollToY(Math.max(0, targetY), 700);
    }
  }

  function glideToPortal() {
    if (!loginPortal) return;
    glideToElement(loginPortal, 22);
  }

  function showLoginPortal() {
    if (!loginPortal) return;
    loginPortal.classList.remove("hidden");
    glideToPortal();
    shinePortal();
  }

  function shinePortal() {
    if (!loginPortal) return;
    loginPortal.classList.remove("portal-shine");
    requestAnimationFrame(() => {
      loginPortal.classList.add("portal-shine");
    });
  }

  function setupSmoothAnchorGlide() {
    document.addEventListener("click", (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      if (href === "#" || href.length < 2) return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      glideToElement(target, 18);

      // Keep URL hash aligned with current section.
      if (window.history && window.history.pushState) {
        window.history.pushState(null, "", href);
      }
    });
  }

  function setupParallax() {
    const parallaxTargets = document.querySelectorAll(
      ".welcome-story-card, .portal-check-card, .gallery-card, .member-dashboard, .showcase"
    );

    if (!parallaxTargets.length) return;

    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let ticking = false;

    function applyParallax() {
      const y = window.scrollY;
      parallaxTargets.forEach((el, index) => {
        const factor = ((index % 4) + 1) * 0.08;
        const shift = Math.max(-12, Math.min(12, (y * factor) / 10));
        el.style.transform = `translateY(${shift.toFixed(2)}px)`;
      });
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(applyParallax);
    }, { passive: true });

    applyParallax();
  }

  function setupBrandHomeButton() {
    if (!brandHomeLink) return;
    brandHomeLink.addEventListener("click", (event) => {
      event.preventDefault();
      if (loginPortal) loginPortal.classList.add("hidden");
      glideToElement(document.getElementById("top"), 0);
      if (window.history && window.history.pushState) {
        window.history.pushState(null, "", "#top");
      }
    });
  }

  function setFeatureAccess(isMember) {
    if (appExperience) {
      appExperience.classList.toggle("locked-preview", !isMember);
    }

    if (memberGateBanner) {
      memberGateBanner.classList.toggle("hidden", isMember);
    }

    memberLockables.forEach((section) => {
      section.classList.toggle("is-locked", !isMember);
    });

    memberOnlyBadges.forEach((badge) => {
      badge.classList.toggle("hidden", isMember);
    });

    const controlledElements = [
      exportBtn,
      demoModeBtn,
      addQuickNoteBtn,
      saveCarePlanBtn,
      generateBriefBtn,
      logoutBtn
    ];

    controlledElements.forEach((el) => {
      if (!el) return;
      el.disabled = !isMember;
    });

    if (!isMember) {
      if (statusPill) statusPill.textContent = "Trial Mode / 登入解鎖完整功能";
      if (judgeModeStatus) judgeModeStatus.textContent = "Trial mode active. Sign in to run Judge Mode and export evidence.";
      return;
    }

    if (statusPill && !isListening) statusPill.textContent = "系統就緒 / System Ready";
    if (judgeModeStatus && judgeModeStatus.textContent.includes("Preview mode")) {
      judgeModeStatus.textContent = "Judge Mode idle";
    }
  }

  function refreshEvidence() {
    let medicationCount = 0;
    let symptomCount = 0;
    let emergencyCount = 0;

    localLogs.forEach((item) => {
      if (item.category === "medication") medicationCount += 1;
      if (item.category === "symptom") symptomCount += 1;
      if (item.category === "emergency") emergencyCount += 1;
    });

    const avgLatency = responseLatencies.length
      ? Math.round(responseLatencies.reduce((a, b) => a + b, 0) / responseLatencies.length)
      : 0;

    if (evidenceTotal) evidenceTotal.textContent = String(localLogs.length);
    if (evidenceMix) evidenceMix.textContent = `${medicationCount} / ${symptomCount} / ${emergencyCount}`;
    if (evidenceLatency) evidenceLatency.textContent = avgLatency ? `${avgLatency} ms` : "-- ms";
    if (evidenceSus) evidenceSus.textContent = "82 / 100";

    if (memberRiskValue) memberRiskValue.textContent = String(emergencyCount);

    if (recentLogsList) {
      const latestLogs = localLogs.slice(-5).reverse();
      recentLogsList.innerHTML = "";
      if (!latestLogs.length) {
        const fallback = document.createElement("li");
        fallback.textContent = "No records yet.";
        recentLogsList.appendChild(fallback);
      } else {
        latestLogs.forEach((item) => {
          const li = document.createElement("li");
          const readableTime = new Date(item.timestamp).toLocaleString();
          const severityLabel = item.severity ? ` (${item.severity})` : "";
          li.textContent = `${readableTime} - ${item.category.toUpperCase()}${severityLabel} - ${item.text}`;
          recentLogsList.appendChild(li);
        });
      }
    }
  }

  function simpleWordDistance(a, b) {
    const s1 = (a || "").toLowerCase().trim();
    const s2 = (b || "").toLowerCase().trim();
    if (!s1 && !s2) return 0;

    const dp = Array.from({ length: s1.length + 1 }, () => Array(s2.length + 1).fill(0));
    for (let i = 0; i <= s1.length; i += 1) dp[i][0] = i;
    for (let j = 0; j <= s2.length; j += 1) dp[0][j] = j;

    for (let i = 1; i <= s1.length; i += 1) {
      for (let j = 1; j <= s2.length; j += 1) {
        const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }

    return dp[s1.length][s2.length];
  }

  function toIpaApproxEnglish(text) {
    const dict = {
      i: "aɪ",
      need: "niːd",
      help: "hɛlp",
      with: "wɪð",
      pronunciation: "prəˌnʌnsiˈeɪʃən",
      hello: "həˈloʊ",
      emergency: "ɪˈmɝːdʒənsi",
      medicine: "ˈmɛdɪsɪn",
      pain: "peɪn",
      cough: "kɒf",
      fever: "ˈfiːvər"
    };

    const tokens = (text || "")
      .toLowerCase()
      .replace(/[^a-z\s']/g, " ")
      .split(/\s+/)
      .filter(Boolean);

    if (!tokens.length) return "/ - /";

    const ipaTokens = tokens.map((token) => {
      if (dict[token]) return dict[token];
      return token
        .replace(/tion/g, "ʃən")
        .replace(/th/g, "θ")
        .replace(/sh/g, "ʃ")
        .replace(/ch/g, "tʃ")
        .replace(/oo/g, "uː")
        .replace(/ee/g, "iː")
        .replace(/a/g, "æ")
        .replace(/e/g, "ɛ")
        .replace(/i/g, "ɪ")
        .replace(/o/g, "ɒ")
        .replace(/u/g, "ʌ");
    });

    return `/${ipaTokens.join(" ")}/`;
  }

  function toIpaApproxCantonese(text) {
    const charMap = {
      我: "ŋɔː",
      你: "nei̯",
      佢: "kʰɵy̯",
      食: "sɪk̚",
      藥: "jœːk̚",
      痛: "tʰʊŋ",
      頭: "tʰɐu̯",
      暈: "wɐn",
      咳: "kʰɐt̚",
      熱: "jiːt̚",
      救: "kɐu̯",
      急: "kɐp̚",
      呼: "fuː",
      吸: "kʰɐp̚",
      難: "naːn",
      氣: "hei̯"
    };

    const chars = Array.from((text || "").trim()).filter((char) => char !== " ");
    if (!chars.length) return "/ - /";

    const ipa = chars.map((char) => charMap[char] || char).join(" ");
    return `/${ipa}/`;
  }

  function generatePronunciationAdvice(score, transcript, target) {
    if (score >= 90) return "Excellent articulation. Keep the rhythm steady and maintain the same mouth movement.";
    if (score >= 75) return "Good overall. Slow down slightly on stressed syllables and keep vowel length consistent.";
    if (score >= 55) return "Moderate match. Focus on clearer consonants and repeat phrase in shorter chunks.";
    if (!transcript) return "Speak one full sentence first, then compare with your target phrase.";
    if (!target) return "Set a target phrase to enable detailed correction suggestions.";
    return "Low match. Try speaking slower, exaggerate mouth opening, and repeat 2-3 times for improvement.";
  }

  function getMouthHintFromIpa(ipa) {
    const value = (ipa || "").toLowerCase();
    if (!value || value === "/ - /") {
      return { className: "mouth-neutral", hint: "Mouth hint: neutral opening" };
    }
    if (/[ouɔʊu]/.test(value)) {
      return { className: "mouth-rounded", hint: "Mouth hint: rounded lips for /o u/ sounds" };
    }
    if (/[aæɑ]/.test(value)) {
      return { className: "mouth-open", hint: "Mouth hint: open jaw for /a/ sounds" };
    }
    if (/[iɪeɛ]/.test(value)) {
      return { className: "mouth-wide", hint: "Mouth hint: wide smile shape for /i e/ sounds" };
    }
    return { className: "mouth-neutral", hint: "Mouth hint: neutral opening" };
  }

  function triggerMouthGuideAnimation() {
    if (!seeSoundMouth) return;

    seeSoundMouth.classList.remove("mouth-guiding");
    // Force reflow so animation can restart on each guidance update.
    void seeSoundMouth.offsetWidth;
    seeSoundMouth.classList.add("mouth-guiding");

    if (mouthGuideTimer) {
      clearTimeout(mouthGuideTimer);
    }

    mouthGuideTimer = setTimeout(() => {
      if (seeSoundMouth) seeSoundMouth.classList.remove("mouth-guiding");
    }, 1500);
  }

  function updateSeeSoundPanel(transcript) {
    if (!seeSoundTranscript || !seeSoundIpa || !seeSoundScore || !seeSoundAdvice) return;

    const target = seeSoundTarget ? seeSoundTarget.value.trim() : "";
    const cleanTranscript = (transcript || "").trim();
    const ipa = currentLang === "zh-HK"
      ? toIpaApproxCantonese(cleanTranscript)
      : toIpaApproxEnglish(cleanTranscript);

    const distance = simpleWordDistance(cleanTranscript, target || cleanTranscript);
    const denominator = Math.max((target || cleanTranscript).length, 1);
    const rawScore = Math.max(0, Math.round(100 - (distance / denominator) * 100));
    const score = cleanTranscript ? rawScore : 0;

    seeSoundTranscript.textContent = cleanTranscript || "Waiting for voice input...";
    seeSoundIpa.textContent = ipa;
    seeSoundScore.textContent = `${score}/100`;
    seeSoundAdvice.textContent = generatePronunciationAdvice(score, cleanTranscript, target);

    if (seeSoundMouth && seeSoundMouthHint) {
      const mouthHint = getMouthHintFromIpa(ipa);
      seeSoundMouth.classList.remove("mouth-neutral", "mouth-open", "mouth-rounded", "mouth-wide");
      seeSoundMouth.classList.add(mouthHint.className);
      seeSoundMouthHint.textContent = mouthHint.hint;
      triggerMouthGuideAnimation();
    }
  }

  function updateAuthUI(user) {
    if (!authStatusText || !googleLoginBtn || !logoutBtn) return;

    if (user) {
      const providerLabel = user.providerData && user.providerData[0] && user.providerData[0].providerId === "google.com"
        ? "Google"
        : "Authenticated";
      const userLabel = user.displayName || user.email || user.uid;
      authStatusText.textContent = `${providerLabel} login active: ${userLabel}. Cloud sync enabled.`;
      if (memberStatusText) {
        memberStatusText.textContent = `${providerLabel} account: ${userLabel}`;
      }
      if (memberNameValue) memberNameValue.textContent = userLabel;
      if (memberModeValue) memberModeValue.textContent = "Member";
      googleLoginBtn.disabled = true;
      if (switchAccountBtn) switchAccountBtn.disabled = false;
      logoutBtn.disabled = false;
      if (loginPortal) loginPortal.classList.add("hidden");
      setFeatureAccess(true);
    } else {
      authStatusText.textContent = "Not signed in. Trial mode is active for core testing. Sign in from Member Login to unlock full features.";
      if (memberStatusText) {
        memberStatusText.textContent = "Trial mode active. Member login required for exports, judge mode, and cloud sync.";
      }
      if (memberNameValue) memberNameValue.textContent = "Not Signed In";
      if (memberModeValue) memberModeValue.textContent = "Trial";
      googleLoginBtn.disabled = false;
      setFeatureAccess(false);
    }
  }

  async function initAuth() {
    if (!window.auth || !window.db) {
      console.info("Firebase not configured. Running in local demo mode.");
      updateAuthUI(null);
      refreshEvidence();
      return;
    }

    window.auth.onAuthStateChanged((user) => {
      if (user && user.uid) {
        activeUserId = user.uid;
      } else {
        activeUserId = "local-demo";
      }
      updateAuthUI(user);
    });

    refreshEvidence();
  }

  async function signInWithGoogle() {
    if (!window.auth || !window.firebase) return;

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      await window.auth.signInWithPopup(provider);
    } catch (error) {
      console.warn("Google sign-in failed:", error);
      if (authStatusText) {
        authStatusText.textContent = "Google sign-in failed. Check Firebase auth provider and authorized domain.";
      }
    }
  }

  async function signOutCurrentUser() {
    if (!window.auth) return;

    try {
      await window.auth.signOut();
      if (memberLastSyncValue) memberLastSyncValue.textContent = "Not Synced";
    } catch (error) {
      console.warn("Sign out failed:", error);
    }
  }

  // Web Speech API Setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    transcriptBox.innerHTML = "<p>⚠️ 此瀏覽器不支援語音輸入。請使用 Chrome/Edge。</p>";
    if (statusPill) {
      statusPill.textContent = "瀏覽器不支援 / Browser unsupported";
    }
    return;
  }

  function initRecognition() {
    recognition = new SpeechRecognition();
    recognition.lang = currentLang;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      isListening = true;
      recordBtn.classList.add("listening");
      recordBtn.textContent = "👂 正在聆聽... / Listening...";
      if (statusPill) {
        statusPill.textContent = "正在聆聽 / Listening";
      }
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        }
      }
      if (finalTranscript) {
        transcriptBox.textContent = `🗣️ ${finalTranscript}`;
        if (mockTranscript) {
          mockTranscript.textContent = finalTranscript;
        }
        updateSeeSoundPanel(finalTranscript);
        if (statusPill) {
          statusPill.textContent = "分析中 / Analyzing";
        }
        analyzeInput(finalTranscript.trim());
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech error:", event.error);
      aiResponse.textContent = "❌ 語音識別失敗。請再試一次。";
      aiResponse.dataset.category = "error";
      if (statusPill) {
        statusPill.textContent = "語音錯誤 / Speech error";
      }
    };

    recognition.onend = () => {
      isListening = false;
      recordBtn.classList.remove("listening");
      recordBtn.textContent = getTranslation(activeUiLang, "voice.recordBtn");
      if (statusPill) {
        statusPill.textContent = "系統就緒 / System Ready";
      }
    };
  }

  const initialUiLang = localStorage.getItem(uiLangKey) || "en";
  initFullPageTranslationEngine();
  if (globalLangSelect) {
    globalLangSelect.value = i18n[initialUiLang] ? initialUiLang : "en";
  }
  applyUiLanguage(initialUiLang);

  let tabReturnTimer = null;
  const scheduleReassertTranslations = () => {
    if (tabReturnTimer) {
      clearTimeout(tabReturnTimer);
    }
    tabReturnTimer = setTimeout(() => {
      reassertTranslationsOnReturn();
    }, 180);
  };

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      scheduleReassertTranslations();
    }
  });
  window.addEventListener("focus", scheduleReassertTranslations);
  window.addEventListener("pageshow", scheduleReassertTranslations);

  initRecognition();
  if (loginPortal) loginPortal.classList.add("hidden");
  setupSmoothAnchorGlide();
  setupParallax();
  setupBrandHomeButton();
  loadLocalLogs();
  loadMemberNotes();
  refreshEvidence();
  refreshMemberTools();
  initAuth();

  if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", signInWithGoogle);
  }

  if (openPortalBtn) {
    openPortalBtn.addEventListener("click", showLoginPortal);
  }

  if (memberUnlockBtn) {
    memberUnlockBtn.addEventListener("click", showLoginPortal);
  }

  if (globalLangSelect) {
    globalLangSelect.addEventListener("change", () => {
      applyUiLanguage(globalLangSelect.value);
    });
  }

  if (spainThemeToggleBtn) {
    spainThemeToggleBtn.addEventListener("click", () => {
      spainThemeVariant = spainThemeVariant === "light" ? "rich" : "light";
      localStorage.setItem(spainThemeVariantKey, spainThemeVariant);
      updateSpainThemeVariantUi(activeUiLang);
    });
  }

  if (backWelcomeBtn) {
    backWelcomeBtn.addEventListener("click", () => {
      if (loginPortal) {
        loginPortal.classList.add("hidden");
      }
    });
  }

  if (switchAccountBtn) {
    switchAccountBtn.addEventListener("click", signInWithGoogle);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", signOutCurrentUser);
  }

  if (addQuickNoteBtn) {
    addQuickNoteBtn.addEventListener("click", () => {
      const note = window.prompt("Add follow-up note for the care team:");
      if (!note || !note.trim()) return;
      persistMemberNote(note.trim(), "Follow-up");
      refreshMemberTools();
    });
  }

  if (saveCarePlanBtn) {
    saveCarePlanBtn.addEventListener("click", () => {
      const summary = `Care plan snapshot saved with ${localLogs.length} total records.`;
      persistMemberNote(summary, "Care Plan");
      refreshMemberTools();
      if (sessionBriefText) {
        sessionBriefText.textContent = buildSessionBrief();
      }
    });
  }

  if (generateBriefBtn) {
    generateBriefBtn.addEventListener("click", () => {
      if (sessionBriefText) {
        sessionBriefText.textContent = buildSessionBrief();
      }
    });
  }

  if (seeSoundCompareBtn) {
    seeSoundCompareBtn.addEventListener("click", () => {
      const rawText = seeSoundTranscript ? seeSoundTranscript.textContent : "";
      const transcript = rawText === "Waiting for voice input..." ? "" : rawText;
      updateSeeSoundPanel(transcript);
    });
  }

  function renderDemoScenario(index) {
    const scenario = demoScenarios[index % demoScenarios.length];
    if (!scenario) return;

    if (demoScenarioLabel) demoScenarioLabel.textContent = scenario.label;
    if (demoScenarioText) demoScenarioText.textContent = scenario.note;
    if (mockTranscript) mockTranscript.textContent = scenario.transcript;
    if (mockInsight) mockInsight.textContent = scenario.insight;
  }

  function pulseSignal() {
    if (!mockSignal) return;
    mockSignal.textContent = "LIVE";
    mockSignal.style.color = "#7df6d9";
    setTimeout(() => {
      mockSignal.textContent = "SYNC";
      mockSignal.style.color = "#98c8ff";
    }, 1300);
  }

  renderDemoScenario(scenarioIndex);
  pulseSignal();

  setInterval(() => {
    scenarioIndex = (scenarioIndex + 1) % demoScenarios.length;
    renderDemoScenario(scenarioIndex);
    pulseSignal();
  }, 5200);

  // Reveal animation on scroll for storytelling sections
  if ("IntersectionObserver" in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  // KPI counter animation for investor-facing metrics
  function animateCounter(el) {
    const target = Number(el.dataset.target || "0");
    const duration = 1400;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toString();

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window && counterEls.length) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    counterEls.forEach((el) => counterObserver.observe(el));
  } else {
    counterEls.forEach((el) => {
      el.textContent = el.dataset.target || "0";
    });
  }

  // Language Toggle
  langBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      currentLang = btn.dataset.lang;
      if (recognition) {
        recognition.lang = currentLang;
      }
      syncQuickLanguageButtons();

      const mappedUiLang = quickSpeechToUiLang[currentLang];
      if (mappedUiLang) {
        if (globalLangSelect) {
          globalLangSelect.value = mappedUiLang;
        }
        applyUiLanguage(mappedUiLang);
      }
    });
  });

  // Record Button
  recordBtn.addEventListener("click", () => {
    if (!isListening) {
      try { recognition.start(); } catch (e) { console.warn(e); }
    } else {
      recognition.stop();
    }
  });

  // Simple AI Analysis (Client-Side MVP)
  function analyzeInput(text) {
    const startedAt = performance.now();
    const lower = text.toLowerCase();
    const weightedLexicon = {
      medication: [
        { term: "藥", weight: 1.7 },
        { term: "服用", weight: 1.5 },
        { term: "pill", weight: 1.5 },
        { term: "dose", weight: 1.4 },
        { term: "medication", weight: 1.5 },
        { term: "blood pressure", weight: 1.6 },
        { term: "diabetes", weight: 1.6 },
        { term: "血壓", weight: 1.6 },
        { term: "糖尿", weight: 1.6 }
      ],
      symptom: [
        { term: "痛", weight: 1.3 },
        { term: "暈", weight: 1.4 },
        { term: "咳", weight: 1.2 },
        { term: "熱", weight: 1.2 },
        { term: "dizzy", weight: 1.4 },
        { term: "pain", weight: 1.4 },
        { term: "cough", weight: 1.2 },
        { term: "fever", weight: 1.3 },
        { term: "chest", weight: 1.7 },
        { term: "breath", weight: 1.8 }
      ],
      emergency: [
        { term: "急救", weight: 3.2 },
        { term: "emergency", weight: 3.2 },
        { term: "sos", weight: 3.0 },
        { term: "暈倒", weight: 3.1 },
        { term: "faint", weight: 3.0 },
        { term: "bleeding", weight: 3.1 },
        { term: "help now", weight: 3.3 },
        { term: "cannot breathe", weight: 3.5 }
      ]
    };

    const negations = ["no", "not", "without", "冇", "無", "唔係"];
    const isNegated = (term) => {
      return negations.some((neg) => lower.includes(`${neg} ${term}`) || lower.includes(`${neg}${term}`));
    };

    const scores = {
      medication: 0,
      symptom: 0,
      emergency: 0
    };

    Object.entries(weightedLexicon).forEach(([categoryKey, terms]) => {
      terms.forEach((entry) => {
        if (!lower.includes(entry.term)) return;
        const adjustedWeight = isNegated(entry.term) ? entry.weight * 0.35 : entry.weight;
        scores[categoryKey] += adjustedWeight;
      });
    });

    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [topCategory, topScore] = sortedScores[0];
    const totalScore = sortedScores.reduce((sum, [, value]) => sum + value, 0);

    const category = topScore > 0.4 ? topCategory : "general";
    const confidence = totalScore > 0 ? Math.min(98, Math.round((topScore / totalScore) * 100)) : 0;

    let severity = "Low";
    let nextStep = "Continue routine monitoring and daily check-ins.";

    if (category === "emergency" || topScore >= 3.1) {
      severity = "Critical";
      nextStep = "Trigger SOS and contact caregiver or emergency services immediately.";
    } else if (category === "symptom" && topScore >= 1.6) {
      severity = "Medium";
      nextStep = "Monitor progression and arrange caregiver review within 24 hours.";
    } else if (category === "medication" && topScore >= 1.6) {
      severity = "Medium";
      nextStep = "Confirm dosage history and medication timing with caregiver.";
    }

    let response = "✅ 已記錄。/ Logged successfully.";

    if (category === "emergency") {
      response = "🚨 檢測到緊急情況！已通知照顧者。/ Emergency detected! Caregiver alerted.";
      triggerSOS(text);
    } else if (category === "medication") {
      response = "💊 已記錄用藥相關內容。/ Medication-related input logged.";
    } else if (category === "symptom") {
      response = "🩺 記錄到症狀描述。建議留意變化或諮詢醫生。/ Symptom logged. Monitor changes or consult a doctor.";
    }

    aiResponse.textContent = response;
    aiResponse.dataset.category = category;
    if (mockInsight) {
      mockInsight.textContent = response;
    }

    if (aiSignalCategory) aiSignalCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    if (aiSignalConfidence) aiSignalConfidence.textContent = `${confidence}%`;
    if (aiSignalSeverity) aiSignalSeverity.textContent = severity;
    if (aiSignalNextStep) aiSignalNextStep.textContent = nextStep;

    const latencyMs = Math.max(1, Math.round(performance.now() - startedAt));
    responseLatencies.push(latencyMs);
    if (responseLatencies.length > 100) {
      responseLatencies.shift();
    }

    const logEntry = {
      text,
      category,
      lang: currentLang,
      latencyMs,
      userId: activeUserId,
      confidence,
      severity,
      source: "web-demo",
      timestamp: Date.now()
    };

    persistLocalLog(logEntry);
    refreshEvidence();
    saveToFirestore(logEntry);
  }

  // SOS Handler
  function triggerSOS(reason) {
    sosBtn.textContent = "📡 發送中... / Sending...";
    setTimeout(() => {
      sosBtn.textContent = "✅ 已發送通知 / Notification Sent";
      setTimeout(() => sosBtn.textContent = "🆘 緊急聯絡 / SOS", 3000);
    }, 1500);
  }
  sosBtn.addEventListener("click", () => triggerSOS("Manual SOS"));

  // Firestore Save (Placeholder logic)
  async function saveToFirestore(entry) {
    if (!window.db || !window.firebase) return;
    if (!window.auth || !window.auth.currentUser) return;

    try {
      const docRef = await window.db.collection("logs").add({
        text: entry.text,
        category: entry.category,
        lang: entry.lang,
        latencyMs: entry.latencyMs,
        source: entry.source,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId: activeUserId
      });
      console.log("Saved with ID:", docRef.id);
      if (memberLastSyncValue) memberLastSyncValue.textContent = new Date().toLocaleTimeString();
    } catch (error) {
      console.warn("Firestore save failed (expected in demo mode):", error);
    }
  }

  function exportEvidenceCsv() {
    const headers = ["timestamp", "userId", "lang", "category", "latencyMs", "text"];
    const rows = localLogs.map((item) => {
      const isoTime = new Date(item.timestamp).toISOString();
      const escapedText = String(item.text || "").replace(/"/g, '""');
      return [isoTime, item.userId, item.lang, item.category, item.latencyMs, `"${escapedText}"`].join(",");
    });

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `carevoice-evidence-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function formatJudgeModeTime(seconds) {
    const mm = Math.floor(seconds / 60).toString().padStart(2, "0");
    const ss = (seconds % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  }

  function startJudgeMode() {
    if (!judgeModeStatus || !demoModeBtn) return;

    if (judgeModeTimer) {
      clearInterval(judgeModeTimer);
      judgeModeTimer = null;
      demoModeBtn.textContent = "Start 3-Min Judge Mode";
      judgeModeStatus.textContent = "Judge Mode stopped";
      return;
    }

    judgeModeRemaining = 180;
    demoModeBtn.textContent = "Stop Judge Mode";
    judgeModeStatus.textContent = `Judge Mode running - ${formatJudgeModeTime(judgeModeRemaining)} remaining`;

    judgeModeTimer = setInterval(() => {
      judgeModeRemaining -= 1;

      if (judgeModeRemaining === 120) {
        scenarioIndex = 1;
        renderDemoScenario(scenarioIndex);
      }

      if (judgeModeRemaining === 60) {
        scenarioIndex = 2;
        renderDemoScenario(scenarioIndex);
      }

      if (judgeModeRemaining <= 0) {
        clearInterval(judgeModeTimer);
        judgeModeTimer = null;
        demoModeBtn.textContent = "Start 3-Min Judge Mode";
        judgeModeStatus.textContent = "Judge Mode complete - move to Q&A now";
        return;
      }

      judgeModeStatus.textContent = `Judge Mode running - ${formatJudgeModeTime(judgeModeRemaining)} remaining`;
    }, 1000);
  }

  if (exportBtn) {
    exportBtn.addEventListener("click", exportEvidenceCsv);
  }

  if (demoModeBtn) {
    demoModeBtn.addEventListener("click", startJudgeMode);
  }

  // Register Service Worker for PWA
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
      .then(() => console.log("✅ PWA ready"))
      .catch(err => console.warn("⚠️ SW registration failed", err));
  }
});
