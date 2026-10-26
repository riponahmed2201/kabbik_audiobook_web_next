'use client';

import { useState } from 'react';
import { Star } from 'lucide-react'; // uses lucide-react (preinstalled in Next.js projects)
import { TAudioBookDetails } from './static/audiobook.type';
import { postReview } from '@/utils/apiServices';
import { toast } from 'react-toastify';
import Spinner from '../ui/Spinner.view';

export default function ExperienceForm({ book,onClose}: { book: TAudioBookDetails,onClose:()=>void }) {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [loader,setLoader]=useState(false);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);
    let result = await postReview(book.id,rating,feedback)
    if(result?.success){
      toast.success("Review Added Successfully")
      setFeedback('');
      onClose()
      setRating(0);
    }else{
      toast.error("Something went wrong!")
    }
    
    setLoader(false);
  };

  return (
    <div className="flex my-3  rounded-[4px] justify-center items-center min-h-[60vh] bg-bg px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-bg w-full max-w-md rounded-2xl shadow-md p-6 space-y-5  "
      >
        <h2 className="text-xl font-semibold text-gray-50 leading-[1.3] text-center">
          How was your experience while listening to <br />
          <span className="gradient-text font-bold">{book?.name}?</span>
        </h2>

        {/* ⭐ Rating Section */}
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <Star
                size={28}
                className={`transition-colors duration-200 ${
                  star <= rating
                    ? 'fill-[#CE4573] text-[#CE4573]'
                    : 'text-gray-300 hover:text-[#CE4573]'
                }`}
              />
            </button>
          ))}
        </div>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your thoughts here..."
          rows={4}
          className="w-full border bg-bg border-gray-300 focus:border-[#CE4573] focus:ring-2 focus:ring-[#CE4573] rounded-xl p-3 text-gray-100 outline-none resize-none transition"
        />

        <button
          type="submit"
          disabled={loader}
          className="w-full text-white font-medium py-2.5 rounded-xl btn-gradient-2 active:scale-[0.98] transition duration-150"
        >
          {loader?<Spinner size='w-3 h-3'/>:''}
          Submit
        </button>
      </form>
    </div>
  );
}
