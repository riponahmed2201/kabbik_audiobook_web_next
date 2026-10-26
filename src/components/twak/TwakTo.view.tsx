'use client';
import { useEffect } from 'react';

export default function TawkScript() {
  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    if (false) {
      // Open chat in new tab instead of embedding
      const chatBtn = document.createElement('a');
      chatBtn.href = 'https://tawk.to/chat/68cb9938b695741925a90747/1j5dkt1it';
      chatBtn.target = '_blank';
      chatBtn.style.position = 'fixed';
      chatBtn.style.bottom = '20px';
      chatBtn.style.right = '20px';
      chatBtn.style.zIndex = '9999';
      chatBtn.style.background = '#00b67a';
      chatBtn.style.color = '#fff';
      chatBtn.style.padding = '10px 16px';
      chatBtn.style.borderRadius = '50px';
      chatBtn.style.fontSize = '14px';
      chatBtn.innerText = 'Chat Now 💬';
      setTimeout(()=>{document.body.appendChild(chatBtn)},1500)
    } else {
      // Normal Tawk embed for desktop
      const s1 = document.createElement('script');
      s1.async = true;
      s1.src = 'https://embed.tawk.to/68cb9938b695741925a90747/1j5dkt1it';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      
      setTimeout(()=>{document.body.appendChild(s1)},1500)
    }
  }, []);

  return null;
}
