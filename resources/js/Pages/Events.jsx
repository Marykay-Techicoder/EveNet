import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import {
    MapPin,
    CalendarDays,
    Ticket
} from "lucide-react";

export default function Events() {

    const [events, setEvents] = useState([]);

    useEffect(() => {

        fetch("/api/events")
            .then((response) => response.json())
            .then((data) => {
                setEvents(data);
            });

    }, []);

    const getEventStatus = (event) => {

        const now = new Date();

        const startDate = new Date(event.start_date);

        const endDate = new Date(event.end_date);

        if (now < startDate) {
            return "Upcoming";
        }

        if (now >= startDate && now <= endDate) {
            return "Ongoing";
        }

        return "Expired";
    };

    return (

        <div className="p-10 bg-gray-100 min-h-screen">

            <h1 className="text-4xl font-bold mb-8">
                Discover Events
            </h1>

            <div className="grid md:grid-cols-3 gap-6">

                {events.map((event) => (

                    <div
                        key={event.id}
                        className="bg-white rounded-2xl shadow p-5"
                    >

                        <div className="flex justify-between items-center mb-4">

                            <h2 className="text-2xl font-bold">
                                {event.title}
                            </h2>

                            <span className="text-sm px-3 py-1 rounded-full bg-black text-white">
                                {getEventStatus(event)}
                            </span>

                        </div>

                        <div className="space-y-2 mb-4">

                            <div className="flex items-center gap-2 text-gray-600">

                                <MapPin size={18} />

                                <span>{event.location}</span>

                            </div>

                            <div className="flex items-center gap-2 text-gray-600">

                                <CalendarDays size={18} />

                                <span>{event.start_date}</span>

                            </div>

                        </div>

                        <Link
                            href={`/event-registration/${event.id}`}
                            className="inline-block bg-black text-white px-5 py-2 rounded-lg"
                        >
                            <div className="flex items-center gap-2">
                                <Ticket size={18} />
                                Register
                            </div>
                        </Link>

                    </div>

                ))}

            </div>

        </div>
    );
}