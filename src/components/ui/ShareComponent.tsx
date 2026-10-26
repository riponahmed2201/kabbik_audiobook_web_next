'use client';

import { useState, useEffect } from 'react';

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string; // Optional - defaults to current URL
  imageUrl?: string;
  buttonText?: string;
  className?: string;
}

export default function ShareButton({
  title,
  text,
  url,
  imageUrl,
  buttonText = "Share",
  className = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
}: ShareButtonProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    // Check if Web Share API is supported
    const checkSupport = () => {
      return typeof navigator !== 'undefined' && 
             navigator.share !== undefined;
    };
    
    setIsSupported(checkSupport());
  }, []);

  const handleShare = async () => {
    if (!isSupported || isSharing) return;
    
    setIsSharing(true);
    
    try {
      // Prepare share data
      const shareData: ShareData = {
        title: title,
        text: text,
        // url: url || (typeof window !== 'undefined' ? window.location.href : ''),
      };

      // If image is provided, try to share it as a file
      if (imageUrl && navigator.canShare && navigator.canShare({ files: [] })) {
        try {
          // Fetch and convert image to File object
          const response = await fetch(imageUrl);
          if (!response.ok) throw new Error('Failed to fetch image');
          
          const blob = await response.blob();
          const file = new File([blob], 'shared-image.jpg', { 
            type: blob.type || 'image/jpeg' 
          });
          
          // Check if browser can share this file
          if (navigator.canShare({ files: [file] })) {
            shareData.files = [file];
          }
        } catch (error) {
          console.warn('Could not share image, sharing without it:', error);
          // Continue without image
        }
      }

      // Share using Web Share API
      await navigator.share(shareData);
      
    } catch (error) {
      // Ignore if user cancels the share
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Share failed:', error);
        
        // Optional: Fallback to clipboard if sharing fails
        const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
        if (shareUrl) {
          await navigator.clipboard.writeText(shareUrl);
          // alert('Link copied to clipboard!');
        }
      }
    } finally {
      setIsSharing(false);
    }
  };

  // Don't render anything if Web Share API is not supported
  if (!isSupported) {
    return null; // Or you could return a fallback button here
  }

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className={`${className} ${isSharing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      aria-label="Share content"
    >
      {isSharing ? 'Sharing...' : buttonText}
    </button>
  );
}