'use client';

import { useState, useRef, type ChangeEvent } from 'react';
import { db } from '../../db';

interface IntakeFormProps {
  onSuccess: () => void;
  triggerToast: (msg: string) => void;
}

const STEPS = [
  { id: 1, label: 'Contact Details', badge: '01 . Contact', title: 'Your Contact Details', desc: 'Please enter your contact details so we can coordinate throughout the build process.' },
  { id: 2, label: 'Brand & Logo', badge: '02 . Identity', title: 'Tell us about your brand', desc: "We'll use these brand attributes to craft the layout, fonts, copy, and vibe of your website." },
  { id: 3, label: 'Product catalog', badge: '03 . Product', title: 'Your Products & Inventory', desc: 'Detail the products we should load or configure for your online catalog.' },
  { id: 4, label: 'Website spec', badge: '04 . Build Spec', title: 'Website Spec & Theme Choice', desc: 'Select what kind of website you want, pick color palettes, and share design references.' },
  { id: 5, label: 'Payments & COD', badge: '05 . Checkout', title: 'Payment & Orders config', desc: 'Tell us how you would like to handle checkouts, transactions, and shipping classes.' },
  { id: 6, label: 'Business Info', badge: '06 . Contact info', title: 'Support & Invoice Details', desc: 'Specify the address and support lines we should add to your website footer.' },
  { id: 7, label: 'Domain setup', badge: '07 . Servers', title: 'Domain & Deployment Setup', desc: 'Provide domain or hosting panels if you have them, otherwise shubsss.dev will assist you.' },
  { id: 8, label: 'Extra features', badge: '08 . Extra modules', title: 'Select features to integrate', desc: 'Check the additional SaaS components you want us to build into your website application.' },
  { id: 9, label: 'Launch media', badge: '09 . Media', title: 'Launch Assets & Testimonials', desc: 'Details about homepage banners, videos, and offers we should load onto the layout.' },
] as const;

const TOTAL_STEPS = STEPS.length;

