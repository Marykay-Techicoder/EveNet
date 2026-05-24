import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";

import {
    MapPin,
    CalendarDays,
    Ticket,
    Users
} from "lucide-react";

export default function EventShow({ eventId }) {

    const [event, setEvent] = useState(null);

    useEffect(() => {

        fetch(`/api/events`)
            .then((response) => response.json())
            .then((data) => {

                const foundEvent = data.find(
                    (e) => e.id == eventId
                );

                setEvent(foundEvent);
            });

    }, []);

    if (!event) {

        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow overflow-hidden">

                <img
                    src="https://placehold.co/1200x400"
                    className="w-full h-80 object-cover"
                />

                <div className="p-8">

                    <h1 className="text-4xl font-bold mb-6">
                        {event.title}
                    </h1>

                    <div className="space-y-4 mb-6">

                        <div className="flex items-center gap-3">

                            <MapPin />

                            <span>{event.location}</span>

                        </div>

                        <div className="flex items-center gap-3">

                            <CalendarDays />

                            <span>{event.start_date}</span>

                        </div>

                        <div className="flex items-center gap-3">

                            <Users />

                            <span>
                                Capacity: {event.capacity}
                            </span>

                        </div>

                    </div>

                    <p className="text-gray-700 leading-8 mb-8">
                        {event.description}
                    </p>

                    <Link
                        href={`/event-registration?event=${event.id}`}
                        className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl"
                    >

                        <Ticket size={20} />

                        Register Now

                    </Link>

                </div>

            </div>

        </div>
    );
}