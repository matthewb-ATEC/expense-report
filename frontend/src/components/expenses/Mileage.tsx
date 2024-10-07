/**
 * @file Mileage.tsx - ./frontend/src/components/expenses
 * @description This component allows users to enter and manage mileage-related information for an expense. It includes fields for selecting the purpose of the trip, entering 'From' and 'To' locations with Google Places Autocomplete, and a round trip checkbox. It also calculates the distance between the two locations using the Google Distance Matrix API and updates the expense with the calculated mileage value. This component is part of the expense tracking system, designed to handle travel-related costs more efficiently by automating mileage calculations based on input locations and providing round-trip options when necessary. It uses Google Maps APIs for autocomplete and distance calculations, enhancing the user experience with location-based inputs and data processing in real-time.
 * @author matthewb
 * @date Created: 2024-09-30 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage Import and use the `Mileage` component in forms related to travel expenses where users need to log trip details. This component requires passing an `ExpenseType` object and a handler to manage state updates.
 *        Example usage:
 *        `<Mileage expense={expense} handleExpenseChange={updateExpense} />`
 * @dependencies React, `ExpenseType` from `../../data/types`, `@react-google-maps/api` for Google Maps Autocomplete and Distance Matrix APIs.
 * @relatedFiles Parent components like `ExpenseForm.tsx`, and types file `types.ts` for `ExpenseType`.
 */

import React, { ChangeEvent, useEffect, useState } from "react";
import { ExpenseType } from "../../data/types";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";

interface MileageProps {
  expense: ExpenseType;
  handleExpenseChange: (updatedExpense: ExpenseType) => void;
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

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`From: ${expense.fromLocation} To ${expense.toLocation}`);

    const calculateMileage = (fromLocation: string, toLocation: string) => {
      if (!expense.fromLocation || !expense.toLocation) {
        console.error("Both locations must be set to calculate mileage.");
        return;
      }

      const service = new google.maps.DistanceMatrixService();

      try {
        void service.getDistanceMatrix(
          {
            origins: [fromLocation],
            destinations: [toLocation],
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (status === google.maps.DistanceMatrixStatus.OK && response) {
              // Check if response contains the expected data
              const distanceElement = response.rows[0]?.elements[0];

              const distanceInMeters = distanceElement.distance.value;
              if (distanceInMeters) {
                const distanceInMiles = distanceInMeters / 1609.34; // Convert meters to miles

                const updatedExpense: ExpenseType = {
                  ...expense,
                  mileage: distanceInMiles,
                };
                handleExpenseChange(updatedExpense);

                console.log(
                  `Mileage from ${fromLocation} to ${toLocation}: ${String(
                    distanceInMiles
                  )}`
                );
              } else {
                console.error("Distance value is not available.");
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

    if (expense.fromLocation && expense.toLocation) {
      calculateMileage(expense.fromLocation, expense.toLocation);
    }
  }, [expense, expense.fromLocation, expense.toLocation, handleExpenseChange]);

  const onFromPlaceChanged = () => {
    if (fromAutocomplete) {
      const place = fromAutocomplete.getPlace();
      const updatedExpense: ExpenseType = {
        ...expense,
        fromLocation: place.formatted_address ?? "",
      };
      handleExpenseChange(updatedExpense);
    }
  };

  const onToPlaceChanged = () => {
    if (toAutocomplete) {
      const place = toAutocomplete.getPlace();
      const updatedExpense: ExpenseType = {
        ...expense,
        toLocation: place.formatted_address ?? "",
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
          onLoad={(autocomplete) => {
            setFromAutocomplete(autocomplete);
          }}
          onPlaceChanged={onFromPlaceChanged}
        >
          <input
            className="p-2 w-full border-grey-300 border-b-2"
            type="text"
            id="from"
            value={expense.fromLocation ?? ""}
            onChange={(e) => {
              handleExpenseChange({ ...expense, fromLocation: e.target.value });
            }}
          />
        </Autocomplete>
      </div>

      <div className="flex flex-col w-full items-start space-y-2">
        <label>To</label>
        <Autocomplete
          className="w-full"
          onLoad={(autocomplete) => {
            setToAutocomplete(autocomplete);
          }}
          onPlaceChanged={onToPlaceChanged}
        >
          <input
            className="p-2 w-full border-grey-300 border-b-2"
            type="text"
            id="to"
            value={expense.toLocation ?? ""}
            onChange={(e) => {
              handleExpenseChange({ ...expense, toLocation: e.target.value });
            }}
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
