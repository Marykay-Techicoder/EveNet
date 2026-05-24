import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { 
  User, Mail, Phone, MapPin, Users, MessageSquare, 
  Upload, CheckCircle, AlertCircle, Calendar, Clock, Map 
} from 'lucide-react';

export default function EventRegistration({ event }) {
  const [photoPreview, setPhotoPreview] = useState(null);
  
  const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
    event_id: event?.id || '',
    full_name: '',
    email: '',
    phone: '',
    location: '',
    referral_source: '',
    expectation: '',
    photo: null,
  });

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith('+')) value = '+' + value.replace(/[^0-9]/g, '');
    setData('phone', value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      setData('photo', file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setData('photo', null);
      setPhotoPreview(null);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    post('/register-event', {
      preserveScroll: true,
    });
  };

  const referralOptions = [
    'Social Media',
    'Friend / Colleague',
    'Email Newsletter',
    'Advertisement',
    'Search Engine',
    'Other'
  ];

  // If event is not provided (fallback)
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="mx-auto text-yellow-500 mb-4" size={48} />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Event not found</h2>
          <p className="text-gray-600">Please go back and select a valid event.</p>
          <a href="/" className="mt-4 inline-block text-indigo-600 hover:underline">← Back to events</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Event summary card */}
        <div className="bg-white rounded-2xl shadow-md p-5 mb-6 border border-indigo-100 flex flex-wrap justify-between items-center">
          <div>
            <h2 className="font-semibold text-gray-800">{event.title}</h2>
            <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Calendar size={14} /> {event.date || 'Date TBA'}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {event.time || 'Time TBA'}</span>
              <span className="flex items-center gap-1"><Map size={14} /> {event.location || 'Location TBA'}</span>
            </div>
          </div>
          <div className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">Registration Open</div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-6 sm:px-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Register for Event</h1>
            <p className="text-indigo-100 mt-1">Fill in your details to secure your spot</p>
          </div>

          <form onSubmit={submit} className="px-6 py-8 sm:px-8 space-y-5">
            {recentlySuccessful && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md flex items-center gap-3">
                <CheckCircle className="text-green-500" size={22} />
                <div>
                  <p className="text-green-700 font-medium">Registration successful!</p>
                  <p className="text-green-600 text-sm">Check your email for the digital card and QR code.</p>
                </div>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={data.full_name}
                  onChange={e => setData('full_name', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.full_name ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                  placeholder="John Doe"
                  required
                />
              </div>
              {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                  placeholder="you@example.com"
                  required
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  value={data.phone}
                  onChange={handlePhoneChange}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                  placeholder="+234 123 456 7890"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Include country code (e.g., +234 for Nigeria)</p>
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={data.location}
                  onChange={e => setData('location', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                  placeholder="City, Country"
                  required
                />
              </div>
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
            </div>

            {/* Referral Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">How did you hear about us? *</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  value={data.referral_source}
                  onChange={e => setData('referral_source', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.referral_source ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-indigo-500 appearance-none bg-white`}
                  required
                >
                  <option value="">Select an option</option>
                  {referralOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              {errors.referral_source && <p className="mt-1 text-sm text-red-600">{errors.referral_source}</p>}
            </div>

            {/* Expectation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your expectation from this event *</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 text-gray-400" size={18} />
                <textarea
                  value={data.expectation}
                  onChange={e => setData('expectation', e.target.value)}
                  rows="3"
                  className={`w-full pl-10 pr-4 py-3 border ${errors.expectation ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                  placeholder="What do you hope to learn or gain?"
                  required
                />
              </div>
              {errors.expectation && <p className="mt-1 text-sm text-red-600">{errors.expectation}</p>}
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo *</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex-1 cursor-pointer bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-indigo-500 transition">
                  <input type="file" accept="image/jpeg,image/png,image/jpg" onChange={handleFileChange} className="hidden" />
                  <Upload className="mx-auto text-gray-400 mb-1" size={24} />
                  <span className="text-sm text-gray-600">Click to upload</span>
                  <span className="text-xs text-gray-400 block">JPG, PNG (max 2MB)</span>
                </label>
                {photoPreview && (
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500 shadow-sm">
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              {errors.photo && <p className="mt-1 text-sm text-red-600">{errors.photo}</p>}
              <p className="text-xs text-gray-500 mt-1">This photo will appear on your digital event card</p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={processing}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
            >
              {processing ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
                  </svg>
                  Processing...
                </>
              ) : (
                'Complete Registration'
              )}
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              By registering, you agree to our <a href="/terms" className="text-indigo-600 hover:underline">Terms</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}