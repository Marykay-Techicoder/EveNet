import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        event_id: "",
        full_name: "",
        email: "",
        phone: "",
        location: "",
        referral_source: "",
        expectation: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const submit = (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        post('/register-event', {
            onSuccess: () => {
                setSuccessMessage("Registration successful! Check your email for confirmation.");
                setData({
                    event_id: "",
                    full_name: "",
                    email: "",
                    phone: "",
                    location: "",
                    referral_source: "",
                    expectation: "",
                });
            },
            onError: (errors) => {
                if (errors.message) {
                    setErrorMessage(errors.message);
                }
            },
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-10">
            <h1 className="text-3xl font-bold mb-6">
                Event Registration
            </h1>

            {successMessage && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <input
                        type="number"
                        placeholder="Event ID"
                        value={data.event_id}
                        onChange={(e) => setData('event_id', e.target.value)}
                        className={`w-full border p-3 rounded ${
                            errors.event_id ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.event_id && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.event_id}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={data.full_name}
                        onChange={(e) => setData('full_name', e.target.value)}
                        className={`w-full border p-3 rounded ${
                            errors.full_name ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.full_name && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.full_name}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className={`w-full border p-3 rounded ${
                            errors.email ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.email && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className={`w-full border p-3 rounded ${
                            errors.phone ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.phone && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.phone}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Location"
                        value={data.location}
                        onChange={(e) => setData('location', e.target.value)}
                        className={`w-full border p-3 rounded ${
                            errors.location ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.location && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.location}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="How did you hear about us?"
                        value={data.referral_source}
                        onChange={(e) =>
                            setData('referral_source', e.target.value)
                        }
                        className="w-full border p-3 rounded"
                    />
                </div>

                <div>
                    <textarea
                        placeholder="What do you expect from this event?"
                        value={data.expectation}
                        onChange={(e) =>
                            setData('expectation', e.target.value)
                        }
                        className="w-full border p-3 rounded"
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-black text-white px-6 py-3 rounded disabled:opacity-50"
                >
                    {processing ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}