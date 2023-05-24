import Trip from "./components/Trip";
import { AddTripModal } from "./components/TripModal";
import { useEffect, useState } from "react";

type TripsValues = {
  city: string;
  start: string;
  end: string;
  persons: string;
};

function App() {
  const [trips, setTrips] = useState<TripsValues[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const oldStorage: string = localStorage.getItem("trips") || "[]";
    const newStorage: TripsValues[] = JSON.parse(oldStorage);
    setTrips(newStorage);
  }, []);

  console.log(trips);

  const deleteTrip = (index: number) => {
    const oldStorage: string = localStorage.getItem("trips") || "[]";
    const newStorage: TripsValues[] = JSON.parse(oldStorage);
    newStorage.splice(index, 1);
    console.log(newStorage);
    setTrips(newStorage);
    localStorage.setItem("trips", JSON.stringify(newStorage));
  };

  return (
    <>
      <div className="bg-white absolute flex items-center text-xl w-[100vw] p-1 px-6 drop-shadow-sm">
        Trip App
      </div>
      <div className="flex flex-row justify-between p-5 h-[100vh]">
        <div className="flex flex-col pt-6  w-[33%] h-full drop-shadow items-center">
          <h1 className="text-2xl">Your trips</h1>
          <div
            onClick={() => setShowModal(true)}
            className="bg-white drop-shadow-sm w-1/2 h-12 p-2 mt-5 rounded text-lg flex items-center justify-between cursor-pointer"
          >
            +Add trip
          </div>
          {trips.map((item: TripsValues, i) => (
            <Trip
              key={i}
              index={i}
              persons={item.persons}
              start={item.start}
              end={item.end}
              city={item.city}
              deleteTrip={deleteTrip}
            />
          ))}
        </div>
      </div>
      {showModal && (
        <AddTripModal
          closeModal={() => setShowModal(false)}
          setTrips={setTrips}
        />
      )}
    </>
  );
}

export default App;
