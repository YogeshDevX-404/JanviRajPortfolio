import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Linkedin, MessageSquare, Clock } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLinkedInInfo, setShowLinkedInInfo] = useState(false);

  const validate = (): boolean => {
    const errs: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      errs.name = 'Please provide your name';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Please specify a subject';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please write your message';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate instantaneous delivery feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 700);
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-[#5277E8] tracking-widest uppercase mb-3">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101C35] tracking-tight">
            Contact Janvi Raj
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Open for full-stack developer opportunities, software engineering roles, and technical collaborations.
          </p>
          <div className="w-16 h-1 bg-[#5277E8] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Left Column: Direct Contact Info & Action Buttons (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div>
              <h3 className="text-2xl font-bold text-[#101C35] mb-2">
                Let's discuss an opportunity
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                Feel free to reach out directly via email, phone, or send a message using the form. Responses are sent promptly.
              </p>

              {/* Contact Information Cards */}
              <div className="space-y-4">
                
                {/* Email Card */}
                <div className="p-4 rounded-2xl bg-[#F8F9FC] border border-slate-200/90 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#5277E8] flex items-center justify-center shrink-0 border border-blue-100">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Email Address
                    </p>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-sm sm:text-base font-bold text-[#101C35] hover:text-[#5277E8] transition-colors truncate block"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="p-4 rounded-2xl bg-[#F8F9FC] border border-slate-200/90 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Phone / WhatsApp
                    </p>
                    <a
                      href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                      className="text-sm sm:text-base font-bold text-[#101C35] hover:text-[#5277E8] transition-colors truncate block"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Location Card */}
                <div className="p-4 rounded-2xl bg-[#F8F9FC] border border-slate-200/90 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Location
                    </p>
                    <p className="text-sm sm:text-base font-bold text-[#101C35]">
                      {PERSONAL_INFO.location}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Direct Instant Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                {/* Email Me Button (mailto) */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Full%20Stack%20Developer%20Opportunity%20-%20Janvi%20Raj`}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#101C35] hover:bg-[#5277E8] text-white font-semibold text-xs sm:text-sm shadow-md transition-all text-center"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Me</span>
                </a>

                {/* Call Me Button (tel) */}
                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Me</span>
                </a>
              </div>

              {/* LinkedIn Button with placeholder popup / respectful notice */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowLinkedInInfo(!showLinkedInInfo)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
                >
                  <Linkedin className="w-4 h-4 text-[#0077b5]" />
                  <span>LinkedIn Profile (View Status)</span>
                </button>

                {showLinkedInInfo && (
                  <div className="mt-2 p-3.5 rounded-xl bg-slate-900 text-white text-xs leading-relaxed shadow-xl border border-slate-700 relative animate-in fade-in zoom-in-95 duration-200">
                    <p className="font-semibold text-slate-200 mb-1">
                      LinkedIn Connection Note:
                    </p>
                    <p className="text-slate-300">
                      Janvi Raj's direct profile URL can be provided upon email request ({PERSONAL_INFO.email}) to maintain recruitment privacy.
                    </p>
                    <button
                      onClick={() => setShowLinkedInInfo(false)}
                      className="mt-2 text-[11px] font-bold text-[#A78BFA] hover:underline cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form (col-span-7) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#F8F9FC] border border-slate-200/90 shadow-sm relative">
              
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#101C35]">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you for reaching out to Janvi Raj. Your message has been received and will be answered shortly at your email address.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#101C35] text-white text-xs font-semibold hover:bg-[#5277E8] transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-[#5277E8]" />
                    <h4 className="text-lg font-bold text-[#101C35]">
                      Send a Direct Message
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name Field */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5277E8]/30 ${
                          errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. rahul@company.com"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5277E8]/30 ${
                          errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Full Stack Developer Interview / Project Inquiry"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5277E8]/30 ${
                        errors.subject ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share details about the role, technical requirements, or your organization..."
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5277E8]/30 ${
                        errors.message ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#101C35] hover:bg-[#5277E8] text-white font-bold text-sm shadow-md transition-all duration-200 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
