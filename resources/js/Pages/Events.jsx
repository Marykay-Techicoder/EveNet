import { useEffect, useState } from "react";

export default function Events() {

    const [events, setEvents] = useState([]);

    useEffect(() => {

        fetch("http://127.0.0.1:8000/api/events")
            .then((response) => response.json())
            .then((data) => {
                setEvents(data);
            });

    }, []);
    
    console.log(events);

    return (
        <div className="p-10">

            <h1 className="text-3xl font-bold mb-6">
                Events
            </h1>

            <div className="grid grid-cols-3 gap-6">

                {events.map((event) => (

                    <div
                        key={event.id}
                        className="border rounded-xl p-5 shadow"
                    >

                        <h2 className="text-xl font-bold">
                            {event.title}
                        </h2>

                        <p className="text-gray-600">
                            {event.location}
                        </p>

                        <p className="mt-3">
                            {event.description}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
    
}