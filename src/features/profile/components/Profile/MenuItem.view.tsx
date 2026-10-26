import { cn } from "@/lib/utils";

interface MenuItemProps {
  title: string;
  icon: React.ReactNode;
  gradient: string;
  hasNewBadge?: boolean;
  className?: string;
  handleClick?:()=>void
}

export  const MenuItem: React.FC<MenuItemProps> = ({ title, icon, gradient, hasNewBadge, className,handleClick }) => {
  return (
    <div onClick={()=>handleClick?handleClick():''} className={cn(`relative cursor-pointer ${hasNewBadge?'mt-0.5':''}`, className)}>
      <div className="profile_btn_gradients rounded-xl p-2">
        <div className="flex items-center space-x-4">
          <div
            className={cn(
              'w-[36px] h-[27px] sm:h-[36px] relative rounded-lg flex text-white items-center justify-center',
              gradient
            )}
          >
            {icon}
          </div>
          <h3 className="text-white text-cs2 relative md:text-cn font-semibold flex-1">{title}

            {hasNewBadge && (
        <div className="absolute -top-2.5 right-2 bg-red-600 text-white px-2 py-0.5 rounded-[4px] rotate-[30deg] text-xs font-bold shadow-md">
          নতুন
        </div>
      )}
          </h3>
          
        </div>
      </div>

      {/* {hasNewBadge && (
        <div className="absolute -top-2 right-2 bg-red-600 text-white px-2 py-0.5 rounded-[4px] rotate-45 text-xs font-bold shadow-md">
          নতুন
        </div>
      )} */}
    </div>
  );
};