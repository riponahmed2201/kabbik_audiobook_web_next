import { container } from '../ui/static/tailwind.classes';
import { AudiobookCard } from './AudioBookCard.view';
import { TCategoryWiseTopBooksSection } from './static/category.types';

export default function TopAudioBookSection(props:TCategoryWiseTopBooksSection) {
  const {category,data}=props;

  return (
    <div className=" bg-background max-md:overflow-hidden text-foreground relative ">      
      <div className="circular_gradient right-[-10%] z-[0]  top-[-30%] w-[30vw] h-[30vw] absolute  "></div>
      <div className="circular_gradient left-[-10%]  top-[50%] -translate-y-1/2 w-[30vw] h-[30vw] absolute  "></div>
      <div className="circular_gradient right-[-10%]  bottom-[-30%] w-[30vw] h-[30vw] absolute  "></div>
      {/* Main content */}
      <div className="relative z-[3]">

        {/* Audiobooks Grid */}
        <div className={container('1300px')}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5  gap-3 md:gap-4 lg2:gap-6 ">
            {data ? data.slice(0,10).map((audiobook) => (
              <AudiobookCard 
                key={audiobook.id} 
                category={category}
                audiobook={audiobook}
                className="max-w-sm mx-auto"
              />
            )):''}
          </div>
        </div>
      </div>
    </div>
  );
}
