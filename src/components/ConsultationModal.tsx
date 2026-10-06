import React, { useState } from 'react';
import { X, CheckCircle, Calendar, Clock } from 'lucide-react';
import { api } from '../api.ts';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Residential Architecture',
}) => {
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState(initialService);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM — Morning Session');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !email) {
      setError('Please provide your name and email address.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.bookConsultation({
        clientName,
        email,
        phone,
        projectType,
        preferredDate,
        preferredTime,
        notes,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit consultation request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setClientName('');
    setEmail('');
    setPhone('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1B1A]/55 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#FBFBFA] shadow-2xl border border-[#E0DBD0] p-8 sm:p-10 z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#7D766D] hover:text-[#1C1B1A] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="w-12 h-12 text-[#8C7764] mx-auto stroke-1" />
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B1A]">
              Consultation Requested
            </h3>
            <p className="text-sm text-[#5E5A54] max-w-md mx-auto font-sans leading-relaxed">
              Thank you, <span className="font-medium text-[#1C1B1A]">{clientName}</span>. Our studio director will review your project details and confirm your consultation schedule within 24 hours.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-[#1C1B1A] text-white text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#33312E] transition-colors cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 space-y-1">
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C7764]">
                Private Commission
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1B1A]">
                Schedule a Studio Consultation
              </h2>
              <p className="text-xs text-[#7D766D] font-sans">
                Meet with our lead architects in Kyoto, Tokyo, London, or via private secure video conference.
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3 text-xs text-amber-900 bg-amber-50 border border-amber-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[#4A4845] font-medium mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Kenji Takahashi"
                    className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-[#E0DBD0] text-[#1C1B1A] focus:outline-none focus:border-[#8C7764] transition-colors"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#4A4845] font-medium mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. k.takahashi@domain.com"
                    className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-[#E0DBD0] text-[#1C1B1A] focus:outline-none focus:border-[#8C7764] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[#4A4845] font-medium mb-1.5">
                    Telephone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+81 or +44..."
                    className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-[#E0DBD0] text-[#1C1B1A] focus:outline-none focus:border-[#8C7764] transition-colors"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#4A4845] font-medium mb-1.5">
                    Service Focus
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-[#E0DBD0] text-[#1C1B1A] focus:outline-none focus:border-[#8C7764] transition-colors"
                  >
                    <option value="Residential Architecture">Residential Architecture</option>
                    <option value="Commercial & Atelier">Commercial & Atelier</option>
                    <option value="Heritage Renovation">Heritage Renovation</option>
                    <option value="Furniture & Styling">Furniture & Styling</option>
                    <option value="Space Planning">Space Planning & Feasibility</option>
                    <option value="Turnkey Project Delivery">Turnkey Project Delivery</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center space-x-1 uppercase tracking-wider text-[#4A4845] font-medium mb-1.5">
                    <Calendar className="w-3 h-3 text-[#8C7764]" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-[#E0DBD0] text-[#1C1B1A] focus:outline-none focus:border-[#8C7764] transition-colors"
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-1 uppercase tracking-wider text-[#4A4845] font-medium mb-1.5">
                    <Clock className="w-3 h-3 text-[#8C7764]" />
                    <span>Preferred Time Slot</span>
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-[#E0DBD0] text-[#1C1B1A] focus:outline-none focus:border-[#8C7764] transition-colors"
                  >
                    <option value="10:00 AM — Morning Atelier Session">10:00 AM — Morning Atelier Session</option>
                    <option value="02:00 PM — Afternoon Architectural Review">02:00 PM — Afternoon Architectural Review</option>
                    <option value="05:00 PM — Evening Studio or Video Call">05:00 PM — Evening Studio or Video Call</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#4A4845] font-medium mb-1.5">
                  Project Context / Site Location (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us briefly about the site, scale, or architectural vision..."
                  className="w-full px-3.5 py-2 bg-[#F6F4EE] border border-[#E0DBD0] text-[#1C1B1A] focus:outline-none focus:border-[#8C7764] transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 text-xs uppercase tracking-[0.18em] font-medium text-white bg-[#1C1B1A] hover:bg-[#33312E] disabled:opacity-50 transition-colors text-center cursor-pointer"
                >
                  {loading ? 'Submitting Request...' : 'Confirm Consultation Booking'}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
