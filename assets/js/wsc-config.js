/* ============================================================
   EDIT HERE: All HTML page links, menu items, tools links, logo
   This is the main file for changing navbar/sidebar/menu/tools.
   ============================================================ */

window.WSC_CONFIG = {
  schoolNameBn: "ওয়েস্টার্ন স্কুল অ্যান্ড কলেজ",
  schoolNameEn: "Western School & College",
  logoUrl: "https://res.cloudinary.com/do1dejkkk/image/upload/v1778605133/western_logo_hg9fji_1_vojrqz_1_zjiw5m.png",
  helpline: "+8801820716529",
  driveFolderUrl: "https://drive.google.com/drive/folders/1nSfSwnd5YOZc7ofmrtMt2swhYbdDNykE?usp=sharing",
  appsScriptWebAppUrl: "https://script.google.com/macros/s/AKfycbwRN0Vt7O8tBD1lblgSrMzARk5vWQDvX7uXLBWnFnnMG-RoS-bHeVLp-9zpn5d8uBZ9xA/exec",

  storageKeys: {
    theme: "wsc_theme",
    session: "wsc_session",
    sidebar: "wsc_sidebar"
  },

 /* EDIT SIDEBAR GROUPS HERE */
menuGroups: [
  {
    title: "প্রধান",
    icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779712307/dashboard-svgrepo-com_byb14w.svg",
    items: [
      {
        title: "ড্যাশবোর্ড",
        file: "index.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779712307/dashboard-svgrepo-com_byb14w.svg"
      }
    ]
  },

  {
    title: "অফিস",
    icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779713102/office-svgrepo-com_a3xuzm.svg",
    items: [
      {
        title: "অফিস অডিট",
        file: "office-audit.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779713461/cost-estimate-svgrepo-com_1_ftmwfa.svg"
      },
      {
        title: "ইনভয়েস",
        file: "office-invoice.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779713459/invoice-heguishuipiao-line-svgrepo-com_zzwhqp.svg"
      },
      {
        title: "ভাউচার",
        file: "office-voucher.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779713459/receipt-discount-svgrepo-com_l6w8qt.svg"
      },
      {
        title: "ব্যায় রেকর্ড",
        file: "office-cost.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779713462/earn-money-svgrepo-com_ikk9yt.svg"
      },
      {
        title: "আয় রেকর্ড",
        file: "office-earn.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779713461/cost-round-svgrepo-com_eiaeei.svg"
      },
      {
        title: "ডিউটি সম্মানী",
        file: "office-duty-remuneration.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779713459/money-send-svgrepo-com_yf5x64.svg"
      },
      {
        title: "ডিউটি রোস্টার",
        file: "office-duty-roster.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779713460/cost-estimate-svgrepo-com_2_joldo9.svg"
      },
      {
        title: "রুম ভাড়া",
        file: "office-room-rent.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779713459/rent-sign-svgrepo-com_dhiblu.svg"
      },
      {
        title: "অফিস টেমপ্লেট",
        file: "office-template.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779713102/office-svgrepo-com_a3xuzm.svg"
      }
    ]
  },

  {
    title: "শিক্ষার্থী",
    icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779714087/student-cap-svgrepo-com_xnxswe.svg",
    items: [
      {
        title: "স্টুডেন্ট অ্যাকাউন্ট",
        file: "student-account-create.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779714022/recruitment-fee-svgrepo-com_ymsnqa.svg"
      },
      {
        title: "এডমিট কার্ড",
        file: "student-admit.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779714086/student-card-svgrepo-com_cl1vrf.svg"
      },
      {
        title: "প্রত্যয়ন পত্র",
        file: "student-certificate.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779714020/sheet-text-svgrepo-com_ygj749.svg"
      },
      {
        title: "ছাড়পত্র",
        file: "student-clearance.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779714020/sheet-text-svgrepo-com_ygj749.svg"
      },
      {
        title: "ফি আদায়",
        file: "student-fee.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779714021/money-tick-svgrepo-com_xap3iz.svg"
      },
      {
        title: "মার্কশিট",
        file: "student-marksheet.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779714026/google-sheets-svgrepo-com_th3anv.svg"
      },
      {
        title: "শিক্ষার্থীর রেকর্ড",
        file: "student-record.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779714025/doc-docx-files-svgrepo-com_v10ak8.svg"
      },
      {
        title: "রেজাল্ট",
        file: "student-result.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779714025/doc-on-clipboard-svgrepo-com_g2kxyo.svg"
      },
      {
        title: "এসএমএস",
        file: "student-sms.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779714018/sms-svgrepo-com_1_jdc7df.svg"
      }
    ]
  },

  {
    title: "শিক্ষক",
    icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779714323/teacher-svgrepo-com_g1xgtc.svg",
    items: [
      {
        title: "অ্যাকাউন্ট",
        file: "teacher-account.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1777138381/profile-svgrepo-com_jalrok.svg"
      },
      {
        title: "শিক্ষক রেকর্ড",
        file: "teacher-record.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779714089/cost-estimate-svgrepo-com_1_ygrtpa.svg"
      },
      {
        title: "শিক্ষক বেতন",
        file: "teacher-salary.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779714088/money-send-svgrepo-com_kzecy1.svg"
      }
    ]
  },

  {
    title: "টুলস",
    icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779714465/tool-box-svgrepo-com_ejy6ci.svg",
    items: [
      {
        title: "নোটিশ",
        file: "tools-notice.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779714089/cost-estimate-svgrepo-com_tlkzal.svg"
      },
      {
        title: "প্যাড",
        file: "tools-pad.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779715336/pad-svgrepo-com_znmuet.svg"
      },
      {
        title: "রিমাইন্ডার",
        file: "tools-reminder.html",
        icon: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779715399/calendar-alert-svgrepo-com_lkn2bj.svg"
      }
    ]
  }
],

  /* EDIT NAVBAR TOOLS HERE */
  toolsLinks: [
    { title: "Sheet", url: "https://sheets.google.com", logo: "https://res.cloudinary.com/do1dejkkk/image/upload/v1776594809/sheeet_g5yanj.png" },
    { title: "Drive Folder", url: "https://drive.google.com/drive/folders/1nSfSwnd5YOZc7ofmrtMt2swhYbdDNykE?usp=sharing", logo: "https://res.cloudinary.com/do1dejkkk/image/upload/v1776761499/drive-color-svgrepo-com_zphbuz.svg" },
    { title: "DeepSeek", url: "https://chat.deepseek.com", logo: "https://res.cloudinary.com/do1dejkkk/image/upload/v1776594809/deep_y24ygs.png" },
    { title: "Calendar", url: "https://calendar.google.com", logo: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779712095/calander-interface-icon-svgrepo-com_ffvblj.svg" },
    { title: "Google Task", url: "https://tasks.google.com", logo: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779712094/task-square-svgrepo-com_qdguzl.svg" },
    { title: "Docs", url: "https://docs.google.com", logo: "https://res.cloudinary.com/do1dejkkk/image/upload/v1776761941/data-doc-document-5-svgrepo-com_1_b523al.svg" },
    { title: "Claude", url: "https://claude.ai", logo: "https://res.cloudinary.com/do1dejkkk/image/upload/v1776594809/claude_elehib.jpg" },
    { title: "Gemini", url: "https://gemini.google.com", logo: "https://res.cloudinary.com/do1dejkkk/image/upload/v1776594809/gemeni_hjcuhg.jpg" },
    { title: "WhatsApp", url: "https://web.whatsapp.com", logo: "https://res.cloudinary.com/do1dejkkk/image/upload/v1776762153/whatsapp-symbol-logo-svgrepo-com_ag0pfm.svg" },
    { title: "YouTube", url: "https://youtube.com", logo: "https://res.cloudinary.com/do1dejkkk/image/upload/v1776762152/youtube-color-svgrepo-com_vzjcoy.svg" },
    { title: "I Love PDF", url: "https://www.ilovepdf.com", logo: "https://res.cloudinary.com/do1dejkkk/image/upload/v1779712094/love-svgrepo-com_dq6vaw.svg" }
  ]
};
