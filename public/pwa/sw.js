if(!self.define){let s,e={};const i=(i,a)=>(i=new URL(i+".js",a).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(a,c)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let t={};const o=s=>i(s,n),r={module:{uri:n},exports:t,require:o};e[n]=Promise.all(a.map((s=>r[s]||o(s)))).then((s=>(c(...s),t)))}}define(["./workbox-e9849328"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"7dff445ee2e47c03abbb3b57acf193cb"},{url:"/_next/static/8it8JRhQiN3VBZjQ0Hl-3/_buildManifest.js",revision:"5162af1696c765f759f8e6e5c374a44c"},{url:"/_next/static/8it8JRhQiN3VBZjQ0Hl-3/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1006-882fd275f2f511de.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/1086-b0fe4dad7b56ca45.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/1159-b5130f77f513571b.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/1268-913529a3c2a5e7e1.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/1281-6000a215443bfe09.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/14-ce812880d428ff88.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/15be12ea-b3e1828772aa2258.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/1601-b31347511dc54750.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/1927-d652e14beeb2c47c.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/2047-6f3f3b0c02e732dd.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/2323-843516ef82f38d35.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/2471-ef64ee583a8966fd.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/4248-e9561227989f193b.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/4350-dfce17ebb6e592ae.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/4354-a10d0b35a31c1f14.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/442-96f230cfea7094d1.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/4619-ddb1c98aae9c50b2.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/481-98c30d34869a660b.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/494-3b866726456f0870.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/50-8b8dfaa2eedd2976.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/5358-56823fcbdf6b4f23.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/5365-4d242858eb600477.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/5763-98d14c5c85bc93c5.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/6003-138145964cfebf80.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/6278-5aaa3d5458cd3414.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/6396-4d4951b27303c317.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/6645-74720b0e96c9a8b4.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/6788-18e09fe1bc5c1f00.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/7102-29d4d22280b08679.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/7441-60f6014b35c65aa8.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/7761-8ec433d40dd107ba.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/781-6802ebeedae5f69f.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/784-2d5ab28e1d2bca56.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/7871-24b03b0c32a70fcc.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/81-c77b67fc18efb3c7.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/8196-35e07738d78445a0.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/8264-ef28798b314fa9f5.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/8467-c976d109be51be19.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/9009-69e61e612f6fc142.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/9116-2d1568840bb616c6.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/9241-36bc4c74cfa2ba45.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/9319-d4e85f483761ec90.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/9411-5cded76113493e13.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/9570-18163d934ae757e7.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/9981-87c8a3ea3712c382.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(auth)/sign-in/%5B%5B...sign-in%5D%5D/page-6969ee7258ccae6f.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(auth)/sign-up/%5B%5B...sign-up%5D%5D/page-b67827aa5245abb7.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(landing)/layout-7b0cacbf832528d7.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(landing)/page-a2dc0efeb4fac8cf.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(legal)/layout-0553ca57ba811172.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(legal)/privacy-policy/page-f117016001140322.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(legal)/terms-of-service/page-dd9ee574455f4171.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/account-settings/page-51c18d4c7ed2ed08.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/browse/page-8c49f3d691a4e811.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/layout-fccac052e31d4772.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/notifications/page-76e54d135e39f87c.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/analytics/page-09c142a88baa1c92.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/assignments/%5BassignmentId%5D/layout-7d070bd89854b99d.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/assignments/%5BassignmentId%5D/page-e2dae65d7218be1a.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/assignments/page-e9e0ede0078abadb.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/classes/page-1e9671e8d44a54ed.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/course-settings/danger/page-6c9a9e161f5065ac.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/course-settings/page-b4040426b880c3cb.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/enrollments/page-a08b7f87f0d18524.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/layout-be0cbf0a568a4f51.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/memberships/page-8c2f07d70fa93de2.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/page-1903ce2c074394a7.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/page-093d75680f0e55a7.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/layout-1b603387962d5d36.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/analytics/page-fb306a3a0d9ebf36.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/docs/page-b710451042b6744e.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/enrollments/page-cc04464225098e00.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/layout-53f489ccdd798995.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/members/%5BmemberId%5D/courses/page-2e6ba519a52dc2a7.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/members/%5BmemberId%5D/layout-d6c1f0eef32a56aa.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/members/%5BmemberId%5D/page-6b070c2ac3038c52.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/members/%5BmemberId%5D/schedule/page-334dbe8da5ee31c3.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/memberships/page-9d5e181ed39f41e7.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/page-bd1e2d663f4a252a.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/school-settings/danger/page-785d49b879198bd7.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/school-settings/layout-4a92c9e3ca345f03.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/school-settings/page-6b5f6e616f5f37af.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/semesters/page-448b96a6174091c9.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(onboarding)/layout-1f8470528f273b32.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(onboarding)/onboarding/page-fcad2191e358bd84.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/layout-5450a9508d0b0040.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(main)/schools/page-7306e65053e17228.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(product)/changelog/page-105fde8e695b0590.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(product)/contact/page-03ce01344e23d3c2.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/(product)/layout-1f7c71ec9de04460.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/_not-found/page-0c18fc892df26f37.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/error-6e8dc2b847c520a4.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/layout-2f19470dbbda3418.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/app/not-found-a5ee509615855eb0.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/c5a1c67a-4e7100389f1fafa2.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/fec47640-32654e748752c770.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/framework-20afca218c33ed8b.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/main-497c6e11d671f76b.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/main-app-bbbeb46825d082d9.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/pages/_app-0a615c4dd01804cf.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/pages/_error-f4e9c24b10074a99.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-5738ae05974e9d18.js",revision:"8it8JRhQiN3VBZjQ0Hl-3"},{url:"/_next/static/css/8f0272836e5ac2ee.css",revision:"8f0272836e5ac2ee"},{url:"/_next/static/css/aa4f1cb61cf5e18b.css",revision:"aa4f1cb61cf5e18b"},{url:"/_next/static/css/c44ae53a338a23da.css",revision:"c44ae53a338a23da"},{url:"/_next/static/media/0596140cb8d9223a-s.woff2",revision:"ddd5de66d4a7c56eeac6e0b10c5d8521"},{url:"/_next/static/media/1a4dd1d7cd3232ea-s.woff2",revision:"91c6fe4b62b5ebda5ccee3c4aa1eb33d"},{url:"/_next/static/media/341baa6ce7a16e81-s.woff2",revision:"0c7b4bd9156673a090be9999002eaab1"},{url:"/_next/static/media/356abdd51b933898-s.woff2",revision:"4ed5a85b9b460c31a44ba541e277bcc0"},{url:"/_next/static/media/c22ccc5eb58b83e1-s.p.woff2",revision:"8a051a2b61e4a766fff21bb106142860"},{url:"/_next/static/media/d70c23d6fe66d464-s.woff2",revision:"7abbd25026a8e3994d885bd8704b9588"},{url:"/assets/course.svg",revision:"ba2ba42d92a74c3a6318ec8f954a754f"},{url:"/assets/education.svg",revision:"2a803e52c935f2b3f4e5081543b94373"},{url:"/assets/educator.svg",revision:"3d97f1a4b74866bba381fec9adfc9a34"},{url:"/assets/events.svg",revision:"3862f75e6931ba41b6ecf4e3032dbd71"},{url:"/assets/fixing-bugs.svg",revision:"aa12959679cb58b20a9ee6575fa96914"},{url:"/assets/hello.svg",revision:"fa8add3772c203670a83ee594ba2d534"},{url:"/assets/mailbox.svg",revision:"59289dc92136ed2a9f87f40d5ba435da"},{url:"/assets/no-data.svg",revision:"7e623c5b2eea4630d52196307ab0ff5d"},{url:"/assets/not-found.svg",revision:"d7cfefe6c1aa06ead9b2b8aada226dae"},{url:"/assets/online-calendar.svg",revision:"5bf7cec468c2572d0df63d407486249c"},{url:"/assets/posts.svg",revision:"2dbfe9d090e56d7e60a752b0447ee2e2"},{url:"/assets/qr-code.svg",revision:"f37aeadc9fd586fb3998290d973481c4"},{url:"/assets/school.jpg",revision:"eb86f61ea972d98793bc9f9493b1c7a2"},{url:"/assets/selecting-teams.svg",revision:"fe52c0fc2519f88eef52608744615802"},{url:"/assets/under-construction.svg",revision:"ebcea209725c1f963c9696c193b98819"},{url:"/assets/welcome-cats.svg",revision:"5d0e88db48824a2ffa03b144cbe42e44"},{url:"/banner.png",revision:"ab3bb587eeb7b421eaf10928a42e11e3"},{url:"/favicon.ico",revision:"971a00c26fef15e76f331f237caa0daf"},{url:"/landing/course-dark.png",revision:"c37f05449ad2fe9553332f7672da26d4"},{url:"/landing/course-light.png",revision:"8dfac0d96779986c4daac537d02e1527"},{url:"/landing/hero-dark.png",revision:"3062fb32716743ee949924e9ec44f436"},{url:"/landing/hero-light.png",revision:"75cf3d0d0cb4057670054bde3c7b72a3"},{url:"/landing/school-dark.png",revision:"9ca9c64f0035ac8cc15ea1536e2c5f36"},{url:"/landing/school-light.png",revision:"7601e1690f1ce81ce5d389e5282e7ea1"},{url:"/landing/semester-dark.png",revision:"0cd5383f39aa8513a780bc2631bef1c2"},{url:"/landing/semester-light.png",revision:"1503fc843ea032c613d2ce00b395abe9"},{url:"/logo.png",revision:"ac39c848ba996cbef5b2a9b8036d52fd"},{url:"/manifest.json",revision:"e406175262cad6b495afbfeb87b6ddc8"},{url:"/pwa/icons/icon-128x128.png",revision:"088046cda0e9cd4633b7ffce642e9c8d"},{url:"/pwa/icons/icon-144x144.png",revision:"61a15aa77e8b84a8a41d03b2c13ebf26"},{url:"/pwa/icons/icon-152x152.png",revision:"fa4f31a43b24ba074b88cc13a1ce8cd2"},{url:"/pwa/icons/icon-192x192.png",revision:"e29af56518614525af547980b36479df"},{url:"/pwa/icons/icon-36x36.png",revision:"f2677e2df18496cdb5540750cad352ce"},{url:"/pwa/icons/icon-384x384.png",revision:"f52b43f17860fa1dbf2f4d246b7d40b7"},{url:"/pwa/icons/icon-48x48.png",revision:"9f7538dbd43bc9416252140709934666"},{url:"/pwa/icons/icon-512x512.png",revision:"334921606b7dc531136855d256823a9a"},{url:"/pwa/icons/icon-72x72.png",revision:"c689fbb93f35266fd44a216cea96e92b"},{url:"/pwa/icons/icon-96x96.png",revision:"d7e8e52942a6f5030e0ceb90416cfa3f"},{url:"/pwa/sw.js",revision:"1521d2cef6fddc7a484ee4b9582ee051"},{url:"/pwa/sw.js.map",revision:"e199eb21aee4e4aac43ba91fe5e6bd7e"},{url:"/pwa/workbox-8817a5e5.js",revision:"97a2bf90e99ddfbbccb6721a471e9eb7"},{url:"/pwa/workbox-8817a5e5.js.map",revision:"427f7b35a7971ccbf14314ffe469b0e5"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"},{url:"/shapes-background.png",revision:"0e89effd9139b68cd7a08b6b490d592e"},{url:"/sitemap.xml",revision:"86f6d17d685b2695dacc3b8d7bdd9af5"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:i,state:a})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
