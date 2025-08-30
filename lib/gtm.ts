// Google Tag Manager Data Layer Utility

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export interface GTMEvent {
  event: string;
  [key: string]: any;
}

// Initialize dataLayer if it doesn't exist
export const initializeDataLayer = () => {
  if (typeof window !== 'undefined' && !window.dataLayer) {
    window.dataLayer = [];
  }
};

// Push event to dataLayer
export const pushToDataLayer = (eventData: GTMEvent) => {
  if (typeof window !== 'undefined') {
    initializeDataLayer();
    window.dataLayer.push(eventData);
    console.log('📊 GTM Event:', eventData);
  }
};

// WhatsApp click tracking
export const trackWhatsAppClick = (phoneNumber: string, platform: string, source?: string) => {
  pushToDataLayer({
    event: 'whatsapp_click',
    contact_method: 'whatsapp',
    phone_number: phoneNumber,
    traffic_source: platform,
    utm_source: source || platform,
    event_category: 'engagement',
    event_action: 'whatsapp_click',
    event_label: `${platform}_${phoneNumber}`,
    custom_parameters: {
      platform: platform,
      phone: phoneNumber,
      timestamp: new Date().toISOString()
    }
  });
};

// Phone call tracking
export const trackPhoneCall = (phoneNumber: string, platform: string, source?: string) => {
  pushToDataLayer({
    event: 'phone_call',
    contact_method: 'phone',
    phone_number: phoneNumber,
    traffic_source: platform,
    utm_source: source || platform,
    event_category: 'engagement',
    event_action: 'phone_call',
    event_label: `${platform}_${phoneNumber}`,
    custom_parameters: {
      platform: platform,
      phone: phoneNumber,
      timestamp: new Date().toISOString()
    }
  });
};

// Lead generation tracking
export const trackLeadGeneration = (leadType: string, platform: string, phoneNumber?: string) => {
  pushToDataLayer({
    event: 'generate_lead',
    lead_type: leadType,
    traffic_source: platform,
    phone_number: phoneNumber,
    event_category: 'conversion',
    event_action: 'generate_lead',
    event_label: `${leadType}_${platform}`,
    custom_parameters: {
      platform: platform,
      lead_type: leadType,
      phone: phoneNumber,
      timestamp: new Date().toISOString()
    }
  });
};

// Form submission tracking
export const trackFormSubmission = (formType: string, platform: string, formData?: any) => {
  pushToDataLayer({
    event: 'form_submit',
    form_type: formType,
    traffic_source: platform,
    event_category: 'engagement',
    event_action: 'form_submit',
    event_label: `${formType}_${platform}`,
    custom_parameters: {
      platform: platform,
      form_type: formType,
      form_data: formData,
      timestamp: new Date().toISOString()
    }
  });
};

// Page view tracking with platform context
export const trackPageView = (pageName: string, platform: string, source?: string) => {
  pushToDataLayer({
    event: 'page_view',
    page_name: pageName,
    traffic_source: platform,
    utm_source: source || platform,
    event_category: 'navigation',
    event_action: 'page_view',
    event_label: `${pageName}_${platform}`,
    custom_parameters: {
      platform: platform,
      page: pageName,
      timestamp: new Date().toISOString()
    }
  });
};

// Custom conversion tracking
export const trackConversion = (conversionType: string, value?: number, currency?: string, platform?: string) => {
  pushToDataLayer({
    event: 'conversion',
    conversion_type: conversionType,
    value: value || 0,
    currency: currency || 'SAR',
    traffic_source: platform || 'direct',
    event_category: 'conversion',
    event_action: 'conversion',
    event_label: conversionType,
    custom_parameters: {
      conversion_type: conversionType,
      value: value,
      currency: currency,
      platform: platform,
      timestamp: new Date().toISOString()
    }
  });
};

// Utility to track all contact actions (WhatsApp + Phone)
export const trackContactAction = (method: 'whatsapp' | 'phone', phoneNumber: string, platform: string, source?: string) => {
  if (method === 'whatsapp') {
    trackWhatsAppClick(phoneNumber, platform, source);
  } else {
    trackPhoneCall(phoneNumber, platform, source);
  }
  
  // Also track as lead generation
  trackLeadGeneration(method, platform, phoneNumber);
};


