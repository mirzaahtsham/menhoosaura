'use client';
import React, { FormEvent, useState } from 'react'
import data from "../../../data/data"
import axios from 'axios';

const SubscribeForm: React.FC = () => {
  const { newsletterheading, hideSubscribeForm } = data;

  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<
    "success" | "error" | "loading" | ""
  >("");
  const [responseMsg, setResponseMsg] = useState<string>("");
  const [statusCode, setStatusCode] = useState<number>();

  async function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await axios.post("/api/subscribe", { email });

      setStatus("success");
      setStatusCode(response.status);
      setEmail("");
      setResponseMsg(response.data.message);
    } catch (err) {
      
      if (axios.isAxiosError(err)) {
        setStatus("error");
        setStatusCode(err.response?.status);
        setResponseMsg(err.response?.data.error);
      }
    }
  }

  return (
    <>
      {hideSubscribeForm === false && (
        <section className="text-center lg:m-7 mt-10 w-1/2 p-3">
          <form onSubmit={handleSubscribe} className="space-y-6">
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
            {status && <p className="text-green-500">{status}</p>}
          </form>
        </section>
      )}
    </>
  );
};

export default SubscribeForm;
