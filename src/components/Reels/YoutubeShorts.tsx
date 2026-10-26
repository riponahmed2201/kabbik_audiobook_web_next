// "use client";
// import React, { useState } from "react";
// import Heading from "@/components/ui/heading/Heading";
// import Carousel from "@/components/ui/carousel/Carousel";
// import CommonReelCard from "@/components/shared/Cards/CommonReelCard";
// import ShortsPlayer from "@/components/Reels/ShortsPlayer";

// interface Video {
//   id: string;
//   youtubeId: string;
//   thumbnail: string;
//   title: string;
//   views: string;
//   creator: string;
//   likes: string;
//   comments: string;
// }

// const YoutubeShorts: React.FC = () => {
//   const videos: Video[] = [
//     {
//       id: "1",
//       youtubeId: "E8fFnSECkhY",
//       thumbnail: "https://img.youtube.com/vi/E8fFnSECkhY/maxresdefault.jpg",
//       title: "Amazing Short Video",
//       views: "3.5M views",
//       creator: "@creator1",
//       likes: "125K",
//       comments: "2.3K",
//     },
//     {
//       id: "2",
//       youtubeId: "8nH1kCRqQ-0",
//       thumbnail: "https://img.youtube.com/vi/8nH1kCRqQ-0/maxresdefault.jpg",
//       title: "Trending Short",
//       views: "300K views",
//       creator: "@creator2",
//       likes: "89K",
//       comments: "1.8K",
//     },
//     {
//       id: "3",
//       youtubeId: "XztaDURn0rg",
//       thumbnail: "https://img.youtube.com/vi/XztaDURn0rg/maxresdefault.jpg",
//       title: "Viral Content",
//       views: "1.2M views",
//       creator: "@creator3",
//       likes: "203K",
//       comments: "4.1K",
//     },
//   ];

//   const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
//     null,
//   );

//   if (selectedVideoIndex !== null) {
//     return (
//       <ShortsPlayer
//         initialIndex={selectedVideoIndex}
//         videos={videos}
//         onClose={() => setSelectedVideoIndex(null)}
//       />
//     );
//   }
//   return (
//     <section>
//       <div className="main-container">
//         <Heading title="YouTube Shorts" linkTitle="See All" link="" />
//         <Carousel className="pt-6 py-8 gap-x-2" isAutoPlay={false}>
//           <>
//             {videos.map((video, i) => (
//               <CommonReelCard
//                 key={i}
//                 onClick={() => setSelectedVideoIndex(i)}
//               />
//             ))}
//           </>
//         </Carousel>
//       </div>
//     </section>
//   );
// };

// export default YoutubeShorts;
