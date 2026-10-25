/* Shared site content and layout. Loaded at the top of <body> on every page.
   EDIT: your details and projects here once; every page picks them up.
   Thai text: each project has a "th" block, and page text uses data-th="..." in the HTML. */
const SITE = {
  name: 'Purinat Lexuthai',
  initials: 'PL',
  email: 'tung.true2518@gmail.com',
  linkedin: '', // EDIT: add your LinkedIn profile link here to show it in the footer
  github: 'https://github.com/tungtrue2518-del',

  // Menu order (English, Thai). It is also the order pages slide in (left = forward).
  pages: [
    ['index.html', 'Home', 'หน้าแรก'], ['about.html', 'About', 'เกี่ยวกับ'], ['experience.html', 'Experience', 'ประสบการณ์'],
    ['projects.html', 'Projects', 'ผลงาน'], ['gallery.html', 'Gallery', 'แกลเลอรี'], ['scripts.html', 'Scripts', 'สคริปต์'],
    ['contact.html', 'Contact', 'ติดต่อ'], ['resume.html', 'Resume', 'เรซูเม่'],
  ],

  // EDIT: sample projects, replace with your real ones. Each opens at project.html#<id>.
  // featured: true shows it on the home page. icon: cloud | code | network | shield | phone | chart
  projects: [
    {
      id: 'm365-migration', category: 'cloud', icon: 'cloud', featured: true,
      title: 'Microsoft 365 Migration',
      summary: 'Planned and executed a staged mailbox and file migration for 300 users across 3 offices, with training sessions and a rollback plan.',
      tags: ['Exchange Online', 'SharePoint', 'Entra ID'],
      role: 'Project lead', time: '4 months · 2024', team: '3 engineers',
      stack: 'Exchange Online, SharePoint, Entra ID, PowerShell',
      overview: 'The company ran an ageing on-premises Exchange server and shared drives that only worked over VPN. The goal was to move every mailbox and team folder to Microsoft 365 without disrupting daily work.',
      challenge: 'Three offices, 300 users, 2 TB of mail and no maintenance window longer than a weekend. Several departments relied on shared mailboxes and old public folders that nobody fully understood.',
      steps: [
        'Audited every mailbox, shared folder and permission, and mapped them to new Teams and SharePoint sites.',
        'Ran a pilot with 15 users to test the migration tooling and collect feedback.',
        'Migrated in four weekend waves, each with a tested rollback plan.',
        'Held short training sessions and published a one-page "what changed" guide.',
      ],
      results: [['300+', 'users migrated'], ['0', 'mailboxes lost'], ['-60%', 'VPN support tickets']],
      lessons: 'A pilot group finds the problems a plan never will. Clear, early communication mattered as much as the technical work.',
      th: {
        title: 'ย้ายระบบไป Microsoft 365',
        summary: 'วางแผนและย้ายอีเมลและไฟล์ของผู้ใช้ 300 คนใน 3 สำนักงานเป็นระยะ พร้อมจัดอบรมและเตรียมแผนย้อนกลับ',
        role: 'หัวหน้าโครงการ', time: '4 เดือน · 2567', team: 'วิศวกร 3 คน',
        overview: 'บริษัทใช้ Exchange Server รุ่นเก่าในองค์กร และไดรฟ์แชร์ที่ใช้ได้เฉพาะผ่าน VPN เป้าหมายคือย้ายกล่องอีเมลและโฟลเดอร์ทีมทั้งหมดไป Microsoft 365 โดยไม่กระทบงานประจำวัน',
        challenge: 'สามสำนักงาน ผู้ใช้ 300 คน อีเมล 2 TB และหยุดระบบได้ไม่เกินหนึ่งวันหยุดสุดสัปดาห์ หลายแผนกยังพึ่งกล่องอีเมลร่วมและ Public Folder เก่าที่ไม่มีใครเข้าใจครบ',
        steps: [
          'ตรวจสอบกล่องอีเมล โฟลเดอร์แชร์ และสิทธิ์ทั้งหมด แล้วจับคู่กับ Teams และ SharePoint ใหม่',
          'ทดลองนำร่องกับผู้ใช้ 15 คนเพื่อทดสอบเครื่องมือย้ายระบบและเก็บความคิดเห็น',
          'ย้ายระบบเป็น 4 รอบในวันหยุดสุดสัปดาห์ แต่ละรอบมีแผนย้อนกลับที่ทดสอบแล้ว',
          'จัดอบรมสั้น ๆ และเผยแพร่คู่มือหนึ่งหน้า "อะไรเปลี่ยนไปบ้าง"',
        ],
        results: [['300+', 'ผู้ใช้ที่ย้ายแล้ว'], ['0', 'กล่องอีเมลที่สูญหาย'], ['-60%', 'คำขอช่วยเหลือเรื่อง VPN']],
        lessons: 'กลุ่มนำร่องช่วยพบปัญหาที่แผนงานมองไม่เห็น การสื่อสารที่ชัดเจนตั้งแต่ต้นสำคัญไม่แพ้งานด้านเทคนิค',
      },
    },
    {
      id: 'user-lifecycle-toolkit', category: 'automation', icon: 'code', featured: true,
      title: 'User Lifecycle Toolkit',
      summary: 'PowerShell module that creates accounts, assigns licenses, groups and devices from a single HR form, and reverses it all when someone leaves.',
      tags: ['PowerShell', 'Graph API', 'Git'],
      role: 'Author and maintainer', time: '2 months · 2023', team: 'Solo, reviewed by IT team',
      stack: 'PowerShell, Microsoft Graph, Entra ID, Git',
      overview: 'Onboarding a new employee took around 45 minutes of clicking across five admin portals, and offboarding was often incomplete.',
      challenge: 'Every department needed different groups, licenses and shared drives. Mistakes meant new hires waited days for access, and leavers kept access they should have lost.',
      steps: [
        'Mapped each department to a role template stored in a simple JSON file.',
        'Wrote a PowerShell module that reads the HR form and calls Microsoft Graph to create the account, licenses and group memberships.',
        'Added an offboarding command that disables sign-in, converts the mailbox and removes access in one step.',
        'Logged every action so changes can be audited and rolled back.',
      ],
      results: [['45 → 5', 'minutes per new hire'], ['~10 h', 'saved each week'], ['100%', 'leavers fully offboarded']],
      lessons: 'Templates beat custom logic. Keeping the role definitions in a readable file let HR suggest changes without touching code.',
      th: {
        title: 'ชุดเครื่องมือจัดการบัญชีผู้ใช้',
        summary: 'โมดูล PowerShell ที่สร้างบัญชี กำหนดไลเซนส์ กลุ่ม และอุปกรณ์จากแบบฟอร์ม HR เพียงฉบับเดียว และยกเลิกทั้งหมดเมื่อพนักงานลาออก',
        role: 'ผู้พัฒนาและดูแล', time: '2 เดือน · 2566', team: 'ทำคนเดียว ทีมไอทีช่วยตรวจทาน',
        overview: 'การรับพนักงานใหม่หนึ่งคนใช้เวลาประมาณ 45 นาทีในการตั้งค่าผ่านหน้าผู้ดูแลระบบ 5 แห่ง และการปิดบัญชีพนักงานที่ลาออกมักทำไม่ครบ',
        challenge: 'แต่ละแผนกต้องการกลุ่ม ไลเซนส์ และไดรฟ์แชร์ต่างกัน ความผิดพลาดทำให้พนักงานใหม่รอสิทธิ์หลายวัน และพนักงานที่ลาออกยังเข้าถึงระบบได้',
        steps: [
          'กำหนดเทมเพลตบทบาทของแต่ละแผนกไว้ในไฟล์ JSON ที่อ่านง่าย',
          'เขียนโมดูล PowerShell ที่อ่านแบบฟอร์ม HR แล้วเรียก Microsoft Graph เพื่อสร้างบัญชี ไลเซนส์ และกลุ่ม',
          'เพิ่มคำสั่งสำหรับพนักงานลาออก ที่ปิดการเข้าสู่ระบบ แปลงกล่องอีเมล และถอนสิทธิ์ในขั้นตอนเดียว',
          'บันทึกทุกการทำงานเพื่อให้ตรวจสอบและย้อนกลับได้',
        ],
        results: [['45 → 5', 'นาทีต่อพนักงานใหม่'], ['~10 ชม.', 'ที่ประหยัดได้ต่อสัปดาห์'], ['100%', 'ปิดบัญชีผู้ลาออกครบถ้วน']],
        lessons: 'เทมเพลตดีกว่าการเขียนเงื่อนไขเฉพาะกรณี การเก็บบทบาทไว้ในไฟล์ที่อ่านง่ายทำให้ HR เสนอการเปลี่ยนแปลงได้โดยไม่ต้องแก้โค้ด',
      },
    },
    {
      id: 'network-redesign', category: 'infra', icon: 'network', featured: true,
      title: 'Office Network Redesign',
      summary: 'Segmented a flat network into VLANs for staff, guests, IoT and servers, and added a site-to-site VPN and monitoring dashboards.',
      tags: ['VLAN', 'Firewall', 'VPN'],
      role: 'Network engineer', time: '6 weeks · 2022', team: '2 engineers',
      stack: 'VLANs, Firewall rules, Site-to-site VPN, SNMP monitoring',
      overview: 'Every device, from laptops to printers to guest phones, shared one flat network. One infected device could reach everything.',
      challenge: 'The redesign had to happen with no downtime during office hours, using mostly the existing switches.',
      steps: [
        'Inventoried every device and grouped them into staff, guest, IoT and server zones.',
        'Built VLANs and firewall rules that allow only the traffic each zone needs.',
        'Connected the second office with a site-to-site VPN.',
        'Added monitoring dashboards and alerts for link health and bandwidth.',
      ],
      results: [['4', 'isolated network zones'], ['0', 'hours of office downtime'], ['2', 'sites connected']],
      lessons: 'Good documentation of the old network saved more time than any tool. Label everything before you change anything.',
      th: {
        title: 'ออกแบบเครือข่ายสำนักงานใหม่',
        summary: 'แบ่งเครือข่ายเดียวออกเป็น VLAN สำหรับพนักงาน แขก อุปกรณ์ IoT และเซิร์ฟเวอร์ พร้อมเพิ่ม Site-to-site VPN และหน้าจอเฝ้าระวัง',
        role: 'วิศวกรเครือข่าย', time: '6 สัปดาห์ · 2565', team: 'วิศวกร 2 คน',
        overview: 'อุปกรณ์ทุกเครื่อง ตั้งแต่โน้ตบุ๊ก เครื่องพิมพ์ ไปจนถึงโทรศัพท์ของแขก ใช้เครือข่ายเดียวกันทั้งหมด อุปกรณ์ที่ติดมัลแวร์เพียงเครื่องเดียวเข้าถึงได้ทุกอย่าง',
        challenge: 'ต้องปรับปรุงโดยไม่ให้ระบบหยุดในเวลาทำการ และใช้สวิตช์เดิมเป็นส่วนใหญ่',
        steps: [
          'สำรวจอุปกรณ์ทั้งหมดและจัดกลุ่มเป็นโซนพนักงาน แขก IoT และเซิร์ฟเวอร์',
          'สร้าง VLAN และกฎไฟร์วอลล์ที่อนุญาตเฉพาะการรับส่งข้อมูลที่แต่ละโซนต้องใช้',
          'เชื่อมสำนักงานแห่งที่สองด้วย Site-to-site VPN',
          'เพิ่มหน้าจอเฝ้าระวังและการแจ้งเตือนสถานะลิงก์และแบนด์วิดท์',
        ],
        results: [['4', 'โซนเครือข่ายที่แยกกัน'], ['0', 'ชั่วโมงที่ระบบหยุดในเวลาทำการ'], ['2', 'สาขาที่เชื่อมต่อกัน']],
        lessons: 'เอกสารที่ดีของเครือข่ายเดิมช่วยประหยัดเวลามากกว่าเครื่องมือใด ๆ ติดป้ายทุกอย่างก่อนเปลี่ยนแปลง',
      },
    },
    {
      id: 'backup-dr', category: 'infra', icon: 'shield',
      title: 'Backup & DR Overhaul',
      summary: 'Replaced ad-hoc backups with an automated 3-2-1 strategy, tested restores every quarter, and cut recovery time from days to hours.',
      tags: ['Veeam', 'Azure Blob', 'Runbooks'],
      role: 'Lead administrator', time: '3 months · 2022', team: '2 engineers',
      stack: 'Veeam, Azure Blob Storage, Immutable backups, Runbooks',
      overview: 'Backups ran on a USB drive that someone swapped "most weeks". Nobody had ever tested a full restore.',
      challenge: 'Protect 40 servers against hardware failure and ransomware on a small budget, and prove that restores actually work.',
      steps: [
        'Defined recovery targets with each department: how much data they can lose and how fast they need it back.',
        'Set up local backups plus immutable off-site copies in Azure (the 3-2-1 rule).',
        'Wrote step-by-step disaster recovery runbooks.',
        'Scheduled quarterly restore tests and recorded the results.',
      ],
      results: [['3 days → 4 h', 'full recovery time'], ['40', 'servers protected'], ['4×', 'restore tests per year']],
      lessons: 'A backup you have not restored is only a hope. Regular tests turned DR from a document into a habit.',
      th: {
        title: 'ปรับปรุงระบบสำรองข้อมูลและกู้คืนระบบ',
        summary: 'เปลี่ยนการสำรองข้อมูลแบบไม่เป็นระบบเป็นกลยุทธ์ 3-2-1 อัตโนมัติ ทดสอบกู้คืนทุกไตรมาส และลดเวลากู้คืนจากหลายวันเหลือไม่กี่ชั่วโมง',
        role: 'ผู้ดูแลระบบหลัก', time: '3 เดือน · 2565', team: 'วิศวกร 2 คน',
        overview: 'การสำรองข้อมูลทำลงไดรฟ์ USB ที่มีคนสลับ "เกือบทุกสัปดาห์" และไม่เคยมีใครทดสอบกู้คืนระบบทั้งหมด',
        challenge: 'ปกป้องเซิร์ฟเวอร์ 40 เครื่องจากฮาร์ดแวร์เสียและแรนซัมแวร์ด้วยงบประมาณจำกัด และพิสูจน์ให้ได้ว่ากู้คืนได้จริง',
        steps: [
          'กำหนดเป้าหมายการกู้คืนร่วมกับแต่ละแผนก: ยอมเสียข้อมูลได้เท่าไร และต้องกู้คืนให้เสร็จภายในเท่าไร',
          'ตั้งค่าการสำรองข้อมูลในองค์กร พร้อมสำเนานอกสถานที่แบบแก้ไขไม่ได้บน Azure (หลัก 3-2-1)',
          'เขียนคู่มือกู้คืนระบบแบบทีละขั้นตอน',
          'กำหนดการทดสอบกู้คืนทุกไตรมาสและบันทึกผล',
        ],
        results: [['3 วัน → 4 ชม.', 'เวลากู้คืนทั้งระบบ'], ['40', 'เซิร์ฟเวอร์ที่ได้รับการป้องกัน'], ['4×', 'การทดสอบกู้คืนต่อปี']],
        lessons: 'ข้อมูลสำรองที่ไม่เคยทดสอบกู้คืนเป็นเพียงความหวัง การทดสอบสม่ำเสมอทำให้แผนกู้คืนกลายเป็นนิสัย ไม่ใช่แค่เอกสาร',
      },
    },
    {
      id: 'zero-touch-rollout', category: 'cloud', icon: 'phone',
      title: 'Zero-Touch Device Rollout',
      summary: 'Autopilot and Intune deployment so new laptops ship straight to employees and set themselves up on first sign-in.',
      tags: ['Intune', 'Autopilot', 'Compliance'],
      role: 'Endpoint lead', time: '3 months · 2024', team: '2 engineers',
      stack: 'Windows Autopilot, Intune, Compliance policies, Defender',
      overview: 'Each new laptop was imaged by hand, which took about three hours and needed someone in the office.',
      challenge: 'Remote and hybrid staff needed working, secure laptops on day one, without IT touching the device.',
      steps: [
        'Registered devices with the supplier so they enrol in Autopilot automatically.',
        'Built Intune profiles for apps, Wi-Fi, security baselines and BitLocker.',
        'Added compliance policies so only healthy devices can reach company data.',
        'Piloted with one team, then rolled out company-wide.',
      ],
      results: [['3 h → 25 min', 'setup per laptop'], ['100%', 'devices encrypted'], ['0', 'office visits needed']],
      lessons: 'Start with a small, strict baseline and add exceptions only when someone needs them.',
      th: {
        title: 'แจกจ่ายเครื่องแบบไม่ต้องตั้งค่าเอง',
        summary: 'ใช้ Autopilot และ Intune ให้โน้ตบุ๊กใหม่ส่งตรงถึงพนักงานและตั้งค่าตัวเองเมื่อเข้าสู่ระบบครั้งแรก',
        role: 'หัวหน้าด้านอุปกรณ์ปลายทาง', time: '3 เดือน · 2567', team: 'วิศวกร 2 คน',
        overview: 'โน้ตบุ๊กใหม่แต่ละเครื่องต้องติดตั้งระบบด้วยมือ ใช้เวลาประมาณสามชั่วโมงและต้องมีคนอยู่ที่สำนักงาน',
        challenge: 'พนักงานที่ทำงานนอกสถานที่และแบบไฮบริดต้องได้โน้ตบุ๊กที่พร้อมใช้และปลอดภัยตั้งแต่วันแรก โดยไอทีไม่ต้องจับเครื่อง',
        steps: [
          'ลงทะเบียนอุปกรณ์กับผู้จำหน่ายเพื่อให้เข้าสู่ Autopilot โดยอัตโนมัติ',
          'สร้างโปรไฟล์ Intune สำหรับแอป Wi-Fi มาตรฐานความปลอดภัย และ BitLocker',
          'เพิ่มนโยบายการปฏิบัติตามข้อกำหนด เพื่อให้เฉพาะอุปกรณ์ที่ปลอดภัยเข้าถึงข้อมูลบริษัทได้',
          'นำร่องกับหนึ่งทีม แล้วขยายทั้งบริษัท',
        ],
        results: [['3 ชม. → 25 นาที', 'เวลาตั้งค่าต่อเครื่อง'], ['100%', 'อุปกรณ์ที่เข้ารหัสแล้ว'], ['0', 'ครั้งที่ต้องเข้าสำนักงาน']],
        lessons: 'เริ่มจากมาตรฐานขั้นต่ำที่เข้มงวด แล้วเพิ่มข้อยกเว้นเฉพาะเมื่อมีผู้ต้องการจริง',
      },
    },
    {
      id: 'monitoring-stack', category: 'automation', icon: 'chart',
      title: 'Monitoring & Alerting Stack',
      summary: 'Python scripts and dashboards that watch disks, certificates, backups and licenses, and post alerts to Teams before users notice.',
      tags: ['Python', 'Grafana', 'Teams webhooks'],
      role: 'Author', time: 'Ongoing · since 2023', team: 'Solo',
      stack: 'Python, Grafana, Prometheus, Teams webhooks',
      overview: 'Problems were found when users called the help desk: a full disk, an expired certificate, a failed backup.',
      challenge: 'Catch the common failures early without paying for a large monitoring platform.',
      steps: [
        'Listed the ten incidents that caused the most tickets last year.',
        'Wrote small Python checks for each one: disk space, certificate expiry, backup status, license counts.',
        'Sent results to Grafana dashboards and posted alerts to a Teams channel.',
        'Tuned thresholds to avoid alert fatigue.',
      ],
      results: [['-40%', 'incident tickets'], ['10', 'automated checks'], ['0', 'expired certificates since']],
      lessons: 'Alert on what needs action, not on everything. A quiet channel gets read.',
      th: {
        title: 'ระบบเฝ้าระวังและแจ้งเตือน',
        summary: 'สคริปต์ Python และแดชบอร์ดที่เฝ้าดูดิสก์ ใบรับรอง การสำรองข้อมูล และไลเซนส์ แล้วแจ้งเตือนใน Teams ก่อนผู้ใช้จะพบปัญหา',
        role: 'ผู้พัฒนา', time: 'ต่อเนื่อง · ตั้งแต่ 2566', team: 'ทำคนเดียว',
        overview: 'ปัญหามักถูกพบเมื่อผู้ใช้โทรหาฝ่ายช่วยเหลือ เช่น ดิสก์เต็ม ใบรับรองหมดอายุ หรือการสำรองข้อมูลล้มเหลว',
        challenge: 'ตรวจพบปัญหาที่เกิดบ่อยได้เร็วขึ้น โดยไม่ต้องจ่ายค่าแพลตฟอร์มเฝ้าระวังขนาดใหญ่',
        steps: [
          'รวบรวมเหตุการณ์ 10 อันดับที่ทำให้เกิดคำขอช่วยเหลือมากที่สุดในปีที่ผ่านมา',
          'เขียนการตรวจสอบด้วย Python สำหรับแต่ละเรื่อง: พื้นที่ดิสก์ วันหมดอายุใบรับรอง สถานะการสำรองข้อมูล และจำนวนไลเซนส์',
          'ส่งผลไปยังแดชบอร์ด Grafana และแจ้งเตือนในช่อง Teams',
          'ปรับเกณฑ์การแจ้งเตือนเพื่อไม่ให้แจ้งเตือนถี่จนคนไม่สนใจ',
        ],
        results: [['-40%', 'คำขอช่วยเหลือจากเหตุขัดข้อง'], ['10', 'การตรวจสอบอัตโนมัติ'], ['0', 'ใบรับรองหมดอายุนับจากนั้น']],
        lessons: 'แจ้งเตือนเฉพาะเรื่องที่ต้องลงมือแก้ ไม่ใช่ทุกเรื่อง ช่องแจ้งเตือนที่เงียบคือช่องที่คนอ่าน',
      },
    },
  ],
};

