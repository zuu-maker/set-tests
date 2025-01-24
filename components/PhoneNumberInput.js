import React from "react";

function PhoneNumberInput({ setPhone, phone }) {
  const countryCodes = [{ code: "+260", country: "🇿🇲" }];

  const getFullNumber = () => {
    return `+260${phone}`;
  };

  return (
    <div className="max-w-md mx-auto">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Phone Number
      </label>
      <div className="flex gap-2">
        <select
          value="+260"
          disabled
          onChange={(e) => {}}
          className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {countryCodes.map((country) => (
            <option key={country.code} value={country.code}>
              {country.country} ({country.code})
            </option>
          ))}
        </select>
        <input
          id="phone"
          name="phone"
          type="text"
          value={phone}
          onChange={(e) => {
            if (e.target.value.length < 10) {
              setPhone(e.target.value);
            }
          }}
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Full number: {getFullNumber()}
      </p>
    </div>
  );
}

export default PhoneNumberInput;
