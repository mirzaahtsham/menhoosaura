// import React from 'react'
// import data from "../../../data/data";

// function SubscribeForm() {
//     const {
//         newsletterheading,        
//         hideSubscribeForm,
//       } = data;

//   return (
//     <>
//     { hideSubscribeForm === false ? (
//           <section className="text-center lg:m-7 mt-10 w-1/2 p-3">
//             <form className="space-y-6" action="#" method="POST">
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-slate-800 dark:text-slate-100  font-light text-sm leading-6"
//                 >
//                   {newsletterheading}
//                 </label>
//                 <div className="mt-2 flex-col flex gap-3 lg:flex md:flex-row">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="Email address"
//                     autoComplete="email"
//                     required
//                     className="block w-full placeholder:text-gray-500 pl-[10px] focus:outline-none border-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-0 rounded-lg p-2"
//                   />
//                   <button className="ml-0 bg-gradient-to-r from-pink-500 to-violet-500 sm:w-auto border-slate-800 dark:border-slate-100	rounded-lg mt-2 md:mt-0	p-2 border-1 dark:text-white hover:bg-gradient-to-l from-violet-700 to-pink-700 transition-all transform hover:scale-105 duration-300 ease-in-out">
//                     Subscribe
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </section>
//         ) : (
//           ""
//         )}
//     </>
//   )
// }

// export default SubscribeForm
// Add this line at the top of your SubscribeForm.tsx
'use client';
import React, { useState } from 'react'
import data from "../../../data/data"

const SubscribeForm: React.FC = () => {
  const { newsletterheading, hideSubscribeForm } = data;
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission

    // Basic email validation
    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccess('Thank you for subscribing!');
        setEmail(''); // Clear the input after successful submission
      } else {
        setError(result.message || 'There was an issue with the subscription.');
      }
    } catch (err) {
      setError('Error while subscribing. Please try again.');
    }
  };

  return (
    <>
      {hideSubscribeForm === false && (
        <section className="text-center lg:m-7 mt-10 w-1/2 p-3">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-slate-800 dark:text-slate-100 font-light text-sm leading-6">
                {newsletterheading}
              </label>
              <div className="mt-2 flex-col flex gap-3 lg:flex md:flex-row">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  autoComplete="email"
                  required
                  className="block w-full placeholder:text-gray-400 dark:text-white pl-[10px] focus:outline-none border-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-0 rounded-lg p-2"
                />
                <button type="submit" className="ml-0 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-violet-700 hover:to-pink-700 sm:w-auto border-slate-800 dark:border-slate-100 rounded-lg mt-2 md:mt-0 p-2 border-1 dark:text-white transition-all transform hover:scale-105 duration-300 ease-in-out">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Display error or success message */}
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
          </form>
        </section>
      )}
    </>
  );
};

export default SubscribeForm;
