export type LeadSource = 'payment_redirect' | 'free_trial' | 'whatsapp_trial' | 'contact_form';

export interface LeadData {
  email: string;
  phone: string;
}

export interface LeadSubmitOptions {
  adminApiUrl?: string;
  websiteId?: string;
  source: LeadSource;
  metadata?: Record<string, unknown>;
}

export async function submitLead(
  data: LeadData,
  options: LeadSubmitOptions
): Promise<boolean> {
  const { adminApiUrl, websiteId, source, metadata } = options;

  if (typeof window === 'undefined') {
    console.log('Lead capture: Running on server, skipping');
    return false;
  }

  if (!adminApiUrl || !websiteId) {
    console.log('Lead capture not configured, storing locally');
    try {
      const leads = JSON.parse(localStorage.getItem('captured_leads') || '[]');
      leads.push({ ...data, source, metadata, timestamp: new Date().toISOString() });
      localStorage.setItem('captured_leads', JSON.stringify(leads));
    } catch (e) {
      console.error('Failed to store lead locally:', e);
    }
    return true;
  }

  try {
    const response = await fetch(`${adminApiUrl}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        websiteId,
        email: data.email,
        phone: data.phone || null,
        source,
        metadata,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to submit lead:', error);
    try {
      const leads = JSON.parse(localStorage.getItem('captured_leads') || '[]');
      leads.push({ ...data, source, metadata, timestamp: new Date().toISOString() });
      localStorage.setItem('captured_leads', JSON.stringify(leads));
    } catch (e) {
      console.error('Failed to store lead locally:', e);
    }
    return true;
  }
}
