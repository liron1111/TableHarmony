if(!self.define){let s,e={};const a=(a,c)=>(a=new URL(a+".js",c).href,e[a]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=a,s.onload=e,document.head.appendChild(s)}else s=a,importScripts(a),e()})).then((()=>{let s=e[a];if(!s)throw new Error(`Module ${a} didn’t register its module`);return s})));self.define=(c,n)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let o={};const t=s=>a(s,i),r={module:{uri:i},exports:o,require:t};e[i]=Promise.all(c.map((s=>r[s]||t(s)))).then((s=>(n(...s),o)))}}define(["./workbox-e9849328"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"20a705278c4da70b9c8d9ff7ce1e5c60"},{url:"/_next/static/Lz5SosmWXwjz0JOh6AOyS/_buildManifest.js",revision:"e41abde0daa1ce218d281a21c1be50ef"},{url:"/_next/static/Lz5SosmWXwjz0JOh6AOyS/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1099-19bffc3bf06a5b98.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/1258-b587af1cb7f1b8a8.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/15be12ea-b85325fed74da282.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/1750-5ea1721291f83693.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/19199821-c25225c1950f7bdd.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/1986-a3eb15f840ac44a0.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/2041-ebe7aaab37109f77.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/212-d336808663cd3292.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/2252-9e0874fe38c4e194.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/2276-9faeac23663bee69.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/2952-a5c3618ef7383905.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/3315-ed3d64f789341c69.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/336-b5cf81dfc0e1cba2.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/3450-4130bd2605879462.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/351-cdf395b8d982bfe3.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/3674-de61aaedffb9208a.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/4372-22c3c00d7cfa4c6c.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/4510-562217662644bdc7.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/4539-15b5e692b9e606ef.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/4553-d1326a7c3837d699.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/4756-95d913ba3b4f3ea8.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/5336-0094b8b4026fe4ac.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/5362-e9c171fd26d5eac3.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/5422-c101a920343f7ae2.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/5437-8b10c171cb8ed9cb.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/5527-0c7868933243aceb.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/574-50adaaf1a7ad1ac8.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/588-7a170d5495b1f662.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/6437-b9db581814dcc1eb.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/6448-5bdbd29107dfc1cd.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/6672-acf445c87bf1b474.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/6784-2012cc76849ed727.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/7087-3abe041b900cde83.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/7129-69b1c0a04394cd0d.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/7174-00cc3aeb821d99f9.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/7223-ffac9a1d81a3a726.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/7479-2ca93229ca22d7e3.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/7806-ee282e5aad817757.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/8381-4b0e04dcb0e15c4c.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/8985-4ad3559ca0ac35a7.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/916-a7ee57563f26f813.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/9167-e1d6c805a5b636a7.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/9367-d8fc874adeeef3e1.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/9672-8592d3a14bd8c1cf.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/9919-aa80d640661e683f.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(auth)/sign-in/%5B%5B...sign-in%5D%5D/page-f8957c89169d8f50.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(auth)/sign-up/%5B%5B...sign-up%5D%5D/page-f6cfab3415b536b5.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(landing)/layout-e5bb4f69c656d4e2.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(landing)/page-4c4342e6a2f9cce1.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(legal)/layout-fc475f56a45b1d10.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(legal)/privacy-policy/page-c6ab065a3e2ee12f.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(legal)/terms-of-service/page-a3c414421e459d01.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/account-settings/page-b7bb3d212a767ea4.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/browse/page-3b32b6e327c4fcc9.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/layout-4a7e16901aae93d0.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/notifications/page-c44ec923cbc1d6a7.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/analytics/page-c7293e947a3345b5.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/assignments/%5BassignmentId%5D/layout-4a80ea675360134a.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/assignments/%5BassignmentId%5D/page-d3fa3fc49d1818f6.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/assignments/page-7ce5f4720c451137.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/classes/page-2e776fdf68366f12.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/course-settings/danger/page-de3377f816b072b2.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/course-settings/page-42226a323dff8a83.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/enrollments/page-b18d41ad77fdeefd.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/layout-28cf819b8921416f.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/memberships/page-6dd08fe183b1fccb.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/%5BcourseId%5D/page-5ee60f9c8236a1aa.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/courses/page-43bd3e4d1dd335f2.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(courses)/layout-a579448cbe9f54a0.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/analytics/page-9b8ea6f8391eabe0.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/enrollments/page-1a60b4c8998bd3d6.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/layout-afb8037ba37aa66e.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/members/%5BmemberId%5D/courses/page-c268b294a163b30c.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/members/%5BmemberId%5D/layout-f76071155dccca52.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/members/%5BmemberId%5D/page-d43b1a4d12ddb06d.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/members/%5BmemberId%5D/schedule/page-fb8992b5faf8218e.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/memberships/page-06c5442ef3e5bb4a.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/page-2706bb1bf8096443.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/school-settings/danger/page-ab972acdc5f580d5.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/school-settings/layout-2bb8f0091984ce15.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/school-settings/page-dd5d67c93380d322.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(main)/semesters/page-75b492ed3a872405.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(onboarding)/layout-f55b8a5273164dfb.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/(onboarding)/onboarding/page-143d97912520b2a1.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/%5BschoolId%5D/layout-2c5817b18ab745c1.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(main)/schools/page-85c231f458f41289.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(product)/changelog/page-2d7232c365fe9859.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(product)/contact/page-49d5d6f39c54b26f.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/(product)/layout-b31ab1a374e3ac50.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/_not-found/page-2aab8ab3d76c4bf1.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/error-2d28e2de3de0da1e.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/layout-fdc046223c20e1d3.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/app/not-found-8f93f471126abefb.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/da47adfa-520f53e97ba85d39.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/framework-20afca218c33ed8b.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/main-11bd150beb529add.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/main-app-bb48d67ebadd495b.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/pages/_app-a48b69c5a288529b.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/pages/_error-dfd2efba5a51ccd9.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-9bdb3a5f146f49c4.js",revision:"Lz5SosmWXwjz0JOh6AOyS"},{url:"/_next/static/css/33cf1fea7b7b6270.css",revision:"33cf1fea7b7b6270"},{url:"/_next/static/css/8f0272836e5ac2ee.css",revision:"8f0272836e5ac2ee"},{url:"/_next/static/css/aa4f1cb61cf5e18b.css",revision:"aa4f1cb61cf5e18b"},{url:"/_next/static/media/0596140cb8d9223a-s.woff2",revision:"ddd5de66d4a7c56eeac6e0b10c5d8521"},{url:"/_next/static/media/1a4dd1d7cd3232ea-s.woff2",revision:"91c6fe4b62b5ebda5ccee3c4aa1eb33d"},{url:"/_next/static/media/341baa6ce7a16e81-s.woff2",revision:"0c7b4bd9156673a090be9999002eaab1"},{url:"/_next/static/media/356abdd51b933898-s.woff2",revision:"4ed5a85b9b460c31a44ba541e277bcc0"},{url:"/_next/static/media/c22ccc5eb58b83e1-s.p.woff2",revision:"8a051a2b61e4a766fff21bb106142860"},{url:"/_next/static/media/d70c23d6fe66d464-s.woff2",revision:"7abbd25026a8e3994d885bd8704b9588"},{url:"/assets/course.svg",revision:"ba2ba42d92a74c3a6318ec8f954a754f"},{url:"/assets/education.svg",revision:"2a803e52c935f2b3f4e5081543b94373"},{url:"/assets/educator.svg",revision:"3d97f1a4b74866bba381fec9adfc9a34"},{url:"/assets/events.svg",revision:"3862f75e6931ba41b6ecf4e3032dbd71"},{url:"/assets/fixing-bugs.svg",revision:"aa12959679cb58b20a9ee6575fa96914"},{url:"/assets/hello.svg",revision:"fa8add3772c203670a83ee594ba2d534"},{url:"/assets/mailbox.svg",revision:"59289dc92136ed2a9f87f40d5ba435da"},{url:"/assets/no-data.svg",revision:"7e623c5b2eea4630d52196307ab0ff5d"},{url:"/assets/not-found.svg",revision:"d7cfefe6c1aa06ead9b2b8aada226dae"},{url:"/assets/online-calendar.svg",revision:"5bf7cec468c2572d0df63d407486249c"},{url:"/assets/posts.svg",revision:"2dbfe9d090e56d7e60a752b0447ee2e2"},{url:"/assets/qr-code.svg",revision:"f37aeadc9fd586fb3998290d973481c4"},{url:"/assets/school.jpg",revision:"eb86f61ea972d98793bc9f9493b1c7a2"},{url:"/assets/selecting-teams.svg",revision:"fe52c0fc2519f88eef52608744615802"},{url:"/assets/under-construction.svg",revision:"ebcea209725c1f963c9696c193b98819"},{url:"/assets/welcome-cats.svg",revision:"5d0e88db48824a2ffa03b144cbe42e44"},{url:"/banner.png",revision:"ab3bb587eeb7b421eaf10928a42e11e3"},{url:"/favicon.ico",revision:"971a00c26fef15e76f331f237caa0daf"},{url:"/landing/course-dark.png",revision:"c37f05449ad2fe9553332f7672da26d4"},{url:"/landing/course-light.png",revision:"8dfac0d96779986c4daac537d02e1527"},{url:"/landing/hero-dark.png",revision:"3062fb32716743ee949924e9ec44f436"},{url:"/landing/hero-light.png",revision:"75cf3d0d0cb4057670054bde3c7b72a3"},{url:"/landing/school-dark.png",revision:"9ca9c64f0035ac8cc15ea1536e2c5f36"},{url:"/landing/school-light.png",revision:"7601e1690f1ce81ce5d389e5282e7ea1"},{url:"/landing/semester-dark.png",revision:"0cd5383f39aa8513a780bc2631bef1c2"},{url:"/landing/semester-light.png",revision:"1503fc843ea032c613d2ce00b395abe9"},{url:"/logo.png",revision:"ac39c848ba996cbef5b2a9b8036d52fd"},{url:"/manifest.json",revision:"e406175262cad6b495afbfeb87b6ddc8"},{url:"/pwa/icons/icon-128x128.png",revision:"088046cda0e9cd4633b7ffce642e9c8d"},{url:"/pwa/icons/icon-144x144.png",revision:"61a15aa77e8b84a8a41d03b2c13ebf26"},{url:"/pwa/icons/icon-152x152.png",revision:"fa4f31a43b24ba074b88cc13a1ce8cd2"},{url:"/pwa/icons/icon-192x192.png",revision:"e29af56518614525af547980b36479df"},{url:"/pwa/icons/icon-36x36.png",revision:"f2677e2df18496cdb5540750cad352ce"},{url:"/pwa/icons/icon-384x384.png",revision:"f52b43f17860fa1dbf2f4d246b7d40b7"},{url:"/pwa/icons/icon-48x48.png",revision:"9f7538dbd43bc9416252140709934666"},{url:"/pwa/icons/icon-512x512.png",revision:"334921606b7dc531136855d256823a9a"},{url:"/pwa/icons/icon-72x72.png",revision:"c689fbb93f35266fd44a216cea96e92b"},{url:"/pwa/icons/icon-96x96.png",revision:"d7e8e52942a6f5030e0ceb90416cfa3f"},{url:"/pwa/sw.js",revision:"1521d2cef6fddc7a484ee4b9582ee051"},{url:"/pwa/sw.js.map",revision:"57ba0fde1a0f4db394c1b8ed6b3c8579"},{url:"/pwa/workbox-8817a5e5.js",revision:"97a2bf90e99ddfbbccb6721a471e9eb7"},{url:"/pwa/workbox-8817a5e5.js.map",revision:"427f7b35a7971ccbf14314ffe469b0e5"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"},{url:"/shapes-background.png",revision:"0e89effd9139b68cd7a08b6b490d592e"},{url:"/sitemap.xml",revision:"86f6d17d685b2695dacc3b8d7bdd9af5"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:a,state:c})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