/* ---------- Language: SITE.t('English', 'ไทย') picks the text for the current language ---------- */
SITE.lang = document.documentElement.lang === 'th' ? 'th' : 'en';
SITE.t = (en, th) => (SITE.lang === 'th' && th != null ? th : en);
// A project's text in the current language (falls back to English when the Thai is missing)
SITE.tx = (p, key) => (SITE.lang === 'th' && p.th?.[key] != null ? p.th[key] : p[key]);
SITE.pageName = ([, en, th]) => SITE.t(en, th);
// Swap page text marked with data-th="..." (and data-th-placeholder / data-th-label for attributes)
SITE.translate = () => {
  if (SITE.lang !== 'th') return;
  document.querySelectorAll('[data-th]').forEach(el => {
    if (el.tagName === 'TITLE' || el.tagName === 'META') el[el.tagName === 'META' ? 'content' : 'textContent'] = el.dataset.th;
    else el.innerHTML = el.dataset.th;
  });
  document.querySelectorAll('[data-th-placeholder]').forEach(el => { el.placeholder = el.dataset.thPlaceholder; });
  document.querySelectorAll('[data-th-label]').forEach(el => el.setAttribute('aria-label', el.dataset.thLabel));
};

(() => {
  const { t, tx } = SITE;
  const CATEGORY = { cloud: t('Cloud', 'คลาวด์'), automation: t('Automation', 'ระบบอัตโนมัติ'), infra: t('Infrastructure', 'โครงสร้างพื้นฐาน') };
  const ICON = {
    cloud: '<path d="M7 18a4 4 0 0 1-.7-7.9A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z"/>',
    code: '<path d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"/>',
    network: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v5M12 12l-6 5M12 12l6 5"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    phone: '<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M11 18h2"/>',
    chart: '<path d="M4 19V5M4 19h16M8 15l3-4 3 2 5-6"/>',
    arrow: '<path d="M5 12h14m-6-6l6 6-6 6"/>',
    back: '<path d="M19 12H5m6 6l-6-6 6-6"/>',
    github: '<path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5a3 3 0 0 0-.9-2.3c3-.3 6.1-1.5 6.1-6.6A5.2 5.2 0 0 0 18.8 5 4.8 4.8 0 0 0 18.7 1.5S17.6 1.2 15 3a12.4 12.4 0 0 0-6 0C6.4 1.2 5.3 1.5 5.3 1.5A4.8 4.8 0 0 0 5.2 5a5.2 5.2 0 0 0-1.4 3.6c0 5.1 3.1 6.3 6.1 6.6a3 3 0 0 0-.9 2.3V21"/>',
    download: '<path d="M12 3v12m0 0l-5-5m5 5l5-5M5 21h14"/>',
  };
  const svg = (name, attrs = ' aria-hidden="true"') => `<svg viewBox="0 0 24 24"${attrs}>${ICON[name]}</svg>`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const here = location.pathname.split('/').pop() || 'index.html';
  const MOCK = '<div class="mock"><div class="mock__bar"><i></i><i></i><i></i></div><div class="mock__body"><div class="mock__side"><span></span><span></span><span></span><span></span></div><div class="mock__main"><span class="mock__line"></span><span class="mock__line mock__line--s"></span><div class="mock__chart"><b></b><b></b><b></b><b></b><b></b><b></b><b></b></div></div></div></div>';
  // Insert HTML where the calling <script> tag sits, so content is there before the page first paints
  const put = html => document.currentScript.insertAdjacentHTML('beforebegin', html);
  const thumbNo = p => SITE.projects.indexOf(p) % 6 + 1;

  /* ---------- Header (runs immediately: site.js sits at the top of <body>) ---------- */
  const active = here.startsWith('project') ? 'projects.html' : here;
  const links = SITE.pages.filter(([h]) => h !== 'index.html' && h !== 'resume.html')
    .map(pg => `<a href="${pg[0]}"${pg[0] === active ? ' class="is-active" aria-current="page"' : ''}>${SITE.pageName(pg)}</a>`).join('');
  put(`
  <div class="grain" aria-hidden="true"></div>
  <div class="spotlight" aria-hidden="true"></div>
  <a class="skip-link" href="#main">${t('Skip to content', 'ข้ามไปยังเนื้อหา')}</a>
  <header class="nav" id="top">
    <div class="container nav__inner">
      <a href="index.html" class="brand" aria-label="${t('Home', 'หน้าแรก')}"><span class="brand__mark">${SITE.initials}</span><span class="brand__name">${esc(SITE.name)}</span></a>
      <nav class="nav__links" id="nav-links" aria-label="${t('Primary', 'เมนูหลัก')}">${links}</nav>
      <div class="nav__actions">
        <button class="kbd-btn" id="cmdk-open" type="button" aria-label="${t('Open command menu', 'เปิดเมนูค้นหา')}" title="${t('Command menu', 'เมนูค้นหา')}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><span>${t('Search', 'ค้นหา')}</span><kbd>⌘K</kbd>
        </button>
        <button class="lang-btn" id="lang-toggle" type="button" lang="${t('th', 'en')}" aria-label="${t('เปลี่ยนเป็นภาษาไทย', 'Switch to English')}" title="${t('ภาษาไทย', 'English')}">
          <span${SITE.lang === 'en' ? ' class="is-on"' : ''} lang="en">EN</span><span${SITE.lang === 'th' ? ' class="is-on"' : ''} lang="th">TH</span>
        </button>
        <button class="icon-btn" id="theme-toggle" aria-label="${t('Toggle color theme', 'สลับโหมดสว่าง/มืด')}" title="${t('Toggle theme', 'สลับโหมดสี')}">
          <svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          <svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
        </button>
        <a class="btn btn--primary btn--sm nav__cta" href="resume.html"${here === 'resume.html' ? ' aria-current="page"' : ''}>${svg('download')} ${t('Resume', 'เรซูเม่')}</a>
        <button class="icon-btn nav__burger" id="nav-burger" aria-label="${t('Open menu', 'เปิดเมนู')}" aria-expanded="false" aria-controls="nav-links">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </div>
    <div class="scroll-progress" aria-hidden="true"><span id="scroll-progress"></span></div>
  </header>`);

  /* ---------- Footer, back-to-top, command menu, toast: <script>SITE.footer()</script> ---------- */
  SITE.footer = () => { SITE.translate(); put(`
  <footer class="footer">
    <div class="container">
      <div class="footer__top-row">
        <a href="contact.html" class="footer__cta">${t('Contact', 'ติดต่อ')} <span aria-hidden="true">↗</span></a>
        <nav class="footer__links" aria-label="${t('Footer', 'ส่วนท้าย')}">
          ${SITE.pages.filter(([h]) => h !== 'index.html').map(pg => `<a href="${pg[0]}">${SITE.pageName(pg)}</a>`).join('')}
          ${SITE.linkedin ? `<a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a>` : ''}
          <a href="${SITE.github}" target="_blank" rel="noopener">GitHub</a>
        </nav>
      </div>
      <p class="footer__word" aria-hidden="true">${esc(SITE.name)}</p>
      <div class="footer__inner">
        <p>© <span id="year"></span> ${esc(SITE.name)}. ${t('All rights reserved.', 'สงวนลิขสิทธิ์')}</p>
        <p class="footer__hint">${t('Tip: press <kbd>⌘K</kbd> to jump anywhere · <kbd>T</kbd> toggles theme', 'เคล็ดลับ: กด <kbd>⌘K</kbd> เพื่อค้นหาหน้า · <kbd>T</kbd> สลับโหมดสี')}</p>
      </div>
    </div>
  </footer>
  <a href="#top" class="to-top" id="to-top" aria-label="${t('Back to top', 'กลับขึ้นด้านบน')}">
    <svg class="to-top__ring" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22"/><circle class="to-top__fill" cx="24" cy="24" r="22" id="to-top-fill"/></svg>
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5m-6 6l6-6 6 6"/></svg>
  </a>
  <dialog class="cmdk" id="cmdk" aria-label="${t('Command menu', 'เมนูค้นหา')}">
    <div class="cmdk__search">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
      <input id="cmdk-input" type="text" placeholder="${t('Type a page, project or command…', 'พิมพ์ชื่อหน้า ผลงาน หรือคำสั่ง…')}" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="true" aria-controls="cmdk-list" aria-autocomplete="list">
      <kbd>esc</kbd>
    </div>
    <ul class="cmdk__list" id="cmdk-list" role="listbox"></ul>
    <div class="cmdk__foot"><span><kbd>↑</kbd><kbd>↓</kbd> ${t('navigate', 'เลื่อน')}</span><span><kbd>↵</kbd> ${t('select', 'เลือก')}</span></div>
  </dialog>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>`); };

  /* ---------- Project cards: <script>SITE.cards('featured' | 'all')</script> ---------- */
  SITE.cards = which => put(SITE.projects.filter(p => which === 'all' || p.featured).map(p => `
          <article class="project reveal" data-cat="${p.category}">
            <div class="project__thumb project__thumb--${thumbNo(p)}" aria-hidden="true">${MOCK}${svg(p.icon, '')}</div>
            <div class="project__body">
              <p class="project__cat">${CATEGORY[p.category]}</p>
              <h3><a class="project__title-link" href="project.html#${p.id}">${esc(tx(p, 'title'))}</a></h3>
              <p>${esc(tx(p, 'summary'))}</p>
              <ul class="tags tags--sm">${p.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
              <span class="project__link" aria-hidden="true">${t('Case study', 'รายละเอียดผลงาน')} <span>→</span></span>
            </div>
          </article>`).join(''));

  /* ---------- One case study page for every project: <script>SITE.caseStudy()</script> ---------- */
  const caseHTML = p => {
    const i = SITE.projects.indexOf(p), n = SITE.projects.length;
    const prev = SITE.projects[(i - 1 + n) % n], next = SITE.projects[(i + 1) % n];
    const H = {
      toc: t('On this page', 'ในหน้านี้'), overview: t('Overview', 'ภาพรวม'), challenge: t('The challenge', 'ความท้าทาย'),
      approach: t('What I did', 'สิ่งที่ทำ'), results: t('Results', 'ผลลัพธ์'), lessons: t('Lessons learned', 'บทเรียนที่ได้'),
    };
    return `
    <section class="hero hero--page">
      <div class="hero__bg" aria-hidden="true"></div>
      <div class="container">
        <nav class="crumbs reveal" aria-label="${t('Breadcrumb', 'ตำแหน่งหน้า')}"><a href="index.html">${t('Home', 'หน้าแรก')}</a> <span aria-hidden="true">/</span> <a href="projects.html">${t('Projects', 'ผลงาน')}</a> <span aria-hidden="true">/</span> <span aria-current="page">${esc(tx(p, 'title'))}</span></nav>
        <p class="eyebrow reveal">${CATEGORY[p.category]}</p>
        <h1 class="page-title reveal">${esc(tx(p, 'title'))}</h1>
        <p class="hero__lead reveal">${esc(tx(p, 'summary'))}</p>
        <dl class="case-meta reveal">
          <div><dt>${t('Role', 'บทบาท')}</dt><dd>${esc(tx(p, 'role'))}</dd></div>
          <div><dt>${t('Timeline', 'ระยะเวลา')}</dt><dd>${esc(tx(p, 'time'))}</dd></div>
          <div><dt>${t('Team', 'ทีม')}</dt><dd>${esc(tx(p, 'team'))}</dd></div>
          <div><dt>${t('Stack', 'เทคโนโลยี')}</dt><dd>${esc(p.stack)}</dd></div>
        </dl>
      </div>
    </section>
    <div class="container">
      <div class="case-cover project__thumb project__thumb--${thumbNo(p)} reveal" aria-hidden="true">${MOCK}${svg(p.icon, '')}</div>
    </div>
    <section class="section">
      <div class="container case">
        <nav class="case__toc" aria-label="${H.toc}">
          <p>${H.toc}</p>
          <a href="#overview">${H.overview}</a><a href="#challenge">${H.challenge}</a><a href="#approach">${H.approach}</a><a href="#results">${H.results}</a><a href="#lessons">${H.lessons}</a>
        </nav>
        <article class="case__body">
          <section id="overview" class="reveal"><h2>${H.overview}</h2><p>${esc(tx(p, 'overview'))}</p></section>
          <section id="challenge" class="reveal"><h2>${H.challenge}</h2><p>${esc(tx(p, 'challenge'))}</p></section>
          <section id="approach" class="reveal"><h2>${H.approach}</h2><ol class="steps">${tx(p, 'steps').map(s => `<li>${esc(s)}</li>`).join('')}</ol></section>
          <section id="results" class="reveal"><h2>${H.results}</h2><dl class="case-stats">${tx(p, 'results').map(([v, l]) => `<div class="case-stat"><dt>${esc(l)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></section>
          <section id="lessons" class="reveal"><h2>${H.lessons}</h2><p>${esc(tx(p, 'lessons'))}</p></section>
          <p class="case__actions reveal">
            <a class="btn btn--ghost" href="${SITE.github}" target="_blank" rel="noopener">${svg('github')} ${t('View code', 'ดูโค้ด')}</a>
            <a class="btn btn--primary" href="contact.html">${t('Talk about a similar project', 'ปรึกษาโครงการลักษณะนี้')} ${svg('arrow')}</a>
          </p>
        </article>
      </div>
    </section>
    <section class="section section--alt">
      <div class="container">
        <nav class="case-nav" aria-label="${t('More projects', 'ผลงานอื่น')}">
          <a class="case-nav__link reveal" href="project.html#${prev.id}"><span class="case-nav__dir">${svg('back')} ${t('Previous', 'ก่อนหน้า')}</span><span class="case-nav__title">${esc(tx(prev, 'title'))}</span></a>
          <a class="case-nav__link case-nav__link--next reveal" href="project.html#${next.id}"><span class="case-nav__dir">${t('Next', 'ถัดไป')} ${svg('arrow')}</span><span class="case-nav__title">${esc(tx(next, 'title'))}</span></a>
        </nav>
      </div>
    </section>`;
  };
  SITE.projectFromHash = () => SITE.projects.find(p => p.id === location.hash.slice(1)) || SITE.projects[0];
  SITE.caseStudy = () => {
    const p = SITE.projectFromHash();
    document.title = `${tx(p, 'title')} — ${SITE.name}`;
    put(`<div id="case">${caseHTML(p)}</div>`);
  };
  SITE.caseHTML = caseHTML;
})();
