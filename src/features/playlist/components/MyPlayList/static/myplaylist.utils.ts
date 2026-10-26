// export const books = [
//     {
//       src: "https://api.builder.io/api/v1/image/assets/TEMP/e6ca1161a30ac426e85df62091ac1be769c0b77b?width=348",
//       zIndex: 1,
//       shadow: "-16px 28px 4px 0 rgba(0, 0, 0, 0.25)"
//     },
//     {
//       src: "https://api.builder.io/api/v1/image/assets/TEMP/04f7da926296d4d1b5c945214b6d233ff7282d20?width=348",
//       zIndex: 2,
//       shadow: "none"
//     },
//     {
//       src: "https://api.builder.io/api/v1/image/assets/TEMP/b6c6d6e91e4dd49bbb53ef1ae9bb14abfe775aad?width=348",
//       zIndex: 3,
//       shadow: "none"
//     },
//     {
//       src: "https://api.builder.io/api/v1/image/assets/TEMP/27af99149834dc21aa940777fb6c0b258913eaa4?width=348",
//       zIndex: 4,
//       shadow: "none"
//     },
//     {
//       src: "https://api.builder.io/api/v1/image/assets/TEMP/7c1882fb57acf9f46da077c046c5574112b60ffc?width=348",
//       zIndex: 5,
//       shadow: "8px 8px 4px 0 rgba(255, 255, 255, 0.25)"
//     }
//   ];

  interface Book {
  id: number;
  title: string;
  author: string;
  date: string;
  time: string;
  cover: string;
}

export const books: Book[] = [
  {
    id: 1,
    title: "নিয়তি",
    author: "কাব্যিক বুক সামারি",
    date: "২৮ আগস্ট, ২০২৩",
    time: "৪:১৫",
    cover: "https://api.builder.io/api/v1/image/assets/TEMP/821ddd213b44359da0637ecd84b075a62f08a6e0?width=142"
  },
  {
    id: 2,
    title: "রিচ ড্যাড পুওর ড্যাড",
    author: "আখতার উজ্জ���মান সুমন",
    date: "২৮ আগস্ট, ২০২৩",
    time: "৪:১৫",
    cover: "https://api.builder.io/api/v1/image/assets/TEMP/4f2c39c2fab8474802aa020407d92ee818e5eb37?width=142"
  },
  {
    id: 3,
    title: "দ্য মিরাকল মর্নিং",
    author: "নুসরাত তাজরী",
    date: "২৮ আগস্ট, ২০২৩",
    time: "৪:১৫",
    cover: "https://api.builder.io/api/v1/image/assets/TEMP/7143809ccab6d7af47645e194cfe3fedaa073019?width=142"
  },
  {
    id: 4,
    title: "ইট দ্যাট ফ্রগ",
    author: "ইরফানুর রহমান রিফাত",
    date: "২৮ আগস্ট, ২০২৩",
    time: "৪:১৫",
    cover: "https://api.builder.io/api/v1/image/assets/TEMP/3489274a7510f01e3be610659260451eb9ce5c96?width=142"
  },
  {
    id: 5,
    title: "দ্য কম্পাউন্ড ইফেক্ট",
    author: "বানান আন্দোলন",
    date: "২৮ আগস্ট, ২০২৩",
    time: "৪:১৫",
    cover: "https://api.builder.io/api/v1/image/assets/TEMP/88220b267fb4f63d6160887e67e02c66d80669fe?width=142"
  },
  {
    id: 6,
    title: "হিমু",
    author: "হুমায়ুন আহমেদ",
    date: "২৮ আগস্ট, ২০২৩",
    time: "৪:১৫",
    cover: "https://api.builder.io/api/v1/image/assets/TEMP/50fbd2bfd2958724a7b1d1a47b77edb971f6f05d?width=142"
  },
  {
    id: 7,
    title: "শেষের কবিতা",
    author: "রবীন্দ্রনাথ ঠাকুর",
    date: "২৮ আগস্ট, ২০২৩",
    time: "৪:১৫",
    cover: "https://api.builder.io/api/v1/image/assets/TEMP/9d54ce646fda8cac85d8ddd47a5450132779e17b?width=142"
  },
  {
    id: 8,
    title: "মোর টাইম মোর মানি",
    author: "শরীফ নাফে আচ্ছাবের",
    date: "২৮ আগস্ট, ২০২৩",
    time: "৪:১৫",
    cover: "https://api.builder.io/api/v1/image/assets/TEMP/a649ab0f4230875b966501f45f7d12f81e4bc7de?width=142"
  },
  {
    id: 9,
    title: "দ্য মিরাকল মর্নিং",
    author: "হুমায়ুন আহমেদ",
    date: "২৮ আগস্ট, ২০২৩",
    time: "৪:১৫",
    cover: "https://api.builder.io/api/v1/image/assets/TEMP/7143809ccab6d7af47645e194cfe3fedaa073019?width=142"
  },
  {
    id: 10,
    title: "এটমিক হ্যাবিটস",
    author: "রায��হান ফেরদৌস রুদ্র",
    date: "২৮ আগস্ট, ২০২৩",
    time: "৪:১৫",
    cover: "https://api.builder.io/api/v1/image/assets/TEMP/7edce4132704f106c5824637242873e4fa64dd4e?width=142"
  }
];