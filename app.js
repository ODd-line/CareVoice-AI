document.addEventListener("DOMContentLoaded", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then((regs) => regs.forEach((reg) => reg.update()))
      .catch(() => {});
  }

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
  const mockLangBadge = document.getElementById("mockLangBadge");
  const exportBtn = document.getElementById("exportBtn");
  const demoModeBtn = document.getElementById("demoModeBtn");
  const judgeModeStatus = document.getElementById("judgeModeStatus");
  const evidenceTotal = document.getElementById("evidenceTotal");
  const evidenceMix = document.getElementById("evidenceMix");
  const evidenceLatency = document.getElementById("evidenceLatency");
  const evidenceSus = document.getElementById("evidenceSus");
  const openPortalBtn = document.getElementById("openPortalBtn");
  const openRegisterBtn = document.getElementById("openRegisterBtn");
  const memberWorkspaceBtn = document.getElementById("memberWorkspaceBtn");
  const globalLangSelect = document.getElementById("globalLangSelect");
  const countryThemeBadge = document.getElementById("countryThemeBadge");
  const languageSwitchStatus = document.getElementById("languageSwitchStatus");
  const spainThemeToggleBtn = document.getElementById("spainThemeToggleBtn");
  const googleLoginBtn = document.getElementById("googleLoginBtn");
  const googleRegisterBtn = document.getElementById("googleRegisterBtn");
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
  const downloadNotesBtn = document.getElementById("downloadNotesBtn");
  const copyBriefBtn = document.getElementById("copyBriefBtn");
  const clearNotesBtn = document.getElementById("clearNotesBtn");
  const memberNotesList = document.getElementById("memberNotesList");
  const sessionBriefText = document.getElementById("sessionBriefText");
  const orgProjectStatus = document.getElementById("orgProjectStatus");
  const orgProjectNameInput = document.getElementById("orgProjectNameInput");
  const createOrgProjectBtn = document.getElementById("createOrgProjectBtn");
  const orgProjectSelect = document.getElementById("orgProjectSelect");
  const deleteOrgProjectBtn = document.getElementById("deleteOrgProjectBtn");
  const orgMemberEmailInput = document.getElementById("orgMemberEmailInput");
  const addOrgMemberBtn = document.getElementById("addOrgMemberBtn");
  const orgMembersList = document.getElementById("orgMembersList");
  const orgRoomNameInput = document.getElementById("orgRoomNameInput");
  const addOrgRoomBtn = document.getElementById("addOrgRoomBtn");
  const orgRoomWhoInput = document.getElementById("orgRoomWhoInput");
  const orgRoomWatchoutsInput = document.getElementById("orgRoomWatchoutsInput");
  const orgRoomButtonsInput = document.getElementById("orgRoomButtonsInput");
  const applyRoomDefaultsBtn = document.getElementById("applyRoomDefaultsBtn");
  const orgRoomsList = document.getElementById("orgRoomsList");
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
  const orgProjectsKey = "carevoice.orgProjects.v1";
  const orgActiveProjectKey = "carevoice.orgProjects.active.v1";
  const uiLangKey = "carevoice.ui.lang.v1";
  const uiLangCookieKey = "carevoice_ui_lang";
  const spainThemeVariantKey = "carevoice.es.theme.variant.v1";
  const localLogs = [];
  const memberNotes = [];
  const orgProjects = [];
  let orgActiveProjectId = localStorage.getItem(orgActiveProjectKey) || "";
  let orgLoadedForIdentity = "";
  let currentOrgUser = null;
  const responseLatencies = [];
  let mouthGuideTimer = null;
  let spainThemeVariant = localStorage.getItem(spainThemeVariantKey) === "rich" ? "rich" : "light";

  const postAuthRouteKey = "carevoice.postAuthRoute.v1";

  function setPostAuthRoute(route) {
    try {
      sessionStorage.setItem(postAuthRouteKey, route);
    } catch (e) {
      // ignore
    }
    try {
      localStorage.setItem(postAuthRouteKey, route);
    } catch (e) {
      // ignore
    }
  }

  function getPostAuthRoute() {
    try {
      const value = sessionStorage.getItem(postAuthRouteKey);
      if (value) return value;
    } catch (e) {
      // ignore
    }
    try {
      return localStorage.getItem(postAuthRouteKey);
    } catch (e) {
      return null;
    }
  }

  function clearPostAuthRoute() {
    try {
      sessionStorage.removeItem(postAuthRouteKey);
    } catch (e) {
      // ignore
    }
    try {
      localStorage.removeItem(postAuthRouteKey);
    } catch (e) {
      // ignore
    }
  }
  const isMemberWorkspacePage = () => {
    const path = (window.location && window.location.pathname) ? window.location.pathname : "";
    return path.endsWith("/member.html") || path.endsWith("member.html");
  };

  function getDemoScenariosForUiLang(lang) {
    switch (lang) {
      case "zh":
        return [
          {
            label: "用藥提醒檢查",
            transcript: "我啱啱食咗血壓藥，今晚要再食嗎？",
            insight: "💊 已記錄用藥相關內容，並準備照顧者摘要。",
            note: "示範情境輪播（方便現場演示）"
          },
          {
            label: "症狀升級監測",
            transcript: "我今日有啲頭暈同胸口唔舒服。",
            insight: "🩺 已記錄症狀。建議照顧者覆核並安排求醫。",
            note: "示範情境輪播（方便現場演示）"
          },
          {
            label: "緊急偵測流程",
            transcript: "佢喺廁所暈低咗，快啲幫手！",
            insight: "🚨 偵測到緊急訊號。已啟動 SOS 升級流程。",
            note: "示範情境輪播（方便現場演示）"
          }
        ];
      case "de":
        return [
          {
            label: "Medikamenten-Check-in",
            transcript: "Ich habe gerade mein Blutdruckmedikament genommen. Muss ich es heute Abend nochmal nehmen?",
            insight: "💊 Medikamentenbezogene Eingabe protokolliert. Zusammenfassung für Betreuer vorbereitet.",
            note: "Szenarien wechseln automatisch (Live-Demo)"
          },
          {
            label: "Symptom-Eskalation",
            transcript: "Mir ist heute schwindlig und meine Brust fühlt sich eng an.",
            insight: "🩺 Symptom protokolliert. Empfehlung: zeitnahe Pflege-/Arzt-Rücksprache.",
            note: "Szenarien wechseln automatisch (Live-Demo)"
          },
          {
            label: "Notfall-Workflow",
            transcript: "Er ist im Bad ohnmächtig geworden. Bitte helfen Sie sofort.",
            insight: "🚨 Notfall erkannt. SOS-Eskalation aktiviert.",
            note: "Szenarien wechseln automatisch (Live-Demo)"
          }
        ];
      case "ja":
        return [
          {
            label: "服薬リマインダー確認",
            transcript: "さっき血圧の薬を飲みました。今夜ももう一回飲む必要がありますか？",
            insight: "💊 服薬に関する内容を記録しました。介護者向けサマリーを準備します。",
            note: "シナリオを自動で切り替え（ライブデモ用）"
          },
          {
            label: "症状の悪化モニタリング",
            transcript: "今日はめまいがして、胸が苦しい感じがします。",
            insight: "🩺 症状を記録しました。介護者の確認と受診の相談を推奨します。",
            note: "シナリオを自動で切り替え（ライブデモ用）"
          },
          {
            label: "緊急検知フロー",
            transcript: "お風呂場で倒れました。今すぐ助けてください。",
            insight: "🚨 緊急を検知しました。SOS エスカレーションを起動します。",
            note: "シナリオを自動で切り替え（ライブデモ用）"
          }
        ];
      case "es":
        return [
          {
            label: "Revisión de medicación",
            transcript: "Acabo de tomar mi pastilla de la presión. ¿Tengo que tomarla otra vez esta noche?",
            insight: "💊 Entrada de medicación registrada. Resumen para el cuidador preparado.",
            note: "Escenarios rotan automáticamente (demo en vivo)"
          },
          {
            label: "Monitoreo de síntomas",
            transcript: "Hoy me siento mareado y tengo una presión en el pecho.",
            insight: "🩺 Síntoma registrado. Recomendación: revisión del cuidador y consulta médica.",
            note: "Escenarios rotan automáticamente (demo en vivo)"
          },
          {
            label: "Flujo de emergencia",
            transcript: "Se desmayó en el baño. Por favor, ayúdenos ahora.",
            insight: "🚨 Emergencia detectada. Escalación SOS activada.",
            note: "Escenarios rotan automáticamente (demo en vivo)"
          }
        ];
      case "fr":
        return [
          {
            label: "Vérification de médication",
            transcript: "Je viens de prendre mon médicament pour la tension. Dois-je le reprendre ce soir ?",
            insight: "💊 Entrée liée aux médicaments enregistrée. Résumé pour l'aidant prêt.",
            note: "Scénarios en rotation automatique (démo)"
          },
          {
            label: "Suivi des symptômes",
            transcript: "Aujourd'hui j'ai des vertiges et une gêne dans la poitrine.",
            insight: "🩺 Symptôme enregistré. Recommandation : revue par l'aidant et avis médical.",
            note: "Scénarios en rotation automatique (démo)"
          },
          {
            label: "Workflow d'urgence",
            transcript: "Il s'est évanoui dans la salle de bain. Aidez-nous tout de suite.",
            insight: "🚨 Urgence détectée. Escalade SOS activée.",
            note: "Scénarios en rotation automatique (démo)"
          }
        ];
      default:
        return [
          {
            label: "Medication reminder check-in",
            transcript: "I just took my blood pressure medicine. Do I need to take it again tonight?",
            insight: "💊 Medication-related input logged. Caregiver summary prepared.",
            note: "Scenario cycling for live presentation demo"
          },
          {
            label: "Symptom escalation monitoring",
            transcript: "I feel dizzy today and have tightness in my chest.",
            insight: "🩺 Symptom logged. Suggest caregiver review and doctor consultation.",
            note: "Scenario cycling for live presentation demo"
          },
          {
            label: "Emergency detection workflow",
            transcript: "He fainted in the bathroom, please help now.",
            insight: "🚨 Emergency signal detected. SOS escalation pathway activated.",
            note: "Scenario cycling for live presentation demo"
          }
        ];
    }
  }

  function getMockLangBadgeForUiLang(lang) {
    switch (lang) {
      case "zh":
        return "粵/EN";
      case "en":
        return "EN/粵";
      case "de":
        return "DE/EN";
      case "ja":
        return "JA/EN";
      case "es":
        return "ES/EN";
      case "fr":
        return "FR/EN";
      default:
        return "EN";
    }
  }

  function syncShowcaseDemoForUiLang(lang) {
    demoScenarios = getDemoScenariosForUiLang(lang);
    scenarioIndex = 0;
    renderDemoScenario(scenarioIndex);
    pulseSignal();
    if (mockLangBadge) {
      mockLangBadge.textContent = getMockLangBadgeForUiLang(lang);
    }
  }

  function getVoiceQuickToggleConfig(uiLang) {
    switch (uiLang) {
      case "zh":
        return {
          primary: { speech: "zh-HK", label: "粵語" },
          secondary: { speech: "en-US", label: "English" }
        };
      case "de":
        return {
          primary: { speech: "de-DE", label: "Deutsch" },
          secondary: { speech: "en-US", label: "English" }
        };
      case "ja":
        return {
          primary: { speech: "ja-JP", label: "日本語" },
          secondary: { speech: "en-US", label: "English" }
        };
      case "es":
        return {
          primary: { speech: "es-ES", label: "Español" },
          secondary: { speech: "en-US", label: "English" }
        };
      case "fr":
        return {
          primary: { speech: "fr-FR", label: "Français" },
          secondary: { speech: "en-US", label: "English" }
        };
      default:
        return {
          primary: { speech: "en-US", label: "English" },
          secondary: { speech: "zh-HK", label: "Cantonese" }
        };
    }
  }

  function syncVoiceQuickLanguageToggle(uiLang) {
    if (!langBtns || !langBtns.length) return;
    const config = getVoiceQuickToggleConfig(uiLang);
    const first = langBtns[0];
    const second = langBtns[1];
    if (!first || !second) return;

    first.dataset.lang = config.primary.speech;
    second.dataset.lang = config.secondary.speech;
    first.textContent = config.primary.label;
    second.textContent = config.secondary.label;

    syncQuickLanguageButtons();
  }

  let demoScenarios = getDemoScenariosForUiLang("en");

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
      "nav.register": "Register",
      "nav.workspace": "Member Workspace",
      "nav.demo": "Request Live Demo",
      "welcome.eyebrow": "Bienvenue",
      "welcome.title": "CareVoice Clinical Connect",
      "welcome.copy": "Une plateforme professionnelle de sante vocale pour les equipes de soins aux aines, les partenaires communautaires et les aidants familiaux a Hong Kong.",
      "welcome.status": "Utilisez le bouton Connexion membre en haut a droite pour ouvrir l'acces professionnel.",
      "portal.eyebrow": "Portail Membre",
      "portal.title": "Console d'acces professionnel",
      "portal.signInGoogle": "Se connecter avec Google",
      "portal.registerGoogle": "S'inscrire avec Google",
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
      "portal.registerGoogle": "Register with Google",
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
      "voice.lowerLip": "Lower Lip",
      "voice.waitingForVoice": "Waiting for voice input...",
      "voice.readyToListen": "Ready to listen",
      "voice.signal.liveTranscript": "Live Transcript",
      "voice.signal.ipa": "IPA Output",
      "voice.signal.score": "Pronunciation Score",
      "voice.signal.advice": "Correction Advice",
      "voice.recordBtnListening": "👂 Listening...",
      "voice.status.listening": "Listening",
      "voice.status.analyzing": "Analyzing",
      "voice.status.ready": "System Ready",
      "voice.status.speechError": "Speech error",
      "voice.speechErrorMessage": "❌ Speech recognition failed. Please try again.",
      "ai.signal.title": "AI TRIAGE SIGNAL",
      "ai.signal.category": "Category",
      "ai.signal.confidence": "Confidence",
      "ai.signal.severity": "Severity",
      "ai.signal.nextStep": "Recommended Next Step",
      "ai.category.general": "General",
      "ai.category.symptom": "Symptom",
      "ai.category.medication": "Medication",
      "ai.category.emergency": "Emergency",
      "ai.severity.low": "Low",
      "ai.severity.medium": "Medium",
      "ai.severity.critical": "Critical",
      "ai.next.default": "Continue routine monitoring and daily check-ins.",
      "ai.next.critical": "Trigger SOS and contact caregiver or emergency services immediately.",
      "ai.next.symptom": "Monitor progression and arrange caregiver review within 24 hours.",
      "ai.next.medication": "Confirm dosage history and medication timing with caregiver.",
      "ai.response.logged": "✅ Logged successfully.",
      "ai.response.medication": "💊 Medication-related input logged.",
      "ai.response.symptom": "🩺 Symptom logged. Monitor changes or consult a doctor.",
      "ai.response.emergency": "🚨 Emergency detected! Caregiver alerted.",
      "seesound.advice.excellent": "Excellent articulation. Keep the rhythm steady and maintain the same mouth movement.",
      "seesound.advice.good": "Good overall. Slow down slightly on stressed syllables and keep vowel length consistent.",
      "seesound.advice.moderate": "Moderate match. Focus on clearer consonants and repeat phrase in shorter chunks.",
      "seesound.advice.needTranscript": "Speak one full sentence first, then compare with your target phrase.",
      "seesound.advice.needTarget": "Set a target phrase to enable detailed correction suggestions.",
      "seesound.advice.low": "Low match. Try speaking slower, exaggerate mouth opening, and repeat 2-3 times for improvement.",
      "mouth.hint.neutral": "Mouth hint: neutral opening",
      "mouth.hint.rounded": "Mouth hint: rounded lips for /o u/ sounds",
      "mouth.hint.open": "Mouth hint: open jaw for /a/ sounds",
      "mouth.hint.wide": "Mouth hint: wide smile shape for /i e/ sounds",
      "sos.button": "🆘 SOS",
      "sos.sending": "📡 Sending...",
      "sos.sent": "✅ Notification Sent",
      "status.trial": "Trial Mode (sign in to unlock full features)",
      "judge.trialMessage": "Trial mode active. Sign in to run Judge Mode and export evidence.",
      "member.l10n.eyebrow": "Localized Workflow",
      "member.l10n.title": "Member Workflow Desk",
      "member.tools.downloadNotes": "Download Notes CSV",
      "member.tools.copyBrief": "Copy Session Brief",
      "member.tools.clearNotes": "Clear Notes",
      "demo.eyebrow": "Professor Demo View",
      "demo.title": "Designed Like a Fundable Health-Tech Product",
      "demo.activeScenario": "Active Scenario:",
      "demo.mockTitle": "CareVoice Session",
      "demo.userSays": "User says",
      "demo.aiResponse": "AI response",
      "demo.signal.live": "LIVE",
      "demo.signal.sync": "SYNC"
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
      "nav.register": "註冊",
      "nav.workspace": "會員工作區",
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
      "portal.registerGoogle": "使用 Google 註冊",
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
      "voice.lowerLip": "下唇",
      "voice.waitingForVoice": "等待語音輸入...",
      "voice.readyToListen": "準備就緒",
      "voice.signal.liveTranscript": "即時語音轉錄",
      "voice.signal.ipa": "IPA 輸出",
      "voice.signal.score": "發音分數",
      "voice.signal.advice": "修正建議",
      "voice.recordBtnListening": "👂 正在聆聽...",
      "voice.status.listening": "正在聆聽",
      "voice.status.analyzing": "分析中",
      "voice.status.ready": "系統就緒",
      "voice.status.speechError": "語音錯誤",
      "voice.speechErrorMessage": "❌ 語音識別失敗。請再試一次。",
      "ai.signal.title": "AI 風險提示",
      "ai.signal.category": "類別",
      "ai.signal.confidence": "信心",
      "ai.signal.severity": "嚴重程度",
      "ai.signal.nextStep": "建議下一步",
      "ai.category.general": "一般",
      "ai.category.symptom": "症狀",
      "ai.category.medication": "用藥",
      "ai.category.emergency": "緊急",
      "ai.severity.low": "低",
      "ai.severity.medium": "中",
      "ai.severity.critical": "危急",
      "ai.next.default": "繼續日常留意同定時覆診／檢查。",
      "ai.next.critical": "立即按 SOS，聯絡照顧者或緊急服務。",
      "ai.next.symptom": "留意變化，建議 24 小時內安排照顧者跟進。",
      "ai.next.medication": "同照顧者確認用藥時間同劑量。",
      "ai.response.logged": "✅ 已記錄。",
      "ai.response.medication": "💊 已記錄用藥相關內容。",
      "ai.response.symptom": "🩺 已記錄症狀描述。建議留意變化或諮詢醫生。",
      "ai.response.emergency": "🚨 檢測到緊急情況！已通知照顧者。",
      "seesound.advice.excellent": "發音好清晰。保持節奏一致，同一樣嘴形去講。",
      "seesound.advice.good": "整體唔錯。重音位置可以慢少少，母音長度保持一致。",
      "seesound.advice.moderate": "匹配一般。留意子音清晰度，分段短句重複練習。",
      "seesound.advice.needTranscript": "先講一句完整句子，之後再同目標句比較。",
      "seesound.advice.needTarget": "先設定目標句，先可以顯示更詳細嘅修正建議。",
      "seesound.advice.low": "匹配較低。試下慢啲講、誇張啲開口，重複 2-3 次。",
      "mouth.hint.neutral": "嘴形提示：自然張口",
      "mouth.hint.rounded": "嘴形提示：/o u/ 類音用圓唇",
      "mouth.hint.open": "嘴形提示：/a/ 類音落顎張大口",
      "mouth.hint.wide": "嘴形提示：/i e/ 類音微笑拉闊嘴角",
      "sos.button": "🆘 緊急聯絡 / SOS",
      "sos.sending": "📡 發送中... / Sending...",
      "sos.sent": "✅ 已發送通知 / Notification Sent",
      "status.trial": "試用模式／登入解鎖完整功能",
      "judge.trialMessage": "試用模式進行中。登入後先可以用評審模式同匯出證據。",
      "member.l10n.eyebrow": "語言工作台",
      "member.l10n.title": "會員流程桌",
      "member.tools.downloadNotes": "下載備註 CSV",
      "member.tools.copyBrief": "複製 Session Brief",
      "member.tools.clearNotes": "清除備註",
      "demo.eyebrow": "教授示範視角",
      "demo.title": "產品級健康科技：專業可投資",
      "demo.activeScenario": "目前情境：",
      "demo.mockTitle": "CareVoice 會話",
      "demo.userSays": "用戶說",
      "demo.aiResponse": "AI 回應",
      "demo.signal.live": "即時",
      "demo.signal.sync": "同步"
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
      "nav.register": "Registrieren",
      "nav.workspace": "Mitgliederbereich",
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
      "portal.registerGoogle": "Mit Google registrieren",
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
      "voice.lowerLip": "Unterlippe",
      "voice.waitingForVoice": "Warte auf Spracheingabe...",
      "voice.readyToListen": "Bereit zum Zuhören",
      "voice.signal.liveTranscript": "Live-Transkript",
      "voice.signal.ipa": "IPA-Ausgabe",
      "voice.signal.score": "Aussprache-Score",
      "voice.signal.advice": "Korrekturhinweise",
      "voice.recordBtnListening": "👂 Hören...",
      "voice.status.listening": "Hört zu",
      "voice.status.analyzing": "Analysiert",
      "voice.status.ready": "Bereit",
      "voice.status.speechError": "Sprachfehler",
      "voice.speechErrorMessage": "❌ Spracherkennung fehlgeschlagen. Bitte erneut versuchen.",
      "ai.signal.title": "AI-TRIAGE-SIGNAL",
      "ai.signal.category": "Kategorie",
      "ai.signal.confidence": "Sicherheit",
      "ai.signal.severity": "Schweregrad",
      "ai.signal.nextStep": "Empfohlener nächster Schritt",
      "ai.category.general": "Allgemein",
      "ai.category.symptom": "Symptom",
      "ai.category.medication": "Medikation",
      "ai.category.emergency": "Notfall",
      "ai.severity.low": "Niedrig",
      "ai.severity.medium": "Mittel",
      "ai.severity.critical": "Kritisch",
      "ai.next.default": "Weiter beobachten und tägliche Check-ins fortsetzen.",
      "ai.next.critical": "SOS auslösen und sofort Betreuungsperson oder Notdienst kontaktieren.",
      "ai.next.symptom": "Verlauf beobachten und innerhalb von 24 Stunden eine Betreuungsperson einbinden.",
      "ai.next.medication": "Dosisverlauf und Einnahmezeit mit der Betreuungsperson abgleichen.",
      "ai.response.logged": "✅ Erfolgreich protokolliert.",
      "ai.response.medication": "💊 Medikamentenbezogener Eintrag protokolliert.",
      "ai.response.symptom": "🩺 Symptom protokolliert. Verlauf beobachten oder Arzt kontaktieren.",
      "ai.response.emergency": "🚨 Notfall erkannt! Betreuungsperson benachrichtigt.",
      "seesound.advice.excellent": "Sehr klare Aussprache. Halten Sie den Rhythmus stabil und die Mundbewegung konsistent.",
      "seesound.advice.good": "Insgesamt gut. Bei betonten Silben etwas langsamer und Vokallängen konstant halten.",
      "seesound.advice.moderate": "Mäßige Übereinstimmung. Konsonanten deutlicher sprechen und in kürzeren Abschnitten wiederholen.",
      "seesound.advice.needTranscript": "Sprechen Sie zuerst einen ganzen Satz, dann mit dem Zielsatz vergleichen.",
      "seesound.advice.needTarget": "Legen Sie einen Zielsatz fest, um detailliertere Hinweise zu erhalten.",
      "seesound.advice.low": "Geringe Übereinstimmung. Langsamer sprechen, Mundöffnung stärker betonen und 2–3× wiederholen.",
      "mouth.hint.neutral": "Mundhinweis: neutral geöffnet",
      "mouth.hint.rounded": "Mundhinweis: Lippen runden für /o u/-Laute",
      "mouth.hint.open": "Mundhinweis: Kiefer öffnen für /a/-Laute",
      "mouth.hint.wide": "Mundhinweis: leichtes Lächeln für /i e/-Laute",
      "sos.button": "🆘 SOS",
      "sos.sending": "📡 Senden...",
      "sos.sent": "✅ Benachrichtigung gesendet",
      "status.trial": "Testmodus (Anmelden zum Freischalten)",
      "judge.trialMessage": "Testmodus aktiv. Bitte anmelden, um Judge Mode zu starten und Evidence zu exportieren.",
      "member.l10n.eyebrow": "Lokalisierter Workflow",
      "member.l10n.title": "Mitglieder-Workflow Desk",
      "member.tools.downloadNotes": "Notizen als CSV herunterladen",
      "member.tools.copyBrief": "Session-Brief kopieren",
      "member.tools.clearNotes": "Notizen löschen",
      "demo.eyebrow": "Demo-Ansicht",
      "demo.title": "Wie ein finanzierbares Health-Tech-Produkt designt",
      "demo.activeScenario": "Aktives Szenario:",
      "demo.mockTitle": "CareVoice Sitzung",
      "demo.userSays": "Nutzer sagt",
      "demo.aiResponse": "KI-Antwort",
      "demo.signal.live": "LIVE",
      "demo.signal.sync": "SYNC"
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
      "nav.register": "登録",
      "nav.workspace": "メンバーワークスペース",
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
      "portal.registerGoogle": "Google で登録",
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
      "voice.lowerLip": "下唇",
      "voice.waitingForVoice": "音声入力を待っています...",
      "voice.readyToListen": "準備完了",
      "voice.signal.liveTranscript": "ライブ文字起こし",
      "voice.signal.ipa": "IPA 出力",
      "voice.signal.score": "発音スコア",
      "voice.signal.advice": "修正アドバイス",
      "voice.recordBtnListening": "👂 聞き取り中...",
      "voice.status.listening": "聞き取り中",
      "voice.status.analyzing": "分析中",
      "voice.status.ready": "準備完了",
      "voice.status.speechError": "音声エラー",
      "voice.speechErrorMessage": "❌ 音声認識に失敗しました。もう一度お試しください。",
      "ai.signal.title": "AI トリアージ",
      "ai.signal.category": "カテゴリ",
      "ai.signal.confidence": "信頼度",
      "ai.signal.severity": "重要度",
      "ai.signal.nextStep": "推奨アクション",
      "ai.category.general": "一般",
      "ai.category.symptom": "症状",
      "ai.category.medication": "服薬",
      "ai.category.emergency": "緊急",
      "ai.severity.low": "低",
      "ai.severity.medium": "中",
      "ai.severity.critical": "重大",
      "ai.next.default": "日常の観察と定期チェックを継続してください。",
      "ai.next.critical": "SOS を実行し、介護者または緊急サービスへ直ちに連絡してください。",
      "ai.next.symptom": "経過を観察し、24時間以内に介護者の確認を手配してください。",
      "ai.next.medication": "服薬履歴と服用タイミングを介護者と確認してください。",
      "ai.response.logged": "✅ 記録しました。",
      "ai.response.medication": "💊 服薬に関する内容を記録しました。",
      "ai.response.symptom": "🩺 症状を記録しました。変化を観察し、必要なら医師に相談してください。",
      "ai.response.emergency": "🚨 緊急を検知しました。介護者に通知しました。",
      "seesound.advice.excellent": "発音がとても明瞭です。リズムと口の動きを一定に保ちましょう。",
      "seesound.advice.good": "全体的に良好です。強調する音は少しゆっくり、母音の長さを揃えましょう。",
      "seesound.advice.moderate": "一致度は中程度です。子音をはっきりさせ、短い区切りで繰り返しましょう。",
      "seesound.advice.needTranscript": "まず1文話してから、目標フレーズと比較してください。",
      "seesound.advice.needTarget": "詳細な修正提案のために目標フレーズを設定してください。",
      "seesound.advice.low": "一致度が低いです。ゆっくり話し、口の開きを大きくして2〜3回繰り返しましょう。",
      "mouth.hint.neutral": "口のヒント：自然に口を開ける",
      "mouth.hint.rounded": "口のヒント：/o u/ は唇を丸める",
      "mouth.hint.open": "口のヒント：/a/ は顎を開く",
      "mouth.hint.wide": "口のヒント：/i e/ は口角を横に引く",
      "sos.button": "🆘 SOS",
      "sos.sending": "📡 送信中...",
      "sos.sent": "✅ 通知を送信しました",
      "status.trial": "トライアルモード（ログインで全機能）",
      "judge.trialMessage": "トライアルモードです。Judge Mode とエクスポートを使うにはログインしてください。",
      "member.l10n.eyebrow": "言語別ワークフロー",
      "member.l10n.title": "メンバーワークフローデスク",
      "member.tools.downloadNotes": "ノートCSVをダウンロード",
      "member.tools.copyBrief": "Session Brief をコピー",
      "member.tools.clearNotes": "ノートを削除",
      "demo.eyebrow": "デモ表示",
      "demo.title": "資金調達可能なヘルステック製品のように設計",
      "demo.activeScenario": "実行中シナリオ：",
      "demo.mockTitle": "CareVoice セッション",
      "demo.userSays": "ユーザー発話",
      "demo.aiResponse": "AI 応答",
      "demo.signal.live": "ライブ",
      "demo.signal.sync": "同期"
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
      "nav.register": "Registrarse",
      "nav.workspace": "Espacio de miembros",
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
      "portal.registerGoogle": "Registrarse con Google",
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
      "voice.lowerLip": "Labio inferior",
      "voice.waitingForVoice": "Esperando entrada de voz...",
      "voice.readyToListen": "Listo para escuchar",
      "voice.signal.liveTranscript": "Transcripción en vivo",
      "voice.signal.ipa": "Salida IPA",
      "voice.signal.score": "Puntuación de pronunciación",
      "voice.signal.advice": "Consejo de corrección",
      "voice.recordBtnListening": "👂 Escuchando...",
      "voice.status.listening": "Escuchando",
      "voice.status.analyzing": "Analizando",
      "voice.status.ready": "Listo",
      "voice.status.speechError": "Error de voz",
      "voice.speechErrorMessage": "❌ Falló el reconocimiento de voz. Inténtalo de nuevo.",
      "ai.signal.title": "SEÑAL DE TRIAGE IA",
      "ai.signal.category": "Categoría",
      "ai.signal.confidence": "Confianza",
      "ai.signal.severity": "Severidad",
      "ai.signal.nextStep": "Siguiente paso recomendado",
      "ai.category.general": "General",
      "ai.category.symptom": "Síntoma",
      "ai.category.medication": "Medicación",
      "ai.category.emergency": "Emergencia",
      "ai.severity.low": "Bajo",
      "ai.severity.medium": "Medio",
      "ai.severity.critical": "Crítico",
      "ai.next.default": "Continúa con el monitoreo rutinario y chequeos diarios.",
      "ai.next.critical": "Activa SOS y contacta al cuidador o servicios de emergencia de inmediato.",
      "ai.next.symptom": "Monitorea la evolución y coordina revisión del cuidador en 24 horas.",
      "ai.next.medication": "Confirma dosis y horario de medicación con el cuidador.",
      "ai.response.logged": "✅ Registrado correctamente.",
      "ai.response.medication": "💊 Registro relacionado con medicación.",
      "ai.response.symptom": "🩺 Síntoma registrado. Monitorea cambios o consulta a un médico.",
      "ai.response.emergency": "🚨 Emergencia detectada. Cuidador alertado.",
      "seesound.advice.excellent": "Articulación excelente. Mantén el ritmo estable y el mismo movimiento de boca.",
      "seesound.advice.good": "Buen resultado. Reduce un poco la velocidad en sílabas acentuadas y mantén las vocales consistentes.",
      "seesound.advice.moderate": "Coincidencia moderada. Aclara consonantes y repite en fragmentos más cortos.",
      "seesound.advice.needTranscript": "Di una frase completa primero y luego compara con tu objetivo.",
      "seesound.advice.needTarget": "Define una frase objetivo para habilitar sugerencias más detalladas.",
      "seesound.advice.low": "Coincidencia baja. Habla más lento, abre más la boca y repite 2–3 veces.",
      "mouth.hint.neutral": "Pista de boca: apertura neutral",
      "mouth.hint.rounded": "Pista de boca: labios redondeados para /o u/",
      "mouth.hint.open": "Pista de boca: abre la mandíbula para /a/",
      "mouth.hint.wide": "Pista de boca: sonrisa amplia para /i e/",
      "sos.button": "🆘 SOS",
      "sos.sending": "📡 Enviando...",
      "sos.sent": "✅ Notificación enviada",
      "status.trial": "Modo de prueba (inicia sesión para desbloquear)",
      "judge.trialMessage": "Modo de prueba activo. Inicia sesión para usar Judge Mode y exportar evidencia.",
      "member.l10n.eyebrow": "Flujo localizado",
      "member.l10n.title": "Mesa de flujo para miembros",
      "member.tools.downloadNotes": "Descargar notas CSV",
      "member.tools.copyBrief": "Copiar Session Brief",
      "member.tools.clearNotes": "Borrar notas",
      "demo.eyebrow": "Vista de demo",
      "demo.title": "Diseñado como un producto Health-Tech financiable",
      "demo.activeScenario": "Escenario activo:",
      "demo.mockTitle": "Sesión CareVoice",
      "demo.userSays": "El usuario dice",
      "demo.aiResponse": "Respuesta de IA",
      "demo.signal.live": "EN VIVO",
      "demo.signal.sync": "SYNC"
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
      "nav.register": "Inscription",
      "nav.workspace": "Espace membre",
      "nav.demo": "Demander une démo",
      "nav.spainThemeLight": "Thème Espagne : Clair",
      "nav.spainThemeRich": "Thème Espagne : Intense",
      "voice.recordBtn": "🎙️ Maintenir pour parler",
      "voice.quickCantonese": "Cantonais",
      "voice.quickEnglish": "Anglais",
      "voice.compare": "Comparer à la cible",
      "voice.upperLip": "Lèvre supérieure",
      "voice.lowerLip": "Lèvre inférieure",
      "voice.waitingForVoice": "En attente d'entrée vocale...",
      "voice.readyToListen": "Prêt à écouter",
      "voice.signal.liveTranscript": "Transcription en direct",
      "voice.signal.ipa": "Sortie IPA",
      "voice.signal.score": "Score de prononciation",
      "voice.signal.advice": "Conseil de correction",
      "voice.recordBtnListening": "👂 Écoute...",
      "voice.status.listening": "Écoute",
      "voice.status.analyzing": "Analyse",
      "voice.status.ready": "Prêt",
      "voice.status.speechError": "Erreur vocale",
      "voice.speechErrorMessage": "❌ La reconnaissance vocale a échoué. Veuillez réessayer.",
      "ai.signal.title": "SIGNAL DE TRIAGE IA",
      "ai.signal.category": "Catégorie",
      "ai.signal.confidence": "Confiance",
      "ai.signal.severity": "Gravité",
      "ai.signal.nextStep": "Prochaine étape recommandée",
      "ai.category.general": "Général",
      "ai.category.symptom": "Symptôme",
      "ai.category.medication": "Médication",
      "ai.category.emergency": "Urgence",
      "ai.severity.low": "Faible",
      "ai.severity.medium": "Moyen",
      "ai.severity.critical": "Critique",
      "ai.next.default": "Poursuivez la surveillance de routine et les check-ins quotidiens.",
      "ai.next.critical": "Déclenchez SOS et contactez immédiatement l'aidant ou les urgences.",
      "ai.next.symptom": "Surveillez l'évolution et planifiez une revue avec l'aidant sous 24 h.",
      "ai.next.medication": "Confirmez l'historique de dose et l'horaire avec l'aidant.",
      "ai.response.logged": "✅ Enregistré avec succès.",
      "ai.response.medication": "💊 Entrée liée aux médicaments enregistrée.",
      "ai.response.symptom": "🩺 Symptôme enregistré. Surveillez les changements ou consultez un médecin.",
      "ai.response.emergency": "🚨 Urgence détectée ! Aidant alerté.",
      "seesound.advice.excellent": "Excellente articulation. Gardez un rythme stable et le même mouvement de bouche.",
      "seesound.advice.good": "Bon ensemble. Ralentissez légèrement sur les syllabes accentuées et gardez les voyelles cohérentes.",
      "seesound.advice.moderate": "Correspondance modérée. Renforcez les consonnes et répétez par segments plus courts.",
      "seesound.advice.needTranscript": "Prononcez d'abord une phrase complète, puis comparez avec votre cible.",
      "seesound.advice.needTarget": "Définissez une phrase cible pour activer des suggestions plus détaillées.",
      "seesound.advice.low": "Faible correspondance. Parlez plus lentement, ouvrez davantage la bouche et répétez 2–3 fois.",
      "mouth.hint.neutral": "Indice bouche : ouverture neutre",
      "mouth.hint.rounded": "Indice bouche : lèvres arrondies pour /o u/",
      "mouth.hint.open": "Indice bouche : mâchoire ouverte pour /a/",
      "mouth.hint.wide": "Indice bouche : sourire large pour /i e/",
      "sos.button": "🆘 SOS",
      "sos.sending": "📡 Envoi...",
      "sos.sent": "✅ Notification envoyée",
      "status.trial": "Mode essai (connectez-vous pour déverrouiller)",
      "judge.trialMessage": "Mode essai actif. Connectez-vous pour lancer le Judge Mode et exporter les preuves.",
      "member.l10n.eyebrow": "Flux localisé",
      "member.l10n.title": "Bureau de flux membre",
      "member.tools.downloadNotes": "Télécharger les notes CSV",
      "member.tools.copyBrief": "Copier le Session Brief",
      "member.tools.clearNotes": "Effacer les notes",
      "demo.eyebrow": "Vue démo",
      "demo.title": "Conçu comme un produit Health-Tech finançable",
      "demo.activeScenario": "Scénario actif :",
      "demo.mockTitle": "Session CareVoice",
      "demo.userSays": "L'utilisateur dit",
      "demo.aiResponse": "Réponse IA",
      "demo.signal.live": "LIVE",
      "demo.signal.sync": "SYNC"
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
  let allowGoogleTranslateInit = false;
  let translationRetryTimer = null;
  let switchStatusTimer = null;
  let translateUiSuppressorStyleEl = null;
  let translateUiHeadObserver = null;
  let translateUiBodyObserver = null;

  function ensureTranslateUiSuppressorInstalled() {
    if (!document || !document.head) return;

    const css = `
/* CareVoice: hard-hide Google Translate injected UI so it never overlays content. */
html body iframe.VIpgJd-ZVi9od-ORHb-OEVmcd.skiptranslate,
html body iframe.VIpgJd-ZVi9od-xl07Ob-OEVmcd.skiptranslate,
html body .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
html body .VIpgJd-ZVi9od-aZ2wEe-OiiCO,
html body .goog-te-banner-frame.skiptranslate,
html body iframe.goog-te-banner-frame,
html body .goog-te-gadget,
html body .goog-te-gadget-simple,
html body .goog-te-gadget-icon,
html body .goog-logo-link,
html body .goog-te-balloon-frame,
html body #goog-gt-tt,
html body > div.skiptranslate {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

/* Google Translate sometimes offsets the page; force layout back. */
html body {
  top: 0 !important;
}
`;

    if (!translateUiSuppressorStyleEl) {
      translateUiSuppressorStyleEl = document.createElement("style");
      translateUiSuppressorStyleEl.id = "carevoice-translate-ui-suppressor";
      translateUiSuppressorStyleEl.type = "text/css";
      translateUiSuppressorStyleEl.appendChild(document.createTextNode(css));
    }

    // Ensure our style is the last thing in <head>, so it wins even if Translate injects CSS later.
    const head = document.head;
    if (translateUiSuppressorStyleEl.parentNode !== head) {
      head.appendChild(translateUiSuppressorStyleEl);
    } else if (head.lastElementChild !== translateUiSuppressorStyleEl) {
      head.appendChild(translateUiSuppressorStyleEl);
    }

    if (!translateUiHeadObserver) {
      translateUiHeadObserver = new MutationObserver(() => {
        if (!document.head || !translateUiSuppressorStyleEl) return;
        if (document.head.lastElementChild !== translateUiSuppressorStyleEl) {
          document.head.appendChild(translateUiSuppressorStyleEl);
        }
      });
      translateUiHeadObserver.observe(head, { childList: true });
    }

    // Remove the stray "✂" text node if Translate injects it.
    // Some builds inject it deeper than the body direct children, so scan the subtree.
    const cleanupScissors = () => {
      if (!document.body) return;

      const toRemove = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (!node) continue;
        const value = String(node.nodeValue || "").trim();
        if (value === "✂") {
          toRemove.push(node);
        }
      }

      toRemove.forEach((node) => {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      });
    };

    cleanupScissors();
    if (!translateUiBodyObserver && document.body) {
      translateUiBodyObserver = new MutationObserver(() => cleanupScissors());
      translateUiBodyObserver.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
  }

  // Google callback entrypoint from the external translate script.
  window.__carevoiceInitTranslate = () => {
    if (!allowGoogleTranslateInit) return;
    ensureTranslateUiSuppressorInstalled();
    tryInitGoogleTranslateWidget();
  };
  window.googleTranslateElementInit = () => {
    if (typeof window.__carevoiceInitTranslate === "function") {
      window.__carevoiceInitTranslate();
    }
  };

  const quickSpeechToUiLang = {
    "zh-HK": "zh",
    "zh-CN": "zh",
    "en-US": "en",
    "de-DE": "de",
    "ja-JP": "ja",
    "es-ES": "es",
    "fr-FR": "fr"
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
      label: "香港主題",
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

  function getCookieValue(cookieName) {
    try {
      const cookies = String(document.cookie || "")
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean);
      const entry = cookies.find((item) => item.startsWith(`${cookieName}=`));
      if (!entry) return "";
      return decodeURIComponent(entry.slice(cookieName.length + 1));
    } catch {
      return "";
    }
  }

  function setUiLangCookie(lang) {
    const maxAgeSeconds = 60 * 60 * 24 * 365 * 2;
    document.cookie = `${uiLangCookieKey}=${encodeURIComponent(lang)};path=/;Max-Age=${maxAgeSeconds};SameSite=Lax`;

    const host = window.location && window.location.hostname ? window.location.hostname : "";
    if (host && host.includes(".") && host !== "localhost") {
      document.cookie = `${uiLangCookieKey}=${encodeURIComponent(lang)};path=/;domain=.${host};Max-Age=${maxAgeSeconds};SameSite=Lax`;
    }
  }

  function disableFullPageTranslation() {
    ensureTranslateUiSuppressorInstalled();
    setGoogTransCookie("en");
    const translateSelect = document.querySelector(".goog-te-combo");
    if (translateSelect && translateSelect.value !== "en") {
      translateSelect.value = "en";
      translateSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }

    if (document && document.body) {
      Array.from(document.body.childNodes).forEach((node) => {
        if (node && node.nodeType === Node.TEXT_NODE && String(node.nodeValue || "").trim() === "✂") {
          document.body.removeChild(node);
        }
      });
    }
  }

  function cleanupTranslateArtifacts() {
    ensureTranslateUiSuppressorInstalled();
    if (!document || !document.body) return;
    Array.from(document.body.childNodes).forEach((node) => {
      if (!node || node.nodeType !== Node.TEXT_NODE) return;
      const value = String(node.nodeValue || "").trim();
      if (value === "✂") {
        document.body.removeChild(node);
      }
    });
  }

  function applyFullPageTranslation(uiLang, options = {}) {
    ensureTranslateUiSuppressorInstalled();
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
        cleanupTranslateArtifacts();
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
    ensureTranslateUiSuppressorInstalled();
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
    allowGoogleTranslateInit = true;
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
    setUiLangCookie(safeLang);

    // Cantonese (zh) uses our built-in Cantonese UI strings. Avoid Google Translate
    // for this option so it doesn't turn into Putonghua-style translations.
    if (safeLang === "en" || safeLang === "zh") {
      disableFullPageTranslation();
      setLanguageSwitchStatus(getTranslation(safeLang, "nav.switchDone"), "success");
      if (switchStatusTimer) clearTimeout(switchStatusTimer);
      switchStatusTimer = setTimeout(() => setLanguageSwitchStatus(""), 1200);
    } else {
      applyFullPageTranslation(safeLang);
    }

    if (seeSoundTranscript) {
      const rawBox = transcriptBox ? String(transcriptBox.textContent || "") : "";
      const transcript = rawBox.startsWith("🗣️") ? rawBox.replace(/^🗣️\s*/u, "").trim() : "";
      updateSeeSoundPanel(transcript);
    }

    if (appExperience) {
      const isMember = !appExperience.classList.contains("locked-preview");
      setFeatureAccess(isMember);
    }

    applyCountryTheme(safeLang);
    updateSpainThemeVariantUi(safeLang);
    syncVoiceQuickLanguageToggle(safeLang);
    syncShowcaseDemoForUiLang(safeLang);
    syncCorpNavHeightVar();
  }

  function reassertTranslationsOnReturn() {
    const desiredUiLang = localStorage.getItem(uiLangKey) || getCookieValue(uiLangCookieKey) || activeUiLang || "en";
    const safeLang = i18n[desiredUiLang] ? desiredUiLang : "en";

    // If something changed the stored language while we were away, fully re-apply.
    if (safeLang !== activeUiLang) {
      applyUiLanguage(safeLang);
      return;
    }

    // Quietly re-apply the local strings in case the browser restored
    // stale DOM content (bfcache) while the tab/app was inactive.
    applyLocalI18nText(safeLang);
    restoreStaticFallback();
    applyStaticFallback(safeLang);

    // Then re-assert translation state.
    if (safeLang !== "en" && safeLang !== "zh") {
      applyFullPageTranslation(safeLang, { showStatus: false, maxAttempts: 6 });
    } else {
      disableFullPageTranslation();
    }

    if (seeSoundTranscript) {
      const rawBox = transcriptBox ? String(transcriptBox.textContent || "") : "";
      const transcript = rawBox.startsWith("🗣️") ? rawBox.replace(/^🗣️\s*/u, "").trim() : "";
      updateSeeSoundPanel(transcript);
    }

    if (appExperience) {
      const isMember = !appExperience.classList.contains("locked-preview");
      setFeatureAccess(isMember);
    }

    applyCountryTheme(safeLang);
    updateSpainThemeVariantUi(safeLang);
    syncCorpNavHeightVar();
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

  function normalizeEmail(rawEmail) {
    return String(rawEmail || "").trim().toLowerCase();
  }

  function getOrgDefaultRoomButtons(lang) {
    const map = {
      en: ["Call Nurse", "Med Check", "Fall Risk", "Vitals"],
      zh: ["叫護士", "用藥確認", "跌倒風險", "量度生命徵象"],
      de: ["Pflege rufen", "Med-Check", "Sturzrisiko", "Vitalwerte"],
      ja: ["ナース呼出", "投薬確認", "転倒リスク", "バイタル"],
      es: ["Llamar enfermería", "Chequeo medicación", "Riesgo de caída", "Signos vitales"],
      fr: ["Appeler infirmier", "Vérif. médicaments", "Risque de chute", "Constantes"]
    };
    return map[lang] || map.en;
  }

  function getActiveOrgProject() {
    return orgProjects.find((p) => p && p.id === orgActiveProjectId) || null;
  }

  function setActiveOrgProject(projectId) {
    orgActiveProjectId = String(projectId || "");
    if (orgActiveProjectId) {
      localStorage.setItem(orgActiveProjectKey, orgActiveProjectId);
    } else {
      localStorage.removeItem(orgActiveProjectKey);
    }
  }

  function loadOrgProjectsFromLocalStorage() {
    orgProjects.length = 0;
    try {
      const parsed = JSON.parse(localStorage.getItem(orgProjectsKey) || "[]");
      if (Array.isArray(parsed)) {
        parsed.forEach((item) => {
          if (item && item.id && item.name) {
            orgProjects.push({
              id: String(item.id),
              name: String(item.name),
              ownerUid: String(item.ownerUid || "local-demo"),
              memberEmails: Array.isArray(item.memberEmails) ? item.memberEmails.map(normalizeEmail).filter(Boolean) : [],
              rooms: Array.isArray(item.rooms) ? item.rooms : []
            });
          }
        });
      }
    } catch (err) {
      console.warn("Could not parse org projects:", err);
    }

    if (orgProjects.length && (!orgActiveProjectId || !orgProjects.some((p) => p.id === orgActiveProjectId))) {
      setActiveOrgProject(orgProjects[0].id);
    }
  }

  function persistOrgProjectsToLocalStorage() {
    const trimmed = orgProjects.slice(-50);
    localStorage.setItem(orgProjectsKey, JSON.stringify(trimmed));
  }

  async function loadOrgProjectsFromFirestore(user) {
    if (!window.db || !user) return [];
    const resultsById = new Map();
    const ownedSnap = await window.db.collection("orgProjects").where("ownerUid", "==", user.uid).get();
    ownedSnap.forEach((doc) => {
      const data = doc.data() || {};
      resultsById.set(doc.id, {
        id: doc.id,
        name: String(data.name || "Untitled Project"),
        ownerUid: String(data.ownerUid || user.uid),
        memberEmails: Array.isArray(data.memberEmails) ? data.memberEmails.map(normalizeEmail).filter(Boolean) : [],
        rooms: Array.isArray(data.rooms) ? data.rooms : []
      });
    });

    const email = normalizeEmail(user.email);
    if (email) {
      const memberSnap = await window.db.collection("orgProjects").where("memberEmails", "array-contains", email).get();
      memberSnap.forEach((doc) => {
        const data = doc.data() || {};
        resultsById.set(doc.id, {
          id: doc.id,
          name: String(data.name || "Untitled Project"),
          ownerUid: String(data.ownerUid || ""),
          memberEmails: Array.isArray(data.memberEmails) ? data.memberEmails.map(normalizeEmail).filter(Boolean) : [],
          rooms: Array.isArray(data.rooms) ? data.rooms : []
        });
      });
    }

    return Array.from(resultsById.values());
  }

  async function saveOrgProjectToFirestore(project) {
    if (!window.db || !project || !project.id) return;
    const payload = {
      name: String(project.name || "Untitled Project"),
      ownerUid: String(project.ownerUid || ""),
      memberEmails: Array.isArray(project.memberEmails) ? project.memberEmails.map(normalizeEmail).filter(Boolean) : [],
      rooms: Array.isArray(project.rooms) ? project.rooms : []
    };
    await window.db.collection("orgProjects").doc(project.id).set(payload, { merge: true });
  }

  async function deleteOrgProjectFromFirestore(projectId) {
    if (!window.db || !projectId) return;
    await window.db.collection("orgProjects").doc(String(projectId)).delete();
  }

  function renderOrgProjectsUI() {
    if (!orgProjectSelect || !orgRoomsList || !orgMembersList) return;

    const active = getActiveOrgProject();
    const isOwner = !!(active && currentOrgUser && active.ownerUid && currentOrgUser.uid && active.ownerUid === currentOrgUser.uid);

    if (deleteOrgProjectBtn) deleteOrgProjectBtn.disabled = !active || !isOwner;
    if (addOrgMemberBtn) addOrgMemberBtn.disabled = !active || !isOwner;
    if (addOrgRoomBtn) addOrgRoomBtn.disabled = !active || !isOwner;
    if (applyRoomDefaultsBtn) applyRoomDefaultsBtn.disabled = !active || !isOwner;

    orgProjectSelect.innerHTML = "";
    if (!orgProjects.length) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = "No projects yet";
      orgProjectSelect.appendChild(opt);
      orgProjectSelect.disabled = true;
    } else {
      orgProjectSelect.disabled = false;
      orgProjects.forEach((project) => {
        const opt = document.createElement("option");
        opt.value = project.id;
        opt.textContent = project.name;
        if (project.id === orgActiveProjectId) opt.selected = true;
        orgProjectSelect.appendChild(opt);
      });
    }

    orgMembersList.innerHTML = "";
    const members = active && Array.isArray(active.memberEmails) ? active.memberEmails : [];
    if (!active) {
      const li = document.createElement("li");
      li.textContent = "Create or select a project to manage members.";
      orgMembersList.appendChild(li);
    } else if (!members.length) {
      const li = document.createElement("li");
      li.textContent = "No members added yet.";
      orgMembersList.appendChild(li);
    } else {
      members.slice(0, 30).forEach((email) => {
        const li = document.createElement("li");
        li.textContent = email;
        orgMembersList.appendChild(li);
      });
    }

    if (orgProjectStatus) {
      if (!active) {
        orgProjectStatus.textContent = "Create a project, add members, and set up rooms with watch-outs and custom action buttons.";
      } else {
        const roleLabel = isOwner ? "Owner" : "Member (view)";
        orgProjectStatus.textContent = `Active project: ${active.name} • ${roleLabel}`;
      }
    }

    orgRoomsList.innerHTML = "";
    const rooms = active && Array.isArray(active.rooms) ? active.rooms : [];
    if (!active) {
      const emptyCard = document.createElement("article");
      emptyCard.className = "ops-card";
      const h3 = document.createElement("h3");
      h3.textContent = "No active project";
      const p = document.createElement("p");
      p.className = "brief-text";
      p.textContent = "Create or select a project to view rooms.";
      emptyCard.appendChild(h3);
      emptyCard.appendChild(p);
      orgRoomsList.appendChild(emptyCard);
      return;
    }

    if (!rooms.length) {
      const emptyCard = document.createElement("article");
      emptyCard.className = "ops-card";
      const h3 = document.createElement("h3");
      h3.textContent = "No rooms yet";
      const p = document.createElement("p");
      p.className = "brief-text";
      p.textContent = "Add Room 1 / Room 2 and configure their buttons.";
      emptyCard.appendChild(h3);
      emptyCard.appendChild(p);
      orgRoomsList.appendChild(emptyCard);
      return;
    }

    rooms.slice(0, 40).forEach((room) => {
      const roomName = String(room && room.name ? room.name : "Room");
      const who = String(room && room.who ? room.who : "");
      const watchouts = String(room && room.watchouts ? room.watchouts : "");
      const buttons = Array.isArray(room && room.buttons) ? room.buttons.map((b) => String(b || "").trim()).filter(Boolean) : [];

      const card = document.createElement("article");
      card.className = "ops-card";
      const h3 = document.createElement("h3");
      h3.textContent = roomName;

      const meta = document.createElement("p");
      meta.className = "brief-text";
      const whoLine = who ? `Who: ${who}` : "Who: —";
      const watchLine = watchouts ? `Watch-outs: ${watchouts}` : "Watch-outs: —";
      meta.textContent = `${whoLine} • ${watchLine}`;

      const actionWrap = document.createElement("div");
      actionWrap.className = "tool-actions";
      const actionButtons = buttons.length ? buttons : getOrgDefaultRoomButtons(activeUiLang);
      actionButtons.slice(0, 8).forEach((label) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "secondary-btn";
        btn.textContent = label;
        btn.addEventListener("click", () => {
          if (!currentOrgUser) {
            window.alert("Please sign in to use room actions.");
            return;
          }
          const details = window.prompt(`Action note for ${roomName} / ${label} (optional):`, "") || "";
          const detailSuffix = details.trim() ? ` — ${details.trim()}` : "";
          persistMemberNote(`${active.name} / ${roomName} — ${label}${detailSuffix}`, "Room Action");
          refreshMemberTools();
        });
        actionWrap.appendChild(btn);
      });

      card.appendChild(h3);
      card.appendChild(meta);
      card.appendChild(actionWrap);

      if (isOwner) {
        const adminWrap = document.createElement("div");
        adminWrap.className = "tool-actions";

        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.className = "secondary-btn";
        editBtn.textContent = "Edit Room";
        editBtn.addEventListener("click", async () => {
          const nextWho = window.prompt(`Who is it? (${roomName})`, who) || "";
          const nextWatchouts = window.prompt(`What to look out for? (${roomName})`, watchouts) || "";
          const nextButtonsRaw = window.prompt(`Buttons (comma-separated) (${roomName})`, (buttons || []).join(", ")) || "";
          const nextButtons = nextButtonsRaw.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 10);

          room.who = nextWho.trim();
          room.watchouts = nextWatchouts.trim();
          room.buttons = nextButtons;
          await persistActiveOrgProject();
          renderOrgProjectsUI();
        });

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "secondary-btn";
        removeBtn.textContent = "Remove Room";
        removeBtn.addEventListener("click", async () => {
          const ok = window.confirm(`Remove ${roomName}?`);
          if (!ok) return;
          active.rooms = active.rooms.filter((r) => r !== room);
          await persistActiveOrgProject();
          renderOrgProjectsUI();
        });

        adminWrap.appendChild(editBtn);
        adminWrap.appendChild(removeBtn);
        card.appendChild(adminWrap);
      }

      orgRoomsList.appendChild(card);
    });
  }

  async function persistActiveOrgProject() {
    const active = getActiveOrgProject();
    if (!active) return;

    if (currentOrgUser && window.db) {
      if (!active.ownerUid) active.ownerUid = currentOrgUser.uid;
      await saveOrgProjectToFirestore(active);
      return;
    }

    persistOrgProjectsToLocalStorage();
  }

  async function initOrgProjectsForUser(user) {
    if (!orgProjectSelect && !createOrgProjectBtn && !orgRoomsList) return;

    currentOrgUser = user || null;
    const identity = user && user.uid ? `uid:${user.uid}` : "local";
    if (orgLoadedForIdentity === identity) {
      renderOrgProjectsUI();
      return;
    }

    orgLoadedForIdentity = identity;
    orgProjects.length = 0;

    if (user && window.db) {
      try {
        const loaded = await loadOrgProjectsFromFirestore(user);
        loaded.forEach((p) => orgProjects.push(p));
      } catch (err) {
        console.warn("Could not load org projects from Firestore:", err);
        loadOrgProjectsFromLocalStorage();
      }
    } else {
      loadOrgProjectsFromLocalStorage();
    }

    if (orgProjects.length && (!orgActiveProjectId || !orgProjects.some((p) => p.id === orgActiveProjectId))) {
      setActiveOrgProject(orgProjects[0].id);
    }

    renderOrgProjectsUI();
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
      const header = document.querySelector(".corp-nav");
      const headerOffset = header ? Math.ceil(header.getBoundingClientRect().height) + 28 : 18;
      glideToElement(target, headerOffset);

      // Keep URL hash aligned with current section.
      if (window.history && window.history.pushState) {
        window.history.pushState(null, "", href);
      }
    });
  }

  function setupNavScrollSpy() {
    const header = document.querySelector(".corp-nav");
    const navLinks = Array.from(document.querySelectorAll('.corp-nav .nav-links a[href^="#"]'));
    if (!navLinks.length) return;

    const linkPairs = navLinks
      .map((link) => {
        const href = link.getAttribute("href") || "";
        const id = href.startsWith("#") ? href.slice(1) : "";
        if (!id) return null;
        const section = document.getElementById(id);
        if (!section) return null;
        return { link, section, id };
      })
      .filter(Boolean);

    if (!linkPairs.length) return;

    const setActiveLink = (active) => {
      linkPairs.forEach(({ link }) => {
        if (link === active) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    let ticking = false;
    const updateActive = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const offset = headerHeight + 24;

        let best = null;
        let bestScore = Number.POSITIVE_INFINITY;

        for (const { link, section } of linkPairs) {
          const rect = section.getBoundingClientRect();
          const topDelta = rect.top - offset;
          const bottomDelta = rect.bottom - offset;

          if (topDelta <= 0 && bottomDelta > 0) {
            best = link;
            break;
          }

          if (topDelta <= 0) {
            const score = Math.abs(topDelta);
            if (score < bestScore) {
              bestScore = score;
              best = link;
            }
          }
        }

        if (!best) {
          const firstRect = linkPairs[0].section.getBoundingClientRect();
          if (firstRect.top - offset > 0) {
            best = linkPairs[0].link;
          } else {
            best = linkPairs[linkPairs.length - 1].link;
          }
        }

        setActiveLink(best);
      });
    };

    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    window.addEventListener("hashchange", updateActive);
    updateActive();
  }

  function syncCorpNavHeightVar() {
    const header = document.querySelector(".corp-nav");
    if (!header) return;

    const isMobile = window.matchMedia
      && window.matchMedia("(max-width: 1024px), (hover: none) and (pointer: coarse)").matches;
    const isForceFixed = document.body && document.body.classList.contains("nav-force-fixed");
    if (!isMobile && !isForceFixed) {
      document.documentElement.style.removeProperty("--corp-nav-h");
      return;
    }

    const height = Math.max(0, Math.ceil(header.getBoundingClientRect().height || 0));
    document.documentElement.style.setProperty("--corp-nav-h", `${height}px`);
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
        // Use translate instead of transform so it composes with hover + reveal transforms.
        el.style.translate = `0 ${shift.toFixed(2)}px`;
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

  function setupNavChromeMotion() {
    const header = document.querySelector(".corp-nav");
    if (!header) return;

    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let ticking = false;

    const apply = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 6);
    };

    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          apply();
          ticking = false;
        });
      },
      { passive: true }
    );

    apply();
  }

  function setupNavStickyFallback() {
    const header = document.querySelector(".corp-nav");
    if (!header) return;

    const isMobile = window.matchMedia
      && window.matchMedia("(max-width: 1024px), (hover: none) and (pointer: coarse)").matches;
    if (isMobile) return;

    const initialPos = getComputedStyle(header).position;
    if (initialPos === "fixed") return;

    const stickySupported = (window.CSS && typeof window.CSS.supports === "function")
      ? (CSS.supports("position", "sticky") || CSS.supports("position", "-webkit-sticky"))
      : true;
    if (!stickySupported) {
      document.body.classList.add("nav-force-fixed");
      syncCorpNavHeightVar();
      return;
    }

    let forced = false;
    let ticking = false;

    const getExpectedTop = () => {
      const top = parseFloat(getComputedStyle(header).top || "0");
      return Number.isFinite(top) ? top : 0;
    };

    const check = () => {
      if (forced) return;
      if ((window.scrollY || 0) < 8) return;

      const rectTop = header.getBoundingClientRect().top;
      const expectedTop = getExpectedTop();

      // If sticky is working, rectTop stays near the configured `top` value.
      // If sticky is broken, the nav scrolls away and rectTop diverges.
      if (Math.abs(rectTop - expectedTop) > 24) {
        forced = true;
        document.body.classList.add("nav-force-fixed");
        syncCorpNavHeightVar();
      }
    };

    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          check();
          ticking = false;
        });
      },
      { passive: true }
    );

    window.addEventListener("resize", () => {
      if (!document.body.classList.contains("nav-force-fixed")) return;
      syncCorpNavHeightVar();
    });

    // Run once on load and shortly after layout settles.
    check();
    setTimeout(check, 250);
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
      downloadNotesBtn,
      copyBriefBtn,
      clearNotesBtn,
      createOrgProjectBtn,
      deleteOrgProjectBtn,
      addOrgMemberBtn,
      addOrgRoomBtn,
      applyRoomDefaultsBtn,
      logoutBtn
    ];

    controlledElements.forEach((el) => {
      if (!el) return;
      el.disabled = !isMember;
    });

    if (!isMember) {
      if (statusPill) statusPill.textContent = getTranslation(activeUiLang, "status.trial");
      if (judgeModeStatus) judgeModeStatus.textContent = getTranslation(activeUiLang, "judge.trialMessage");
      return;
    }

    if (statusPill && !isListening) statusPill.textContent = getTranslation(activeUiLang, "voice.status.ready");
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
    if (score >= 90) return getTranslation(activeUiLang, "seesound.advice.excellent");
    if (score >= 75) return getTranslation(activeUiLang, "seesound.advice.good");
    if (score >= 55) return getTranslation(activeUiLang, "seesound.advice.moderate");
    if (!transcript) return getTranslation(activeUiLang, "seesound.advice.needTranscript");
    if (!target) return getTranslation(activeUiLang, "seesound.advice.needTarget");
    return getTranslation(activeUiLang, "seesound.advice.low");
  }

  function getMouthHintFromIpa(ipa) {
    const value = (ipa || "").toLowerCase();
    if (!value || value === "/ - /") {
      return { className: "mouth-neutral", hintKey: "mouth.hint.neutral" };
    }
    if (/[ouɔʊu]/.test(value)) {
      return { className: "mouth-rounded", hintKey: "mouth.hint.rounded" };
    }
    if (/[aæɑ]/.test(value)) {
      return { className: "mouth-open", hintKey: "mouth.hint.open" };
    }
    if (/[iɪeɛ]/.test(value)) {
      return { className: "mouth-wide", hintKey: "mouth.hint.wide" };
    }
    return { className: "mouth-neutral", hintKey: "mouth.hint.neutral" };
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
    const ipaSource = cleanTranscript || target;
    const ipa = currentLang === "zh-HK"
      ? toIpaApproxCantonese(ipaSource)
      : toIpaApproxEnglish(ipaSource);

    const distance = simpleWordDistance(cleanTranscript, target || cleanTranscript);
    const denominator = Math.max((target || cleanTranscript).length, 1);
    const rawScore = Math.max(0, Math.round(100 - (distance / denominator) * 100));
    const score = cleanTranscript ? rawScore : 0;

    const waitingText = getTranslation(activeUiLang, "voice.waitingForVoice");
    seeSoundTranscript.textContent = cleanTranscript || waitingText;
    seeSoundTranscript.dataset.empty = cleanTranscript ? "0" : "1";
    seeSoundIpa.textContent = ipa;
    seeSoundScore.textContent = `${score}/100`;
    seeSoundAdvice.textContent = generatePronunciationAdvice(score, cleanTranscript, target);

    if (seeSoundMouth && seeSoundMouthHint) {
      const mouthHint = getMouthHintFromIpa(ipa);
      seeSoundMouth.classList.remove("mouth-neutral", "mouth-open", "mouth-rounded", "mouth-wide");
      seeSoundMouth.classList.add(mouthHint.className);
      seeSoundMouthHint.textContent = getTranslation(activeUiLang, mouthHint.hintKey);
      triggerMouthGuideAnimation();
    }
  }

  function updateAuthUI(user) {
    if (user) {
      const providerLabel = user.providerData && user.providerData[0] && user.providerData[0].providerId === "google.com"
        ? "Google"
        : "Authenticated";
      const userLabel = user.displayName || user.email || user.uid;
      if (authStatusText) {
        authStatusText.textContent = `${providerLabel} login active: ${userLabel}. Cloud sync enabled.`;
      }
      if (memberStatusText) {
        memberStatusText.textContent = `${providerLabel} account: ${userLabel}`;
      }
      if (memberNameValue) memberNameValue.textContent = userLabel;
      if (memberModeValue) memberModeValue.textContent = "Member";
      if (googleLoginBtn) googleLoginBtn.disabled = true;
      if (googleRegisterBtn) googleRegisterBtn.disabled = true;
      if (switchAccountBtn) switchAccountBtn.disabled = false;
      if (logoutBtn) logoutBtn.disabled = false;
      if (loginPortal) loginPortal.classList.add("hidden");
      if (memberWorkspaceBtn) memberWorkspaceBtn.classList.remove("hidden");
      setFeatureAccess(true);

      // If the user just completed a login/register action from the home page,
      // route them to the dedicated member workspace page.
      const desiredRoute = getPostAuthRoute();
      if (desiredRoute === "member" && !isMemberWorkspacePage()) {
        clearPostAuthRoute();
        window.location.href = "member.html";
        return;
      }
      if (desiredRoute === "member" && isMemberWorkspacePage()) {
        clearPostAuthRoute();
      }
    } else {
      if (authStatusText) {
        authStatusText.textContent = "Not signed in. Trial mode is active for core testing. Sign in from Member Login to unlock full features.";
      }
      if (memberStatusText) {
        memberStatusText.textContent = "Trial mode active. Member login required for exports, judge mode, and cloud sync.";
      }
      if (memberNameValue) memberNameValue.textContent = "Not Signed In";
      if (memberModeValue) memberModeValue.textContent = "Trial";
      if (googleLoginBtn) googleLoginBtn.disabled = false;
      if (googleRegisterBtn) googleRegisterBtn.disabled = false;
      if (switchAccountBtn) switchAccountBtn.disabled = true;
      if (logoutBtn) logoutBtn.disabled = true;
      if (memberWorkspaceBtn) memberWorkspaceBtn.classList.add("hidden");
      setFeatureAccess(false);
    }

    syncCorpNavHeightVar();
  }

  async function initAuth() {
    if (!window.auth || !window.db) {
      console.info("Firebase not configured. Running in local demo mode.");
      updateAuthUI(null);
      initOrgProjectsForUser(null);
      refreshEvidence();
      return;
    }

    try {
      // If we previously fell back to redirect-based auth (popup blocked),
      // finalize that flow as soon as the app loads.
      await window.auth.getRedirectResult();
    } catch (error) {
      console.warn("Google redirect sign-in failed:", error);
      const code = error && error.code ? String(error.code) : "";
      const host = window.location && window.location.hostname ? window.location.hostname : "this domain";
      if (authStatusText) {
        if (code === "auth/unauthorized-domain") {
          authStatusText.textContent = `Google sign-in blocked (unauthorized domain). In Firebase Console → Authentication → Settings → Authorized domains, add: ${host}. If you're using a Vercel Preview URL, deploy to a stable Production/custom domain and authorize that instead.`;
        } else {
          authStatusText.textContent = "Google sign-in failed after redirect. Please try again.";
        }
      }
    }

    window.auth.onAuthStateChanged((user) => {
      if (user && user.uid) {
        activeUserId = user.uid;
      } else {
        activeUserId = "local-demo";
      }
      updateAuthUI(user);
      initOrgProjectsForUser(user);
    });

    refreshEvidence();
  }

  async function signInWithGoogle() {
    if (!window.auth || !window.firebase) {
      if (authStatusText) {
        authStatusText.textContent = "Google sign-in unavailable (Firebase not initialized). Check firebase-config.js and that Firebase Auth is enabled.";
      }
      return;
    }

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    if (authStatusText) {
      authStatusText.textContent = "Opening Google sign-in…";
    }

    try {
      // Redirect-based auth is the most reliable across iPhone/iPad Safari,
      // strict privacy settings, and deployments that set COOP headers.
      await window.auth.signInWithRedirect(provider);
    } catch (error) {
      console.warn("Google redirect sign-in failed:", error);

      const code = error && error.code ? String(error.code) : "";
      const host = window.location && window.location.hostname ? window.location.hostname : "";

      if (authStatusText) {
        if (code === "auth/unauthorized-domain") {
          authStatusText.textContent = `Google sign-in blocked (unauthorized domain). In Firebase Console → Authentication → Settings → Authorized domains, add: ${host || "your Vercel domain"}. Note: Vercel Preview URLs change; prefer a stable Production/custom domain.`;
        } else {
          authStatusText.textContent = "Google sign-in failed. Check Firebase provider setup and authorized domains.";
        }
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

  // Web Speech API Setup (optional: some pages don't include voice UI)
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const hasVoiceUi = Boolean(recordBtn && transcriptBox && aiResponse);
  if (hasVoiceUi && !SpeechRecognition) {
    transcriptBox.innerHTML = "<p>⚠️ 此瀏覽器不支援語音輸入。請使用 Chrome/Edge。</p>";
    if (statusPill) {
      statusPill.textContent = "瀏覽器不支援 / Browser unsupported";
    }
  }

  function initRecognition() {
    if (!SpeechRecognition || !hasVoiceUi) return;
    recognition = new SpeechRecognition();
    recognition.lang = currentLang;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      isListening = true;
      recordBtn.classList.add("listening");
      recordBtn.textContent = getTranslation(activeUiLang, "voice.recordBtnListening");
      if (statusPill) {
        statusPill.textContent = getTranslation(activeUiLang, "voice.status.listening");
      }
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const bestTranscript = (finalTranscript || interimTranscript || "").trim();
      if (bestTranscript) {
        transcriptBox.textContent = `🗣️ ${bestTranscript}`;
        if (mockTranscript) {
          mockTranscript.textContent = bestTranscript;
        }
        updateSeeSoundPanel(bestTranscript);
      }

      if (finalTranscript && finalTranscript.trim()) {
        if (statusPill) {
          statusPill.textContent = getTranslation(activeUiLang, "voice.status.analyzing");
        }
        analyzeInput(finalTranscript.trim());
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech error:", event.error);
      aiResponse.textContent = getTranslation(activeUiLang, "voice.speechErrorMessage");
      aiResponse.dataset.category = "error";
      if (statusPill) {
        statusPill.textContent = getTranslation(activeUiLang, "voice.status.speechError");
      }
    };

    recognition.onend = () => {
      isListening = false;
      recordBtn.classList.remove("listening");
      recordBtn.textContent = getTranslation(activeUiLang, "voice.recordBtn");
      if (statusPill) {
        statusPill.textContent = getTranslation(activeUiLang, "voice.status.ready");
      }
    };
  }

  const initialUiLang = localStorage.getItem(uiLangKey) || getCookieValue(uiLangCookieKey) || "en";
  if (initialUiLang !== "en" && initialUiLang !== "zh") {
    initFullPageTranslationEngine();
  }
  if (globalLangSelect) {
    globalLangSelect.value = i18n[initialUiLang] ? initialUiLang : "en";
  }
  applyUiLanguage(initialUiLang);

  syncCorpNavHeightVar();
  window.addEventListener("resize", () => syncCorpNavHeightVar());

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
  if (seeSoundTarget && String(seeSoundTarget.value || "").trim()) {
    updateSeeSoundPanel("");
  }
  if (loginPortal) loginPortal.classList.add("hidden");
  setupSmoothAnchorGlide();
  setupNavScrollSpy();
  setupNavChromeMotion();
  setupNavStickyFallback();
  setupParallax();
  setupBrandHomeButton();
  loadLocalLogs();
  loadMemberNotes();
  refreshEvidence();
  refreshMemberTools();
  initAuth();

  if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", () => {
      setPostAuthRoute("member");
      signInWithGoogle();
    });
  }

  if (googleRegisterBtn) {
    googleRegisterBtn.addEventListener("click", () => {
      setPostAuthRoute("member");
      signInWithGoogle();
    });
  }

  if (openPortalBtn) {
    openPortalBtn.addEventListener("click", () => {
      setPostAuthRoute("member");
      showLoginPortal();
    });
  }

  if (openRegisterBtn) {
    openRegisterBtn.addEventListener("click", () => {
      setPostAuthRoute("member");
      showLoginPortal();
    });
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

  if (applyRoomDefaultsBtn) {
    applyRoomDefaultsBtn.addEventListener("click", () => {
      if (!orgRoomButtonsInput) return;
      orgRoomButtonsInput.value = getOrgDefaultRoomButtons(activeUiLang).join(", ");
    });
  }

  if (orgProjectSelect) {
    orgProjectSelect.addEventListener("change", () => {
      const nextId = orgProjectSelect.value;
      setActiveOrgProject(nextId);
      renderOrgProjectsUI();
    });
  }

  if (createOrgProjectBtn) {
    createOrgProjectBtn.addEventListener("click", async () => {
      const name = orgProjectNameInput ? String(orgProjectNameInput.value || "").trim() : "";
      if (!name) return;
      if (!currentOrgUser) {
        window.alert("Please sign in to create organization projects.");
        return;
      }

      const id = `p_${Date.now()}_${Math.random().toString(16).slice(2)}`;
      const project = {
        id,
        name,
        ownerUid: currentOrgUser.uid,
        memberEmails: [],
        rooms: []
      };

      orgProjects.unshift(project);
      setActiveOrgProject(id);
      if (orgProjectNameInput) orgProjectNameInput.value = "";
      await persistActiveOrgProject();
      renderOrgProjectsUI();
    });
  }

  if (deleteOrgProjectBtn) {
    deleteOrgProjectBtn.addEventListener("click", async () => {
      const active = getActiveOrgProject();
      if (!active) return;
      if (!currentOrgUser || active.ownerUid !== currentOrgUser.uid) {
        window.alert("Only the project owner can delete this project.");
        return;
      }
      const ok = window.confirm(`Delete project "${active.name}"?`);
      if (!ok) return;

      const idToDelete = active.id;
      const idx = orgProjects.findIndex((p) => p.id === idToDelete);
      if (idx >= 0) orgProjects.splice(idx, 1);
      if (orgActiveProjectId === idToDelete) {
        setActiveOrgProject(orgProjects.length ? orgProjects[0].id : "");
      }

      try {
        await deleteOrgProjectFromFirestore(idToDelete);
      } catch (err) {
        console.warn("Project delete failed:", err);
      }

      persistOrgProjectsToLocalStorage();
      renderOrgProjectsUI();
    });
  }

  if (addOrgMemberBtn) {
    addOrgMemberBtn.addEventListener("click", async () => {
      const active = getActiveOrgProject();
      if (!active) return;
      if (!currentOrgUser || active.ownerUid !== currentOrgUser.uid) {
        window.alert("Only the project owner can add members.");
        return;
      }
      const email = normalizeEmail(orgMemberEmailInput ? orgMemberEmailInput.value : "");
      if (!email || !email.includes("@")) return;
      active.memberEmails = Array.from(new Set([...(active.memberEmails || []), email]));
      if (orgMemberEmailInput) orgMemberEmailInput.value = "";
      await persistActiveOrgProject();
      renderOrgProjectsUI();
    });
  }

  if (addOrgRoomBtn) {
    addOrgRoomBtn.addEventListener("click", async () => {
      const active = getActiveOrgProject();
      if (!active) return;
      if (!currentOrgUser || active.ownerUid !== currentOrgUser.uid) {
        window.alert("Only the project owner can add rooms.");
        return;
      }

      const name = String(orgRoomNameInput ? orgRoomNameInput.value : "").trim();
      if (!name) return;
      const who = String(orgRoomWhoInput ? orgRoomWhoInput.value : "").trim();
      const watchouts = String(orgRoomWatchoutsInput ? orgRoomWatchoutsInput.value : "").trim();
      const buttonsRaw = String(orgRoomButtonsInput ? orgRoomButtonsInput.value : "");
      const buttons = buttonsRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 10);

      const room = {
        id: `r_${Date.now()}_${Math.random().toString(16).slice(2)}`,
        name,
        who,
        watchouts,
        buttons
      };
      active.rooms = Array.isArray(active.rooms) ? active.rooms : [];
      active.rooms.unshift(room);

      if (orgRoomNameInput) orgRoomNameInput.value = "";
      if (orgRoomWhoInput) orgRoomWhoInput.value = "";
      if (orgRoomWatchoutsInput) orgRoomWatchoutsInput.value = "";

      await persistActiveOrgProject();
      renderOrgProjectsUI();
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

  if (downloadNotesBtn) {
    downloadNotesBtn.addEventListener("click", () => {
      exportMemberNotesCsv();
    });
  }

  if (copyBriefBtn) {
    copyBriefBtn.addEventListener("click", () => {
      if (sessionBriefText && sessionBriefText.textContent === "No brief generated yet.") {
        sessionBriefText.textContent = buildSessionBrief();
      }
      copySessionBriefToClipboard();
    });
  }

  if (clearNotesBtn) {
    clearNotesBtn.addEventListener("click", () => {
      clearMemberNotes();
    });
  }

  if (seeSoundCompareBtn) {
    seeSoundCompareBtn.addEventListener("click", () => {
      const rawText = seeSoundTranscript ? seeSoundTranscript.textContent : "";
      const transcript = seeSoundTranscript && seeSoundTranscript.dataset.empty === "1" ? "" : rawText;
      updateSeeSoundPanel(transcript);
    });
  }

  if (seeSoundTarget) {
    seeSoundTarget.addEventListener("input", () => {
      updateSeeSoundPanel("");
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
    mockSignal.textContent = getTranslation(activeUiLang, "demo.signal.live");
    mockSignal.style.color = "#7df6d9";
    setTimeout(() => {
      mockSignal.textContent = getTranslation(activeUiLang, "demo.signal.sync");
      mockSignal.style.color = "#98c8ff";
    }, 1300);
  }

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
  if (recordBtn) {
    let lastPointerActionAt = 0;
    const startListening = () => {
      if (!recognition) return;
      if (isListening) return;
      try {
        recognition.start();
      } catch (e) {
        console.warn(e);
      }
    };

    const stopListening = () => {
      if (!recognition) return;
      if (!isListening) return;
      try {
        recognition.stop();
      } catch (e) {
        console.warn(e);
      }
    };

    // Prefer press-and-hold on mobile; keep click-to-toggle as fallback.
    if ("PointerEvent" in window) {
      recordBtn.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        lastPointerActionAt = Date.now();
        recordBtn.setPointerCapture(event.pointerId);
        startListening();
      });
      recordBtn.addEventListener("pointerup", (event) => {
        event.preventDefault();
        lastPointerActionAt = Date.now();
        stopListening();
      });
      recordBtn.addEventListener("pointercancel", () => {
        lastPointerActionAt = Date.now();
        stopListening();
      });
      recordBtn.addEventListener("lostpointercapture", () => {
        lastPointerActionAt = Date.now();
        stopListening();
      });
    }

    recordBtn.addEventListener("click", () => {
      if (Date.now() - lastPointerActionAt < 550) return;
      if (!recognition) return;
      if (!isListening) {
        startListening();
      } else {
        stopListening();
      }
    });
  }

  // Simple AI Analysis (Client-Side MVP)
  function analyzeInput(text) {
    const startedAt = performance.now();
    const safeText = String(text || "").trim();
    const lower = safeText.toLowerCase();

    const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const isAsciiTerm = (term) => /^[\x00-\x7F]+$/.test(term);
    const findTermOccurrences = (haystack, needle) => {
      if (!needle) return [];
      const term = String(needle);
      const occurrences = [];

      // For single English words, use word boundaries to reduce false positives.
      if (isAsciiTerm(term) && !term.includes(" ")) {
        const re = new RegExp(`\\b${escapeRegExp(term)}\\b`, "gi");
        let match;
        while ((match = re.exec(haystack)) !== null) {
          occurrences.push(match.index);
        }
        return occurrences;
      }

      let idx = 0;
      while (idx >= 0) {
        idx = haystack.indexOf(term, idx);
        if (idx >= 0) {
          occurrences.push(idx);
          idx = idx + Math.max(1, term.length);
        }
      }
      return occurrences;
    };

    const negationTokensEn = ["no", "not", "without", "never"];
    const negationTokensZh = ["冇", "無", "唔", "唔係", "未", "唔係"];
    const isNegatedAt = (index, term, haystackLower) => {
      if (index < 0) return false;
      const windowStart = Math.max(0, index - 24);
      const prefixWindow = haystackLower.slice(windowStart, index);

      if (isAsciiTerm(term)) {
        return negationTokensEn.some((neg) => prefixWindow.includes(`${neg} `) || prefixWindow.endsWith(neg));
      }

      const closePrefix = haystackLower.slice(Math.max(0, index - 2), index);
      if (negationTokensZh.some((neg) => closePrefix.includes(neg))) return true;
      return negationTokensZh.some((neg) => prefixWindow.includes(neg));
    };

    const weightedLexicon = {
      medication: [
        { term: "藥", weight: 1.0 },
        { term: "食藥", weight: 1.5 },
        { term: "藥丸", weight: 1.5 },
        { term: "藥水", weight: 1.4 },
        { term: "服用", weight: 1.4 },
        { term: "劑量", weight: 1.5 },
        { term: "藥量", weight: 1.5 },
        { term: "漏食", weight: 1.6 },
        { term: "忘記食", weight: 1.7 },
        { term: "胰島素", weight: 1.8 },
        { term: "打針", weight: 1.4 },
        { term: "血糖", weight: 1.6 },
        { term: "pill", weight: 1.5 },
        { term: "dose", weight: 1.4 },
        { term: "medication", weight: 1.5 },
        { term: "prescription", weight: 1.5 },
        { term: "refill", weight: 1.4 },
        { term: "insulin", weight: 1.8 },
        { term: "side effect", weight: 1.4 },
        { term: "blood pressure", weight: 1.6 },
        { term: "diabetes", weight: 1.6 },
        { term: "血壓", weight: 1.6 },
        { term: "高血壓", weight: 1.6 },
        { term: "糖尿", weight: 1.6 }
      ],
      symptom: [
        { term: "痛", weight: 0.9 },
        { term: "好痛", weight: 1.4 },
        { term: "心口痛", weight: 2.2 },
        { term: "胸口痛", weight: 2.2 },
        { term: "頭暈", weight: 1.6 },
        { term: "暈", weight: 1.1 },
        { term: "咳", weight: 1.1 },
        { term: "咳嗽", weight: 1.2 },
        { term: "發燒", weight: 1.6 },
        { term: "發熱", weight: 1.4 },
        { term: "熱", weight: 1.0 },
        { term: "喉嚨痛", weight: 1.3 },
        { term: "嘔", weight: 1.2 },
        { term: "嘔吐", weight: 1.4 },
        { term: "肚痛", weight: 1.3 },
        { term: "腹瀉", weight: 1.4 },
        { term: "呼吸困難", weight: 2.4 },
        { term: "呼吸", weight: 1.2 },
        { term: "氣喘", weight: 1.9 },
        { term: "喘", weight: 1.3 },
        { term: "麻痺", weight: 2.0 },
        { term: "跌倒", weight: 1.9 },
        { term: "dizzy", weight: 1.4 },
        { term: "pain", weight: 1.4 },
        { term: "cough", weight: 1.2 },
        { term: "fever", weight: 1.3 },
        { term: "chest pain", weight: 2.3 },
        { term: "chest", weight: 1.3 },
        { term: "shortness of breath", weight: 2.4 },
        { term: "breathing", weight: 1.4 },
        { term: "breath", weight: 1.4 },
        { term: "nausea", weight: 1.3 },
        { term: "vomit", weight: 1.4 },
        { term: "diarrhea", weight: 1.4 },
        { term: "numb", weight: 2.0 },
        { term: "weak", weight: 1.4 },
        { term: "fall", weight: 1.7 }
      ],
      emergency: [
        { term: "救命", weight: 3.6 },
        { term: "幫下我", weight: 3.2 },
        { term: "叫救護車", weight: 3.6 },
        { term: "叫白車", weight: 3.5 },
        { term: "急救", weight: 3.2 },
        { term: "緊急", weight: 3.1 },
        { term: "emergency", weight: 3.2 },
        { term: "sos", weight: 3.0 },
        { term: "暈倒", weight: 3.1 },
        { term: "昏迷", weight: 3.4 },
        { term: "抽搐", weight: 3.5 },
        { term: "癲癇", weight: 3.5 },
        { term: "中風", weight: 3.6 },
        { term: "流血", weight: 3.2 },
        { term: "大出血", weight: 3.8 },
        { term: "faint", weight: 3.0 },
        { term: "bleeding", weight: 3.1 },
        { term: "unconscious", weight: 3.4 },
        { term: "seizure", weight: 3.5 },
        { term: "stroke", weight: 3.6 },
        { term: "heart attack", weight: 3.8 },
        { term: "help now", weight: 3.3 },
        { term: "call ambulance", weight: 3.6 },
        { term: "cannot breathe", weight: 3.5 },
        { term: "not breathing", weight: 3.9 }
      ]
    };

    const scores = {
      medication: 0,
      symptom: 0,
      emergency: 0
    };

    let hasEmergencyTrigger = false;

    Object.entries(weightedLexicon).forEach(([categoryKey, terms]) => {
      terms.forEach((entry) => {
        const occurrences = findTermOccurrences(lower, entry.term);
        if (!occurrences.length) return;
        occurrences.forEach((idx) => {
          const adjustedWeight = isNegatedAt(idx, entry.term, lower) ? entry.weight * 0.35 : entry.weight;
          scores[categoryKey] += adjustedWeight;
          if (categoryKey === "emergency" && adjustedWeight >= 2.8) {
            hasEmergencyTrigger = true;
          }
        });
      });
    });

    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [topCategory, topScore] = sortedScores[0];
    const totalScore = sortedScores.reduce((sum, [, value]) => sum + value, 0);

    let category = topScore >= 1.0 ? topCategory : "general";
    if (hasEmergencyTrigger) category = "emergency";

    let confidence = totalScore > 0 ? Math.min(98, Math.round((topScore / totalScore) * 100)) : 0;
    if (topScore < 1.0) {
      confidence = Math.min(confidence, 55);
    }

    let severity = getTranslation(activeUiLang, "ai.severity.low");
    let nextStep = getTranslation(activeUiLang, "ai.next.default");

    if (category === "emergency" || topScore >= 3.2) {
      severity = getTranslation(activeUiLang, "ai.severity.critical");
      nextStep = getTranslation(activeUiLang, "ai.next.critical");
    } else if (category === "symptom" && topScore >= 2.2) {
      severity = getTranslation(activeUiLang, "ai.severity.medium");
      nextStep = getTranslation(activeUiLang, "ai.next.symptom");
    } else if (category === "medication" && topScore >= 2.2) {
      severity = getTranslation(activeUiLang, "ai.severity.medium");
      nextStep = getTranslation(activeUiLang, "ai.next.medication");
    }

    let response = getTranslation(activeUiLang, "ai.response.logged");

    if (category === "emergency") {
      response = getTranslation(activeUiLang, "ai.response.emergency");
      triggerSOS(text);
    } else if (category === "medication") {
      response = getTranslation(activeUiLang, "ai.response.medication");
    } else if (category === "symptom") {
      response = getTranslation(activeUiLang, "ai.response.symptom");
    }

    if (aiResponse) {
      aiResponse.textContent = response;
      aiResponse.dataset.category = category;
    }
    if (mockInsight) {
      mockInsight.textContent = response;
    }

    if (aiSignalCategory) {
      aiSignalCategory.textContent = getTranslation(activeUiLang, `ai.category.${category}`);
    }
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
    if (!sosBtn) return;
    sosBtn.textContent = getTranslation(activeUiLang, "sos.sending");
    setTimeout(() => {
      sosBtn.textContent = getTranslation(activeUiLang, "sos.sent");
      setTimeout(() => sosBtn.textContent = getTranslation(activeUiLang, "sos.button"), 3000);
    }, 1500);
  }
  if (sosBtn) {
    sosBtn.addEventListener("click", () => triggerSOS("Manual SOS"));
  }

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

  function exportMemberNotesCsv() {
    const headers = ["timestamp", "type", "text"];
    const rows = memberNotes.map((item) => {
      const isoTime = new Date(item.timestamp).toISOString();
      const escapedType = String(item.type || "").replace(/"/g, '""');
      const escapedText = String(item.text || "").replace(/"/g, '""');
      return [isoTime, `"${escapedType}"`, `"${escapedText}"`].join(",");
    });

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `carevoice-member-notes-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function copySessionBriefToClipboard() {
    const text = sessionBriefText ? String(sessionBriefText.textContent || "").trim() : "";
    if (!text) return;

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(text);
        window.alert("Session brief copied.");
        return;
      }
    } catch (err) {
      console.warn("Clipboard copy failed:", err);
    }

    window.prompt("Copy session brief:", text);
  }

  function clearMemberNotes() {
    const confirmed = window.confirm("Clear all member notes on this device?");
    if (!confirmed) return;
    memberNotes.length = 0;
    localStorage.removeItem(memberNotesKey);
    refreshMemberTools();
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
