interface TripProps {
  city: string;
  persons: string;
  start: string;
  end: string;
  index: number;
  deleteTrip: (id: number) => void;
}

export default function Trip({
  city,
  persons,
  start,
  end,
  index,
  deleteTrip,
}: TripProps) {
  const personsList = persons.split(",");
  return (
    <div
      className="bg-white drop-shadow-sm w-[70%] p-2 mt-5 rounded text-lg flex items-center justify-between relative cursor-pointer"
      onClick={() => deleteTrip(index)}
    >
      <div className="flex flex-col">
        <span className="text-lg">{city}</span>
        <ol className="text-sm">
          {personsList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      </div>
      <div className="absolute right-2 top-2 flex flex-col">
        <span className="text-xs">from: {start}</span>
        <span className="text-xs"> to: {end}</span>
      </div>
    </div>
  );
}
