"use client"

import { useEffect } from 'react'

export function GTMScript() {
  useEffect(() => {
    // Initialize GTM after component mounts (post-hydration)
    const gtmScript = document.createElement('script')
    gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MGMC6KSC');`
    
    document.head.appendChild(gtmScript)
    
    console.log('🏷️ GTM loaded post-hydration')
    
    return () => {
      // Cleanup if needed
      const existingScript = document.querySelector('script[src*="googletagmanager"]')
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript)
      }
    }
  }, [])

  return null // This component doesn't render anything
}
