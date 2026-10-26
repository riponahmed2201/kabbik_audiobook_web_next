import { BookOpen } from "lucide-react";
import { castCrewInfo } from "./static/audiobook.type";
import BookIcon from "@/svgs/bookIcon";
import { useRouter } from "next/navigation";
import { paths } from "@/utils/Paths";


export default function CastAndCrew(props: { castCrewData: castCrewInfo[]  }) {
  const { castCrewData } = props;
  const router=useRouter();
  return (
    <div className="max-h-[68vh] overflow-y-auto  py-2 pr-2">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col gap-[12px]">
          {castCrewData?.map((author) => (
            <div
              onClick={()=>router.push(paths.cast+author.name)}
              key={author.id}
              className=" w-full rounded-xl cursor-pointer bg-white border border-gray-300 flex items-center px-[15px] py-[5px]"
            >
              {/* Profile Image */}
              <div className="flex-shrink-0 mr-[25px]">
                <img
                  loading="lazy"
                  src={author.imageUrl ?? 'https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/manPlaceholder.jpg'}
                  alt={author.name}
                  className="w-[48px] h-[48px] rounded-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Author Name */}
                <div className="mb-1">
                  <span className="text-black text-cn font-medium  font-inter block truncate">
                    {author.name}
                  </span>
                </div>
                
                {/* Audiobook Count */}
                <div className="flex items-center gap-[3.834px] mt-2">
                  <span className="w-[12px] h-[15px] ">
                    <BookIcon  />
                  </span>
                  <span className="text-black text-cs font-medium leading-[9.585px] font-inter">
                    {author.total_audiobooks} অডিওবুক
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
