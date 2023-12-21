"use client";

import { Controller, useForm, SubmitHandler } from "react-hook-form";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useJsApiLoader, LoadScriptProps } from "@react-google-maps/api";
import { Combobox } from "@headlessui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  donationAreaPolygon,
  Point,
  checkInside,
} from "../general/intersectsPolygon";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const libraries: LoadScriptProps["libraries"] = ["places"];

const PlacesAutocomplete = ({
  onChange,
  name,
}: {
  onChange: any;
  name: string;
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { data },
  } = usePlacesAutocomplete({ debounce: 300 });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSelect = (value: string) => {
    setValue(value, false);
    onChange(value); // argument of onChange is supposed to be an event.
  };

  return (
    <div>
      <Combobox
        disabled={!ready}
        value={value}
        name={name}
        onChange={handleSelect}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(value: string) => value}
              onChange={handleInput}
              autoComplete="off"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <span className="text-gray-900">Open</span>
            </Combobox.Button>
          </div>

          {data.length > 0 ? (
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data.map(({ place_id, description }) => (
                <Combobox.Option
                  key={place_id}
                  value={description}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-teal-600 text-white" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {description}
                      </span>
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          ) : (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              <span className="relative cursor-default select-none py-1 pl-3 pr-9 text-gray-500 italic block truncate">
                No Address Found
              </span>
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  );
};

export default function Home() {
  const { isLoaded } = useJsApiLoader({
    id: "script-loader",
    googleMapsApiKey: "AIzaSyDZ5OXCWtsnY8aZu94yPYvilFTqV494zmc",
    version: "weekly",
    libraries,
  });

  const formSchema = z.object({
    // true passes, false doesn't pass
    combobox: z.custom<{ address: string }>(async (address) => {
      if (typeof address === "string") {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        return checkInside(donationAreaPolygon, new Point(lng, lat));
      }
      return false;
    }, "Your address is not within our pickup area"),
  });

  type FormSchemaType = z.infer<typeof formSchema>;
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => console.log(data);
  
  if (!isLoaded) return <div>loading...</div>;

  return (
    <form onSubmit={(e) => e.preventDefault()} noValidate>
      {errors.combobox && (
        <div className="flex justify-center items-center gap-1 py-1 px-2 font-semibold font-base text-red-600 bg-red-100 rounded-md text-sm mt-6">
          <p className="text-center">{errors.combobox.message}</p>
        </div>
      )}
      <Controller
        name="combobox"
        control={control}
        render={({ field: { onChange, name } }) => (
          <PlacesAutocomplete onChange={onChange} name={name} />
        )}
      />
      <div class="flex flex-row min-h-screen justify-center items-center">
        <button
          type="button"
          className="bg-teal-600"
          onSubmit={() => {
            console.log()
            handleSubmit(onSubmit)
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
