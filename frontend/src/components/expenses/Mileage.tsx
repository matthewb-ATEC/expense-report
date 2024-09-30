import React, { ChangeEvent, useEffect, useState } from "react";
import { ExpenseType } from "../../data/types";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";

interface MileageProps {
  expense: ExpenseType;
  handleExpenseChange: Function;
}

const libraries: Libraries = ["places"];

const Mileage: React.FC<MileageProps> = ({ expense, handleExpenseChange }) => {
  const [fromAutocomplete, setFromAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [toAutocomplete, setToAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Update here
    libraries,
  });

  const calculateMileage = (fromLocation: string, toLocation: string) => {
    if (!expense.fromLocation || !expense.toLocation) {
      console.error("Both locations must be set to calculate mileage.");
      return;
    }

    const service = new google.maps.DistanceMatrixService();

    try {
      service.getDistanceMatrix(
        {
          origins: [fromLocation],
          destinations: [toLocation],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === google.maps.DistanceMatrixStatus.OK && response) {
            // Check if response contains the expected data
            const distanceElement = response.rows[0]?.elements[0];
            if (distanceElement && distanceElement.status === "OK") {
              const distanceInMeters = distanceElement.distance?.value;
              if (distanceInMeters) {
                const distanceInMiles = distanceInMeters / 1609.34; // Convert meters to miles

                const updatedExpense: ExpenseType = {
                  ...expense,
                  mileage: distanceInMiles,
                };
                handleExpenseChange(updatedExpense);

                console.log(
                  `Mileage from ${fromLocation} to ${toLocation}: ${distanceInMiles}`
                );
              } else {
                console.error("Distance value is not available.");
              }
            } else {
              console.error(
                "Distance Element is not available or status is not OK:",
                distanceElement
              );
            }
          } else {
            console.error("Error with Distance Matrix Service:", status);
          }
        }
      );
    } catch (error) {
      console.error("An error occurred while calculating mileage:", error);
    }
  };

  useEffect(() => {
    console.log(`From: ${expense.fromLocation} To ${expense.toLocation}`);

    if (expense.fromLocation && expense.toLocation) {
      calculateMileage(expense.fromLocation, expense.toLocation);
    }
  }, [expense.fromLocation, expense.toLocation]);

  const onFromPlaceChanged = () => {
    if (fromAutocomplete) {
      const place = fromAutocomplete.getPlace();
      const updatedExpense: ExpenseType = {
        ...expense,
        fromLocation: place.formatted_address || "",
      };
      handleExpenseChange(updatedExpense);
    }
  };

  const onToPlaceChanged = () => {
    if (toAutocomplete) {
      const place = toAutocomplete.getPlace();
      const updatedExpense: ExpenseType = {
        ...expense,
        toLocation: place.formatted_address || "",
      };
      handleExpenseChange(updatedExpense);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handlePurposeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const updatedExpense: ExpenseType = {
      ...expense,
      purpose: event.target.value,
    };
    handleExpenseChange(updatedExpense);
  };

  const handleRoundTripChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedExpense: ExpenseType = {
      ...expense,
      roundTrip: event.target.checked,
    };
    handleExpenseChange(updatedExpense);
  };

  return (
    <>
      <div className="flex flex-col w-full items-start space-y-2">
        <label>Purpose</label>
        <select
          className="p-2 w-full border-grey-300 border-b-2"
          id="purpose"
          value={expense.purpose}
          onChange={handlePurposeChange}
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="Business">Business</option>
          <option value="Personal">Personal</option>
        </select>
      </div>

      <div className="flex flex-col w-full items-start space-y-2">
        <label>From</label>
        <Autocomplete
          className="w-full"
          onLoad={(autocomplete) => setFromAutocomplete(autocomplete)}
          onPlaceChanged={onFromPlaceChanged}
        >
          <input
            className="p-2 w-full border-grey-300 border-b-2"
            type="text"
            id="from"
            value={expense.fromLocation}
            onChange={(e) =>
              handleExpenseChange({ ...expense, fromLocation: e.target.value })
            }
          />
        </Autocomplete>
      </div>

      <div className="flex flex-col w-full items-start space-y-2">
        <label>To</label>
        <Autocomplete
          className="w-full"
          onLoad={(autocomplete) => setToAutocomplete(autocomplete)}
          onPlaceChanged={onToPlaceChanged}
        >
          <input
            className="p-2 w-full border-grey-300 border-b-2"
            type="text"
            id="to"
            value={expense.toLocation}
            onChange={(e) =>
              handleExpenseChange({ ...expense, toLocation: e.target.value })
            }
          />
        </Autocomplete>
      </div>

      <div className="flex w-full items-center justify-between">
        <label className="text-gray-600 text-nowrap">Round Trip</label>
        <input
          type="checkbox"
          id="roundTrip"
          checked={expense.roundTrip}
          onChange={handleRoundTripChange}
        />
      </div>
    </>
  );
};

export default Mileage;