export default function IntakeForm({ onSuccess, triggerToast }: IntakeFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleNext = () => {
    setCompletedSteps(prev => new Set(prev).add(currentStep));
    if (currentStep < TOTAL_STEPS) setCurrentStep(s => s + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(s => s - 1);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setUploadedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
  };

  const collectFormData = () => {
    if (!formRef.current) return {};
    const fd = new FormData(formRef.current);
    const data: Record<string, string | string[]> = {};
    fd.forEach((value, key) => {
      if (key === 'pages' || key === 'features') {
        if (!data[key]) data[key] = [];
        (data[key] as string[]).push(value.toString());
      } else {
        data[key] = value.toString();
      }
    });
    return data;
  };

  const handleSubmit = () => {
    setSubmitting(true);
    const data = collectFormData();
    const leads = db.getLeads();
    leads.unshift({
      id: 'lead-' + Date.now(),
      clientName: (data.clientName as string) || '',
      clientRole: (data.clientRole as string) || '',
      clientEmail: (data.clientEmail as string) || '',
      clientPhone: (data.clientPhone as string) || '',
      brandName: (data.brandName as string) || '',
      projectType: (data.websiteType as string) || 'Simple Static',
      scopeDescription: (data.brandStory as string) || '',
      budget: (data.budgetExpectation as string) || '₹3,000 - ₹5,000',
      timeline: (data.timelineExpectation as string) || '10-15 business days',
      referralSource: (data.referralSource as string) || 'Organic',
      status: 'new',
      created_at: new Date().toISOString()
    });
    db.saveLeads(leads);

    setTimeout(() => {
      setSubmitting(false);
      onSuccess();
    }, 800);
  };

  const currentStepDef = STEPS[currentStep - 1];

  return (
    <form ref={formRef} id="onboardingForm" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
      <div className="section-header">
        <span className="step-badge">{currentStepDef.badge}</span>
        <h2>{currentStepDef.title}</h2>
        <p>{currentStepDef.desc}</p>
      </div>

      {currentStep === 1 && (
        <section className="form-section active">
          <div className="form-grid">
            <div className="form-group"><label>Full Name *</label><input type="text" name="clientName" required placeholder="Shubham" /></div>
            <div className="form-group"><label>Designation *</label><input type="text" name="clientRole" required placeholder="Founder" /></div>
            <div className="form-group"><label>Email *</label><input type="email" name="clientEmail" required placeholder="name@company.com" /></div>
            <div className="form-group"><label>WhatsApp *</label><input type="tel" name="clientPhone" required placeholder="+91 86988 46796" /></div>
          </div>
        </section>
      )}

      {currentStep === 2 && (
        <section className="form-section active">
          <div className="form-grid">
            <div className="form-group full-width"><label>Official Brand Name *</label><input type="text" name="brandName" required placeholder="Brand" /></div>
            <div className="form-group full-width"><label>Brand Story</label><textarea name="brandStory" rows={4} placeholder="Story details..." /></div>
            <div className="form-group full-width">
              <label>Logo Uploads</label>
              <div className="file-upload-zone" onClick={() => document.getElementById('logoFileInput')?.click()}>
                <input type="file" id="logoFileInput" accept=".svg,.png,.jpg" multiple style={{ display: 'none' }} onChange={handleFileSelect} />
                <div>📁 Browse files</div>
              </div>
            </div>
            <div className="form-group"><label>Colors</label><input type="text" name="brandColors" placeholder="Sage Green" /></div>
          </div>
        </section>
      )}

      {currentStep === 3 && (
        <section className="form-section active">
          <div className="form-grid">
            <div className="form-group full-width"><label>Categories *</label><input type="text" name="productCategories" required placeholder="Shoes" /></div>
            <div className="form-group full-width"><label>Product Description</label><textarea name="productDescription" rows={3} placeholder="Catalog description..." /></div>
            <div className="form-group"><label>Pricing</label><input type="text" name="productPricing" placeholder="Rs. 999" /></div>
            <div className="form-group"><label>Variants</label><input type="text" name="productVariants" placeholder="Sizes S, M, L" /></div>
          </div>
        </section>
      )}

      {currentStep === 4 && (
        <section className="form-section active">
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Website Type *</label>
              <select name="websiteType" required defaultValue="Simple Static">
                <option value="Simple Static">Simple Static Website</option>
                <option value="Storytelling">Storytelling / Brand-focused Website</option>
                <option value="SaaS Console / Product Showcase">SaaS / Product Showcase</option>
                <option value="E-commerce Shop">E-commerce / Online Store</option>
              </select>
            </div>
            <div className="form-group"><label>Preset theme</label><input type="text" name="palettePreset" defaultValue="Slate & Indigo" /></div>
            <div className="form-group"><label>Custom colors</label><input type="text" name="customColors" /></div>
            <div className="form-group full-width"><label>Reference sites</label><textarea name="refWebsites" rows={2} /></div>
            <div className="form-group"><label>Style Vibe *</label><input type="text" name="designStyle" defaultValue="Minimal" /></div>
          </div>
        </section>
      )}

      {currentStep === 5 && (
        <section className="form-section active">
          <div className="form-grid">
            <div className="form-group"><label>Gateway</label><input type="text" name="paymentGateway" defaultValue="Razorpay" /></div>
            <div className="form-group"><label>COD *</label><input type="text" name="codAvailability" defaultValue="Available" /></div>
            <div className="form-group full-width"><label>Shipping rules</label><textarea name="shippingStructure" rows={2} /></div>
          </div>
        </section>
      )}

      {currentStep === 6 && (
        <section className="form-section active">
          <div className="form-grid">
            <div className="form-group full-width"><label>Address *</label><textarea name="businessAddress" required defaultValue="T-Hub" rows={2} /></div>
            <div className="form-group"><label>Support Phone *</label><input type="tel" name="businessPhone" required defaultValue="+91 86988 46796" /></div>
            <div className="form-group"><label>Support Email *</label><input type="email" name="businessEmail" required defaultValue="support@yourbrand.com" /></div>
          </div>
        </section>
      )}

      {currentStep === 7 && (
        <section className="form-section active">
          <div className="form-grid">
            <div className="form-group"><label>Domain</label><input type="text" name="domainName" /></div>
            <div className="form-group"><label>Assist Booking *</label><input type="text" name="domainSetupHelp" defaultValue="No" /></div>
          </div>
        </section>
      )}

      {currentStep === 8 && (
        <section className="form-section active">
          <div className="form-grid">
            <div className="form-group full-width"><label>SaaS features</label><input type="text" name="features" defaultValue="WhatsApp widget" /></div>
          </div>
        </section>
      )}

      {currentStep === 9 && (
        <section className="form-section active">
          <div className="form-grid">
            <div className="form-group">
              <label>How did you find us? *</label>
              <select name="referralSource" defaultValue="Organic">
                <option value="Organic">Organic Search</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Twitter">Twitter / X</option>
                <option value="Referral">Client Referral</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Budget *</label>
              <select name="budgetExpectation" defaultValue="₹3,000 - ₹5,000">
                <option value="₹3,000 - ₹5,000">₹3,000 - ₹5,000</option>
                <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>Timeline *</label>
              <select name="timelineExpectation" defaultValue="10-15 business days">
                <option value="10-15 business days">10-15 business days</option>
                <option value="2-3 weeks">2-3 weeks</option>
              </select>
            </div>
          </div>
        </section>
      )}

      <footer className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={handlePrev} disabled={currentStep === 1}>Back</button>
        {currentStep < TOTAL_STEPS ? (
          <button type="button" className="btn btn-primary" onClick={handleNext}>Continue</button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit Brief</button>
        )}
      </footer>
    </form>
  );
}
