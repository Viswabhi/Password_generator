import React, { useState } from 'react';

function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState('');
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const generatePassword = () => {
    if (!passwordLength || passwordLength < 8 || passwordLength > 50) {
      setErrorMessage('Password length should be between 8 and 50 characters.');
      return;
    } else {
      setErrorMessage('');
    }

    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+{}|[]';

    let validChars = '';
    if (includeLowercase) validChars += lowercaseChars;
    if (includeUppercase) validChars += uppercaseChars;
    if (includeNumbers) validChars += numberChars;
    if (includeSymbols) validChars += symbolChars;

    if (validChars === '') {
      setErrorMessage('Please select at least one character type.');
      return;
    } else {
      setErrorMessage('');
    }

    let newPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      newPassword += validChars.charAt(Math.floor(Math.random() * validChars.length));
    }

    setPassword(newPassword);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="container mx-auto py-8 ">
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-xl font-semibold mb-4">Password Generator</h1>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Password Length (8-50)"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
          {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
            />
            <span className="ml-2">Uppercase</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
            />
            <span className="ml-2">Lowercase</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
            <span className="ml-2">Numbers</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
            />
            <span className="ml-2">Symbols</span>
          </label>
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-[rgb(0,128,0)]"
          onClick={generatePassword}
        >
          Generate Password
        </button>
        <div className="mt-4">
          <input
            type="text"
            readOnly
            value={password}
            className="w-full p-2 border border-gray-300 rounded-md mt-2 focus:outline-none"
          />
          <button
            className="mt-2 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
            onClick={copyPassword}
          >
            Copy Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
