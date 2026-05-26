import { useState, useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import {
    User, Mail, Phone, MapPin, Users, MessageSquare,
    Upload, CheckCircle, AlertCircle, Calendar, Clock,
    ChevronDown, Sparkles, X, ExternalLink, Home,
} from 'lucide-react';

/* ─────────────────────────── DATA ─────────────────────────── */

const COUNTRY_CODES = [
    { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
    { code: '+1',   flag: '🇺🇸', name: 'USA / Canada' },
    { code: '+44',  flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+91',  flag: '🇮🇳', name: 'India' },
    { code: '+27',  flag: '🇿🇦', name: 'South Africa' },
    { code: '+233', flag: '🇬🇭', name: 'Ghana' },
    { code: '+254', flag: '🇰🇪', name: 'Kenya' },
    { code: '+256', flag: '🇺🇬', name: 'Uganda' },
    { code: '+255', flag: '🇹🇿', name: 'Tanzania' },
    { code: '+251', flag: '🇪🇹', name: 'Ethiopia' },
    { code: '+237', flag: '🇨🇲', name: 'Cameroon' },
    { code: '+225', flag: '🇨🇮', name: "Côte d'Ivoire" },
    { code: '+221', flag: '🇸🇳', name: 'Senegal' },
    { code: '+212', flag: '🇲🇦', name: 'Morocco' },
    { code: '+20',  flag: '🇪🇬', name: 'Egypt' },
    { code: '+249', flag: '🇸🇩', name: 'Sudan' },
    { code: '+260', flag: '🇿🇲', name: 'Zambia' },
    { code: '+263', flag: '🇿🇼', name: 'Zimbabwe' },
    { code: '+267', flag: '🇧🇼', name: 'Botswana' },
    { code: '+264', flag: '🇳🇦', name: 'Namibia' },
    { code: '+49',  flag: '🇩🇪', name: 'Germany' },
    { code: '+33',  flag: '🇫🇷', name: 'France' },
    { code: '+39',  flag: '🇮🇹', name: 'Italy' },
    { code: '+34',  flag: '🇪🇸', name: 'Spain' },
    { code: '+31',  flag: '🇳🇱', name: 'Netherlands' },
    { code: '+7',   flag: '🇷🇺', name: 'Russia' },
    { code: '+55',  flag: '🇧🇷', name: 'Brazil' },
    { code: '+52',  flag: '🇲🇽', name: 'Mexico' },
    { code: '+61',  flag: '🇦🇺', name: 'Australia' },
    { code: '+64',  flag: '🇳🇿', name: 'New Zealand' },
    { code: '+81',  flag: '🇯🇵', name: 'Japan' },
    { code: '+82',  flag: '🇰🇷', name: 'South Korea' },
    { code: '+86',  flag: '🇨🇳', name: 'China' },
    { code: '+65',  flag: '🇸🇬', name: 'Singapore' },
    { code: '+971', flag: '🇦🇪', name: 'UAE' },
    { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: '+974', flag: '🇶🇦', name: 'Qatar' },
];

const STATES_BY_COUNTRY = {
    Nigeria: [
        'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa',
        'Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti',
        'Enugu','FCT (Abuja)','Gombe','Imo','Jigawa','Kaduna','Kano',
        'Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger',
        'Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto',
        'Taraba','Yobe','Zamfara',
    ],
    'USA': [
        'Alabama','Alaska','Arizona','Arkansas','California','Colorado',
        'Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho',
        'Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana',
        'Maine','Maryland','Massachusetts','Michigan','Minnesota',
        'Mississippi','Missouri','Montana','Nebraska','Nevada',
        'New Hampshire','New Jersey','New Mexico','New York',
        'North Carolina','North Dakota','Ohio','Oklahoma','Oregon',
        'Pennsylvania','Rhode Island','South Carolina','South Dakota',
        'Tennessee','Texas','Utah','Vermont','Virginia','Washington',
        'West Virginia','Wisconsin','Wyoming','Washington D.C.',
    ],
    'United Kingdom': [
        'England – East Midlands','England – East of England',
        'England – Greater London','England – North East',
        'England – North West','England – South East',
        'England – South West','England – West Midlands',
        'England – Yorkshire and the Humber',
        'Scotland','Wales','Northern Ireland',
    ],
    'Ghana': [
        'Ahafo','Ashanti','Bono','Bono East','Central','Eastern',
        'Greater Accra','North East','Northern','Oti','Savannah',
        'Upper East','Upper West','Volta','Western','Western North',
    ],
    'Kenya': [
        'Baringo','Bomet','Bungoma','Busia','Elgeyo-Marakwet',
        'Embu','Garissa','Homa Bay','Isiolo','Kajiado',
        'Kakamega','Kericho','Kiambu','Kilifi','Kirinyaga',
        'Kisii','Kisumu','Kitui','Kwale','Laikipia',
        'Lamu','Machakos','Makueni','Mandera','Marsabit',
        'Meru','Migori','Mombasa','Murang\'a','Nairobi',
        'Nakuru','Nandi','Narok','Nyamira','Nyandarua',
        'Nyeri','Samburu','Siaya','Taita-Taveta','Tana River',
        'Tharaka-Nithi','Trans Nzoia','Turkana','Uasin Gishu',
        'Vihiga','Wajir','West Pokot',
    ],
    'South Africa': [
        'Eastern Cape','Free State','Gauteng','KwaZulu-Natal',
        'Limpopo','Mpumalanga','North West','Northern Cape','Western Cape',
    ],
    'India': [
        'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar',
        'Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh',
        'Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra',
        'Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
        'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura',
        'Uttar Pradesh','Uttarakhand','West Bengal',
        'Andaman & Nicobar (UT)','Chandigarh (UT)',
        'Dadra & Nagar Haveli (UT)','Daman & Diu (UT)',
        'Delhi (UT)','Jammu & Kashmir (UT)','Ladakh (UT)',
        'Lakshadweep (UT)','Puducherry (UT)',
    ],
    'Canada': [
        'Alberta','British Columbia','Manitoba','New Brunswick',
        'Newfoundland and Labrador','Northwest Territories',
        'Nova Scotia','Nunavut','Ontario','Prince Edward Island',
        'Quebec','Saskatchewan','Yukon',
    ],
    'Australia': [
        'Australian Capital Territory','New South Wales',
        'Northern Territory','Queensland','South Australia',
        'Tasmania','Victoria','Western Australia',
    ],
    'Uganda': [
        'Kampala','Wakiso','Mukono','Jinja','Mbarara','Gulu',
        'Lira','Masaka','Mbale','Fort Portal','Arua','Soroti',
        'Kabale','Hoima','Kasese',
    ],
    'Tanzania': [
        'Arusha','Dar es Salaam','Dodoma','Geita','Iringa',
        'Kagera','Katavi','Kigoma','Kilimanjaro','Lindi',
        'Manyara','Mara','Mbeya','Morogoro','Mtwara',
        'Mwanza','Njombe','Pemba North','Pemba South','Pwani',
        'Rukwa','Ruvuma','Shinyanga','Simiyu','Singida',
        'Songwe','Tabora','Tanga','Zanzibar',
    ],
    'Ethiopia': [
        'Addis Ababa','Afar','Amhara','Benishangul-Gumuz',
        'Dire Dawa','Gambela','Harari','Oromia','Sidama',
        'Somali','South Ethiopia','South West Ethiopia',
        'Tigray','Central Ethiopia',
    ],
    'Cameroon': [
        'Adamawa','Centre','East','Far North','Littoral',
        'North','North West','South','South West','West',
    ],
    'Morocco': [
        'Béni Mellal-Khénifra','Casablanca-Settat','Drâa-Tafilalet',
        'Fès-Meknès','Guelmim-Oued Noun','Laâyoune-Sakia El Hamra',
        'Marrakesh-Safi','Oriental','Rabat-Salé-Kénitra',
        'Souss-Massa','Tanger-Tétouan-Al Hoceïma','Dakhla-Oued Ed-Dahab',
    ],
    'Egypt': [
        'Alexandria','Aswan','Asyut','Beheira','Beni Suef',
        'Cairo','Dakahlia','Damietta','Faiyum','Gharbia',
        'Giza','Ismailia','Kafr El Sheikh','Luxor','Matruh',
        'Minya','Monufia','New Valley','North Sinai','Port Said',
        'Qalyubia','Qena','Red Sea','Sharqia','Sohag',
        'South Sinai','Suez',
    ],
    'Germany': [
        'Baden-Württemberg','Bavaria','Berlin','Brandenburg',
        'Bremen','Hamburg','Hesse','Lower Saxony',
        'Mecklenburg-Vorpommern','North Rhine-Westphalia',
        'Rhineland-Palatinate','Saarland','Saxony',
        'Saxony-Anhalt','Schleswig-Holstein','Thuringia',
    ],
    'France': [
        'Auvergne-Rhône-Alpes','Bourgogne-Franche-Comté',
        'Brittany','Centre-Val de Loire','Corsica',
        'Grand Est','Hauts-de-France','Île-de-France',
        'Normandy','Nouvelle-Aquitaine','Occitanie',
        'Pays de la Loire','Provence-Alpes-Côte d\'Azur',
        'Guadeloupe','Martinique','Guiana','Réunion','Mayotte',
    ],
    'Brazil': [
        'Acre','Alagoas','Amapá','Amazonas','Bahia','Ceará',
        'Distrito Federal','Espírito Santo','Goiás','Maranhão',
        'Mato Grosso','Mato Grosso do Sul','Minas Gerais','Pará',
        'Paraíba','Paraná','Pernambuco','Piauí','Rio de Janeiro',
        'Rio Grande do Norte','Rio Grande do Sul','Rondônia',
        'Roraima','Santa Catarina','São Paulo','Sergipe','Tocantins',
    ],
    'Other': ['Not Applicable'],
};

const COUNTRIES = Object.keys(STATES_BY_COUNTRY);

const REFERRAL_OPTIONS = [
    'TikTok','WhatsApp','Instagram','Facebook','Twitter / X',
    'Friend / Family','Email Newsletter','LinkedIn','YouTube','Other',
];

/* ─────────────────────────── HELPERS ─────────────────────────── */

const getEmailProviderLink = (email) => {
    const domain = (email || '').split('@')[1]?.toLowerCase() || '';
    if (domain.includes('gmail')) return 'https://mail.google.com/mail/u/0/#inbox';
    if (domain.includes('yahoo')) return 'https://mail.yahoo.com/';
    if (domain.includes('outlook') || domain.includes('hotmail') || domain.includes('live') || domain.includes('msn'))
        return 'https://outlook.live.com/mail/0/inbox';
    if (domain.includes('icloud') || domain.includes('me.com') || domain.includes('mac.com'))
        return 'https://www.icloud.com/mail';
    if (domain.includes('proton')) return 'https://mail.proton.me/';
    if (domain.includes('zoho')) return 'https://mail.zoho.com/';
    return `mailto:${email}`;
};

/* ─────────────────────────── VALIDATION ─────────────────────────── */

const validateForm = (data) => {
    const errs = {};
    if (!data.full_name.trim()) errs.full_name = 'Full name is required.';
    else if (data.full_name.trim().length < 3) errs.full_name = 'Name must be at least 3 characters.';

    if (!data.email.trim()) errs.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Please enter a valid email address.';

    if (!data.phone.trim()) errs.phone = 'Phone number is required.';
    else if (data.phone.replace(/\D/g, '').length < 7) errs.phone = 'Phone number must have at least 7 digits.';
    else if (data.phone.replace(/\D/g, '').length > 15) errs.phone = 'Phone number is too long.';

    if (!data.country) errs.country = 'Please select a country.';
    if (!data.state) errs.state = 'Please select a state / region.';

    if (!data.referral_source) errs.referral_source = 'Please tell us how you heard about us.';

    if (!data.expectation.trim()) errs.expectation = 'Please share your expectation.';
    else if (data.expectation.trim().length < 10) errs.expectation = 'Please write at least 10 characters.';

    if (!data.photo) errs.photo = 'A profile photo is required.';

    return errs;
};

/* ─────────────────────────── SUCCESS MODAL ─────────────────────────── */

function SuccessModal({ email, onOkay }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
                background: 'rgba(15,15,35,0.75)',
                backdropFilter: 'blur(8px)',
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.35s ease',
            }}
        >
            <div
                className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
                style={{
                    background: 'linear-gradient(145deg, #ffffff 0%, #f0f4ff 100%)',
                    transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                    transition: 'transform 0.45s cubic-bezier(0.175,0.885,0.32,1.275)',
                }}
            >
                {/* Top accent bar */}
                <div style={{ background: 'linear-gradient(90deg,#4f46e5,#7c3aed,#ec4899)', height: 6 }} />

                <div className="px-8 py-8 text-center">
                    {/* Animated checkmark circle */}
                    <div className="flex items-center justify-center mb-5">
                        <div
                            className="relative flex items-center justify-center rounded-full"
                            style={{
                                width: 88, height: 88,
                                background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
                                boxShadow: '0 0 0 16px rgba(79,70,229,0.1)',
                                animation: 'pulse-ring 2s ease infinite',
                            }}
                        >
                            <CheckCircle color="#fff" size={44} strokeWidth={2} />
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Sparkles size={18} color="#7c3aed" />
                        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                            You're Registered!
                        </h2>
                        <Sparkles size={18} color="#7c3aed" />
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-1">
                        Your spot has been secured. 🎉
                    </p>
                    <p className="text-gray-700 font-medium text-sm mb-6">
                        Your <span className="text-indigo-600 font-semibold">digital event card</span> has been sent to:
                    </p>

                    <div
                        className="rounded-xl px-4 py-3 mb-6 text-sm font-semibold text-indigo-700 break-all"
                        style={{ background: '#eef2ff', border: '1.5px solid #c7d2fe' }}
                    >
                        {email}
                    </div>

                    <p className="text-xs text-gray-500 mb-7">
                        Didn't receive it? Check your spam / junk folder.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => { window.location.href = '/'; }}
                            className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-all duration-200"
                        >
                            <Home size={16} />
                            Okay, Go Home
                        </button>
                        <button
                            onClick={() => window.open(getEmailProviderLink(email), '_blank')}
                            className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold text-white transition-all duration-200"
                            style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}
                        >
                            <Mail size={16} />
                            Check My Mail
                            <ExternalLink size={13} />
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes pulse-ring {
                    0%   { box-shadow: 0 0 0 0px rgba(79,70,229,0.25); }
                    70%  { box-shadow: 0 0 0 22px rgba(79,70,229,0); }
                    100% { box-shadow: 0 0 0 0px rgba(79,70,229,0); }
                }
            `}</style>
        </div>
    );
}

/* ─────────────────────────── FIELD WRAPPER ─────────────────────────── */

function FieldError({ message }) {
    if (!message) return null;
    return (
        <p
            className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1"
            style={{ animation: 'slide-in 0.25s ease' }}
        >
            <AlertCircle size={12} />
            {message}
        </p>
    );
}

/* ─────────────────────────── MAIN COMPONENT ─────────────────────────── */

export default function EventRegistration({ event }) {
    const [photoPreview, setPhotoPreview]   = useState(null);
    const [showSuccess, setShowSuccess]     = useState(false);
    const [clientErrors, setClientErrors]   = useState({});
    const [shakeFields, setShakeFields]     = useState({});
    const [dragOver, setDragOver]           = useState(false);
    const formRef = useRef(null);

    const {
        data, setData, post, processing, errors: serverErrors, reset, transform,
    } = useForm({
        event_id:        event?.id || '',
        full_name:       '',
        email:           '',
        country_code:    '+234',
        phone:           '',
        country:         'Nigeria',
        state:           '',
        location:        '',
        referral_source: '',
        expectation:     '',
        photo:           null,
    });

    // Merge server errors + client errors (client errors take priority while typing)
    const err = { ...serverErrors, ...clientErrors };

    const clearError = (field) => {
        if (clientErrors[field]) setClientErrors((e) => { const c = { ...e }; delete c[field]; return c; });
    };

    const shakeField = (fields) => {
        const s = {};
        fields.forEach((f) => (s[f] = true));
        setShakeFields(s);
        setTimeout(() => setShakeFields({}), 600);
    };

    /* ── Handlers ── */

    const handlePhoneChange = (e) => {
        const v = e.target.value.replace(/[^\d]/g, '');
        setData('phone', v);
        clearError('phone');
    };

    const handleFileChange = (file) => {
        if (!file) { setData('photo', null); setPhotoPreview(null); return; }
        if (!['image/jpeg','image/png','image/jpg'].includes(file.type)) {
            setClientErrors((e) => ({ ...e, photo: 'Only JPG / PNG files are allowed.' }));
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setClientErrors((e) => ({ ...e, photo: 'File must be under 2MB.' }));
            return;
        }
        clearError('photo');
        setData('photo', file);
        const reader = new FileReader();
        reader.onloadend = () => setPhotoPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleDrop = (e) => {
        e.preventDefault(); setDragOver(false);
        handleFileChange(e.dataTransfer.files?.[0]);
    };

    const submit = (e) => {
        e.preventDefault();
        const errs = validateForm(data);
        if (Object.keys(errs).length > 0) {
            setClientErrors(errs);
            shakeField(Object.keys(errs));
            // scroll to first error
            const firstKey = Object.keys(errs)[0];
            document.getElementById(`field-${firstKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        setClientErrors({});

        const computedPhone    = `${data.country_code}${data.phone}`;
        const computedLocation = `${data.state}, ${data.country}`;
        transform((fd) => ({ ...fd, phone: computedPhone, location: computedLocation }));

        post('/register-event', {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setShowSuccess(true);
                reset('full_name','email','phone','state','referral_source','expectation','photo');
                setPhotoPreview(null);
                setData('country_code', '+234');
                setData('country', 'Nigeria');
            },
            onFinish: () => { transform((fd) => fd); },
        });
    };

    /* ── Styles ── */

    const inputBase = `w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 text-gray-800 text-sm`;
    const inputStyle = (field) =>
        `${inputBase} border-2 ${
            err[field]
                ? 'border-red-400 bg-red-50 focus:border-red-500'
                : 'border-gray-200 bg-white focus:border-indigo-500 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12)]'
        } ${shakeFields[field] ? 'shake-anim' : ''}`;

    const selectStyle = (field) =>
        `${inputBase} border-2 appearance-none ${
            err[field]
                ? 'border-red-400 bg-red-50'
                : 'border-gray-200 bg-white focus:border-indigo-500 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12)]'
        } ${shakeFields[field] ? 'shake-anim' : ''}`;

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 px-4">
                <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
                    <AlertCircle className="mx-auto text-amber-400 mb-4" size={52} />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Event Not Found</h2>
                    <p className="text-gray-500 mb-6 text-sm">Please go back and select a valid event.</p>
                    <a href="/events-page" className="text-indigo-600 font-medium hover:underline text-sm">← Back to Events</a>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* ── Global Keyframe Styles ── */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

                .erg-root * { font-family: 'Plus Jakarta Sans', sans-serif; }

                @keyframes shake-anim {
                    0%,100% { transform: translateX(0); }
                    18%     { transform: translateX(-7px); }
                    36%     { transform: translateX(7px); }
                    54%     { transform: translateX(-5px); }
                    72%     { transform: translateX(5px); }
                }
                .shake-anim { animation: shake-anim 0.55s ease; }

                @keyframes slide-in {
                    from { opacity:0; transform: translateY(-6px); }
                    to   { opacity:1; transform: translateY(0); }
                }
                @keyframes fade-up {
                    from { opacity:0; transform: translateY(24px); }
                    to   { opacity:1; transform: translateY(0); }
                }
                .fade-up { animation: fade-up 0.55s ease both; }
                .fade-up-1 { animation-delay: 0.05s; }
                .fade-up-2 { animation-delay: 0.12s; }
                .fade-up-3 { animation-delay: 0.2s; }
                .fade-up-4 { animation-delay: 0.28s; }
                .fade-up-5 { animation-delay: 0.36s; }
                .fade-up-6 { animation-delay: 0.44s; }
                .fade-up-7 { animation-delay: 0.52s; }

                @keyframes header-glow {
                    0%,100% { opacity: 0.6; transform: scale(1); }
                    50%     { opacity: 1;   transform: scale(1.06); }
                }
                .orb { animation: header-glow 4s ease-in-out infinite; }
                .orb-2 { animation: header-glow 5.5s ease-in-out infinite reverse; }

                select option { background: #fff; color: #1f2937; }
            `}</style>

            <div className="erg-root min-h-screen py-10 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg,#f0f4ff 0%,#faf5ff 50%,#f0fdf4 100%)' }}>
                <div className="max-w-2xl mx-auto">

                    {/* ── Event Info Card ── */}
                    <div className="fade-up fade-up-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-indigo-100 p-5 mb-6 flex flex-wrap justify-between items-center gap-4">
                        <div>
                            <h2 className="font-bold text-gray-900 text-lg">{event.title}</h2>
                            <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
                                <span className="flex items-center gap-1.5"><Calendar size={13} />{event.start_date || 'Date TBA'}</span>
                                <span className="flex items-center gap-1.5"><Clock size={13} />{event.start_time || 'Time TBA'}</span>
                                <span className="flex items-center gap-1.5"><MapPin size={13} />{event.location || 'Location TBA'}</span>
                            </div>
                        </div>
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                            ● Registration Open
                        </span>
                    </div>

                    {/* ── Form Card ── */}
                    <div className="fade-up fade-up-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

                        {/* Header */}
                        <div className="relative px-8 py-8 overflow-hidden" style={{ background: 'linear-gradient(135deg,#312e81 0%,#4f46e5 45%,#7c3aed 100%)' }}>
                            <div className="orb absolute -top-12 -right-12 w-48 h-48 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }} />
                            <div className="orb-2 absolute -bottom-8 -left-8 w-36 h-36 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
                            <div className="relative">
                                <p className="text-indigo-200 text-xs font-semibold uppercase tracking-widest mb-1">Event Registration</p>
                                <h1 className="text-3xl font-extrabold text-white tracking-tight">Secure Your Spot</h1>
                                <p className="text-indigo-200 text-sm mt-1">Fill in the details below — it only takes a minute.</p>
                            </div>
                        </div>

                        {/* Form Body */}
                        <form ref={formRef} onSubmit={submit} noValidate className="px-6 py-8 sm:px-8 space-y-6">

                            {/* ── Full Name ── */}
                            <div id="field-full_name" className="fade-up fade-up-2">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Full Name <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        value={data.full_name}
                                        onChange={(e) => { setData('full_name', e.target.value); clearError('full_name'); }}
                                        className={`${inputStyle('full_name')} pl-10`}
                                        placeholder="John Doe"
                                    />
                                </div>
                                <FieldError message={err.full_name} />
                            </div>

                            {/* ── Email ── */}
                            <div id="field-email" className="fade-up fade-up-3">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Email Address <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => { setData('email', e.target.value); clearError('email'); }}
                                        className={`${inputStyle('email')} pl-10`}
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <FieldError message={err.email} />
                            </div>

                            {/* ── Phone ── */}
                            <div id="field-phone" className="fade-up fade-up-4">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Phone Number <span className="text-red-500">*</span></label>
                                <div className="flex gap-2">
                                    {/* Country code selector */}
                                    <div className="relative" style={{ minWidth: 140 }}>
                                        <select
                                            value={data.country_code}
                                            onChange={(e) => { setData('country_code', e.target.value); clearError('phone'); }}
                                            className={`${selectStyle('phone')} pl-3 pr-8 w-full`}
                                        >
                                            {COUNTRY_CODES.map((c) => (
                                                <option key={c.code} value={c.code}>
                                                    {c.flag} {c.code}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                                    </div>
                                    {/* Number input */}
                                    <div className="relative flex-1">
                                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="tel"
                                            value={data.phone}
                                            onChange={handlePhoneChange}
                                            className={`${inputStyle('phone')} pl-10`}
                                            placeholder="8012345678"
                                            inputMode="numeric"
                                        />
                                    </div>
                                </div>
                                {/* Preview */}
                                {data.phone && (
                                    <p className="mt-1 text-xs text-indigo-500 font-medium">
                                        Full number: {data.country_code}{data.phone}
                                    </p>
                                )}
                                <FieldError message={err.phone} />
                            </div>

                            {/* ── Location ── */}
                            <div id="field-country" className="fade-up fade-up-5">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Location <span className="text-red-500">*</span></label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {/* Country */}
                                    <div className="relative">
                                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" size={15} />
                                        <select
                                            value={data.country}
                                            onChange={(e) => { setData('country', e.target.value); setData('state', ''); clearError('country'); clearError('state'); }}
                                            className={`${selectStyle('country')} pl-9 pr-8`}
                                        >
                                            <option value="">Select Country</option>
                                            {COUNTRIES.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                                    </div>

                                    {/* State */}
                                    <div id="field-state" className="relative">
                                        <select
                                            value={data.state}
                                            onChange={(e) => { setData('state', e.target.value); clearError('state'); }}
                                            disabled={!data.country}
                                            className={`${selectStyle('state')} pr-8 ${!data.country ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            <option value="">Select State / Region</option>
                                            {(STATES_BY_COUNTRY[data.country] || []).map((s) => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                                    </div>
                                </div>
                                <FieldError message={err.country || err.state} />
                            </div>

                            {/* ── Referral Source ── */}
                            <div id="field-referral_source" className="fade-up fade-up-5">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">How did you hear about us? <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={15} />
                                    <select
                                        value={data.referral_source}
                                        onChange={(e) => { setData('referral_source', e.target.value); clearError('referral_source'); }}
                                        className={`${selectStyle('referral_source')} pl-9 pr-8`}
                                    >
                                        <option value="">Select an option</option>
                                        {REFERRAL_OPTIONS.map((o) => (
                                            <option key={o} value={o}>{o}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                                </div>
                                <FieldError message={err.referral_source} />
                            </div>

                            {/* ── Expectation ── */}
                            <div id="field-expectation" className="fade-up fade-up-6">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">What do you expect from this event? <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-3.5 top-3.5 text-gray-400" size={15} />
                                    <textarea
                                        value={data.expectation}
                                        onChange={(e) => { setData('expectation', e.target.value); clearError('expectation'); }}
                                        rows={4}
                                        className={`${inputStyle('expectation')} pl-10 resize-none`}
                                        placeholder="Share what you hope to learn or gain from this event…"
                                    />
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <FieldError message={err.expectation} />
                                    <span className={`text-xs ml-auto ${data.expectation.length < 10 ? 'text-gray-400' : 'text-indigo-500'}`}>
                                        {data.expectation.length} chars
                                    </span>
                                </div>
                            </div>

                            {/* ── Photo Upload ── */}
                            <div id="field-photo" className="fade-up fade-up-7">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Profile Photo <span className="text-red-500">*</span></label>
                                <div className="flex flex-col sm:flex-row gap-4 items-start">
                                    <label
                                        className={`flex-1 cursor-pointer rounded-2xl p-6 text-center transition-all duration-200 border-2 border-dashed ${
                                            dragOver
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : err.photo
                                                ? 'border-red-400 bg-red-50'
                                                : 'border-gray-200 bg-gray-50 hover:border-indigo-400 hover:bg-indigo-50/40'
                                        }`}
                                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                        onDragLeave={() => setDragOver(false)}
                                        onDrop={handleDrop}
                                    >
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/jpg"
                                            onChange={(e) => handleFileChange(e.target.files?.[0])}
                                            className="hidden"
                                        />
                                        <Upload className={`mx-auto mb-2 ${dragOver ? 'text-indigo-500' : 'text-gray-400'}`} size={28} />
                                        <p className="text-sm font-semibold text-gray-600">
                                            {dragOver ? 'Drop it here!' : 'Click or drag & drop'}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">JPG, PNG — max 5 MB</p>
                                    </label>

                                    {photoPreview ? (
                                        <div className="relative flex-shrink-0">
                                            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-indigo-400 shadow-md">
                                                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => { setData('photo', null); setPhotoPreview(null); }}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-600 transition"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-300 flex-shrink-0">
                                            <User size={32} />
                                        </div>
                                    )}
                                </div>
                                <FieldError message={err.photo} />
                            </div>

                            {/* ── Divider ── */}
                            <div className="border-t border-gray-100" />

                            {/* ── Submit ── */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full relative overflow-hidden rounded-xl py-4 font-bold text-white text-sm tracking-wide shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                                style={{ background: processing ? '#818cf8' : 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                            </svg>
                                            Processing…
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={16} />
                                            Complete Registration
                                        </>
                                    )}
                                </span>
                            </button>

                            <p className="text-xs text-center text-gray-400">
                                By registering you agree to our{' '}
                                <a href="/terms" className="text-indigo-500 hover:underline">Terms & Conditions</a>.
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* ── Success Modal ── */}
            {showSuccess && <SuccessModal email={data.email || 'your inbox'} onOkay={() => setShowSuccess(false)} />}
        </>
    );
}