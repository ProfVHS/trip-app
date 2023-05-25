import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  city: string;
  start: string;
  end: string;
  persons: string;
}

interface AddTripModal {
  setTrips: (trips: FormValues[]) => void;
  closeModal: () => void;
}

export function AddTripModal({ setTrips, closeModal }: AddTripModal) {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (localStorage.getItem("trips")?.length === undefined) {
      localStorage.setItem("trips", `[${JSON.stringify(data)}]`);
    } else {
      const oldStorage: string = localStorage.getItem("trips") || "[]";
      const newStorage: FormValues[] = JSON.parse(oldStorage);
      newStorage.push(data);
      console.log(newStorage);
      setTrips(newStorage);
      localStorage.setItem("trips", JSON.stringify(newStorage));
      closeModal();
    }
  };
  return (
    <div className="absolute w-1/5 bg-white top-1/3 left-[40%] p-2 drop-shadow-sm rounded">
      <span className="font-bold text-lg">Add trip</span>
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("city")}
          className="bg-gray-100 mt-2 w-[75%]"
          placeholder="City name"
        />
        <input
          {...register("start")}
          className="bg-gray-100 mt-2 w-[75%]"
          type="date"
        />
        <input
          {...register("end")}
          className="bg-gray-100 mt-2 w-[75%]"
          type="date"
        />
        <input
          {...register("persons")}
          className="bg-gray-100 mt-2 w-[75%]"
          placeholder="person1, person2"
        />
        <button type="submit" className="bg-green-200 rounded p-1 w-1/3 mt-5">
          Save
        </button>
        <button
          type="reset"
          onClick={closeModal}
          className="bg-red-200 rounded p-1 w-1/3 mt-2"
        >
          Close
        </button>
      </form>
    </div>
  );
}
